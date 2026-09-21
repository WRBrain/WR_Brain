import os
import json

SE_ROBOTS = [
    # Eldritch / Cryptic / Sinister
    {"id": "cryptic_fenrir", "name": "Cryptic Fenrir", "tier": "T4", "role": "Heavy Brawler", "base_id": "fenrir", "hp_mult": 1.10, "prefix": "Cryptic"},
    {"id": "eldritch_ares", "name": "Eldritch Ares", "tier": "T4", "role": "Energy Support Gunner", "base_id": "ares", "hp_mult": 1.10, "prefix": "Eldritch"},
    {"id": "eldritch_khepri", "name": "Eldritch Khepri", "tier": "T4", "role": "Combat Support / Buffer", "base_id": "khepri", "hp_mult": 1.10, "prefix": "Eldritch"},
    {"id": "sinister_siren", "name": "Sinister Siren", "tier": "T4", "role": "Snowstorm Skirmisher", "base_id": "siren", "hp_mult": 1.10, "prefix": "Sinister"},
    
    # Ardent / Ivory
    {"id": "ardent_behemoth", "name": "Ardent Behemoth", "tier": "T4", "role": "Quad-Heavy Siege Platform", "base_id": "behemoth", "hp_mult": 1.10, "prefix": "Ardent"},
    {"id": "ardent_blitz", "name": "Ardent Blitz", "tier": "T4", "role": "Suppression Assassin", "base_id": "blitz", "hp_mult": 1.10, "prefix": "Ardent"},
    {"id": "ardent_imugi", "name": "Ardent Imugi", "tier": "T4", "role": "Teleporting Skirmisher", "base_id": "imugi", "hp_mult": 1.10, "prefix": "Ardent"},
    {"id": "ivory_ravana", "name": "Ivory Ravana", "tier": "T4", "role": "Phase Brawler", "base_id": "ravana", "hp_mult": 1.10, "prefix": "Ivory"},
    
    # Unknown / Baihu / Solid
    {"id": "unknown_ochokochi", "name": "Unknown Ochokochi", "tier": "T4", "role": "Stampede Juggernaut", "base_id": "ochokochi", "hp_mult": 1.10, "prefix": "Unknown"},
    {"id": "unknown_seraph", "name": "Unknown Seraph", "tier": "T4", "role": "Aerial Striker", "base_id": "seraph", "hp_mult": 1.10, "prefix": "Unknown"},
    {"id": "baihu_lynx", "name": "Baihu Lynx", "tier": "T4", "role": "Stealth Executioner", "base_id": "lynx", "hp_mult": 1.10, "prefix": "Baihu"},
    {"id": "solid_jaeger", "name": "Solid Jaeger", "tier": "T4", "role": "Long-Range Railgun Sniper", "base_id": "jaeger", "hp_mult": 1.10, "prefix": "Solid"},
    
    # Retro / Gothic / Imperial
    {"id": "retro_revenant", "name": "Retro Revenant", "tier": "T4", "role": "Teleporting Tank", "base_id": "revenant", "hp_mult": 1.10, "prefix": "Retro"},
    {"id": "retro_crisis", "name": "Retro Crisis", "tier": "T4", "role": "Quad-Heavy Stealth Sniper", "base_id": "crisis", "hp_mult": 1.10, "prefix": "Retro"},
    {"id": "gothic_mars", "name": "Gothic Mars", "tier": "T4", "role": "Deployable Turret Striker", "base_id": "mars", "hp_mult": 1.10, "prefix": "Gothic"},
    {"id": "imperial_hades", "name": "Imperial Hades", "tier": "T4", "role": "Kinetic Support Gunner", "base_id": "hades", "hp_mult": 1.10, "prefix": "Imperial"},
    
    # Freedom / Stellar
    {"id": "freedom_skyros", "name": "Freedom Skyros", "tier": "T4", "role": "Ballistic Rolling Brawler", "base_id": "skyros", "hp_mult": 1.10, "prefix": "Freedom"},
    {"id": "freedom_fafnir", "name": "Freedom Fafnir", "tier": "T4", "role": "Aerial Shielded Fighter", "base_id": "fafnir", "hp_mult": 1.10, "prefix": "Freedom"},
    {"id": "stellar_phantom", "name": "Stellar Phantom", "tier": "T4", "role": "Teleporting Beacon Flanker", "base_id": "phantom", "hp_mult": 1.10, "prefix": "Stellar"},
    
    # Dread / Scavenger
    {"id": "dread_shell", "name": "Dread Shell", "tier": "T4", "role": "Blast Shockwave Tank", "base_id": "shell", "hp_mult": 1.10, "prefix": "Dread"},
    {"id": "scavenger_shell", "name": "Scavenger Shell", "tier": "T4", "role": "Blast Shockwave Tank", "base_id": "shell", "hp_mult": 1.10, "prefix": "Scavenger"},
    {"id": "scavenger_griffin", "name": "Scavenger Griffin", "tier": "T2", "role": "Jump Striker", "base_id": "griffin", "hp_mult": 1.10, "prefix": "Scavenger"},
    
    # Cruel / Fallen / Warrior
    {"id": "cruel_angler", "name": "Cruel Angler", "tier": "T4", "role": "Blind Blinding Brawler", "base_id": "angler", "hp_mult": 1.10, "prefix": "Cruel"},
    {"id": "cruel_orochi", "name": "Cruel Orochi", "tier": "T4", "role": "Stealth Viper Striker", "base_id": "orochi", "hp_mult": 1.10, "prefix": "Cruel"},
    {"id": "fallen_seraph", "name": "Fallen Seraph", "tier": "T4", "role": "Aerial Striker", "base_id": "seraph", "hp_mult": 1.10, "prefix": "Fallen"},
    {"id": "warrior_typhon", "name": "Warrior Typhon", "tier": "T4", "role": "Blackout Disabler", "base_id": "typhon", "hp_mult": 1.10, "prefix": "Warrior"},
    
    # Frozen / Terrapin / Papillon / Corrupted
    {"id": "frozen_dagon", "name": "Frozen Dagon", "tier": "T4", "role": "Hexa-Shield Battery Skirmisher", "base_id": "dagon", "hp_mult": 1.10, "prefix": "Frozen"},
    {"id": "frozen_leech", "name": "Frozen Leech", "tier": "T4", "role": "Repulse Tether Attacker", "base_id": "leech", "hp_mult": 1.10, "prefix": "Frozen"},
    {"id": "terrapin_harpy", "name": "Terrapin Harpy", "tier": "T4", "role": "Firestorm Bombardment", "base_id": "harpy", "hp_mult": 1.10, "prefix": "Terrapin"},
    {"id": "terrapin_siren", "name": "Terrapin Siren", "tier": "T4", "role": "Snowstorm Skirmisher", "base_id": "siren", "hp_mult": 1.10, "prefix": "Terrapin"},
    {"id": "corrupted_fafnir", "name": "Corrupted Fafnir", "tier": "T4", "role": "Aerial Shielded Fighter", "base_id": "fafnir", "hp_mult": 1.10, "prefix": "Corrupted"},
    {"id": "papillon_imugi", "name": "Papillon Imugi", "tier": "T4", "role": "Teleporting Skirmisher", "base_id": "imugi", "hp_mult": 1.10, "prefix": "Papillon"},
    {"id": "techno_scorpion", "name": "Techno Scorpion", "tier": "T4", "role": "Teleport Assassin", "base_id": "scorpion", "hp_mult": 1.10, "prefix": "Techno"},
    {"id": "megalodon_orochi", "name": "Megalodon Orochi", "tier": "T4", "role": "Stealth Viper Striker", "base_id": "orochi", "hp_mult": 1.10, "prefix": "Megalodon"},
    {"id": "scarab_leech", "name": "Scarab Leech", "tier": "T4", "role": "Repulse Tether Attacker", "base_id": "leech", "hp_mult": 1.10, "prefix": "Scarab"},
    {"id": "experimental_loki", "name": "Experimental Loki", "tier": "T4", "role": "Infinite Stealth Beacon Capper", "base_id": "loki", "hp_mult": 1.10, "prefix": "Experimental"},
    {"id": "giftbringer_fenrir", "name": "Giftbringer Fenrir", "tier": "T4", "role": "Heavy Brawler", "base_id": "fenrir", "hp_mult": 1.10, "prefix": "Giftbringer"}
]

