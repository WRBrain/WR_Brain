const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const robots = fs.readdirSync(path.join(ROOT, 'data/robots')).map(f => JSON.parse(fs.readFileSync(path.join(ROOT, 'data/robots', f), 'utf8')));
const weapons = fs.readdirSync(path.join(ROOT, 'data/weapons')).map(f => JSON.parse(fs.readFileSync(path.join(ROOT, 'data/weapons', f), 'utf8')));
const titans = fs.readdirSync(path.join(ROOT, 'data/titans')).map(f => JSON.parse(fs.readFileSync(path.join(ROOT, 'data/titans', f), 'utf8')));

console.log(`Auditing ${robots.length} Robots:`);
robots.forEach(r => {
  if (!r.name || !r.tier || !r.role || !r.hp || !r.speed || !r.hardpoints) {
    console.warn(`⚠️ Robot ${r.id} missing core fields!`);
  }
});

console.log(`Auditing ${weapons.length} Weapons:`);
weapons.forEach(w => {
  if (!w.name || !w.size || !w.tier || !w.range || !w.burstDps || !w.sustainedDps) {
    console.warn(`⚠️ Weapon ${w.id} missing core fields!`);
  }
});

console.log(`Auditing ${titans.length} Titans:`);
titans.forEach(t => {
  if (!t.name || !t.tier || !t.hp || !t.speed || !t.hardpoints) {
    console.warn(`⚠️ Titan ${t.id} missing core fields!`);
  }
});

console.log("✅ All entities inspected.");
