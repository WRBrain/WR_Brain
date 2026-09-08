/* WRBrain - Master Weapons Database & Sibling Families */

const WEAPON_FAMILIES = {
  "Acoustic / Echo": {
    "name": "Acoustic / Echo (Screamer, Reglar, Howler)",
    "desc": "High-frequency acoustic shockwaves delivering high burst DPS that penetrates defensive systems at 350m.",
    "Heavy": "screamer",
    "Medium": "reglar",
    "Light": "howler"
  },
  "Electricity / Zap": {
    "name": "Electricity / Zap (Fengbao, Leana, Shifang)",
    "desc": "Short-range 100m high-voltage electric arcs melting brawlers in seconds.",
    "Heavy": "fengbao",
    "Medium": "leana",
    "Light": "shifang"
  },
  "Blast Sniper": {
    "name": "Blast Sniper (Morana & Chione)",
    "desc": "Precision 600m kinetic rifles applying blast charge buildup that detonates massive AOE explosions.",
    "Medium": "morana",
    "Light": "chione"
  },
  "Life-Drain Musketeer": {
    "name": "Life-Drain Musketeer (Athos, Porthos, Aramis)",
    "desc": "Kinetic siphon weaponry converting dealt damage into continuous robot hull repair at 350m.",
    "Heavy": "athos",
    "Medium": "porthos",
    "Light": "aramis"
  },
  "Sub-Zero Cryo Energy": {
    "name": "Sub-Zero Cryo Energy (Kelvin, Celsius, Voonith)",
    "desc": "500m cryogenic particle beams freezing targets and amplifying incoming damage by +20%.",
    "Heavy": "kelvin",
    "Medium": "celsius",
    "Light": "voonith"
  },
  "Plasma Blaster": {
    "name": "Plasma Blaster (Kirin, Urhag, Shatank)",
    "desc": "500m concentrated plasma blasters firing piercing energy spheres through forcefields.",
    "Heavy": "kirin",
    "Medium": "urhag",
    "Light": "shatank"
  },
  "Guided Artillery": {
    "name": "Guided Artillery (Dune, Uragan, Dunamis)",
    "desc": "800m indirect-trajectory guided missile artillery launching over high cover barriers.",
    "Heavy": "dune",
    "Medium": "uragan",
    "Light": "dunamis"
  },
  "Rust & Anti-Heal": {
    "name": "Rust & Anti-Heal (Subduer, Damper, Tamer)",
    "desc": "500m corrosive rotary weapons applying Rust debuffs that halt opponent healing and degrade durability.",
    "Heavy": "subduer",
    "Medium": "damper",
    "Light": "tamer"
  },
  "Radiation": {
    "name": "Radiation (Decay, Hazard, Blight)",
    "desc": "600m radiation cannons firing 3-round bursts with damage scaling per consecutive hit.",
    "Heavy": "decay",
    "Medium": "hazard",
    "Light": "blight"
  },
  "Sonic Shotguns": {
    "name": "Sonic Shotguns (Devastator, Havoc, Scatter)",
    "desc": "200m sonic scattershot weapons inflicting 100% non-repairable grey damage.",
    "Heavy": "devastator",
    "Medium": "havoc",
    "Light": "scatter"
  },
  "Blast Shotguns": {
    "name": "Blast Shotguns (Brisant, Shatter, Ksiphos)",
    "desc": "250m blast shotguns triggering immediate kinetic explosions upon reaching blast threshold.",
    "Heavy": "brisant",
    "Medium": "shatter",
    "Light": "ksiphos"
  },
  "Homing Bending MG": {
    "name": "Homing Bending MG (Smuta, Razdor, Kramola)",
    "desc": "500m smart kinetic gatlings whose bullets curve around obstacles to strike hidden foes.",
    "Heavy": "smuta",
    "Medium": "razdor",
    "Light": "kramola"
  },
  "Freeze Rockets": {
    "name": "Freeze Rockets (Glacier, Cryo, Sinister Rime)",
    "desc": "300m cryogenic rocket salvos applying freeze status and damage amplification.",
    "Heavy": "glacier",
    "Medium": "cryo",
    "Light": "sinister_rime"
  },
  "Blast Rockets": {
    "name": "Blast Rockets (Incinerator, Scorcher, Scald)",
    "desc": "500m blast rocket pods bypassing physical shields through area splash detonations.",
    "Heavy": "incinerator",
    "Medium": "scorcher",
    "Light": "scald"
  },
  "Infinite Lasers": {
    "name": "Infinite Lasers (Ardent Hwangje, Yeoje, Taeja)",
    "desc": "800m infinite-ammo particle lasers with overheat dispersion mechanics.",
    "Heavy": "ardent_hwangje",
    "Medium": "yeoje",
    "Light": "taeja"
  },
  "Lockdown Energy": {
    "name": "Lockdown Energy (Puncher, Pulsar, Magnetar)",
    "desc": "500-600m energy weapons inflicting rapid lockdown immobilization on hit.",
    "Heavy": "puncher",
    "Medium": "pulsar",
    "Light": "magnetar"
  },
  "Classic Plasma": {
    "name": "Classic Plasma (Redeemer, Taran, Magnum)",
    "desc": "350m energy plasma guns bypassing energy shields with fast cycle time.",
    "Heavy": "redeemer",
    "Medium": "taran",
    "Light": "magnum"
  },
  "Flamethrowers": {
    "name": "Flamethrowers (Ember, Igniter, Blaze)",
    "desc": "350m continuous napalm flame streams melting through physical shielding.",
    "Heavy": "ember",
    "Medium": "igniter",
    "Light": "blaze"
  },
  "Acid Corrosive": {
    "name": "Acid Corrosive (Bane, Venom, Toxin)",
    "desc": "300m corrosive chemical sprayers dealing stacking acid damage over time.",
    "Heavy": "bane",
    "Medium": "venom",
    "Light": "toxin"
  },
  "Energy Machine Guns": {
    "name": "Energy Machine Guns (Nucleon, Atomizer, Quarker)",
    "desc": "500m infinite ammo kinetic energy weapons with overheat accuracy loss.",
    "Heavy": "nucleon",
    "Medium": "atomizer",
    "Light": "quarker"
  },
  "Lock-on Lightning": {
    "name": "Lock-on Lightning (Calamity, Scourge, Spark)",
    "desc": "600m guided electrical arcs dealing up to 3x damage at point-blank range.",
    "Heavy": "calamity",
    "Medium": "scourge",
    "Light": "spark"
  },
  "Kinetic Gatlings": {
    "name": "Kinetic Gatlings (Avenger, Punisher T, Punisher)",
    "desc": "500m high-RPM kinetic gatlings with accelerated spin-up mode.",
    "Heavy": "avenger",
    "Medium": "punisher_t",
    "Light": "punisher"
  },
  "Kinetic Shotguns": {
    "name": "Kinetic Shotguns (Thunder, Storm, Gust)",
    "desc": "500m kinetic shotguns delivering massive point-blank buckshot trauma.",
    "Heavy": "thunder",
    "Medium": "storm",
    "Light": "gust"
  },
  "Gauss Railguns": {
    "name": "Gauss Railguns (Gauss, Weber, Volt)",
    "desc": "800m defense-mitigating sniper railguns piercing defense points.",
    "Heavy": "gauss",
    "Medium": "weber",
    "Light": "volt"
  },
  "Freeze Lasers": {
    "name": "Freeze Lasers (Hel, Skadi, Snaer)",
    "desc": "600m cryogenic particle beams freezing and locking distant targets.",
    "Heavy": "hel",
    "Medium": "skadi",
    "Light": "snaer"
  },
  "Ultimate Energy Shotguns": {
    "name": "Ultimate Energy Shotguns (Ultimate Glory, Corona, Halo)",
    "desc": "Ultimate edition energy shotguns with instant lockdown and supreme burst DPS.",
    "Heavy": "ue_glory",
    "Medium": "ue_corona",
    "Light": "ue_halo"
  },
  "Ultimate Lightning": {
    "name": "Ultimate Lightning (Ultimate Calamity, Scourge, Spark)",
    "desc": "Ultimate edition arc beams with amplified voltage output.",
    "Heavy": "ue_calamity",
    "Medium": "ue_scourge",
    "Light": "ue_spark"
  },
  "Ultimate Gatlings": {
    "name": "Ultimate Gatlings (Ultimate Avenger, Punisher T, Punisher)",
    "desc": "Ultimate edition kinetic gatlings with built-in defense mitigation.",
    "Heavy": "ue_avenger",
    "Medium": "ue_punisher_t",
    "Light": "ue_punisher"
  },
  "Ultimate Flamethrowers": {
    "name": "Ultimate Flamethrowers (Ultimate Ember, Igniter, Blaze)",
    "desc": "Ultimate edition thermal flamethrowers melting all physical and energy defenses.",
    "Heavy": "ue_ember",
    "Medium": "ue_igniter",
    "Light": "ue_blaze"
  }
};

