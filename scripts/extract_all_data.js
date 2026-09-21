/* WRBrain - Data Extraction & Database Compiler Pipeline
   Reads individual JSON entity files from data/robots/, data/weapons/, data/titans/
   and compiles the master database files in js/data/.
*/

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ROBOTS_DIR = path.join(ROOT_DIR, 'data', 'robots');
const WEAPONS_DIR = path.join(ROOT_DIR, 'data', 'weapons');
const TITANS_DIR = path.join(ROOT_DIR, 'data', 'titans');
const JS_DATA_DIR = path.join(ROOT_DIR, 'js', 'data');

function extractAllData() {
  console.log("🔄 Starting WRBrain data extraction pipeline...");

  // 1. Extract Robots
  const robotFiles = fs.readdirSync(ROBOTS_DIR).filter(f => f.endsWith('.json'));
  const robots = robotFiles.map(f => {
    const raw = fs.readFileSync(path.join(ROBOTS_DIR, f), 'utf8');
    return JSON.parse(raw);
  });
  console.log(`📦 Extracted ${robots.length} Robots from individual JSON files.`);

  // 2. Extract Weapons
  const weaponFiles = fs.readdirSync(WEAPONS_DIR).filter(f => f.endsWith('.json'));
  const weapons = weaponFiles.map(f => {
    const raw = fs.readFileSync(path.join(WEAPONS_DIR, f), 'utf8');
    return JSON.parse(raw);
  });
  console.log(`⚔️ Extracted ${weapons.length} Weapons from individual JSON files.`);

  // 3. Extract Titans
  const titanFiles = fs.readdirSync(TITANS_DIR).filter(f => f.endsWith('.json'));
  const titans = titanFiles.map(f => {
    const raw = fs.readFileSync(path.join(TITANS_DIR, f), 'utf8');
    return JSON.parse(raw);
  });
  console.log(`👑 Extracted ${titans.length} Titans from individual JSON files.`);

  // 4. Extract Pilots
  const PILOTS_DIR = path.join(ROOT_DIR, 'data', 'pilots');
  const pilotFiles = fs.existsSync(PILOTS_DIR) ? fs.readdirSync(PILOTS_DIR).filter(f => f.endsWith('.json')) : [];
  const pilots = pilotFiles.map(f => {
    const raw = fs.readFileSync(path.join(PILOTS_DIR, f), 'utf8');
    return JSON.parse(raw);
  });
  console.log(`🧑‍✈️ Extracted ${pilots.length} Pilots from individual JSON files.`);

  // Read existing family and skill definitions
  const existingWeaponsJs = fs.readFileSync(path.join(JS_DATA_DIR, 'weapons.js'), 'utf8');
  const existingTitansJs = fs.readFileSync(path.join(JS_DATA_DIR, 'titans.js'), 'utf8');
  const existingPilotsJs = fs.readFileSync(path.join(JS_DATA_DIR, 'pilots.js'), 'utf8');

  // Canonical Master Pilot Skills Definition
  const CANONICAL_PILOT_SKILLS = [
    // --- 🛡️ Durability & Repair (defense) ---
    { id: "armor_expert", name: "Armor Expert", category: "defense", icon: "🛡️", desc: "Increases robot maximum hull durability.", tiers: { T1: { val: "+5% HP", bonus: 5 }, T2: { val: "+8% HP", bonus: 8 }, T3: { val: "+11.5% HP", bonus: 11.5 }, T4: { val: "+15% HP", bonus: 15 } } },
    { id: "tough_guy", name: "Tough Guy", category: "defense", icon: "🛡️", desc: "Increases durability with minor weapon damage penalty.", tiers: { T1: { val: "+6.5% HP (-5% Dmg)", bonus: 6.5 }, T2: { val: "+10.5% HP (-5% Dmg)", bonus: 10.5 }, T3: { val: "+14.5% HP (-5% Dmg)", bonus: 14.5 }, T4: { val: "+18.75% HP (-5% Dmg)", bonus: 18.75 } } },
    { id: "mechanic", name: "Mechanic", category: "defense", icon: "🔧", desc: "Passively repairs durability over time.", tiers: { T1: { val: "+0.25% HP/s", bonus: 0.25 }, T2: { val: "+0.4% HP/s", bonus: 0.4 }, T3: { val: "+0.55% HP/s", bonus: 0.55 }, T4: { val: "+0.7% HP/s", bonus: 0.7 } } },
    { id: "cautious_pilot", name: "Cautious Pilot", category: "defense", icon: "🛡️", desc: "Increases durability with minor speed reduction.", tiers: { T1: { val: "+4% HP (-5% Spd)", bonus: 4 }, T2: { val: "+7% HP (-5% Spd)", bonus: 7 }, T3: { val: "+9.5% HP (-5% Spd)", bonus: 9.5 }, T4: { val: "+12.5% HP (-5% Spd)", bonus: 12.5 } } },
    { id: "stubborn_warrior", name: "Stubborn Warrior", category: "defense", icon: "🛡️", desc: "Grants bonus Defense Points when below 30% HP.", tiers: { T1: { val: "+15 DP @ <30% HP", bonus: 15 }, T2: { val: "+22 DP @ <30% HP", bonus: 22 }, T3: { val: "+30 DP @ <30% HP", bonus: 30 }, T4: { val: "+37.5 DP @ <30% HP", bonus: 37.5 } } },
    { id: "invulnerable_raider", name: "Invulnerable Raider", category: "defense", icon: "🛡️", desc: "Grants bonus Defense Points for 30s upon capturing a beacon.", tiers: { T1: { val: "+10 DP for 30s", bonus: 10 }, T2: { val: "+15 DP for 30s", bonus: 15 }, T3: { val: "+20 DP for 30s", bonus: 20 }, T4: { val: "+25 DP for 30s", bonus: 25 } } },
    { id: "adamant_guardian", name: "Adamant Guardian", category: "defense", icon: "🛡️", desc: "Grants bonus Defense Points when enemy holds 3+ beacons.", tiers: { T1: { val: "+10 DP (3+ Beacons)", bonus: 10 }, T2: { val: "+15 DP (3+ Beacons)", bonus: 15 }, T3: { val: "+20 DP (3+ Beacons)", bonus: 20 }, T4: { val: "+25 DP (3+ Beacons)", bonus: 25 } } },
    { id: "adamant_mechanic", name: "Adamant Mechanic", category: "defense", icon: "🔧", desc: "Increases passive repair rate when enemy holds 3+ beacons.", tiers: { T1: { val: "+0.5% HP/s (3+ Beacons)", bonus: 0.5 }, T2: { val: "+0.8% HP/s (3+ Beacons)", bonus: 0.8 }, T3: { val: "+1.1% HP/s (3+ Beacons)", bonus: 1.1 }, T4: { val: "+1.5% HP/s (3+ Beacons)", bonus: 1.5 } } },
    { id: "true_ace", name: "True Ace", category: "defense", icon: "💚", desc: "Increases healing beam and ability repair potency.", tiers: { T1: { val: "+5% Healing", bonus: 5 }, T2: { val: "+8% Healing", bonus: 8 }, T3: { val: "+11.5% Healing", bonus: 11.5 }, T4: { val: "+15% Healing", bonus: 15 } } },
    { id: "wonderworker", name: "Wonderworker", category: "defense", icon: "💚", desc: "Restores durability upon activating robot ability.", tiers: { T1: { val: "Repair +2.5% HP", bonus: 2.5 }, T2: { val: "Repair +4.0% HP", bonus: 4.0 }, T3: { val: "Repair +5.5% HP", bonus: 5.5 }, T4: { val: "Repair +7.5% HP", bonus: 7.5 } } },
    { id: "traditionalist", name: "Traditionalist", category: "defense", icon: "🛡️", desc: "Massively boosts durability at the expense of active ability.", tiers: { T1: { val: "+20% Durability", bonus: 20 }, T2: { val: "+35% Durability", bonus: 35 }, T3: { val: "+50% Durability", bonus: 50 }, T4: { val: "+62.5% Durability", bonus: 62.5 } } },

    // --- ⚔️ Weapon Damage & Accuracy (damage) ---
    { id: "master_gunsmith", name: "Master Gunsmith", category: "damage", icon: "⚔️", desc: "Increases weapon damage across all hardpoints.", tiers: { T1: { val: "+1.5% Damage", bonus: 1.5 }, T2: { val: "+2.5% Damage", bonus: 2.5 }, T3: { val: "+3.75% Damage", bonus: 3.75 }, T4: { val: "+5% Damage", bonus: 5 } } },
    { id: "thrill_seeker", name: "Thrill Seeker", category: "damage", icon: "⚔️", desc: "Increases weapon damage with minor durability penalty.", tiers: { T1: { val: "+4% Dmg (-5% HP)", bonus: 4 }, T2: { val: "+7% Dmg (-5% HP)", bonus: 7 }, T3: { val: "+9.5% Dmg (-5% HP)", bonus: 9.5 }, T4: { val: "+12.5% Dmg (-5% HP)", bonus: 12.5 } } },
    { id: "destroyer", name: "Destroyer", category: "damage", icon: "💥", desc: "Boosts damage of robot's built-in weapon system.", tiers: { T1: { val: "+4% Built-in Dmg", bonus: 4 }, T2: { val: "+7% Built-in Dmg", bonus: 7 }, T3: { val: "+9.5% Built-in Dmg", bonus: 9.5 }, T4: { val: "+12.5% Built-in Dmg", bonus: 12.5 } } },
    { id: "speed_shooter", name: "Speed Shooter", category: "damage", icon: "⚡", desc: "Reduces acceleration time for kinetic Gatling weapons.", tiers: { T1: { val: "-10% Accel Time", bonus: 10 }, T2: { val: "-18% Accel Time", bonus: 18 }, T3: { val: "-24% Accel Time", bonus: 24 }, T4: { val: "-30% Accel Time", bonus: 30 } } },
    { id: "sharpshooter", name: "Sharpshooter", category: "damage", icon: "🎯", desc: "Tightens shot spread on kinetic and energy weapons.", tiers: { T1: { val: "+10% Grouping", bonus: 10 }, T2: { val: "+15% Grouping", bonus: 15 }, T3: { val: "+22% Grouping", bonus: 22 }, T4: { val: "+30% Grouping", bonus: 30 } } },
    { id: "adamant_gunsmith", name: "Adamant Gunsmith", category: "damage", icon: "⚔️", desc: "Increases weapon damage when enemy holds 3+ beacons.", tiers: { T1: { val: "+7% Dmg (3+ Beacons)", bonus: 7 }, T2: { val: "+11% Dmg (3+ Beacons)", bonus: 11 }, T3: { val: "+15% Dmg (3+ Beacons)", bonus: 15 }, T4: { val: "+20% Dmg (3+ Beacons)", bonus: 20 } } },
    { id: "guidance_operator", name: "Guidance Operator", category: "damage", icon: "🎯", desc: "Drastically reduces target lock-on acquisition time.", tiers: { T1: { val: "-25% Lock Delay", bonus: 25 }, T2: { val: "-45% Lock Delay", bonus: 45 }, T3: { val: "-60% Lock Delay", bonus: 60 }, T4: { val: "-75% Lock Delay", bonus: 75 } } },
    { id: "daredevil", name: "Daredevil", category: "damage", icon: "⚔️", desc: "Significantly increases weapon damage, ability deactivated.", tiers: { T1: { val: "+6% Dmg", bonus: 6 }, T2: { val: "+10% Dmg", bonus: 10 }, T3: { val: "+14% Dmg", bonus: 14 }, T4: { val: "+18.75% Dmg", bonus: 18.75 } } },
    { id: "survivor", name: "Survivor", category: "damage", icon: "⚔️", desc: "Increases weapon damage when below 50% durability.", tiers: { T1: { val: "+3% Dmg @ <50% HP", bonus: 3 }, T2: { val: "+5.5% Dmg @ <50% HP", bonus: 5.5 }, T3: { val: "+7.5% Dmg @ <50% HP", bonus: 7.5 }, T4: { val: "+10% Dmg @ <50% HP", bonus: 10 } } },

    // --- 🏃 Speed & Mobility (speed) ---
    { id: "road_hog", name: "Road Hog", category: "speed", icon: "🏃", desc: "Increases baseline robot movement speed.", tiers: { T1: { val: "+3.5% Speed", bonus: 3.5 }, T2: { val: "+5.5% Speed", bonus: 5.5 }, T3: { val: "+7.5% Speed", bonus: 7.5 }, T4: { val: "+10% Speed", bonus: 10 } } },
    { id: "spy", name: "Spy", category: "speed", icon: "🏃", desc: "Increases movement speed with minor weapon damage penalty.", tiers: { T1: { val: "+2.5% Spd (-2.5% Dmg)", bonus: 2.5 }, T2: { val: "+4.5% Spd (-2.5% Dmg)", bonus: 4.5 }, T3: { val: "+6% Spd (-2.5% Dmg)", bonus: 6 }, T4: { val: "+7.5% Spd (-2.5% Dmg)", bonus: 7.5 } } },
    { id: "adamant_road_hog", name: "Adamant Road Hog", category: "speed", icon: "🏃", desc: "Massively boosts speed when enemy holds 3+ beacons.", tiers: { T1: { val: "+7% Spd (3+ Beacons)", bonus: 7 }, T2: { val: "+11% Spd (3+ Beacons)", bonus: 11 }, T3: { val: "+15% Spd (3+ Beacons)", bonus: 15 }, T4: { val: "+20% Spd (3+ Beacons)", bonus: 20 } } },
    { id: "ghost", name: "Ghost", category: "speed", icon: "⚡", desc: "Gives immense continuous speed boost, ability disabled.", tiers: { T1: { val: "+25% Speed", bonus: 25 }, T2: { val: "+40% Speed", bonus: 40 }, T3: { val: "+55% Speed", bonus: 55 }, T4: { val: "+68.75% Speed", bonus: 68.75 } } },
    { id: "scout", name: "Scout", category: "speed", icon: "🏃", desc: "Increases speed with minor durability reduction.", tiers: { T1: { val: "+2.5% Spd (-5% HP)", bonus: 2.5 }, T2: { val: "+4% Spd (-5% HP)", bonus: 4 }, T3: { val: "+5.5% Spd (-5% HP)", bonus: 5.5 }, T4: { val: "+7.5% Spd (-5% HP)", bonus: 7.5 } } },

    // --- 🔮 Energy & Physical Shield (shield) ---
    { id: "energy_shield_expert", name: "Energy Shield Expert", category: "shield", icon: "🔮", desc: "Increases Aegis and Absorber energy shield capacity.", tiers: { T1: { val: "+7% Shield HP", bonus: 7 }, T2: { val: "+11% Shield HP", bonus: 11 }, T3: { val: "+15% Shield HP", bonus: 15 }, T4: { val: "+20% Shield HP", bonus: 20 } } },
    { id: "crazy_electrician", name: "Crazy Electrician", category: "shield", icon: "⚡", desc: "Accelerates shield field regeneration cycle.", tiers: { T1: { val: "+9% Recharge Rate", bonus: 9 }, T2: { val: "+14% Recharge Rate", bonus: 14 }, T3: { val: "+19% Recharge Rate", bonus: 19 }, T4: { val: "+25% Recharge Rate", bonus: 25 } } },
    { id: "physical_shield_expert", name: "Physical Shield Expert", category: "shield", icon: "🛡️", desc: "Increases durability of physical armor shields.", tiers: { T1: { val: "+8% Shield HP", bonus: 8 }, T2: { val: "+13% Shield HP", bonus: 13 }, T3: { val: "+18% Shield HP", bonus: 18 }, T4: { val: "+25% Shield HP", bonus: 25 } } },
    { id: "knight_errant", name: "Knight Errant", category: "shield", icon: "🛡️", desc: "Strengthens built-in knight physical shielding.", tiers: { T1: { val: "+8% Shield HP", bonus: 8 }, T2: { val: "+14% Shield HP", bonus: 14 }, T3: { val: "+19% Shield HP", bonus: 19 }, T4: { val: "+25% Shield HP", bonus: 25 } } },

    // --- ⏱️ Modules & Utility (utility) ---
    { id: "dodger", name: "Dodger", category: "utility", icon: "⏱️", desc: "Reduces reload delay on active combat modules.", tiers: { T1: { val: "-8% Cooldown", bonus: 8 }, T2: { val: "-14% Cooldown", bonus: 14 }, T3: { val: "-19% Cooldown", bonus: 19 }, T4: { val: "-25% Cooldown", bonus: 25 } } },
    { id: "modules_expert", name: "Modules Expert", category: "utility", icon: "⏱️", desc: "Increases duration of active module effects.", tiers: { T1: { val: "+8% Duration", bonus: 8 }, T2: { val: "+14% Duration", bonus: 14 }, T3: { val: "+19% Duration", bonus: 19 }, T4: { val: "+25% Duration", bonus: 25 } } },
    { id: "deft_survivor", name: "Deft Survivor", category: "utility", icon: "⚡", desc: "Instantly recharges active ability upon crossing 50% HP.", tiers: { T1: { val: "Reset Ability @ 50% HP", bonus: 50 }, T2: { val: "Reset Ability @ 50% HP", bonus: 50 }, T3: { val: "Reset Ability @ 50% HP", bonus: 50 }, T4: { val: "Reset Ability @ 50% HP", bonus: 50 } } },
    { id: "clever_survivor", name: "Clever Survivor", category: "utility", icon: "⚡", desc: "Instantly restores 1 dash charge upon crossing 50% HP.", tiers: { T1: { val: "+1 Dash @ 50% HP", bonus: 50 }, T2: { val: "+1 Dash @ 50% HP", bonus: 50 }, T3: { val: "+1 Dash @ 50% HP", bonus: 50 }, T4: { val: "+1 Dash @ 50% HP", bonus: 50 } } },
    { id: "foolhardy_quartermaster", name: "Foolhardy Quartermaster", category: "utility", icon: "🔋", desc: "Instantly recharges active module upon crossing 50% HP.", tiers: { T1: { val: "Reset Module @ 50% HP", bonus: 50 }, T2: { val: "Reset Module @ 50% HP", bonus: 50 }, T3: { val: "Reset Module @ 50% HP", bonus: 50 }, T4: { val: "Reset Module @ 50% HP", bonus: 50 } } },
    { id: "quartermaster", name: "Quartermaster", category: "utility", icon: "🔋", desc: "Reduces power cell consumption for active modules.", tiers: { T1: { val: "-5% PC Cost", bonus: 5 }, T2: { val: "-10% PC Cost", bonus: 10 }, T3: { val: "-15% PC Cost", bonus: 15 }, T4: { val: "-20% PC Cost", bonus: 20 } } },

    // --- 👑 Titan Specialty Skills (titan) ---
    { id: "titan_armor_expert", name: "Titan Armor Expert", category: "defense", icon: "👑", desc: "Increases Titan maximum structural durability.", tiers: { T1: { val: "+7% Titan HP", bonus: 7 }, T2: { val: "+11% Titan HP", bonus: 11 }, T3: { val: "+15% Titan HP", bonus: 15 }, T4: { val: "+20% Titan HP", bonus: 20 } } },
    { id: "titan_accelerator", name: "Titan Accelerator", category: "speed", icon: "👑", desc: "Boosts baseline locomotive acceleration on Titans.", tiers: { T1: { val: "+4% Titan Speed", bonus: 4 }, T2: { val: "+7% Titan Speed", bonus: 7 }, T3: { val: "+9.5% Titan Speed", bonus: 9.5 }, T4: { val: "+12% Titan Speed", bonus: 12 } } },
    { id: "titan_mechanic", name: "Titan Mechanic", category: "defense", icon: "👑", desc: "Continuous passive nanite hull repair for Titans.", tiers: { T1: { val: "+0.25% Titan HP/s", bonus: 0.25 }, T2: { val: "+0.45% Titan HP/s", bonus: 0.45 }, T3: { val: "+0.65% Titan HP/s", bonus: 0.65 }, T4: { val: "+0.85% Titan HP/s", bonus: 0.85 } } },
    { id: "titan_furious", name: "Titan Furious", category: "damage", icon: "👑", desc: "Increases Titan weapon damage when below 50% durability.", tiers: { T1: { val: "+5% Dmg @ <50% HP", bonus: 5 }, T2: { val: "+8% Dmg @ <50% HP", bonus: 8 }, T3: { val: "+11.5% Dmg @ <50% HP", bonus: 11.5 }, T4: { val: "+15% Dmg @ <50% HP", bonus: 15 } } },
    { id: "titan_raider", name: "Titan Raider", category: "defense", icon: "👑", desc: "Grants Titan defense points after capturing a beacon.", tiers: { T1: { val: "+7 Titan DP", bonus: 7 }, T2: { val: "+11 Titan DP", bonus: 11 }, T3: { val: "+15 Titan DP", bonus: 15 }, T4: { val: "+20 Titan DP", bonus: 20 } } },
    { id: "titan_tough_guy", name: "Titan Tough Guy", category: "defense", icon: "👑", desc: "Heavily strengthens Titan hull with minor weapon penalty.", tiers: { T1: { val: "+8% HP (-10% Dmg)", bonus: 8 }, T2: { val: "+14% HP (-10% Dmg)", bonus: 14 }, T3: { val: "+19% HP (-10% Dmg)", bonus: 19 }, T4: { val: "+25% HP (-10% Dmg)", bonus: 25 } } },
    { id: "titan_destroyer", name: "Titan Destroyer", category: "damage", icon: "👑", desc: "Supercharges built-in Titan ability weapon output.", tiers: { T1: { val: "+5% Titan Ability Dmg", bonus: 5 }, T2: { val: "+8% Titan Ability Dmg", bonus: 8 }, T3: { val: "+11.5% Titan Ability Dmg", bonus: 11.5 }, T4: { val: "+15% Titan Ability Dmg", bonus: 15 } } }
  ];

  const weaponFamMatch = existingWeaponsJs.match(/const WEAPON_FAMILIES = (\{[\s\S]*?\n\};)/);
  const titanFamMatch = existingTitansJs.match(/const TITAN_WEAPON_FAMILIES = (\{[\s\S]*?\n\};)/);
  const weaponFamiliesStr = weaponFamMatch ? weaponFamMatch[1] : '{}';
  const titanFamiliesStr = titanFamMatch ? titanFamMatch[1] : '{}';

  // Compile js/data/robots.js
  const robotsJsContent = `/* WRBrain - Master Robots Database (Auto-compiled from data/robots/) */\n\nconst MASTER_ROBOTS = ${JSON.stringify(robots, null, 2)};\n`;
  fs.writeFileSync(path.join(JS_DATA_DIR, 'robots.js'), robotsJsContent, 'utf8');

  // Compile js/data/weapons.js
  const weaponsJsContent = `/* WRBrain - Master Weapons Database (Auto-compiled from data/weapons/) */\n\nconst WEAPON_FAMILIES = ${weaponFamiliesStr}\n\nconst MASTER_WEAPONS = ${JSON.stringify(weapons, null, 2)};\n`;
  fs.writeFileSync(path.join(JS_DATA_DIR, 'weapons.js'), weaponsJsContent, 'utf8');

  // Compile js/data/titans.js
  const titansJsContent = `/* WRBrain - Master Titans Database (Auto-compiled from data/titans/) */\n\nconst TITAN_WEAPON_FAMILIES = ${titanFamiliesStr}\n\nconst MASTER_TITANS = ${JSON.stringify(titans, null, 2)};\n`;
  fs.writeFileSync(path.join(JS_DATA_DIR, 'titans.js'), titansJsContent, 'utf8');

  // Compile js/data/pilots.js
  const pilotsJsContent = `/* WRBrain - Master Pilots & Skills Database (Auto-compiled from data/pilots/) */\n\nconst MASTER_PILOTS = ${JSON.stringify(pilots, null, 2)};\n\nconst MASTER_PILOT_SKILLS = ${JSON.stringify(CANONICAL_PILOT_SKILLS, null, 2)};\n\nfunction getDefaultPilotSkills(role) {\n  const defaultMap = {\n    "Brawler": ["armor_expert", "road_hog", "mechanic", "tough_guy", "master_gunsmith", "deft_survivor", "dodger"],\n    "Assassin": ["road_hog", "master_gunsmith", "deft_survivor", "destroyer", "armor_expert", "mechanic", "speed_shooter"],\n    "Support": ["armor_expert", "true_ace", "mechanic", "road_hog", "dodger", "wonderworker", "energy_shield_expert"],\n    "Sniper": ["master_gunsmith", "sharpshooter", "speed_shooter", "armor_expert", "mechanic", "road_hog", "destroyer"],\n    "Tank": ["armor_expert", "tough_guy", "mechanic", "energy_shield_expert", "crazy_electrician", "dodger", "road_hog"]\n  };\n  const skillIds = defaultMap[role] || defaultMap["Brawler"];\n  return skillIds.map(id => ({ id, tier: "T4" }));\n}\n\nif (typeof window !== 'undefined') window.getDefaultPilotSkills = getDefaultPilotSkills;\nif (typeof globalThis !== 'undefined') globalThis.getDefaultPilotSkills = getDefaultPilotSkills;\n`;
  fs.writeFileSync(path.join(JS_DATA_DIR, 'pilots.js'), pilotsJsContent, 'utf8');

  console.log("✅ Successfully compiled all databases from individual entity files!");
}

if (require.main === module) {
  extractAllData();
}

module.exports = { extractAllData };
