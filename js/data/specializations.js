/* =============================================================================
   WAR ROBOTS — OFFICIAL SPECIALIZATIONS & MODULE SYSTEM (Update 10.5.2+)
   =============================================================================
   Structure:
   1. Basic Specialization (Base): Always active, provides backbone HP & Damage,
      and contains the Active Module slot.
   2. Additional Specializations:
      - Offense Specialization (Damage boosts & Nuclear/Overdrive module cells)
      - Defense Specialization (Durability/Defense Points & Repair/Immune module cells)
      - Class Specialization (Chassis Role-specific: Support, Brawler, Assassin, Sniper, Saboteur, Titan)
   ============================================================================= */

const ACTIVE_MODULES = [
  {
    id: "unstable_conduit",
    name: "Unstable Conduit",
    icon: "⚡",
    tier: "T4",
    cooldown: "15s",
    duration: "6s",
    cost: "40 Powercells",
    description: "Instantly restores 20% durability + 7% grey HP, grants +15% weapon damage, and enables high-tempo counter-assault."
  },
  {
    id: "shieldbreaker",
    name: "Shieldbreaker",
    icon: "🛡️",
    tier: "T4",
    cooldown: "18s",
    duration: "6s",
    cost: "20 Powercells",
    description: "Allows all equipped weapons and abilities to directly bypass Aegis, Absorber, and Ancile energy shields."
  },
  {
    id: "phase_shift",
    name: "Phase Shift",
    icon: "🌀",
    tier: "T4",
    cooldown: "20s",
    duration: "3s",
    cost: "40 Powercells",
    description: "Shifts the robot into an alternate dimension, granting complete invulnerability to all damage and status effects."
  },
  {
    id: "advanced_repair",
    name: "Advanced Repair Unit",
    icon: "💉",
    tier: "T4",
    cooldown: "15s",
    duration: "5s",
    cost: "40 Powercells",
    description: "Rapidly restores 50% max durability and significantly repairs lost grey (permanent) damage over 5 seconds."
  },
  {
    id: "repair_unit",
    name: "Repair Unit",
    icon: "💚",
    tier: "T2",
    cooldown: "18s",
    duration: "5s",
    cost: "20 Powercells",
    description: "Standard repair nanites restoring 25% max hull durability over 5 seconds."
  },
  {
    id: "quantum_radar",
    name: "Quantum Radar",
    icon: "👁️",
    tier: "T3",
    cooldown: "20s",
    duration: "6s",
    cost: "20 Powercells",
    description: "Allows the robot to target and lock onto enemy robots cloaked in Stealth mode."
  },
  {
    id: "deathmark",
    name: "Deathmark",
    icon: "🎯",
    tier: "T3",
    cooldown: "22s",
    duration: "6s",
    cost: "25 Powercells",
    description: "Marks target enemy, increasing all incoming weapon and ability damage taken by +20% for the entire team."
  },
  {
    id: "jump_unit",
    name: "Jump Unit",
    icon: "🚀",
    tier: "T3",
    cooldown: "25s",
    duration: "Instant",
    cost: "15 Powercells",
    description: "Launches the robot high into the air for strategic vantage, repositioning, and obstacle clearance."
  },
  {
    id: "lockdown_ammo",
    name: "Lockdown Ammo",
    icon: "⛓️",
    tier: "T3",
    cooldown: "18s",
    duration: "5s",
    cost: "20 Powercells",
    description: "Imbues all weapons with 100% lockdown accumulation, immobilizing targeted enemies on hit."
  }
];

const BASIC_SPECIALIZATION = {
  id: "basic",
  name: "Basic Specialization",
  badge: "⭐ BASE",
  description: "Permanent foundation of all combat platforms. Provides backbone durability, damage, base passive cells, and unlocks the Active Module slot.",
  isAlwaysActive: true,
  permanentEffects: [
    { name: "Backbone Durability", value: "+10% Max HP", stat: "hp", amount: 0.10 },
    { name: "Backbone Firepower", value: "+7% Weapon Damage", stat: "damage", amount: 0.07 }
  ],
  passiveCell: {
    id: "base_armor_link",
    name: "Base Subsystem Link",
    icon: "💠",
    effect: "+5% Defense Mitigation & Structural Integrity"
  }
};

