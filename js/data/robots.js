/* WRBrain - Robots & Robot Series Data */

const ROBOT_SERIES = {
  "fenrir": {
    name: "Fenrir Lineage",
    desc: "EvoLife heavy defense tank brawlers equipped with Aegis generators and enhanced Defense Point conversion systems.",
    Standard: "fenrir",
    Ultimate: "ultimate_fenrir",
    Special: "cryptic_fenrir"
  },
  "spectre": {
    name: "Spectre Lineage",
    desc: "SpaceTech quad-medium assassin platforms specializing in mid-air Stealth jump strikes.",
    Standard: "spectre",
    Ultimate: "ultimate_spectre",
    Special: "freedom_spectre"
  },
  "ares": {
    name: "Ares Pantheon",
    desc: "DSC energy shield vanguard featuring impenetrable Absorber barriers and built-in Retaliator plasma cannons.",
    Standard: "ares",
    Ultimate: "ultimate_ares",
    Special: "eldritch_ares"
  },
  "invader": {
    name: "Invader Arachnid",
    desc: "SpaceTech heavy quad-leg suppression jumper deploying massive area-of-effect damage debuffs.",
    Standard: "invader",
    Ultimate: "ultimate_invader",
    Special: "arachnid_invader"
  },
  "mender": {
    name: "Mender Medic",
    desc: "EvoLife support platform with dual pulse repairs, speed acceleration, and defense point reinforcement.",
    Standard: "mender",
    Ultimate: "ultimate_mender",
    Special: "giftbringer_mender"
  },
  "blitz": {
    name: "Blitz Vanguard",
    desc: "DSC light assault platform deploying Break-in suppression darts and front-facing Aegis shield.",
    Standard: "blitz",
    Ultimate: "ultimate_blitz",
    Special: "arachto_blitz"
  },
  "fujin": {
    name: "Fujin Bastion",
    desc: "Classic SpaceTech sentry deploying a high-capacity stationary Sentry Ancile shield barrier.",
    Standard: "fujin",
    Ultimate: "ultimate_fujin",
    Special: "corrupted_fujin"
  },
  "rayker": {
    name: "Rayker Stalker",
    desc: "SpaceTech quad-leg sniper with multi-charge Gladiator suppression laser beams.",
    Standard: "rayker",
    Ultimate: "ultimate_rayker",
    Special: "stellar_rayker"
  },
  "destrier": {
    name: "Destrier Pioneer",
    desc: "The legendary foundation of War Robots combat engineering, reinforced with modern alloys.",
    Standard: "destrier",
    Ultimate: "ultimate_destrier",
    Special: "retro_destrier"
  },
  "phantom": {
    name: "Phantom Blink",
    desc: "Icarus tactical assassin with instant Blink translocator teleportation and speed bursts.",
    Standard: "phantom",
    Ultimate: "ultimate_phantom",
    Special: "stellar_phantom"
  },
  "ao_jun": {
    name: "Ao Jun Dragon",
    desc: "SpaceTech flight titan equipped with built-in thermal flame breath and flight stealth.",
    Standard: "ao_jun",
    Ultimate: "ultimate_ao_jun",
    Special: "deathwing_ao_jun"
  },
  "bulgasari": {
    name: "Bulgasari Dash",
    desc: "SpaceTech dash warrior with lateral physical shield plating and dash thrusters.",
    Standard: "bulgasari",
    Ultimate: "ultimate_bulgasari",
    Special: "ancient_bulgasari"
  },
  "leech": {
    name: "Leech Repulse",
    desc: "DSC high-speed damage redirector reflecting incoming artillery fire back to linked targets.",
    Standard: "leech",
    Ultimate: "ultimate_leech",
    Special: "frozen_leech"
  }
};

