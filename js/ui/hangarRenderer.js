/* WRBrain - Tactical Hangar & Robot Card Renderer */

function getMothershipCardHtml(hangarKey, mothershipSlot) {
      if (!mothershipSlot || !mothershipSlot.id) {
        return `
          <div onclick="openMothershipConfigModal('${hangarKey}')" class="p-4 border border-dashed border-purple-500/40 hover:border-purple-400 rounded-2xl bg-purple-950/20 hover:bg-purple-950/30 flex flex-wrap items-center justify-between gap-3 text-xs cursor-pointer transition-all group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🚀
              </div>
              <div>
                <span class="font-black text-purple-300 text-sm group-hover:text-purple-200">Orbital Mothership Deck: Unoccupied</span>
                <p class="text-[11px] text-gray-400">Click to deploy Paladin, Avalon, Roulette, or Orion for active orbital strikes & Aegis shields.</p>
              </div>
            </div>
            <button class="px-3.5 py-1.5 text-xs font-black rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5 group-hover:scale-105">
              ➕ Deploy Mothership
            </button>
          </div>
        `;
      }

      const mm = MASTER_MOTHERSHIPS.find(m => m.id === mothershipSlot.id) || { name: mothershipSlot.name || mothershipSlot.id, tier: "T4", effect: "Orbital Strike Support Platform", chargeRate: "Fast" };

      return `
        <div onclick="openMothershipConfigModal('${hangarKey}')" class="tactical-mothership-glow rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden cursor-pointer transition-all hover:border-purple-400/80 group">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-110 transition-transform">
              🚀
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-t4 text-[9px] font-black px-2 py-0.5 rounded uppercase">ORBITAL MOTHERSHIP</span>
                <h3 class="text-base font-black text-white group-hover:text-purple-300 transition-colors">${mm.name}</h3>
                <span class="text-xs font-mono font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">${mothershipSlot.level || 'Lv 60'} ✏️</span>
              </div>
              <p class="text-xs text-purple-200/90 mt-0.5 max-w-xl">${mm.effect}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <div class="text-right mr-2 hidden sm:block">
              <span class="text-[10px] text-purple-400 uppercase font-mono block font-bold">Orbital Strike</span>
              <span class="text-xs text-white font-bold font-mono">Ready • Click to Configure</span>
            </div>
            <button class="text-xs font-bold text-purple-300 group-hover:text-black group-hover:bg-purple-400 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 transition-all flex items-center gap-1">
              ⚙️ Configure
            </button>
          </div>
        </div>
      `;
    }

    function getDroneHtml(hangarKey, slot, idx) {
      if (slot && slot.drone && slot.drone.name) {
        return `
          <button onclick="openDroneConfigModal('${hangarKey}', ${idx})" class="w-full text-left p-2 rounded-xl bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center justify-between text-xs group">
            <div class="truncate">
              <div class="flex items-center gap-1.5">
                <span class="text-xs">🛸</span>
                <strong class="text-cyan-300 group-hover:text-cyan-200 font-bold truncate">${slot.drone.name}</strong>
                <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/30">(${slot.drone.level || 'Lv 12'})</span>
              </div>
            </div>
            <span class="text-xs text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">⚙️</span>
          </button>
        `;
      }
      return `
        <button onclick="openDroneConfigModal('${hangarKey}', ${idx})" class="w-full text-left p-2 bg-[#080c14] hover:bg-[#161f2e] border border-dashed border-[#263040] hover:border-cyan-500/50 rounded-xl text-[11px] text-gray-400 hover:text-cyan-300 flex items-center justify-between transition-all">
          <span class="flex items-center gap-1.5">🛸 + Attach Drone</span>
          <span class="text-[10px] opacity-50">+</span>
        </button>
      `;
    }

    function getPilotHtml(hangarKey, slot, idx) {
      if (slot && slot.pilot && slot.pilot.name) {
        const skillsCount = (slot.pilot.skills || []).length;
        return `
          <button onclick="openPilotConfigModal('${hangarKey}', ${idx})" class="w-full text-left p-2 rounded-xl bg-purple-950/20 hover:bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 transition-all flex items-center justify-between text-xs group">
            <div class="truncate">
              <div class="flex items-center gap-1.5">
                <span class="text-xs">🧑‍✈️</span>
                <strong class="text-purple-300 group-hover:text-purple-200 font-bold truncate">${slot.pilot.name}</strong>
                <span class="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-1.5 py-0.2 rounded border border-purple-500/30">(${slot.pilot.level || 'Lv 1'})</span>
              </div>
              <span class="text-[10px] text-purple-300/80 font-mono block mt-0.5">${skillsCount}/7 Skills Active</span>
            </div>
            <span class="text-xs text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">⚙️</span>
          </button>
        `;
      }
      return `
        <button onclick="openPilotConfigModal('${hangarKey}', ${idx})" class="w-full text-left p-2 bg-[#080c14] hover:bg-[#161f2e] border border-dashed border-[#263040] hover:border-purple-500/50 rounded-xl text-[11px] text-gray-400 hover:text-purple-300 flex items-center justify-between transition-all">
          <span class="flex items-center gap-1.5">🧑‍✈️ + Assign Pilot</span>
          <span class="text-[10px] opacity-50">+</span>
        </button>
      `;
    }

    function getTitanCardHtml(hangarKey, titanSlot) {
      if (!titanSlot || !titanSlot.titanId) {
        return `
          <div onclick="openTitanConfigModal('${hangarKey}')" class="py-8 flex flex-col items-center justify-center border-2 border-dashed border-red-500/30 hover:border-red-500/60 rounded-2xl p-6 text-center space-y-2 cursor-pointer transition-all group">
            <span class="text-4xl opacity-60 group-hover:scale-110 transition-transform">👑</span>
            <span class="text-sm font-bold text-red-300 group-hover:text-red-200">Titan Command Deck: Unoccupied</span>
            <p class="text-xs text-gray-400 max-w-sm">Deploy a colossal Tier 4 Titan chassis to anchor your squad's battlefield firepower.</p>
            <button class="mt-2 px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 transition-all flex items-center gap-1.5 group-hover:scale-105">
              ➕ Deploy Titan Chassis
            </button>
          </div>
        `;
      }

      const masterTitan = MASTER_TITANS.find(t => t.id === titanSlot.titanId) || { name: titanSlot.titanId, tier: "T4", role: "Titan Brawler", hp: 950000, hardpoints: [{ size: "Alpha" }, { size: "Beta" }, { size: "Beta" }], ability: "Heavy Combat Systems" };
      const curLevel = titanSlot.level || 'Lv 15';
      const mult = getLevelMultiplier(curLevel, 'titan');
      const scaledTitanHp = Math.round((masterTitan.hp || 950000) * mult);

      let weaponsHtml = "";
      const hardpoints = masterTitan.hardpoints || [];
      hardpoints.forEach((hp, hpIdx) => {
        const equippedW = titanSlot.weapons ? titanSlot.weapons[hpIdx] : null;
        if (equippedW && equippedW.id) {
          const mw = MASTER_WEAPONS.find(w => w.id === equippedW.id);
          const badgeClass = hp.size === 'Alpha' ? 'badge-alpha' : 'badge-beta';
          const liveDps = mw ? Math.round(mw.burstDps * getLevelMultiplier(equippedW.level || 'Lv 1', 'titan_weapon')) : 0;
          weaponsHtml += `
            <button onclick="openWeaponConfigModal('${hangarKey}', null, ${hpIdx}, true)" class="w-full text-left p-2.5 bg-[#080c14] hover:bg-[#1f0d11] rounded-xl border border-red-500/30 hover:border-red-500/60 text-xs transition-all flex items-center justify-between gap-2 group">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="${badgeClass} text-[10px] font-black px-2 py-0.5 rounded uppercase shrink-0">${hp.size}</span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5 truncate">
                    <strong class="font-bold text-white group-hover:text-red-300 truncate">${mw ? mw.name : equippedW.id}</strong>
                    <span class="text-[10px] font-mono text-red-400 bg-red-950/60 px-1.5 py-0.2 rounded border border-red-500/30 shrink-0">${equippedW.level || 'Lv 1'}</span>
                  </div>
                  <div class="text-[10px] text-gray-400 flex items-center gap-2 mt-0.5">
                    <span class="text-red-400 font-mono font-bold">${liveDps.toLocaleString()} DPS</span>
                    <span>•</span>
                    <span>${mw ? mw.range : 500}m</span>
                    ${mw && mw.status ? `<span class="text-amber-400 font-semibold">• ${mw.status}</span>` : ''}
                  </div>
                </div>
              </div>
              <span class="text-xs text-red-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0">⚙️</span>
            </button>
          `;
        } else {
          weaponsHtml += `
            <button onclick="openWeaponConfigModal('${hangarKey}', null, ${hpIdx}, true)" class="w-full flex items-center justify-between p-2.5 bg-[#080c14]/70 hover:bg-[#080c14] border border-dashed border-red-500/40 hover:border-red-400 rounded-xl text-xs text-gray-300 hover:text-red-300 transition-all">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded ${hp.size === 'Alpha' ? 'bg-red-950 text-red-300' : 'bg-amber-950 text-amber-300'}">${hp.size}</span>
              <span>➕ Equip Titan ${hp.size} Mount</span>
              <span class="text-[10px] opacity-50 font-mono">Mount ${hpIdx + 1}</span>
            </button>
          `;
        }
      });

      return `
        <div>
          <!-- TITAN HEADER (CLICKABLE TO OPEN TITAN CONFIG MODAL) -->
          <div onclick="openTitanConfigModal('${hangarKey}')" class="p-3 rounded-xl bg-[#080c14] hover:bg-[#1a0c10] border border-red-500/30 hover:border-red-500/60 cursor-pointer transition-all group">
            <div class="flex items-center justify-between border-b border-red-500/20 pb-2">
              <div class="flex items-center gap-2">
                <span class="badge-titan text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">👑 TITAN COMMAND CORE</span>
                <span class="text-xs font-bold text-red-400 font-mono">${masterTitan.name}</span>
              </div>
              <span class="text-[11px] font-mono font-bold text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/40 group-hover:border-red-400">${curLevel} ✏️</span>
            </div>

            <div class="mt-2.5 flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-black text-white group-hover:text-red-300 transition-colors">${masterTitan.name}</h3>
                <p class="text-xs text-gray-400 mt-0.5">${masterTitan.role} • Colossal Flagship Platform</p>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Hull Durability</span>
                <span class="text-emerald-400 font-mono font-bold text-sm sm:text-base">${scaledTitanHp.toLocaleString()} HP</span>
              </div>
            </div>

            <div class="mt-2 text-[11px] text-gray-300 bg-[#12080a] p-2 rounded-lg border border-red-500/20 flex items-center justify-between">
              <span class="truncate">⚡ <strong class="text-red-300">Ability:</strong> ${masterTitan.ability}</span>
              <span class="text-[10px] text-red-400 shrink-0 ml-2 group-hover:underline">Configure Titan →</span>
            </div>
          </div>

          <!-- TITAN WEAPONS ARRAY -->
          <div class="space-y-2 mt-3">
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Titan Heavy Mounts (${hardpoints.length})</span>
              <span class="text-gray-500">Click to change / level</span>
            </div>
            <div class="space-y-2">
              ${weaponsHtml}
            </div>
          </div>
        </div>
      `;
    }

    function getRobotCardHtml(hangarKey, slot, idx, isCenterSplit) {
      if (!slot || !slot.robotId) {
        return `
          <div onclick="openRobotConfigModal('${hangarKey}', ${idx})" class="h-56 flex flex-col items-center justify-center border-2 border-dashed border-[#263040] hover:border-amber-500/60 rounded-2xl p-6 text-center space-y-2 cursor-pointer transition-all group">
            <span class="text-3xl opacity-40 group-hover:scale-110 transition-transform">🤖</span>
            <span class="text-xs font-bold text-gray-400 group-hover:text-amber-300">Bay 0${idx + 1}: Empty Slot</span>
            <p class="text-[11px] text-gray-500">Click to deploy a combat robot to this bay.</p>
            <button class="mt-2 px-3 py-1.5 text-xs font-bold rounded-xl bg-[#161f2e] group-hover:bg-amber-500 group-hover:text-black text-amber-400 border border-[#263040] transition-all">
              ➕ Equip Robot
            </button>
          </div>
        `;
      }

      const masterBot = MASTER_ROBOTS.find(r => r.id === slot.robotId) || { name: slot.robotId, tier: "T4", faction: "SpaceTech", role: "Brawler", hardpoints: [], hp: 220000 };
      const tierBadgeClass = `badge-${masterBot.tier.toLowerCase()}`;
      const curLevel = slot.level || 'Lv 1';
      const mult = getLevelMultiplier(curLevel, 'bot_or_weapon');
      const scaledHp = Math.round((masterBot.hp || 220000) * mult);

      let weaponsHtml = "";
      const hardpoints = masterBot.hardpoints || [];
      hardpoints.forEach((hp, hpIdx) => {
        const equippedW = slot.weapons ? slot.weapons[hpIdx] : null;
        if (equippedW && equippedW.id) {
          const mw = MASTER_WEAPONS.find(w => w.id === equippedW.id);
          const liveDps = mw ? Math.round(mw.burstDps * getLevelMultiplier(equippedW.level || 'Lv 1', 'bot_or_weapon')) : 0;
          weaponsHtml += `
            <button onclick="openWeaponConfigModal('${hangarKey}', ${idx}, ${hpIdx}, false)" class="w-full text-left p-2 rounded-xl bg-[#080c14] hover:bg-[#161f2e] border border-[#263040] hover:border-amber-500/60 transition-all flex items-center justify-between gap-2 group">
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ${hp.size === 'Heavy' ? 'bg-red-950 text-red-300 border border-red-800/40' : hp.size === 'Medium' ? 'bg-amber-950 text-amber-300 border border-amber-800/40' : 'bg-blue-950 text-blue-300 border border-blue-800/40'}">${hp.size[0]}</span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5 truncate">
                    <strong class="text-xs text-white group-hover:text-amber-300 truncate">${mw ? mw.name : equippedW.id}</strong>
                    <span class="text-[10px] font-mono text-amber-400/90 bg-[#111620] px-1 py-0.2 rounded shrink-0">(${equippedW.level || 'Lv 1'})</span>
                  </div>
                  <div class="text-[10px] text-gray-400 flex items-center gap-2 mt-0.5">
                    <span class="text-red-400 font-mono font-bold">${liveDps.toLocaleString()} DPS</span>
                    <span>•</span>
                    <span>${mw ? mw.range : 500}m</span>
                    ${mw && mw.status ? `<span class="text-amber-400 font-semibold truncate">• ${mw.status}</span>` : ''}
                  </div>
                </div>
              </div>
              <span class="text-[11px] text-gray-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0">⚙️</span>
            </button>
          `;
        } else {
          weaponsHtml += `
            <button onclick="openWeaponConfigModal('${hangarKey}', ${idx}, ${hpIdx}, false)" class="w-full text-left p-2 rounded-xl bg-[#080c14]/60 hover:bg-[#080c14] border border-dashed border-[#263040] hover:border-amber-500/60 transition-all flex items-center justify-between text-xs text-gray-400 hover:text-amber-300">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#161f2e] text-gray-400">${hp.size[0]}</span>
                <span>➕ Equip ${hp.size} Mount</span>
              </div>
              <span class="text-[10px] opacity-40 font-mono">Mount ${hpIdx + 1}</span>
            </button>
          `;
        }
      });

      const droneTag = getDroneHtml(hangarKey, slot, idx);
      const pilotTag = getPilotHtml(hangarKey, slot, idx);

      if (isCenterSplit) {
        return `
          <div class="space-y-3.5">
            <!-- ROBOT HEADER (CLICKABLE) -->
            <div onclick="openRobotConfigModal('${hangarKey}', ${idx})" class="p-3 rounded-xl bg-[#080c14] hover:bg-[#131b29] border border-blue-500/30 hover:border-amber-500/60 cursor-pointer transition-all group">
              <div class="flex items-center justify-between border-b border-blue-500/20 pb-2">
                <div class="flex items-center gap-2">
                  <span class="${tierBadgeClass} text-[10px] font-black px-2 py-0.5 rounded uppercase">${masterBot.tier}</span>
                  <span class="text-[11px] font-black text-blue-400 font-mono tracking-wider">BAY 0${idx + 1} • CENTER ANCHOR</span>
                </div>
                <span class="text-[11px] font-mono font-bold text-gray-300 bg-[#161f2e] px-2 py-0.5 rounded border border-[#263040] group-hover:border-amber-500/50 group-hover:text-amber-300">${curLevel} ✏️</span>
              </div>

              <div class="mt-2.5 flex items-center justify-between">
                <div>
                  <h3 class="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">${masterBot.name}</h3>
                  <p class="text-xs text-gray-400 mt-0.5">${masterBot.faction} • ${masterBot.role}</p>
                </div>
                <div class="text-right">
                  <span class="text-[10px] text-gray-400 uppercase font-bold block">Durability</span>
                  <span class="text-emerald-400 font-mono font-bold text-base">${scaledHp.toLocaleString()} HP</span>
                </div>
              </div>
            </div>

            <!-- 2-COLUMN SPLIT (WEAPONS + SUPPORT) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- Left: Weapons Rack -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <span>Weapons Array (${hardpoints.length})</span>
                  <span class="text-gray-500">Click to tune / swap</span>
                </div>
                <div class="space-y-1.5">
                  ${weaponsHtml}
                </div>
              </div>

              <!-- Right: Support Systems & Utils -->
              <div class="space-y-2 flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>Support Systems</span>
                  </div>
                  ${pilotTag}
                  ${droneTag}
                </div>

                <div class="pt-2 border-t border-[#263040] flex items-center justify-between text-xs">
                  ${masterBot.seriesKey ? `<button onclick="inspectRobotSeries('${masterBot.id}')" class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded hover:bg-amber-500/20">🧬 Series</button>` : '<span></span>'}
                  <button onclick="unequipRobot('${hangarKey}', ${idx})" class="text-[10px] text-gray-400 hover:text-red-400 px-2 py-1 rounded hover:bg-[#161f2e]">📦 To Storage</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // Standard Bay Card (Bay 1, 2, 4, 5)
      return `
        <div class="space-y-3">
          <!-- ROBOT HEADER (CLICKABLE TO OPEN ROBOT CONFIG MODAL) -->
          <div onclick="openRobotConfigModal('${hangarKey}', ${idx})" class="p-2.5 rounded-xl bg-[#080c14] hover:bg-[#131b29] border border-[#263040] hover:border-amber-500/50 cursor-pointer transition-all group">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="${tierBadgeClass} text-[10px] font-black px-2 py-0.5 rounded uppercase">${masterBot.tier}</span>
                <span class="text-[10px] font-black text-amber-400 font-mono tracking-wider">BAY 0${idx + 1}</span>
              </div>
              <span class="text-[11px] font-mono font-bold text-gray-300 bg-[#161f2e] px-2 py-0.5 rounded border border-[#263040] group-hover:border-amber-500/50 group-hover:text-amber-300">${curLevel} ✏️</span>
            </div>

            <div class="mt-2 flex items-center justify-between">
              <h3 class="text-base font-black text-white group-hover:text-amber-300 transition-colors">${masterBot.name}</h3>
              <span class="text-emerald-400 font-mono font-bold text-xs">${scaledHp.toLocaleString()} HP</span>
            </div>
            <div class="text-[11px] text-gray-400 flex items-center justify-between mt-0.5">
              <span>${masterBot.faction} • ${masterBot.role}</span>
              <span class="text-[10px] text-amber-400/80 group-hover:underline">Configure Bay →</span>
            </div>
          </div>

          <!-- WEAPONS ARRAY (CLICKABLE SLOTS) -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span>Weapons (${hardpoints.length})</span>
              <span class="text-gray-500">Click to tune</span>
            </div>
            <div class="space-y-1.5">
              ${weaponsHtml}
            </div>
          </div>

          <!-- SUPPORT SYSTEMS (PILOT & DRONE) -->
          <div class="space-y-1.5 pt-1 border-t border-[#263040]">
            <div class="grid grid-cols-1 gap-1.5">
              ${pilotTag}
              ${droneTag}
            </div>
          </div>

            <!-- FOOTER UTILS -->
          <div class="pt-1.5 border-t border-[#263040]/60 flex items-center justify-between text-xs">
            ${masterBot.seriesKey ? `<button onclick="inspectRobotSeries('${masterBot.id}')" class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded hover:bg-amber-500/20">🧬 Series</button>` : '<span></span>'}
            <button onclick="unequipRobot('${hangarKey}', ${idx})" class="text-[10px] text-gray-400 hover:text-red-400 px-2 py-0.5 rounded hover:bg-[#161f2e]">📦 Storage</button>
          </div>
        </div>
      `;
    }

function renderHangar(hangarKey, containerId = 'hangar-active-grid') {
  const container = document.getElementById(containerId);
  if (!container || !AppState.hangars) return;

  const hangar = AppState.hangars[hangarKey];
  if (!hangar) return;

  // Update header titles
  const titleEl = document.getElementById('active-hangar-title');
  const subEl = document.getElementById('active-hangar-subtitle');
  const synEl = document.getElementById('active-hangar-synergy-badge');

  if (titleEl) titleEl.innerHTML = `🛡️ ${hangar.name || 'Active Hangar Deck'}`;
  if (subEl) subEl.innerText = `👑 Titan Command Core + 5 Battle Robot Bays • Dynamic Loadout Control`;

  if (synEl && typeof calculateHangarSynergy === 'function') {
    const audit = calculateHangarSynergy(hangar.slots, hangar.titanSlot);
    synEl.innerHTML = `⚡ Synergy: <span class="font-black text-amber-400 font-mono ml-1">${audit.synergyScore || 85}%</span>`;
  }

  container.innerHTML = "";

  // 1. Orbital Mothership Full Width Banner Deck
  const msHtml = getMothershipCardHtml(hangarKey, hangar.mothership);
  const msWrapper = document.createElement('div');
  msWrapper.className = "col-span-1 md:col-span-2 lg:col-span-4";
  msWrapper.innerHTML = msHtml;
  container.appendChild(msWrapper);

  // 2. Robot Bay 01 & Bay 02
  const slot0 = hangar.slots ? hangar.slots[0] : null;
  const slot1 = hangar.slots ? hangar.slots[1] : null;

  const card0 = document.createElement('div');
  card0.innerHTML = getRobotCardHtml(hangarKey, slot0, 0, false);
  container.appendChild(card0.firstElementChild || card0);

  const card1 = document.createElement('div');
  card1.innerHTML = getRobotCardHtml(hangarKey, slot1, 1, false);
  container.appendChild(card1.firstElementChild || card1);

  // 3. Titan Center Command Card (Spans 2 columns on desktop)
  const titanCard = document.createElement('div');
  titanCard.className = "col-span-1 md:col-span-2 lg:col-span-2";
  titanCard.innerHTML = getTitanCardHtml(hangarKey, hangar.titanSlot);
  container.appendChild(titanCard);

  // 4. Robot Bay 03, Bay 04, Bay 05
  const slot2 = hangar.slots ? hangar.slots[2] : null;
  const slot3 = hangar.slots ? hangar.slots[3] : null;
  const slot4 = hangar.slots ? hangar.slots[4] : null;

  const card2 = document.createElement('div');
  card2.innerHTML = getRobotCardHtml(hangarKey, slot2, 2, false);
  container.appendChild(card2.firstElementChild || card2);

  const card3 = document.createElement('div');
  card3.innerHTML = getRobotCardHtml(hangarKey, slot3, 3, false);
  container.appendChild(card3.firstElementChild || card3);

  const card4 = document.createElement('div');
  card4.innerHTML = getRobotCardHtml(hangarKey, slot4, 4, false);
  container.appendChild(card4.firstElementChild || card4);
}

function renderHome() {

  const container = document.getElementById('home-hangars-overview');
  if (!container || !AppState.hangars) return;
  container.innerHTML = "";

  Object.keys(AppState.hangars).forEach((hangarKey, hIdx) => {
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
    (hangar.slots || []).forEach(slot => {
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
              <span class="text-lg">${hIdx === 0 ? '🛡️' : hIdx === 1 ? '⚔️' : hIdx === 2 ? '🎯' : hIdx === 3 ? '🏃' : '👑'}</span>
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
          <span class="text-xs text-gray-400">${(hangar.slots || []).filter(s => s && s.robotId).length} / 5 Slots Active ${hangar.titanSlot && hangar.titanSlot.titanId ? '+ 👑 Titan' : ''}</span>
          <button onclick="switchActiveHangar('${hangarKey}'); switchTab('hangars');" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-300 border border-[#263040] transition-all">
            Open Deck →
          </button>
        </div>
      </div>
    `;
  });
}