SE_WEAPONS = [
    # Acoustic & Zap
    {"id": "ardent_screamer", "name": "Ardent Screamer", "size": "Heavy", "tier": "T4", "base_id": "screamer", "family": "Acoustic / Echo"},
    {"id": "ardent_growler", "name": "Ardent Growler", "size": "Medium", "tier": "T4", "base_id": "growler", "family": "Acoustic / Echo"},
    {"id": "ardent_howler", "name": "Ardent Howler", "size": "Light", "tier": "T4", "base_id": "howler", "family": "Acoustic / Echo"},
    {"id": "unknown_fengbao", "name": "Unknown Fengbao", "size": "Heavy", "tier": "T4", "base_id": "fengbao", "family": "Electricity / Zap"},
    {"id": "unknown_leana", "name": "Unknown Leana", "size": "Medium", "tier": "T4", "base_id": "leana", "family": "Electricity / Zap"},
    {"id": "unknown_shifang", "name": "Unknown Shifang", "size": "Light", "tier": "T4", "base_id": "shifang", "family": "Electricity / Zap"},

    # Radiation & Blast
    {"id": "cryptic_hazard", "name": "Cryptic Hazard", "size": "Medium", "tier": "T4", "base_id": "hazard", "family": "Radiation Burst"},
    {"id": "eldritch_blight", "name": "Eldritch Blight", "size": "Light", "tier": "T4", "base_id": "blight", "family": "Radiation Burst"},
    {"id": "unknown_decay", "name": "Unknown Decay", "size": "Heavy", "tier": "T4", "base_id": "decay", "family": "Radiation Burst"},
    {"id": "freedom_hammer", "name": "Freedom Hammer", "size": "Heavy", "tier": "T4", "base_id": "hammer", "family": "Blast Shotguns"},
    {"id": "freedom_mace", "name": "Freedom Mace", "size": "Medium", "tier": "T4", "base_id": "mace", "family": "Blast Shotguns"},
    {"id": "freedom_cudgel", "name": "Freedom Cudgel", "size": "Light", "tier": "T4", "base_id": "cudgel", "family": "Blast Shotguns"},

    # Sonic & Lasers
    {"id": "cryptic_redeemer", "name": "Cryptic Redeemer", "size": "Heavy", "tier": "T3", "base_id": "redeemer", "family": "Plasma Cannons"},
    {"id": "ardent_viper", "name": "Ardent Viper", "size": "Heavy", "tier": "T3", "base_id": "viper", "family": "Corrosive Acid"},
    {"id": "freedom_igniter", "name": "Freedom Igniter", "size": "Medium", "tier": "T3", "base_id": "igniter", "family": "Flamethrowers"},
    {"id": "freedom_skadi", "name": "Freedom Skadi", "size": "Medium", "tier": "T4", "base_id": "skadi", "family": "Freeze Lasers"},
    {"id": "corrupted_skadi", "name": "Corrupted Skadi", "size": "Medium", "tier": "T4", "base_id": "skadi", "family": "Freeze Lasers"},
    {"id": "cruel_bane", "name": "Cruel Bane", "size": "Heavy", "tier": "T4", "base_id": "bane", "family": "Corrosive Acid"},
    {"id": "cruel_talon", "name": "Cruel Talon", "size": "Heavy", "tier": "T4", "base_id": "glacier", "family": "Rocket Launchers"},
    {"id": "gothic_fainter", "name": "Gothic Fainter", "size": "Medium", "tier": "T4", "base_id": "pulsar", "family": "Lockdown Energy"},
    {"id": "dread_incinerator", "name": "Dread Incinerator", "size": "Heavy", "tier": "T4", "base_id": "incinerator", "family": "Blast Rockets"},
    {"id": "dread_scald", "name": "Dread Scald", "size": "Light", "tier": "T4", "base_id": "scald", "family": "Blast Rockets"},
    {"id": "solid_gauss", "name": "Solid Gauss", "size": "Heavy", "tier": "T4", "base_id": "gauss", "family": "Kinetic Sniper"},
    {"id": "stellar_halo", "name": "Stellar Halo", "size": "Light", "tier": "T3", "base_id": "halo", "family": "Lockdown Kinetic"},
    {"id": "stellar_corona", "name": "Stellar Corona", "size": "Medium", "tier": "T3", "base_id": "corona", "family": "Lockdown Kinetic"},
    {"id": "stellar_wasp", "name": "Stellar Wasp", "size": "Medium", "tier": "T3", "base_id": "pulsar", "family": "Corrosive Acid"},
    {"id": "stellar_hornet", "name": "Stellar Hornet", "size": "Heavy", "tier": "T4", "base_id": "dragoon", "family": "Corrosive Acid"},
    {"id": "ivory_scourge", "name": "Ivory Scourge", "size": "Medium", "tier": "T3", "base_id": "scourge", "family": "Tesla Lock-on"},
    {"id": "ivory_hussar", "name": "Ivory Hussar", "size": "Medium", "tier": "T3", "base_id": "hussar", "family": "Plasma Cannons"},
    {"id": "experimental_spark", "name": "Experimental Spark", "size": "Light", "tier": "T3", "base_id": "spark", "family": "Tesla Lock-on"},
    {"id": "sinister_pulsar", "name": "Sinister Pulsar", "size": "Medium", "tier": "T4", "base_id": "pulsar", "family": "Lockdown Energy"},
    {"id": "yan_di_avenger", "name": "Yan-di Avenger", "size": "Heavy", "tier": "T2", "base_id": "avenger", "family": "Kinetic Gatlings"}
]

