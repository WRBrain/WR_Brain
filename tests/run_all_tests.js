/* =============================================================================
   WRBrain — MASTER UNIFIED TEST SUITE (ALL-IN-ONE)
   =============================================================================
   Runs full automated verification across:
   1. Master Data Catalogs (Robots, Weapons, Titans, Drones, Pilots, Motherships, Specs)
   2. Hangar State Auto-Healing & Hardpoint Geometry
   3. Weapon Equipping, Storage Transfers & Level Scaling
   4. Robot Bay Operations & Reserve Inventory
   5. WR 10.5.2+ Specialization Matrix & Path Switching
   6. Synergy Engine, Counter Matrix & Range Auditing
   7. State Persistence & Cloud Sync Hooks
   ============================================================================= */

// Universal runtime environment initializer (Bun, Node, or JSC)
if (typeof window === 'undefined') {
  globalThis.window = globalThis;
}

globalThis.localStorage = {
  _store: {},
  getItem: function(k) { return this._store[k] || null; },
  setItem: function(k, v) { this._store[k] = v; },
  removeItem: function(k) { delete this._store[k]; },
  clear: function() { this._store = {}; }
};

globalThis.document = {
  addEventListener: function() {},
  createElement: function(tag) {
    return {
      tagName: tag,
      innerHTML: '',
      innerText: '',
      className: '',
      classList: { remove: function() {}, add: function() {} },
      appendChild: function() {},
      querySelectorAll: function() { return []; }
    };
  },
  getElementById: function(id) {
    return {
      innerHTML: '',
      innerText: '',
      value: '',
      classList: {
        remove: function() {},
        add: function() {}
      },
      appendChild: function() {},
      querySelectorAll: function() { return []; }
    };
  },
  querySelectorAll: function() { return []; }
};

// Loader helper across Bun/Node require and JSC load
function loadProjectScript(relativePath) {
  const fs = require('fs');
  const path = require('path');
  const vm = require('vm');
  const fullPath = path.resolve(__dirname, '..', relativePath);
  const code = fs.readFileSync(fullPath, 'utf8');
  vm.runInThisContext(code, { filename: fullPath });
}

// -----------------------------------------------------------------------------
// LOAD SCRIPTS
// -----------------------------------------------------------------------------
const scriptList = [
  'js/data/robots.js',
  'js/data/weapons.js',
  'js/data/titans.js',
  'js/data/drones.js',
  'js/data/pilots.js',
  'js/data/motherships.js',
  'js/data/specializations.js',
  'js/engine/scaling.js',
  'js/engine/state.js',
  'js/engine/synergyAudit.js',
  'js/ui/modals.js',
  'js/ui/hangarRenderer.js'
];

scriptList.forEach(s => loadProjectScript(s));

// -----------------------------------------------------------------------------
// TEST RUNNER UTILITIES
// -----------------------------------------------------------------------------
let totalTests = 0;
let passedTests = 0;
let failedTests = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests.push({ testName, details });
    console.error(`  ❌ FAIL: ${testName} — ${details}`);
  }
}

console.log("\n========================================================");
console.log("🤖  WRBRAIN ALL-IN-ONE AUTOMATED TEST SUITE");
console.log("========================================================\n");

// =============================================================================
// SUITE 1: DATA INTEGRITY & CATALOG SCHEMAS
// =============================================================================
console.log("📦 SUITE 1: Master Catalog Schema & Integrity");

assert(Array.isArray(MASTER_ROBOTS) && MASTER_ROBOTS.length >= 50, 
  "MASTER_ROBOTS database loaded with 50+ combat chassis", `Count: ${MASTER_ROBOTS?.length}`);

assert(Array.isArray(MASTER_WEAPONS) && MASTER_WEAPONS.length >= 80, 
  "MASTER_WEAPONS database loaded with 80+ weapons", `Count: ${MASTER_WEAPONS?.length}`);

assert(Array.isArray(MASTER_TITANS) && MASTER_TITANS.length >= 10, 
  "MASTER_TITANS database loaded with 10+ flagship Titans", `Count: ${MASTER_TITANS?.length}`);

assert(Array.isArray(MASTER_DRONES) && MASTER_DRONES.length >= 10, 
  "MASTER_DRONES database loaded", `Count: ${MASTER_DRONES?.length}`);

assert(Array.isArray(MASTER_PILOTS) && MASTER_PILOTS.length >= 20, 
  "MASTER_PILOTS database loaded", `Count: ${MASTER_PILOTS?.length}`);

assert(Array.isArray(MASTER_MOTHERSHIPS) && MASTER_MOTHERSHIPS.length >= 5, 
  "MASTER_MOTHERSHIPS database loaded", `Count: ${MASTER_MOTHERSHIPS?.length}`);

assert(Array.isArray(ACTIVE_MODULES) && ACTIVE_MODULES.length === 9, 
  "ACTIVE_MODULES catalog contains 9 official combat modules", `Count: ${ACTIVE_MODULES?.length}`);