const ADDITIONAL_SPECIALIZATION_PATHS = {
  offense: {
    id: "offense",
    name: "Offense Specialization",
    roleName: "Offense Focus",
    icon: "⚔️",
    badge: "⚔️ OFFENSE",
    color: "red",
    description: "Maximizes offensive aggression, burst multiplier ramp-up, armor penetration, and cycle throughput.",
    permanentEffects: [
      { name: "Aggression Matrix", value: "+8% Weapon Damage", stat: "damage", amount: 0.08 },
      { name: "Armor Piercing", value: "+5% Defense Mitigation", stat: "mitigation", amount: 0.05 }
    ],
    moduleCells: [
      {
        id: "nuclear_amplifier",
        name: "Nuclear Amplifier",
        icon: "⚛️",
        type: "Passive Module",
        desc: "Stacks +0.1% damage per 25k dealt. At 80 stacks: +80% damage bonus & +20% defense mitigation."
      },
      {
        id: "overdrive_unit",
        name: "Overdrive Unit",
        icon: "🔥",
        type: "Passive Module",
        desc: "Increases weapon damage by +25% when durability drops below 50% threshold."
      },
      {
        id: "balanced_unit",
        name: "Balanced Unit",
        icon: "⚖️",
        type: "Passive Module",
        desc: "Grants +9% weapon damage and +9% max hull durability."
      }
    ]
  },

  defense: {
    id: "defense",
    name: "Defense Specialization",
    roleName: "Defense Focus",
    icon: "🛡️",
    badge: "🛡️ DEFENSE",
    color: "emerald",
    description: "Maximizes hull endurance, shield absorption, defense point stacking, and grey damage recovery.",
    permanentEffects: [
      { name: "Titanium Plating", value: "+12% Max HP", stat: "hp", amount: 0.12 },
      { name: "Defense Matrix", value: "+25 Defense Points (20% Dmg Reduction)", stat: "defense_points", amount: 25 }
    ],
    moduleCells: [
      {
        id: "repair_amplifier",
        name: "Repair Amplifier",
        icon: "🔧",
        type: "Passive Module",
        desc: "Generates repair stacks upon taking damage. At 60 stacks: restores grey damage & grants +35 Defense Points."
      },
      {
        id: "immune_amplifier",
        name: "Immune Amplifier",
        icon: "🧪",
        type: "Passive Module",
        desc: "Grants bonus durability and permanent immunity to Freeze, Lockdown, and EMP effects."
      },
      {
        id: "fortifier_or_last_stand",
        name: "Fortifier / Last Stand",
        icon: "⏳",
        type: "Passive Module",
        desc: "+25% Physical & Energy Shield Capacity + Emergency 4.5s Invulnerability threshold."
      }
    ]
  },

  class_archetypes: {
    support: {
      id: "class_support",
      roleKey: "support",
      name: "Support Class Specialization",
      roleName: "Support Archetype",
      icon: "💖",
      badge: "💖 CLASS: SUPPORT",
      color: "cyan",
      matchingRoles: ["Support", "Healer", "Support / Energy Sniper"],
      description: "Tailored specifically for support & link platforms like Nuo, Weyland, Mender, Demeter, Nightingale, and Khepri.",
      permanentEffects: [
        { name: "System Acceleration", value: "+15% Ability Cooldown Speed", stat: "cooldown", amount: 0.15 },
        { name: "Tether & Link Resonance", value: "+10% Link Range & Durability Sharing", stat: "support", amount: 0.10 }
      ],
      moduleCells: [
        {
          id: "repair_amplifier",
          name: "Repair Amplifier",
          icon: "🔧",
          type: "Class Passive Cell",
          desc: "Restores grey damage and stacks continuous nanite repair during sustained support tether."
        },
        {
          id: "nuclear_amplifier",
          name: "Nuclear Amplifier",
          icon: "⚛️",
          type: "Class Passive Cell",
          desc: "Amplifies ally damage transfer and high-range volley output during flight/support mode."
        },
        {
          id: "fortifier",
          name: "Fortifier / Shield Cell",
          icon: "🔰",
          type: "Class Passive Cell",
          desc: "Boosts personal and linked energy shield regeneration by +25%."
        }
      ]
    },

    brawler: {
      id: "class_brawler",
      roleKey: "brawler",
      name: "Brawler Class Specialization",
      roleName: "Brawler Archetype",
      icon: "🥊",
      badge: "🥊 CLASS: BRAWLER",
      color: "amber",
      matchingRoles: ["Brawler", "Tank", "Assault Brawler", "Combat Brawler", "Heavy Brawler"],
      description: "Optimized for close-quarters durability monsters like Fenrir, Ravana, Revenant, Shell, Invader, and Curie.",
      permanentEffects: [
        { name: "CQC Reinforced Hull", value: "+15% Close-Range Durability", stat: "hp", amount: 0.15 },
        { name: "Brawler Tenacity", value: "+30 Defense Points below 50% HP", stat: "defense_points", amount: 30 }
      ],
      moduleCells: [
        {
          id: "repair_amplifier",
          name: "Repair Amplifier",
          icon: "🔧",
          type: "Class Passive Cell",
          desc: "Accelerates grey damage restoration and grants massive defense point bursts under fire."
        },
        {
          id: "immune_amplifier",
          name: "Immune Amplifier",
          icon: "🧪",
          type: "Class Passive Cell",
          desc: "Grants +10% max durability and immunity to lockdown, suppression, and freeze."
        },
        {
          id: "nuclear_amplifier",
          name: "Nuclear Amplifier",
          icon: "⚛️",
          type: "Class Passive Cell",
          desc: "Quickly maxes out damage stacks in point-blank slugfests for devastating output."
        }
      ]
    },

    assassin: {
      id: "class_assassin",
      roleKey: "assassin",
      name: "Assassin Class Specialization",
      roleName: "Assassin Archetype",
      icon: "🗡️",
      badge: "🗡️ CLASS: ASSASSIN",
      color: "purple",
      matchingRoles: ["Assassin", "Flanker", "Ambush", "Stealth Assassin", "Damage Dealer"],
      description: "Designed for high-speed strike & ambush units like Scorpion, Shenlou, Lynx, Crisis, and Angler.",
      permanentEffects: [
        { name: "Surge Lethality", value: "+12% Burst Weapon Damage", stat: "damage", amount: 0.12 },
        { name: "Thruster Overclock", value: "+10 km/h Ability Speed", stat: "speed", amount: 10 }
      ],
      moduleCells: [
        {
          id: "nuclear_amplifier",
          name: "Nuclear Amplifier",
          icon: "⚛️",
          type: "Class Passive Cell",
          desc: "Rapidly ramps up weapon damage during sudden target assassinations."
        },
        {
          id: "cloaking_unit",
          name: "Cloaking Unit",
          icon: "👻",
          type: "Class Passive Cell",
          desc: "Automatically triggers 5s Stealth and speed boost when taking sudden critical damage."
        },
        {
          id: "nitro_unit",
          name: "Nitro Unit",
          icon: "⚡",
          type: "Class Passive Cell",
          desc: "+15% baseline movement speed while durability remains above 70%."
        }
      ]
    },

    sniper: {
      id: "class_sniper",
      roleKey: "sniper",
      name: "Sniper / Energy Class Specialization",
      roleName: "Sniper Archetype",
      icon: "🔭",
      badge: "🔭 CLASS: SNIPER",
      color: "blue",
      matchingRoles: ["Sniper", "Long Range", "Artillery", "Energy Sniper"],
      description: "Calibrated for precision long-range platforms like Nuo, Crisis, Erebus, Behemoth, Bagliore, and Siren.",
      permanentEffects: [
        { name: "Precision Optics", value: "+10% Weapon Damage past 400m", stat: "damage", amount: 0.10 },
        { name: "Target Acquisition", value: "+20% Faster Lock-on Speed", stat: "lockon", amount: 0.20 }
      ],
      moduleCells: [
        {
          id: "nuclear_amplifier",
          name: "Nuclear Amplifier",
          icon: "⚛️",
          type: "Class Passive Cell",
          desc: "Stacks high-damage multipliers from safe firing distances."
        },
        {
          id: "overdrive_unit",
          name: "Overdrive Unit",
          icon: "🔥",
          type: "Class Passive Cell",
          desc: "Provides instant +25% damage boost to eliminate high-value targets."
        },
        {
          id: "last_stand",
          name: "Last Stand",
          icon: "⏳",
          type: "Class Passive Cell",
          desc: "Grants 4.5s invulnerability barrier if intercepted by enemy flankers."
        }
      ]
    },

    saboteur: {
      id: "class_saboteur",
      roleKey: "saboteur",
      name: "Saboteur / Beacon Runner Class Specialization",
      roleName: "Saboteur Archetype",
      icon: "🏃",
      badge: "🏃 CLASS: SABOTEUR",
      color: "emerald",
      matchingRoles: ["Saboteur", "Beacon Runner", "Scout", "Infiltrator", "Tactical"],
      description: "Tailored for high-mobility beacon runners like Imugi, Nether, Kumiho, Loki, Skyros, and Phantom.",
      permanentEffects: [
        { name: "Beacon Dominance", value: "+20% Beacon Capture Speed", stat: "capture", amount: 0.20 },
        { name: "Kinetic Evasion", value: "+12% Base Movement Velocity", stat: "speed", amount: 12 }
      ],
      moduleCells: [
        {
          id: "nitro_unit",
          name: "Nitro Unit",
          icon: "⚡",
          type: "Class Passive Cell",
          desc: "Grants maximum speed to capture opening beacons before enemy arrival."
        },
        {
          id: "immune_amplifier",
          name: "Immune Amplifier",
          icon: "🧪",
          type: "Class Passive Cell",
          desc: "Prevents enemies from locking down or suppressing during beacon captures."
        },
        {
          id: "cloaking_unit",
          name: "Cloaking Unit",
          icon: "👻",
          type: "Class Passive Cell",
          desc: "Emergency stealth cloaking when defending or capturing contested beacons."
        }
      ]
    },

    titan_class: {
      id: "class_titan",
      roleKey: "titan",
      name: "Titan Flagship Specialization",
      roleName: "Titan Archetype",
      icon: "👑",
      badge: "👑 TITAN FLAGSHIP",
      color: "red",
      matchingRoles: ["Titan", "Titan Brawler", "Titan Slayer", "Titan Support"],
      description: "Colossal flagship specialization matrix engineered for capital combat Titans.",
      permanentEffects: [
        { name: "Colossal Hull Frame", value: "+15% Titan Base Durability", stat: "hp", amount: 0.15 },
        { name: "Capital Firepower", value: "+10% Alpha & Beta Weapon Damage", stat: "damage", amount: 0.10 }
      ],
      moduleCells: [
        {
          id: "titan_repair_amp",
          name: "Titan Repair Amplifier",
          icon: "🔧",
          type: "Titan Specialization Cell",
          desc: "Restores massive Titan hull and grey durability stacks under focus fire."
        },
        {
          id: "titan_damage_controller",
          name: "Titan Damage Controller",
          icon: "🛡️",
          type: "Titan Specialization Cell",
          desc: "Reduces grey damage suffered and grants immunity to defense mitigation."
        },
        {
          id: "titan_grand_armor",
          name: "Titan Grand Armor Kit",
          icon: "🔰",
          type: "Titan Specialization Cell",
          desc: "+27% bonus Titan durability buffer."
        }
      ]
    }
  }
};

