/* WRBrain - UI Navigation & Filtering Tabs */

let activeWeaponSizeTab = "ALL";

    window.setWeaponSizeTab = function(size) {
      activeWeaponSizeTab = size;
      document.querySelectorAll('.wtab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'shadow');
        btn.classList.add('text-gray-400');
      });
      const activeBtn = document.getElementById(`wtab-${size}`);
      if (activeBtn) {
        activeBtn.classList.add('bg-amber-500', 'text-black', 'shadow');
        activeBtn.classList.remove('text-gray-400');
      }
      renderWeaponEncyclopedia();
    };

    let currentTitanSubView = "titans";
    window.toggleTitanView = function(view) {
      currentTitanSubView = view;
      const tGrid = document.getElementById('encyclopedia-titans-grid');
      const twGrid = document.getElementById('encyclopedia-titan-weapons-grid');
      const btnT = document.getElementById('tview-titans');
      const btnW = document.getElementById('tview-weapons');

      if (view === 'titans') {
        tGrid.classList.remove('hidden');
        twGrid.classList.add('hidden');
        btnT.className = "px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-black shadow";
        btnW.className = "px-3 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] text-gray-300 border border-[#263040]";
        renderTitanEncyclopedia();
      } else {
        tGrid.classList.add('hidden');
        twGrid.classList.remove('hidden');
        btnW.className = "px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-black shadow";
        btnT.className = "px-3 py-1.5 text-xs font-bold rounded-lg bg-[#161f2e] text-gray-300 border border-[#263040]";
        renderTitanWeaponsEncyclopedia();
      }
    };

    window.switchTab = function(tabId) {
      document.querySelectorAll('.view-panel').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'shadow');
        btn.classList.add('text-gray-400');
      });

      const target = document.getElementById(`view-${tabId}`);
      if (target) target.classList.remove('hidden');

      const btn = document.getElementById(`tab-${tabId}`);
      if (btn) {
        btn.classList.add('bg-amber-500', 'text-black', 'shadow');
        btn.classList.remove('text-gray-400');
      }

      if (tabId === 'home') renderHome();
      else if (tabId === 'analyzer') runAudit(currentAuditHangar);
      else if (tabId === 'dpslab') initDpsLab();
      else if (tabId === 'catalog_weapons') renderWeaponEncyclopedia();
      else if (tabId === 'catalog_bots') renderRobotEncyclopedia();
      else if (tabId === 'catalog_titans') toggleTitanView(currentTitanSubView);
      else if (tabId === 'storage') renderPersonalStorage();
    };

// --- PERSONAL ACCOUNT STORAGE STATE & HANDLERS ---
    let currentStorageMainTab = "robots";
    let currentTitanStorageSubTab = "all";
    let currentSupportStorageSubTab = "all";
    let currentRobotStorageFilter = "ALL";
    let currentWeaponStorageSubTab = "all";

    window.switchStorageMainTab = function(tabKey) {
      currentStorageMainTab = tabKey;
      document.querySelectorAll('.stab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'shadow');
        btn.classList.add('text-gray-400');
      });
      const activeBtn = document.getElementById(`stab-${tabKey}`);
      if (activeBtn) {
        activeBtn.classList.add('bg-amber-500', 'text-black', 'shadow');
        activeBtn.classList.remove('text-gray-400');
      }
      document.querySelectorAll('.storage-subview').forEach(el => el.classList.add('hidden'));
      const panel = document.getElementById(`storage-panel-${tabKey}`);
      if (panel) panel.classList.remove('hidden');
      renderPersonalStorage();
    };

    window.setTitanStorageSubTab = function(sub) {
      currentTitanStorageSubTab = sub;
      document.querySelectorAll('.tstab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'shadow');
        btn.classList.add('text-gray-400');
      });
      const activeBtn = document.getElementById(`tstab-${sub}`);
      if (activeBtn) {
        activeBtn.classList.add('bg-amber-500', 'text-black', 'shadow');
        activeBtn.classList.remove('text-gray-400');
      }
      renderPersonalStorage();
    };

    window.setSupportStorageSubTab = function(sub) {
      currentSupportStorageSubTab = sub;
      document.querySelectorAll('.sstab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'shadow');
        btn.classList.add('text-gray-400');
      });
      const activeBtn = document.getElementById(`sstab-${sub}`);
      if (activeBtn) {
        activeBtn.classList.add('bg-amber-500', 'text-black', 'shadow');
        activeBtn.classList.remove('text-gray-400');
      }
      renderPersonalStorage();
    };

    window.setRobotStorageFilter = function(tier) {
      currentRobotStorageFilter = tier;
      document.querySelectorAll('.rstab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'shadow');
        btn.classList.add('text-gray-400');
      });
      const activeBtn = document.getElementById(`rstab-${tier}`);
      if (activeBtn) {
        activeBtn.classList.add('bg-amber-500', 'text-black', 'shadow');
        activeBtn.classList.remove('text-gray-400');
      }
      renderPersonalStorage();
    };

    window.setWeaponStorageSubTab = function(sub) {
      currentWeaponStorageSubTab = sub;
      document.querySelectorAll('.wstab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'shadow');
        btn.classList.add('text-gray-400');
      });
      const activeBtn = document.getElementById(`wstab-${sub}`);
      if (activeBtn) {
        activeBtn.classList.add('bg-amber-500', 'text-black', 'shadow');
        activeBtn.classList.remove('text-gray-400');
      }
      renderPersonalStorage();
    };