assert(BASIC_SPECIALIZATION && BASIC_SPECIALIZATION.isAlwaysActive === true, 
  "BASIC_SPECIALIZATION is defined as permanent base foundation");

assert(ADDITIONAL_SPECIALIZATION_PATHS && ADDITIONAL_SPECIALIZATION_PATHS.offense && ADDITIONAL_SPECIALIZATION_PATHS.defense && ADDITIONAL_SPECIALIZATION_PATHS.class_archetypes, 
  "ADDITIONAL_SPECIALIZATION_PATHS contains Offense, Defense, and Class archetypes");

// Nuo verification in Master Catalog
const nuoMaster = MASTER_ROBOTS.find(r => r.id === 'nuo');
assert(nuoMaster && nuoMaster.hardpoints.length === 3 && nuoMaster.hardpoints[0].size === 'Heavy' && nuoMaster.hardpoints[1].size === 'Medium' && nuoMaster.hardpoints[2].size === 'Medium',
  "Nuo hardpoint configuration matches official 1x Heavy + 2x Medium mounts");


// =============================================================================
// SUITE 2: HANGAR DECK STATE & GEOMETRY
// =============================================================================
console.log("\n🏢 SUITE 2: Hangar Deck State & Auto-Healing");

assert(AppState && AppState.hangars && Object.keys(AppState.hangars).length === 5,
  "All 5 Hangar decks (Hangar 1–5) are initialized and active");

let allHardpointsMatch = true;
let allSpecsInitialized = true;
let hardpointMismatchDetails = '';

Object.keys(AppState.hangars).forEach(hk => {
  const h = AppState.hangars[hk];
  h.slots.forEach((slot, sIdx) => {
    if (slot && slot.robotId) {
      const mb = MASTER_ROBOTS.find(r => r.id === slot.robotId);
      if (mb && mb.hardpoints) {
        if (!slot.weapons || slot.weapons.length !== mb.hardpoints.length) {
          allHardpointsMatch = false;
          hardpointMismatchDetails = `${hk} Slot ${sIdx+1} (${slot.robotId}) weapons count ${slot.weapons?.length} vs hardpoints ${mb.hardpoints.length}`;
        }
        (slot.weapons || []).forEach((w, wIdx) => {
          if (w && w.id && w.size !== mb.hardpoints[wIdx].size) {
            allHardpointsMatch = false;
            hardpointMismatchDetails = `${hk} Slot ${sIdx+1} (${slot.robotId}) mount #${wIdx+1} size ${w.size} vs hardpoint ${mb.hardpoints[wIdx].size}`;
          }
        });
      }
      if (!slot.specialization || !slot.specialization.activePath || !slot.specialization.activeModule) {
        allSpecsInitialized = false;
      }
    }
  });
});

assert(allHardpointsMatch, "Every combat slot across all 5 hangars strictly matches robot hardpoint mount sizes", hardpointMismatchDetails);
assert(allSpecsInitialized, "Every robot across all 5 hangars has valid WR 10.5.2+ Specialization data");


// =============================================================================
// SUITE 3: WEAPON EQUIPPING & ARMORY WORKFLOWS
// =============================================================================
console.log("\n🔫 SUITE 3: Weapon Equipping, Storage Transfers & Level Multipliers");

const testSlot = AppState.hangars.hangar1.slots[0]; // Nuo
const initialHeavy = testSlot.weapons[0].id;

// Test 3.1: Equip directly from Armory Catalog
window.openWeaponConfigModal('hangar1', 0, 0, false);
window.equipWeaponDirect('subduer', 'MK2 Lv1', false);
assert(testSlot.weapons[0].id === 'subduer' && testSlot.weapons[0].level === 'MK2 Lv1',
  "Equipped Subduer (Heavy) directly from Armory Catalog to Nuo heavy mount");

// Test 3.2: Equip to Medium Hardpoint
window.openWeaponConfigModal('hangar1', 0, 1, false);
window.equipWeaponDirect('hazard', 'MK3', false);
assert(testSlot.weapons[1].id === 'hazard' && testSlot.weapons[1].level === 'MK3',
  "Equipped Hazard (Medium) to Nuo medium mount #1");

// Test 3.3: Storage inventory roundtrip
AppState.reserveWeapons.heavy.push({ id: 'reaper', name: 'Reaper', tier: 'T4', level: 'Lv 1', count: 1 });
const prevCount = AppState.reserveWeapons.heavy.length;
window.openWeaponConfigModal('hangar1', 0, 0, false);
window.equipWeaponDirect('reaper', 'Lv 1', true);
assert(testSlot.weapons[0].id === 'reaper', "Equipped Reaper from reserve storage to Nuo");

// Test 3.4: Unequip weapon
window.unequipWeapon('hangar1', 0, 0);
assert(testSlot.weapons[0] === null, "Unequipped Reaper from Nuo slot (slot is now null/empty)");
const returnedToStorage = AppState.reserveWeapons.heavy.find(w => w.id === 'reaper');
assert(returnedToStorage && returnedToStorage.count >= 1, "Unequipped Reaper safely returned to Reserve Inventory");

