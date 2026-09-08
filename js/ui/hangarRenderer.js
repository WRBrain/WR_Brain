/* WRBrain - Tactical Hangar & Robot Card Renderer */

function getMothershipCardHtml(hangarKey, mothershipSlot) {
      if (!mothershipSlot || !mothershipSlot.id) {
        return `
          <div class="p-4 border border-dashed border-purple-500/40 rounded-2xl bg-purple-950/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-lg">
                🚀
              </div>
              <div>
                <span class="font-bold text-purple-300 text-sm">Orbital Mothership Deck: Unoccupied</span>
                <p class="text-[11px] text-gray-400">Deploy Paladin, Avalon, Roulette or Orion for active orbital strikes, Aegis shields & stealth cleansing.</p>
              </div>
            </div>
            <button onclick="openEquipMothershipModal('${hangarKey}')" class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5">
              ➕ Deploy Mothership
            </button>
          </div>
        `;
      }

      const mm = MASTER_MOTHERSHIPS.find(m => m.id === mothershipSlot.id) || { name: mothershipSlot.name || mothershipSlot.id, tier: "T4", effect: "Orbital Strike Support Platform", chargeRate: "Fast" };
      const levelSelectHtml = renderLevelDropdown(hangarKey, 'mothership', null, null, mothershipSlot.level || 'Lv 60', MOTHERSHIP_LEVELS);

      return `
        <div class="tactical-mothership-glow rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden transition-all">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
              🚀
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-t4 text-[9px] font-black px-2 py-0.5 rounded uppercase">ORBITAL MOTHERSHIP</span>
                <h3 class="text-base font-black text-white tracking-wide">${mm.name}</h3>
                ${levelSelectHtml}
              </div>
              <p class="text-xs text-purple-200/90 mt-0.5 max-w-xl">${mm.effect}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <div class="text-right mr-2 hidden sm:block">
              <span class="text-[10px] text-purple-400 uppercase font-mono block font-bold">Orbital Strike</span>
              <span class="text-xs text-white font-bold font-mono">100% Charged</span>
            </div>
            <button onclick="openEquipMothershipModal('${hangarKey}')" class="text-xs text-gray-300 hover:text-purple-300 px-3 py-1.5 rounded-lg bg-[#161f2e] hover:bg-[#202c40] border border-[#263040] transition-all flex items-center gap-1" title="Swap Mothership">🔄 Swap</button>
            <button onclick="unequipMothership('${hangarKey}')" class="text-xs text-gray-400 hover:text-red-400 px-2.5 py-1.5 rounded-lg bg-[#161f2e] hover:bg-[#202c40] border border-[#263040] transition-all" title="Unequip">✕</button>
          </div>
        </div>
      `;
    }

    function getDroneHtml(hangarKey, slot, idx) {
      if (slot && slot.drone && slot.drone.name) {
        const lvlDropdown = renderLevelDropdown(hangarKey, 'drone', idx, null, slot.drone.level || 'Lv 12', DRONE_LEVELS);
        return `
          <div class="flex items-center justify-between p-1.5 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-[11px] text-cyan-300">
            <div class="flex items-center gap-1.5">
              <span class="font-semibold">🛸 <strong>${slot.drone.name}</strong></span>
              ${lvlDropdown}
            </div>
            <button onclick="unequipDrone('${hangarKey}', ${idx})" class="text-gray-400 hover:text-red-400 text-[10px] px-1" title="Remove Drone">✕</button>
          </div>
        `;
      }
      return `
        <button onclick="openEquipDroneModal('${hangarKey}', ${idx})" class="w-full text-left p-1.5 bg-[#080c14] hover:bg-[#161f2e] border border-dashed border-[#263040] hover:border-cyan-500/50 rounded-lg text-[11px] text-gray-400 hover:text-cyan-300 flex items-center justify-between transition-all">
          <span>🛸 Attach Drone</span>
          <span class="text-[10px] opacity-50">+</span>
        </button>
      `;
    }

    function getPilotHtml(hangarKey, slot, idx) {
      if (slot && slot.pilot && slot.pilot.name) {
        const mp = MASTER_PILOTS.find(p => p.id === slot.pilot.id);
        const skillText = slot.pilot.skill || (mp ? mp.skill : "Specialized Combat Synergy");
        const lvlDropdown = renderLevelDropdown(hangarKey, 'pilot', idx, null, slot.pilot.level || 'Lv 1', PILOT_LEVELS);
        const activeSkills = slot.pilot.skills || [];
        const skillsCount = activeSkills.length;

        let skillsChips = "";
        if (skillsCount > 0) {
          skillsChips = `<div class="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-purple-500/20">` + activeSkills.map(s => {
            const mSkill = MASTER_PILOT_SKILLS.find(ms => ms.id === s.id);
            const icon = mSkill ? mSkill.icon : "✨";
            const name = mSkill ? mSkill.name : s.id;
            const tierBadge = s.tier || "T4";
            const tierBg = tierBadge === 'T4' ? 'bg-amber-500 text-black font-black' : tierBadge === 'T3' ? 'bg-purple-900 text-purple-200 font-bold' : tierBadge === 'T2' ? 'bg-blue-900 text-blue-200 font-semibold' : 'bg-gray-800 text-gray-300';
            return `<span class="text-[9px] px-1.5 py-0.5 rounded bg-[#080c14] border border-[#263040] text-gray-200 flex items-center gap-1 font-mono">${icon} ${name} <span class="${tierBg} px-1 rounded text-[8px]">${tierBadge}</span></span>`;
          }).join('') + `</div>`;
        }

        return `
          <div class="p-2.5 bg-purple-950/30 border border-purple-500/30 rounded-lg text-xs space-y-1.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-purple-300">🧑‍✈️ ${slot.pilot.name}</span>
                ${lvlDropdown}
              </div>
              <div class="flex items-center gap-1">
                <button onclick="openPilotSkillsModal('${hangarKey}', ${idx})" class="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-500/40 transition-all flex items-center gap-1" title="Configure 7 Pilot Skills">
                  ✨ Skills (${skillsCount}/7)
                </button>
                <button onclick="unequipPilot('${hangarKey}', ${idx})" class="text-gray-400 hover:text-red-400 text-xs px-1" title="Unequip Pilot">✕</button>
              </div>
            </div>
            <p class="text-[10px] text-purple-200/90 italic leading-snug">⚡ ${skillText}</p>
            ${skillsChips}
          </div>
        `;
      }
      return `
        <button onclick="openEquipPilotModal('${hangarKey}', ${idx})" class="w-full text-left p-2 bg-[#080c14] hover:bg-[#161f2e] border border-dashed border-[#263040] hover:border-purple-500/50 rounded-lg text-[11px] text-gray-400 hover:text-purple-300 flex items-center justify-between transition-all">
          <span class="flex items-center gap-1.5">🧑‍✈️ Assign Legendary Pilot</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-bold">+ Equip</span>
        </button>
      `;
    }

    function renderHangar(hangarKey, containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      container.innerHTML = "";

      const audit = calculateHangarSynergy(hangar.slots, hangar.titanSlot);
      const badgeId = hangarKey === "hangar1" ? "h1-synergy-badge" : "h2-synergy-badge";
      const badge = document.getElementById(badgeId);
      if (badge) badge.innerHTML = `⚡ Synergy: <strong>${audit.synergyScore}%</strong> • ${audit.totalBurstDPS.toLocaleString()} Burst DPS`;

      // 0. CENTER AXIS LINE (Subtle glowing dashed spine from the sketch)
      const axisLine = document.createElement('div');
      axisLine.className = "tactical-axis-line hidden lg:block";
      container.appendChild(axisLine);

      // 1. TOP FULL-WIDTH: ACTIVE ORBITAL MOTHERSHIP DOCK
      const mothershipCard = document.createElement('div');
      mothershipCard.className = "col-span-1 md:col-span-2 lg:col-span-4 z-10";
      mothershipCard.innerHTML = getMothershipCardHtml(hangarKey, hangar.mothership);
      container.appendChild(mothershipCard);

      // 2. TOP CENTER: TITAN COMMAND CARD (spans col 2 & 3 on lg screens, row 2)
      const titanCard = document.createElement('div');
      titanCard.className = "col-span-1 md:col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-2 tactical-titan-glow rounded-2xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden transition-all z-10";
      titanCard.innerHTML = getTitanCardHtml(hangarKey, hangar.titanSlot);
      container.appendChild(titanCard);

      // 3. UPPER LEFT: SLOT 1 (lg:col-start-1 lg:row-start-3)
      const slot1Card = document.createElement('div');
      slot1Card.className = "col-span-1 lg:col-start-1 lg:row-start-3 glass-card rounded-2xl p-4 flex flex-col justify-between space-y-3 relative overflow-hidden z-10";
      slot1Card.innerHTML = getRobotCardHtml(hangarKey, hangar.slots ? hangar.slots[0] : null, 0, false);
      container.appendChild(slot1Card);

      // 4. CENTER: TACTICAL RADAR HUD & LIVE SYNERGY EMBLEM (spans col 2 & 3 on lg screens, row 3)
      const radarCard = document.createElement('div');
      radarCard.className = "col-span-1 md:col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-3 tactical-radar-glow rounded-2xl p-5 flex flex-col justify-between items-center text-center relative overflow-hidden z-10";
      radarCard.innerHTML = getTacticalRadarHtml(hangarKey, audit);
      container.appendChild(radarCard);

      // 5. UPPER RIGHT: SLOT 5 (lg:col-start-4 lg:row-start-3)
      const slot5Card = document.createElement('div');
      slot5Card.className = "col-span-1 lg:col-start-4 lg:row-start-3 glass-card rounded-2xl p-4 flex flex-col justify-between space-y-3 relative overflow-hidden z-10";
      slot5Card.innerHTML = getRobotCardHtml(hangarKey, hangar.slots ? hangar.slots[4] : null, 4, false);
      container.appendChild(slot5Card);

      // 6. BOTTOM LEFT: SLOT 2 (lg:col-start-1 lg:row-start-4)
      const slot2Card = document.createElement('div');
      slot2Card.className = "col-span-1 lg:col-start-1 lg:row-start-4 glass-card rounded-2xl p-4 flex flex-col justify-between space-y-3 relative overflow-hidden z-10";
      slot2Card.innerHTML = getRobotCardHtml(hangarKey, hangar.slots ? hangar.slots[1] : null, 1, false);
      container.appendChild(slot2Card);

      // 7. BOTTOM CENTER: SLOT 3 (2-COLUMN SPLIT CARD) (spans col 2 & 3 on lg screens, row 4)
      const slot3Card = document.createElement('div');
      slot3Card.className = "col-span-1 md:col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-4 tactical-split-bot rounded-2xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden z-10";
      slot3Card.innerHTML = getRobotCardHtml(hangarKey, hangar.slots ? hangar.slots[2] : null, 2, true);
      container.appendChild(slot3Card);

      // 8. BOTTOM RIGHT: SLOT 4 (lg:col-start-4 lg:row-start-4)
      const slot4Card = document.createElement('div');
      slot4Card.className = "col-span-1 lg:col-start-4 lg:row-start-4 glass-card rounded-2xl p-4 flex flex-col justify-between space-y-3 relative overflow-hidden z-10";
      slot4Card.innerHTML = getRobotCardHtml(hangarKey, hangar.slots ? hangar.slots[3] : null, 3, false);
      container.appendChild(slot4Card);
    }

    function getTitanCardHtml(hangarKey, titanSlot) {
      if (!titanSlot || !titanSlot.titanId) {
        return `
          <div class="py-8 flex flex-col items-center justify-center border-2 border-dashed border-red-500/30 rounded-xl p-6 text-center space-y-2">
            <span class="text-4xl opacity-60">👑</span>
            <span class="text-sm font-bold text-red-300">Titan Command Deck: Unoccupied</span>
            <p class="text-xs text-gray-400 max-w-sm">Deploy a colossal Tier 4 / Tier 3 Titan to anchor your hangar's battlefield firepower.</p>
            <button onclick="openEquipTitanModal('${hangarKey}')" class="mt-2 px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 transition-all flex items-center gap-1.5">
              ➕ Deploy Titan Chassis
            </button>
          </div>
        `;
      }

      const masterTitan = MASTER_TITANS.find(t => t.id === titanSlot.titanId) || { name: titanSlot.titanId, tier: "T4", role: "Titan Brawler", hp: 950000, hardpoints: [{ size: "Alpha" }, { size: "Beta" }, { size: "Beta" }], ability: "Heavy Combat Systems" };
      const titanLvlDropdown = renderLevelSliderControl(hangarKey, 'titan', null, null, titanSlot.level || 'Lv 15', TITAN_LEVELS, 'titan');
      const scaledTitanHp = Math.round((masterTitan.hp || 950000) * getLevelMultiplier(titanSlot.level || 'Lv 15', 'titan'));

      let weaponsHtml = "";
      const hardpoints = masterTitan.hardpoints || [];
      hardpoints.forEach((hp, hpIdx) => {
        const equippedW = titanSlot.weapons ? titanSlot.weapons[hpIdx] : null;
        if (equippedW && equippedW.id) {
          const mw = MASTER_WEAPONS.find(w => w.id === equippedW.id);
          const badgeClass = hp.size === 'Alpha' ? 'badge-alpha' : 'badge-beta';
          const wLvlDropdown = renderLevelSliderControl(hangarKey, 'titan_weapon', null, hpIdx, equippedW.level || 'Lv 1', TITAN_WEAPON_LEVELS, 'titan_weapon');
          const liveDps = mw ? Math.round(mw.burstDps * getLevelMultiplier(equippedW.level || 'Lv 1', 'titan_weapon')) : 0;
          weaponsHtml += `
            <div class="flex items-center justify-between p-2.5 bg-[#080c14] rounded-xl border border-red-500/20 text-xs">
              <div class="flex items-center gap-2">
                <span class="${badgeClass} text-[10px] font-black px-2 py-0.5 rounded">${hp.size.toUpperCase()}</span>
                <div>
                  <span class="font-bold text-white">${mw ? mw.name : equippedW.id}</span>
                  <div class="mt-1">${wLvlDropdown}</div>
                  ${mw ? `<span id="live-dps-${hangarKey}-titan-null-${hpIdx}" class="text-red-400 text-[10px] font-mono mt-1 block font-bold">${liveDps.toLocaleString()} DPS</span>` : ''}
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                ${mw ? `<button onclick="inspectWeaponVariants('${mw.id}')" class="text-[10px] text-amber-400 hover:underline px-1.5 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20" title="View Sibling Variants">🔗 Variants</button>` : ''}
                <button onclick="unequipTitanWeapon('${hangarKey}', ${hpIdx})" class="text-gray-400 hover:text-red-400 text-xs px-1.5 py-0.5 rounded hover:bg-[#161f2e]" title="Unequip">✕</button>
              </div>
            </div>
          `;
        } else {
          weaponsHtml += `
            <button onclick="openEquipTitanWeaponModal('${hangarKey}', ${hpIdx}, '${hp.size}')" class="w-full flex items-center justify-between p-2.5 bg-[#080c14]/70 hover:bg-[#080c14] border border-dashed border-red-500/40 hover:border-amber-500 rounded-xl text-xs text-gray-300 hover:text-amber-300 transition-all">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded ${hp.size === 'Alpha' ? 'bg-red-950 text-red-300' : 'bg-amber-950 text-amber-300'}">${hp.size}</span>
              <span>➕ Equip Titan ${hp.size}</span>
              <span class="text-[10px] opacity-50 font-mono">Mount ${hpIdx + 1}</span>
            </button>
          `;
        }
      });

      return `
        <div>
          <div class="flex items-center justify-between border-b border-red-500/20 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="badge-titan text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">👑 TITAN COMMAND CORE</span>
              <span class="text-xs font-bold text-red-400 font-mono">${masterTitan.name}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button onclick="openEquipTitanModal('${hangarKey}')" class="text-xs text-gray-300 hover:text-amber-400 px-2.5 py-1 rounded-lg bg-[#161f2e] hover:bg-[#202c40] border border-[#263040] transition-all flex items-center gap-1" title="Swap Titan">🔄 Swap</button>
              <button onclick="unequipTitan('${hangarKey}')" class="text-xs text-gray-300 hover:text-red-400 px-2.5 py-1 rounded-lg bg-[#161f2e] hover:bg-[#202c40] border border-[#263040] transition-all flex items-center gap-1" title="Unequip Titan">📦 Storage</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <!-- Left: Profile, Durability, Ability -->
            <div class="space-y-3 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between">
                  <h3 class="text-2xl font-black text-white tracking-wide">${masterTitan.name}</h3>
                </div>
                <div class="mt-1">${titanLvlDropdown}</div>
                <p class="text-xs text-gray-400 mt-1">${masterTitan.role} • <span id="live-hp-${hangarKey}-titan" class="text-emerald-400 font-semibold font-mono">${scaledTitanHp.toLocaleString()} HP</span></p>
              </div>

              <!-- Durability Meter -->
              <div class="space-y-1">
                <div class="flex justify-between text-[11px] text-gray-400">
                  <span>Hull Durability:</span>
                  <span id="live-hp2-${hangarKey}-titan" class="text-emerald-300 font-mono font-bold">${scaledTitanHp.toLocaleString()} HP</span>
                </div>
                <div class="w-full bg-[#080c14] h-2 rounded-full overflow-hidden border border-[#263040]">
                  <div class="bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 h-full rounded-full" style="width: 100%"></div>
                </div>
              </div>

              <!-- Special Ability -->
              <div class="p-2.5 bg-[#080c14]/90 rounded-xl border border-red-500/25 text-xs space-y-1">
                <div class="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <span>⚡ Core Titan Ability</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">${masterTitan.ability}</div>
              </div>
            </div>

            <!-- Right: Alpha & Beta Weapon Mounts -->
            <div class="space-y-2">
              <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>Heavy Mounts (${hardpoints.length})</span>
                <span class="text-red-400 font-mono text-[10px]">${hardpoints.map(h => h.size).join(" + ")}</span>
              </div>
              <div class="space-y-2">
                ${weaponsHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function getRobotCardHtml(hangarKey, slot, idx, isCenterSplit) {
      if (!slot || !slot.robotId) {
        return `
          <div class="h-48 flex flex-col items-center justify-center border-2 border-dashed border-[#263040] rounded-xl p-6 text-center space-y-2">
            <span class="text-3xl opacity-40">🤖</span>
            <span class="text-xs font-bold text-gray-400">Slot ${idx + 1}: Empty Bay</span>
            <button onclick="openAddRobotModal('${hangarKey}', ${idx})" class="mt-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-400 border border-[#263040] transition-all">
              ➕ Equip Robot
            </button>
          </div>
        `;
      }

      const masterBot = MASTER_ROBOTS.find(r => r.id === slot.robotId) || { name: slot.robotId, tier: "T4", faction: "SpaceTech", role: "Brawler", hardpoints: [], hp: 220000 };
      const tierBadgeClass = `badge-${masterBot.tier.toLowerCase()}`;
      const botLvlDropdown = renderLevelSliderControl(hangarKey, 'robot', idx, null, slot.level || 'Lv 1', BOT_LEVELS, 'bot_or_weapon');
      const scaledHp = Math.round((masterBot.hp || 220000) * getLevelMultiplier(slot.level || 'Lv 1', 'bot_or_weapon'));

      let weaponsHtml = "";
      const hardpoints = masterBot.hardpoints || [];
      hardpoints.forEach((hp, hpIdx) => {
        const equippedW = slot.weapons ? slot.weapons[hpIdx] : null;
        if (equippedW && equippedW.id) {
          const mw = MASTER_WEAPONS.find(w => w.id === equippedW.id);
          const wLvlDropdown = renderLevelSliderControl(hangarKey, 'weapon', idx, hpIdx, equippedW.level || 'Lv 1', BOT_LEVELS, 'bot_or_weapon');
          const liveDps = mw ? Math.round(mw.burstDps * getLevelMultiplier(equippedW.level || 'Lv 1', 'bot_or_weapon')) : 0;
          weaponsHtml += `
            <div class="flex items-center justify-between p-2 bg-[#080c14] rounded-lg border border-[#263040] text-xs">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${hp.size === 'Heavy' ? 'bg-red-950 text-red-300' : hp.size === 'Medium' ? 'bg-amber-950 text-amber-300' : 'bg-blue-950 text-blue-300'}">${hp.size[0]}</span>
                <div>
                  <span class="font-bold text-white">${mw ? mw.name : equippedW.id}</span>
                  <div class="mt-1">${wLvlDropdown}</div>
                  ${mw ? `<span id="live-dps-${hangarKey}-weapon-${idx}-${hpIdx}" class="text-red-400 text-[10px] font-mono mt-0.5 block font-bold">${liveDps.toLocaleString()} DPS</span>` : ''}
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                ${mw ? `<button onclick="inspectWeaponVariants('${mw.id}')" class="text-[10px] text-amber-400 hover:underline px-1" title="View Sibling Variants">🔗 Variants</button>` : ''}
                <button onclick="unequipWeapon('${hangarKey}', ${idx}, ${hpIdx})" class="text-gray-500 hover:text-red-400 text-xs px-1" title="Unequip">✕</button>
              </div>
            </div>
          `;
        } else {
          weaponsHtml += `
            <button onclick="openEquipWeaponModal('${hangarKey}', ${idx}, ${hpIdx}, '${hp.size}')" class="w-full flex items-center justify-between p-2 bg-[#080c14]/60 hover:bg-[#080c14] border border-dashed border-[#263040] hover:border-amber-500/50 rounded-lg text-xs text-gray-400 hover:text-amber-300 transition-all">
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#161f2e] text-gray-400">${hp.size[0]}</span>
              <span>➕ Equip ${hp.size}</span>
              <span class="text-[10px] opacity-40">Mount ${hpIdx + 1}</span>
            </button>
          `;
        }
      });

      const droneTag = getDroneHtml(hangarKey, slot, idx);
      const pilotTag = getPilotHtml(hangarKey, slot, idx);

      if (isCenterSplit) {
        return `
          <div>
            <div class="flex items-center justify-between border-b border-blue-500/20 pb-2.5">
              <div class="flex items-center gap-2">
                <span class="${tierBadgeClass} text-[10px] font-black px-2 py-0.5 rounded uppercase">${masterBot.tier}</span>
                <span class="text-[11px] font-bold text-blue-400 font-mono">Slot ${idx + 1}: Center Anchor</span>
              </div>
              <div class="flex items-center gap-1">
                ${masterBot.seriesKey ? `<button onclick="inspectRobotSeries('${masterBot.id}')" class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded hover:bg-amber-500/20" title="View Series Siblings">🧬 Series</button>` : ''}
                <button onclick="openAddRobotModal('${hangarKey}', ${idx})" class="text-xs text-gray-300 hover:text-amber-400 px-2 py-0.5 rounded bg-[#161f2e] hover:bg-[#202c40] border border-[#263040]" title="Swap Robot">🔄 Swap</button>
                <button onclick="unequipRobot('${hangarKey}', ${idx})" class="text-xs text-gray-300 hover:text-red-400 px-2 py-0.5 rounded bg-[#161f2e] hover:bg-[#202c40] border border-[#263040]" title="Send to storage">📦 Storage</button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <!-- Left Column: Profile, Role, Pilot, Drone -->
              <div class="space-y-2.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <h3 class="text-xl font-black text-white">${masterBot.name}</h3>
                    ${botLvlDropdown}
                  </div>
                  <p class="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                    <span>${masterBot.faction}</span> • <span>${masterBot.role}</span> • <span class="text-emerald-400 font-mono font-bold">${scaledHp.toLocaleString()} HP</span>
                  </p>
                </div>

                <div class="space-y-2">
                  <div>
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Legendary Pilot</span>
                    ${pilotTag}
                  </div>
                  <div>
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tactical Drone</span>
                    ${droneTag}
                  </div>
                </div>
              </div>

              <!-- Right Column: Hardpoints & Weapons -->
              <div class="space-y-2">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Equipped Weapon Array (${hardpoints.length})</span>
                <div class="space-y-1.5">
                  ${weaponsHtml}
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // Standard Card for Slot 1, 5, 2, 4
      return `
        <div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="${tierBadgeClass} text-[10px] font-black px-2 py-0.5 rounded uppercase">${masterBot.tier}</span>
              <span class="text-[11px] font-bold text-gray-400">Slot ${idx + 1}</span>
            </div>
            <div class="flex items-center gap-1">
              ${masterBot.seriesKey ? `<button onclick="inspectRobotSeries('${masterBot.id}')" class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded hover:bg-amber-500/20" title="View Series Siblings">🧬 Series</button>` : ''}
              <button onclick="openAddRobotModal('${hangarKey}', ${idx})" class="text-xs text-gray-400 hover:text-amber-400 px-1.5 py-0.5 rounded hover:bg-[#161f2e]" title="Swap Robot">🔄</button>
              <button onclick="unequipRobot('${hangarKey}', ${idx})" class="text-xs text-gray-400 hover:text-red-400 px-1.5 py-0.5 rounded hover:bg-[#161f2e]" title="Send to storage">📦</button>
            </div>
          </div>

          <div class="mt-2 flex items-center justify-between">
            <h3 class="text-lg font-black text-white">${masterBot.name}</h3>
            ${botLvlDropdown}
          </div>
          <p class="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
            <span>${masterBot.faction}</span> • <span>${masterBot.role}</span> • <span class="text-emerald-400 font-mono font-bold">${scaledHp.toLocaleString()} HP</span>
          </p>

          <div class="mt-2.5 space-y-1.5">
            ${pilotTag}
            ${droneTag}
          </div>

          <div class="mt-3 space-y-1.5">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Equipped Weapons</span>
            ${weaponsHtml}
          </div>
        </div>
      `;
    }

function renderHome() {
      const container = document.getElementById('home-hangars-overview');
      if (!container) return;
      container.innerHTML = "";

      ['hangar1', 'hangar2'].forEach(hangarKey => {
        const hangar = AppState.hangars[hangarKey];
        if (!hangar) return;
        const audit = calculateHangarSynergy(hangar.slots, hangar.titanSlot);
        
        let titanBadge = "";
        if (hangar.titanSlot && hangar.titanSlot.titanId) {
          const mt = MASTER_TITANS.find(t => t.id === hangar.titanSlot.titanId) || { name: hangar.titanSlot.titanId };
          titanBadge = `
            <div class="flex items-center gap-1.5 bg-red-950/40 border border-red-500/40 px-2.5 py-1.5 rounded-lg text-xs">
              <span class="badge-titan text-[9px] font-black px-1.5 py-0.2 rounded uppercase">👑 TITAN</span>
              <span class="font-bold text-white">${mt.name}</span>
              <span class="text-red-300 text-[10px] font-mono">(${hangar.titanSlot.level || 'Lv 15'})</span>
            </div>
          `;
        }

        let botsHtml = "";
        hangar.slots.forEach(slot => {
          if (!slot || !slot.robotId) return;
          const mb = MASTER_ROBOTS.find(r => r.id === slot.robotId) || { name: slot.robotId, tier: "T4" };
          botsHtml += `
            <div class="flex items-center gap-1.5 bg-[#080c14] border border-[#263040] px-2.5 py-1.5 rounded-lg text-xs">
              <span class="badge-${mb.tier.toLowerCase()} text-[9px] font-black px-1 py-0.2 rounded">${mb.tier}</span>
              <span class="font-bold text-white">${mb.name}</span>
              <span class="text-gray-400 text-[10px]">(${slot.level})</span>
            </div>
          `;
        });

        container.innerHTML += `
          <div class="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-[#263040] hover:border-amber-500/40 transition-all">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-lg">${hangarKey === 'hangar1' ? '🛡️' : '⚔️'}</span>
                  <h3 class="text-base font-black text-white">${hangar.name}</h3>
                </div>
                <span class="px-2.5 py-0.5 rounded-md text-xs font-bold ${audit.synergyScore >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}">
                  ${audit.synergyScore}% Synergy
                </span>
              </div>
              <div class="flex flex-wrap gap-2 pt-1">
                ${titanBadge}
                ${botsHtml || '<span class="text-gray-500 text-xs italic">No robots equipped in this hangar yet.</span>'}
              </div>
            </div>
            <div class="pt-3 border-t border-[#263040] flex items-center justify-between">
              <span class="text-xs text-gray-400">${hangar.slots.filter(s => s && s.robotId).length} / 5 Slots Active ${hangar.titanSlot && hangar.titanSlot.titanId ? '+ 👑 Titan' : ''}</span>
              <button onclick="switchTab('${hangarKey}')" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-300 border border-[#263040] transition-all">
                Open ${hangarKey.toUpperCase()} Builder →
              </button>
            </div>
          </div>
        `;
      });
    }
