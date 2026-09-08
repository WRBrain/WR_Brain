/* WRBrain - Master Encyclopedia & Personal Storage Browser */

window.onWeaponDexLevelChange = function(weaponId, levelIdx, isTitan = false) {
  const levelList = isTitan ? TITAN_WEAPON_LEVELS : BOT_LEVELS;
  const lvlStr = levelList[levelIdx] || levelList[0];
  const mult = getLevelMultiplier(lvlStr, isTitan ? 'titan_weapon' : 'bot_or_weapon');
  
  const mw = MASTER_WEAPONS.find(w => w.id === weaponId);
  if (!mw) return;

  const burstEl = document.getElementById(`dex-w-burst-${weaponId}`);
  const lvlEl = document.getElementById(`dex-w-lvl-${weaponId}`);
  
  if (burstEl) burstEl.innerText = `${Math.round(mw.burstDps * mult).toLocaleString()} DPS`;
  if (lvlEl) {
    lvlEl.innerText = lvlStr;
    lvlEl.className = `text-[10px] font-mono px-1.5 py-0.5 rounded border ${isTitan ? 'bg-red-500/20 text-red-300 border-red-500/40' : getLevelBadgeStyle(lvlStr)}`;
  }
};

window.onRobotDexLevelChange = function(botId, levelIdx) {
  const lvlStr = BOT_LEVELS[levelIdx] || BOT_LEVELS[0];
  const mult = getLevelMultiplier(lvlStr, 'bot_or_weapon');
  
  const mb = MASTER_ROBOTS.find(r => r.id === botId);
  if (!mb) return;

  const hpEl = document.getElementById(`dex-bot-hp-${botId}`);
  const lvlEl = document.getElementById(`dex-bot-lvl-${botId}`);
  
  if (hpEl) hpEl.innerText = `${Math.round((mb.hp || 220000) * mult).toLocaleString()} HP`;
  if (lvlEl) {
    lvlEl.innerText = lvlStr;
    lvlEl.className = `text-[10px] font-mono px-1.5 py-0.5 rounded border ${getLevelBadgeStyle(lvlStr)}`;
  }
};

window.onTitanDexLevelChange = function(titanId, levelIdx) {
  const lvlStr = TITAN_LEVELS[levelIdx] || TITAN_LEVELS[0];
  const mult = getLevelMultiplier(lvlStr, 'titan');
  
  const mt = MASTER_TITANS.find(t => t.id === titanId);
  if (!mt) return;

  const hpEl = document.getElementById(`dex-titan-hp-${titanId}`);
  const lvlEl = document.getElementById(`dex-titan-lvl-${titanId}`);
  
  if (hpEl) hpEl.innerText = `${Math.round((mt.hp || 950000) * mult).toLocaleString()} HP`;
  if (lvlEl) {
    lvlEl.innerText = lvlStr;
    lvlEl.className = `text-[10px] font-mono px-1.5 py-0.5 rounded border bg-red-500/20 text-red-300 border-red-500/40`;
  }
};

