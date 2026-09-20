/* WRBrain - Master Specializations Database (Active & Passive Modules & Matrices) */

const MASTER_SPECIALIZATIONS = {
  active: [
    {
      id: "unstable_conduit",
      name: "Unstable Conduit",
      tier: "T4",
      icon: "⚡",
      cooldown: "20s",
      category: "Active Utility",
      desc: "Emergency combat surge restoring 35% Durability, repairing 25% Grey Damage, and increasing Weapon Damage by +15% for 6s.",
      stats: { heal: "35%", greyHeal: "25%", damageBuff: "+15%" }
    },
    {
      id: "phase_shift",
      name: "Phase Shift",
      tier: "T3",
      icon: "🌀",
      cooldown: "35s",
      category: "Active Defense",
      desc: "Drifts into an alternate dimension for 3 seconds, granting total invulnerability to all incoming attacks, status effects, and lock-ons.",
      stats: { invulnerability: "3s", cleanse: "All Debuffs" }
    },
    {
      id: "shieldbreaker",
      name: "Shieldbreaker",
      tier: "T3",
      icon: "🗡️",
      cooldown: "25s",
      category: "Active Assault",
      desc: "Overcharges weapon targeting matrices for 6 seconds, allowing all equipped weapons to bypass Absorber, Aegis, and Ancile energy shields.",
      stats: { shieldPenetration: "100%", duration: "6s" }
    },
    {
      id: "advanced_repair",
      name: "Advanced Repair Unit",
      tier: "T3",
      icon: "💉",
      cooldown: "20s",
      category: "Active Defense",
      desc: "High-output nanite repair array restoring 50% max durability and 35% grey damage over 4 seconds with bonus defense points.",
      stats: { heal: "50%", greyHeal: "35%", duration: "4s" }
    },
    {
      id: "deathmark",
      name: "Deathmark",
      tier: "T3",
      icon: "🎯",
      cooldown: "25s",
      category: "Active Assault",
      desc: "Designates target enemy with laser lock-on for 6 seconds, amplifying all allied and personal damage dealt to target by +20%.",
      stats: { damageAmp: "+20%", range: "600m", duration: "6s" }
    },
    {
      id: "quantum_radar",
      name: "Quantum Radar",
      tier: "T2",
      icon: "📡",
      cooldown: "25s",
      category: "Active Recon",
      desc: "Activates quantum optical sensors for 6 seconds, allowing weapons to lock onto and track stealth-cloaked enemies.",
      stats: { stealthDetection: "Active", duration: "6s" }
    },
    {
      id: "jump_unit",
      name: "Jump Unit",
      tier: "T2",
      icon: "🚀",
      cooldown: "25s",
      category: "Active Agility",
      desc: "Fires high-thrust kinetic booster rockets, launching robot 50 meters into the air for ambush strikes and obstacle bypass.",
      stats: { verticalThrust: "50m", cooldown: "25s" }
    },
    {
      id: "lockdown_ammo",
      name: "Lockdown Ammo",
      tier: "T2",
      icon: "🔒",
      cooldown: "25s",
      category: "Active Support",
      desc: "Infuses next weapon salvos with electromagnetic disruption particles, instantly immobilizing targeted enemies for 5 seconds.",
      stats: { lockdownDuration: "5s", duration: "6s" }
    }
  ],

  passive: [
    {
      id: "nuclear_amplifier",
      name: "Nuclear Amplifier",
      tier: "T4",
      icon: "☢️",
      category: "Assault Amp",
      desc: "For every 25,000 damage dealt, grants +0.1% damage stack (up to +80% at 80 stacks). At max stacks, grants +20% Defense Mitigation and continuous Grey Damage repair.",
      stats: { maxDamage: "+80%", defenseMitigation: "+20%", greyRepair: "Active" }
    },
    {
      id: "repair_amplifier",
      name: "Repair Amplifier",
      tier: "T4",
      icon: "🛡️",
      category: "Defense Amp",
      desc: "For every 9% durability lost, gains 1 stack granting +0.03% regeneration and +0.45 Defense Points (up to 60 stacks). At max stacks, converts damage into grey HP restoration.",
      stats: { maxStacks: "60", greyHpConversion: "Active", maxDefensePoints: "+35 DP" }
    },
    {
      id: "immune_amplifier",
      name: "Immune Amplifier",
      tier: "T4",
      icon: "🧬",
      category: "Immunity Amp",
      desc: "Passively increases base HP by +10% and speed by +5 km/h. As damage is received, builds stacks granting permanent immunity to Freeze, Lockdown, and EMP.",
      stats: { hpBonus: "+10%", speedBonus: "+5 km/h", immunities: "Freeze / Lockdown / EMP" }
    },
    {
      id: "last_stand",
      name: "Last Stand",
      tier: "T4",
      icon: "⭐",
      category: "Emergency Defense",
      desc: "When durability drops below 30%, activates an impenetrable invulnerability barrier for 4.5 seconds, saving the robot from lethal bursts.",
      stats: { threshold: "<30% HP", invulnerability: "4.5s", cooldown: "Once per spawn" }
    },
    {
      id: "fortifier",
      name: "Fortifier",
      tier: "T4",
      icon: "🏰",
      category: "Shield Enhancer",
      desc: "Overclocks all defensive shielding systems: +20% Physical Shield HP, +25% Aegis & Absorber Shield Capacity, and +100% Shield Recharge Rate.",
      stats: { shieldCapacity: "+25%", rechargeRate: "+100%" }
    },
    {
      id: "cloaking_unit",
      name: "Cloaking Unit",
      tier: "T4",
      icon: "🕶️",
      category: "Stealth Trigger",
      desc: "Upon taking 10% damage in under 3 seconds, triggers automatic Radar Stealth for 5 seconds.",
      stats: { stealthDuration: "5s", triggerThreshold: "10% HP in 3s" }
    },
    {
      id: "balanced_unit",
      name: "Balanced Unit",
      tier: "T4",
      icon: "⚖️",
      category: "Hybrid Boost",
      desc: "Provides synchronized tactical enhancement: +12% permanent Weapon Damage and +12% permanent Robot Max Durability.",
      stats: { damageBuff: "+12%", hpBuff: "+12%" }
    },
    {
      id: "nitro_unit",
      name: "Nitro Unit",
      tier: "T3",
      icon: "🏎️",
      category: "Speed Accelerator",
      desc: "Injects pressurized nitro fuels into locomotive thrusters, granting +15 km/h top speed while above 70% durability.",
      stats: { speedBuff: "+15 km/h", threshold: ">70% HP" }
    },
    {
      id: "overdrive_unit",
      name: "Overdrive Unit",
      tier: "T3",
      icon: "🔥",
      category: "Low-HP Assault",
      desc: "When durability drops below 50%, activates overclocked reactor overdrive delivering +25% continuous weapon firepower.",
      stats: { damageBuff: "+25%", threshold: "<50% HP" }
    },
    {
      id: "heavy_armor_kit",
      name: "Heavy Armor Kit",
      tier: "T3",
      icon: "🧱",
      category: "Armor Reinforcement",
      desc: "Heavy alloy composite chassis plating providing a flat +15% permanent Durability boost.",
      stats: { hpBuff: "+15%" }
    },
    {
      id: "thermonuclear_reactor",
      name: "Thermonuclear Reactor",
      tier: "T3",
      icon: "💥",
      category: "Raw Firepower",
      desc: "Auxiliary high-energy plasma reactor providing a flat +10% permanent Weapon Damage multiplier.",
      stats: { damageBuff: "+10%" }
    },
    {
      id: "anticontrol",
      name: "Anticontrol",
      tier: "T4",
      icon: "🛡️",
      category: "Status Purge",
      desc: "Instantly cleanses Lockdown, Freeze, and Suppression debuffs upon application with temporary 5s status immunity.",
      stats: { autoCleanse: "Immediate", immunityWindow: "5s" }
    }
  ]
};