SE_TITANS = [
    {"id": "baihu_luchador", "name": "Baihu Luchador", "tier": "Titan", "role": "Brawler Juggernaut", "base_id": "luchador", "hp_mult": 1.10},
    {"id": "kraken_indra", "name": "Kraken Indra", "tier": "Titan", "role": "Phase Extraction Brawler", "base_id": "indra", "hp_mult": 1.10},
    {"id": "stellar_sirius", "name": "Stellar Sirius", "tier": "Titan", "role": "Remote Repair Support", "base_id": "sirius", "hp_mult": 1.10},
    {"id": "aevum_minos", "name": "Aevum Minos", "tier": "Titan", "role": "Rush Brawler", "base_id": "minos", "hp_mult": 1.10},
    {"id": "scavenger_heimdall", "name": "Scavenger Heimdall", "tier": "Titan", "role": "Tactical Support", "base_id": "heimdall", "hp_mult": 1.10},
    {"id": "retro_nodens", "name": "Retro Nodens", "tier": "Titan", "role": "Squad Nanite Healer", "base_id": "nodens", "hp_mult": 1.10}
]

ROOT_DIR = "/Users/Chris David/Documents/Games/WRBrain"
GAMES_DIR = "/Users/Chris David/Documents/Games/WarRobots"

# Load base robots
base_robots = {}
for f in os.listdir(os.path.join(ROOT_DIR, "data/robots")):
    if f.endswith(".json"):
        with open(os.path.join(ROOT_DIR, "data/robots", f), "r") as fp:
            d = json.load(fp)
            base_robots[d["id"]] = d

