/* WRBrain - Hangar Synergy, Range Harmony & Counter Matrix Engine */

function calculateHangarSynergy(slots = [], titanSlot = null) {
      let activeBots = 0, rangeHarmonyPenalties = 0, totalBurstDPS = 0, totalCycleDPS = 0;
      const roles = { "Brawler": 0, "Tank": 0, "Beacon Runner": 0, "Mid-Range Support": 0, "Sniper": 0, "Support": 0 };
      const counterMatrix = { hasAntiHeal: false, hasShieldbreaker: false, hasAntiStealth: false, hasBlastcharge: false, hasFreeze: false, hasSonicGreyDamage: false };
      const botAudits = [];

      slots.forEach((slot, idx) => {
        if (!slot || !slot.robotId) return;
        activeBots++;
        const masterBot = MASTER_ROBOTS.find(r => r.id === slot.robotId) || { name: slot.robotId, role: "Brawler", hardpoints: [] };
        roles[masterBot.role] = (roles[masterBot.role] || 0) + 1;

        let botBurst = 0, botCycle = 0;
        const ranges = [];

        (slot.weapons || []).forEach(w => {
          if (!w || !w.id) return;
          const mw = MASTER_WEAPONS.find(item => item.id === w.id);
          if (!mw) return;
          const wLvl = w.level || slot.level || 'Lv 1';
          const mult = getLevelMultiplier(wLvl, 'bot_or_weapon');
          botBurst += Math.round(mw.burstDps * mult);
          botCycle += Math.round(mw.sustainedDps * mult);
          ranges.push(mw.range);
          if (mw.status && (mw.status.includes("Rust") || mw.status.includes("Anti-Heal"))) counterMatrix.hasAntiHeal = true;
          if (mw.status && (mw.status.includes("Shield Bypass") || mw.status.includes("Piercing") || mw.status.includes("Bypass"))) counterMatrix.hasShieldbreaker = true;
          if (mw.status && mw.status.includes("Blastcharge")) counterMatrix.hasBlastcharge = true;
          if (mw.status && mw.status.includes("Freeze")) counterMatrix.hasFreeze = true;
          if (mw.status && mw.status.includes("Grey Damage")) counterMatrix.hasSonicGreyDamage = true;
        });

        totalBurstDPS += botBurst;
        totalCycleDPS += botCycle;

        let rangeStatus = "Optimal", rangeWarning = null;
        if (ranges.length > 1) {
          const diff = Math.max(...ranges) - Math.min(...ranges);
          if (diff >= 400) { rangeStatus = "Mismatched"; rangeWarning = `Range split (${Math.min(...ranges)}m vs ${Math.max(...ranges)}m). Cannot fire simultaneously.`; rangeHarmonyPenalties += 15; }
          else if (diff >= 200) { rangeStatus = "Partial"; rangeWarning = `Minor gap (${Math.min(...ranges)}m vs ${Math.max(...ranges)}m).`; rangeHarmonyPenalties += 5; }
        }

        botAudits.push({ slotIndex: idx + 1, robotName: masterBot.name, role: masterBot.role, burstDPS: botBurst, cycleDPS: botCycle, rangeStatus, rangeWarning });
      });

      // Factor Titan into synergy & DPS
      if (titanSlot && titanSlot.titanId) {
        const masterTitan = MASTER_TITANS.find(t => t.id === titanSlot.titanId) || { name: titanSlot.titanId, role: "Titan Brawler" };
        let titanBurst = 0, titanCycle = 0;

        (titanSlot.weapons || []).forEach(w => {
          if (!w || !w.id) return;
          const mw = MASTER_WEAPONS.find(item => item.id === w.id);
          if (!mw) return;
          const wLvl = w.level || titanSlot.level || 'Lv 1';
          const mult = getLevelMultiplier(wLvl, 'titan_weapon');
          titanBurst += Math.round(mw.burstDps * mult);
          titanCycle += Math.round(mw.sustainedDps * mult);
          if (mw.status && (mw.status.includes("Rust") || mw.status.includes("Anti-Heal"))) counterMatrix.hasAntiHeal = true;
          if (mw.status && (mw.status.includes("Shield Bypass") || mw.status.includes("Piercing") || mw.status.includes("Mitigation") || mw.status.includes("Bypass"))) counterMatrix.hasShieldbreaker = true;
          if (mw.status && mw.status.includes("Blastcharge")) counterMatrix.hasBlastcharge = true;
          if (mw.status && mw.status.includes("Freeze")) counterMatrix.hasFreeze = true;
          if (mw.status && mw.status.includes("Grey Damage")) counterMatrix.hasSonicGreyDamage = true;
        });

        totalBurstDPS += titanBurst;
        totalCycleDPS += titanCycle;
        botAudits.unshift({ slotIndex: "👑 Titan", robotName: masterTitan.name, role: masterTitan.role, burstDPS: titanBurst, cycleDPS: titanCycle, rangeStatus: "Command Tier", rangeWarning: null });
      }

      if (activeBots === 0 && (!titanSlot || !titanSlot.titanId)) return { synergyScore: 0, activeBots: 0, roles, counterMatrix, totalBurstDPS: 0, totalCycleDPS: 0, botAudits: [], recommendations: ["Equip robots to begin audit."] };

      let baseScore = 70;
      if (Object.values(roles).filter(v => v > 0).length >= 3) baseScore += 15;
      baseScore += (Object.values(counterMatrix).filter(Boolean).length * 3) - rangeHarmonyPenalties;
      const synergyScore = Math.min(100, Math.max(10, Math.round(baseScore)));

      const recommendations = [];
      if (!counterMatrix.hasAntiStealth) recommendations.push("⚠️ No Anti-Stealth Detection: Vulnerable to Shenlou & Lynx jumpers. Consider equipping a Seeker Drone.");
      if (!counterMatrix.hasAntiHeal) recommendations.push("💡 Lack of Rust / Anti-Heal: Brawlers will struggle against high-sustain titans (Damper/Tamer/Talon recommended).");
      if (!counterMatrix.hasShieldbreaker) recommendations.push("🛡️ Shieldbreaker Coverage Missing: Run Shieldbreaker module or Yang Lee pilot to bypass Absorbers.");
      if (roles["Beacon Runner"] === 0) recommendations.push("🚩 No dedicated Beacon Runner: Squad may struggle with early beacon capture advantage.");

      return { synergyScore, activeBots, roles, counterMatrix, totalBurstDPS, totalCycleDPS, botAudits, recommendations };
    }

    window.runAudit = function(hangarKey) {
      currentAuditHangar = hangarKey;
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      document.getElementById('audit-btn-h1').className = hangarKey === 'hangar1' ? "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-black shadow" : "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] text-gray-300 border border-[#263040]";
      document.getElementById('audit-btn-h2').className = hangarKey === 'hangar2' ? "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-black shadow" : "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] text-gray-300 border border-[#263040]";

      const audit = calculateHangarSynergy(hangar.slots, hangar.titanSlot);
      document.getElementById('audit-score-num').innerText = `${audit.synergyScore}%`;
      document.getElementById('audit-score-label').innerText = audit.synergyScore >= 80 ? "High Competitive Synergy" : "Balanced Squad";
      document.getElementById('audit-burst-dps').innerText = `${audit.totalBurstDPS.toLocaleString()} DPS`;
      document.getElementById('audit-cycle-dps').innerText = `${audit.totalCycleDPS.toLocaleString()} DPS`;
      document.getElementById('audit-active-bots').innerText = `${audit.activeBots} / 5`;

      const rolesContainer = document.getElementById('audit-roles-list');
      rolesContainer.innerHTML = "";
      Object.entries(audit.roles).forEach(([role, count]) => {
        rolesContainer.innerHTML += `
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-gray-300">${role}</span>
              <span class="font-bold ${count > 0 ? 'text-amber-400' : 'text-gray-500'}">${count} Bot${count === 1 ? '' : 's'}</span>
            </div>
            <div class="w-full bg-[#080c14] h-2 rounded-full overflow-hidden border border-[#263040]">
              <div class="bg-amber-500 h-full rounded-full" style="width: ${Math.min(100, (count / 5) * 100)}%"></div>
            </div>
          </div>
        `;
      });

      const countersContainer = document.getElementById('audit-counters-grid');
      countersContainer.innerHTML = "";
      const counterLabels = [
        { key: "hasAntiHeal", name: "Anti-Heal / Rust", icon: "🧪" },
        { key: "hasShieldbreaker", name: "Shieldbreaker / Piercing", icon: "🛡️" },
        { key: "hasAntiStealth", name: "Anti-Stealth (Quantum Radar)", icon: "👁️" },
        { key: "hasBlastcharge", name: "Blastcharge AoE", icon: "💥" },
        { key: "hasFreeze", name: "Freeze Slow (+20% Dmg)", icon: "❄️" },
        { key: "hasSonicGreyDamage", name: "Sonic Grey Damage", icon: "🔊" }
      ];

      counterLabels.forEach(item => {
        const active = audit.counterMatrix[item.key];
        countersContainer.innerHTML += `
          <div class="p-3 rounded-lg border ${active ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/5 border-red-500/20 text-gray-500'} flex items-center justify-between">
            <span class="flex items-center gap-1.5 font-semibold">${item.icon} ${item.name}</span>
            <span class="font-bold">${active ? '✓ READY' : '✕ NONE'}</span>
          </div>
        `;
      });

      const slotsContainer = document.getElementById('audit-slot-breakdown');
      slotsContainer.innerHTML = "";
      audit.botAudits.forEach(b => {
        slotsContainer.innerHTML += `
          <div class="p-3 bg-[#080c14] rounded-xl border border-[#263040] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-full bg-[#161f2e] flex items-center justify-center font-bold text-gray-300">${b.slotIndex}</span>
              <div>
                <strong class="text-white text-sm">${b.robotName}</strong>
                <span class="text-gray-400 ml-1">(${b.role})</span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <span class="text-gray-400 block text-[10px]">Burst Output</span>
                <span class="font-bold text-red-400 font-mono">${b.burstDPS.toLocaleString()} DPS</span>
              </div>
              <div class="text-right">
                <span class="text-gray-400 block text-[10px]">Range Harmony</span>
                <span class="font-bold ${b.rangeStatus === 'Optimal' ? 'text-emerald-400' : 'text-amber-400'}">${b.rangeStatus}</span>
              </div>
            </div>
            ${b.rangeWarning ? `<div class="w-full text-amber-300 bg-amber-500/10 p-2 rounded border border-amber-500/20 text-[11px]">${b.rangeWarning}</div>` : ''}
          </div>
        `;
      });

      const recContainer = document.getElementById('audit-recommendations');
      recContainer.innerHTML = "";
      if (audit.recommendations.length === 0) recContainer.innerHTML = "<div class='text-emerald-400 font-semibold'>✓ No critical weaknesses detected. High balance!</div>";
      else audit.recommendations.forEach(r => { recContainer.innerHTML += `<div class="p-2 rounded bg-[#080c14] border border-[#263040]">${r}</div>`; });
    };
