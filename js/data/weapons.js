/* WRBrain - Master Weapons Database & Sibling Families */

const WEAPON_FAMILIES = {
  "Acoustic / Echo": {
    name: "Acoustic / Echo (Screamer, Reglar, Howler)",
    desc: "High-frequency acoustic shockwaves delivering high burst DPS that penetrates defensive systems at 350m.",
    Heavy: "screamer",
    Medium: "reglar",
    Light: "howler"
  },
  "Electricity / Zap": {
    name: "Electricity / Zap (Fengbao, Leana, Shifang)",
    desc: "Short-range 100m high-voltage electric arcs melting brawlers in seconds.",
    Heavy: "fengbao",
    Medium: "leana",
    Light: "shifang"
  },
  "Blast Sniper": {
    name: "Blast Sniper (Morana & Chione)",
    desc: "Precision 600m kinetic rifles applying blast charge buildup that detonates massive AOE explosions.",
    Medium: "morana",
    Light: "chione"
  },
  "Life-Drain Musketeer": {
    name: "Life-Drain Musketeer (Athos, Porthos, Aramis)",
    desc: "Kinetic siphon weaponry converting dealt damage into continuous robot hull repair at 350m.",
    Heavy: "athos",
    Medium: "porthos",
    Light: "aramis"
  },
  "Desert Siphon": {
    name: "Desert Siphon (Kroko & Hippo)",
    desc: "Heavy kinetic siphon weaponry designed for extreme desert skirmishes with direct hull restoration at 350m.",
    Heavy: "kroko",
    Medium: "hippo"
  },
  "Void Energy": {
    name: "Void Energy (Murix, Elox, Velos)",
    desc: "600m high-density void particle cannons piercing physical shields and converting absorbed damage into blast charge.",
    Heavy: "murix",
    Medium: "elox",
    Light: "velos"
  },
  "Roman Kinetic": {
    name: "Roman Kinetic (Pilum & Gladius)",
    desc: "500m precision armor-penetrating ballistic harpoons causing extreme kinetic impact damage.",
    Medium: "pilum",
    Light: "gladius"
  },
  "Kinetic Blade": {
    name: "Kinetic Blade (Basileus & Machaira)",
    desc: "250m hyper-accelerated flechette shotguns shredding Aegis domes with bonus critical damage.",
    Medium: "basileus",
    Light: "machaira"
  },
  "Thermal Cryo": {
    name: "Thermal Cryo (Fahrenheit, Celsius, Steel Hedjet)",
    desc: "500m thermal-cryogenic hybrid beams inducing thermal shock and defense vulnerability.",
    Heavy: "fahrenheit",
    Medium: "celsius",
    Light: "steel_hedjet"
  },
  "Sub-Zero Cryo Energy": {
    name: "Sub-Zero Cryo Energy (Kelvin, Celsius, Voonith)",
    desc: "500m cryogenic particle beams freezing targets and amplifying incoming damage by +20%.",
    Heavy: "kelvin",
    Medium: "celsius",
    Light: "voonith"
  },
  "Plasma Blaster": {
    name: "Plasma Blaster (Kirin, Urhag, Shatank)",
    desc: "500m concentrated plasma blasters firing piercing energy spheres through forcefields.",
    Heavy: "kirin",
    Medium: "urhag",
    Light: "shatank"
  },
  "Guided Artillery": {
    name: "Guided Artillery (Dune, Uragan, Dunamis)",
    desc: "800m indirect-trajectory guided missile artillery launching over high cover barriers.",
    Heavy: "dune",
    Medium: "uragan",
    Light: "dunamis"
  },
  "Rust & Anti-Heal": {
    name: "Rust & Anti-Heal (Subduer, Damper, Tamer)",
    desc: "500m corrosive rotary weapons applying Rust debuffs that halt opponent healing and degrade durability.",
    Heavy: "subduer",
    Medium: "damper",
    Light: "tamer"
  },
  "Radiation": {
    name: "Radiation (Decay, Hazard, Blight)",
    desc: "600m radiation cannons firing 3-round bursts with damage scaling per consecutive hit.",
    Heavy: "decay",
    Medium: "hazard",
    Light: "blight"
  },
  "Sonic Shotguns": {
    name: "Sonic Shotguns (Devastator, Havoc, Scatter)",
    desc: "200m sonic scattershot weapons inflicting 100% non-repairable grey damage.",
    Heavy: "devastator",
    Medium: "havoc",
    Light: "scatter"
  },
  "Blast Shotguns": {
    name: "Blast Shotguns (Brisant, Shatter, Ksiphos)",
    desc: "250m blast shotguns triggering immediate kinetic explosions upon reaching blast threshold.",
    Heavy: "brisant",
    Medium: "shatter",
    Light: "ksiphos"
  },
  "Homing Bending MG": {
    name: "Homing Bending MG (Smuta, Razdor, Kramola)",
    desc: "500m smart kinetic gatlings whose bullets curve around obstacles to strike hidden foes.",
    Heavy: "smuta",
    Medium: "razdor",
    Light: "kramola"
  },
  "Freeze Rockets": {
    name: "Freeze Rockets (Glacier, Cryo, Sinister Rime)",
    desc: "300m cryogenic rocket salvos applying freeze status and damage amplification.",
    Heavy: "glacier",
    Medium: "cryo",
    Light: "sinister_rime"
  },
  "Blast Rockets": {
    name: "Blast Rockets (Incinerator, Scorcher, Scald)",
    desc: "500m blast rocket pods bypassing physical shields through area splash detonations.",
    Heavy: "incinerator",
    Medium: "scorcher",
    Light: "scald"
  },
  "Freeze Lasers": {
    name: "Freeze Lasers (Hel, Skadi, Snaer)",
    desc: "600m continuous freeze beams applying freeze accumulation and locking weapon sights.",
    Heavy: "hel",
    Medium: "skadi",
    Light: "snaer"
  },
  "Corrosive Acid": {
    name: "Corrosive Acid (Bane, Venom, Toxin)",
    desc: "300m acid throwers spraying corrosive bio-chemical fluids that bypass resistance.",
    Heavy: "bane",
    Medium: "venom",
    Light: "toxin"
  },
  "Lockdown Energy": {
    name: "Lockdown Energy (Puncher, Pulsar, Magnetar)",
    desc: "600m precision energy repeaters locking target enemy movement in place.",
    Heavy: "puncher",
    Medium: "pulsar",
    Light: "magnetar"
  },
  "Flamethrowers": {
    name: "Flamethrowers (Ember, Igniter, Blaze)",
    desc: "350m continuous napalm flame streams melting through physical shielding.",
    Heavy: "ember",
    Medium: "igniter",
    Light: "blaze"
  },
  "Continuous Lasers": {
    name: "Continuous Lasers (Prisma, Flux, Gekko)",
    desc: "1100m long-range directed energy sniper beams dealing extreme distance-scaled damage.",
    Heavy: "prisma",
    Light: "gekko"
  },
  "Plasma Cannons": {
    name: "Plasma Cannons (Redeemer, Taran, Magnum)",
    desc: "350m rapid-firing ionized energy bolts piercing energy shields.",
    Heavy: "redeemer",
    Medium: "taran",
    Light: "magnum"
  },
  "Tesla Lock-on": {
    name: "Tesla Lock-on (Calamity, Scourge, Spark)",
    desc: "600m guided lightning arcs whose damage increases exponentially at point-blank range.",
    Heavy: "calamity",
    Medium: "scourge",
    Light: "spark"
  },
  "Kinetic Gatlings": {
    name: "Kinetic Gatlings (Avenger, Punisher T, Punisher)",
    desc: "500m rapid-fire rotary ballistic cannons with accelerating rate of fire.",
    Heavy: "avenger",
    Medium: "punisher_t",
    Light: "punisher"
  },
  "Kinetic Shotguns": {
    name: "Kinetic Shotguns (Thunder, Storm, Gust)",
    desc: "500m close-range kinetic scatterguns delivering crushing impact against physical shields.",
    Heavy: "thunder",
    Medium: "storm",
    Light: "gust"
  },
  "Titan Acoustic": {
    name: "Titan Acoustic (Veyron & Evora)",
    desc: "200m colossal Titan sonic shotguns dealing massive unhealable Grey Damage.",
    Alpha: "veyron",
    Beta: "evora"
  },
  "Titan Lightning Railgun": {
    name: "Titan Lightning Railgun (Tonans & Fulgur)",
    desc: "800m high-voltage sniper railguns with 100% defense mitigation and titan suppression.",
    Alpha: "tonans",
    Beta: "fulgur"
  },
  "Titan Void Siphon": {
    name: "Titan Void Siphon (Gargantua & Pantagruel)",
    desc: "500m area-of-effect void siphon beams repairing titan hull based on damage dealt.",
    Alpha: "gargantua",
    Beta: "pantagruel"
  },
  "Titan Particle Shotgun": {
    name: "Titan Particle Shotgun (Maha-Vajra & Vajra)",
    desc: "200m ultra-heavy particle blast shotguns dominating titan brawling encounters.",
    Alpha: "maha_vajra",
    Beta: "vajra"
  },
  "Titan Cryo Rockets": {
    name: "Titan Cryo Rockets (Argon & Oxy)",
    desc: "300m titan cryogenic rocket pods causing area freeze and massive burst impact.",
    Alpha: "argon",
    Beta: "oxy"
  },
  "Titan Rust Harpoon": {
    name: "Titan Rust Harpoon (Anguisher & Ruiner)",
    desc: "350m corrosive heavy harpoon launchers inflicting Rust and anti-repair debuffs.",
    Alpha: "anguisher",
    Beta: "ruiner"
  },
  "Titan Flame": {
    name: "Titan Napalm Flame (Infernus & Pyro)",
    desc: "350m heavy continuous titan napalm flamethrowers bypassing all defense systems.",
    Alpha: "infernus",
    Beta: "pyro"
  }
};

