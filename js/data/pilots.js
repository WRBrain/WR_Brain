/* WRBrain - Master Pilots & Skills Database */

const MASTER_PILOTS = [
  {
    "id": "grey_condor",
    "name": "Grey",
    "bot": "Condor",
    "tier": "T4",
    "skill": "Apex Predator: +25% Sonic Scream damage & +15% HP repair on flight kill",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Destroyer",
      "Speed Shooter",
      "Deft Survivor",
      "Master Gunsmith"
    ]
  },
  {
    "id": "maya_patel",
    "name": "Maya Patel",
    "bot": "Raptor",
    "tier": "T4",
    "skill": "Comet Vanguard: +35% Defense Points and +20% Reflector reflection on landing",
    "skills": [
      "Armor Expert",
      "Tough Guy",
      "Mechanic",
      "Dodger",
      "Quartermaster",
      "Wonderworker",
      "Road Hog"
    ]
  },
  {
    "id": "curtis_drake",
    "name": "Curtis Drake",
    "bot": "Pathfinder",
    "tier": "T4",
    "skill": "Hunter's Mark: +3s Track duration & +15% team bonus damage against tracked foes",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Sharpshooter",
      "Master Gunsmith",
      "Deft Survivor",
      "Invulnerable Raider"
    ]
  },
  {
    "id": "zoe_kamau",
    "name": "Zoe Kamau",
    "bot": "Curie",
    "tier": "T4",
    "skill": "Turret Overclock: +30% turret fire rate & instant 20% Aegis shield on ability trigger",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Dodger",
      "Tough Guy",
      "Energy Shield Expert",
      "Deft Survivor"
    ]
  },
  {
    "id": "captain_thorne",
    "name": "Captain Thorne",
    "bot": "Shenlou",
    "tier": "T4",
    "skill": "Phase Blitz: Backstab teleport releases an EMP pulse silencing target abilities for 2.5s",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Master Gunsmith",
      "Speed Shooter",
      "Mechanic",
      "Deft Survivor",
      "Destroyer"
    ]
  },
  {
    "id": "nathan_fleming",
    "name": "Nathan Fleming",
    "bot": "Dagon",
    "tier": "T4",
    "skill": "Aegis Resurgence: +50% Aegis recharge rate and +15% weapon damage while shield holds",
    "skills": [
      "Crazy Electrician",
      "Energy Shield Expert",
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Dodger"
    ]
  },
  {
    "id": "vepkhia",
    "name": "Vepkhia",
    "bot": "Ochokochi",
    "tier": "T4",
    "skill": "Stampede Breaker: +2s Stampede duration & 40% damage-to-repair conversion during charge",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Tough Guy",
      "Mechanic",
      "Deft Survivor",
      "Dodger",
      "Wonderworker"
    ]
  },
  {
    "id": "stefan_benson",
    "name": "Stefan Benson",
    "bot": "Ophion",
    "tier": "T4",
    "skill": "Viper Ascendancy: Built-in venom pierces 30% Defense Points with 100% blast immunity",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Destroyer",
      "Master Gunsmith",
      "Dodger",
      "Speed Shooter"
    ]
  },
  {
    "id": "rolf_garcia",
    "name": "Rolf Garcia",
    "bot": "Nether",
    "tier": "T4",
    "skill": "Quinquuple Dash: Grants a 5th dash charge and repairs 7% durability on each dash",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Dodger",
      "Deft Survivor",
      "Speed Shooter"
    ]
  },
  {
    "id": "captain_clyde",
    "name": "Captain Clyde",
    "bot": "Mars",
    "tier": "T4",
    "skill": "Remote Ordnance: +35% remote turret fire rate with autonomous mini-Aegis bubble",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Destroyer",
      "Energy Shield Expert",
      "Crazy Electrician",
      "Dodger"
    ]
  },
  {
    "id": "victoria_bloom",
    "name": "Victoria Bloom",
    "bot": "Seraph",
    "tier": "T4",
    "skill": "Seraphic Radiance: +3s Skyward flight duration & +20% electric strike damage",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Destroyer",
      "Master Gunsmith",
      "Dodger",
      "Wonderworker"
    ]
  },
  {
    "id": "misaki_misha",
    "name": "Misaki & Misha",
    "bot": "Siren / Harpy",
    "tier": "T4",
    "skill": "Immunity Protocol: Complete immunity to Freeze, Lockdown, and Suppression during flight",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Destroyer",
      "Master Gunsmith",
      "Deft Survivor",
      "Dodger"
    ]
  },
  {
    "id": "bernadette_wolff",
    "name": "Bernadette Wolff",
    "bot": "Fenrir",
    "tier": "T4",
    "skill": "Unstoppable Resilience: Replaces Aegis with massive +60% base durability in Defense Mode",
    "skills": [
      "Armor Expert",
      "Tough Guy",
      "Mechanic",
      "Road Hog",
      "Master Gunsmith",
      "Dodger",
      "Invulnerable Raider"
    ]
  },
  {
    "id": "vasiliy",
    "name": "Vasiliy",
    "bot": "Revenant",
    "tier": "T4",
    "skill": "Aggressive Teleport: Extended blink duration with full negative status purge on trigger",
    "skills": [
      "Armor Expert",
      "Tough Guy",
      "Mechanic",
      "Road Hog",
      "Deft Survivor",
      "Dodger",
      "Master Gunsmith"
    ]
  },
  {
    "id": "river_chase",
    "name": "River Chase",
    "bot": "Typhon",
    "tier": "T4",
    "skill": "Blackout Overcharge: +25% bonus weapon damage for 5s after firing Blackout",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Energy Shield Expert",
      "Crazy Electrician",
      "Destroyer"
    ]
  },
  {
    "id": "ash_skarsgard",
    "name": "Ash Skarsgard",
    "bot": "Scorpion",
    "tier": "T4",
    "skill": "Phantom Infiltration: Grants 5 seconds of Stealth immediately upon Backstab teleport",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Speed Shooter",
      "Deft Survivor",
      "Dodger"
    ]
  },
  {
    "id": "arnav_poe",
    "name": "Arnav Poe",
    "bot": "Ravana",
    "tier": "T4",
    "skill": "Transcendent Charge: Grants Ravana an additional 3rd Transcendence ability charge",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Dodger",
      "Master Gunsmith",
      "Deft Survivor",
      "Wonderworker"
    ]
  },
  {
    "id": "appm_3tr",
    "name": "APPM-3TR",
    "bot": "Demeter",
    "tier": "T4",
    "skill": "Repair Core: Demeter repairs non-repairable grey damage during Absorber shield",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Dodger",
      "Wonderworker",
      "True Ace",
      "Deft Survivor"
    ]
  },
  {
    "id": "ponchy",
    "name": "Ponchy",
    "bot": "Khepri",
    "tier": "T4",
    "skill": "Bond Mastery: Increases speed buff and repairs both Khepri and tethered ally continuously",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "True Ace",
      "Dodger",
      "Master Gunsmith",
      "Tough Guy"
    ]
  },
  {
    "id": "markus",
    "name": "Markus",
    "bot": "Angler",
    "tier": "T4",
    "skill": "Electric Vortex: Blinds enemies 50% faster and restores 10% durability upon entering shift",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Dodger",
      "Deft Survivor",
      "Tough Guy"
    ]
  },
  {
    "id": "sati_patel",
    "name": "Sati Patel",
    "bot": "Lynx",
    "tier": "T4",
    "skill": "Ferocious Execution: Higher execution threshold for built-in cannon and extended stealth",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Speed Shooter",
      "Deft Survivor",
      "Dodger"
    ]
  },
  {
    "id": "theseus",
    "name": "Theseus",
    "bot": "Skyros",
    "tier": "T4",
    "skill": "Impenetrable Shell: Ball Mode defense points cannot be mitigated by Reaper or Titan weapons",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Tough Guy",
      "Dodger",
      "Invulnerable Raider",
      "Wonderworker"
    ]
  },
  {
    "id": "andrey_knyazev",
    "name": "Andrey Knyazev",
    "bot": "Behemoth",
    "tier": "T4",
    "skill": "Siege Fortress: In Siege Mode, Behemoth gains +15% weapon range and +40 Defense Points",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Sharpshooter",
      "Speed Shooter",
      "Dodger"
    ]
  },
  {
    "id": "clive_vicious",
    "name": "Clive Vicious",
    "bot": "Blitz",
    "tier": "T4",
    "skill": "Craze Armor: Replaces Aegis shield with +80% Defense Points during Break-in ability",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Deft Survivor",
      "Dodger",
      "Tough Guy"
    ]
  },
  {
    "id": "thomas_mindread",
    "name": "Thomas Mindread",
    "bot": "Leech",
    "tier": "T4",
    "skill": "Adrenaline Rush: Leech gains +35% movement speed while Repulse is active",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Dodger",
      "Deft Survivor",
      "Speed Shooter"
    ]
  },
  {
    "id": "kyle_rogers_hawk",
    "name": "Kyle Rogers",
    "bot": "Hawk",
    "tier": "T4",
    "skill": "Lockdown Immunity: Hawk becomes completely immune to Lockdown and Suppression effects",
    "skills": [
      "Armor Expert",
      "Road Hog",
      "Mechanic",
      "Master Gunsmith",
      "Destroyer",
      "Speed Shooter",
      "Dodger"
    ]
  },
  {
    "id": "yang_lee_titan",
    "name": "Yang Lee",
    "bot": "Any Titan",
    "tier": "T4",
    "skill": "Titan Sensor Lock: Bypasses enemy Stealth (Quantum Radar) & grants +15% Titan weapon damage",
    "skills": [
      "Titan Armor Expert",
      "Titan Accelerator",
      "Titan Destroyer",
      "Titan Mechanic",
      "Titan Master Gunsmith"
    ]
  }
];