const MASTER_WEAPONS = [
  {
    "id": "screamer",
    "name": "Screamer",
    "size": "Heavy",
    "tier": "T4",
    "range": 350,
    "burstDps": 28400,
    "reload": 5.0,
    "family": "Acoustic / Echo",
    "status": "Tier 4 Acoustic Piercing Weapon"
  },
  {
    "id": "reglar",
    "name": "Reglar",
    "size": "Medium",
    "tier": "T4",
    "range": 350,
    "burstDps": 21300,
    "reload": 5.0,
    "family": "Acoustic / Echo",
    "status": "Tier 4 Acoustic Piercing Weapon"
  },
  {
    "id": "howler",
    "name": "Howler",
    "size": "Light",
    "tier": "T4",
    "range": 350,
    "burstDps": 14200,
    "reload": 5.0,
    "family": "Acoustic / Echo",
    "status": "Tier 4 Acoustic Piercing Weapon"
  },
  {
    "id": "fengbao",
    "name": "Fengbao",
    "size": "Heavy",
    "tier": "T4",
    "range": 100,
    "burstDps": 42000,
    "reload": 6.0,
    "family": "Electricity / Zap",
    "status": "Tier 4 Electric Arc Brawler"
  },
  {
    "id": "leana",
    "name": "Leana",
    "size": "Medium",
    "tier": "T4",
    "range": 100,
    "burstDps": 31500,
    "reload": 6.0,
    "family": "Electricity / Zap",
    "status": "Tier 4 Electric Arc Brawler"
  },
  {
    "id": "shifang",
    "name": "Shifang",
    "size": "Light",
    "tier": "T4",
    "range": 100,
    "burstDps": 21000,
    "reload": 6.0,
    "family": "Electricity / Zap",
    "status": "Tier 4 Electric Arc Brawler"
  },
  {
    "id": "morana",
    "name": "Morana",
    "size": "Medium",
    "tier": "T4",
    "range": 600,
    "burstDps": 18500,
    "reload": 7.0,
    "family": "Blast Sniper",
    "status": "Tier 4 Blast Sniper"
  },
  {
    "id": "chione",
    "name": "Chione",
    "size": "Light",
    "tier": "T4",
    "range": 600,
    "burstDps": 12500,
    "reload": 7.0,
    "family": "Blast Sniper",
    "status": "Tier 4 Blast Sniper"
  },
  {
    "id": "athos",
    "name": "Athos",
    "size": "Heavy",
    "tier": "T4",
    "range": 350,
    "burstDps": 29000,
    "reload": 5.0,
    "family": "Life-Drain Musketeer",
    "status": "Tier 4 Kinetic Siphon Brawler"
  },
  {
    "id": "porthos",
    "name": "Porthos",
    "size": "Medium",
    "tier": "T4",
    "range": 350,
    "burstDps": 21800,
    "reload": 5.0,
    "family": "Life-Drain Musketeer",
    "status": "Tier 4 Kinetic Siphon Brawler"
  },
  {
    "id": "aramis",
    "name": "Aramis",
    "size": "Light",
    "tier": "T4",
    "range": 350,
    "burstDps": 14500,
    "reload": 5.0,
    "family": "Life-Drain Musketeer",
    "status": "Tier 4 Kinetic Siphon Brawler"
  },
  {
    "id": "kelvin",
    "name": "Kelvin",
    "size": "Heavy",
    "tier": "T4",
    "range": 500,
    "burstDps": 24000,
    "reload": 6.0,
    "family": "Sub-Zero Cryo Energy",
    "status": "Tier 4 Cryo Energy Projector"
  },
  {
    "id": "celsius",
    "name": "Celsius",
    "size": "Medium",
    "tier": "T4",
    "range": 500,
    "burstDps": 18000,
    "reload": 6.0,
    "family": "Sub-Zero Cryo Energy",
    "status": "Tier 4 Cryo Energy Projector"
  },
  {
    "id": "voonith",
    "name": "Voonith",
    "size": "Light",
    "tier": "T4",
    "range": 500,
    "burstDps": 12000,
    "reload": 6.0,
    "family": "Sub-Zero Cryo Energy",
    "status": "Tier 4 Cryo Energy Projector"
  },
  {
    "id": "kirin",
    "name": "Kirin",
    "size": "Heavy",
    "tier": "T4",
    "range": 500,
    "burstDps": 27500,
    "reload": 5.0,
    "family": "Plasma Blaster",
    "status": "Tier 4 Concentrated Plasma Blaster"
  },
  {
    "id": "urhag",
    "name": "Urhag",
    "size": "Medium",
    "tier": "T4",
    "range": 500,
    "burstDps": 20600,
    "reload": 5.0,
    "family": "Plasma Blaster",
    "status": "Tier 4 Concentrated Plasma Blaster"
  },
  {
    "id": "shatank",
    "name": "Shatank",
    "size": "Light",
    "tier": "T4",
    "range": 500,
    "burstDps": 13800,
    "reload": 5.0,
    "family": "Plasma Blaster",
    "status": "Tier 4 Concentrated Plasma Blaster"
  },
  {
    "id": "dune",
    "name": "Dune",
    "size": "Heavy",
    "tier": "T4",
    "range": 800,
    "burstDps": 19500,
    "reload": 8.0,
    "family": "Guided Artillery",
    "status": "Tier 4 Guided Indirect Artillery"
  },
  {
    "id": "uragan",
    "name": "Uragan",
    "size": "Medium",
    "tier": "T4",
    "range": 800,
    "burstDps": 14600,
    "reload": 8.0,
    "family": "Guided Artillery",
    "status": "Tier 4 Guided Indirect Artillery"
  },
  {
    "id": "dunamis",
    "name": "Dunamis",
    "size": "Light",
    "tier": "T4",
    "range": 800,
    "burstDps": 9800,
    "reload": 8.0,
    "family": "Guided Artillery",
    "status": "Tier 4 Guided Indirect Artillery"
  },
  {
    "id": "subduer",
    "name": "Subduer",
    "size": "Heavy",
    "tier": "T4",
    "range": 500,
    "burstDps": 26000,
    "reload": 6.0,
    "family": "Rust & Anti-Heal",
    "status": "Tier 4 Corrosive Rust Rotary"
  },
  {
    "id": "damper",
    "name": "Damper",
    "size": "Medium",
    "tier": "T4",
    "range": 500,
    "burstDps": 19500,
    "reload": 6.0,
    "family": "Rust & Anti-Heal",
    "status": "Tier 4 Corrosive Rust Blaster"
  },
  {
    "id": "tamer",
    "name": "Tamer",
    "size": "Light",
    "tier": "T4",
    "range": 500,
    "burstDps": 13000,
    "reload": 6.0,
    "family": "Rust & Anti-Heal",
    "status": "Tier 4 Corrosive Rust Blaster"
  },
  {
    "id": "decay",
    "name": "Decay",
    "size": "Heavy",
    "tier": "T4",
    "range": 600,
    "burstDps": 25000,
    "reload": 4.0,
    "family": "Radiation",
    "status": "Tier 4 Radiation Cannon"
  },
  {
    "id": "hazard",
    "name": "Hazard",
    "size": "Medium",
    "tier": "T4",
    "range": 600,
    "burstDps": 18700,
    "reload": 4.0,
    "family": "Radiation",
    "status": "Tier 4 Radiation Cannon"
  },
  {
    "id": "blight",
    "name": "Blight",
    "size": "Light",
    "tier": "T4",
    "range": 600,
    "burstDps": 12500,
    "reload": 4.0,
    "family": "Radiation",
    "status": "Tier 4 Radiation Cannon"
  },
  {
    "id": "devastator",
    "name": "Devastator",
    "size": "Heavy",
    "tier": "T4",
    "range": 200,
    "burstDps": 38000,
    "reload": 5.0,
    "family": "Sonic Shotguns",
    "status": "Tier 4 Grey Damage Sonic"
  },
  {
    "id": "havoc",
    "name": "Havoc",
    "size": "Medium",
    "tier": "T4",
    "range": 200,
    "burstDps": 28500,
    "reload": 5.0,
    "family": "Sonic Shotguns",
    "status": "Tier 4 Grey Damage Sonic"
  },
  {
    "id": "scatter",
    "name": "Scatter",
    "size": "Light",
    "tier": "T4",
    "range": 200,
    "burstDps": 19000,
    "reload": 5.0,
    "family": "Sonic Shotguns",
    "status": "Tier 4 Grey Damage Sonic"
  },
  {
    "id": "brisant",
    "name": "Brisant",
    "size": "Heavy",
    "tier": "T4",
    "range": 250,
    "burstDps": 36000,
    "reload": 5.0,
    "family": "Blast Shotguns",
    "status": "Tier 4 Blast Charge Shotgun"
  },
  {
    "id": "shatter",
    "name": "Shatter",
    "size": "Medium",
    "tier": "T4",
    "range": 250,
    "burstDps": 27000,
    "reload": 5.0,
    "family": "Blast Shotguns",
    "status": "Tier 4 Blast Charge Shotgun"
  },
  {
    "id": "ksiphos",
    "name": "Ksiphos",
    "size": "Light",
    "tier": "T4",
    "range": 250,
    "burstDps": 18000,
    "reload": 5.0,
    "family": "Blast Shotguns",
    "status": "Tier 4 Blast Charge Shotgun"
  },
  {
    "id": "smuta",
    "name": "Smuta",
    "size": "Heavy",
    "tier": "T4",
    "range": 500,
    "burstDps": 24500,
    "reload": 7.0,
    "family": "Homing Bending MG",
    "status": "Tier 4 Homing Smart MG"
  },
  {
    "id": "razdor",
    "name": "Razdor",
    "size": "Medium",
    "tier": "T4",
    "range": 500,
    "burstDps": 18400,
    "reload": 7.0,
    "family": "Homing Bending MG",
    "status": "Tier 4 Homing Smart MG"
  },
  {
    "id": "kramola",
    "name": "Kramola",
    "size": "Light",
    "tier": "T4",
    "range": 500,
    "burstDps": 12200,
    "reload": 7.0,
    "family": "Homing Bending MG",
    "status": "Tier 4 Homing Smart MG"
  },
  {
    "id": "glacier",
    "name": "Glacier",
    "size": "Heavy",
    "tier": "T4",
    "range": 300,
    "burstDps": 32000,
    "reload": 15.0,
    "family": "Freeze Rockets",
    "status": "Tier 4 Cryo Rocket Pod"
  },
  {
    "id": "cryo",
    "name": "Cryo",
    "size": "Medium",
    "tier": "T4",
    "range": 300,
    "burstDps": 24000,
    "reload": 15.0,
    "family": "Freeze Rockets",
    "status": "Tier 4 Cryo Rocket Pod"
  },
  {
    "id": "sinister_rime",
    "name": "Sinister Rime",
    "size": "Light",
    "tier": "T4",
    "range": 300,
    "burstDps": 16000,
    "reload": 15.0,
    "family": "Freeze Rockets",
    "status": "Tier 4 Cryo Rocket Pod"
  },
  {
    "id": "incinerator",
    "name": "Incinerator",
    "size": "Heavy",
    "tier": "T4",
    "range": 500,
    "burstDps": 22000,
    "reload": 12.0,
    "family": "Blast Rockets",
    "status": "Tier 4 Blast Rocket Launcher"
  },
  {
    "id": "scorcher",
    "name": "Scorcher",
    "size": "Medium",
    "tier": "T4",
    "range": 500,
    "burstDps": 16500,
    "reload": 12.0,
    "family": "Blast Rockets",
    "status": "Tier 4 Blast Rocket Launcher"
  },
  {
    "id": "scald",
    "name": "Scald",
    "size": "Light",
    "tier": "T4",
    "range": 500,
    "burstDps": 11000,
    "reload": 12.0,
    "family": "Blast Rockets",
    "status": "Tier 4 Blast Rocket Launcher"
  },
  {
    "id": "ardent_hwangje",
    "name": "Ardent Hwangje",
    "size": "Heavy",
    "tier": "T4",
    "range": 800,
    "burstDps": 21000,
    "reload": 0.0,
    "family": "Infinite Lasers",
    "status": "Tier 4 Infinite Particle Laser"
  },
  {
    "id": "yeoje",
    "name": "Yeoje",
    "size": "Medium",
    "tier": "T4",
    "range": 800,
    "burstDps": 15800,
    "reload": 0.0,
    "family": "Infinite Lasers",
    "status": "Tier 4 Infinite Particle Laser"
  },
  {
    "id": "taeja",
    "name": "Taeja",
    "size": "Light",
    "tier": "T4",
    "range": 800,
    "burstDps": 10500,
    "reload": 0.0,
    "family": "Infinite Lasers",
    "status": "Tier 4 Infinite Particle Laser"
  },
  {
    "id": "puncher",
    "name": "Puncher",
    "size": "Heavy",
    "tier": "T4",
    "range": 500,
    "burstDps": 31000,
    "reload": 5.0,
    "family": "Lockdown Energy",
    "status": "Tier 4 Lockdown Energy Rotary"
  },
  {
    "id": "pulsar",
    "name": "Pulsar",
    "size": "Medium",
    "tier": "T4",
    "range": 600,
    "burstDps": 17500,
    "reload": 5.0,
    "family": "Lockdown Energy",
    "status": "Tier 4 Lockdown Energy Rifle"
  },
  {
    "id": "magnetar",
    "name": "Magnetar",
    "size": "Light",
    "tier": "T4",
    "range": 600,
    "burstDps": 12000,
    "reload": 5.0,
    "family": "Lockdown Energy",
    "status": "Tier 4 Lockdown Energy Repeater"
  },
  {
    "id": "reaper",
    "name": "Reaper",
    "size": "Heavy",
    "tier": "T4",
    "range": 1100,
    "burstDps": 22500,
    "reload": 7.0,
    "family": "Shieldbreaker Railgun",
    "status": "Tier 4 Shield-Piercing Railgun"
  },
  {
    "id": "redeemer",
    "name": "Redeemer",
    "size": "Heavy",
    "tier": "T3",
    "range": 350,
    "burstDps": 23000,
    "reload": 5.0,
    "family": "Classic Plasma",
    "status": "Tier 3 Plasma Launcher"
  },
  {
    "id": "taran",
    "name": "Taran",
    "size": "Medium",
    "tier": "T3",
    "range": 350,
    "burstDps": 16500,
    "reload": 4.8,
    "family": "Classic Plasma",
    "status": "Tier 3 Plasma Cannon"
  },
  {
    "id": "magnum",
    "name": "Magnum",
    "size": "Light",
    "tier": "T2",
    "range": 350,
    "burstDps": 11000,
    "reload": 0.0,
    "family": "Classic Plasma",
    "status": "Tier 2 Continuous Plasma"
  },
  {
    "id": "ember",
    "name": "Ember",
    "size": "Heavy",
    "tier": "T3",
    "range": 350,
    "burstDps": 25500,
    "reload": 5.0,
    "family": "Flamethrowers",
    "status": "Tier 3 Thermal Flamethrower"
  },
  {
    "id": "igniter",
    "name": "Igniter",
    "size": "Medium",
    "tier": "T3",
    "range": 350,
    "burstDps": 19000,
    "reload": 5.0,
    "family": "Flamethrowers",
    "status": "Tier 3 Thermal Flamethrower"
  },
  {
    "id": "blaze",
    "name": "Blaze",
    "size": "Light",
    "tier": "T3",
    "range": 350,
    "burstDps": 12800,
    "reload": 5.0,
    "family": "Flamethrowers",
    "status": "Tier 3 Thermal Flamethrower"
  },
  {
    "id": "bane",
    "name": "Bane",
    "size": "Heavy",
    "tier": "T4",
    "range": 300,
    "burstDps": 26500,
    "reload": 5.0,
    "family": "Acid Corrosive",
    "status": "Tier 4 Corrosive Chemical Sprayer"
  },
  {
    "id": "venom",
    "name": "Venom",
    "size": "Medium",
    "tier": "T4",
    "range": 300,
    "burstDps": 19800,
    "reload": 5.0,
    "family": "Acid Corrosive",
    "status": "Tier 4 Corrosive Chemical Sprayer"
  },
  {
    "id": "toxin",
    "name": "Toxin",
    "size": "Light",
    "tier": "T4",
    "range": 300,
    "burstDps": 13200,
    "reload": 5.0,
    "family": "Acid Corrosive",
    "status": "Tier 4 Corrosive Chemical Sprayer"
  },
  {
    "id": "nucleon",
    "name": "Nucleon",
    "size": "Heavy",
    "tier": "T4",
    "range": 500,
    "burstDps": 23500,
    "reload": 0.0,
    "family": "Energy Machine Guns",
    "status": "Tier 4 Continuous Energy MG"
  },
  {
    "id": "atomizer",
    "name": "Atomizer",
    "size": "Medium",
    "tier": "T4",
    "range": 500,
    "burstDps": 17600,
    "reload": 0.0,
    "family": "Energy Machine Guns",
    "status": "Tier 4 Continuous Energy MG"
  },
  {
    "id": "quarker",
    "name": "Quarker",
    "size": "Light",
    "tier": "T4",
    "range": 500,
    "burstDps": 11800,
    "reload": 0.0,
    "family": "Energy Machine Guns",
    "status": "Tier 4 Continuous Energy MG"
  },
  {
    "id": "calamity",
    "name": "Calamity",
    "size": "Heavy",
    "tier": "T3",
    "range": 600,
    "burstDps": 28000,
    "reload": 5.0,
    "family": "Lock-on Lightning",
    "status": "Tier 3 Guided Lightning Arc"
  },
  {
    "id": "scourge",
    "name": "Scourge",
    "size": "Medium",
    "tier": "T3",
    "range": 600,
    "burstDps": 21000,
    "reload": 5.0,
    "family": "Lock-on Lightning",
    "status": "Tier 3 Guided Lightning Arc"
  },
  {
    "id": "spark",
    "name": "Spark",
    "size": "Light",
    "tier": "T3",
    "range": 600,
    "burstDps": 14000,
    "reload": 5.0,
    "family": "Lock-on Lightning",
    "status": "Tier 3 Guided Lightning Arc"
  },
  {
    "id": "avenger",
    "name": "Avenger",
    "size": "Heavy",
    "tier": "T2",
    "range": 500,
    "burstDps": 26000,
    "reload": 10.0,
    "family": "Kinetic Gatlings",
    "status": "Tier 2 Heavy Rotary Autocannon"
  },
  {
    "id": "punisher_t",
    "name": "Punisher T",
    "size": "Medium",
    "tier": "T1",
    "range": 500,
    "burstDps": 17000,
    "reload": 10.0,
    "family": "Kinetic Gatlings",
    "status": "Tier 1 Dual-Barrel Kinetic Gatling"
  },
  {
    "id": "punisher",
    "name": "Punisher",
    "size": "Light",
    "tier": "T1",
    "range": 500,
    "burstDps": 11000,
    "reload": 10.0,
    "family": "Kinetic Gatlings",
    "status": "Tier 1 Sustained Kinetic Gatling"
  },
  {
    "id": "thunder",
    "name": "Thunder",
    "size": "Heavy",
    "tier": "T1",
    "range": 500,
    "burstDps": 25000,
    "reload": 2.0,
    "family": "Kinetic Shotguns",
    "status": "Tier 1 Kinetic Shotgun"
  },
  {
    "id": "storm",
    "name": "Storm",
    "size": "Medium",
    "tier": "T2",
    "range": 500,
    "burstDps": 18000,
    "reload": 2.0,
    "family": "Kinetic Shotguns",
    "status": "Tier 2 Kinetic Shotgun"
  },
  {
    "id": "gust",
    "name": "Gust",
    "size": "Light",
    "tier": "T2",
    "range": 500,
    "burstDps": 12000,
    "reload": 2.0,
    "family": "Kinetic Shotguns",
    "status": "Tier 2 Kinetic Shotgun"
  },
  {
    "id": "gauss",
    "name": "Gauss",
    "size": "Heavy",
    "tier": "T4",
    "range": 800,
    "burstDps": 19000,
    "reload": 8.0,
    "family": "Gauss Railguns",
    "status": "Tier 4 Defense Mitigating Railgun"
  },
  {
    "id": "weber",
    "name": "Weber",
    "size": "Medium",
    "tier": "T4",
    "range": 800,
    "burstDps": 14000,
    "reload": 8.0,
    "family": "Gauss Railguns",
    "status": "Tier 4 Defense Mitigating Railgun"
  },
  {
    "id": "volt",
    "name": "Volt",
    "size": "Light",
    "tier": "T4",
    "range": 800,
    "burstDps": 9500,
    "reload": 8.0,
    "family": "Gauss Railguns",
    "status": "Tier 4 Defense Mitigating Railgun"
  },
  {
    "id": "hel",
    "name": "Hel",
    "size": "Heavy",
    "tier": "T4",
    "range": 600,
    "burstDps": 23000,
    "reload": 15.0,
    "family": "Freeze Lasers",
    "status": "Tier 4 Cryogenic Particle Beam"
  },
  {
    "id": "skadi",
    "name": "Skadi",
    "size": "Medium",
    "tier": "T4",
    "range": 600,
    "burstDps": 17200,
    "reload": 15.0,
    "family": "Freeze Lasers",
    "status": "Tier 4 Cryogenic Particle Beam"
  },
  {
    "id": "snaer",
    "name": "Snaer",
    "size": "Light",
    "tier": "T4",
    "range": 600,
    "burstDps": 11500,
    "reload": 15.0,
    "family": "Freeze Lasers",
    "status": "Tier 4 Cryogenic Particle Beam"
  },
  {
    "id": "ue_glory",
    "name": "Ultimate Glory",
    "size": "Heavy",
    "tier": "UE",
    "range": 500,
    "burstDps": 46000,
    "reload": 2.5,
    "family": "Ultimate Energy Shotguns",
    "status": "Ultimate Energy Lockdown Shotgun"
  },
  {
    "id": "ue_corona",
    "name": "Ultimate Corona",
    "size": "Medium",
    "tier": "UE",
    "range": 500,
    "burstDps": 34500,
    "reload": 2.5,
    "family": "Ultimate Energy Shotguns",
    "status": "Ultimate Energy Lockdown Shotgun"
  },
  {
    "id": "ue_halo",
    "name": "Ultimate Halo",
    "size": "Light",
    "tier": "UE",
    "range": 500,
    "burstDps": 23000,
    "reload": 2.5,
    "family": "Ultimate Energy Shotguns",
    "status": "Ultimate Energy Lockdown Shotgun"
  },
  {
    "id": "ue_shocktrain",
    "name": "Ultimate Shocktrain",
    "size": "Medium",
    "tier": "UE",
    "range": 500,
    "burstDps": 38000,
    "reload": 4.0,
    "family": "Ultimate Lightning Chain",
    "status": "Ultimate Chain Lightning Sniper"
  },
  {
    "id": "ue_orkan",
    "name": "Ultimate Orkan",
    "size": "Medium",
    "tier": "UE",
    "range": 300,
    "burstDps": 36000,
    "reload": 12.0,
    "family": "Ultimate Kinetic Rockets",
    "status": "Ultimate Kinetic Splash Rockets"
  },
  {
    "id": "ue_calamity",
    "name": "Ultimate Calamity",
    "size": "Heavy",
    "tier": "UE",
    "range": 600,
    "burstDps": 44000,
    "reload": 4.0,
    "family": "Ultimate Lightning",
    "status": "Ultimate Arc Lightning Beam"
  },
  {
    "id": "ue_scourge",
    "name": "Ultimate Scourge",
    "size": "Medium",
    "tier": "UE",
    "range": 600,
    "burstDps": 33000,
    "reload": 4.0,
    "family": "Ultimate Lightning",
    "status": "Ultimate Arc Lightning Beam"
  },
  {
    "id": "ue_spark",
    "name": "Ultimate Spark",
    "size": "Light",
    "tier": "UE",
    "range": 600,
    "burstDps": 22000,
    "reload": 4.0,
    "family": "Ultimate Lightning",
    "status": "Ultimate Arc Lightning Beam"
  },
  {
    "id": "ue_avenger",
    "name": "Ultimate Avenger",
    "size": "Heavy",
    "tier": "UE",
    "range": 500,
    "burstDps": 42000,
    "reload": 7.0,
    "family": "Ultimate Gatlings",
    "status": "Ultimate Kinetic Gatling"
  },
  {
    "id": "ue_punisher_t",
    "name": "Ultimate Punisher T",
    "size": "Medium",
    "tier": "UE",
    "range": 500,
    "burstDps": 31500,
    "reload": 7.0,
    "family": "Ultimate Gatlings",
    "status": "Ultimate Kinetic Gatling"
  },
  {
    "id": "ue_punisher",
    "name": "Ultimate Punisher",
    "size": "Light",
    "tier": "UE",
    "range": 500,
    "burstDps": 21000,
    "reload": 7.0,
    "family": "Ultimate Gatlings",
    "status": "Ultimate Kinetic Gatling"
  },
  {
    "id": "ue_pulsar",
    "name": "Ultimate Pulsar",
    "size": "Medium",
    "tier": "UE",
    "range": 600,
    "burstDps": 30000,
    "reload": 4.0,
    "family": "Ultimate Lockdown",
    "status": "Ultimate Lockdown Rifle"
  },
  {
    "id": "ue_magnetar",
    "name": "Ultimate Magnetar",
    "size": "Light",
    "tier": "UE",
    "range": 600,
    "burstDps": 20000,
    "reload": 4.0,
    "family": "Ultimate Lockdown",
    "status": "Ultimate Lockdown Repeater"
  },
  {
    "id": "ue_dragoon",
    "name": "Ultimate Dragoon",
    "size": "Heavy",
    "tier": "UE",
    "range": 600,
    "burstDps": 35000,
    "reload": 4.0,
    "family": "Ultimate Energy Snipers",
    "status": "Ultimate Heavy Energy Sniper"
  },
  {
    "id": "ue_hussar",
    "name": "Ultimate Hussar",
    "size": "Medium",
    "tier": "UE",
    "range": 600,
    "burstDps": 26000,
    "reload": 4.0,
    "family": "Ultimate Energy Snipers",
    "status": "Ultimate Medium Energy Sniper"
  },
  {
    "id": "ue_ember",
    "name": "Ultimate Ember",
    "size": "Heavy",
    "tier": "UE",
    "range": 350,
    "burstDps": 40000,
    "reload": 4.0,
    "family": "Ultimate Flamethrowers",
    "status": "Ultimate Heavy Thermal Napalm"
  },
  {
    "id": "ue_igniter",
    "name": "Ultimate Igniter",
    "size": "Medium",
    "tier": "UE",
    "range": 350,
    "burstDps": 30000,
    "reload": 4.0,
    "family": "Ultimate Flamethrowers",
    "status": "Ultimate Medium Thermal Napalm"
  },
  {
    "id": "ue_blaze",
    "name": "Ultimate Blaze",
    "size": "Light",
    "tier": "UE",
    "range": 350,
    "burstDps": 20000,
    "reload": 4.0,
    "family": "Ultimate Flamethrowers",
    "status": "Ultimate Light Thermal Napalm"
  },
  {
    "id": "anguisher",
    "name": "Anguisher",
    "size": "Alpha",
    "tier": "T4",
    "range": 500,
    "burstDps": 52000,
    "reload": 6.0,
    "family": "Titan Sonic Piercing",
    "status": "Tier 4 Titan Sonic Piercing"
  },
  {
    "id": "ruiner",
    "name": "Ruiner",
    "size": "Beta",
    "tier": "T4",
    "range": 500,
    "burstDps": 39000,
    "reload": 6.0,
    "family": "Titan Sonic Piercing",
    "status": "Tier 4 Titan Sonic Piercing"
  },
  {
    "id": "inferno",
    "name": "Inferno",
    "size": "Alpha",
    "tier": "T4",
    "range": 350,
    "burstDps": 62000,
    "reload": 5.0,
    "family": "Titan Incendiary Blast",
    "status": "Tier 4 Titan Liquid Fire"
  },
  {
    "id": "pyro",
    "name": "Pyro",
    "size": "Beta",
    "tier": "T4",
    "range": 350,
    "burstDps": 46000,
    "reload": 5.0,
    "family": "Titan Incendiary Blast",
    "status": "Tier 4 Titan Liquid Fire"
  },
  {
    "id": "tonans",
    "name": "Tonans",
    "size": "Alpha",
    "tier": "T4",
    "range": 800,
    "burstDps": 58000,
    "reload": 8.0,
    "family": "Titan Hyper-Lightning",
    "status": "Tier 4 Titan Hyper Railgun"
  },
  {
    "id": "fulgur",
    "name": "Fulgur",
    "size": "Beta",
    "tier": "T4",
    "range": 800,
    "burstDps": 43500,
    "reload": 8.0,
    "family": "Titan Hyper-Lightning",
    "status": "Tier 4 Titan Hyper Railgun"
  },
  {
    "id": "veyron",
    "name": "Veyron",
    "size": "Alpha",
    "tier": "T4",
    "range": 200,
    "burstDps": 75000,
    "reload": 5.0,
    "family": "Titan Sonic Shotgun",
    "status": "Tier 4 Titan Acoustic Shotgun"
  },
  {
    "id": "evora",
    "name": "Evora",
    "size": "Beta",
    "tier": "T4",
    "range": 200,
    "burstDps": 56000,
    "reload": 5.0,
    "family": "Titan Sonic Shotgun",
    "status": "Tier 4 Titan Acoustic Shotgun"
  },
  {
    "id": "maha_vajra",
    "name": "Maha-Vajra",
    "size": "Alpha",
    "tier": "T4",
    "range": 500,
    "burstDps": 68000,
    "reload": 5.0,
    "family": "Titan Blast Shotgun",
    "status": "Tier 4 Titan Blast Kinetic"
  },
  {
    "id": "vajra",
    "name": "Vajra",
    "size": "Beta",
    "tier": "T4",
    "range": 500,
    "burstDps": 51000,
    "reload": 5.0,
    "family": "Titan Blast Shotgun",
    "status": "Tier 4 Titan Blast Kinetic"
  },
  {
    "id": "gargantua",
    "name": "Gargantua",
    "size": "Alpha",
    "tier": "T4",
    "range": 500,
    "burstDps": 48000,
    "reload": 6.0,
    "family": "Titan Gravity Siphon",
    "status": "Tier 4 Titan Siphon Vortex"
  },
  {
    "id": "pantagruel",
    "name": "Pantagruel",
    "size": "Beta",
    "tier": "T4",
    "range": 500,
    "burstDps": 36000,
    "reload": 6.0,
    "family": "Titan Gravity Siphon",
    "status": "Tier 4 Titan Siphon Vortex"
  },
  {
    "id": "dazzler",
    "name": "Dazzler",
    "size": "Alpha",
    "tier": "T4",
    "range": 600,
    "burstDps": 44000,
    "reload": 6.0,
    "family": "Titan Blind Laser",
    "status": "Tier 4 Titan Optical Blind"
  },
  {
    "id": "lantern",
    "name": "Lantern",
    "size": "Beta",
    "tier": "T4",
    "range": 600,
    "burstDps": 33000,
    "reload": 6.0,
    "family": "Titan Blind Laser",
    "status": "Tier 4 Titan Optical Blind"
  },
  {
    "id": "basilisk",
    "name": "Basilisk",
    "size": "Alpha",
    "tier": "T4",
    "range": 500,
    "burstDps": 50000,
    "reload": 6.0,
    "family": "Titan Acid",
    "status": "Tier 4 Titan Corrosive Acid"
  },
  {
    "id": "krait",
    "name": "Krait",
    "size": "Beta",
    "tier": "T4",
    "range": 500,
    "burstDps": 37500,
    "reload": 6.0,
    "family": "Titan Acid",
    "status": "Tier 4 Titan Corrosive Acid"
  },
  {
    "id": "cataclysm",
    "name": "Cataclysm",
    "size": "Alpha",
    "tier": "T3",
    "range": 600,
    "burstDps": 54000,
    "reload": 5.0,
    "family": "Titan Lock-on Arc",
    "status": "Tier 3 Titan Arc Lightning"
  },
  {
    "id": "cyclone",
    "name": "Cyclone",
    "size": "Beta",
    "tier": "T3",
    "range": 600,
    "burstDps": 40500,
    "reload": 5.0,
    "family": "Titan Lock-on Arc",
    "status": "Tier 3 Titan Arc Lightning"
  },
  {
    "id": "bulava",
    "name": "Bulava",
    "size": "Alpha",
    "tier": "T3",
    "range": 600,
    "burstDps": 46000,
    "reload": 8.0,
    "family": "Titan Rocket Mortar",
    "status": "Tier 3 Titan Homing Mortar"
  },
  {
    "id": "kisten",
    "name": "Kisten",
    "size": "Beta",
    "tier": "T3",
    "range": 600,
    "burstDps": 34500,
    "reload": 8.0,
    "family": "Titan Rocket Mortar",
    "status": "Tier 3 Titan Homing Mortar"
  },
  {
    "id": "grom",
    "name": "Grom",
    "size": "Alpha",
    "tier": "T3",
    "range": 500,
    "burstDps": 56000,
    "reload": 2.0,
    "family": "Titan Kinetic Shotgun",
    "status": "Tier 3 Titan Kinetic Shotgun"
  },
  {
    "id": "squall",
    "name": "Squall",
    "size": "Beta",
    "tier": "T3",
    "range": 500,
    "burstDps": 42000,
    "reload": 2.0,
    "family": "Titan Kinetic Shotgun",
    "status": "Tier 3 Titan Kinetic Shotgun"
  },
  {
    "id": "vengeance",
    "name": "Vengeance",
    "size": "Alpha",
    "tier": "T3",
    "range": 500,
    "burstDps": 48000,
    "reload": 8.0,
    "family": "Titan Machine Gun",
    "status": "Tier 3 Titan Gatling Cannon"
  },
  {
    "id": "retaliator",
    "name": "Retaliator",
    "size": "Beta",
    "tier": "T3",
    "range": 500,
    "burstDps": 36000,
    "reload": 8.0,
    "family": "Titan Machine Gun",
    "status": "Tier 3 Titan Gatling Cannon"
  },
  {
    "id": "tsar",
    "name": "Tsar",
    "size": "Alpha",
    "tier": "T3",
    "range": 500,
    "burstDps": 44000,
    "reload": 5.0,
    "family": "Titan Rocket Splash",
    "status": "Tier 3 Titan Heavy Rocket"
  },
  {
    "id": "rupture",
    "name": "Rupture",
    "size": "Beta",
    "tier": "T3",
    "range": 500,
    "burstDps": 33000,
    "reload": 5.0,
    "family": "Titan Rocket Splash",
    "status": "Tier 3 Titan Heavy Rocket"
  },
  {
    "id": "gendarme",
    "name": "Gendarme",
    "size": "Alpha",
    "tier": "T3",
    "range": 600,
    "burstDps": 45000,
    "reload": 5.0,
    "family": "Titan Plasma",
    "status": "Tier 3 Titan Plasma Sniper"
  },
  {
    "id": "cuirassier",
    "name": "Cuirassier",
    "size": "Beta",
    "tier": "T3",
    "range": 600,
    "burstDps": 33750,
    "reload": 5.0,
    "family": "Titan Plasma",
    "status": "Tier 3 Titan Plasma Sniper"
  },
  {
    "id": "arbitrator",
    "name": "Arbitrator",
    "size": "Alpha",
    "tier": "T4",
    "range": 800,
    "burstDps": 54000,
    "reload": 7.0,
    "family": "Titan Kinetic Sniper",
    "status": "Tier 4 Titan Armor Piercing Sniper"
  },
  {
    "id": "dispute",
    "name": "Dispute",
    "size": "Beta",
    "tier": "T4",
    "range": 800,
    "burstDps": 40500,
    "reload": 7.0,
    "family": "Titan Kinetic Sniper",
    "status": "Tier 4 Titan Armor Piercing Sniper"
  }
];