/**
 * Helper to get the matching Class Specialization for a given robot role
 */
function getClassSpecializationForBot(robotRole, isTitan = false) {
  if (isTitan) return ADDITIONAL_SPECIALIZATION_PATHS.class_archetypes.titan_class;
  if (!robotRole) return ADDITIONAL_SPECIALIZATION_PATHS.class_archetypes.brawler;

  const roleLower = robotRole.toLowerCase();
  if (roleLower.includes("support") || roleLower.includes("healer")) {
    return ADDITIONAL_SPECIALIZATION_PATHS.class_archetypes.support;
  }
  if (roleLower.includes("sniper") || roleLower.includes("long range") || roleLower.includes("artillery")) {
    return ADDITIONAL_SPECIALIZATION_PATHS.class_archetypes.sniper;
  }
  if (roleLower.includes("assassin") || roleLower.includes("ambush") || roleLower.includes("stealth") || roleLower.includes("flanker")) {
    return ADDITIONAL_SPECIALIZATION_PATHS.class_archetypes.assassin;
  }
  if (roleLower.includes("saboteur") || roleLower.includes("runner") || roleLower.includes("scout") || roleLower.includes("tactical")) {
    return ADDITIONAL_SPECIALIZATION_PATHS.class_archetypes.saboteur;
  }
  return ADDITIONAL_SPECIALIZATION_PATHS.class_archetypes.brawler;
}

if (typeof window !== 'undefined') {
  window.ACTIVE_MODULES = ACTIVE_MODULES;
  window.BASIC_SPECIALIZATION = BASIC_SPECIALIZATION;
  window.ADDITIONAL_SPECIALIZATION_PATHS = ADDITIONAL_SPECIALIZATION_PATHS;
  window.getClassSpecializationForBot = getClassSpecializationForBot;
}
