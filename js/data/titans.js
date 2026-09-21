/* WRBrain - Master Titans Database (Auto-compiled from data/titans/) */

const TITAN_WEAPON_FAMILIES = {
  "Titan Sonic Piercing": {
    name: "Titan Sonic Piercing (Anguisher & Ruiner)",
    desc: "Rapid acoustic penetrators dealing unhealable grey damage while penetrating reflector shields.",
    Alpha: "anguisher",
    Beta: "ruiner"
  },
  "Titan Incendiary Blast": {
    name: "Titan Liquid Fire (Inferno & Pyro)",
    desc: "Colossal titan flamethrowers melting through all energy and physical defense shields.",
    Alpha: "inferno",
    Beta: "pyro"
  },
  "Titan Hyper-Lightning": {
    name: "Titan Hyper Railgun Arc (Tonans & Fulgur)",
    desc: "Long-range 800m lightning railguns delivering titanic single-shot alpha strikes with 100% defense mitigation.",
    Alpha: "tonans",
    Beta: "fulgur"
  },
  "Titan Sonic Shotgun": {
    name: "Titan Acoustic Shockwave (Veyron & Evora)",
    desc: "Close-range 200m titan acoustic shotguns inflicting permanent unhealable grey damage.",
    Alpha: "veyron",
    Beta: "evora"
  },
  "Titan Blast Shotgun": {
    name: "Titan Blast Kinetic (Maha-Vajra & Vajra)",
    desc: "500m blast shotguns applying rapid explosive stacks that detonate massive kinetic area shockwaves.",
    Alpha: "maha_vajra",
    Beta: "vajra"
  },
  "Titan Gravity Siphon": {
    name: "Titan Gravity Siphon (Gargantua & Pantagruel)",
    desc: "Area vortex emitters draining health from multiple targets simultaneously through obstacles.",
    Alpha: "gargantua",
    Beta: "pantagruel"
  },
  "Titan Blind Laser": {
    name: "Titan Optical Blind (Dazzler & Lantern)",
    desc: "600m optical laser beams inflicting total blindness on enemy targeting and lock-on systems.",
    Alpha: "dazzler",
    Beta: "lantern"
  },
  "Titan Acid": {
    name: "Titan Sub-Atomic Corrosive (Basilisk & Krait)",
    desc: "Heavy titan acid cannons inflicting massive corrosive damage over time.",
    Alpha: "basilisk",
    Beta: "krait"
  },
  "Titan Lock-on Arc": {
    name: "Titan High-Voltage Arc (Cataclysm & Cyclone)",
    desc: "Close-in lightning arcs dealing up to 300% amplified damage under 100m distance.",
    Alpha: "cataclysm",
    Beta: "cyclone"
  },
  "Titan Rocket Mortar": {
    name: "Titan Homing Artillery (Bulava & Kisten)",
    desc: "Top-attack guided missile salvos launching over obstacles with high trajectory.",
    Alpha: "bulava",
    Beta: "kisten"
  },
  "Titan Kinetic Shotgun": {
    name: "Titan Heavy Shotgun (Grom & Squall)",
    desc: "Classic close-range buckshot delivering staggering point-blank kinetic trauma.",
    Alpha: "grom",
    Beta: "squall"
  },
  "Titan Machine Gun": {
    name: "Titan Kinetic Gatling (Vengeance & Retaliator)",
    desc: "High-RPM titan gatling batteries delivering sustained suppressive fire.",
    Alpha: "vengeance",
    Beta: "retaliator"
  },
  "Titan Rocket Splash": {
    name: "Titan Kinetic Rocket (Tsar & Rupture)",
    desc: "Heavy explosive rockets delivering immense area splash damage.",
    Alpha: "tsar",
    Beta: "rupture"
  },
  "Titan Plasma": {
    name: "Titan Plasma Sniper (Gendarme & Cuirassier)",
    desc: "Precision 600m plasma sniper rifles bypassing standard energy shielding.",
    Alpha: "gendarme",
    Beta: "cuirassier"
  },
  "Titan Kinetic Sniper": {
    name: "Titan Kinetic Piercing (Arbitrator & Dispute)",
    desc: "Extreme 800m sniper rifles delivering armor-piercing kinetic strikes.",
    Alpha: "arbitrator",
    Beta: "dispute"
  }
};

