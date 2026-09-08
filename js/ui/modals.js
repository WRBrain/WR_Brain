/* WRBrain - Interactive Modals & Command Decks */

let currentAuditHangar = "hangar1";
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
      const modal = document.getElementById('catalog-modal');
      document.getElementById('catalog-modal-title').innerText = `🛸 Equip Drone to ${hangarKey.toUpperCase()} (Slot ${slotIndex + 1})`;
      modal.classList.remove('hidden');
      filterCatalogModal();
    };

    window.openEquipTitanWeaponModal = function(hangarKey, hardpointIndex, size) {
      activeEquipTarget = { hangarKey, isTitan: true, hardpointIndex, size };
      const modal = document.getElementById('weapon-picker-modal');
      document.getElementById('picker-modal-title').innerText = `Equip Titan ${size} Weapon (Hardpoint ${hardpointIndex + 1})`;

      const listContainer = document.getElementById('picker-weapons-list');
      listContainer.innerHTML = "";
      const catKey = size.toLowerCase();
      const storageWeapons = (AppState.reserveWeapons && AppState.reserveWeapons[catKey]) ? AppState.reserveWeapons[catKey] : [];

      if (storageWeapons.length > 0) {
        listContainer.innerHTML += `<div class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">From Your Titan Storage</div>`;
        storageWeapons.forEach(w => {
          const mw = MASTER_WEAPONS.find(item => item.id === w.id);
          listContainer.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#161f2e] border border-[#263040] rounded-xl text-xs transition-all">
              <div>
                <span class="font-bold text-white text-sm">${w.name}</span>
                <span class="text-gray-400 ml-1">(${w.level || 'Lv 1'}) • x${w.count} Available</span>
                <span class="text-blue-400 font-mono block text-[11px]">${mw ? `${mw.range}m • ${mw.family}` : ''}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${mw ? `<button onclick="inspectWeaponVariants('${mw.id}')" class="text-amber-400 text-[11px] px-2 py-1 hover:underline">Variants</button>` : ''}
                <button onclick="equipWeaponDirect('${w.id}', '${w.level}', true)" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow">
                  Equip
                </button>
              </div>
            </div>
          `;
        });
      }

      listContainer.innerHTML += `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-2">Or Spawn From Master Catalog</div>`;
      const catalogWeapons = MASTER_WEAPONS.filter(w => w.size.toLowerCase() === size.toLowerCase());
      catalogWeapons.forEach(mw => {
        listContainer.innerHTML += `
          <div class="flex items-center justify-between p-2.5 bg-[#080c14]/60 hover:bg-[#080c14] border border-[#263040] rounded-xl text-xs">
            <div>
              <span class="font-bold text-gray-200">${mw.name}</span>
              <span class="text-[10px] text-gray-400 ml-1">(${mw.tier}) • ${mw.range}m</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button onclick="inspectWeaponVariants('${mw.id}')" class="text-amber-400 text-[11px] px-2 py-1 hover:underline">Variants</button>
              <button onclick="equipWeaponDirect('${mw.id}', 'Lv 1', false)" class="px-2.5 py-1 text-xs font-semibold rounded bg-[#161f2e] hover:bg-amber-500 hover:text-black text-gray-300">
                Spawn & Equip
              </button>
            </div>
          </div>
        `;
      });

      modal.classList.remove('hidden');
    };

    window.openEquipWeaponModal = function(hangarKey, slotIndex, hardpointIndex, size) {
      activeEquipTarget = { hangarKey, slotIndex, hardpointIndex, size };
      const modal = document.getElementById('weapon-picker-modal');
      document.getElementById('picker-modal-title').innerText = `Equip ${size} Weapon (Slot ${slotIndex + 1}, Hardpoint ${hardpointIndex + 1})`;

      const listContainer = document.getElementById('picker-weapons-list');
      listContainer.innerHTML = "";
      const storageWeapons = (AppState.reserveWeapons && AppState.reserveWeapons[size.toLowerCase()]) ? AppState.reserveWeapons[size.toLowerCase()] : [];

      if (storageWeapons.length > 0) {
        listContainer.innerHTML += `<div class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">From Your Storage Arsenal</div>`;
        storageWeapons.forEach(w => {
          const mw = MASTER_WEAPONS.find(item => item.id === w.id);
          listContainer.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-[#080c14] hover:bg-[#161f2e] border border-[#263040] rounded-xl text-xs transition-all">
              <div>
                <span class="font-bold text-white text-sm">${w.name}</span>
                <span class="text-gray-400 ml-1">(${w.level || 'Lv 1'}) • x${w.count} Available</span>
                <span class="text-blue-400 font-mono block text-[11px]">${mw ? `${mw.range}m • ${mw.family}` : ''}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${mw ? `<button onclick="inspectWeaponVariants('${mw.id}')" class="text-amber-400 text-[11px] px-2 py-1 hover:underline">Variants</button>` : ''}
                <button onclick="equipWeaponDirect('${w.id}', '${w.level}', true)" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow">
                  Equip
                </button>
              </div>
            </div>
          `;
        });
      }

      listContainer.innerHTML += `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-2">Or Spawn From Master Catalog</div>`;
      const catalogWeapons = MASTER_WEAPONS.filter(w => w.size.toLowerCase() === size.toLowerCase());
      catalogWeapons.forEach(mw => {
        listContainer.innerHTML += `
          <div class="flex items-center justify-between p-2.5 bg-[#080c14]/60 hover:bg-[#080c14] border border-[#263040] rounded-xl text-xs">
            <div>
              <span class="font-bold text-gray-200">${mw.name}</span>
              <span class="text-[10px] text-gray-400 ml-1">(${mw.tier}) • ${mw.range}m</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button onclick="inspectWeaponVariants('${mw.id}')" class="text-amber-400 text-[11px] px-2 py-1 hover:underline">Variants</button>
              <button onclick="equipWeaponDirect('${mw.id}', 'Lv 1', false)" class="px-2.5 py-1 text-xs font-semibold rounded bg-[#161f2e] hover:bg-amber-500 hover:text-black text-gray-300">
                Spawn & Equip
              </button>
            </div>
          </div>
        `;
      });

      modal.classList.remove('hidden');
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
      const level = document.getElementById('catalog-level-select').value;
      if (subType === 'drone') {
        const d = MASTER_DRONES.find(item => item.id === itemId);
        if (d) {
          if (!AppState.reserveDrones) AppState.reserveDrones = [];
          const ex = AppState.reserveDrones.find(x => x.id === itemId);
          if (ex) ex.count = (ex.count || 1) + 1;
          else AppState.reserveDrones.push({ id: d.id, name: d.name, level, tier: d.tier, role: d.role, desc: d.desc, count: 1 });
        }
      } else if (subType === 'pilot') {
        const p = MASTER_PILOTS.find(item => item.id === itemId);
        if (p) {
          if (!AppState.reservePilots) AppState.reservePilots = [];
          const ex = AppState.reservePilots.find(x => x.id === itemId && x.level === level);
          if (ex) ex.count = (ex.count || 1) + 1;
          else AppState.reservePilots.push({ id: p.id, name: p.name, bot: p.bot, level, tier: p.tier, skill: p.skill, skills: getDefaultPilotSkills("Brawler"), count: 1 });
        }
      } else if (subType === 'mothership') {
        const m = MASTER_MOTHERSHIPS.find(item => item.id === itemId);
        if (m) {
          if (!AppState.reserveMotherships) AppState.reserveMotherships = [];
          const ex = AppState.reserveMotherships.find(x => x.id === itemId);
          if (ex) ex.count = (ex.count || 1) + 1;
          else AppState.reserveMotherships.push({ id: m.id, name: m.name, level, tier: m.tier, effect: m.effect, count: 1 });
        }
      }
      saveState();
      closeModal('catalog-modal');
    };

    window.equipDroneDirect = function(droneId, level, fromInventory) {
      if (!activeEquipTarget) return;
      const md = MASTER_DRONES.find(d => d.id === droneId);
      if (!md) return;
      const slot = AppState.hangars[activeEquipTarget.hangarKey].slots[activeEquipTarget.slotIndex];
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
    };

    window.unequipDrone = function(hangarKey, slotIndex) {
      const slot = AppState.hangars[hangarKey].slots[slotIndex];
      if (!slot || !slot.drone) return;
      const d = slot.drone;
      if (!AppState.reserveDrones) AppState.reserveDrones = [];
      const ex = AppState.reserveDrones.find(item => item.id === d.id && item.level === d.level);
      if (ex) ex.count = (ex.count || 1) + 1;
      else AppState.reserveDrones.push({ id: d.id, name: d.name, level: d.level, tier: d.tier, role: d.role, count: 1 });
      delete slot.drone;
      saveState();
    };

    window.selectCatalogItem = function(itemId) {
      const level = document.getElementById('catalog-level-select').value;
      if (activeCatalogType === 'robot') {
        const master = MASTER_ROBOTS.find(r => r.id === itemId);
        AppState.reserveRobots.push({ robotId: itemId, level, tier: master ? master.tier : "T4" });
      } else if (activeCatalogType === 'titan') {
        const master = MASTER_TITANS.find(t => t.id === itemId);
        if (!AppState.reserveTitans) AppState.reserveTitans = [];
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
    };

    window.addBotToStorageDirect = function(botId) {
      const master = MASTER_ROBOTS.find(r => r.id === botId);
      AppState.reserveRobots.push({ robotId: botId, level: "Lv 1", tier: master ? master.tier : "T4" });
      saveState();
      alert(`Added ${master.name} (Lv 1) to your storage!`);
    };

    window.addWeaponToStorageDirect = function(weaponId) {
      const master = MASTER_WEAPONS.find(w => w.id === weaponId);
      if (master) {
        const cat = master.size.toLowerCase();
        if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
        const existing = AppState.reserveWeapons[cat].find(w => w.id === weaponId && w.level === "Lv 1");
        if (existing) existing.count++;
        else AppState.reserveWeapons[cat].push({ id: weaponId, name: master.name, tier: master.tier, level: "Lv 1", count: 1 });
        saveState();
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
          if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
          const ex = AppState.reserveWeapons[cat].find(w => w.id === current.id && w.level === current.level);
          if (ex) ex.count++;
          else AppState.reserveWeapons[cat].push({ id: current.id, name: current.name, tier: current.tier, level: current.level, count: 1 });
        }

        if (fromInventory) {
          const cat = master.size.toLowerCase();
          if (AppState.reserveWeapons[cat]) {
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
        return;
      }

      const slot = AppState.hangars[activeEquipTarget.hangarKey].slots[activeEquipTarget.slotIndex];
      const current = slot.weapons[activeEquipTarget.hardpointIndex];

      if (current && current.id) {
        const cat = current.size.toLowerCase();
        if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
        const ex = AppState.reserveWeapons[cat].find(w => w.id === current.id && w.level === current.level);
        if (ex) ex.count++;
        else AppState.reserveWeapons[cat].push({ id: current.id, name: current.name, tier: current.tier, level: current.level, count: 1 });
      }

      if (fromInventory) {
        const cat = master.size.toLowerCase();
        if (AppState.reserveWeapons[cat]) {
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
    };

    window.unequipWeapon = function(hangarKey, slotIndex, hardpointIndex) {
      const slot = AppState.hangars[hangarKey].slots[slotIndex];
      const w = slot.weapons[hardpointIndex];
      if (w && w.id) {
        const cat = w.size.toLowerCase();
        if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
        const ex = AppState.reserveWeapons[cat].find(item => item.id === w.id && item.level === w.level);
        if (ex) ex.count++;
        else AppState.reserveWeapons[cat].push({ id: w.id, name: w.name, tier: w.tier, level: w.level, count: 1 });
        slot.weapons[hardpointIndex] = null;
        saveState();
      }
    };

    window.unequipRobot = function(hangarKey, slotIndex) {
      const slot = AppState.hangars[hangarKey].slots[slotIndex];
      if (!slot || !slot.robotId) return;

      const master = MASTER_ROBOTS.find(r => r.id === slot.robotId);
      AppState.reserveRobots.push({ robotId: slot.robotId, level: slot.level || "Lv 1", tier: master ? master.tier : "T4" });

      if (slot.weapons) {
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

      AppState.hangars[hangarKey].slots[slotIndex] = { robotId: null, level: "", weapons: [] };
      saveState();
    };

    window.unequipTitan = function(hangarKey) {
      const h = AppState.hangars[hangarKey];
      if (!h || !h.titanSlot || !h.titanSlot.titanId) return;
      const tSlot = h.titanSlot;
      const master = MASTER_TITANS.find(t => t.id === tSlot.titanId);

      if (!AppState.reserveTitans) AppState.reserveTitans = [];
      AppState.reserveTitans.push({ titanId: tSlot.titanId, level: tSlot.level || "Lv 15", tier: master ? master.tier : "T4" });

      if (tSlot.weapons) {
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
    };

    window.unequipTitanWeapon = function(hangarKey, hardpointIndex) {
      const h = AppState.hangars[hangarKey];
      if (!h || !h.titanSlot || !h.titanSlot.weapons) return;
      const w = h.titanSlot.weapons[hardpointIndex];
      if (w && w.id) {
        const cat = w.size.toLowerCase();
        if (!AppState.reserveWeapons[cat]) AppState.reserveWeapons[cat] = [];
        const ex = AppState.reserveWeapons[cat].find(item => item.id === w.id && item.level === w.level);
        if (ex) ex.count++;
        else AppState.reserveWeapons[cat].push({ id: w.id, name: w.name, tier: w.tier, level: w.level, count: 1 });
        h.titanSlot.weapons[hardpointIndex] = null;
        saveState();
      }
    };

    window.deployRobotDirectly = function(storageIndex) {
      const r = AppState.reserveRobots[storageIndex];
      if (!r) return;
      const emptyIdx = AppState.hangars.hangar1.slots.findIndex(s => !s || !s.robotId);
      const targetSlot = emptyIdx !== -1 ? emptyIdx : 0;
      const master = MASTER_ROBOTS.find(mb => mb.id === r.robotId);

      AppState.reserveRobots.splice(storageIndex, 1);
      AppState.hangars.hangar1.slots[targetSlot] = {
        robotId: r.robotId,
        level: r.level,
        weapons: (master ? master.hardpoints : [{ size: "Heavy" }]).map(() => null)
      };

      saveState();
      switchTab('hangar1');
    };

    window.removeRobotFromStorage = function(idx) {
      AppState.reserveRobots.splice(idx, 1);
      saveState();
    };

    window.deleteWeaponStorage = function(cat, weaponId, level) {
      const list = AppState.reserveWeapons[cat];
      if (!list) return;
      const idx = list.findIndex(w => w.id === weaponId && w.level === level);
      if (idx !== -1) {
        if (list[idx].count > 1) list[idx].count--;
        else list.splice(idx, 1);
        saveState();
      }
    };

    window.equipRaptorPreset = function() {
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
      switchTab('hangar2');
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

    window.closeModal = function(id) {
      const modal = document.getElementById(id);
      if (modal) modal.classList.add('hidden');
    };