const MASTER_WEAPONS = [
  // 1. ACOUSTIC / ECHO FAMILY
  { id: "screamer", name: "Screamer", size: "Heavy", tier: "T4", range: 350, burstDps: 28400, sustainedDps: 18200, reload: 5.0, family: "Acoustic / Echo", status: "Tier 4 Acoustic Piercing" },
  { id: "reglar", name: "Reglar", size: "Medium", tier: "T4", range: 350, burstDps: 21300, sustainedDps: 13600, reload: 5.0, family: "Acoustic / Echo", status: "Tier 4 Acoustic Piercing" },
  { id: "howler", name: "Howler", size: "Light", tier: "T4", range: 350, burstDps: 14200, sustainedDps: 9100, reload: 5.0, family: "Acoustic / Echo", status: "Tier 4 Acoustic Piercing" },

  // 2. ELECTRICITY / ZAP
  { id: "fengbao", name: "Fengbao", size: "Heavy", tier: "T4", range: 100, burstDps: 42000, sustainedDps: 26000, reload: 6.0, family: "Electricity / Zap", status: "Tier 4 Electric Arc Brawler" },
  { id: "leana", name: "Leana", size: "Medium", tier: "T4", range: 100, burstDps: 31500, sustainedDps: 19500, reload: 6.0, family: "Electricity / Zap", status: "Tier 4 Electric Arc Brawler" },
  { id: "shifang", name: "Shifang", size: "Light", tier: "T4", range: 100, burstDps: 21000, sustainedDps: 13000, reload: 6.0, family: "Electricity / Zap", status: "Tier 4 Electric Arc Brawler" },

  // 3. BLAST SNIPER
  { id: "morana", name: "Morana", size: "Medium", tier: "T4", range: 600, burstDps: 18500, sustainedDps: 12500, reload: 7.0, family: "Blast Sniper", status: "Tier 4 Blast Sniper" },
  { id: "chione", name: "Chione", size: "Light", tier: "T4", range: 600, burstDps: 12500, sustainedDps: 8400, reload: 7.0, family: "Blast Sniper", status: "Tier 4 Blast Sniper" },

  // 4. MUSKETEER LIFE-DRAIN
  { id: "athos", name: "Athos", size: "Heavy", tier: "T4", range: 350, burstDps: 29000, sustainedDps: 19500, reload: 5.0, family: "Life-Drain Musketeer", status: "Tier 4 Kinetic Siphon Brawler" },
  { id: "porthos", name: "Porthos", size: "Medium", tier: "T4", range: 350, burstDps: 21800, sustainedDps: 14600, reload: 5.0, family: "Life-Drain Musketeer", status: "Tier 4 Kinetic Siphon Brawler" },
  { id: "aramis", name: "Aramis", size: "Light", tier: "T4", range: 350, burstDps: 14500, sustainedDps: 9700, reload: 5.0, family: "Life-Drain Musketeer", status: "Tier 4 Kinetic Siphon Brawler" },

  // 5. DESERT SIPHON
  { id: "kroko", name: "Kroko", size: "Heavy", tier: "T4", range: 350, burstDps: 29500, sustainedDps: 19800, reload: 5.0, family: "Desert Siphon", status: "Tier 4 Desert Siphon Cannon" },
  { id: "hippo", name: "Hippo", size: "Medium", tier: "T4", range: 350, burstDps: 22000, sustainedDps: 14800, reload: 5.0, family: "Desert Siphon", status: "Tier 4 Desert Siphon Cannon" },

  // 6. VOID ENERGY
  { id: "murix", name: "Murix", size: "Heavy", tier: "T4", range: 600, burstDps: 28000, sustainedDps: 18500, reload: 7.0, family: "Void Energy", status: "Tier 4 Void Particle Cannon" },
  { id: "elox", name: "Elox", size: "Medium", tier: "T4", range: 600, burstDps: 21000, sustainedDps: 13800, reload: 7.0, family: "Void Energy", status: "Tier 4 Void Particle Cannon" },
  { id: "velos", name: "Velos", size: "Light", tier: "T4", range: 600, burstDps: 14000, sustainedDps: 9200, reload: 7.0, family: "Void Energy", status: "Tier 4 Void Particle Cannon" },

  // 7. ROMAN KINETIC
  { id: "pilum", name: "Pilum", size: "Medium", tier: "T4", range: 500, burstDps: 21500, sustainedDps: 14500, reload: 5.0, family: "Roman Kinetic", status: "Tier 4 Kinetic Harpoon" },
  { id: "gladius", name: "Gladius", size: "Light", tier: "T4", range: 500, burstDps: 14500, sustainedDps: 9800, reload: 5.0, family: "Roman Kinetic", status: "Tier 4 Kinetic Harpoon" },

  // 8. KINETIC BLADE
  { id: "basileus", name: "Basileus", size: "Medium", tier: "T4", range: 250, burstDps: 23000, sustainedDps: 15500, reload: 5.0, family: "Kinetic Blade", status: "Tier 4 Kinetic Flechette" },
  { id: "machaira", name: "Machaira", size: "Light", tier: "T4", range: 250, burstDps: 15500, sustainedDps: 10200, reload: 5.0, family: "Kinetic Blade", status: "Tier 4 Kinetic Flechette" },
  { id: "neon_machaira", name: "Neon Machaira", size: "Light", tier: "T4", range: 250, burstDps: 16500, sustainedDps: 10800, reload: 5.0, family: "Kinetic Blade", status: "Special Edition Kinetic Flechette" },

  // 9. THERMAL CRYO
  { id: "fahrenheit", name: "Fahrenheit", size: "Heavy", tier: "T4", range: 500, burstDps: 27000, sustainedDps: 18000, reload: 5.0, family: "Thermal Cryo", status: "Tier 4 Thermal Shock Beam" },
  { id: "celsius", name: "Celsius", size: "Medium", tier: "T4", range: 500, burstDps: 20500, sustainedDps: 13500, reload: 5.0, family: "Thermal Cryo", status: "Tier 4 Thermal Shock Beam" },
  { id: "steel_hedjet", name: "Steel Hedjet", size: "Light", tier: "T4", range: 500, burstDps: 13500, sustainedDps: 9000, reload: 5.0, family: "Thermal Cryo", status: "Special Edition Thermal Beam" },

  // 10. SUB-ZERO CRYO ENERGY
  { id: "kelvin", name: "Kelvin", size: "Heavy", tier: "T4", range: 500, burstDps: 26000, sustainedDps: 17500, reload: 5.0, family: "Sub-Zero Cryo Energy", status: "Tier 4 Cryo Beam Cannon" },
  { id: "voonith", name: "Voonith", size: "Light", tier: "T4", range: 500, burstDps: 13000, sustainedDps: 8700, reload: 5.0, family: "Sub-Zero Cryo Energy", status: "Tier 4 Cryo Beam Cannon" },

  // 11. PLASMA BLASTER
  { id: "kirin", name: "Kirin", size: "Heavy", tier: "T4", range: 500, burstDps: 27500, sustainedDps: 18500, reload: 5.0, family: "Plasma Blaster", status: "Tier 4 Concentrated Plasma" },
  { id: "urhag", name: "Urhag", size: "Medium", tier: "T4", range: 500, burstDps: 20500, sustainedDps: 13800, reload: 5.0, family: "Plasma Blaster", status: "Tier 4 Concentrated Plasma" },
  { id: "shatank", name: "Shatank", size: "Light", tier: "T4", range: 500, burstDps: 13800, sustainedDps: 9200, reload: 5.0, family: "Plasma Blaster", status: "Tier 4 Concentrated Plasma" },

  // 12. GUIDED ARTILLERY
  { id: "dune", name: "Dune", size: "Heavy", tier: "T4", range: 800, burstDps: 28000, sustainedDps: 17000, reload: 7.0, family: "Guided Artillery", status: "Tier 4 Indirect Guided Rocket" },
  { id: "uragan", name: "Uragan", size: "Medium", tier: "T4", range: 800, burstDps: 21000, sustainedDps: 12800, reload: 7.0, family: "Guided Artillery", status: "Tier 4 Indirect Guided Rocket" },
  { id: "dunamis", name: "Dunamis", size: "Light", tier: "T4", range: 800, burstDps: 14000, sustainedDps: 8500, reload: 7.0, family: "Guided Artillery", status: "Tier 4 Indirect Guided Rocket" },

  // 13. RUST & ANTI-HEAL
  { id: "subduer", name: "Subduer", size: "Heavy", tier: "T4", range: 500, burstDps: 30000, sustainedDps: 19000, reload: 5.0, family: "Rust & Anti-Heal", status: "Tier 4 Rust Rotary Gun" },
  { id: "damper", name: "Damper", size: "Medium", tier: "T4", range: 500, burstDps: 22500, sustainedDps: 14200, reload: 5.0, family: "Rust & Anti-Heal", status: "Tier 4 Rust Rotary Gun" },
  { id: "tamer", name: "Tamer", size: "Light", tier: "T4", range: 500, burstDps: 15000, sustainedDps: 9500, reload: 5.0, family: "Rust & Anti-Heal", status: "Tier 4 Rust Rotary Gun" },

  // 14. RADIATION
  { id: "decay", name: "Decay", size: "Heavy", tier: "T4", range: 600, burstDps: 29000, sustainedDps: 19800, reload: 3.0, family: "Radiation", status: "Tier 4 Radiation Burst Rifle" },
  { id: "hazard", name: "Hazard", size: "Medium", tier: "T4", range: 600, burstDps: 22000, sustainedDps: 14800, reload: 3.0, family: "Radiation", status: "Tier 4 Radiation Burst Rifle" },
  { id: "blight", name: "Blight", size: "Light", tier: "T4", range: 600, burstDps: 14500, sustainedDps: 9900, reload: 3.0, family: "Radiation", status: "Tier 4 Radiation Burst Rifle" },

  // 15. SONIC SHOTGUNS
  { id: "devastator", name: "Devastator", size: "Heavy", tier: "T4", range: 200, burstDps: 32000, sustainedDps: 21500, reload: 5.0, family: "Sonic Shotguns", status: "Tier 4 Sonic Grey Damage Shotgun" },
  { id: "havoc", name: "Havoc", size: "Medium", tier: "T4", range: 200, burstDps: 24000, sustainedDps: 16000, reload: 5.0, family: "Sonic Shotguns", status: "Tier 4 Sonic Grey Damage Shotgun" },
  { id: "scatter", name: "Scatter", size: "Light", tier: "T4", range: 200, burstDps: 16000, sustainedDps: 10700, reload: 5.0, family: "Sonic Shotguns", status: "Tier 4 Sonic Grey Damage Shotgun" },

  // 16. BLAST SHOTGUNS
  { id: "brisant", name: "Brisant", size: "Heavy", tier: "T4", range: 250, burstDps: 31000, sustainedDps: 20800, reload: 5.0, family: "Blast Shotguns", status: "Tier 4 Blast Charge Shotgun" },
  { id: "shatter", name: "Shatter", size: "Medium", tier: "T4", range: 250, burstDps: 23000, sustainedDps: 15400, reload: 5.0, family: "Blast Shotguns", status: "Tier 4 Blast Charge Shotgun" },
  { id: "ksiphos", name: "Ksiphos", size: "Light", tier: "T4", range: 250, burstDps: 15500, sustainedDps: 10300, reload: 5.0, family: "Blast Shotguns", status: "Tier 4 Blast Charge Shotgun" },

  // 17. HOMING BENDING MG
  { id: "smuta", name: "Smuta", size: "Heavy", tier: "T4", range: 500, burstDps: 28500, sustainedDps: 17800, reload: 5.0, family: "Homing Bending MG", status: "Tier 4 Curved Trajectory MG" },
  { id: "razdor", name: "Razdor", size: "Medium", tier: "T4", range: 500, burstDps: 21000, sustainedDps: 13200, reload: 5.0, family: "Homing Bending MG", status: "Tier 4 Curved Trajectory MG" },
  { id: "kramola", name: "Kramola", size: "Light", tier: "T4", range: 500, burstDps: 14000, sustainedDps: 8800, reload: 5.0, family: "Homing Bending MG", status: "Tier 4 Curved Trajectory MG" },
  { id: "smite", name: "Smite", size: "Light", tier: "T4", range: 500, burstDps: 13800, sustainedDps: 8700, reload: 5.0, family: "Homing Bending MG", status: "Special Edition Curved Trajectory MG" },

  // 18. FREEZE ROCKETS
  { id: "glacier", name: "Glacier", size: "Heavy", tier: "T4", range: 300, burstDps: 28000, sustainedDps: 17500, reload: 6.0, family: "Freeze Rockets", status: "Tier 4 Cryo Explosive Rocket" },
  { id: "cryo", name: "Cryo", size: "Medium", tier: "T4", range: 300, burstDps: 21000, sustainedDps: 13100, reload: 6.0, family: "Freeze Rockets", status: "Tier 4 Cryo Explosive Rocket" },
  { id: "rime", name: "Rime", size: "Light", tier: "T4", range: 300, burstDps: 14000, sustainedDps: 8700, reload: 6.0, family: "Freeze Rockets", status: "Tier 4 Cryo Explosive Rocket" },
  { id: "sinister_rime", name: "Sinister Rime", size: "Light", tier: "T4", range: 300, burstDps: 14800, sustainedDps: 9200, reload: 6.0, family: "Freeze Rockets", status: "Special Edition Cryo Rocket" },

  // 19. BLAST ROCKETS
  { id: "incinerator", name: "Incinerator", size: "Heavy", tier: "T4", range: 500, burstDps: 26500, sustainedDps: 17200, reload: 5.0, family: "Blast Rockets", status: "Tier 4 Area Blast Rocket" },
  { id: "scorcher", name: "Scorcher", size: "Medium", tier: "T4", range: 500, burstDps: 19800, sustainedDps: 12900, reload: 5.0, family: "Blast Rockets", status: "Tier 4 Area Blast Rocket" },
  { id: "scald", name: "Scald", size: "Light", tier: "T4", range: 500, burstDps: 13200, sustainedDps: 8600, reload: 5.0, family: "Blast Rockets", status: "Tier 4 Area Blast Rocket" },
  { id: "warrior_scorcher", name: "Warrior Scorcher", size: "Medium", tier: "T4", range: 500, burstDps: 20800, sustainedDps: 13500, reload: 5.0, family: "Blast Rockets", status: "Special Edition Area Blast Rocket" },

  // 20. FREEZE LASERS
  { id: "hel", name: "Hel", size: "Heavy", tier: "T4", range: 600, burstDps: 25500, sustainedDps: 16500, reload: 5.0, family: "Freeze Lasers", status: "Tier 4 Continuous Freeze Laser" },
  { id: "skadi", name: "Skadi", size: "Medium", tier: "T4", range: 600, burstDps: 19000, sustainedDps: 12300, reload: 5.0, family: "Freeze Lasers", status: "Tier 4 Continuous Freeze Laser" },
  { id: "snaer", name: "Snaer", size: "Light", tier: "T4", range: 600, burstDps: 12800, sustainedDps: 8200, reload: 5.0, family: "Freeze Lasers", status: "Tier 4 Continuous Freeze Laser" },

  // 21. CORROSIVE ACID
  { id: "bane", name: "Bane", size: "Heavy", tier: "T4", range: 300, burstDps: 29000, sustainedDps: 19200, reload: 5.0, family: "Corrosive Acid", status: "Tier 4 Corrosive Acid Stream" },
  { id: "venom", name: "Venom", size: "Medium", tier: "T4", range: 300, burstDps: 21500, sustainedDps: 14400, reload: 5.0, family: "Corrosive Acid", status: "Tier 4 Corrosive Acid Stream" },
  { id: "toxin", name: "Toxin", size: "Light", tier: "T4", range: 300, burstDps: 14500, sustainedDps: 9600, reload: 5.0, family: "Corrosive Acid", status: "Tier 4 Corrosive Acid Stream" },

  // 22. LOCKDOWN ENERGY & KINETIC
  { id: "puncher", name: "Puncher", size: "Heavy", tier: "T4", range: 500, burstDps: 30000, sustainedDps: 18500, reload: 5.0, family: "Lockdown Energy", status: "Tier 4 Kinetic Lockdown Gatling" },
  { id: "pulsar", name: "Pulsar", size: "Medium", tier: "T4", range: 600, burstDps: 19500, sustainedDps: 12800, reload: 5.0, family: "Lockdown Energy", status: "Tier 4 Energy Lockdown Rifle" },
  { id: "magnetar", name: "Magnetar", size: "Light", tier: "T4", range: 600, burstDps: 13000, sustainedDps: 8500, reload: 5.0, family: "Lockdown Energy", status: "Tier 4 Energy Lockdown Rifle" },

  // 23. KINETIC SNIPER & LASER
  { id: "reaper", name: "Reaper", size: "Heavy", tier: "T4", range: 1100, burstDps: 34000, sustainedDps: 12500, reload: 12.0, family: "Kinetic Sniper", status: "Tier 4 Kinetic Shieldbreaker Sniper" },
  { id: "prisma", name: "Prisma", size: "Heavy", tier: "T4", range: 1100, burstDps: 24000, sustainedDps: 18000, reload: 0.0, family: "Continuous Lasers", status: "Tier 4 Distance-Scaled Laser Beam" },
  { id: "ardent_hwangje", name: "Ardent Hwangje", size: "Heavy", tier: "T4", range: 800, burstDps: 25000, sustainedDps: 17500, reload: 0.0, family: "Continuous Lasers", status: "Special Edition Infinite Beam Laser" },
  { id: "hwangje", name: "Hwangje", size: "Heavy", tier: "T4", range: 800, burstDps: 24000, sustainedDps: 16800, reload: 0.0, family: "Continuous Lasers", status: "Tier 4 Infinite Beam Laser" },
  { id: "yeoje", name: "Yeoje", size: "Medium", tier: "T4", range: 800, burstDps: 18000, sustainedDps: 12600, reload: 0.0, family: "Continuous Lasers", status: "Tier 4 Infinite Beam Laser" },
  { id: "taeja", name: "Taeja", size: "Light", tier: "T4", range: 800, burstDps: 12000, sustainedDps: 8400, reload: 0.0, family: "Continuous Lasers", status: "Tier 4 Infinite Beam Laser" },

  // 24. FLAMETHROWERS
  { id: "ember", name: "Ember", size: "Heavy", tier: "T4", range: 350, burstDps: 30000, sustainedDps: 20000, reload: 5.0, family: "Flamethrowers", status: "Tier 4 Continuous Napalm" },
  { id: "igniter", name: "Igniter", size: "Medium", tier: "T4", range: 350, burstDps: 22500, sustainedDps: 15000, reload: 5.0, family: "Flamethrowers", status: "Tier 4 Continuous Napalm" },
  { id: "blaze", name: "Blaze", size: "Light", tier: "T4", range: 350, burstDps: 15000, sustainedDps: 10000, reload: 5.0, family: "Flamethrowers", status: "Tier 4 Continuous Napalm" },

  // 25. CORROSIVE BALLISTIC
  { id: "viper", name: "Viper", size: "Heavy", tier: "T3", range: 500, burstDps: 26500, sustainedDps: 16000, reload: 10.0, family: "Corrosive Acid", status: "Tier 3 Corrosive Kinetic MG" },

  // 26. PLASMA CANNONS & BEAMS
  { id: "redeemer", name: "Redeemer", size: "Heavy", tier: "T4", range: 350, burstDps: 29000, sustainedDps: 19500, reload: 5.0, family: "Plasma Cannons", status: "Tier 4 Heavy Plasma Cannon" },
  { id: "taran", name: "Taran", size: "Medium", tier: "T2", range: 350, burstDps: 21000, sustainedDps: 14000, reload: 5.0, family: "Plasma Cannons", status: "Tier 2 Rapid Plasma Rifle" },
  { id: "magnum", name: "Magnum", size: "Light", tier: "T2", range: 350, burstDps: 13500, sustainedDps: 13500, reload: 0.0, family: "Plasma Cannons", status: "Tier 2 Continuous Energy Cannon" },

  // 27. TESLA LOCK-ON
  { id: "calamity", name: "Calamity", size: "Heavy", tier: "T4", range: 600, burstDps: 26000, sustainedDps: 17000, reload: 5.0, family: "Tesla Lock-on", status: "Tier 4 Guided Lightning Arc" },
  { id: "scourge", name: "Scourge", size: "Medium", tier: "T3", range: 600, burstDps: 19000, sustainedDps: 12500, reload: 5.0, family: "Tesla Lock-on", status: "Tier 3 Guided Lightning Arc" },
  { id: "spark", name: "Spark", size: "Light", tier: "T3", range: 600, burstDps: 12500, sustainedDps: 8200, reload: 5.0, family: "Tesla Lock-on", status: "Tier 3 Guided Lightning Arc" },

  // 28. KINETIC GATLINGS & SHOTGUNS
  { id: "avenger", name: "Avenger", size: "Heavy", tier: "T3", range: 500, burstDps: 27000, sustainedDps: 16500, reload: 10.0, family: "Kinetic Gatlings", status: "Tier 3 Accelerating Heavy MG" },
  { id: "punisher_t", name: "Punisher T", size: "Medium", tier: "T1", range: 500, burstDps: 19000, sustainedDps: 11500, reload: 10.0, family: "Kinetic Gatlings", status: "Tier 1 Accelerating Medium MG" },
  { id: "punisher", name: "Punisher", size: "Light", tier: "T1", range: 500, burstDps: 12500, sustainedDps: 7800, reload: 10.0, family: "Kinetic Gatlings", status: "Tier 1 Accelerating Light MG" },
  { id: "thunder", name: "Thunder", size: "Heavy", tier: "T1", range: 500, burstDps: 26000, sustainedDps: 16000, reload: 5.0, family: "Kinetic Shotguns", status: "Tier 1 Kinetic Heavy Scattergun" },
  { id: "storm", name: "Storm", size: "Medium", tier: "T2", range: 500, burstDps: 18500, sustainedDps: 11200, reload: 5.0, family: "Kinetic Shotguns", status: "Tier 2 Kinetic Medium Scattergun" },
  { id: "gust", name: "Gust", size: "Light", tier: "T2", range: 500, burstDps: 12000, sustainedDps: 7400, reload: 5.0, family: "Kinetic Shotguns", status: "Tier 2 Kinetic Light Scattergun" },

  // 29. CLASSIC ROCKETS & MISSILES
  { id: "exodus", name: "Exodus", size: "Heavy", tier: "T3", range: 300, burstDps: 31000, sustainedDps: 16000, reload: 8.0, family: "Freeze Rockets", status: "Tier 3 Heavy Burst Rocket Pod" },
  { id: "orkan", name: "Orkan", size: "Medium", tier: "T2", range: 300, burstDps: 22500, sustainedDps: 11800, reload: 8.0, family: "Freeze Rockets", status: "Tier 2 Rapid Burst Rocket Pod" },
  { id: "pinata", name: "Pinata", size: "Light", tier: "T1", range: 300, burstDps: 15000, sustainedDps: 7800, reload: 8.0, family: "Freeze Rockets", status: "Tier 1 Rapid Burst Rocket Pod" },
  { id: "tulumbas", name: "Tulumbas", size: "Medium", tier: "T1", range: 500, burstDps: 18000, sustainedDps: 9800, reload: 18.0, family: "Blast Rockets", status: "Tier 1 Medium Kinetic Rocket" },
  { id: "pin", name: "Pin", size: "Light", tier: "T1", range: 500, burstDps: 12000, sustainedDps: 6500, reload: 18.0, family: "Blast Rockets", status: "Tier 1 Light Kinetic Rocket" },
  { id: "spiral", name: "Spiral", size: "Light", tier: "T1", range: 600, burstDps: 11000, sustainedDps: 6200, reload: 12.0, family: "Guided Artillery", status: "Tier 1 Homing Rocket Pod" },
  { id: "hydra", name: "Hydra", size: "Medium", tier: "T2", range: 600, burstDps: 16500, sustainedDps: 9200, reload: 12.0, family: "Guided Artillery", status: "Tier 2 Homing Rocket Pod" },
  { id: "chimera", name: "Chimera", size: "Heavy", tier: "T3", range: 600, burstDps: 23000, sustainedDps: 13000, reload: 12.0, family: "Guided Artillery", status: "Tier 3 Homing Rocket Pod" },
  { id: "flux", name: "Flux", size: "Heavy", tier: "T3", range: 1100, burstDps: 23000, sustainedDps: 17200, reload: 0.0, family: "Continuous Lasers", status: "Tier 3 Long-Range Sniper Laser" },
  { id: "gekko", name: "Gekko", size: "Light", tier: "T1", range: 1100, burstDps: 11500, sustainedDps: 8600, reload: 0.0, family: "Continuous Lasers", status: "Tier 1 Long-Range Sniper Laser" },
  { id: "shocktrain", name: "Shocktrain", size: "Medium", tier: "T3", range: 500, burstDps: 20000, sustainedDps: 8000, reload: 8.0, family: "Plasma Cannons", status: "Tier 3 Chain Energy Cannon" },
  { id: "trebuchet", name: "Trebuchet", size: "Heavy", tier: "T2", range: 1100, burstDps: 28000, sustainedDps: 7000, reload: 20.0, family: "Plasma Cannons", status: "Tier 2 Charged Particle Sniper" },
  { id: "zenit", name: "Zenit", size: "Heavy", tier: "T1", range: 1100, burstDps: 18000, sustainedDps: 9000, reload: 15.0, family: "Guided Artillery", status: "Tier 1 Heavy Artillery Mortar" },
  { id: "noricum", name: "Noricum", size: "Light", tier: "T1", range: 1100, burstDps: 10000, sustainedDps: 5200, reload: 15.0, family: "Guided Artillery", status: "Tier 1 Light Artillery Mortar" },
  { id: "kang_dae", name: "Kang Dae", size: "Heavy", tier: "T1", range: 800, burstDps: 21000, sustainedDps: 8000, reload: 6.0, family: "Kinetic Sniper", status: "Tier 1 High-Velocity Kinetic Cannon" },
  { id: "nashorn", name: "Nashorn", size: "Heavy", tier: "T1", range: 1100, burstDps: 19500, sustainedDps: 7500, reload: 9.0, family: "Kinetic Sniper", status: "Tier 1 Heavy Ballistic Cannon" },
  { id: "molot", name: "Molot", size: "Light", tier: "T1", range: 800, burstDps: 11000, sustainedDps: 6800, reload: 10.0, family: "Kinetic Gatlings", status: "Tier 1 Long-Range Ballistic MG" },
  { id: "molot_t", name: "Molot T", size: "Medium", tier: "T1", range: 800, burstDps: 17000, sustainedDps: 10500, reload: 10.0, family: "Kinetic Gatlings", status: "Tier 1 Long-Range Ballistic MG" },
  { id: "tempest", name: "Tempest", size: "Heavy", tier: "T2", range: 800, burstDps: 24000, sustainedDps: 14800, reload: 10.0, family: "Kinetic Gatlings", status: "Tier 2 Heavy Ballistic Autocannon" },
  { id: "ancile", name: "Ancile", size: "Heavy", tier: "T2", range: 0, burstDps: 0, sustainedDps: 0, reload: 0.0, family: "Kinetic Shotguns", status: "Tier 2 Energy Shield Dome Generator" },

  // 30. TITAN WEAPONS (ALPHA & BETA)
  { id: "tonans", name: "Tonans", size: "Alpha", tier: "T4", range: 800, burstDps: 78000, sustainedDps: 45000, reload: 6.0, family: "Titan Lightning Railgun", status: "Titan Alpha Lightning Railgun" },
  { id: "fulgur", name: "Fulgur", size: "Beta", tier: "T4", range: 800, burstDps: 58000, sustainedDps: 34000, reload: 6.0, family: "Titan Lightning Railgun", status: "Titan Beta Lightning Railgun" },
  { id: "veyron", name: "Veyron", size: "Alpha", tier: "T4", range: 200, burstDps: 75000, sustainedDps: 48000, reload: 5.0, family: "Titan Acoustic", status: "Titan Alpha Sonic Acoustic Shotgun" },
  { id: "evora", name: "Evora", size: "Beta", tier: "T4", range: 200, burstDps: 56000, sustainedDps: 36000, reload: 5.0, family: "Titan Acoustic", status: "Titan Beta Sonic Acoustic Shotgun" },
  { id: "maha_vajra", name: "Maha-Vajra", size: "Alpha", tier: "T4", range: 200, burstDps: 72000, sustainedDps: 46000, reload: 5.0, family: "Titan Particle Shotgun", status: "Titan Alpha Particle Blast Shotgun" },
  { id: "vajra", name: "Vajra", size: "Beta", tier: "T4", range: 200, burstDps: 54000, sustainedDps: 34500, reload: 5.0, family: "Titan Particle Shotgun", status: "Titan Beta Particle Blast Shotgun" },
  { id: "gargantua", name: "Gargantua", size: "Alpha", tier: "T4", range: 500, burstDps: 65000, sustainedDps: 42000, reload: 0.0, family: "Titan Void Siphon", status: "Titan Alpha Void Siphon Beam" },
  { id: "pantagruel", name: "Pantagruel", size: "Beta", tier: "T4", range: 500, burstDps: 48000, sustainedDps: 31000, reload: 0.0, family: "Titan Void Siphon", status: "Titan Beta Void Siphon Beam" },
  { id: "argon", name: "Argon", size: "Alpha", tier: "T4", range: 300, burstDps: 68000, sustainedDps: 43000, reload: 6.0, family: "Titan Cryo Rockets", status: "Titan Alpha Cryo Blast Rockets" },
  { id: "oxy", name: "Oxy", size: "Beta", tier: "T4", range: 300, burstDps: 49000, sustainedDps: 31000, reload: 6.0, family: "Titan Cryo Rockets", status: "Titan Beta Cryo Blast Rockets" },
  { id: "anguisher", name: "Anguisher", size: "Alpha", tier: "T4", range: 350, burstDps: 74000, sustainedDps: 47000, reload: 5.0, family: "Titan Rust Harpoon", status: "Titan Alpha Rust Harpoon Cannon" },
  { id: "ruiner", name: "Ruiner", size: "Beta", tier: "T4", range: 350, burstDps: 55000, sustainedDps: 35000, reload: 5.0, family: "Titan Rust Harpoon", status: "Titan Beta Rust Harpoon Cannon" },
  { id: "infernus", name: "Infernus", size: "Alpha", tier: "T4", range: 350, burstDps: 69000, sustainedDps: 44000, reload: 5.0, family: "Titan Flame", status: "Titan Alpha Napalm Flamethrower" },
  { id: "pyro", name: "Pyro", size: "Beta", tier: "T4", range: 350, burstDps: 51000, sustainedDps: 32500, reload: 5.0, family: "Titan Flame", status: "Titan Beta Napalm Flamethrower" },
  { id: "cataclysm", name: "Cataclysm", size: "Alpha", tier: "T4", range: 600, burstDps: 66000, sustainedDps: 41000, reload: 5.0, family: "Tesla Lock-on", status: "Titan Alpha Tesla Arc Lock-on" },
  { id: "cyclops", name: "Cyclops", size: "Beta", tier: "T4", range: 600, burstDps: 49000, sustainedDps: 30500, reload: 5.0, family: "Tesla Lock-on", status: "Titan Beta Tesla Arc Lock-on" },
  { id: "grom", name: "Grom", size: "Alpha", tier: "T3", range: 500, burstDps: 70000, sustainedDps: 44000, reload: 5.0, family: "Kinetic Shotguns", status: "Titan Alpha Kinetic Scattershot" },
  { id: "squall", name: "Squall", size: "Beta", tier: "T3", range: 500, burstDps: 52000, sustainedDps: 32500, reload: 5.0, family: "Kinetic Shotguns", status: "Titan Beta Kinetic Scattershot" },
  { id: "tsar", name: "Tsar", size: "Alpha", tier: "T3", range: 500, burstDps: 62000, sustainedDps: 38000, reload: 5.0, family: "Blast Rockets", status: "Titan Alpha Heavy Explosive Rocket" },
  { id: "rupture", name: "Rupture", size: "Beta", tier: "T3", range: 500, burstDps: 46000, sustainedDps: 28500, reload: 5.0, family: "Blast Rockets", status: "Titan Beta Heavy Explosive Rocket" },
  { id: "vengeance", name: "Vengeance", size: "Alpha", tier: "T1", range: 500, burstDps: 60000, sustainedDps: 37000, reload: 10.0, family: "Kinetic Gatlings", status: "Titan Alpha Heavy Kinetic Gatling" },
  { id: "retaliator", name: "Retaliator", size: "Beta", tier: "T1", range: 500, burstDps: 45000, sustainedDps: 27500, reload: 10.0, family: "Kinetic Gatlings", status: "Titan Beta Medium Kinetic Gatling" },
  { id: "striker", name: "Striker", size: "Alpha", tier: "T3", range: 800, burstDps: 64000, sustainedDps: 39000, reload: 6.0, family: "Plasma Cannons", status: "Titan Alpha Chain Lightning Railgun" },
  { id: "krait", name: "Krait", size: "Beta", tier: "T3", range: 500, burstDps: 47000, sustainedDps: 29000, reload: 5.0, family: "Corrosive Acid", status: "Titan Beta Corrosive Acid Cannon" }
];