const MASTER_TITANS = [
  {
    "id": "ultimate_ao_ming",
    "name": "Ultimate Ao Ming",
    "tier": "Ultimate",
    "role": "Ultimate Flight Titan",
    "hp": 540000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Ultimate Dragon Ascendance: Permanent 60% defense resistance during flight, immunity to blind/lockdown, and 100% grey damage restoration."
  },
  {
    "id": "sharanga",
    "name": "Sharanga",
    "tier": "Titan",
    "role": "Triple Alpha Sniper",
    "hp": 350000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      }
    ],
    "ability": "Full Power: Boosts triple Alpha weapon damage by +33% with Phase Exile banishment."
  },
  {
    "id": "bedwyr",
    "name": "Bedwyr",
    "tier": "Titan",
    "role": "Bastion Tank Titan",
    "hp": 520000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Unbreakable Barrier: Deploys indestructible Absorber barrier, taunting enemy lock-ons while charging a retaliatory kinetic shockwave."
  },
  {
    "id": "ultimate_arthur",
    "name": "Ultimate Arthur",
    "tier": "Ultimate",
    "role": "Ultimate Shield Titan",
    "hp": 620000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Ultimate Phalanx: 2,500,000 HP physical shield with continuous 360-degree EMP discharge and +40% weapon damage."
  },
  {
    "id": "sirius",
    "name": "Sirius",
    "tier": "Titan",
    "role": "Stationary Support Titan",
    "hp": 380000,
    "hardpoints": [
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Remote Repair Core: Deploys autonomous sonic healing and acoustic damage turrets with Aegis shield generators."
  },
  {
    "id": "scavenger_heimdall",
    "name": "Scavenger Heimdall",
    "tier": "Titan",
    "role": "Tactical Support",
    "hp": 412500,
    "speed": 45,
    "hardpoints": [
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Special Edition: Golden Horn: Toggles between Repair Mode (team aura + speed) and War Mode (built-in kinetic cannon + +25% team damage). (+10% Titan Hull Durability)"
  },
  {
    "id": "indra",
    "name": "Indra",
    "tier": "Titan",
    "role": "Phase Striker Titan",
    "hp": 420000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Vipassana: 2 charges of complete invulnerability and speed acceleration, purging all negative status effects with Lasso siphon."
  },
  {
    "id": "aevum_minos",
    "name": "Aevum Minos",
    "tier": "Titan",
    "role": "Rush Brawler",
    "hp": 407000,
    "speed": 45,
    "hardpoints": [
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Special Edition: Bull Stampede: 3 consecutive high-velocity dash charges and Reflector shield, knocking enemies across the map. (+10% Titan Hull Durability)"
  },
  {
    "id": "kid",
    "name": "Kid",
    "tier": "Titan",
    "role": "Starter Titan",
    "hp": 330000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Full Action & Stove: Activates heavy Alpha weapon and radiates continuous 360-degree thermal Stove area damage."
  },
  {
    "id": "ao_ming",
    "name": "Ao Ming",
    "tier": "Titan",
    "role": "Dual Flight Titan",
    "hp": 310000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Dragon Flight: Flies indefinitely above battlefield with 4 active weapon mounts and self-repair."
  },
  {
    "id": "luchador",
    "name": "Luchador",
    "tier": "Titan",
    "role": "Brawler Juggernaut",
    "hp": 450000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Frog Splash & Reflector: High-impact jump slam creating a massive 150k kinetic shockwave with 80% Reflector shield."
  },
  {
    "id": "kraken_indra",
    "name": "Kraken Indra",
    "tier": "Titan",
    "role": "Phase Extraction Brawler",
    "hp": 462000,
    "speed": 45,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Special Edition: Vipassana: 2 charges of complete invulnerability and speed acceleration, purging all negative status effects with Lasso siphon. (+10% Titan Hull Durability)"
  },
  {
    "id": "newton",
    "name": "Newton",
    "tier": "Titan",
    "role": "Telekinesis Sniper Titan",
    "hp": 370000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Chokehold: Telekinetically lifts enemy robots 100m into the sky, immobilizing them for concentrated allied sniper volleys."
  },
  {
    "id": "minos",
    "name": "Minos",
    "tier": "Titan",
    "role": "Charge Brawler",
    "hp": 370000,
    "hardpoints": [
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Bull Stampede: 3 consecutive high-velocity dash charges and Reflector shield, knocking enemies across the map."
  },
  {
    "id": "rook",
    "name": "Rook",
    "tier": "Titan",
    "role": "Castling Heavy Brawler",
    "hp": 480000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Castling: Flies across battlefield, slamming into enemy beacons with physical shield regeneration and suppression wave."
  },
  {
    "id": "eiffel",
    "name": "Eiffel",
    "tier": "Titan",
    "role": "Aerial Dominance Titan",
    "hp": 440000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Debut Flight: Takes flight, deploying 2 additional Beta weapon hardpoints (total 5 weapons) while gaining dash boosts."
  },
  {
    "id": "aether",
    "name": "Aether",
    "tier": "Titan",
    "role": "Laser Flight Titan",
    "hp": 355000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Vigor Flight: Takes flight with Forcefield shield and accelerated speed, firing a built-in Disintegration beam with self-repair."
  },
  {
    "id": "heimdall",
    "name": "Heimdall",
    "tier": "Titan",
    "role": "Squad Commander Titan",
    "hp": 375000,
    "hardpoints": [
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Golden Horn: Toggles between Repair Mode (team aura + speed) and War Mode (built-in kinetic cannon + +25% team damage)."
  },
  {
    "id": "arthur",
    "name": "Arthur",
    "tier": "Titan",
    "role": "Physical Shield Tank",
    "hp": 380000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Phalanx Mode: Closes 1,000,000 HP physical shield plates in front while unleashing a concussive Blastwave."
  },
  {
    "id": "stellar_sirius",
    "name": "Stellar Sirius",
    "tier": "Titan",
    "role": "Remote Repair Support",
    "hp": 418000,
    "speed": 45,
    "hardpoints": [
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Special Edition: Remote Repair Core: Deploys autonomous sonic healing and acoustic damage turrets with Aegis shield generators. (+10% Titan Hull Durability)"
  },
  {
    "id": "retro_nodens",
    "name": "Retro Nodens",
    "tier": "Titan",
    "role": "Squad Nanite Healer",
    "hp": 390500,
    "speed": 45,
    "hardpoints": [
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Special Edition: Mending Links: Projects 3 simultaneous infinite-range healing tethers to allies while suppressing target enemies by 50%. (+10% Titan Hull Durability)"
  },
  {
    "id": "murometz",
    "name": "Murometz",
    "tier": "Titan",
    "role": "Stealth Missile Titan",
    "hp": 340000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Shadow Flight & EMP: Ascends into stealth flight, launching EMP strike that disables enemy abilities and modules within 600m."
  },
  {
    "id": "bersagliere",
    "name": "Bersagliere",
    "tier": "Titan",
    "role": "Sniper Siege Titan",
    "hp": 360000,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Hyper-Velocity Rail: Activates built-in railgun delivering 450k kinetic damage with 100% defense mitigation and 1100m range."
  },
  {
    "id": "nodens",
    "name": "Nodens",
    "tier": "Titan",
    "role": "Quad Support Medic",
    "hp": 355000,
    "hardpoints": [
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Mending Links: Projects 3 simultaneous infinite-range healing tethers to allies while suppressing target enemies by 50%."
  },
  {
    "id": "baihu_luchador",
    "name": "Baihu Luchador",
    "tier": "Titan",
    "role": "Brawler Juggernaut",
    "hp": 495000,
    "speed": 45,
    "hardpoints": [
      {
        "size": "Alpha"
      },
      {
        "size": "Beta"
      },
      {
        "size": "Beta"
      }
    ],
    "ability": "Special Edition: Frog Splash & Reflector: High-impact jump slam creating a massive 150k kinetic shockwave with 80% Reflector shield. (+10% Titan Hull Durability)"
  }
];