function renderWeaponEncyclopedia() {
  const container = document.getElementById('encyclopedia-weapons-grid');
  if (!container) return;
  const search = (document.getElementById('encyclo-weapon-search')?.value || '').toLowerCase();
  const size = activeWeaponSizeTab;

  container.innerHTML = "";
  const filtered = MASTER_WEAPONS.filter(w => (w.name.toLowerCase().includes(search)) && (size === 'ALL' || w.size === size));

  filtered.forEach(w => {
    const isTitanW = w.size === "Alpha" || w.size === "Beta";
    const badgeClass = isTitanW ? (w.size === "Alpha" ? "badge-alpha" : "badge-beta") : `badge-${w.tier.toLowerCase()}`;
    const levelList = isTitanW ? TITAN_WEAPON_LEVELS : BOT_LEVELS;
    const defaultIdx = isTitanW ? 0 : 0;
    const defaultLvl = levelList[defaultIdx];

    const card = document.createElement('div');
    card.className = "glass-card p-4 rounded-xl flex flex-col justify-between space-y-3";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between">
          <span class="${badgeClass} text-[10px] font-black px-2 py-0.5 rounded">${isTitanW ? `TITAN ${w.size.toUpperCase()}` : w.tier}</span>
          <span class="text-xs font-bold text-amber-400 font-mono">${w.size}</span>
        </div>
        <h4 class="text-base font-black text-white mt-1.5">${w.name}</h4>
        <p class="text-xs text-gray-400">${w.family} • <span class="text-blue-400 font-mono">${w.range}m</span></p>
        
        <!-- Live Interactive Level Slider -->
        <div class="mt-2.5 p-2 bg-[#080c14] rounded-lg border border-[#263040] space-y-1.5">
          <div class="flex items-center justify-between text-[11px]">
            <span class="text-gray-400">Level Preview:</span>
            <span id="dex-w-lvl-${w.id}" class="text-[10px] font-mono px-1.5 py-0.5 rounded border ${isTitanW ? 'bg-red-500/20 text-red-300 border-red-500/40' : getLevelBadgeStyle(defaultLvl)}">${defaultLvl}</span>
          </div>
          <input type="range" min="0" max="${levelList.length - 1}" value="${defaultIdx}" 
            oninput="onWeaponDexLevelChange('${w.id}', this.value, ${isTitanW})" 
            class="${isTitanW ? 'level-slider level-slider-titan' : 'level-slider'} w-full" title="Slide to preview stats per level">
          <div class="flex justify-between text-[11px] text-gray-300 pt-1 border-t border-[#1a2332]">
            <span>Burst Output:</span>
            <span id="dex-w-burst-${w.id}" class="font-bold text-red-400 font-mono">${w.burstDps.toLocaleString()} DPS</span>
          </div>
          <div class="flex justify-between text-[11px] text-gray-300">
            <span>Reload Downtime:</span>
            <span class="font-bold text-orange-400 font-mono">${w.reload}s</span>
          </div>
        </div>
        <span class="text-[10px] text-amber-300 block mt-1.5">${w.status}</span>
      </div>

      <div class="space-y-1.5 pt-2 border-t border-[#263040]">
        <button onclick="inspectWeaponVariants('${w.id}')" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#080c14] hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-all">
          🔗 ${isTitanW ? 'View Alpha / Beta Sibling' : 'View Heavy / Light Variants'}
        </button>
        <button onclick="addWeaponToStorageDirect('${w.id}')" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-gray-200 border border-[#263040] transition-all">
          ➕ Add to Storage
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderTitanWeaponsEncyclopedia() {
  const container = document.getElementById('encyclopedia-titan-weapons-grid');
  if (!container) return;
  container.innerHTML = "";
  const titanWeapons = MASTER_WEAPONS.filter(w => w.size === "Alpha" || w.size === "Beta");

  titanWeapons.forEach(w => {
    const badgeClass = w.size === "Alpha" ? "badge-alpha" : "badge-beta";
    const levelList = TITAN_WEAPON_LEVELS;
    const defaultIdx = 0;
    const defaultLvl = levelList[defaultIdx];

    const card = document.createElement('div');
    card.className = "glass-card p-4 rounded-xl flex flex-col justify-between space-y-3";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between">
          <span class="${badgeClass} text-[10px] font-black px-2 py-0.5 rounded">TITAN ${w.size.toUpperCase()}</span>
          <span class="text-xs font-bold text-amber-400 font-mono">${w.range}m</span>
        </div>
        <h4 class="text-base font-black text-white mt-1.5">${w.name}</h4>
        <p class="text-xs text-gray-400">${w.family}</p>
        
        <!-- Live Interactive Level Slider -->
        <div class="mt-2.5 p-2 bg-[#080c14] rounded-lg border border-[#263040] space-y-1.5">
          <div class="flex items-center justify-between text-[11px]">
            <span class="text-gray-400">Level Preview:</span>
            <span id="dex-w-lvl-${w.id}" class="text-[10px] font-mono px-1.5 py-0.5 rounded border bg-red-500/20 text-red-300 border-red-500/40">${defaultLvl}</span>
          </div>
          <input type="range" min="0" max="${levelList.length - 1}" value="${defaultIdx}" 
            oninput="onWeaponDexLevelChange('${w.id}', this.value, true)" 
            class="level-slider level-slider-titan w-full" title="Slide to preview stats per level">
          <div class="flex justify-between text-[11px] text-gray-300 pt-1 border-t border-[#1a2332]">
            <span>Burst Output:</span>
            <span id="dex-w-burst-${w.id}" class="font-bold text-red-400 font-mono">${w.burstDps.toLocaleString()} DPS</span>
          </div>
          <div class="flex justify-between text-[11px] text-gray-300">
            <span>Reload Downtime:</span>
            <span class="font-bold text-orange-400 font-mono">${w.reload}s</span>
          </div>
        </div>
        <span class="text-[10px] text-amber-300 block mt-1.5">${w.status}</span>
      </div>
      <div class="space-y-1.5 pt-2 border-t border-[#263040]">
        <button onclick="inspectWeaponVariants('${w.id}')" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#080c14] hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-all">
          🔗 View Alpha / Beta Sibling
        </button>
        <button onclick="addWeaponToStorageDirect('${w.id}')" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-gray-200 border border-[#263040] transition-all">
          ➕ Add to Storage
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderRobotEncyclopedia() {
  const container = document.getElementById('encyclopedia-robots-grid');
  if (!container) return;
  const search = (document.getElementById('encyclo-bot-search')?.value || '').toLowerCase();
  const tier = document.getElementById('encyclo-bot-tier')?.value || 'ALL';

  container.innerHTML = "";
  const filtered = MASTER_ROBOTS.filter(r => (r.name.toLowerCase().includes(search)) && (tier === 'ALL' || r.tier === tier));

  filtered.forEach(r => {
    const defaultIdx = 0;
    const defaultLvl = BOT_LEVELS[defaultIdx];
    const card = document.createElement('div');
    card.className = "glass-card p-4 rounded-xl flex flex-col justify-between space-y-3";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between">
          <span class="badge-${r.tier.toLowerCase()} text-[10px] font-black px-2 py-0.5 rounded">${r.tier}</span>
          <span class="text-xs text-gray-400 font-mono">${r.speed} km/h</span>
        </div>
        <h4 class="text-base font-black text-white mt-1.5">${r.name}</h4>
        <p class="text-xs text-gray-400">${r.faction} • <strong>${r.role}</strong></p>
        
        <!-- Live Interactive Level Slider -->
        <div class="mt-2.5 p-2 bg-[#080c14] rounded-lg border border-[#263040] space-y-1.5">
          <div class="flex items-center justify-between text-[11px]">
            <span class="text-gray-400">Level Preview:</span>
            <span id="dex-bot-lvl-${r.id}" class="text-[10px] font-mono px-1.5 py-0.5 rounded border ${getLevelBadgeStyle(defaultLvl)}">${defaultLvl}</span>
          </div>
          <input type="range" min="0" max="${BOT_LEVELS.length - 1}" value="${defaultIdx}" 
            oninput="onRobotDexLevelChange('${r.id}', this.value)" 
            class="level-slider w-full" title="Slide to preview robot durability per level">
          <div class="flex justify-between text-[11px] text-gray-300 pt-1 border-t border-[#1a2332]">
            <span>Durability:</span>
            <span id="dex-bot-hp-${r.id}" class="font-bold text-emerald-400 font-mono">${(r.hp || 220000).toLocaleString()} HP</span>
          </div>
          <div class="flex justify-between text-[11px] text-gray-300">
            <span>Hardpoints:</span>
            <span class="font-bold text-amber-400">${r.hardpoints.map(h => h.size).join(" + ")}</span>
          </div>
        </div>
        <p class="text-[11px] text-gray-400 mt-2 leading-relaxed italic">${r.ability}</p>
      </div>

      <div class="space-y-1.5 pt-2 border-t border-[#263040]">
        ${r.seriesKey ? `
          <button onclick="inspectRobotSeries('${r.id}')" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#080c14] hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center gap-1.5 transition-all">
            🧬 View Series / Ultimate Siblings
          </button>
        ` : ''}
        <button onclick="addBotToStorageDirect('${r.id}')" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-300 border border-[#263040] transition-all">
          ➕ Add to Storage
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderTitanEncyclopedia() {
  const container = document.getElementById('encyclopedia-titans-grid');
  if (!container) return;
  container.innerHTML = "";

  MASTER_TITANS.forEach(t => {
    const defaultIdx = 0;
    const defaultLvl = TITAN_LEVELS[defaultIdx];
    const card = document.createElement('div');
    card.className = "glass-card p-5 rounded-xl space-y-3";
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="badge-titan text-[10px] font-black px-2 py-0.5 rounded">TITAN</span>
        <span class="text-xs font-bold text-amber-400">${t.role}</span>
      </div>
      <h4 class="text-lg font-black text-white">${t.name}</h4>
      
      <!-- Live Interactive Level Slider -->
      <div class="p-2.5 bg-[#080c14] rounded-lg border border-[#263040] space-y-1.5 text-xs">
        <div class="flex items-center justify-between text-[11px]">
          <span class="text-gray-400">Titan Core Level:</span>
          <span id="dex-titan-lvl-${t.id}" class="text-[10px] font-mono px-1.5 py-0.5 rounded border bg-red-500/20 text-red-300 border-red-500/40">${defaultLvl}</span>
        </div>
        <input type="range" min="0" max="${TITAN_LEVELS.length - 1}" value="${defaultIdx}" 
          oninput="onTitanDexLevelChange('${t.id}', this.value)" 
          class="level-slider level-slider-titan w-full" title="Slide from Lv 1 to Lv 150">
        <div class="flex justify-between text-[11px] text-gray-300 pt-1 border-t border-[#1a2332]">
          <span>Hull Durability:</span>
          <span id="dex-titan-hp-${t.id}" class="font-bold text-emerald-400 font-mono">${(t.hp || 950000).toLocaleString()} HP</span>
        </div>
        <div class="flex justify-between text-[11px] text-gray-300">
          <span>Titan Hardpoints:</span>
          <span class="font-bold text-red-400 font-mono">${t.hardpoints.map(h => h.size).join(" + ")}</span>
        </div>
      </div>
      <p class="text-xs text-gray-300 leading-relaxed italic">${t.ability}</p>

      <div class="pt-2 border-t border-[#263040]">
        <button onclick="addTitanToStorageDirect('${t.id}')" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-300 border border-[#263040] transition-all">
          ➕ Add Titan to Storage
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.renderWeaponEncyclopedia = renderWeaponEncyclopedia;
window.renderTitanWeaponsEncyclopedia = renderTitanWeaponsEncyclopedia;
window.renderRobotEncyclopedia = renderRobotEncyclopedia;
window.renderTitanEncyclopedia = renderTitanEncyclopedia;

function renderPersonalStorage() {

      // 1. Calculate & Update Badges
      const titanChassisCount = (AppState.reserveTitans || []).length;
      const alphaCount = (AppState.reserveWeapons.alpha || []).reduce((acc, w) => acc + (w.count || 1), 0);
      const betaCount = (AppState.reserveWeapons.beta || []).reduce((acc, w) => acc + (w.count || 1), 0);
      const totalTitanItems = titanChassisCount + alphaCount + betaCount;

      const droneCount = (AppState.reserveDrones || []).reduce((acc, d) => acc + (d.count || 1), 0);
      const pilotCount = (AppState.reservePilots || []).reduce((acc, p) => acc + (p.count || 1), 0);
      const shipCount = (AppState.reserveMotherships || []).reduce((acc, m) => acc + (m.count || 1), 0);
      const totalSupportItems = droneCount + pilotCount + shipCount;

      const totalRobots = (AppState.reserveRobots || []).length;

      const heavyCount = (AppState.reserveWeapons.heavy || []).reduce((acc, w) => acc + (w.count || 1), 0);
      const medCount = (AppState.reserveWeapons.medium || []).reduce((acc, w) => acc + (w.count || 1), 0);
      const lightCount = (AppState.reserveWeapons.light || []).reduce((acc, w) => acc + (w.count || 1), 0);
      const totalRegularWeapons = heavyCount + medCount + lightCount;

      const bTitans = document.getElementById('badge-count-titans');
      const bSupport = document.getElementById('badge-count-support');
      const bRobots = document.getElementById('badge-count-robots');
      const bWeapons = document.getElementById('badge-count-weapons');

      if (bTitans) bTitans.innerText = totalTitanItems;
      if (bSupport) bSupport.innerText = totalSupportItems;
      if (bRobots) bRobots.innerText = totalRobots;
      if (bWeapons) bWeapons.innerText = totalRegularWeapons;

      // 2. Render Titans Panel
      const titansGrid = document.getElementById('my-titans-grid');
      if (titansGrid) {
        titansGrid.innerHTML = "";
        const search = (document.getElementById('titan-storage-search')?.value || '').toLowerCase();

        // Render Titan Chassis
        if (currentTitanStorageSubTab === 'all' || currentTitanStorageSubTab === 'chassis') {
          (AppState.reserveTitans || []).forEach((t, idx) => {
            const master = MASTER_TITANS.find(mt => mt.id === t.titanId) || { name: t.titanId, role: "Titan", hp: 800000, hardpoints: [] };
            if (search && !master.name.toLowerCase().includes(search) && !master.role.toLowerCase().includes(search)) return;
            titansGrid.innerHTML += `
              <div class="glass-card p-4 rounded-xl flex flex-col justify-between space-y-2 border-l-4 border-amber-500">
                <div>
                  <div class="flex justify-between items-center">
                    <span class="badge-titan text-[10px] font-black px-2 py-0.5 rounded">TITAN</span>
                    <span class="text-xs text-amber-400 font-bold">${t.level}</span>
                  </div>
                  <h4 class="text-base font-black text-white mt-1">${master.name}</h4>
                  <p class="text-xs text-gray-400 font-medium">${master.role} • ${(master.hp/1000).toFixed(0)}k HP</p>
                  <p class="text-[11px] text-gray-300 font-mono mt-1">Slots: ${master.hardpoints.map(h => h.size).join(" + ")}</p>
                </div>
                <div class="pt-2 flex gap-1.5 border-t border-[#263040]">
                  <button onclick="removeTitanFromStorage(${idx})" class="w-full py-1 text-xs rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 font-semibold">Remove from Reserve</button>
                </div>
              </div>
            `;
          });
        }

        // Render Titan Weapons (Alpha / Beta)
        const titanWeapCategories = (currentTitanStorageSubTab === 'all') ? ['alpha', 'beta'] :
                                    (currentTitanStorageSubTab === 'alpha') ? ['alpha'] :
                                    (currentTitanStorageSubTab === 'beta') ? ['beta'] : [];

        titanWeapCategories.forEach(cat => {
          (AppState.reserveWeapons[cat] || []).forEach(w => {
            if (search && !w.name.toLowerCase().includes(search)) return;
            titansGrid.innerHTML += `
              <div class="glass-card p-3 rounded-xl flex justify-between items-center text-xs border-l-4 ${cat === 'alpha' ? 'border-red-500' : 'border-blue-500'}">
                <div>
                  <span class="badge-titan text-[9px] font-black px-1.5 py-0.5 rounded">${cat.toUpperCase()} TITAN</span>
                  <strong class="text-white ml-1.5 text-sm">${w.name}</strong>
                  <span class="text-gray-400 text-[11px] block mt-0.5">${w.level} • x${w.count} in Storage</span>
                </div>
                <div class="flex items-center gap-1">
                  <button onclick="inspectWeaponVariants('${w.id}')" class="text-amber-400 text-[11px] px-2 py-1 hover:underline font-bold">Variants</button>
                  <button onclick="deleteWeaponStorage('${cat}', '${w.id}', '${w.level}')" class="text-gray-500 hover:text-red-400 px-2 py-1">✕</button>
                </div>
              </div>
            `;
          });
        });

        if (titansGrid.children.length === 0) {
          titansGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 text-xs py-8">No Titan items found in reserve storage.</p>`;
        }
      }

      // 3. Render Drones & Support Panel ("The other thing")
      const supportGrid = document.getElementById('my-support-grid');
      if (supportGrid) {
        supportGrid.innerHTML = "";
        const search = (document.getElementById('support-storage-search')?.value || '').toLowerCase();

        // Drones
        if (currentSupportStorageSubTab === 'all' || currentSupportStorageSubTab === 'drones') {
          (AppState.reserveDrones || []).forEach((d, idx) => {
            if (search && !d.name.toLowerCase().includes(search) && !(d.role||'').toLowerCase().includes(search)) return;
            supportGrid.innerHTML += `
              <div class="glass-card p-4 rounded-xl flex flex-col justify-between space-y-2 border-l-4 border-cyan-500">
                <div>
                  <div class="flex justify-between items-center">
                    <span class="badge-${(d.tier || 'T4').toLowerCase()} text-[10px] font-black px-2 py-0.5 rounded">DRONE</span>
                    <span class="text-xs text-cyan-400 font-bold">${d.level}</span>
                  </div>
                  <h4 class="text-base font-bold text-white mt-1">🤖 ${d.name}</h4>
                  <span class="text-xs text-amber-400 font-semibold">${d.role || 'Combat Drone'}</span>
                  <p class="text-[11px] text-gray-400 mt-1 italic leading-relaxed">${d.desc || 'Deploys autonomous support abilities.'}</p>
                </div>
                <div class="pt-2 flex justify-between items-center border-t border-[#263040]">
                  <span class="text-[11px] text-gray-500 font-mono">x${d.count || 1} Owned</span>
                  <button onclick="removeDroneFromStorage(${idx})" class="px-2 py-1 text-xs rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 font-semibold">✕</button>
                </div>
              </div>
            `;
          });
        }

        // Pilots
        if (currentSupportStorageSubTab === 'all' || currentSupportStorageSubTab === 'pilots') {
          (AppState.reservePilots || []).forEach((p, idx) => {
            if (search && !p.name.toLowerCase().includes(search) && !(p.bot||'').toLowerCase().includes(search)) return;
            const skillsCount = (p.skills || []).length;
            let skillsChips = "";
            if (skillsCount > 0) {
              skillsChips = `<div class="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-purple-500/20">` + p.skills.map(s => {
                const mSkill = MASTER_PILOT_SKILLS.find(ms => ms.id === s.id);
                const icon = mSkill ? mSkill.icon : "✨";
                const name = mSkill ? mSkill.name : s.id;
                const tierBadge = s.tier || "T4";
                const tierBg = tierBadge === 'T4' ? 'bg-amber-500 text-black font-black' : tierBadge === 'T3' ? 'bg-purple-900 text-purple-200' : tierBadge === 'T2' ? 'bg-blue-900 text-blue-200' : 'bg-gray-800 text-gray-300';
                return `<span class="text-[9px] px-1.5 py-0.5 rounded bg-[#080c14] border border-[#263040] text-gray-200 flex items-center gap-1 font-mono">${icon} ${name} <span class="${tierBg} px-1 rounded text-[8px]">${tierBadge}</span></span>`;
              }).join('') + `</div>`;
            }

            supportGrid.innerHTML += `
              <div class="glass-card p-4 rounded-xl flex flex-col justify-between space-y-2 border-l-4 border-amber-500">
                <div>
                  <div class="flex justify-between items-center">
                    <span class="badge-${(p.tier || 'T4').toLowerCase()} text-[10px] font-black px-2 py-0.5 rounded">PILOT</span>
                    <span class="text-xs text-amber-400 font-bold">${p.level}</span>
                  </div>
                  <h4 class="text-base font-bold text-white mt-1">🧑‍✈️ ${p.name}</h4>
                  <span class="text-xs text-purple-400 font-semibold">Robot: ${p.bot || 'Universal'}</span>
                  <p class="text-[11px] text-gray-300 mt-1 leading-relaxed">⚡ ${p.skill || 'Grants specialized combat bonuses.'}</p>
                  ${skillsChips}
                </div>
                <div class="pt-2 flex justify-between items-center border-t border-[#263040]">
                  <button onclick="openReservePilotSkillsModal(${idx})" class="px-2.5 py-1 text-[11px] font-bold rounded bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                    ✨ Pilot Skills (${skillsCount}/7)
                  </button>
                  <div class="flex items-center gap-2">
                    <span class="text-[11px] text-gray-500 font-mono">x${p.count || 1}</span>
                    <button onclick="removePilotFromStorage(${idx})" class="px-2 py-1 text-xs rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 font-semibold">✕</button>
                  </div>
                </div>
              </div>
            `;
          });
        }

        // Motherships
        if (currentSupportStorageSubTab === 'all' || currentSupportStorageSubTab === 'motherships') {
          (AppState.reserveMotherships || []).forEach((m, idx) => {
            if (search && !m.name.toLowerCase().includes(search)) return;
            supportGrid.innerHTML += `
              <div class="glass-card p-4 rounded-xl flex flex-col justify-between space-y-2 border-l-4 border-purple-500">
                <div>
                  <div class="flex justify-between items-center">
                    <span class="badge-${(m.tier || 'T4').toLowerCase()} text-[10px] font-black px-2 py-0.5 rounded">MOTHERSHIP</span>
                    <span class="text-xs text-purple-400 font-bold">${m.level}</span>
                  </div>
                  <h4 class="text-base font-bold text-white mt-1">🚀 ${m.name}</h4>
                  <p class="text-[11px] text-gray-300 mt-1 leading-relaxed">${m.effect || 'Orbital strike platform.'}</p>
                </div>
                <div class="pt-2 flex justify-between items-center border-t border-[#263040]">
                  <span class="text-[11px] text-gray-500 font-mono">x${m.count || 1} Ready</span>
                  <button onclick="removeMothershipFromStorage(${idx})" class="px-2 py-1 text-xs rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 font-semibold">✕</button>
                </div>
              </div>
            `;
          });
        }

        if (supportGrid.children.length === 0) {
          supportGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 text-xs py-8">No Drones, Pilots or Motherships in reserve storage.</p>`;
        }
      }

      // 4. Render Robots Panel
      const botsGrid = document.getElementById('my-robots-grid');
      if (botsGrid) {
        botsGrid.innerHTML = "";
        const search = (document.getElementById('robot-storage-search')?.value || '').toLowerCase();

        (AppState.reserveRobots || []).forEach((r, idx) => {
          const master = MASTER_ROBOTS.find(mb => mb.id === r.robotId) || { name: r.robotId, tier: "T4", role: "Brawler", hardpoints: [], faction: "SpaceTech" };
          if (currentRobotStorageFilter !== 'ALL' && master.tier !== currentRobotStorageFilter) return;
          if (search && !master.name.toLowerCase().includes(search) && !master.role.toLowerCase().includes(search)) return;

          botsGrid.innerHTML += `
            <div class="glass-card p-4 rounded-xl flex flex-col justify-between space-y-2">
              <div>
                <div class="flex justify-between items-center">
                  <span class="badge-${(r.tier || master.tier || 'T4').toLowerCase()} text-[10px] font-black px-2 py-0.5 rounded">${r.tier || master.tier || 'T4'}</span>
                  <span class="text-xs text-amber-400 font-bold">${r.level}</span>
                </div>
                <h4 class="text-base font-bold text-white mt-1">${master.name}</h4>
                <p class="text-xs text-gray-400">${master.role} • ${master.hardpoints.length} Slots</p>
                <p class="text-[11px] text-amber-400 font-mono mt-1">${master.hardpoints.map(h => h.size).join(" + ")}</p>
              </div>
              <div class="pt-2 flex flex-col gap-1.5 border-t border-[#263040]">
                ${master.seriesKey ? `
                  <button onclick="inspectRobotSeries('${master.id}')" class="w-full py-1 text-[11px] font-bold rounded bg-[#080c14] hover:bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    🧬 Series Siblings
                  </button>
                ` : ''}
                <div class="flex gap-1.5">
                  <button onclick="deployRobotDirectly(${idx})" class="flex-1 py-1 text-xs font-bold rounded bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-300">Deploy</button>
                  <button onclick="removeRobotFromStorage(${idx})" class="px-2 py-1 text-xs rounded bg-red-950/40 text-red-400 hover:bg-red-900/60">✕</button>
                </div>
              </div>
            </div>
          `;
        });

        if (botsGrid.children.length === 0) {
          botsGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 text-xs py-8">No reserve robots match your filter.</p>`;
        }
      }

      // 5. Render Weapons Panel (Heavy, Medium, Light Subtabs)
      const weapsGrid = document.getElementById('my-weapons-grid');
      if (weapsGrid) {
        weapsGrid.innerHTML = "";
        const search = (document.getElementById('weapon-storage-search')?.value || '').toLowerCase();

        const categories = (currentWeaponStorageSubTab === 'all') ? ['heavy', 'medium', 'light'] : [currentWeaponStorageSubTab];

        categories.forEach(cat => {
          (AppState.reserveWeapons[cat] || []).forEach(w => {
            if (search && !w.name.toLowerCase().includes(search)) return;
            weapsGrid.innerHTML += `
              <div class="glass-card p-3 rounded-xl flex justify-between items-center text-xs border-l-4 ${cat === 'heavy' ? 'border-amber-500' : cat === 'medium' ? 'border-sky-500' : 'border-emerald-500'}">
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="badge-${(w.tier || 'T4').toLowerCase()} text-[9px] font-black px-1.5 py-0.5 rounded">${cat.toUpperCase()}</span>
                    <strong class="text-white text-sm">${w.name}</strong>
                  </div>
                  <span class="text-gray-400 text-[11px] block mt-0.5">${w.level} • x${w.count} in Storage</span>
                </div>
                <div class="flex items-center gap-1">
                  <button onclick="inspectWeaponVariants('${w.id}')" class="text-amber-400 text-[11px] px-2 py-1 hover:underline font-bold">Variants</button>
                  <button onclick="deleteWeaponStorage('${cat}', '${w.id}', '${w.level}')" class="text-gray-500 hover:text-red-400 px-2 py-1">✕</button>
                </div>
              </div>
            `;
          });
        });

        if (weapsGrid.children.length === 0) {
          weapsGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 text-xs py-8">No reserve weapons match this subtab.</p>`;
        }
      }
    }
    window.renderPersonalStorage = renderPersonalStorage;

    // --- STORAGE REMOVAL & ADDITION HANDLERS ---
    window.removeTitanFromStorage = function(idx) {
      if (AppState.reserveTitans) {
        AppState.reserveTitans.splice(idx, 1);
        saveState();
        renderPersonalStorage();
      }
    };

    window.removeDroneFromStorage = function(idx) {
      if (AppState.reserveDrones) {
        AppState.reserveDrones.splice(idx, 1);
        saveState();
        renderPersonalStorage();
      }
    };

    window.removePilotFromStorage = function(idx) {
      if (AppState.reservePilots) {
        AppState.reservePilots.splice(idx, 1);
        saveState();
        renderPersonalStorage();
      }
    };

    window.removeMothershipFromStorage = function(idx) {
      if (AppState.reserveMotherships) {
        AppState.reserveMotherships.splice(idx, 1);
        saveState();
        renderPersonalStorage();
      }
    };

    window.addTitanToStorageDirect = function(titanId) {
      const master = MASTER_TITANS.find(t => t.id === titanId);
      if (!AppState.reserveTitans) AppState.reserveTitans = [];
      AppState.reserveTitans.push({ titanId: titanId, level: "Lv 1", tier: master ? master.tier : "T4" });
      saveState();
      renderPersonalStorage();
      alert(`Added Titan ${master ? master.name : titanId} (Lv 1) to your storage!`);
    };

    // --- SIBLING VARIANTS INSPECTOR (FOR REGULAR AND TITAN WEAPONS) ---
    window.inspectWeaponVariants = function(weaponId) {

      const weapon = MASTER_WEAPONS.find(w => w.id === weaponId);
      if (!weapon) return;

      const familyKey = weapon.family;
      const isTitan = weapon.size === "Alpha" || weapon.size === "Beta";
      const family = isTitan ? TITAN_WEAPON_FAMILIES[familyKey] : WEAPON_FAMILIES[familyKey];

      const modal = document.getElementById('variants-modal');
      const title = document.getElementById('variants-modal-title');
      const sub = document.getElementById('variants-modal-subtitle');
      const content = document.getElementById('variants-modal-content');

      title.innerHTML = `🔫 ${family ? family.name : weapon.name} — Sibling Variants`;
      sub.innerText = family ? family.desc : `${weapon.name} weapon specifications and damage analysis`;

      let variantsHtml = "";

      if (family) {
        const sizes = isTitan ? [
          { label: "Alpha Titan Hardpoint", key: "Alpha" },
          { label: "Beta Titan Hardpoint", key: "Beta" }
        ] : [
          { label: "Heavy Hardpoint", key: "Heavy" },
          { label: "Medium Hardpoint", key: "Medium" },
          { label: "Light Hardpoint", key: "Light" }
        ];

        variantsHtml += `<div class="grid grid-cols-1 md:grid-cols-${sizes.length} gap-4">`;

        sizes.forEach(s => {
          const wId = family[s.key];
          const wObj = wId ? MASTER_WEAPONS.find(w => w.id === wId) : null;

          if (wObj) {
            const isSelected = wObj.id === weapon.id;
            const badgeClass = isTitan ? (wObj.size === "Alpha" ? "badge-alpha" : "badge-beta") : `badge-${wObj.tier.toLowerCase()}`;
            variantsHtml += `
              <div class="p-4 rounded-xl border ${isSelected ? 'bg-amber-500/10 border-amber-500' : 'bg-[#080c14] border-[#263040]'} flex flex-col justify-between space-y-3">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] uppercase font-bold text-gray-400">${s.label}</span>
                    <span class="${badgeClass} text-[10px] font-black px-1.5 py-0.5 rounded">${isTitan ? `TITAN ${wObj.size}` : wObj.tier}</span>
                  </div>
                  <h4 class="text-lg font-black text-white mt-1">${wObj.name}</h4>
                  <span class="text-xs text-blue-400 font-mono">${wObj.range}m • ${wObj.type}</span>

                  <div class="mt-3 p-2 bg-[#111620] rounded-lg border border-[#263040] text-xs space-y-1">
                    <div class="flex justify-between text-gray-300">
                      <span>Burst DPS:</span>
                      <span class="font-bold text-red-400 font-mono">${wObj.burstDps.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between text-gray-300">
                      <span>Sustained:</span>
                      <span class="font-bold text-orange-400 font-mono">${wObj.sustainedDps.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between text-gray-300">
                      <span>Reload:</span>
                      <span class="font-bold text-gray-200 font-mono">${wObj.reload}s</span>
                    </div>
                  </div>
                </div>

                <button onclick="addWeaponToStorageDirect('${wObj.id}'); closeModal('variants-modal');" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-300 transition-all">
                  ➕ Add ${wObj.size} to Storage
                </button>
              </div>
            `;
          } else {
            variantsHtml += `
              <div class="p-4 rounded-xl border border-dashed border-[#263040] bg-[#080c14]/40 flex flex-col items-center justify-center text-center text-gray-500 text-xs">
                <span>No ${s.key} Variant</span>
              </div>
            `;
          }
        });

        variantsHtml += `</div>`;
      } else {
        const siblings = MASTER_WEAPONS.filter(w => w.family && w.family.toLowerCase() === (familyKey || '').toLowerCase());
        if (siblings.length > 1) {
          variantsHtml = `<div class="grid grid-cols-1 md:grid-cols-${Math.min(3, siblings.length)} gap-4">`;
          siblings.forEach(wObj => {
            const isSelected = wObj.id === weapon.id;
            const badgeClass = (wObj.size === 'Alpha' || wObj.size === 'Beta') ? (wObj.size === 'Alpha' ? 'badge-alpha' : 'badge-beta') : `badge-${wObj.tier.toLowerCase()}`;
            variantsHtml += `
              <div class="p-4 rounded-xl border ${isSelected ? 'bg-amber-500/10 border-amber-500' : 'bg-[#080c14] border-[#263040]'} flex flex-col justify-between space-y-3">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] uppercase font-bold text-gray-400">${wObj.size} Hardpoint</span>
                    <span class="${badgeClass} text-[10px] font-black px-1.5 py-0.5 rounded">${wObj.tier}</span>
                  </div>
                  <h4 class="text-lg font-black text-white mt-1">${wObj.name}</h4>
                  <span class="text-xs text-blue-400 font-mono">${wObj.range}m • ${wObj.type}</span>
                  <div class="mt-3 p-2 bg-[#111620] rounded-lg border border-[#263040] text-xs space-y-1">
                    <div class="flex justify-between text-gray-300">
                      <span>Burst DPS:</span>
                      <span class="font-bold text-red-400 font-mono">${wObj.burstDps.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between text-gray-300">
                      <span>Reload:</span>
                      <span class="font-bold text-gray-200 font-mono">${wObj.reload}s</span>
                    </div>
                  </div>
                </div>
                <button onclick="addWeaponToStorageDirect('${wObj.id}'); closeModal('variants-modal');" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-300 transition-all">
                  ➕ Add ${wObj.size} to Storage
                </button>
              </div>
            `;
          });
          variantsHtml += `</div>`;
        } else {
          variantsHtml = `
            <div class="p-4 bg-[#080c14] rounded-xl border border-[#263040] text-xs space-y-2">
              <h4 class="text-base font-bold text-white">${weapon.name} (${weapon.size})</h4>
              <p class="text-gray-300">${weapon.status}</p>
              <div class="flex justify-between text-gray-400 font-mono">
                <span>Range: ${weapon.range}m</span>
                <span>Burst: ${weapon.burstDps.toLocaleString()} DPS</span>
                <span>Reload: ${weapon.reload}s</span>
              </div>
            </div>
          `;
        }
      }

      content.innerHTML = variantsHtml;
      modal.classList.remove('hidden');
    };

    window.inspectRobotSeries = function(botId) {
      const bot = MASTER_ROBOTS.find(r => r.id === botId);
      if (!bot || !bot.seriesKey) return;

      const series = ROBOT_SERIES[bot.seriesKey];
      if (!series) return;

      const modal = document.getElementById('variants-modal');
      const title = document.getElementById('variants-modal-title');
      const sub = document.getElementById('variants-modal-subtitle');
      const content = document.getElementById('variants-modal-content');

      title.innerHTML = `🧬 ${series.name} — Series Siblings`;
      sub.innerText = series.desc;

      let html = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">`;

      series.bots.forEach(sBotId => {
        const bObj = MASTER_ROBOTS.find(r => r.id === sBotId);
        if (bObj) {
          const isSelected = bObj.id === bot.id;
          html += `
            <div class="p-4 rounded-xl border ${isSelected ? 'bg-purple-500/10 border-purple-500' : 'bg-[#080c14] border-[#263040]'} flex flex-col justify-between space-y-3">
              <div>
                <div class="flex items-center justify-between">
                  <span class="badge-${bObj.tier.toLowerCase()} text-[10px] font-black px-1.5 py-0.5 rounded">${bObj.tier}</span>
                  <span class="text-xs text-gray-400 font-mono">${bObj.speed} km/h</span>
                </div>
                <h4 class="text-base font-black text-white mt-1">${bObj.name}</h4>
                <p class="text-[11px] text-gray-400">${bObj.faction} • ${bObj.role}</p>

                <div class="mt-2.5 p-2 bg-[#111620] rounded-lg border border-[#263040] text-xs">
                  <span class="text-gray-500 block text-[9px] uppercase">Hardpoints:</span>
                  <span class="font-bold text-amber-400">${bObj.hardpoints.map(h => h.size).join(" + ")}</span>
                </div>
                <p class="text-[10px] text-gray-400 mt-2 leading-relaxed italic line-clamp-3">${bObj.ability}</p>
              </div>

              <button onclick="addBotToStorageDirect('${bObj.id}'); closeModal('variants-modal');" class="w-full py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] hover:bg-amber-500 hover:text-black text-amber-300 transition-all">
                ➕ Add to Storage
              </button>
            </div>
          `;
        }
      });

      html += `</div>`;
      content.innerHTML = html;
      modal.classList.remove('hidden');
    };