# Generate SE Robots
for se in SE_ROBOTS:
    base = base_robots.get(se["base_id"])
    if not base:
        continue
    se_hp = int(base["hp"] * se["hp_mult"])
    se_data = {
        "id": se["id"],
        "name": se["name"],
        "tier": se["tier"],
        "role": se["role"],
        "hp": se_hp,
        "speed": base.get("speed", 50),
        "hardpoints": base.get("hardpoints", []),
        "ability": f"Special Edition: {base.get('ability', '')} (+10% Durability Bonus)"
    }
    with open(os.path.join(ROOT_DIR, "data/robots", f"{se['id']}.json"), "w") as fp:
        json.dump(se_data, fp, indent=2)

    # Markdown profile
    md_content = f"""# 🤖 {se['name']} — Special Edition Robot Profile

> **ID:** `{se['id']}` | **Tier:** `{se['tier']}` | **Role:** `{se['role']}`  
> **Base Durability:** `{se_hp:,} HP` (+10% SE Bonus) | **Base Speed:** `{base.get('speed', 50)} km/h`

---

## 📊 Core Specifications

| Attribute | Specification |
| :--- | :--- |
| **Robot Name** | **{se['name']}** |
| **Tier Category** | `{se['tier']}` |
| **Role Archetype** | `{se['role']}` |
| **Base HP (Mk1 Lv1)** | `{se_hp:,} (+10% SE Bonus)` |
| **Base Speed** | `{base.get('speed', 50)} km/h` |
| **Hardpoint Layout** | {', '.join([h['size'] for h in base.get('hardpoints', [])])} |

---

## ⚙️ Special Edition Benefits
* 🎨 **Exclusive 3D Paint & Model:** Distinct collector edition aesthetics.
* 🛡️ **Built-in Durability Amplification:** Permanent +10% base hull hit points.
"""
    se_md_dir = os.path.join(GAMES_DIR, "Robots/Special")
    os.makedirs(se_md_dir, exist_ok=True)
    with open(os.path.join(se_md_dir, f"{se['name']}.md"), "w") as fp:
        fp.write(md_content)