const MASTER_ROBOTS = [
  // META S-TIER TITANS & ROBOTS (2024 - 2026)
  { id: "condor", name: "Condor", tier: "T4", faction: "SpaceTech", role: "Aerial Vanguard", speed: 64, hp: 280000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Light" }], ability: "Skyborn Aegis: Takes flight with sonic speed, generating a dynamic Reflector shield while projecting a high-impact built-in beam cannon." },
  { id: "nuo", name: "Nuo", tier: "T4", faction: "SpaceTech", role: "Aerial Vanguard", speed: 62, hp: 270000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }], ability: "Skyborn Aegis: Takes flight with sonic speed, generating a dynamic Reflector shield while projecting a high-impact built-in beam cannon." },
  { id: "raptor", name: "Raptor", tier: "T4", faction: "DSC", role: "Brawler Tank", speed: 52, hp: 320000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "Comet Crash: Jumps aggressively onto enemy beacons, triggering a massive kinetic blast wave that suppresses and inflicts 150k area damage." },
  { id: "pathfinder", name: "Pathfinder", tier: "T4", faction: "Icarus", role: "Tactical Support", speed: 58, hp: 230000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Track & Hunt: Marks target enemies; upon takedown grants cumulative permanent team-wide damage buffs and direct durability regeneration." },
  { id: "curie", name: "Curie", tier: "T4", faction: "Yan-di", role: "Combat Turret Specialist", speed: 56, hp: 250000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Automated Turret Deploy: Drops 2 autonomous plasma turrets with 600m range, gaining bonus temporary durability (+150k) and speed acceleration." },
  { id: "shenlou", name: "Shenlou", tier: "T4", faction: "SpaceTech", role: "Assassin Teleporter", speed: 62, hp: 210000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Light" }], ability: "Multi-Blink Jump: Teleports 3 consecutive times directly behind enemy lines with Aegis shields before returning to initial anchor beacon." },
  { id: "dagon", name: "Dagon", tier: "T4", faction: "EvoLife", role: "Heavy Shield Barrage", speed: 55, hp: 205000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Overclocked Aegis: Charges a regenerating 350k capacity personal Aegis dome while unleashing a devastating 6x Light weapon volley." },
  { id: "ochokochi", name: "Ochokochi", tier: "T4", faction: "Yan-di", role: "Brawler / Rammer", speed: 60, hp: 290000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Stampede & Repulsion: Charges forward with high-velocity repulsion field, knocking enemy robots backwards while converting damage into DoT corrosion." },
  { id: "bagliore", name: "Bagliore", tier: "T4", faction: "SpaceTech", role: "Quad Heavy Sniper", speed: 50, hp: 235000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }], ability: "Translocation Anchor: Places recall warp beacon, gaining +35% damage mitigation and overcharging quad Heavy weapon mounts." },
  { id: "crisis", name: "Crisis", tier: "T4", faction: "Icarus", role: "Sniper Assassin", speed: 55, hp: 160000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }], ability: "Permanent Stealth & Overpower: Permanent stealth while idle; activating Overpower boosts quad-Heavy damage by +30% with built-in Shieldbreaker." },
  { id: "ophion", name: "Ophion", tier: "T4", faction: "SpaceTech", role: "Aerial Brawler", speed: 58, hp: 195000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Absorber Dragon Flight: Launches into air with impenetrable Absorber shield, firing high-explosive built-in blastcharge projectile salvo." },
  { id: "imugi", name: "Imugi", tier: "T4", faction: "SpaceTech", role: "Teleport Vanguard", speed: 60, hp: 210000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Light" }], ability: "Dragon Portal: Flies stealthily and establishes a two-way teleportation portal for all allied teammates on landing." },
  { id: "nether", name: "Nether", tier: "T4", faction: "Icarus", role: "Dash Striker", speed: 65, hp: 185000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Quinquuple Dash: 5 rapid multi-directional dash charges with EMP Quake and Forcefield defense shield." },
  { id: "mars", name: "Mars", tier: "T4", faction: "Yan-di", role: "Area Denial", speed: 53, hp: 195000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Remote Turret Launcher: Launches a deployable remote Gatling turret over cover while projecting a 250k Aegis bubble." },
  { id: "seraph", name: "Seraph", tier: "T4", faction: "SpaceTech", role: "Aerial Vanguard", speed: 57, hp: 225000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Skyward Strike: Flies at high speed with Forcefield protection, striking up to 3 ground targets simultaneously with hyper-lightning." },
  { id: "siren", name: "Siren", tier: "T4", faction: "DSC", role: "Mid-range Area Denial", speed: 50, hp: 190000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Light" }], ability: "Snowstorm Jump: Translocates into air generating Reflector shield and dropping an icy blizzard that freezes enemy clusters." },
  { id: "harpy", name: "Harpy", tier: "T4", faction: "DSC", role: "Firestorm Artillery", speed: 50, hp: 185000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }], ability: "Firestorm Jump: Mid-air flight with Reflector shield, raining incendiary blast rockets that detonate area blastcharge stacks." },
  { id: "angler", name: "Angler", tier: "T4", faction: "Yan-di", role: "Close-Quarters Brawler", speed: 55, hp: 260000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Electric Shift: Enters invulnerable phase shift while charging blinding electric tendrils that blind all nearby foes upon exit." },
  { id: "lynx", name: "Lynx", tier: "T4", faction: "Yan-di", role: "Stealth Executioner", speed: 70, hp: 180000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Executioner Strike: High-speed stealth sprint with Forcefield; executes any enemy robot instantly when dropping below health threshold." },
  { id: "skyros", name: "Skyros", tier: "T4", faction: "Icarus", role: "Rolling Juggernaut", speed: 85, hp: 275000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Light" }], ability: "Ball Mode: Rolls at 85 km/h with +500 Defense Points (85% damage resistance) and anti-blast kinetic shielding." },
  { id: "ammit", name: "Ammit", tier: "T4", faction: "Yan-di", role: "Desert Brawler", speed: 52, hp: 275000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }, { size: "Light" }], ability: "Sandstorm Surge: Engages rapid forward rush with sandstorm cloak, reducing enemy accuracy and siphoning durability." },
  { id: "rex", name: "Rex", tier: "T4", faction: "DSC", role: "Heavy Juggernaut", speed: 48, hp: 310000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Medium" }, { size: "Light" }], ability: "Predator Leap: Heavy combat jump generating kinetic suppression shockwave and crushing area damage." },
  { id: "hastatus", name: "Hastatus", tier: "T4", faction: "DSC", role: "Gladiator Bastion", speed: 56, hp: 235000, hardpoints: [{ size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Phalanx Retribution: Deploys indestructible front shield while boosting kinetic weapon fire and damage mitigation." },
  { id: "void_shoggoth", name: "Void Shoggoth", tier: "T4", faction: "Icarus", role: "Void Assassin", speed: 58, hp: 220000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Void Blink: Phase-shifts through reality, emerging behind enemy ranks with EMP field and blast buildup." },
  { id: "vector", name: "Vector", tier: "T4", faction: "Icarus", role: "Tactical Interceptor", speed: 62, hp: 215000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }, { size: "Light" }], ability: "Kinetic Vectoring: Multi-angle thruster bursts with Forcefield protection and accelerated weapon fire." },
  { id: "omen_fang", name: "Omen Fang", tier: "T4", faction: "Yan-di", role: "Ambush Assassin", speed: 60, hp: 225000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Medium" }, { size: "Medium" }], ability: "Shadow Pounce: Enters stealth sprint, executing heavy ambush salvo with built-in acid rockets." },

  // A & B TIER POWERHOUSE STAPLES
  { id: "fenrir", name: "Fenrir", seriesKey: "fenrir", tier: "T4", faction: "EvoLife", role: "Heavy Tank", speed: 50, hp: 290000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }], ability: "Shape-Shift: Deploys heavy weapon and trades Aegis shield for permanent 50% defense damage resistance." },
  { id: "fafnir", name: "Fafnir", tier: "T4", faction: "SpaceTech", role: "Flight Brawler", speed: 50, hp: 200000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Dragon Flight: Ascends into flight, deploying built-in shieldbreaker breath cannon with Absorber shield." },
  { id: "shell", name: "Shell", tier: "T4", faction: "DSC", role: "Explosive Shield Tank", speed: 55, hp: 240000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "Dreadnought Blast: Accelerates forward with 8 physical shield plates, detonating an area-of-effect 120k blast wave." },
  { id: "orochi", name: "Orochi", tier: "T4", faction: "SpaceTech", role: "Stealth Viper", speed: 64, hp: 185000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Viper Strike: Stealth acceleration with 2 charges, deploying built-in corrosive acid rocket pods." },
  { id: "revenant", name: "Revenant", tier: "T4", faction: "Yan-di", role: "Teleport Tank", speed: 50, hp: 310000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "Aggressive Blink: Teleports directly in front of target, gaining total immunity to Grey Damage, Freeze, Lockdown and EMP." },
  { id: "typhon", name: "Typhon", tier: "T4", faction: "DSC", role: "Mid-range Suppressor", speed: 55, hp: 180000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Blackout 2.0: Fires 3 homing bio-electronic darts that inflict EMP, Lockdown, and -50% Suppression simultaneously." },
  { id: "erebus", name: "Erebus", tier: "T4", faction: "DSC", role: "Heavy Sniper", speed: 48, hp: 190000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }], ability: "Homing Blackout: 4 homing rockets applying EMP, Lockdown, Suppression, and Corrosive DoT through a 300k Aegis shield." },
  { id: "scorpion", name: "Scorpion", tier: "T4", faction: "Yan-di", role: "Ambush Assassin", speed: 58, hp: 175000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Light" }], ability: "Backstab Blink: Teleports behind enemy at 350m range, deploying sting tail with acid DoT and returning safely." },
  { id: "ravana", name: "Ravana", tier: "T4", faction: "Yan-di", role: "Phase Brawler", speed: 52, hp: 270000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Transcendence: 3 charges of total invulnerability and speed acceleration while purging all negative debuffs." },
  { id: "khepri", name: "Khepri", tier: "T4", faction: "EvoLife", role: "Link Support", speed: 60, hp: 220000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Bond: Links with ally, granting mutual speed (+35%), continuous healing, +50 Defense Points, and +25% damage boost." },
  { id: "demeter", name: "Demeter", tier: "T4", faction: "EvoLife", role: "Teleport Medic", speed: 55, hp: 200000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Apparition: Teleports to damaged ally, projecting a massive Absorber dome that converts absorbed damage into direct healing." },
  { id: "hawk", name: "Hawk", tier: "T4", faction: "SpaceTech", role: "Titan Hunter", speed: 52, hp: 170000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "Transform & Ray: Takes flight with Reflector shield, firing a titan-melting laser beam that penetrates 100% of defense points." },
  { id: "behemoth", name: "Behemoth", tier: "T4", faction: "DSC", role: "Quad Heavy Siege", speed: 45, hp: 260000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }], ability: "Siege Mode: Deploys all 4 Heavy hardpoints simultaneously for catastrophic barrage firepower." },
  { id: "blitz", name: "Blitz", seriesKey: "blitz", tier: "T4", faction: "DSC", role: "Vanguard Brawler", speed: 55, hp: 190000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Break-in: Activates front Aegis barrier, gains +60% speed, and fires 3 suppression darts (-75% enemy damage)." },
  { id: "invader", name: "Invader", seriesKey: "invader", tier: "T4", faction: "SpaceTech", role: "Arachnid Tank", speed: 44, hp: 360000, hardpoints: [{ size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Incursion: Quad-leg leap onto enemy clusters, triggering an area shockwave reducing enemy damage by 75% for 5s." },
  { id: "leech", name: "Leech", seriesKey: "leech", tier: "T4", faction: "DSC", role: "Damage Redirector", speed: 58, hp: 165000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Repulse: Tethers target, gaining 90% damage resistance while redirecting 35% of incoming damage directly to target." },
  { id: "phantom", name: "Phantom", seriesKey: "phantom", tier: "T4", faction: "Icarus", role: "Beacon Runner", speed: 60, hp: 210000, hardpoints: [{ size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Blink: Drops locator beacon, gains +33% speed and +33% defense points, and teleports back on command." },
  { id: "nightingale", name: "Nightingale", tier: "T4", faction: "SpaceTech", role: "Airborne Medic", speed: 56, hp: 190000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Light" }], ability: "Air Support: Takes stealth flight, projecting an area healing aura while suppressing ground enemies with air-to-surface darts." },
  { id: "jaeger", name: "Jaeger", tier: "T4", faction: "SpaceTech", role: "Quad Sniper Railgun", speed: 54, hp: 190000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Scout Mode & Solid-Cannon: Sentry mode deploying built-in 1100m high-velocity sniper railgun with 100% defense mitigation." },
  { id: "cerberus", name: "Cerberus", tier: "T4", faction: "DSC", role: "Tri-Effect Suppressor", speed: 52, hp: 175000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }], ability: "Blackout Ray: Built-in Aegis shield and tri-missile salvo inflicting EMP, Lockdown, and -50% Suppression." },
  { id: "ares", name: "Ares", seriesKey: "ares", tier: "T4", faction: "DSC", role: "Absorber Vanguard", speed: 54, hp: 160000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Retribution: Projects impenetrable Absorber barrier and unleashes a barrage of built-in Retaliator energy cannons." },
  { id: "hades", name: "Hades", tier: "T4", faction: "DSC", role: "Kinetic Retribution", speed: 53, hp: 175000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "Retribution: Absorber shield with built-in ballistic cannon dealing heavy kinetic impact damage." },
  { id: "nemesis", name: "Nemesis", tier: "T4", faction: "DSC", role: "Rapid Retribution", speed: 55, hp: 185000, hardpoints: [{ size: "Medium" }, { size: "Medium" }], ability: "Retribution: Rapid 4-second reload Absorber barrier with heavy homing rocket salvo." },
  { id: "mender", name: "Mender", seriesKey: "mender", tier: "T4", faction: "EvoLife", role: "Combat Medic", speed: 56, hp: 190000, hardpoints: [{ size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Support Pulse: Discharges 3 consecutive healing pulses repair up to 70% Grey Damage and granting +50 DP." },
  { id: "loki", name: "Loki", tier: "T3", faction: "Yan-di", role: "Infinite Stealth Scout", speed: 67, hp: 140000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Recon Stealth: Permanent stealth in reconnaissance mode with high speed, concealing weapon hardpoints until deployed." },
  { id: "raven", name: "Raven", tier: "T3", faction: "SpaceTech", role: "Double Jump Striker", speed: 48, hp: 178000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Double Jump: Performs two consecutive mid-air kinetic leaps, gaining +20% damage buff." },
  { id: "weyland", name: "Weyland", tier: "T3", faction: "EvoLife", role: "Stationary Medic", speed: 45, hp: 290000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Repair Station: Deploys stationary anchor projecting a massive 150m continuous repair field for all allies." },
  { id: "falcon", name: "Falcon", tier: "T3", faction: "EvoLife", role: "Traditional Tank", speed: 50, hp: 240000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }], ability: "Fangs Out: Unlocks 2 auxiliary Heavy weapon wings or trades them for 66% permanent defense resistance (Traditionalist)." },
  { id: "bulwark", name: "Bulwark", tier: "T3", faction: "DSC", role: "Dual Shield Bastion", speed: 45, hp: 220000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Dual Barrier: Dual-layer defense system with front physical shield and rechargeable Aegis energy dome." },
  { id: "strider", name: "Strider", tier: "T3", faction: "Icarus", role: "Dash Runner", speed: 60, hp: 155000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "5x Dash: Five high-speed kinetic dash thruster charges for instant beacon captures." },
  { id: "hellburner", name: "Hellburner", tier: "T3", faction: "Icarus", role: "Suicide Brawler", speed: 60, hp: 220000, hardpoints: [{ size: "Heavy" }, { size: "Light" }], ability: "Overload: Accelerates into high-speed sprint, detonating a 100k kinetic area explosion upon reaching enemies." },
  { id: "mercury", name: "Mercury", tier: "T3", faction: "SpaceTech", role: "Stealth Helldive", speed: 53, hp: 170000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "Helldive: Stealth jump into combat followed by a devastating ground-slam shockwave." },
  { id: "spectre", name: "Spectre", seriesKey: "spectre", tier: "T3", faction: "SpaceTech", role: "Glass Cannon", speed: 55, hp: 135000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Glide & Stealth: Mid-air jump with 5 seconds of stealth on landing with quad medium firepower." },
  { id: "pursuer", name: "Pursuer", tier: "T3", faction: "Icarus", role: "Stealth Hunter", speed: 66, hp: 145000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Hunt: Activates 10 seconds of stealth and +33% speed acceleration." },
  { id: "inquisitor", name: "Inquisitor", tier: "T3", faction: "SpaceTech", role: "Stealth Jump Brawler", speed: 46, hp: 175000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }], ability: "Descend: Stealth jump thrusters granting stealth during flight and for 5 seconds after landing." },
  { id: "haechi", name: "Haechi", tier: "T3", faction: "SpaceTech", role: "Dash Ancile Striker", speed: 50, hp: 170000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Dash & Ancile: Triple medium mount with built-in rechargeable Ancile energy shield and 2 dash charges." },
  { id: "bulgasari", name: "Bulgasari", seriesKey: "bulgasari", tier: "T3", faction: "SpaceTech", role: "Dash Shield Warrior", speed: 48, hp: 195000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Dash & Side Shield: Heavy physical side shield (300k HP) and 2 dash thruster charges." },
  { id: "hover", name: "Hover", tier: "T3", faction: "Icarus", role: "Aerial Glider", speed: 50, hp: 175000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Light" }], ability: "Glide: Controlled jet thrusters enabling prolonged aerial gliding and elevated firing positions." },
  { id: "ao_guang", name: "Ao Guang", tier: "T3", faction: "SpaceTech", role: "Green Dragon", speed: 50, hp: 160000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Dragon Flight: Takes flight with 80% damage resistance and fires built-in homing missiles." },

  // ULTIMATE EDITIONS (COLLECTOR GOLD ★)
  { id: "ultimate_fenrir", name: "Ultimate Fenrir", seriesKey: "fenrir", tier: "Ultimate", faction: "EvoLife", role: "Ultimate Tank", speed: 55, hp: 440000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }], ability: "Ultimate Shapeshift: Permanent 65% Defense Point resistance (+185 DP) and continuous unhealable grey damage auto-repair." },
  { id: "ultimate_spectre", name: "Ultimate Spectre", seriesKey: "spectre", tier: "Ultimate", faction: "SpaceTech", role: "Ultimate Assassin", speed: 62, hp: 220000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Ultimate Glide: Stealth jump with +40% weapon damage boost and total immunity to lockdown/suppression." },
  { id: "ultimate_ares", name: "Ultimate Ares", seriesKey: "ares", tier: "Ultimate", faction: "DSC", role: "Ultimate Vanguard", speed: 58, hp: 250000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Ultimate Retribution: Penetrates defense resistance and reflects 100% of blocked Absorber damage back to attackers." },
  { id: "ultimate_invader", name: "Ultimate Invader", seriesKey: "invader", tier: "Ultimate", faction: "SpaceTech", role: "Ultimate Arachnid", speed: 50, hp: 520000, hardpoints: [{ size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Ultimate Incursion: Heavy jump creating a permanent 80% suppression pulse and regenerating 200k durability." },
  { id: "ultimate_mender", name: "Ultimate Mender", seriesKey: "mender", tier: "Ultimate", faction: "EvoLife", role: "Ultimate Medic", speed: 60, hp: 280000, hardpoints: [{ size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Ultimate Repair: 100% Grey Damage restoration, speed boost (+50%), and 100 bonus Defense Points during pulse." },
  { id: "ultimate_blitz", name: "Ultimate Blitz", seriesKey: "blitz", tier: "Ultimate", faction: "DSC", role: "Ultimate Brawler", speed: 62, hp: 270000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Ultimate Break-In: Heavy unbreakable Aegis barrier with EMP discharge and 80% enemy suppression." },
  { id: "ultimate_fujin", name: "Ultimate Fujin", seriesKey: "fujin", tier: "Ultimate", faction: "SpaceTech", role: "Ultimate Sentry", speed: 52, hp: 310000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Ultimate Sentry: 500k Aegis Dome with built-in kinetic railgun cannons while in sentry stance." },
  { id: "ultimate_phantom", name: "Ultimate Phantom", seriesKey: "phantom", tier: "Ultimate", faction: "Icarus", role: "Ultimate Striker", speed: 70, hp: 290000, hardpoints: [{ size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Ultimate Blink: Hyper speed sprint with +70% defense points and instant status cleanse on recall." },
  { id: "ultimate_ao_jun", name: "Ultimate Ao Jun", seriesKey: "ao_jun", tier: "Ultimate", faction: "SpaceTech", role: "Ultimate Dragon", speed: 60, hp: 270000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Ultimate Dragon Flight: Stealth flight with titanium-melting flamethrower bypassing all reflectors and shields." },
  { id: "ultimate_destrier", name: "Ultimate Destrier", seriesKey: "destrier", tier: "Ultimate", faction: "DSC", role: "Ultimate Legend", speed: 60, hp: 250000, hardpoints: [{ size: "Light" }, { size: "Light" }], ability: "Overcharged Core: Compact combat platform deploying accelerated weapon fire and high durability multipliers." },
  { id: "ultimate_leech", name: "Ultimate Leech", seriesKey: "leech", tier: "Ultimate", faction: "DSC", role: "Ultimate Repulse", speed: 65, hp: 230000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Ultimate Repulse: 95% damage resistance while reflecting 50% damage back to target with Grey Damage cleanse." },

  // CLASSIC T2 & T1 LINEAGE
  { id: "ao_qin", name: "Ao Qin", tier: "T2", faction: "SpaceTech", role: "Red Dragon", speed: 52, hp: 125000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Dragon Flight: Takes flight unleashing an automatic 350m continuous energy arc." },
  { id: "kumiho", name: "Kumiho", tier: "T2", faction: "SpaceTech", role: "Dash Runner", speed: 60, hp: 150000, hardpoints: [{ size: "Medium" }, { size: "Medium" }], ability: "Rapid Dash: Quick-recharge dual dash thrusters for swift tactical repositioning." },
  { id: "lancelot", name: "Lancelot", tier: "T2", faction: "Camelot", role: "Shield Brawler", speed: 38, hp: 210000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Medium" }], ability: "Rush: Accelerates movement speed while facing enemies with reinforced physical front shields." },
  { id: "galahad", name: "Galahad", tier: "T2", faction: "Camelot", role: "Shield Assault", speed: 50, hp: 140000, hardpoints: [{ size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Phalanx Mode: Positions front physical shield (200k HP) to block incoming ballistic and energy fire." },
  { id: "gareth", name: "Gareth", tier: "T2", faction: "Camelot", role: "Agile Scout Shield", speed: 60, hp: 105000, hardpoints: [{ size: "Medium" }, { size: "Light" }], ability: "Phalanx Mode: Deploys physical side shield in front while retaining high mobility." },
  { id: "raijin", name: "Raijin", tier: "T2", faction: "SpaceTech", role: "Bastion Tank", speed: 32, hp: 250000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Bastion Mode: Raises dual physical shields (+300k HP) and grants +30% weapon damage boost in stationary stance." },
  { id: "fujin", name: "Fujin", seriesKey: "fujin", tier: "T2", faction: "SpaceTech", role: "Sentry Ancile", speed: 44, hp: 155000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Medium" }], ability: "Sentry Mode: Deploys stationary tripod stance with regenerating Ancile energy dome." },
  { id: "fury", name: "Fury", tier: "T2", faction: "SpaceTech", role: "Heavy Sniper", speed: 38, hp: 180000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Heavy" }], ability: "Triple Heavy Platform: Steady triple-heavy artillery battery." },
  { id: "carnage", name: "Carnage", tier: "T2", faction: "SpaceTech", role: "Ancile Brawler", speed: 45, hp: 130000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }], ability: "Rush & Ancile: Energy shield generator with high-velocity sprint booster." },
  { id: "natasha", name: "Natasha", tier: "T1", faction: "DSC", role: "Heavy Artillery", speed: 38, hp: 185000, hardpoints: [{ size: "Heavy" }, { size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "Heavy Firepower: Dual Heavy and dual Light mixed hardpoints." },
  { id: "leo", name: "Leo", tier: "T1", faction: "DSC", role: "Brawler Tank", speed: 35, hp: 240000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "High Hull Durability: Massive beginner HP pool with versatile weapons mix." },
  { id: "griffin", name: "Griffin", tier: "T1", faction: "DSC", role: "Jump Striker", speed: 35, hp: 160000, hardpoints: [{ size: "Medium" }, { size: "Medium" }, { size: "Light" }, { size: "Light" }], ability: "Jump Unit: Heavy kinetic thruster leap for ambushes and obstacle bypass." },
  { id: "stalker", name: "Stalker", tier: "T1", faction: "Icarus", role: "Stealth Runner", speed: 66, hp: 100000, hardpoints: [{ size: "Light" }, { size: "Light" }], ability: "Stealth: 8 seconds of total radar invisibility for rapid beacon captures." },
  { id: "cossack", name: "Cossack", tier: "T1", faction: "SpaceTech", role: "Agile Jumper", speed: 58, hp: 85000, hardpoints: [{ size: "Medium" }], ability: "Rapid Jump: 5-second jump cooldown for hyper-agile beacon hunting." },
  { id: "destrier", name: "Destrier", seriesKey: "destrier", tier: "T1", faction: "DSC", role: "Starter Scout", speed: 45, hp: 95000, hardpoints: [{ size: "Light" }, { size: "Light" }], ability: "Dual Mount: Foundation combat training unit." },
  { id: "gepard", name: "Gepard", tier: "T1", faction: "DSC", role: "Triple Light Runner", speed: 58, hp: 100000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "High Sprint: Agile triple-light mount platform." },
  { id: "schutze", name: "Schutze", tier: "T1", faction: "SpaceTech", role: "Classic Heavy Platform", speed: 50, hp: 95000, hardpoints: [{ size: "Heavy" }], ability: "Single Heavy Mount: Compact light chassis carrying a heavy hardpoint." },
  { id: "boa", name: "Boa", tier: "T1", faction: "DSC", role: "Classic Brawler", speed: 42, hp: 185000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }], ability: "Reinforced Chassis: Sturdy dual-hardpoint classic combat bot." },
  { id: "golem", name: "Golem", tier: "T1", faction: "DSC", role: "Tri-Weapon Platform", speed: 38, hp: 170000, hardpoints: [{ size: "Heavy" }, { size: "Medium" }, { size: "Light" }], ability: "Tri-Mount Array: Balanced heavy, medium, and light weapon loadout." },
  { id: "vityaz", name: "Vityaz", tier: "T1", faction: "SpaceTech", role: "Support Brawler", speed: 40, hp: 160000, hardpoints: [{ size: "Heavy" }, { size: "Light" }, { size: "Light" }], ability: "Heavy & Dual Light: Classic mixed firing platform." },
  { id: "gl_patton", name: "GI. Patton", tier: "T1", faction: "DSC", role: "Quad Light Artillery", speed: 42, hp: 140000, hardpoints: [{ size: "Light" }, { size: "Light" }, { size: "Light" }, { size: "Light" }], ability: "Quad Light Mount: 4 Light hardpoints for concentrated salvo fire." }
];