// Restore Nuo original Heavy weapon
window.openWeaponConfigModal('hangar1', 0, 0, false);
window.equipWeaponDirect('ardent_hwangje', 'Lv 1', false);


// =============================================================================
// SUITE 4: SPECIALIZATION MATRIX & PATH SWITCHING (WR 10.5.2+)
// =============================================================================
console.log("\n💠 SUITE 4: Authentic WR 10.5.2+ Specializations Matrix");

// Test 4.1: Open Specialization Modal
window.openSpecializationModal('hangar1', 0);
assert(globalThis.activeSpecializationTarget && globalThis.activeSpecializationTarget.slotIndex === 0,
  "Specialization Modal opened with correct Bay target");

// Test 4.2: Select Active Module
window.selectActiveSpecialization('quantum_radar');
assert(globalThis.currentSpecWorkingState.activeModule === 'quantum_radar',
  "Selected 'Quantum Radar' as active combat module");

// Test 4.3: Switch Specialization Tree to Offense
window.selectSpecializationPath('offense');
assert(globalThis.currentSpecWorkingState.activePath === 'offense',
  "Switched active Specialization Path to 'Offense Specialization'");

// Test 4.4: Save and verify persistence
window.saveSpecializationConfig();
assert(testSlot.specialization.activePath === 'offense' && testSlot.specialization.activeModule === 'quantum_radar',
  "Saved and persisted Offense Path + Quantum Radar to AppState");

// Test 4.5: Class Specialization Matching
const classSpecNuo = getClassSpecializationForBot("Support / Energy Sniper");
assert(classSpecNuo && classSpecNuo.roleKey === 'support',
  "Role 'Support / Energy Sniper' correctly resolved to Support Class Specialization");

const classSpecFenrir = getClassSpecializationForBot("Brawler");
assert(classSpecFenrir && classSpecFenrir.roleKey === 'brawler',
  "Role 'Brawler' correctly resolved to Brawler Class Specialization");

const classSpecScorpion = getClassSpecializationForBot("Stealth Assassin");
assert(classSpecScorpion && classSpecScorpion.roleKey === 'assassin',
  "Role 'Stealth Assassin' correctly resolved to Assassin Class Specialization");

// Restore Nuo signature meta build (Support Class + Shieldbreaker)
window.openSpecializationModal('hangar1', 0);
window.selectActiveSpecialization('shieldbreaker');
window.selectSpecializationPath('class');
window.saveSpecializationConfig();
assert(testSlot.specialization.activePath === 'class' && testSlot.specialization.activeModule === 'shieldbreaker',
  "Nuo restored to signature Support Class Specialization + Shieldbreaker");


// =============================================================================
// SUITE 5: COMBAT SYNERGY ENGINE & COUNTER MATRIX
// =============================================================================
console.log("\n📊 SUITE 5: Team Synergy & Battle Rating Engine");

const h1Audit = calculateHangarSynergy(AppState.hangars.hangar1.slots, AppState.hangars.hangar1.titanSlot);
assert(h1Audit.synergyScore >= 50 && h1Audit.synergyScore <= 100,
  "Synergy score computed within valid competitive range (50–100%)", `Score: ${h1Audit.synergyScore}%`);

assert(h1Audit.totalBurstDPS > 100000,
  "Total Squad Burst DPS aggregated successfully", `Burst DPS: ${h1Audit.totalBurstDPS.toLocaleString()}`);

assert(h1Audit.totalCycleDPS > 50000,
  "Total Squad Cycle DPS aggregated successfully", `Cycle DPS: ${h1Audit.totalCycleDPS.toLocaleString()}`);

assert(h1Audit.counterMatrix.hasShieldbreaker === true,
  "Counter matrix detects Nuo's equipped Shieldbreaker active module");


// =============================================================================
// SUITE 6: PERSISTENCE & LOCALSTORAGE HOOKS
// =============================================================================
console.log("\n💾 SUITE 6: Persistence & Cloud Synchronization Hooks");

saveState();
const rawStorage = localStorage.getItem(typeof STORAGE_KEY !== 'undefined' ? STORAGE_KEY : "WRBRAIN_PERSIST_V6");
assert(rawStorage && rawStorage.length > 500,
  "AppState serialized and saved to localStorage successfully");

const parsed = JSON.parse(rawStorage);
assert(parsed.hangars && parsed.hangars.hangar1.slots[0].specialization.activeModule === 'shieldbreaker',
  "AppState deserialized with verified state fidelity");


// =============================================================================
// SUMMARY REPORT
// =============================================================================
console.log("\n========================================================");
console.log(`🏁  TEST RESULTS: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
if (failedTests.length === 0) {
  console.log("🎉  ALL TESTS PASSED WITH 100% SUCCESS!");
} else {
  console.error(`⚠️  ${failedTests.length} TEST(S) FAILED:`);
  failedTests.forEach(f => console.error(`  - ${f.testName}: ${f.details}`));
}
console.log("========================================================\n");

if (failedTests.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
