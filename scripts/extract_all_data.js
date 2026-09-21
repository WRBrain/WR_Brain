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

  // Read existing family definitions
  const existingWeaponsJs = fs.readFileSync(path.join(JS_DATA_DIR, 'weapons.js'), 'utf8');
  const existingTitansJs = fs.readFileSync(path.join(JS_DATA_DIR, 'titans.js'), 'utf8');

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

  console.log("✅ Successfully compiled all databases from individual entity files!");
}

if (require.main === module) {
  extractAllData();
}

module.exports = { extractAllData };