function renderHangarDeckSelector() {
  const container = document.getElementById('hangar-deck-pills-container');
  if (!container) return;
  container.innerHTML = "";

  const keys = Object.keys(AppState.hangars || {});
  keys.forEach((hangarKey, idx) => {
    const hangar = AppState.hangars[hangarKey];
    if (!hangar) return;
    const isActive = hangarKey === currentActiveHangarKey;
    const activeBotsCount = (hangar.slots || []).filter(s => s && s.robotId).length;
    const hasTitan = hangar.titanSlot && hangar.titanSlot.titanId;

    const pill = document.createElement('div');
    pill.className = `flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
      isActive 
        ? 'bg-amber-500 text-black border-amber-400 shadow-md font-black' 
        : 'bg-[#161f2e] text-gray-300 border-[#263040] hover:bg-[#202c40] hover:text-white'
    }`;
    pill.onclick = () => {
      switchActiveHangar(hangarKey);
    };

    pill.innerHTML = `
      <span>${idx === 0 ? '🛡️' : idx === 1 ? '⚔️' : idx === 2 ? '🎯' : idx === 3 ? '🏃' : '👑'}</span>
      <span>${hangar.name || `Hangar ${idx + 1}`}</span>
      <span class="text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-black/20 text-black font-black' : 'bg-[#0c121d] text-amber-400'} font-mono">${activeBotsCount}/5 ${hasTitan ? '+ 👑' : ''}</span>
      ${keys.length > 1 ? `
        <button onclick="event.stopPropagation(); deleteHangarDeck('${hangarKey}')" class="ml-1 text-gray-400 hover:text-red-500 text-xs px-1" title="Delete Hangar Deck">✕</button>
      ` : ''}
    `;
    container.appendChild(pill);
  });
}

window.renderHangarDeckSelector = renderHangarDeckSelector;
window.renderHangar = renderHangar;
window.renderHome = renderHome;