const MASTER_PILOT_SKILLS = [
  {
    "id": "armor_expert",
    "name": "Armor Expert",
    "tier": "T4",
    "bonus": "+15% Base Durability",
    "desc": "Increases robot maximum hull integrity."
  },
  {
    "id": "road_hog",
    "name": "Road Hog",
    "tier": "T4",
    "bonus": "+10% Movement Speed",
    "desc": "Boosts baseline locomotive acceleration."
  },
  {
    "id": "mechanic",
    "name": "Mechanic",
    "tier": "T4",
    "bonus": "0.7% HP Repair / Sec",
    "desc": "Continuous passive hull nanite restoration."
  },
  {
    "id": "master_gunsmith",
    "name": "Master Gunsmith",
    "tier": "T4",
    "bonus": "+5% All Weapon Damage",
    "desc": "Enhances damage across all equipped hardpoints."
  },
  {
    "id": "deft_survivor",
    "name": "Deft Survivor",
    "tier": "T4",
    "bonus": "Instant Ability Reset @ 50% HP",
    "desc": "Instantly recharges robot active ability upon crossing half health."
  },
  {
    "id": "dodger",
    "name": "Dodger",
    "tier": "T4",
    "bonus": "-25% Module Cooldown",
    "desc": "Reduces reload delay on active modules."
  },
  {
    "id": "tough_guy",
    "name": "Tough Guy",
    "tier": "T4",
    "bonus": "+18.75% Durability (-5% Damage)",
    "desc": "Heavily strengthens armor plating with minor weapon output penalty."
  },
  {
    "id": "destroyer",
    "name": "Destroyer",
    "tier": "T4",
    "bonus": "+12.5% Built-in Weapon Damage",
    "desc": "Supercharges onboard system weapons."
  },
  {
    "id": "speed_shooter",
    "name": "Speed Shooter",
    "tier": "T4",
    "bonus": "-30% Weapon Acceleration Time",
    "desc": "Rapidly brings rotary kinetic weapons to maximum firing rate."
  },
  {
    "id": "energy_shield_expert",
    "name": "Energy Shield Expert",
    "tier": "T4",
    "bonus": "+20% Shield Capacity",
    "desc": "Strengthens Aegis and Absorber containment fields."
  },
  {
    "id": "crazy_electrician",
    "name": "Crazy Electrician",
    "tier": "T4",
    "bonus": "+25% Shield Recharge Rate",
    "desc": "Accelerates shield field regeneration cycle."
  },
  {
    "id": "true_ace",
    "name": "True Ace",
    "tier": "T4",
    "bonus": "+15% Repair Output",
    "desc": "Amplifies friendly healing beam efficiency."
  },
  {
    "id": "wonderworker",
    "name": "Wonderworker",
    "tier": "T4",
    "bonus": "Repair 7.5% HP on Ability Trigger",
    "desc": "Injects rapid repair serum on each ability use."
  }
];

function getDefaultPilotSkills(role) {
  const defaultMap = {
    "Brawler": ["armor_expert", "road_hog", "mechanic", "tough_guy", "master_gunsmith", "deft_survivor", "dodger"],
    "Assassin": ["road_hog", "master_gunsmith", "deft_survivor", "destroyer", "armor_expert", "mechanic", "speed_shooter"],
    "Support": ["armor_expert", "true_ace", "mechanic", "road_hog", "dodger", "wonderworker", "energy_shield_expert"],
    "Sniper": ["master_gunsmith", "sharpshooter", "speed_shooter", "armor_expert", "mechanic", "road_hog", "destroyer"],
    "Tank": ["armor_expert", "tough_guy", "mechanic", "energy_shield_expert", "crazy_electrician", "dodger", "road_hog"]
  };
  const skillIds = defaultMap[role] || defaultMap["Brawler"];
  return skillIds.map(id => ({ id, tier: "T4" }));
}

if (typeof window !== 'undefined') window.getDefaultPilotSkills = getDefaultPilotSkills;
if (typeof globalThis !== 'undefined') globalThis.getDefaultPilotSkills = getDefaultPilotSkills;

