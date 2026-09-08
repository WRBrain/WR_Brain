/* WRBrain - Live Battle Lab & DPS Calculator */

function initDpsLab() {
      const select = document.getElementById('dps-bot-select');
      if (!select) return;
      select.innerHTML = "";
      MASTER_ROBOTS.forEach(r => {
        select.innerHTML += `<option value="${r.id}">${r.name} (${r.tier} • ${r.hardpoints.length} Slots)</option>`;
      });
      updateDpsLab();
    }

    window.updateDpsLab = function() {
      const botId = document.getElementById('dps-bot-select').value;
      const masterBot = MASTER_ROBOTS.find(r => r.id === botId);
      if (!masterBot) return;

      const nampStacks = parseInt(document.getElementById('namp-slider').value) || 0;
      const pilotBonus = parseInt(document.getElementById('pilot-bonus-slider').value) || 0;

      document.getElementById('namp-value').innerText = `${nampStacks} (+${nampStacks}%)`;
      document.getElementById('pilot-bonus-value').innerText = `+${pilotBonus}%`;

      const hpContainer = document.getElementById('dps-hardpoints-container');
      if (hpContainer.dataset.currentBot !== botId) {
        hpContainer.dataset.currentBot = botId;
        hpContainer.innerHTML = "";
        masterBot.hardpoints.forEach((hp, idx) => {
          const compatible = MASTER_WEAPONS.filter(w => w.size.toLowerCase() === hp.size.toLowerCase());
          let optionsHtml = "";
          compatible.forEach(w => {
            optionsHtml += `<option value="${w.id}">${w.name} (${w.tier} • ${w.range}m • ${w.family})</option>`;
          });
          let lvlOptionsHtml = BOT_LEVELS.map(lvl => `<option value="${lvl}" ${lvl === 'MK3' ? 'selected' : ''}>${lvl}</option>`).join('');
          hpContainer.innerHTML += `
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-[11px] font-bold text-gray-400">Hardpoint ${idx + 1} (${hp.size})</label>
                <select class="dps-level-select bg-[#080c14] border border-[#263040] rounded px-1.5 py-0.5 text-[10px] text-amber-400 font-bold focus:outline-none focus:border-amber-500" onchange="calculateDpsLive()">
                  ${lvlOptionsHtml}
                </select>
              </div>
              <select class="dps-weapon-select w-full bg-[#080c14] border border-[#263040] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500" onchange="calculateDpsLive()">
                ${optionsHtml}
              </select>
            </div>
          `;
        });
      }

      calculateDpsLive();
    };

    window.calculateDpsLive = function() {
      const weaponSelects = document.querySelectorAll('.dps-weapon-select');
      const levelSelects = document.querySelectorAll('.dps-level-select');
      const nampStacks = parseInt(document.getElementById('namp-slider').value) || 0;
      const pilotBonus = parseInt(document.getElementById('pilot-bonus-slider').value) || 0;
      const bonusMultiplier = 1 + (nampStacks * 0.01) + (pilotBonus / 100);

      let burst = 0, sustained = 0;
      weaponSelects.forEach((sel, idx) => {
        const mw = MASTER_WEAPONS.find(w => w.id === sel.value);
        if (mw) {
          const lvl = (levelSelects[idx] && levelSelects[idx].value) || 'MK3';
          const mult = getLevelMultiplier(lvl, 'bot_or_weapon');
          burst += mw.burstDps * mult;
          sustained += mw.sustainedDps * mult;
        }
      });

      document.getElementById('dps-burst-val').innerText = Math.round(burst * bonusMultiplier).toLocaleString();
      document.getElementById('dps-sustained-val').innerText = Math.round(sustained * bonusMultiplier).toLocaleString();
      document.getElementById('dps-clip-val').innerText = Math.round(burst * 4 * bonusMultiplier).toLocaleString();
    };
