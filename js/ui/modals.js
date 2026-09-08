/* WRBrain - Interactive Modals & Command Decks */

window.currentAuditHangar = window.currentAuditHangar || "hangar1";
let activeCatalogType = "robot";
let activeEquipTarget = null;


window.openAddCatalogModal = function(type) {
      activeCatalogType = type;
      const modal = document.getElementById('catalog-modal');
      const titleEl = document.getElementById('catalog-modal-title');
      if (type === 'robot') titleEl.innerText = "➕ Add Robot to Reserve";
      else if (type === 'weapon') titleEl.innerText = "➕ Add Weapon to Arsenal";
      else if (type === 'titan') titleEl.innerText = "➕ Add Titan Chassis to Reserve";
      else if (type === 'support') titleEl.innerText = "➕ Add Drone, Pilot or Mothership";
      else titleEl.innerText = "➕ Add to Storage";
      modal.classList.remove('hidden');
      filterCatalogModal();
    };

    window.openAddRobotModal = function(hangarKey, slotIndex = 0) {
      activeCatalogType = "robot_slot";
      activeEquipTarget = { hangarKey, slotIndex };
      const modal = document.getElementById('catalog-modal');
      document.getElementById('catalog-modal-title').innerText = `➕ Equip Robot to ${hangarKey.toUpperCase()} (Slot ${slotIndex + 1})`;
      modal.classList.remove('hidden');
      filterCatalogModal();
    };

    window.openEquipTitanModal = function(hangarKey) {
      activeCatalogType = "titan_slot";
      activeEquipTarget = { hangarKey };
      const modal = document.getElementById('catalog-modal');
      document.getElementById('catalog-modal-title').innerText = `👑 Deploy Titan to ${hangarKey.toUpperCase()}`;
      modal.classList.remove('hidden');
      filterCatalogModal();
    };

    window.openEquipDroneModal = function(hangarKey, slotIndex) {
      activeCatalogType = "drone_slot";
      activeEquipTarget = { hangarKey, slotIndex };
      openDroneConfigModal(hangarKey, slotIndex);
    };

    // =========================================================================
    // 1. WEAPON CONFIGURATION & ARMORY SYSTEM
    // =========================================================================
    let activeWeaponPickerTier = "ALL";

    window.openWeaponConfigModal = function(hangarKey, slotIndex, hardpointIndex, isTitan = false) {
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      let size = "Heavy";
      let equippedWeapon = null;
      let targetName = "";

      if (isTitan) {
        const titanSlot = hangar.titanSlot;
        const mt = titanSlot && titanSlot.titanId ? (MASTER_TITANS.find(t => t.id === titanSlot.titanId) || { hardpoints: [{ size: "Alpha" }, { size: "Beta" }, { size: "Beta" }] }) : { hardpoints: [{ size: "Alpha" }, { size: "Beta" }, { size: "Beta" }] };
        const hp = mt.hardpoints[hardpointIndex] || { size: hardpointIndex === 0 ? "Alpha" : "Beta" };
        size = hp.size;
        equippedWeapon = titanSlot && titanSlot.weapons ? titanSlot.weapons[hardpointIndex] : null;
        targetName = `Titan ${titanSlot?.titanId ? (MASTER_TITANS.find(t=>t.id===titanSlot.titanId)?.name || 'Titan') : 'Deck'}`;
      } else {
        const slot = hangar.slots[slotIndex];
        const mb = slot && slot.robotId ? (MASTER_ROBOTS.find(r => r.id === slot.robotId) || { hardpoints: [{ size: "Heavy" }] }) : { hardpoints: [{ size: "Heavy" }] };
        const hp = mb.hardpoints[hardpointIndex] || { size: "Heavy" };
        size = hp.size;
        equippedWeapon = slot && slot.weapons ? slot.weapons[hardpointIndex] : null;
        targetName = `Bay 0${slotIndex + 1}: ${mb.name || 'Combat Bay'}`;
      }

      activeEquipTarget = { hangarKey, slotIndex, hardpointIndex, isTitan, size };

      // Set titles
      document.getElementById('picker-modal-title').innerHTML = `🔫 ${size} Mount #${hardpointIndex + 1} • <span class="text-amber-400">${targetName}</span>`;
      document.getElementById('picker-modal-subtitle').innerText = isTitan ? `Manage Titan ${size} Weapon Hardpoint & Upgrade Level` : `Manage ${size} Weapon Mount & Upgrade Level`;

      // Render Current Weapon Card
      renderCurrentWeaponCard(equippedWeapon, size, isTitan);

      // Render Tier Filters
      renderWeaponPickerTierFilters(isTitan);

      // Render Weapons List
      filterWeaponPickerModal();

      document.getElementById('weapon-picker-modal').classList.remove('hidden');
    };

    // Backward compatible aliases
    window.openEquipWeaponModal = function(hangarKey, slotIndex, hardpointIndex, size) {
      window.openWeaponConfigModal(hangarKey, slotIndex, hardpointIndex, false);
    };
    window.openEquipTitanWeaponModal = function(hangarKey, hardpointIndex, size) {
      window.openWeaponConfigModal(hangarKey, null, hardpointIndex, true);
    };

    function renderCurrentWeaponCard(equippedWeapon, size, isTitan) {
      const container = document.getElementById('picker-current-weapon-card');
      if (!container) return;

      if (equippedWeapon && equippedWeapon.id) {
        const mw = MASTER_WEAPONS.find(w => w.id === equippedWeapon.id) || { name: equippedWeapon.name || equippedWeapon.id, tier: "T4", size, range: 500, burstDps: 20000, sustainedDps: 15000, reloadTime: "5s", family: "Arsenal" };
        const multType = isTitan ? 'titan_weapon' : 'bot_or_weapon';
        const curLevel = equippedWeapon.level || 'Lv 1';
        const mult = getLevelMultiplier(curLevel, multType);
        const burstDPS = Math.round((mw.burstDps || 0) * mult);
        const cycleDPS = Math.round((mw.sustainedDps || 0) * mult);
        const levelsArray = isTitan ? TITAN_WEAPON_LEVELS : BOT_LEVELS;

        let levelOptionsHtml = levelsArray.map(lvl => `<option value="${lvl}" ${lvl === curLevel ? 'selected' : ''}>${lvl}</option>`).join('');

        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-gradient-to-br from-[#0c121e] to-[#080c14] border border-amber-500/40 shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="badge-${(mw.tier||'t4').toLowerCase()} text-[10px] font-black px-2 py-0.5 rounded uppercase">${mw.tier}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded ${size === 'Heavy' || size === 'Alpha' ? 'bg-red-950 text-red-300 border border-red-800/40' : size === 'Medium' || size === 'Beta' ? 'bg-amber-950 text-amber-300 border border-amber-800/40' : 'bg-blue-950 text-blue-300 border border-blue-800/40'}">${size.toUpperCase()}</span>
                <span class="text-xs font-bold text-gray-400">Currently Installed</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button onclick="inspectWeaponVariants('${mw.id}')" class="text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/25 px-2.5 py-1 rounded-lg border border-amber-500/30 font-bold transition-all flex items-center gap-1">
                  🔗 Sibling Variants
                </button>
                <button onclick="unequipActiveWeapon()" class="text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/40 font-bold transition-all flex items-center gap-1">
                  ✕ Unequip
                </button>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <div>
                <h4 class="text-xl font-black text-white">${mw.name}</h4>
                <p class="text-xs text-gray-400 mt-0.5">${mw.family} Family • ${mw.range}m Optimal Range ${mw.status ? `• <span class="text-amber-300 font-semibold">${mw.status}</span>` : ''}</p>
              </div>

              <!-- LIVE LEVEL PICKER -->
              <div class="flex items-center gap-2 bg-[#161f2e] p-1.5 px-3 rounded-xl border border-[#263040]">
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">Level:</span>
                <select onchange="changeActiveWeaponLevel(this.value)" class="bg-[#080c14] text-amber-400 font-bold font-mono text-xs rounded-lg px-2.5 py-1 border border-amber-500/40 focus:outline-none cursor-pointer">
                  ${levelOptionsHtml}
                </select>
              </div>
            </div>

            <!-- LIVE STATS GRID -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#263040]">
              <div class="p-2 rounded-xl bg-[#080c14] border border-[#263040] text-center">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Burst Output</span>
                <span class="text-sm font-black text-red-400 font-mono">${burstDPS.toLocaleString()} DPS</span>
              </div>
              <div class="p-2 rounded-xl bg-[#080c14] border border-[#263040] text-center">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Cycle Output</span>
                <span class="text-sm font-black text-amber-400 font-mono">${cycleDPS.toLocaleString()} DPS</span>
              </div>
              <div class="p-2 rounded-xl bg-[#080c14] border border-[#263040] text-center">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Range</span>
                <span class="text-sm font-black text-blue-400 font-mono">${mw.range}m</span>
              </div>
              <div class="p-2 rounded-xl bg-[#080c14] border border-[#263040] text-center">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Reload Cooldown</span>
                <span class="text-sm font-black text-emerald-400 font-mono">${mw.reloadTime || '5s'}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-[#080c14] border border-dashed border-[#263040] flex items-center justify-between text-xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#161f2e] border border-[#263040] flex items-center justify-center text-lg">
                🔫
              </div>
              <div>
                <span class="font-bold text-gray-300 text-sm">Hardpoint Unoccupied (${size})</span>
                <p class="text-[11px] text-gray-500">Select any weapon from your storage or the catalog below to equip.</p>
              </div>
            </div>
          </div>
        `;
      }
    }

    window.changeActiveWeaponLevel = function(newLevel) {
      if (!activeEquipTarget) return;
      const { hangarKey, slotIndex, hardpointIndex, isTitan } = activeEquipTarget;
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      if (isTitan) {
        if (hangar.titanSlot && hangar.titanSlot.weapons && hangar.titanSlot.weapons[hardpointIndex]) {
          hangar.titanSlot.weapons[hardpointIndex].level = newLevel;
        }
      } else {
        if (hangar.slots && hangar.slots[slotIndex] && hangar.slots[slotIndex].weapons && hangar.slots[slotIndex].weapons[hardpointIndex]) {
          hangar.slots[slotIndex].weapons[hardpointIndex].level = newLevel;
        }
      }

      saveState();
      renderHangar(hangarKey);

      // Re-render current card in modal with updated stats
      const equippedWeapon = isTitan ? hangar.titanSlot?.weapons[hardpointIndex] : hangar.slots[slotIndex]?.weapons[hardpointIndex];
      renderCurrentWeaponCard(equippedWeapon, activeEquipTarget.size, isTitan);
    };

    window.unequipActiveWeapon = function() {
      if (!activeEquipTarget) return;
      const { hangarKey, slotIndex, hardpointIndex, isTitan } = activeEquipTarget;
      if (isTitan) unequipTitanWeapon(hangarKey, hardpointIndex);
      else unequipWeapon(hangarKey, slotIndex, hardpointIndex);

      renderCurrentWeaponCard(null, activeEquipTarget.size, isTitan);
      filterWeaponPickerModal();
    };

    function renderWeaponPickerTierFilters(isTitan) {
      const container = document.getElementById('weapon-picker-tier-filters');
      if (!container) return;
      const tiers = isTitan ? ["ALL", "T4", "T3"] : ["ALL", "ULTIMATE", "T4", "T3", "T2", "T1"];
      activeWeaponPickerTier = "ALL";

      container.innerHTML = tiers.map(t => `
        <button onclick="setWeaponPickerTier('${t}')" id="wp-tier-${t}" class="px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${t === 'ALL' ? 'bg-amber-500 text-black shadow font-black' : 'bg-[#080c14] text-gray-400 hover:text-white border border-[#263040]'}">
          ${t}
        </button>
      `).join('');
    }

    window.setWeaponPickerTier = function(tier) {
      activeWeaponPickerTier = tier;
      document.querySelectorAll('#weapon-picker-tier-filters button').forEach(b => {
        b.className = "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all bg-[#080c14] text-gray-400 hover:text-white border border-[#263040]";
      });
      const activeBtn = document.getElementById(`wp-tier-${tier}`);
      if (activeBtn) activeBtn.className = "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all bg-amber-500 text-black shadow font-black";
      filterWeaponPickerModal();
    };

    window.filterWeaponPickerModal = function() {
      if (!activeEquipTarget) return;
      const container = document.getElementById('picker-weapons-list');
      const countBadge = document.getElementById('picker-weapon-count-badge');
      if (!container) return;

      const search = (document.getElementById('weapon-picker-search')?.value || '').toLowerCase();
      const targetSize = activeEquipTarget.size.toLowerCase();
      container.innerHTML = "";

      // 1. From Storage
      const storageWeapons = (AppState.reserveWeapons && AppState.reserveWeapons[targetSize]) ? AppState.reserveWeapons[targetSize] : [];
      const filteredStorage = storageWeapons.filter(w => {
        const matchesSearch = w.name.toLowerCase().includes(search);
        const matchesTier = activeWeaponPickerTier === 'ALL' || (w.tier === activeWeaponPickerTier);
        return matchesSearch && matchesTier;
      });

      if (filteredStorage.length > 0) {
        container.innerHTML += `<div class="text-[11px] font-black text-amber-400 uppercase tracking-widest pt-1">📦 From Your Storage Inventory</div>`;
        filteredStorage.forEach(w => {
          const mw = MASTER_WEAPONS.find(item => item.id === w.id);
          container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#161f2e] border border-[#263040] hover:border-amber-500/40 rounded-xl text-xs transition-all">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-${(w.tier||'t4').toLowerCase()} text-[9px] font-black px-1.5 py-0.2 rounded uppercase">${w.tier||'T4'}</span>
                  <span class="font-bold text-white text-sm">${w.name}</span>
                  <span class="text-amber-400 font-mono text-[11px]">(${w.level || 'Lv 1'})</span>
                  <span class="text-gray-400 text-[10px]">x${w.count} Available</span>
                </div>
                <span class="text-gray-400 text-[11px] block mt-0.5">${mw ? `${mw.range}m • ${mw.family} • ${mw.burstDps.toLocaleString()} Base Burst` : ''}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${mw ? `<button onclick="inspectWeaponVariants('${mw.id}')" class="text-[11px] text-amber-400 hover:underline px-2 py-1">Variants</button>` : ''}
                <button onclick="equipWeaponDirect('${w.id}', '${w.level}', true)" class="px-3.5 py-1.5 text-xs font-black rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow transition-all hover:scale-105">
                  Equip
                </button>
              </div>
            </div>
          `;
        });
      }

      // 2. From Master Catalog
      const allMatching = MASTER_WEAPONS.filter(w => w.size.toLowerCase() === targetSize);
      const filteredCatalog = allMatching.filter(w => {
        const matchesSearch = w.name.toLowerCase().includes(search) || (w.family && w.family.toLowerCase().includes(search));
        const matchesTier = activeWeaponPickerTier === 'ALL' || (w.tier === activeWeaponPickerTier);
        return matchesSearch && matchesTier;
      });

      if (countBadge) countBadge.innerText = `${filteredCatalog.length} Compatible Weapons`;

      container.innerHTML += `<div class="text-[11px] font-black text-gray-400 uppercase tracking-widest pt-2">🔫 Complete WR Armory Codex</div>`;
      filteredCatalog.forEach(mw => {
        container.innerHTML += `
          <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#131b29] border border-[#263040] hover:border-amber-500/40 rounded-xl text-xs transition-all">
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-${mw.tier.toLowerCase()} text-[9px] font-black px-1.5 py-0.2 rounded uppercase">${mw.tier}</span>
                <span class="font-bold text-white text-sm">${mw.name}</span>
                <span class="text-blue-400 font-mono text-[11px]">${mw.range}m</span>
              </div>
              <span class="text-gray-400 text-[11px] block mt-0.5">${mw.family} • <strong class="text-red-400">${mw.burstDps.toLocaleString()} Burst DPS</strong> ${mw.status ? `• <span class="text-amber-300 font-semibold">${mw.status}</span>` : ''}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button onclick="inspectWeaponVariants('${mw.id}')" class="text-[11px] text-amber-400 hover:underline px-2 py-1">Variants</button>
              <button onclick="equipWeaponDirect('${mw.id}', 'Lv 1', false)" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-gray-200 border border-[#263040] transition-all hover:scale-105">
                Equip (Lv 1)
              </button>
            </div>
          </div>
        `;
      });
    };

    // =========================================================================
    // 2. ROBOT BAY CONFIGURATION SYSTEM
    // =========================================================================
    let activeRobotConfigRole = "ALL";
    let activeRobotConfigTarget = null;

    window.openRobotConfigModal = function(hangarKey, slotIndex = 0) {
      activeRobotConfigTarget = { hangarKey, slotIndex };
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;
      const slot = hangar.slots[slotIndex];

      document.getElementById('robot-config-modal-title').innerHTML = `🤖 Bay 0${slotIndex + 1} • <span class="text-amber-400">${hangar.name.split(':')[0]}</span>`;
      document.getElementById('robot-config-modal-subtitle').innerText = `Configure Robot Chassis, Upgrade Level (Lv 1 to MK3) or Deploy New Unit`;

      renderCurrentRobotCard(slot, hangarKey, slotIndex);
      renderRobotConfigRoleFilters();
      filterRobotConfigModal();

      document.getElementById('robot-config-modal').classList.remove('hidden');
    };

    // Alias for backward compatibility
    window.openAddRobotModal = function(hangarKey, slotIndex = 0) {
      window.openRobotConfigModal(hangarKey, slotIndex);
    };

    function renderCurrentRobotCard(slot, hangarKey, slotIndex) {
      const container = document.getElementById('robot-config-current-card');
      if (!container) return;

      if (slot && slot.robotId) {
        const mb = MASTER_ROBOTS.find(r => r.id === slot.robotId) || { name: slot.robotId, tier: "T4", role: "Brawler", faction: "SpaceTech", hp: 220000, speed: 50, ability: "Combat Overdrive", hardpoints: [] };
        const curLevel = slot.level || 'Lv 1';
        const mult = getLevelMultiplier(curLevel, 'bot_or_weapon');
        const scaledHp = Math.round((mb.hp || 220000) * mult);
        const hardpointsStr = (mb.hardpoints || []).map(h => `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${h.size === 'Heavy' ? 'bg-red-950 text-red-300' : h.size === 'Medium' ? 'bg-amber-950 text-amber-300' : 'bg-blue-950 text-blue-300'}">${h.size}</span>`).join(' ');

        let levelOptionsHtml = BOT_LEVELS.map(lvl => `<option value="${lvl}" ${lvl === curLevel ? 'selected' : ''}>${lvl}</option>`).join('');

        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-gradient-to-br from-[#0c121e] to-[#080c14] border border-blue-500/40 shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="badge-${mb.tier.toLowerCase()} text-[10px] font-black px-2 py-0.5 rounded uppercase">${mb.tier}</span>
                <span class="text-xs font-bold text-gray-400">Deployed in Bay 0${slotIndex + 1}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${mb.seriesKey ? `<button onclick="inspectRobotSeries('${mb.id}')" class="text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/25 px-2.5 py-1 rounded-lg border border-amber-500/30 font-bold transition-all">🧬 Series Family</button>` : ''}
                <button onclick="unequipRobot('${hangarKey}', ${slotIndex}); closeModal('robot-config-modal');" class="text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/40 font-bold transition-all">
                  📦 Send to Storage
                </button>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <div>
                <h4 class="text-2xl font-black text-white">${mb.name}</h4>
                <p class="text-xs text-gray-400 mt-0.5">${mb.faction} • ${mb.role} • Speed: ${mb.speed} km/h</p>
              </div>

              <!-- LIVE LEVEL PICKER -->
              <div class="flex items-center gap-2 bg-[#161f2e] p-1.5 px-3 rounded-xl border border-[#263040]">
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">Level:</span>
                <select onchange="changeActiveRobotLevel(this.value)" class="bg-[#080c14] text-amber-400 font-bold font-mono text-xs rounded-lg px-2.5 py-1 border border-amber-500/40 focus:outline-none cursor-pointer">
                  ${levelOptionsHtml}
                </select>
              </div>
            </div>

            <!-- STATS & ABILITY -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#263040]">
              <div class="p-2.5 rounded-xl bg-[#080c14] border border-[#263040]">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Durability HP</span>
                <span class="text-sm font-black text-emerald-400 font-mono">${scaledHp.toLocaleString()} HP</span>
              </div>
              <div class="p-2.5 rounded-xl bg-[#080c14] border border-[#263040]">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Hardpoint Mounts</span>
                <div class="flex flex-wrap gap-1 mt-1">${hardpointsStr}</div>
              </div>
              <div class="p-2.5 rounded-xl bg-[#080c14] border border-[#263040]">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Special Ability</span>
                <span class="text-xs font-bold text-amber-300 truncate block mt-0.5">${mb.ability}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-[#080c14] border border-dashed border-[#263040] flex items-center justify-between text-xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#161f2e] border border-[#263040] flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <span class="font-bold text-gray-300 text-sm">Bay 0${slotIndex + 1}: Unoccupied</span>
                <p class="text-[11px] text-gray-500">Select any combat robot from the catalog below to deploy to this bay.</p>
              </div>
            </div>
          </div>
        `;
      }
    }

    window.changeActiveRobotLevel = function(newLevel) {
      if (!activeRobotConfigTarget) return;
      const { hangarKey, slotIndex } = activeRobotConfigTarget;
      const hangar = AppState.hangars[hangarKey];
      if (!hangar || !hangar.slots[slotIndex]) return;

      hangar.slots[slotIndex].level = newLevel;
      saveState();
      renderHangar(hangarKey);
      renderCurrentRobotCard(hangar.slots[slotIndex], hangarKey, slotIndex);
    };

    function renderRobotConfigRoleFilters() {
      const container = document.getElementById('robot-config-role-filters');
      if (!container) return;
      const roles = ["ALL", "Brawler", "Tank", "Beacon Runner", "Sniper", "Support"];
      activeRobotConfigRole = "ALL";

      container.innerHTML = roles.map(r => `
        <button onclick="setRobotConfigRole('${r}')" id="rc-role-${r}" class="px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${r === 'ALL' ? 'bg-amber-500 text-black shadow font-black' : 'bg-[#080c14] text-gray-400 hover:text-white border border-[#263040]'}">
          ${r}
        </button>
      `).join('');
    }

    window.setRobotConfigRole = function(role) {
      activeRobotConfigRole = role;
      document.querySelectorAll('#robot-config-role-filters button').forEach(b => {
        b.className = "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all bg-[#080c14] text-gray-400 hover:text-white border border-[#263040]";
      });
      const activeBtn = document.getElementById(`rc-role-${role}`);
      if (activeBtn) activeBtn.className = "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all bg-amber-500 text-black shadow font-black";
      filterRobotConfigModal();
    };

    window.filterRobotConfigModal = function() {
      if (!activeRobotConfigTarget) return;
      const container = document.getElementById('robot-config-list');
      const countBadge = document.getElementById('robot-config-count-badge');
      if (!container) return;

      const search = (document.getElementById('robot-config-search')?.value || '').toLowerCase();
      container.innerHTML = "";

      // 1. From Storage
      const storageBots = AppState.reserveRobots || [];
      const normalizedStorage = storageBots.map(r => {
        const botId = r.robotId || r.id;
        const mb = MASTER_ROBOTS.find(item => item.id === botId) || { name: botId, role: "Brawler", faction: "SpaceTech", tier: r.tier || "T4" };
        return {
          id: botId,
          name: mb.name,
          level: r.level || 'Lv 1',
          tier: r.tier || mb.tier,
          role: mb.role,
          faction: mb.faction,
          count: r.count || 1
        };
      });

      const filteredStorage = normalizedStorage.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search) || (r.role||'').toLowerCase().includes(search);
        const matchesRole = activeRobotConfigRole === 'ALL' || (r.role === activeRobotConfigRole);
        return matchesSearch && matchesRole;
      });

      if (filteredStorage.length > 0) {
        container.innerHTML += `<div class="text-[11px] font-black text-amber-400 uppercase tracking-widest pt-1">📦 From Your Robot Reserve Storage</div>`;
        filteredStorage.forEach(r => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#161f2e] border border-[#263040] hover:border-amber-500/40 rounded-xl text-xs transition-all">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-${(r.tier||'t4').toLowerCase()} text-[9px] font-black px-1.5 py-0.2 rounded uppercase">${r.tier||'T4'}</span>
                  <span class="font-bold text-white text-sm">${r.name}</span>
                  <span class="text-amber-400 font-mono text-[11px]">(${r.level || 'Lv 1'})</span>
                  <span class="text-gray-400 text-[10px]">x${r.count} in Storage</span>
                </div>
                <span class="text-gray-400 text-[11px] block mt-0.5">${r.role} • ${r.faction}</span>
              </div>
              <button onclick="deployRobotDirect('${r.id}', '${r.level}', true)" class="px-3.5 py-1.5 text-xs font-black rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow transition-all hover:scale-105">
                Deploy
              </button>
            </div>
          `;
        });
      }


      // 2. From Master Catalog
      const filteredCatalog = MASTER_ROBOTS.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search) || r.role.toLowerCase().includes(search) || r.faction.toLowerCase().includes(search);
        const matchesRole = activeRobotConfigRole === 'ALL' || (r.role === activeRobotConfigRole);
        return matchesSearch && matchesRole;
      });

      if (countBadge) countBadge.innerText = `${filteredCatalog.length} Robots Available`;

      container.innerHTML += `<div class="text-[11px] font-black text-gray-400 uppercase tracking-widest pt-2">🤖 Complete War Robots Master Catalog</div>`;
      filteredCatalog.forEach(r => {
        container.innerHTML += `
          <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#131b29] border border-[#263040] hover:border-amber-500/40 rounded-xl text-xs transition-all">
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-${r.tier.toLowerCase()} text-[9px] font-black px-1.5 py-0.2 rounded uppercase">${r.tier}</span>
                <span class="font-bold text-white text-sm">${r.name}</span>
                <span class="text-emerald-400 font-mono text-[11px]">${r.hp.toLocaleString()} HP</span>
              </div>
              <span class="text-gray-400 text-[11px] block mt-0.5">${r.role} • ${r.faction} • ${r.hardpoints.map(h => h.size).join(" + ")}</span>
            </div>
            <button onclick="deployRobotDirect('${r.id}', 'Lv 1', false)" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-gray-200 border border-[#263040] transition-all hover:scale-105">
              Deploy (Lv 1)
            </button>
          </div>
        `;
      });
    };

    window.deployRobotDirect = function(robotId, level, fromStorage) {
      if (!activeRobotConfigTarget) return;
      const { hangarKey, slotIndex } = activeRobotConfigTarget;
      const mb = MASTER_ROBOTS.find(r => r.id === robotId);
      if (!mb) return;

      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      const oldSlot = hangar.slots[slotIndex];
      if (oldSlot && oldSlot.robotId) {
        if (!AppState.reserveRobots) AppState.reserveRobots = [];
        const ex = AppState.reserveRobots.find(x => x.id === oldSlot.robotId && x.level === oldSlot.level);
        if (ex) ex.count = (ex.count || 1) + 1;
        else AppState.reserveRobots.push({ id: oldSlot.robotId, name: MASTER_ROBOTS.find(r=>r.id===oldSlot.robotId)?.name || oldSlot.robotId, level: oldSlot.level || 'Lv 1', tier: MASTER_ROBOTS.find(r=>r.id===oldSlot.robotId)?.tier || 'T4', role: MASTER_ROBOTS.find(r=>r.id===oldSlot.robotId)?.role || 'Brawler', count: 1 });
      }

      if (fromStorage && AppState.reserveRobots) {
        const idx = AppState.reserveRobots.findIndex(r => r.id === robotId && r.level === level);
        if (idx !== -1) {
          if (AppState.reserveRobots[idx].count > 1) AppState.reserveRobots[idx].count--;
          else AppState.reserveRobots.splice(idx, 1);
        }
      }

      // Populate default empty weapon slots matching robot hardpoints
      const weapons = (mb.hardpoints || []).map(hp => {
        const mw = MASTER_WEAPONS.find(w => w.size.toLowerCase() === hp.size.toLowerCase());
        return mw ? { id: mw.id, size: hp.size, level: "Lv 1" } : null;
      });

      hangar.slots[slotIndex] = {
        robotId: mb.id,
        level: level || "Lv 1",
        weapons,
        drone: oldSlot?.drone || null,
        pilot: oldSlot?.pilot || null
      };

      saveState();
      closeModal('robot-config-modal');
      renderHangar(hangarKey);
    };

    // =========================================================================
    // 3. PILOT CONFIGURATION SYSTEM
    // =========================================================================
    let activePilotConfigTarget = null;

    window.openPilotConfigModal = function(hangarKey, slotIndex) {
      activePilotConfigTarget = { hangarKey, slotIndex };
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;
      const slot = hangar.slots[slotIndex];

      document.getElementById('pilot-config-modal-title').innerHTML = `🧑‍✈️ Bay 0${slotIndex + 1} • <span class="text-purple-400">Legendary Pilot Command</span>`;
      document.getElementById('pilot-config-modal-subtitle').innerText = `Assign Legendary Pilot, Level Up, and Fine-Tune 7 Combat Synergy Skills`;

      renderCurrentPilotCard(slot, hangarKey, slotIndex);
      filterPilotConfigModal();

      document.getElementById('pilot-config-modal').classList.remove('hidden');
    };

    function renderCurrentPilotCard(slot, hangarKey, slotIndex) {
      const container = document.getElementById('pilot-config-current-card');
      if (!container) return;

      if (slot && slot.pilot && slot.pilot.name) {
        const p = slot.pilot;
        const mp = MASTER_PILOTS.find(item => item.id === p.id) || { name: p.name, skill: p.skill || "Combat Specialist", bot: p.bot || "All Robots" };
        const curLevel = p.level || 'Lv 1';
        const skillsCount = (p.skills || []).length;

        let levelOptionsHtml = PILOT_LEVELS.map(lvl => `<option value="${lvl}" ${lvl === curLevel ? 'selected' : ''}>${lvl}</option>`).join('');

        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-gradient-to-br from-[#180f2b] to-[#080c14] border border-purple-500/40 shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="badge-t4 text-[10px] font-black px-2 py-0.5 rounded uppercase">LEGENDARY PILOT</span>
                <span class="text-xs font-bold text-gray-400">Assigned to Bay 0${slotIndex + 1}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button onclick="closeModal('pilot-config-modal'); openPilotSkillsModal('${hangarKey}', ${slotIndex});" class="text-xs text-purple-300 bg-purple-900/40 hover:bg-purple-900/80 px-3 py-1 rounded-lg border border-purple-500/40 font-bold transition-all flex items-center gap-1">
                  ✨ Configure 7 Skills (${skillsCount}/7)
                </button>
                <button onclick="unequipPilot('${hangarKey}', ${slotIndex}); renderCurrentPilotCard(null, '${hangarKey}', ${slotIndex});" class="text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/40 font-bold transition-all">
                  ✕ Unequip
                </button>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <div>
                <h4 class="text-2xl font-black text-white">🧑‍✈️ ${p.name}</h4>
                <p class="text-xs text-purple-200 mt-0.5">Synergy Specialty: <strong>${mp.bot}</strong></p>
              </div>

              <!-- LIVE LEVEL PICKER -->
              <div class="flex items-center gap-2 bg-[#161f2e] p-1.5 px-3 rounded-xl border border-[#263040]">
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">Level:</span>
                <select onchange="changeActivePilotLevel(this.value)" class="bg-[#080c14] text-purple-300 font-bold font-mono text-xs rounded-lg px-2.5 py-1 border border-purple-500/40 focus:outline-none cursor-pointer">
                  ${levelOptionsHtml}
                </select>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-[#080c14] border border-purple-500/30 text-xs">
              <span class="text-[10px] text-purple-400 uppercase font-bold block">Innate Legendary Ability</span>
              <p class="text-purple-100 text-xs mt-0.5 leading-relaxed font-medium">⚡ ${mp.skill}</p>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-[#080c14] border border-dashed border-[#263040] flex items-center justify-between text-xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#161f2e] border border-[#263040] flex items-center justify-center text-lg">
                🧑‍✈️
              </div>
              <div>
                <span class="font-bold text-gray-300 text-sm">No Legendary Pilot Assigned</span>
                <p class="text-[11px] text-gray-500">Select a Legendary Pilot from the catalog below to unlock specialized combat perks.</p>
              </div>
            </div>
          </div>
        `;
      }
    }

    window.changeActivePilotLevel = function(newLevel) {
      if (!activePilotConfigTarget) return;
      const { hangarKey, slotIndex } = activePilotConfigTarget;
      const hangar = AppState.hangars[hangarKey];
      if (!hangar || !hangar.slots[slotIndex] || !hangar.slots[slotIndex].pilot) return;

      hangar.slots[slotIndex].pilot.level = newLevel;
      saveState();
      renderHangar(hangarKey);
      renderCurrentPilotCard(hangar.slots[slotIndex], hangarKey, slotIndex);
    };

    window.filterPilotConfigModal = function() {
      if (!activePilotConfigTarget) return;
      const container = document.getElementById('pilot-config-list');
      const countBadge = document.getElementById('pilot-config-count-badge');
      if (!container) return;

      const search = (document.getElementById('pilot-config-search')?.value || '').toLowerCase();
      const filtered = MASTER_PILOTS.filter(p => p.name.toLowerCase().includes(search) || p.bot.toLowerCase().includes(search) || p.skill.toLowerCase().includes(search));

      if (countBadge) countBadge.innerText = `${filtered.length} Pilots Available`;
      container.innerHTML = "";

      filtered.forEach(p => {
        container.innerHTML += `
          <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#161426] border border-[#263040] hover:border-purple-500/40 rounded-xl text-xs transition-all">
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-t4 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">PILOT</span>
                <span class="font-bold text-white text-sm">🧑‍✈️ ${p.name}</span>
                <span class="text-purple-400 font-mono text-[11px]">(${p.bot})</span>
              </div>
              <p class="text-gray-400 text-[11px] mt-0.5 line-clamp-1">${p.skill}</p>
            </div>
            <button onclick="assignPilotDirect('${p.id}', 'Lv 1')" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white shadow transition-all hover:scale-105 shrink-0 ml-2">
              Assign Pilot
            </button>
          </div>
        `;
      });
    };

    window.assignPilotDirect = function(pilotId, level) {
      if (!activePilotConfigTarget) return;
      const { hangarKey, slotIndex } = activePilotConfigTarget;
      activeEquipTarget = { hangarKey, slotIndex };
      equipPilotDirect(pilotId, level, false);
      renderCurrentPilotCard(AppState.hangars[hangarKey].slots[slotIndex], hangarKey, slotIndex);
    };

    // =========================================================================
    // 4. DRONE CONFIGURATION SYSTEM
    // =========================================================================
    let activeDroneConfigTarget = null;

    window.openDroneConfigModal = function(hangarKey, slotIndex) {
      activeDroneConfigTarget = { hangarKey, slotIndex };
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;
      const slot = hangar.slots[slotIndex];

      document.getElementById('drone-config-modal-title').innerHTML = `🛸 Bay 0${slotIndex + 1} • <span class="text-cyan-400">Tactical Drone Support</span>`;
      document.getElementById('drone-config-modal-subtitle').innerText = `Attach Tactical Drone, Upgrade Level (Lv 1 to Lv 12), and Enable Combat Microchips`;

      renderCurrentDroneCard(slot, hangarKey, slotIndex);
      filterDroneConfigModal();

      document.getElementById('drone-config-modal').classList.remove('hidden');
    };

    function renderCurrentDroneCard(slot, hangarKey, slotIndex) {
      const container = document.getElementById('drone-config-current-card');
      if (!container) return;

      if (slot && slot.drone && slot.drone.name) {
        const d = slot.drone;
        const md = MASTER_DRONES.find(item => item.id === d.id) || { name: d.name, effect: "Combat Support Microchips" };
        const curLevel = d.level || 'Lv 12';

        let levelOptionsHtml = DRONE_LEVELS.map(lvl => `<option value="${lvl}" ${lvl === curLevel ? 'selected' : ''}>${lvl}</option>`).join('');

        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-gradient-to-br from-[#0a1824] to-[#080c14] border border-cyan-500/40 shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="badge-t4 text-[10px] font-black px-2 py-0.5 rounded uppercase">TACTICAL DRONE</span>
                <span class="text-xs font-bold text-gray-400">Attached to Bay 0${slotIndex + 1}</span>
              </div>
              <button onclick="unequipDrone('${hangarKey}', ${slotIndex}); renderCurrentDroneCard(null, '${hangarKey}', ${slotIndex});" class="text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/40 font-bold transition-all">
                ✕ Unequip
              </button>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <div>
                <h4 class="text-2xl font-black text-white">🛸 ${d.name}</h4>
                <p class="text-xs text-cyan-200 mt-0.5">Tier 4 Combat Drone Support Platform</p>
              </div>

              <!-- LIVE LEVEL PICKER -->
              <div class="flex items-center gap-2 bg-[#161f2e] p-1.5 px-3 rounded-xl border border-[#263040]">
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">Level:</span>
                <select onchange="changeActiveDroneLevel(this.value)" class="bg-[#080c14] text-cyan-300 font-bold font-mono text-xs rounded-lg px-2.5 py-1 border border-cyan-500/40 focus:outline-none cursor-pointer">
                  ${levelOptionsHtml}
                </select>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-[#080c14] border border-cyan-500/30 text-xs">
              <span class="text-[10px] text-cyan-400 uppercase font-bold block">Microchip Perks & Combat Abilities</span>
              <p class="text-cyan-100 text-xs mt-0.5 leading-relaxed font-medium">⚡ ${md.effect}</p>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-[#080c14] border border-dashed border-[#263040] flex items-center justify-between text-xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#161f2e] border border-[#263040] flex items-center justify-center text-lg">
                🛸
              </div>
              <div>
                <span class="font-bold text-gray-300 text-sm">No Drone Attached</span>
                <p class="text-[11px] text-gray-500">Select a Tactical Drone from the catalog below to provide automatic shields, repairs, or damage buffs.</p>
              </div>
            </div>
          </div>
        `;
      }
    }

    window.changeActiveDroneLevel = function(newLevel) {
      if (!activeDroneConfigTarget) return;
      const { hangarKey, slotIndex } = activeDroneConfigTarget;
      const hangar = AppState.hangars[hangarKey];
      if (!hangar || !hangar.slots[slotIndex] || !hangar.slots[slotIndex].drone) return;

      hangar.slots[slotIndex].drone.level = newLevel;
      saveState();
      renderHangar(hangarKey);
      renderCurrentDroneCard(hangar.slots[slotIndex], hangarKey, slotIndex);
    };

    window.filterDroneConfigModal = function() {
      if (!activeDroneConfigTarget) return;
      const container = document.getElementById('drone-config-list');
      const countBadge = document.getElementById('drone-config-count-badge');
      if (!container) return;

      const search = (document.getElementById('drone-config-search')?.value || '').toLowerCase();
      const filtered = MASTER_DRONES.filter(d => d.name.toLowerCase().includes(search) || d.effect.toLowerCase().includes(search));

      if (countBadge) countBadge.innerText = `${filtered.length} Drones Available`;
      container.innerHTML = "";

      filtered.forEach(d => {
        container.innerHTML += `
          <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#0c1a24] border border-[#263040] hover:border-cyan-500/40 rounded-xl text-xs transition-all">
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-t4 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">DRONE</span>
                <span class="font-bold text-white text-sm">🛸 ${d.name}</span>
              </div>
              <p class="text-gray-400 text-[11px] mt-0.5 line-clamp-1">${d.effect}</p>
            </div>
            <button onclick="attachDroneDirect('${d.id}', 'Lv 12')" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow transition-all hover:scale-105 shrink-0 ml-2">
              Attach Drone
            </button>
          </div>
        `;
      });
    };

    window.attachDroneDirect = function(droneId, level) {
      if (!activeDroneConfigTarget) return;
      const { hangarKey, slotIndex } = activeDroneConfigTarget;
      const md = MASTER_DRONES.find(d => d.id === droneId);
      if (!md) return;

      const hangar = AppState.hangars[hangarKey];
      if (!hangar || !hangar.slots[slotIndex]) return;

      hangar.slots[slotIndex].drone = { id: md.id, name: md.name, level: level || "Lv 12", tier: "T4", effect: md.effect };
      saveState();
      renderHangar(hangarKey);
      renderCurrentDroneCard(hangar.slots[slotIndex], hangarKey, slotIndex);
    };

    // =========================================================================
    // 5. TITAN CHASSIS CONFIGURATION SYSTEM
    // =========================================================================
    window.openTitanConfigModal = function(hangarKey) {
      activeEquipTarget = { hangarKey };
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      document.getElementById('titan-config-modal-title').innerHTML = `👑 Titan Command Deck • <span class="text-red-400">${hangar.name.split(':')[0]}</span>`;
      document.getElementById('titan-config-modal-subtitle').innerText = `Deploy Colossal Titan Chassis, Set Hull Level (Lv 1 to Lv 150), and Inspect Combat Systems`;

      renderCurrentTitanCard(hangar.titanSlot, hangarKey);
      filterTitanConfigModal();

      document.getElementById('titan-config-modal').classList.remove('hidden');
    };

    function renderCurrentTitanCard(titanSlot, hangarKey) {
      const container = document.getElementById('titan-config-current-card');
      if (!container) return;

      if (titanSlot && titanSlot.titanId) {
        const mt = MASTER_TITANS.find(t => t.id === titanSlot.titanId) || { name: titanSlot.titanId, tier: "T4", role: "Titan Brawler", hp: 950000, ability: "Heavy Combat Systems", hardpoints: [{ size: "Alpha" }, { size: "Beta" }, { size: "Beta" }] };
        const curLevel = titanSlot.level || 'Lv 15';
        const mult = getLevelMultiplier(curLevel, 'titan');
        const scaledHp = Math.round((mt.hp || 950000) * mult);
        const hardpointsStr = (mt.hardpoints || []).map(h => `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${h.size === 'Alpha' ? 'bg-red-950 text-red-300' : 'bg-amber-950 text-amber-300'}">${h.size}</span>`).join(' ');

        let levelOptionsHtml = TITAN_LEVELS.map(lvl => `<option value="${lvl}" ${lvl === curLevel ? 'selected' : ''}>${lvl}</option>`).join('');

        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-gradient-to-br from-[#240d11] to-[#080c14] border border-red-500/40 shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="badge-titan text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">TITAN CORE</span>
                <span class="text-xs font-bold text-gray-400">Command Center</span>
              </div>
              <button onclick="unequipTitan('${hangarKey}'); renderCurrentTitanCard(null, '${hangarKey}');" class="text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/40 font-bold transition-all">
                📦 Send to Storage
              </button>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <div>
                <h4 class="text-2xl font-black text-white">👑 ${mt.name}</h4>
                <p class="text-xs text-red-200 mt-0.5">${mt.role} • Colossal Titan Platform</p>
              </div>

              <!-- LIVE LEVEL PICKER -->
              <div class="flex items-center gap-2 bg-[#161f2e] p-1.5 px-3 rounded-xl border border-[#263040]">
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">Level:</span>
                <select onchange="changeActiveTitanLevel(this.value)" class="bg-[#080c14] text-red-400 font-bold font-mono text-xs rounded-lg px-2.5 py-1 border border-red-500/40 focus:outline-none cursor-pointer">
                  ${levelOptionsHtml}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#263040]">
              <div class="p-2.5 rounded-xl bg-[#080c14] border border-[#263040]">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Hull Durability</span>
                <span class="text-sm font-black text-emerald-400 font-mono">${scaledHp.toLocaleString()} HP</span>
              </div>
              <div class="p-2.5 rounded-xl bg-[#080c14] border border-[#263040]">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Heavy Mounts</span>
                <div class="flex flex-wrap gap-1 mt-1">${hardpointsStr}</div>
              </div>
              <div class="p-2.5 rounded-xl bg-[#080c14] border border-[#263040]">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Titan Ability</span>
                <span class="text-xs font-bold text-red-300 truncate block mt-0.5">${mt.ability}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-[#080c14] border border-dashed border-[#263040] flex items-center justify-between text-xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#161f2e] border border-[#263040] flex items-center justify-center text-lg">
                👑
              </div>
              <div>
                <span class="font-bold text-gray-300 text-sm">Titan Command Deck Unoccupied</span>
                <p class="text-[11px] text-gray-500">Select a Titan chassis from the catalog below to anchor your squad.</p>
              </div>
            </div>
          </div>
        `;
      }
    }

    window.changeActiveTitanLevel = function(newLevel) {
      if (!activeEquipTarget) return;
      const { hangarKey } = activeEquipTarget;
      const hangar = AppState.hangars[hangarKey];
      if (!hangar || !hangar.titanSlot) return;

      hangar.titanSlot.level = newLevel;
      saveState();
      renderHangar(hangarKey);
      renderCurrentTitanCard(hangar.titanSlot, hangarKey);
    };

    window.filterTitanConfigModal = function() {
      if (!activeEquipTarget) return;
      const container = document.getElementById('titan-config-list');
      const countBadge = document.getElementById('titan-config-count-badge');
      if (!container) return;

      const search = (document.getElementById('titan-config-search')?.value || '').toLowerCase();
      const filtered = MASTER_TITANS.filter(t => t.name.toLowerCase().includes(search) || t.role.toLowerCase().includes(search) || t.ability.toLowerCase().includes(search));

      if (countBadge) countBadge.innerText = `${filtered.length} Titans Available`;
      container.innerHTML = "";

      filtered.forEach(t => {
        container.innerHTML += `
          <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#1f0d11] border border-[#263040] hover:border-red-500/40 rounded-xl text-xs transition-all">
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-titan text-[9px] font-black px-1.5 py-0.2 rounded uppercase">TITAN</span>
                <span class="font-bold text-white text-sm">${t.name}</span>
                <span class="text-emerald-400 font-mono text-[11px]">${t.hp.toLocaleString()} HP</span>
              </div>
              <span class="text-gray-400 text-[11px] block mt-0.5">${t.role} • ${t.hardpoints.map(h => h.size).join(" + ")}</span>
            </div>
            <button onclick="deployTitanDirect('${t.id}', 'Lv 15')" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white shadow transition-all hover:scale-105 shrink-0 ml-2">
              Deploy Titan
            </button>
          </div>
        `;
      });
    };

    window.deployTitanDirect = function(titanId, level) {
      if (!activeEquipTarget) return;
      const { hangarKey } = activeEquipTarget;
      const mt = MASTER_TITANS.find(t => t.id === titanId);
      if (!mt) return;

      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      const oldTitan = hangar.titanSlot;
      const weapons = (mt.hardpoints || []).map(hp => {
        const mw = MASTER_WEAPONS.find(w => w.size.toLowerCase() === hp.size.toLowerCase());
        return mw ? { id: mw.id, size: hp.size, level: "Lv 1" } : null;
      });

      hangar.titanSlot = {
        titanId: mt.id,
        level: level || "Lv 15",
        weapons
      };

      saveState();
      closeModal('titan-config-modal');
      renderHangar(hangarKey);
    };

    // =========================================================================
    // 6. ORBITAL MOTHERSHIP CONFIGURATION SYSTEM
    // =========================================================================
    window.openMothershipConfigModal = function(hangarKey) {
      activeEquipTarget = { hangarKey };
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      document.getElementById('mothership-config-modal-title').innerHTML = `🚀 Orbital Mothership Deck • <span class="text-purple-400">${hangar.name.split(':')[0]}</span>`;
      document.getElementById('mothership-config-modal-subtitle').innerText = `Deploy Orbital Strike Platform, Set Level (Lv 1 to Lv 60), and Enable Combat Support`;

      renderCurrentMothershipCard(hangar.mothership, hangarKey);
      filterMothershipConfigModal();

      document.getElementById('mothership-config-modal').classList.remove('hidden');
    };

    function renderCurrentMothershipCard(mothershipSlot, hangarKey) {
      const container = document.getElementById('mothership-config-current-card');
      if (!container) return;

      if (mothershipSlot && mothershipSlot.id) {
        const mm = MASTER_MOTHERSHIPS.find(m => m.id === mothershipSlot.id) || { name: mothershipSlot.name || mothershipSlot.id, effect: "Orbital Strike Support Platform" };
        const curLevel = mothershipSlot.level || 'Lv 60';

        let levelOptionsHtml = MOTHERSHIP_LEVELS.map(lvl => `<option value="${lvl}" ${lvl === curLevel ? 'selected' : ''}>${lvl}</option>`).join('');

        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-gradient-to-br from-[#1b0d29] to-[#080c14] border border-purple-500/40 shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="badge-t4 text-[10px] font-black px-2 py-0.5 rounded uppercase">ORBITAL MOTHERSHIP</span>
                <span class="text-xs font-bold text-gray-400">Command Platform</span>
              </div>
              <button onclick="unequipMothership('${hangarKey}'); renderCurrentMothershipCard(null, '${hangarKey}');" class="text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/40 font-bold transition-all">
                ✕ Unequip
              </button>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <div>
                <h4 class="text-2xl font-black text-white">🚀 ${mm.name}</h4>
                <p class="text-xs text-purple-200 mt-0.5">Tier 4 Orbital Fleet Vessel</p>
              </div>

              <!-- LIVE LEVEL PICKER -->
              <div class="flex items-center gap-2 bg-[#161f2e] p-1.5 px-3 rounded-xl border border-[#263040]">
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">Level:</span>
                <select onchange="changeActiveMothershipLevel(this.value)" class="bg-[#080c14] text-purple-300 font-bold font-mono text-xs rounded-lg px-2.5 py-1 border border-purple-500/40 focus:outline-none cursor-pointer">
                  ${levelOptionsHtml}
                </select>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-[#080c14] border border-purple-500/30 text-xs">
              <span class="text-[10px] text-purple-400 uppercase font-bold block">Orbital Strike Ability & Cleansing Effects</span>
              <p class="text-purple-100 text-xs mt-0.5 leading-relaxed font-medium">⚡ ${mm.effect}</p>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-[#080c14] border border-dashed border-[#263040] flex items-center justify-between text-xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#161f2e] border border-[#263040] flex items-center justify-center text-lg">
                🚀
              </div>
              <div>
                <span class="font-bold text-gray-300 text-sm">Orbital Mothership Deck Unoccupied</span>
                <p class="text-[11px] text-gray-500">Deploy Paladin, Avalon, Roulette, or Orion for active orbital strikes, Aegis shields & status cleansing.</p>
              </div>
            </div>
          </div>
        `;
      }
    }

    window.changeActiveMothershipLevel = function(newLevel) {
      if (!activeEquipTarget) return;
      const { hangarKey } = activeEquipTarget;
      const hangar = AppState.hangars[hangarKey];
      if (!hangar || !hangar.mothership) return;

      hangar.mothership.level = newLevel;
      saveState();
      renderHangar(hangarKey);
      renderCurrentMothershipCard(hangar.mothership, hangarKey);
    };

    window.filterMothershipConfigModal = function() {
      if (!activeEquipTarget) return;
      const container = document.getElementById('mothership-config-list');
      if (!container) return;

      container.innerHTML = "";
      MASTER_MOTHERSHIPS.forEach(m => {
        container.innerHTML += `
          <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#160c21] border border-[#263040] hover:border-purple-500/40 rounded-xl text-xs transition-all">
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-t4 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">MOTHERSHIP</span>
                <span class="font-bold text-white text-sm">🚀 ${m.name}</span>
              </div>
              <p class="text-gray-400 text-[11px] mt-0.5 line-clamp-1">${m.effect}</p>
            </div>
            <button onclick="deployMothershipDirect('${m.id}', 'Lv 60')" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white shadow transition-all hover:scale-105 shrink-0 ml-2">
              Deploy Ship
            </button>
          </div>
        `;
      });
    };

    window.deployMothershipDirect = function(shipId, level) {
      if (!activeEquipTarget) return;
      const { hangarKey } = activeEquipTarget;
      activeEquipTarget = { hangarKey };
      equipMothershipDirect(shipId, level, false);
      renderCurrentMothershipCard(AppState.hangars[hangarKey].mothership, hangarKey);
    };

    window.filterCatalogModal = function() {
      const container = document.getElementById('catalog-items-container');
      if (!container) return;
      const search = (document.getElementById('catalog-search').value || '').toLowerCase();
      const tierFilter = document.getElementById('catalog-tier-filter').value;
      container.innerHTML = "";

      if (activeCatalogType === 'robot' || activeCatalogType === 'robot_slot') {
        const filtered = MASTER_ROBOTS.filter(r => (r.name.toLowerCase().includes(search)) && (tierFilter === 'ALL' || r.tier === tierFilter));
        filtered.forEach(r => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-${r.tier.toLowerCase()} text-[10px] font-bold px-1.5 py-0.5 rounded">${r.tier}</span>
                  <span class="font-bold text-white text-sm">${r.name}</span>
                </div>
                <span class="text-gray-400 text-[11px] block mt-0.5">${r.role} • ${r.faction} • ${r.hardpoints.map(h => h.size).join(", ")}</span>
              </div>
              <button onclick="selectCatalogItem('${r.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow">
                ${activeCatalogType === 'robot_slot' ? 'Equip to Slot' : 'Add to Storage'}
              </button>
            </div>
          `;
        });
      } else if (activeCatalogType === 'titan' || activeCatalogType === 'titan_slot') {
        const filtered = MASTER_TITANS.filter(t => (t.name.toLowerCase().includes(search)) && (tierFilter === 'ALL' || t.tier === tierFilter));
        filtered.forEach(t => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-titan text-[10px] font-bold px-1.5 py-0.5 rounded">TITAN</span>
                  <span class="font-bold text-white text-sm">${t.name}</span>
                </div>
                <span class="text-gray-400 text-[11px] block mt-0.5">${t.role} • ${(t.hp/1000).toFixed(0)}k HP • ${t.hardpoints.map(h => h.size).join(" + ")}</span>
              </div>
              <button onclick="selectCatalogItem('${t.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white shadow">
                ${activeCatalogType === 'titan_slot' ? '👑 Deploy Titan' : 'Add Titan'}
              </button>
            </div>
          `;
        });
      } else if (activeCatalogType === 'drone_slot') {
        const resDrones = (AppState.reserveDrones || []).filter(d => d.name.toLowerCase().includes(search));
        if (resDrones.length > 0) {
          container.innerHTML += `<div class="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">From Your Inventory</div>`;
          resDrones.forEach(d => {
            container.innerHTML += `
              <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs mb-2">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="badge-t4 text-[10px] font-bold px-1.5 py-0.5 rounded">DRONE</span>
                    <span class="font-bold text-white text-sm">🛸 ${d.name}</span>
                    <span class="text-gray-400">(${d.level || 'Lv 12'})</span>
                  </div>
                  <span class="text-gray-400 text-[11px] block mt-0.5">${d.role || ''}</span>
                </div>
                <button onclick="equipDroneDirect('${d.id}', '${d.level || 'Lv 12'}', true)" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black shadow">
                  Equip Drone
                </button>
              </div>
            `;
          });
        }
        container.innerHTML += `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-3 mb-2">Or Spawn From Master Catalog</div>`;
        MASTER_DRONES.filter(d => d.name.toLowerCase().includes(search)).forEach(d => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-2.5 bg-[#080c14]/60 border border-[#263040] rounded-xl text-xs mb-2">
              <div>
                <span class="font-bold text-gray-200">🛸 ${d.name}</span>
                <span class="text-gray-400 text-[11px] ml-1">(${d.role})</span>
              </div>
              <button onclick="equipDroneDirect('${d.id}', 'Lv 12', false)" class="px-2.5 py-1 text-xs font-semibold rounded bg-[#161f2e] hover:bg-cyan-500 hover:text-black text-gray-300">
                Spawn & Equip
              </button>
            </div>
          `;
        });
      } else if (activeCatalogType === 'pilot_slot') {
        const resPilots = (AppState.reservePilots || []).filter(p => p.name.toLowerCase().includes(search) || (p.bot || '').toLowerCase().includes(search));
        if (resPilots.length > 0) {
          container.innerHTML += `<div class="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">From Your Inventory</div>`;
          resPilots.forEach(p => {
            container.innerHTML += `
              <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs mb-2">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="badge-t4 text-[10px] font-bold px-1.5 py-0.5 rounded">PILOT</span>
                    <span class="font-bold text-white text-sm">🧑‍✈️ ${p.name}</span>
                    <span class="text-purple-400 font-mono">(${p.level || 'Lv 1'})</span>
                  </div>
                  <span class="text-gray-400 text-[11px] block mt-0.5">Specialty: ${p.bot || 'Universal'} • ${p.skill || ''}</span>
                </div>
                <button onclick="equipPilotDirect('${p.id}', '${p.level || 'Lv 1'}', true)" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white shadow">
                  Assign Pilot
                </button>
              </div>
            `;
          });
        }
        container.innerHTML += `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-3 mb-2">Or Spawn From Master Catalog</div>`;
        MASTER_PILOTS.filter(p => p.name.toLowerCase().includes(search) || (p.bot || '').toLowerCase().includes(search)).forEach(p => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-2.5 bg-[#080c14]/60 border border-[#263040] rounded-xl text-xs mb-2">
              <div>
                <span class="font-bold text-gray-200">🧑‍✈️ ${p.name}</span>
                <span class="text-purple-400 text-[11px] ml-1">(${p.bot})</span>
                <p class="text-[10px] text-gray-400 mt-0.5">${p.skill}</p>
              </div>
              <button onclick="equipPilotDirect('${p.id}', 'Lv 1', false)" class="px-2.5 py-1 text-xs font-semibold rounded bg-[#161f2e] hover:bg-purple-500 hover:text-white text-gray-300">
                Spawn & Assign
              </button>
            </div>
          `;
        });
      } else if (activeCatalogType === 'mothership_slot') {
        const resShips = (AppState.reserveMotherships || []).filter(m => m.name.toLowerCase().includes(search));
        if (resShips.length > 0) {
          container.innerHTML += `<div class="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">From Your Inventory</div>`;
          resShips.forEach(m => {
            container.innerHTML += `
              <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs mb-2">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="badge-t4 text-[10px] font-bold px-1.5 py-0.5 rounded">MOTHERSHIP</span>
                    <span class="font-bold text-white text-sm">🚀 ${m.name}</span>
                    <span class="text-purple-300 font-mono">(${m.level || 'Lv 60'})</span>
                  </div>
                  <span class="text-gray-400 text-[11px] block mt-0.5">${m.effect || ''}</span>
                </div>
                <button onclick="equipMothershipDirect('${m.id}', '${m.level || 'Lv 60'}', true)" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white shadow">
                  Deploy Ship
                </button>
              </div>
            `;
          });
        }
        container.innerHTML += `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-3 mb-2">Or Spawn From Master Catalog</div>`;
        MASTER_MOTHERSHIPS.filter(m => m.name.toLowerCase().includes(search)).forEach(m => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-2.5 bg-[#080c14]/60 border border-[#263040] rounded-xl text-xs mb-2">
              <div>
                <span class="font-bold text-gray-200">🚀 ${m.name}</span>
                <span class="text-purple-400 text-[11px] ml-1">(${m.chargeRate} Charge)</span>
                <p class="text-[10px] text-gray-400 mt-0.5">${m.effect}</p>
              </div>
              <button onclick="equipMothershipDirect('${m.id}', 'Lv 60', false)" class="px-2.5 py-1 text-xs font-semibold rounded bg-[#161f2e] hover:bg-purple-500 hover:text-white text-gray-300">
                Spawn & Deploy
              </button>
            </div>
          `;
        });
      } else if (activeCatalogType === 'weapon') {
        const filtered = MASTER_WEAPONS.filter(w => (w.name.toLowerCase().includes(search)) && (tierFilter === 'ALL' || w.tier === tierFilter));
        filtered.forEach(w => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-${w.tier.toLowerCase()} text-[10px] font-bold px-1.5 py-0.5 rounded">${w.tier}</span>
                  <span class="font-bold text-white text-sm">${w.name}</span>
                  <span class="text-gray-400">(${w.size})</span>
                </div>
                <span class="text-gray-400 text-[11px] block mt-0.5">${w.family} • ${w.range}m</span>
              </div>
              <button onclick="selectCatalogItem('${w.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow">
                Add to Arsenal
              </button>
            </div>
          `;
        });
      } else if (activeCatalogType === 'support') {
        // Drones
        MASTER_DRONES.filter(d => (d.name.toLowerCase().includes(search)) && (tierFilter === 'ALL' || d.tier === tierFilter)).forEach(d => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-${(d.tier||'T4').toLowerCase()} text-[10px] font-bold px-1.5 py-0.5 rounded">DRONE</span>
                  <span class="font-bold text-white text-sm">🤖 ${d.name}</span>
                </div>
                <span class="text-gray-400 text-[11px] block mt-0.5">${d.role}</span>
              </div>
              <button onclick="selectSupportItem('drone', '${d.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black shadow">
                Add Drone
              </button>
            </div>
          `;
        });
        // Pilots
        MASTER_PILOTS.filter(p => (p.name.toLowerCase().includes(search)) && (tierFilter === 'ALL' || p.tier === tierFilter)).forEach(p => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-${(p.tier||'T4').toLowerCase()} text-[10px] font-bold px-1.5 py-0.5 rounded">PILOT</span>
                  <span class="font-bold text-white text-sm">🧑‍✈️ ${p.name}</span>
                </div>
                <span class="text-purple-400 text-[11px] block mt-0.5">Specialty: ${p.bot}</span>
              </div>
              <button onclick="selectSupportItem('pilot', '${p.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow">
                Add Pilot
              </button>
            </div>
          `;
        });
        // Motherships
        MASTER_MOTHERSHIPS.filter(m => (m.name.toLowerCase().includes(search)) && (tierFilter === 'ALL' || m.tier === tierFilter)).forEach(m => {
          container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] border border-[#263040] rounded-xl text-xs">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-${(m.tier||'T4').toLowerCase()} text-[10px] font-bold px-1.5 py-0.5 rounded">MOTHERSHIP</span>
                  <span class="font-bold text-white text-sm">🚀 ${m.name}</span>
                </div>
                <span class="text-gray-400 text-[11px] block mt-0.5">${m.effect}</span>
              </div>
              <button onclick="selectSupportItem('mothership', '${m.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-500 hover:bg-purple-400 text-white shadow">
                Add Ship
              </button>
            </div>
          `;
        });
      }
    };

    window.openEquipMothershipModal = function(hangarKey) {
      activeCatalogType = "mothership_slot";
      activeEquipTarget = { hangarKey };
      const modal = document.getElementById('catalog-modal');
      document.getElementById('catalog-modal-title').innerText = `🚀 Deploy Orbital Mothership (${hangarKey.toUpperCase()})`;
      modal.classList.remove('hidden');
      filterCatalogModal();
    };

    window.unequipMothership = function(hangarKey) {
      const hangar = AppState.hangars[hangarKey];
      if (!hangar || !hangar.mothership) return;
      const m = hangar.mothership;
      if (!AppState.reserveMotherships) AppState.reserveMotherships = [];
      const ex = AppState.reserveMotherships.find(item => item.id === m.id && item.level === m.level);
      if (ex) ex.count = (ex.count || 1) + 1;
      else AppState.reserveMotherships.push({ id: m.id, name: m.name, level: m.level || 'Lv 60', tier: m.tier || 'T4', effect: m.effect, count: 1 });
      hangar.mothership = null;
      saveState();
      renderHangar(hangarKey, `${hangarKey}-grid`);
    };

    window.equipMothershipDirect = function(shipId, level, fromInventory) {
      if (!activeEquipTarget) return;
      const mm = MASTER_MOTHERSHIPS.find(m => m.id === shipId);
      if (!mm) return;
      const hangar = AppState.hangars[activeEquipTarget.hangarKey];
      if (!hangar) return;

      if (hangar.mothership) {
        if (!AppState.reserveMotherships) AppState.reserveMotherships = [];
        const ex = AppState.reserveMotherships.find(x => x.id === hangar.mothership.id && x.level === hangar.mothership.level);
        if (ex) ex.count = (ex.count || 1) + 1;
        else AppState.reserveMotherships.push({ id: hangar.mothership.id, name: hangar.mothership.name, level: hangar.mothership.level, tier: hangar.mothership.tier, effect: hangar.mothership.effect, count: 1 });
      }

      if (fromInventory && AppState.reserveMotherships) {
        const idx = AppState.reserveMotherships.findIndex(m => m.id === shipId && m.level === level);
        if (idx !== -1) {
          if (AppState.reserveMotherships[idx].count > 1) AppState.reserveMotherships[idx].count--;
          else AppState.reserveMotherships.splice(idx, 1);
        }
      }

      hangar.mothership = { id: mm.id, name: mm.name, level: level || "Lv 60", tier: mm.tier || "T4", effect: mm.effect };
      saveState();
      closeModal('catalog-modal');
      renderHangar(activeEquipTarget.hangarKey, `${activeEquipTarget.hangarKey}-grid`);
    };

    window.openEquipPilotModal = function(hangarKey, slotIndex) {
      activeCatalogType = "pilot_slot";
      activeEquipTarget = { hangarKey, slotIndex };
      const modal = document.getElementById('catalog-modal');
      document.getElementById('catalog-modal-title').innerText = `🧑‍✈️ Assign Legendary Pilot to ${hangarKey.toUpperCase()} (Slot ${slotIndex + 1})`;
      modal.classList.remove('hidden');
      filterCatalogModal();
    };

    window.unequipPilot = function(hangarKey, slotIndex) {
      const slot = AppState.hangars[hangarKey].slots[slotIndex];
      if (!slot || !slot.pilot) return;
      const p = slot.pilot;
      if (!AppState.reservePilots) AppState.reservePilots = [];
      const ex = AppState.reservePilots.find(item => item.id === p.id && item.level === p.level);
      if (ex) ex.count = (ex.count || 1) + 1;
      else AppState.reservePilots.push({ id: p.id, name: p.name, bot: p.bot, level: p.level, tier: p.tier, skill: p.skill, skills: p.skills || [], count: 1 });
      delete slot.pilot;
      saveState();
      renderHangar(hangarKey, `${hangarKey}-grid`);
    };

    window.equipPilotDirect = function(pilotId, level, fromInventory) {
      if (!activeEquipTarget) return;
      const mp = MASTER_PILOTS.find(p => p.id === pilotId);
      if (!mp) return;
      const slot = AppState.hangars[activeEquipTarget.hangarKey].slots[activeEquipTarget.slotIndex];
      if (!slot) return;

      const masterBot = MASTER_ROBOTS.find(r => r.id === slot.robotId);
      const defaultSkills = getDefaultPilotSkills(masterBot ? masterBot.role : "Brawler");

      if (slot.pilot) {
        if (!AppState.reservePilots) AppState.reservePilots = [];
        const ex = AppState.reservePilots.find(x => x.id === slot.pilot.id && x.level === slot.pilot.level);
        if (ex) ex.count = (ex.count || 1) + 1;
        else AppState.reservePilots.push({ id: slot.pilot.id, name: slot.pilot.name, bot: slot.pilot.bot, level: slot.pilot.level, tier: slot.pilot.tier, skill: slot.pilot.skill, skills: slot.pilot.skills || [], count: 1 });
      }

      let existingSkills = null;
      if (fromInventory && AppState.reservePilots) {
        const idx = AppState.reservePilots.findIndex(p => p.id === pilotId && p.level === level);
        if (idx !== -1) {
          if (AppState.reservePilots[idx].skills) existingSkills = AppState.reservePilots[idx].skills;
          if (AppState.reservePilots[idx].count > 1) AppState.reservePilots[idx].count--;
          else AppState.reservePilots.splice(idx, 1);
        }
      }

      slot.pilot = {
        id: mp.id,
        name: mp.name,
        bot: mp.bot,
        level: level || "Lv 1",
        tier: mp.tier || "T4",
        skill: mp.skill,
        skills: existingSkills || defaultSkills
      };
      saveState();
      closeModal('catalog-modal');
      renderHangar(activeEquipTarget.hangarKey, `${activeEquipTarget.hangarKey}-grid`);
    };

    // --- PILOT SKILLS MANAGER SYSTEM ---
    let activePilotSkillsTarget = null;
    let activeWorkingSkills = [];

    const PILOT_RANK_LABELS = [
      "Rank 1: Private (Skill 1)",
      "Rank 2: Corporal (Skill 2)",
      "Rank 3: Sergeant (Skill 3)",
      "Rank 4: Lieutenant (Skill 4)",
      "Rank 5: Captain (Skill 5)",
      "Rank 6: Major (Skill 6)",
      "Rank 7: Colonel (Skill 7)"
    ];

    function getPilotTargetObject() {
      if (!activePilotSkillsTarget) return null;
      if (activePilotSkillsTarget.reserveIndex !== null && activePilotSkillsTarget.reserveIndex !== undefined) {
        return (AppState.reservePilots || [])[activePilotSkillsTarget.reserveIndex];
      }
      const hangar = AppState.hangars[activePilotSkillsTarget.hangarKey];
      if (!hangar || !hangar.slots) return null;
      const slot = hangar.slots[activePilotSkillsTarget.slotIndex];
      return slot ? slot.pilot : null;
    }

    window.openPilotSkillsModal = function(hangarKey, slotIndex) {
      activePilotSkillsTarget = { hangarKey, slotIndex, reserveIndex: null };
      const slot = AppState.hangars[hangarKey]?.slots[slotIndex];
      if (!slot || !slot.pilot) return;

      const pilot = slot.pilot;
      const masterBot = MASTER_ROBOTS.find(r => r.id === slot.robotId);

      if (pilot.skills && Array.isArray(pilot.skills) && pilot.skills.length > 0) {
        activeWorkingSkills = JSON.parse(JSON.stringify(pilot.skills));
      } else {
        activeWorkingSkills = getDefaultPilotSkills(masterBot ? masterBot.role : "Brawler");
      }
      while (activeWorkingSkills.length < 7) {
        activeWorkingSkills.push({ id: "", tier: "T4" });
      }

      renderPilotSkillsModal();
      document.getElementById('pilot-skills-modal').classList.remove('hidden');
    };

    window.openReservePilotSkillsModal = function(reserveIndex) {
      activePilotSkillsTarget = { hangarKey: null, slotIndex: null, reserveIndex };
      const pilot = (AppState.reservePilots || [])[reserveIndex];
      if (!pilot) return;

      if (pilot.skills && Array.isArray(pilot.skills) && pilot.skills.length > 0) {
        activeWorkingSkills = JSON.parse(JSON.stringify(pilot.skills));
      } else {
        activeWorkingSkills = getDefaultPilotSkills("Brawler");
      }
      while (activeWorkingSkills.length < 7) {
        activeWorkingSkills.push({ id: "", tier: "T4" });
      }

      renderPilotSkillsModal();
      document.getElementById('pilot-skills-modal').classList.remove('hidden');
    };

    function renderPilotSkillsModal() {
      const pilot = getPilotTargetObject();
      if (!pilot) return;
      const mp = MASTER_PILOTS.find(p => p.id === pilot.id);
      const title = document.getElementById('pilot-skills-modal-title');
      const subtitle = document.getElementById('pilot-skills-modal-subtitle');
      const innateBox = document.getElementById('pilot-innate-skill-box');
      const listContainer = document.getElementById('pilot-active-skills-list');

      title.innerHTML = `🧑‍✈️ ${pilot.name} <span class="text-xs text-amber-400 font-mono font-normal">(${pilot.level || 'Lv 1'})</span> — Pilot Skills Matrix`;
      subtitle.innerText = `Dedicated Robot: ${pilot.bot || (mp ? mp.bot : 'Universal')} • Configure 7 Rank Skills (T1 Grey → T4 Gold)`;

      innateBox.innerHTML = `
        <div class="flex items-start gap-2.5">
          <span class="text-lg">👑</span>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-purple-300 uppercase tracking-wider text-[10px]">Innate Legendary Pilot Skill</span>
              <span class="badge-t4 text-[9px] font-black px-1.5 py-0.2 rounded">SPECIALTY</span>
            </div>
            <p class="text-purple-100/90 text-xs mt-0.5">${pilot.skill || (mp ? mp.skill : 'Grants specialized combat synergy.')}</p>
          </div>
        </div>
      `;

      listContainer.innerHTML = "";

      for (let i = 0; i < 7; i++) {
        const current = activeWorkingSkills[i] || { id: "", tier: "T4" };
        const mSkill = MASTER_PILOT_SKILLS.find(ms => ms.id === current.id);
        const rankLabel = PILOT_RANK_LABELS[i];
        const currentTier = current.tier || "T4";
        const currentTierData = mSkill ? mSkill.tiers[currentTier] : null;
        const effectText = currentTierData ? currentTierData.val : (mSkill ? mSkill.desc : "No skill selected for this rank slot.");

        const categories = {
          defense: "🛡️ Durability & Repair",
          damage: "⚔️ Weapon Damage & Accuracy",
          speed: "🏃 Speed & Mobility",
          shield: "🔮 Energy & Physical Shield",
          utility: "⏱️ Modules & Utility"
        };

        let optionsHtml = `<option value="">-- [Slot ${i + 1}] Select Pilot Skill --</option>`;
        Object.keys(categories).forEach(catKey => {
          optionsHtml += `<optgroup label="${categories[catKey]}">`;
          MASTER_PILOT_SKILLS.filter(s => s.category === catKey).forEach(s => {
            const isSelected = s.id === current.id ? "selected" : "";
            optionsHtml += `<option value="${s.id}" ${isSelected}>${s.icon} ${s.name} (${s.desc})</option>`;
          });
          optionsHtml += `</optgroup>`;
        });

        const slotCard = document.createElement('div');
        slotCard.className = `p-3.5 rounded-xl border ${current.id ? 'bg-[#080c14] border-[#263040]' : 'bg-[#080c14]/50 border-dashed border-[#263040]'} space-y-2.5 transition-all`;
        slotCard.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">${rankLabel}</span>
              ${mSkill ? `<span class="text-[10px] text-amber-400 font-bold">${mSkill.icon} ${mSkill.name}</span>` : ''}
            </div>

            <!-- Tier Selectors (T1, T2, T3, T4) -->
            <div class="flex items-center gap-1 bg-[#111620] p-0.5 rounded-lg border border-[#263040]">
              <button onclick="onPilotSkillTierChange(${i}, 'T1')" class="px-2 py-0.5 text-[10px] font-bold rounded ${currentTier === 'T1' ? 'bg-gray-700 text-white font-black shadow' : 'text-gray-400 hover:text-gray-200'}">T1</button>
              <button onclick="onPilotSkillTierChange(${i}, 'T2')" class="px-2 py-0.5 text-[10px] font-bold rounded ${currentTier === 'T2' ? 'bg-blue-600 text-white font-black shadow' : 'text-gray-400 hover:text-blue-300'}">T2</button>
              <button onclick="onPilotSkillTierChange(${i}, 'T3')" class="px-2 py-0.5 text-[10px] font-bold rounded ${currentTier === 'T3' ? 'bg-purple-600 text-white font-black shadow' : 'text-gray-400 hover:text-purple-300'}">T3</button>
              <button onclick="onPilotSkillTierChange(${i}, 'T4')" class="px-2 py-0.5 text-[10px] font-bold rounded ${currentTier === 'T4' ? 'bg-amber-500 text-black font-black shadow' : 'text-gray-400 hover:text-amber-300'}">T4</button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <select onchange="onPilotSkillSlotChange(${i}, this.value)" class="flex-1 bg-[#111620] border border-[#263040] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500">
              ${optionsHtml}
            </select>
            ${current.id ? `<button onclick="clearPilotSkillSlot(${i})" class="px-2 py-1.5 text-xs text-gray-500 hover:text-red-400 rounded hover:bg-red-950/30" title="Clear slot">✕</button>` : ''}
          </div>

          <div class="flex items-center justify-between text-xs px-1">
            <span class="text-gray-400 font-mono text-[11px]">${effectText}</span>
            ${currentTierData ? `<span class="text-amber-400 font-mono font-bold text-[11px]">${currentTierData.val}</span>` : ''}
          </div>
        `;
        listContainer.appendChild(slotCard);
      }

      updatePilotSkillsSummary();
    }

    window.onPilotSkillSlotChange = function(slotIdx, newSkillId) {
      if (!activeWorkingSkills[slotIdx]) activeWorkingSkills[slotIdx] = { id: "", tier: "T4" };
      activeWorkingSkills[slotIdx].id = newSkillId;
      renderPilotSkillsModal();
    };

    window.onPilotSkillTierChange = function(slotIdx, newTier) {
      if (!activeWorkingSkills[slotIdx]) activeWorkingSkills[slotIdx] = { id: "", tier: "T4" };
      activeWorkingSkills[slotIdx].tier = newTier;
      renderPilotSkillsModal();
    };

    window.clearPilotSkillSlot = function(slotIdx) {
      activeWorkingSkills[slotIdx] = { id: "", tier: "T4" };
      renderPilotSkillsModal();
    };

    window.applyPilotSkillPreset = function(presetKey) {
      const preset = PILOT_SKILL_PRESETS[presetKey];
      if (!preset) return;
      activeWorkingSkills = JSON.parse(JSON.stringify(preset));
      while (activeWorkingSkills.length < 7) {
        activeWorkingSkills.push({ id: "", tier: "T4" });
      }
      renderPilotSkillsModal();
    };

    function updatePilotSkillsSummary() {
      const summaryEl = document.getElementById('pilot-skills-summary-stats');
      if (!summaryEl) return;

      let durBonus = 0, dmgBonus = 0, spdBonus = 0, repairSec = 0, shieldBonus = 0, cooldownRed = 0;

      activeWorkingSkills.forEach(s => {
        if (!s || !s.id) return;
        const ms = MASTER_PILOT_SKILLS.find(x => x.id === s.id);
        if (!ms) return;
        const tier = s.tier || "T4";
        const tData = ms.tiers[tier];
        if (!tData) return;

        if (s.id === 'armor_expert' || s.id === 'tough_guy') durBonus += tData.bonus;
        if (s.id === 'gunsmith' || s.id === 'master_gunner' || s.id === 'thrill_seeker') dmgBonus += tData.bonus;
        if (s.id === 'road_hog' || s.id === 'spy') spdBonus += tData.bonus;
        if (s.id === 'mechanic') repairSec += tData.bonus;
        if (s.id === 'energy_shield_expert' || s.id === 'physical_shield_expert') shieldBonus += tData.bonus;
        if (s.id === 'dodger') cooldownRed += tData.bonus;
      });

      const parts = [];
      if (durBonus > 0) parts.push(`🛡️ Durability: <strong class="text-emerald-400">+${durBonus.toFixed(1)}%</strong>`);
      if (dmgBonus > 0) parts.push(`⚔️ Weapon Dmg: <strong class="text-red-400">+${dmgBonus.toFixed(1)}%</strong>`);
      if (spdBonus > 0) parts.push(`🏃 Speed: <strong class="text-amber-400">+${spdBonus.toFixed(1)}%</strong>`);
      if (repairSec > 0) parts.push(`🔧 Repair: <strong class="text-cyan-400">+${repairSec.toFixed(2)}%/s</strong>`);
      if (shieldBonus > 0) parts.push(`🔮 Shields: <strong class="text-purple-400">+${shieldBonus.toFixed(1)}%</strong>`);
      if (cooldownRed > 0) parts.push(`⏱️ Cooldown: <strong class="text-blue-400">-${cooldownRed}%</strong>`);

      summaryEl.innerHTML = parts.length > 0 ? parts.join(" • ") : `<span class="text-gray-500">Select skills to see cumulative combat bonuses</span>`;
    }

    window.savePilotSkillsModal = function() {
      const pilot = getPilotTargetObject();
      if (!pilot) return;

      const cleanedSkills = activeWorkingSkills.filter(s => s && s.id).map(s => {
        const ms = MASTER_PILOT_SKILLS.find(x => x.id === s.id);
        return {
          id: s.id,
          name: ms ? ms.name : s.id,
          tier: s.tier || "T4",
          category: ms ? ms.category : "general"
        };
      });

      pilot.skills = cleanedSkills;
      saveState();
      closeModal('pilot-skills-modal');

      if (activePilotSkillsTarget.hangarKey) {
        renderHangar(activePilotSkillsTarget.hangarKey, `${activePilotSkillsTarget.hangarKey}-grid`);
        if (currentAuditHangar === activePilotSkillsTarget.hangarKey) runAudit(activePilotSkillsTarget.hangarKey);
      } else {
        renderStorage();
      }
    };

    window.changeItemLevel = function(hangarKey, itemType, slotIndex, subIndex, newLevel) {
      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return;

      if (itemType === 'titan') {
        if (hangar.titanSlot) hangar.titanSlot.level = newLevel;
      } else if (itemType === 'titan_weapon') {
        if (hangar.titanSlot && hangar.titanSlot.weapons && hangar.titanSlot.weapons[subIndex]) {
          hangar.titanSlot.weapons[subIndex].level = newLevel;
        }
      } else if (itemType === 'robot') {
        if (hangar.slots && hangar.slots[slotIndex]) {
          hangar.slots[slotIndex].level = newLevel;
        }
      } else if (itemType === 'weapon') {
        if (hangar.slots && hangar.slots[slotIndex] && hangar.slots[slotIndex].weapons && hangar.slots[slotIndex].weapons[subIndex]) {
          hangar.slots[slotIndex].weapons[subIndex].level = newLevel;
        }
      } else if (itemType === 'drone') {
        if (hangar.slots && hangar.slots[slotIndex] && hangar.slots[slotIndex].drone) {
          hangar.slots[slotIndex].drone.level = newLevel;
        }
      } else if (itemType === 'pilot') {
        if (hangar.slots && hangar.slots[slotIndex] && hangar.slots[slotIndex].pilot) {
          hangar.slots[slotIndex].pilot.level = newLevel;
        }
      } else if (itemType === 'mothership') {
        if (hangar.mothership) {
          hangar.mothership.level = newLevel;
        }
      }

      saveState();
      renderHangar(hangarKey, `${hangarKey}-grid`);
      if (currentAuditHangar === hangarKey) runAudit(hangarKey);
    };

    // --- MARKDOWN SYNC & EXPORT HUB ---
    let currentSyncTab = "hangar1";

    window.openSyncMarkdownModal = function(defaultTab = 'hangar1') {
      currentSyncTab = defaultTab;
      const modal = document.getElementById('markdown-sync-modal');
      if (!modal) return;
      selectSyncMarkdownTab(currentSyncTab);
      modal.classList.remove('hidden');
    };

    window.selectSyncMarkdownTab = function(tab) {
      currentSyncTab = tab;
      ['hangar1', 'hangar2', 'inventory'].forEach(t => {
        const btn = document.getElementById(`sync-tab-${t}`);
        if (btn) {
          if (t === tab) {
            btn.className = "px-3 py-1 text-xs font-bold rounded-lg bg-amber-500 text-black shadow";
          } else {
            btn.className = "px-3 py-1 text-xs font-bold rounded-lg bg-[#161f2e] text-gray-300 border border-[#263040]";
          }
        }
      });
      const textarea = document.getElementById('sync-markdown-textarea');
      if (textarea) textarea.value = generateHangarMarkdown(tab);
    };

    window.copySyncMarkdown = function() {
      const textarea = document.getElementById('sync-markdown-textarea');
      if (!textarea) return;
      navigator.clipboard.writeText(textarea.value).then(() => {
        const btn = document.getElementById('sync-copy-btn');
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = "✓ Copied Markdown!";
          btn.classList.add('bg-emerald-500');
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.classList.remove('bg-emerald-500');
          }, 1500);
        }
      });
    };

    window.downloadMarkdownFile = function() {
      const textarea = document.getElementById('sync-markdown-textarea');
      if (!textarea) return;
      const filename = currentSyncTab === 'inventory' ? 'Inventory_Storage.md' : `${currentSyncTab.toUpperCase()}_Loadout.md`;
      const blob = new Blob([textarea.value], { type: 'text/markdown;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    };

    function generateHangarMarkdown(hangarKey) {
      if (hangarKey === 'inventory') {
        let md = `# WR Reserve Inventory & Storage\n\n`;
        md += `*Generated by WRBrain on ${new Date().toLocaleDateString()}*\n\n`;
        
        md += `## 👑 Reserve Titans\n`;
        (AppState.reserveTitans || []).forEach(t => {
          const mt = MASTER_TITANS.find(x => x.id === t.titanId) || { name: t.titanId, role: "Titan" };
          md += `- **${mt.name}** (${t.level || 'Lv 15'}) - ${mt.role}\n`;
        });
        
        md += `\n## 🤖 Reserve Robots\n`;
        (AppState.reserveRobots || []).forEach(r => {
          const mb = MASTER_ROBOTS.find(x => x.id === r.robotId) || { name: r.robotId, role: "Brawler" };
          md += `- **${mb.name}** (${r.level || 'Lv 1'}) - ${mb.role}\n`;
        });

        md += `\n## 🔫 Weapon Arsenal\n`;
        ['alpha', 'beta', 'heavy', 'medium', 'light'].forEach(cat => {
          md += `### ${cat.toUpperCase()} Weapons\n`;
          (AppState.reserveWeapons[cat] || []).forEach(w => {
            md += `- **${w.name}** (${w.level || 'Lv 1'}) x${w.count || 1}\n`;
          });
        });

        md += `\n## 🛸 Support Systems (Drones, Pilots, Motherships)\n`;
        (AppState.reserveDrones || []).forEach(d => {
          md += `- Drone: **${d.name}** (${d.level || 'Lv 12'}) x${d.count || 1}\n`;
        });
        (AppState.reservePilots || []).forEach(p => {
          let sText = (p.skills && p.skills.length > 0) ? ` [Skills: ${p.skills.map(s => `${s.name || s.id} (${s.tier || 'T4'})`).join(', ')}]` : '';
          md += `- Pilot: **${p.name}** (${p.level || 'Lv 1'}) for *${p.bot || 'Universal'}*${sText} x${p.count || 1}\n`;
        });
        (AppState.reserveMotherships || []).forEach(m => {
          md += `- Mothership: **${m.name}** (${m.level || 'Lv 60'}) x${m.count || 1}\n`;
        });

        return md;
      }

      const hangar = AppState.hangars[hangarKey];
      if (!hangar) return "";
      const audit = calculateHangarSynergy(hangar.slots, hangar.titanSlot);

      let md = `# ${hangar.name}\n\n`;
      md += `**Synergy Score:** ${audit.synergyScore}% | **Total Burst DPS:** ${audit.totalBurstDPS.toLocaleString()} DPS | **Cycle DPS:** ${audit.totalCycleDPS.toLocaleString()} DPS\n\n`;

      if (hangar.mothership && hangar.mothership.name) {
        md += `### 🚀 Orbital Mothership\n`;
        md += `- **${hangar.mothership.name}** (${hangar.mothership.level || 'Lv 60'}) - ${hangar.mothership.effect || 'Orbital Strike Platform'}\n\n`;
      }

      if (hangar.titanSlot && hangar.titanSlot.titanId) {
        const mt = MASTER_TITANS.find(t => t.id === hangar.titanSlot.titanId) || { name: hangar.titanSlot.titanId, role: "Titan Brawler" };
        md += `### 👑 Titan: ${mt.name} (${hangar.titanSlot.level || 'Lv 15'})\n`;
        md += `- **Role:** ${mt.role}\n`;
        md += `- **Weapons:**\n`;
        (hangar.titanSlot.weapons || []).forEach((w, i) => {
          if (w && w.id) {
            md += `  - Hardpoint ${i + 1} (${w.size}): **${w.name}** (${w.level || 'Lv 1'})\n`;
          }
        });
        md += `\n`;
      }

      md += `### 🤖 Battle Robot Deployments\n\n`;
      hangar.slots.forEach((slot, idx) => {
        if (!slot || !slot.robotId) {
          md += `#### Bay ${idx + 1}: Empty\n\n`;
          return;
        }
        const mb = MASTER_ROBOTS.find(r => r.id === slot.robotId) || { name: slot.robotId, role: "Brawler" };
        md += `#### Bay ${idx + 1}: ${mb.name} (${slot.level || 'Lv 1'})\n`;
        md += `- **Role:** ${mb.role} | **Faction:** ${mb.faction}\n`;
        if (slot.pilot && slot.pilot.name) {
          md += `- **Pilot:** ${slot.pilot.name} (${slot.pilot.level || 'Lv 1'}) - *${slot.pilot.skill || 'Combat Specialty'}*\n`;
          if (slot.pilot.skills && slot.pilot.skills.length > 0) {
            md += `  - **Secondary Skills (${slot.pilot.skills.length}):** ${slot.pilot.skills.map(s => `${s.name || s.id} (${s.tier || 'T4'})`).join(', ')}\n`;
          }
        }
        if (slot.drone && slot.drone.name) {
          md += `- **Drone:** ${slot.drone.name} (${slot.drone.level || 'Lv 12'})\n`;
        }
        md += `- **Weapons:**\n`;
        (slot.weapons || []).forEach((w, i) => {
          if (w && w.id) {
            md += `  - Mount ${i + 1} (${w.size}): **${w.name}** (${w.level || 'Lv 1'})\n`;
          }
        });
        md += `\n`;
      });

      return md;
    }

    window.selectSupportItem = function(subType, itemId) {
      const level = document.getElementById('catalog-level-select')?.value || 'Lv 1';
      if (subType === 'drone') {
        const d = MASTER_DRONES.find(item => item.id === itemId);
        if (d) {
          if (!AppState.reserveDrones) AppState.reserveDrones = [];
          const ex = AppState.reserveDrones.find(x => x.id === itemId);
          if (ex) ex.count = (ex.count || 1) + 1;
          else AppState.reserveDrones.push({ id: d.id, name: d.name, level: level || 'Lv 12', tier: d.tier, role: d.role, desc: d.desc, count: 1 });
        }
      } else if (subType === 'pilot') {
        const p = MASTER_PILOTS.find(item => item.id === itemId);
        if (p) {
          if (!AppState.reservePilots) AppState.reservePilots = [];
          const ex = AppState.reservePilots.find(x => x.id === itemId && x.level === level);
          if (ex) ex.count = (ex.count || 1) + 1;
          else AppState.reservePilots.push({ id: p.id, name: p.name, bot: p.bot, level: level || 'Lv 1', tier: p.tier, skill: p.skill, skills: typeof getDefaultPilotSkills === 'function' ? getDefaultPilotSkills("Brawler") : [], count: 1 });
        }
      } else if (subType === 'mothership') {
        const m = MASTER_MOTHERSHIPS.find(item => item.id === itemId);
        if (m) {
          if (!AppState.reserveMotherships) AppState.reserveMotherships = [];
          const ex = AppState.reserveMotherships.find(x => x.id === itemId);
          if (ex) ex.count = (ex.count || 1) + 1;
          else AppState.reserveMotherships.push({ id: m.id, name: m.name, level: level || 'Lv 60', tier: m.tier, effect: m.effect, count: 1 });
        }
      }
      saveState();
      closeModal('catalog-modal');
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      if (typeof renderAll === 'function') renderAll();
    };

    window.equipDroneDirect = function(droneId, level, fromInventory) {
      if (!activeEquipTarget) return;
      const md = MASTER_DRONES.find(d => d.id === droneId);
      if (!md) return;
      const slot = AppState.hangars[activeEquipTarget.hangarKey]?.slots[activeEquipTarget.slotIndex];
      if (!slot) return;

      if (slot.drone) {
        if (!AppState.reserveDrones) AppState.reserveDrones = [];
        const ex = AppState.reserveDrones.find(x => x.id === slot.drone.id && x.level === slot.drone.level);
        if (ex) ex.count = (ex.count || 1) + 1;
        else AppState.reserveDrones.push({ id: slot.drone.id, name: slot.drone.name, level: slot.drone.level, tier: slot.drone.tier, role: slot.drone.role, count: 1 });
      }

      if (fromInventory && AppState.reserveDrones) {
        const idx = AppState.reserveDrones.findIndex(d => d.id === droneId && d.level === level);
        if (idx !== -1) {
          if (AppState.reserveDrones[idx].count > 1) AppState.reserveDrones[idx].count--;
          else AppState.reserveDrones.splice(idx, 1);
        }
      }

      slot.drone = { id: md.id, name: md.name, level: level || "Lv 12", tier: md.tier || "T4" };
      saveState();
      closeModal('catalog-modal');
      closeModal('drone-config-modal');
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      if (typeof renderAll === 'function') renderAll();
    };

    window.unequipDrone = function(hangarKey, slotIndex) {
      const slot = AppState.hangars[hangarKey]?.slots[slotIndex];
      if (!slot || !slot.drone) return;
      const d = slot.drone;
      if (!AppState.reserveDrones) AppState.reserveDrones = [];
      const ex = AppState.reserveDrones.find(item => item.id === d.id && item.level === d.level);
      if (ex) ex.count = (ex.count || 1) + 1;
      else AppState.reserveDrones.push({ id: d.id, name: d.name, level: d.level, tier: d.tier, role: d.role, count: 1 });
      delete slot.drone;
      saveState();
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      if (typeof renderAll === 'function') renderAll();
    };

    window.selectCatalogItem = function(itemId) {
      const level = document.getElementById('catalog-level-select')?.value || 'Lv 1';
      if (!AppState.reserveRobots) AppState.reserveRobots = [];
      if (!AppState.reserveTitans) AppState.reserveTitans = [];
      if (!AppState.reserveWeapons) AppState.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };

      if (activeCatalogType === 'robot') {
        const master = MASTER_ROBOTS.find(r => r.id === itemId);
        AppState.reserveRobots.push({ robotId: itemId, level, tier: master ? master.tier : "T4" });
      } else if (activeCatalogType === 'titan') {
        const master = MASTER_TITANS.find(t => t.id === itemId);
        AppState.reserveTitans.push({ titanId: itemId, level, tier: master ? master.tier : "T4" });
      } else if (activeCatalogType === 'titan_slot' && activeEquipTarget) {
        const master = MASTER_TITANS.find(t => t.id === itemId);
        AppState.hangars[activeEquipTarget.hangarKey].titanSlot = {
          titanId: itemId,
          level,
          weapons: (master ? master.hardpoints : [{ size: "Alpha" }, { size: "Beta" }]).map(() => null)
        };
      } else if (activeCatalogType === 'robot_slot' && activeEquipTarget) {
        const master = MASTER_ROBOTS.find(r => r.id === itemId);
        AppState.hangars[activeEquipTarget.hangarKey].slots[activeEquipTarget.slotIndex] = {
          robotId: itemId,
          level,
          weapons: (master ? master.hardpoints : [{ size: "Heavy" }]).map(() => null)
        };
      } else if (activeCatalogType === 'weapon') {
        const master = MASTER_WEAPONS.find(w => w.id === itemId);
        if (master) {
          const cat = master.size.toLowerCase();
          if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
          const existing = AppState.reserveWeapons[cat].find(w => w.id === itemId && w.level === level);
          if (existing) existing.count++;
          else AppState.reserveWeapons[cat].push({ id: itemId, name: master.name, tier: master.tier, level, count: 1 });
        }
      }
      saveState();
      closeModal('catalog-modal');
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      if (typeof renderAll === 'function') renderAll();
    };

    window.addBotToStorageDirect = function(botId) {
      const master = MASTER_ROBOTS.find(r => r.id === botId);
      if (!AppState.reserveRobots) AppState.reserveRobots = [];
      AppState.reserveRobots.push({ robotId: botId, level: "Lv 1", tier: master ? master.tier : "T4" });
      saveState();
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      alert(`Added ${master ? master.name : botId} (Lv 1) to your storage!`);
    };

    window.addWeaponToStorageDirect = function(weaponId) {
      const master = MASTER_WEAPONS.find(w => w.id === weaponId);
      if (master) {
        const cat = master.size.toLowerCase();
        if (!AppState.reserveWeapons) AppState.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };
        if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
        const existing = AppState.reserveWeapons[cat].find(w => w.id === weaponId && w.level === "Lv 1");
        if (existing) existing.count++;
        else AppState.reserveWeapons[cat].push({ id: weaponId, name: master.name, tier: master.tier, level: "Lv 1", count: 1 });
        saveState();
        if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
        alert(`Added ${master.name} (${master.size}) to your arsenal!`);
      }
    };

    window.equipWeaponDirect = function(weaponId, level, fromInventory) {
      if (!activeEquipTarget) return;
      const master = MASTER_WEAPONS.find(w => w.id === weaponId);
      if (!master) return;

      if (activeEquipTarget.isTitan) {
        const titanSlot = AppState.hangars[activeEquipTarget.hangarKey].titanSlot;
        if (!titanSlot.weapons) titanSlot.weapons = [];
        const current = titanSlot.weapons[activeEquipTarget.hardpointIndex];

        if (current && current.id) {
          const cat = current.size.toLowerCase();
          if (!AppState.reserveWeapons) AppState.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };
          if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
          const ex = AppState.reserveWeapons[cat].find(w => w.id === current.id && w.level === current.level);
          if (ex) ex.count++;
          else AppState.reserveWeapons[cat].push({ id: current.id, name: current.name, tier: current.tier, level: current.level, count: 1 });
        }

        if (fromInventory) {
          const cat = master.size.toLowerCase();
          if (AppState.reserveWeapons && AppState.reserveWeapons[cat]) {
            const idx = AppState.reserveWeapons[cat].findIndex(w => w.id === weaponId && w.level === level);
            if (idx !== -1) {
              if (AppState.reserveWeapons[cat][idx].count > 1) AppState.reserveWeapons[cat][idx].count--;
              else AppState.reserveWeapons[cat].splice(idx, 1);
            }
          }
        }

        titanSlot.weapons[activeEquipTarget.hardpointIndex] = { id: master.id, name: master.name, size: master.size, level, tier: master.tier };
        saveState();
        closeModal('weapon-picker-modal');
        if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
        return;
      }

      const slot = AppState.hangars[activeEquipTarget.hangarKey].slots[activeEquipTarget.slotIndex];
      const current = slot.weapons[activeEquipTarget.hardpointIndex];

      if (current && current.id) {
        const cat = current.size.toLowerCase();
        if (!AppState.reserveWeapons) AppState.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };
        if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
        const ex = AppState.reserveWeapons[cat].find(w => w.id === current.id && w.level === current.level);
        if (ex) ex.count++;
        else AppState.reserveWeapons[cat].push({ id: current.id, name: current.name, tier: current.tier, level: current.level, count: 1 });
      }

      if (fromInventory) {
        const cat = master.size.toLowerCase();
        if (AppState.reserveWeapons && AppState.reserveWeapons[cat]) {
          const idx = AppState.reserveWeapons[cat].findIndex(w => w.id === weaponId && w.level === level);
          if (idx !== -1) {
            if (AppState.reserveWeapons[cat][idx].count > 1) AppState.reserveWeapons[cat][idx].count--;
            else AppState.reserveWeapons[cat].splice(idx, 1);
          }
        }
      }

      slot.weapons[activeEquipTarget.hardpointIndex] = { id: master.id, name: master.name, size: master.size, level, tier: master.tier };
      saveState();
      closeModal('weapon-picker-modal');
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
    };

    window.unequipWeapon = function(hangarKey, slotIndex, hardpointIndex) {
      const slot = AppState.hangars[hangarKey]?.slots[slotIndex];
      if (!slot || !slot.weapons) return;
      const w = slot.weapons[hardpointIndex];
      if (w && w.id) {
        const cat = w.size.toLowerCase();
        if (!AppState.reserveWeapons) AppState.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };
        if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
        const ex = AppState.reserveWeapons[cat].find(item => item.id === w.id && item.level === w.level);
        if (ex) ex.count++;
        else AppState.reserveWeapons[cat].push({ id: w.id, name: w.name, tier: w.tier, level: w.level, count: 1 });
        slot.weapons[hardpointIndex] = null;
        saveState();
        if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      }
    };

    window.unequipRobot = function(hangarKey, slotIndex) {
      const hangar = AppState.hangars[hangarKey];
      if (!hangar || !hangar.slots) return;
      const slot = hangar.slots[slotIndex];
      if (!slot || !slot.robotId) return;

      const master = MASTER_ROBOTS.find(r => r.id === slot.robotId);
      if (!AppState.reserveRobots) AppState.reserveRobots = [];
      AppState.reserveRobots.push({ robotId: slot.robotId, level: slot.level || "Lv 1", tier: master ? master.tier : "T4" });

      if (slot.weapons) {
        if (!AppState.reserveWeapons) AppState.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };
        slot.weapons.forEach(w => {
          if (w && w.id) {
            const cat = w.size.toLowerCase();
            if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
            const ex = AppState.reserveWeapons[cat].find(item => item.id === w.id && item.level === w.level);
            if (ex) ex.count++;
            else AppState.reserveWeapons[cat].push({ id: w.id, name: w.name, tier: w.tier, level: w.level, count: 1 });
          }
        });
      }

      if (slot.pilot) {
        if (!AppState.reservePilots) AppState.reservePilots = [];
        AppState.reservePilots.push(slot.pilot);
      }
      if (slot.drone) {
        if (!AppState.reserveDrones) AppState.reserveDrones = [];
        AppState.reserveDrones.push(slot.drone);
      }

      hangar.slots[slotIndex] = { robotId: null, level: "", weapons: [] };
      saveState();
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
    };

    window.unequipTitan = function(hangarKey) {
      const h = AppState.hangars[hangarKey];
      if (!h || !h.titanSlot || !h.titanSlot.titanId) return;
      const tSlot = h.titanSlot;
      const master = MASTER_TITANS.find(t => t.id === tSlot.titanId);

      if (!AppState.reserveTitans) AppState.reserveTitans = [];
      AppState.reserveTitans.push({ titanId: tSlot.titanId, level: tSlot.level || "Lv 15", tier: master ? master.tier : "T4" });

      if (tSlot.weapons) {
        if (!AppState.reserveWeapons) AppState.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };
        tSlot.weapons.forEach(w => {
          if (w && w.id) {
            const cat = w.size.toLowerCase();
            if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
            const ex = AppState.reserveWeapons[cat].find(item => item.id === w.id && item.level === w.level);
            if (ex) ex.count++;
            else AppState.reserveWeapons[cat].push({ id: w.id, name: w.name, tier: w.tier, level: w.level, count: 1 });
          }
        });
      }

      h.titanSlot = { titanId: null, level: "", weapons: [] };
      saveState();
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
    };

    window.unequipTitanWeapon = function(hangarKey, hardpointIndex) {
      const h = AppState.hangars[hangarKey];
      if (!h || !h.titanSlot || !h.titanSlot.weapons) return;
      const w = h.titanSlot.weapons[hardpointIndex];
      if (w && w.id) {
        const cat = w.size.toLowerCase();
        if (!AppState.reserveWeapons) AppState.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };
        if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
        const ex = AppState.reserveWeapons[cat].find(item => item.id === w.id && item.level === w.level);
        if (ex) ex.count++;
        else AppState.reserveWeapons[cat].push({ id: w.id, name: w.name, tier: w.tier, level: w.level, count: 1 });
        h.titanSlot.weapons[hardpointIndex] = null;
        saveState();
        if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      }
    };

    window.deployRobotDirectly = function(storageIndex) {
      const r = AppState.reserveRobots && AppState.reserveRobots[storageIndex];
      if (!r) return;
      const targetHangarKey = (typeof currentActiveHangarKey !== 'undefined' && AppState.hangars[currentActiveHangarKey]) ? currentActiveHangarKey : Object.keys(AppState.hangars)[0];
      const targetHangar = AppState.hangars[targetHangarKey];
      if (!targetHangar) return;

      const emptyIdx = (targetHangar.slots || []).findIndex(s => !s || !s.robotId);
      const targetSlot = emptyIdx !== -1 ? emptyIdx : 0;
      const master = MASTER_ROBOTS.find(mb => mb.id === r.robotId);

      // If overwriting an existing bot in that slot, send old bot to storage
      if (targetHangar.slots[targetSlot] && targetHangar.slots[targetSlot].robotId) {
        window.unequipRobot(targetHangarKey, targetSlot);
      }

      AppState.reserveRobots.splice(storageIndex, 1);
      targetHangar.slots[targetSlot] = {
        robotId: r.robotId,
        level: r.level || "Lv 1",
        weapons: (master ? master.hardpoints : [{ size: "Heavy" }]).map(() => null)
      };

      saveState();
      if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      switchActiveHangar(targetHangarKey);
      switchTab('hangars');
    };

    window.removeRobotFromStorage = function(idx) {
      if (AppState.reserveRobots) {
        AppState.reserveRobots.splice(idx, 1);
        saveState();
        if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      }
    };

    window.deleteWeaponStorage = function(cat, weaponId, level) {
      if (!AppState.reserveWeapons) return;
      const list = AppState.reserveWeapons[cat];
      if (!list) return;
      const idx = list.findIndex(w => w.id === weaponId && w.level === level);
      if (idx !== -1) {
        if (list[idx].count > 1) list[idx].count--;
        else list.splice(idx, 1);
        saveState();
        if (typeof renderPersonalStorage === 'function') renderPersonalStorage();
      }
    };

    window.equipRaptorPreset = function() {
      if (!AppState.hangars.hangar2) {
        AppState.hangars.hangar2 = {
          id: "hangar2",
          name: "Hangar 2: Specialized Strike Squad",
          slots: [null, null, null, null, null]
        };
      }
      AppState.hangars.hangar2.slots[1] = {
        robotId: "raptor",
        level: "Lv 1",
        weapons: [
          { id: "athos", name: "Athos", size: "Heavy", level: "Lv 1", tier: "T4" },
          { id: "aramis", name: "Aramis", size: "Light", level: "Lv 1", tier: "T4" },
          { id: "aramis", name: "Aramis", size: "Light", level: "Lv 1", tier: "T4" }
        ]
      };
      saveState();
      switchActiveHangar('hangar2');
      switchTab('hangars');
    };


    window.openExportModal = function() {
      const modal = document.getElementById('data-modal');
      document.getElementById('data-modal-title').innerText = "💾 Export Hangar JSON";
      const ta = document.getElementById('data-modal-textarea');
      ta.value = JSON.stringify(AppState, null, 2);
      ta.readOnly = true;

      const actionBtn = document.getElementById('data-modal-action-btn');
      actionBtn.innerText = "Copy to Clipboard";
      actionBtn.onclick = () => {
        navigator.clipboard.writeText(ta.value);
        actionBtn.innerText = "✓ Copied!";
        setTimeout(() => closeModal('data-modal'), 1000);
      };
      modal.classList.remove('hidden');
    };

    window.openImportModal = function() {
      const modal = document.getElementById('data-modal');
      document.getElementById('data-modal-title').innerText = "📥 Import Hangar JSON";
      const ta = document.getElementById('data-modal-textarea');
      ta.value = "";
      ta.readOnly = false;

      const actionBtn = document.getElementById('data-modal-action-btn');
      actionBtn.innerText = "Import Data";
      actionBtn.onclick = () => {
        try {
          const parsed = JSON.parse(ta.value);
          if (parsed.hangars) {
            AppState = parsed;
            saveState();
            alert("Data imported successfully!");
            closeModal('data-modal');
          } else { alert("Invalid data format."); }
        } catch (e) { alert("Invalid JSON syntax."); }
      };
      modal.classList.remove('hidden');
    };

    window.resetData = function() {
      if (confirm("Reset account back to default setup?")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    };

    window.openSupportModal = function() {
      const modal = document.getElementById('support-modal');
      if (modal) modal.classList.remove('hidden');
    };

    window.copySupportEmail = function() {
      const email = "wrbrain.official@outlook.com";
      navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById('copy-support-email-btn');
        if (btn) {
          btn.innerText = "✓ Copied!";
          setTimeout(() => { btn.innerText = "📋 Copy"; }, 2000);
        }
      });
    };

    window.copyInstagramHandle = function() {
      const handle = "@wrbrain.official";
      navigator.clipboard.writeText(handle).then(() => {
        const btn = document.getElementById('copy-instagram-btn');
        if (btn) {
          btn.innerText = "✓ Copied!";
          setTimeout(() => { btn.innerText = "📋 Copy"; }, 2000);
        }
      });
    };

    window.openMobileMenuModal = function() {
      const modal = document.getElementById('mobile-menu-modal');
      if (modal) modal.classList.remove('hidden');
    };

    window.closeModal = function(id) {
      const modal = document.getElementById(id);
      if (modal) modal.classList.add('hidden');
    };

    window.handleModalBackdropClick = function(event, modalId) {
      if (event.target.id === modalId || event.target.classList.contains('modal-overlay-backdrop')) {
        closeModal(modalId);
      }
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal-overlay-backdrop:not(.hidden)');
        activeModals.forEach(m => m.classList.add('hidden'));
      }
    });
