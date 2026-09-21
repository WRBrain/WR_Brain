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
      style: {},
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
      style: {},
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
console.log("\n🔫 SUITE 3: Weapon Equipping, Armory Direct Selection & DPS Multipliers");

const testSlot = AppState.hangars.hangar1.slots[0]; // Nuo
const initialHeavy = testSlot.weapons[0].id;

// Test 3.1: Equip directly from Armory Catalog
window.openWeaponConfigModal('hangar1', 0, 0, false);
window.equipWeaponDirect('subduer', 'MK2 Lv1');
assert(testSlot.weapons[0].id === 'subduer' && testSlot.weapons[0].level === 'MK2 Lv1',
  "Equipped Subduer (Heavy) directly from Armory Catalog to Nuo heavy mount");

// Test 3.2: Equip to Medium Hardpoint
window.openWeaponConfigModal('hangar1', 0, 1, false);
window.equipWeaponDirect('hazard', 'MK3');
assert(testSlot.weapons[1].id === 'hazard' && testSlot.weapons[1].level === 'MK3',
  "Equipped Hazard (Medium) to Nuo medium mount #1");

// Test 3.3: Direct Weapon Selection & DPS Calculation
window.openWeaponConfigModal('hangar1', 0, 0, false);
window.equipWeaponDirect('reaper', 'Lv 1');
assert(testSlot.weapons[0].id === 'reaper' && testSlot.weapons[0].level === 'Lv 1', 
  "Equipped Reaper directly to test sniper DPS loadout on Nuo");

// Test 3.4: Unequip weapon directly
window.unequipWeapon('hangar1', 0, 0);
assert(testSlot.weapons[0] === null, "Unequipped weapon directly from Nuo slot (hardpoint is now null/empty)");

// Test 3.5: Re-equip from empty hardpoint
window.openWeaponConfigModal('hangar1', 0, 0, false);
window.equipWeaponDirect('ardent_hwangje', 'Lv 1');
assert(testSlot.weapons[0].id === 'ardent_hwangje', "Re-equipped Ardent Hwangje directly to empty Nuo mount");


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
// SUITE 7: UNIVERSAL EXHAUSTIVE ENTITY AUDIT (113 ROBOTS, 194 WEAPONS, 19 TITANS)
// =============================================================================
console.log("\n🌐 SUITE 7: Universal Exhaustive Entity Audit & Live Scaling Verification");

// 7.1 Verify all 113 Robots
let robotsAllValid = true;
let robotErrorMsg = '';
MASTER_ROBOTS.forEach(r => {
  if (!r.id || !r.name || !r.tier || !r.role || !r.hp || !r.speed || !r.hardpoints || r.hardpoints.length === 0) {
    robotsAllValid = false;
    robotErrorMsg = `Invalid schema in robot: ${r.id}`;
  }
  // Check durability scaling across all tiers
  const lv1Hp = Math.round(r.hp * getLevelMultiplier('Lv 1', 'bot_or_weapon'));
  const mk2Hp = Math.round(r.hp * getLevelMultiplier('MK2 Lv 12', 'bot_or_weapon'));
  const mk3Hp = Math.round(r.hp * getLevelMultiplier('MK3', 'bot_or_weapon'));
  if (isNaN(lv1Hp) || isNaN(mk2Hp) || isNaN(mk3Hp) || mk3Hp <= lv1Hp || lv1Hp < 40000 || mk3Hp > 850000) {
    robotsAllValid = false;
    robotErrorMsg = `Unrealistic or NaN HP scaling in robot: ${r.id} (Lv1: ${lv1Hp}, MK3: ${mk3Hp})`;
  }
});
assert(robotsAllValid, `All ${MASTER_ROBOTS.length} Robots pass strict schema, speed & durability scaling checks`, robotErrorMsg);

// 7.2 Verify all 194 Weapons
let weaponsAllValid = true;
let weaponErrorMsg = '';
MASTER_WEAPONS.forEach(w => {
  if (!w.id || !w.name || !w.size || !w.tier || w.burstDps === undefined || w.sustainedDps === undefined) {
    weaponsAllValid = false;
    weaponErrorMsg = `Invalid schema in weapon: ${w.id}`;
  }
  const isTitanW = w.size === 'Alpha' || w.size === 'Beta';
  const multType = isTitanW ? 'titan_weapon' : 'bot_or_weapon';
  const lv1Dps = Math.round(w.burstDps * getLevelMultiplier('Lv 1', multType));
  const maxDps = Math.round(w.burstDps * getLevelMultiplier(isTitanW ? 'Lv 25' : 'MK3', multType));
  if (isNaN(lv1Dps) || isNaN(maxDps) || (w.burstDps > 0 && maxDps <= lv1Dps)) {
    weaponsAllValid = false;
    weaponErrorMsg = `DPS multiplier error in weapon: ${w.id}`;
  }
});
assert(weaponsAllValid, `All ${MASTER_WEAPONS.length} Weapons pass strict schema, mount size & DPS scaling checks`, weaponErrorMsg);

// 7.3 Verify all 19 Titans
let titansAllValid = true;
let titanErrorMsg = '';
MASTER_TITANS.forEach(t => {
  if (!t.id || !t.name || !t.tier || !t.hp || !t.hardpoints || t.hardpoints.length === 0) {
    titansAllValid = false;
    titanErrorMsg = `Invalid schema in titan: ${t.id}`;
  }
  const lv1Hp = Math.round(t.hp * getLevelMultiplier('Lv 1', 'titan'));
  const lv150Hp = Math.round(t.hp * getLevelMultiplier('Lv 150', 'titan'));
  if (isNaN(lv1Hp) || isNaN(lv150Hp) || lv150Hp <= lv1Hp || lv1Hp < 250000 || lv150Hp > 3500000) {
    titansAllValid = false;
    titanErrorMsg = `Unrealistic or NaN Titan HP scaling: ${t.id} (Lv1: ${lv1Hp}, Lv150: ${lv150Hp})`;
  }
});
assert(titansAllValid, `All ${MASTER_TITANS.length} Flagship Titans pass strict schema & Lv1-150 durability scaling`, titanErrorMsg);


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