print(f"✅ Generated {len(SE_ROBOTS)} Special Edition Robots.")

# Load base weapons
base_weapons = {}
for f in os.listdir(os.path.join(ROOT_DIR, "data/weapons")):
    if f.endswith(".json"):
        with open(os.path.join(ROOT_DIR, "data/weapons", f), "r") as fp:
            d = json.load(fp)
            base_weapons[d["id"]] = d

# Generate SE Weapons
for se in SE_WEAPONS:
    base = base_weapons.get(se["base_id"], base_weapons.get("screamer"))
    se_data = {
        "id": se["id"],
        "name": se["name"],
        "size": se["size"],
        "tier": se["tier"],
        "range": base.get("range", 500),
        "burstDps": base.get("burstDps", 12000),
        "sustainedDps": base.get("sustainedDps", 7000),
        "reload": base.get("reload", 5.0),
        "family": se.get("family", base.get("family", "Special Arsenal")),
        "status": f"Special Edition {base.get('status', 'Combat System')} (+5% Visual Effect)"
    }
    with open(os.path.join(ROOT_DIR, "data/weapons", f"{se['id']}.json"), "w") as fp:
        json.dump(se_data, fp, indent=2)

    se_w_dir = os.path.join(GAMES_DIR, "Weapons/Special")
    os.makedirs(se_w_dir, exist_ok=True)
    w_md = f"""# ⚔️ {se['name']} — Special Edition Weapon Profile

> **ID:** `{se['id']}` | **Size:** `{se['size']}` | **Tier:** `{se['tier']}`  
> **Family:** `{se.get('family', 'Special Arsenal')}` | **Range:** `{base.get('range', 500)}m`

---

## 📊 Combat Specifications (Mk1 Lv 1 Base)

| Metric | Rating |
| :--- | :--- |
| **Weapon Name** | **{se['name']}** |
| **Mount Size** | `{se['size']}` |
| **Tier** | `{se['tier']}` |
| **Optimal Range** | `{base.get('range', 500)}m` |
| **Base Burst DPS** | `{base.get('burstDps', 12000):,} DPS` |
| **Base Cycle DPS** | `{base.get('sustainedDps', 7000):,} DPS` |
| **Reload Downtime** | `{base.get('reload', 5.0)}s` |
| **Weapon Family** | `{se.get('family', 'Special Arsenal')}` |
"""
    with open(os.path.join(se_w_dir, f"{se['name']}.md"), "w") as fp:
        fp.write(w_md)

print(f"✅ Generated {len(SE_WEAPONS)} Special Edition Weapons.")

# Load base titans
base_titans = {}
for f in os.listdir(os.path.join(ROOT_DIR, "data/titans")):
    if f.endswith(".json"):
        with open(os.path.join(ROOT_DIR, "data/titans", f), "r") as fp:
            d = json.load(fp)
            base_titans[d["id"]] = d

# Generate SE Titans
for se in SE_TITANS:
    base = base_titans.get(se["base_id"])
    if not base:
        continue
    se_hp = int(base["hp"] * se["hp_mult"])
    se_data = {
        "id": se["id"],
        "name": se["name"],
        "tier": "Titan",
        "role": se["role"],
        "hp": se_hp,
        "speed": base.get("speed", 45),
        "hardpoints": base.get("hardpoints", []),
        "ability": f"Special Edition: {base.get('ability', '')} (+10% Titan Hull Durability)"
    }
    with open(os.path.join(ROOT_DIR, "data/titans", f"{se['id']}.json"), "w") as fp:
        json.dump(se_data, fp, indent=2)

print(f"✅ Generated {len(SE_TITANS)} Special Edition Titans.")