const SPECIALIZATION_PRESETS = [
  {
    id: "meta_trinity",
    name: "💥 Meta Amplifier Trinity (Brawler / Assault)",
    desc: "The premier competitive meta setup: Nuclear Amplifier for escalating damage, Repair Amplifier for sustain/grey HP, and Immune Amplifier for speed and debuff immunities.",
    active: "unstable_conduit",
    passives: ["nuclear_amplifier", "repair_amplifier", "immune_amplifier"]
  },
  {
    id: "fortress_tank",
    name: "🛡️ Immortal Juggernaut (Ultra Tank)",
    desc: "Maximizes survivability and armor stacking with dual Repair Amplifiers, Heavy Armor Kit, and Advanced Repair for endless sustain under heavy fire.",
    active: "advanced_repair",
    passives: ["repair_amplifier", "repair_amplifier", "heavy_armor_kit"]
  },
  {
    id: "beacon_assassin",
    name: "⚡ High-Speed Beacon Assassin (Agility / Stealth)",
    desc: "Designed for fast beacon capture and burst ambushes with high locomotive speed, stealth on critical damage, and dimensional Phase Shift.",
    active: "phase_shift",
    passives: ["nuclear_amplifier", "nitro_unit", "cloaking_unit"]
  },
  {
    id: "artillery_sniper",
    name: "🎯 Extreme Range Shieldbreaker (Sniper / Artillery)",
    desc: "Penetrates Absorber and Aegis energy shields while stacking high raw damage bonuses for devastating long-distance volleys.",
    active: "shieldbreaker",
    passives: ["nuclear_amplifier", "thermonuclear_reactor", "overdrive_unit"]
  },
  {
    id: "survivor_clutch",
    name: "⭐ Clutch Survivor (Last Stand)",
    desc: "Guarantees a 4.5s invulnerability safety net when dropping low, paired with Nuclear Amp and Immune Amp for lethal counter-attacks.",
    active: "phase_shift",
    passives: ["nuclear_amplifier", "immune_amplifier", "last_stand"]
  }
];
