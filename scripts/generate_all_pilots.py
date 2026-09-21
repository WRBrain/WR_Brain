import os
import json

PILOTS = [
    {"id": "walter_trommel", "name": "Walter Trommel", "bot": "Nuo", "tier": "T4", "skill": "Sonic Resonance Tether: Increases Nuo's flight speed by 25% and repairs 5% grey damage per second during Siege Link."},
    {"id": "grey_condor", "name": "Grey", "bot": "Condor", "tier": "T4", "skill": "Apex Predator: +25% Sonic Scream damage & restores 15% durability upon eliminating an enemy during flight."},
    {"id": "maya_patel", "name": "Maya Patel", "bot": "Raptor", "tier": "T4", "skill": "Comet Vanguard: Grants +35% Defense Points and reflects +20% additional damage with Reflector on landing."},
    {"id": "curtis_drake", "name": "Curtis Drake", "bot": "Pathfinder", "tier": "T4", "skill": "Hunter's Mark: Increases Track duration by 3s and boosts team damage against tracked foes by +15%."},
    {"id": "zoe_kamau", "name": "Zoe Kamau", "bot": "Curie", "tier": "T4", "skill": "Turret Overclock: Increases turret fire rate by 30% and instantly restores 20% Aegis shield on ability activation."},
    {"id": "captain_thorne", "name": "Captain Thorne", "bot": "Shenlou", "tier": "T4", "skill": "Phase Blitz: Backstab teleport releases an EMP pulse silencing target active abilities for 2.5s."},
    {"id": "nathan_fleming", "name": "Nathan Fleming", "bot": "Dagon", "tier": "T4", "skill": "Aegis Resurgence: +50% Aegis recharge rate and +15% weapon damage while Aegis shield holds."},
    {"id": "vepkho_mzhavia", "name": "Vepkho Mzhavia", "bot": "Ochokochi", "tier": "T4", "skill": "Rampaging Bull: Stampede deals +30% collision damage and grants temporary Stealth after charge ends."},
    {"id": "bernadette_wolff", "name": "Bernadette Wolff", "bot": "Fenrir", "tier": "T4", "skill": "Fenrir's Will: Replaces Aegis shield with +60% additional base durability (+80 Defense Points)."},
    {"id": "nicolas_wodanson", "name": "Nicolas Wodanson", "bot": "Fenrir", "tier": "T4", "skill": "Wodanson's Protection: Fenrir gains +25 Defense Points while its active ability is recharging."},
    {"id": "river_chase", "name": "River Chase", "bot": "Siren", "tier": "T4", "skill": "Snowstorm Fury: Siren deals +20% weapon damage while flying in Snowstorm."},
    {"id": "daniel_delgado", "name": "Daniel Delgado", "bot": "Harpy", "tier": "T4", "skill": "Firestorm Overdrive: Harpy built-in firestorm inflicts +25% burn damage."},
    {"id": "misaki_misha", "name": "Misaki & Misha", "bot": "Khepri", "tier": "T4", "skill": "True Bond: Khepri and its tethered ally become immune to Freeze, Lockdown, and Suppression."},
    {"id": "svyatogor_belov", "name": "Svyatogor Belov", "bot": "Fafnir", "tier": "T4", "skill": "Breaching Shot: Built-in weapon and equipped guns completely bypass enemy Absorber shields."},
    {"id": "ash_skarsgard", "name": "Ash Skarsgard", "bot": "Scorpion", "tier": "T4", "skill": "Shadow Step: Scorpion gains Stealth for 5 seconds upon activating and teleporting via Backstab."},
    {"id": "iskra_mult", "name": "Iskra Mult", "bot": "Scorpion", "tier": "T4", "skill": "Hunter's Instinct: Scorpion gains +15% damage bonus and 35% speed boost after teleporting."},
    {"id": "arnav_poe", "name": "Arnav Poe", "bot": "Ravana", "tier": "T4", "skill": "Poe's Transcendence: Grants Ravana an additional 3rd Transcendence ability charge."},
    {"id": "chester_coen", "name": "Chester Coen", "bot": "Loki", "tier": "T4", "skill": "Ghost Runner: Loki receives temporary Stealth for 5 seconds when exiting Recon mode."},
    {"id": "cormac_briggs", "name": "Cormac Briggs", "bot": "Falcon", "tier": "T4", "skill": "Briggs' Special: Falcon's central Heavy weapon deals +15% increased weapon damage."},
    {"id": "clive_vicious", "name": "Clive Vicious", "bot": "Blitz", "tier": "T4", "skill": "Craze Armor: Replaces Aegis shield with +80% Defense Points during Break-in ability."},
    {"id": "thomas_mindread", "name": "Thomas Mindread", "bot": "Leech", "tier": "T4", "skill": "Adrenaline Rush: Leech gains +35% movement speed while Repulse is active."},
    {"id": "kyle_rogers_hawk", "name": "Kyle Rogers", "bot": "Hawk", "tier": "T4", "skill": "Lockdown Immunity: Hawk becomes completely immune to Lockdown and Suppression effects."},
    {"id": "kyle_rogers_inquisitor", "name": "Kyle Rogers (Inquisitor)", "bot": "Inquisitor", "tier": "T3", "skill": "Stealth Master: Inquisitor repairs 10% durability upon entering Descend stealth."},
    {"id": "yang_lee_ao_jun", "name": "Yang Lee", "bot": "Ao Jun", "tier": "T4", "skill": "Dragon Eye: Grants Quantum Radar (stealth detection) during Dragon Flight."},
    {"id": "marie_leclair", "name": "Marie Leclair", "bot": "Mender", "tier": "T4", "skill": "Nanite Overhaul: Mender's pulse ability can repair unhealable Grey Damage for itself and allies."},
    {"id": "eddie_noll", "name": "Eddie Noll", "bot": "Shotgun Specialist", "tier": "T4", "skill": "Shotgun Velocity: Kinetic and energy shotguns gain +15% increased rate of fire."},
    {"id": "brigitte_martel", "name": "Brigitte Martel", "bot": "Orochi", "tier": "T4", "skill": "Martel's Grace: Grants Orochi an additional 3rd Viper Strike dash charge."},
    {"id": "brijit_barot", "name": "Brijit Barot", "bot": "Orochi", "tier": "T4", "skill": "Barot's Camouflage: Orochi gains extended stealth duration during Viper Strike."},
    {"id": "jill_break", "name": "Jill Break", "bot": "Nemesis", "tier": "T4", "skill": "Break's Vengeance: Built-in rocket launcher deals +25% increased damage."},
    {"id": "alexander_frost", "name": "Alexander Frost", "bot": "Cerberus", "tier": "T4", "skill": "Frost's Suppression: Cerberus built-in cannon range increased to 500m."},
    {"id": "jad_parkes", "name": "Jad Parkes", "bot": "Erebus", "tier": "T4", "skill": "Homing Overload: Homemaker rocket swarm inflicts 15% more blackout damage."},
    {"id": "amalia_dewhurst", "name": "Amalia Dewhurst", "bot": "Weyland", "tier": "T4", "skill": "Field Surgeon: Weyland gains +35 Defense Points while in stationary repair mode."},
    {"id": "olga_minina", "name": "Olga Minina", "bot": "Phantom", "tier": "T4", "skill": "Phantom Reflexes: Phantom's Blink ability duration increased by 5 seconds."},
    {"id": "virginia_walker", "name": "Virginia Walker", "bot": "Nightingale", "tier": "T4", "skill": "Air Superiority: Nightingale's Air Support ability cooldown reduced by 5 seconds."},
    {"id": "louis_duncan", "name": "Louis Duncan", "bot": "Invader", "tier": "T4", "skill": "Duncan's Shield: Invader activates a 50k Aegis shield when durability falls below 50%."},
    {"id": "stanislav_protasov", "name": "Stanislav Protasov", "bot": "Invader", "tier": "T4", "skill": "Protasov's Suppression: Increases Suppression debuff strength by +20%."},
    {"id": "talita", "name": "Talita", "bot": "Mars", "tier": "T4", "skill": "Remote Artillery: Mars turret deals +25% higher blast damage and gains 100m range."},
    {"id": "victoria_walker", "name": "Victoria Walker", "bot": "Seraph", "tier": "T4", "skill": "Seraph Wing: Seraph flight speed increased by +20% and built-in lightning deals +15% damage."},
    {"id": "otto_scherer", "name": "Otto Scherer", "bot": "Radiation Specialist", "tier": "T4", "skill": "Radioactive Accelerator: Radiation burst weapons (Decay/Hazard/Blight) gain +35% increased firing rate."},
    {"id": "kelli_raven", "name": "Kelli & Raven", "bot": "Lynx", "tier": "T4", "skill": "Guillotine Sniper: Lynx execution threshold increased from 25% to 30% enemy HP."},
    {"id": "nessa_manning", "name": "Nessa Manning", "bot": "Nether", "tier": "T4", "skill": "Quinquennial Dash: Nether gains temporary stealth after using Quinquennial Dash."},
    {"id": "monique_leblanc", "name": "Monique Leblanc", "bot": "Imugi", "tier": "T4", "skill": "Portal Mastery: Teleport portal grants +35 Defense Points and instant 15% repair to allies."},
    {"id": "oliver_song", "name": "Oliver Song", "bot": "Angler", "tier": "T4", "skill": "Electric Surge: Angler's Electric Shift ability blinds and slows enemies for +2 seconds."},
    {"id": "harold_han", "name": "Harold Han", "bot": "Laser Specialist", "tier": "T4", "skill": "Optic Cooling: Laser weapons overheat 40% slower, sustaining maximum output."},
    {"id": "sanjay_goyal", "name": "Sanjay Goyal", "bot": "Erebus", "tier": "T4", "skill": "Overcharge Matrix: Erebus weapon damage increases by +15% while Aegis shield is active."},
    {"id": "adrian_chong", "name": "Adrian Chong", "bot": "Universal", "tier": "T4", "skill": "Adrian's Mastery: Increases damage across all equipped weapons by +5% unconditionally."},
    {"id": "trixie_hope", "name": "Trixie Hope", "bot": "Universal", "tier": "T4", "skill": "Hope's Concoction: Active module cooldown reduced by 50% with instant 10% repair on trigger."},
    {"id": "manni", "name": "Manni", "bot": "Universal", "tier": "T4", "skill": "Manni's Rage: Weapon damage increases by up to +15% as robot durability drops."},
    {"id": "kate_odonnell", "name": "Kate O'Donnell", "bot": "Lockdown Specialist", "tier": "T4", "skill": "Kinetic Lock: Lockdown weapons deal +10% damage and apply lockdown 25% faster."},
    {"id": "raphael_petit", "name": "Raphael Petit", "bot": "Flamethrower Specialist", "tier": "T4", "skill": "Napalm Expander: Flamethrower blast radius and projectile spread increased by 30%."},
    {"id": "jack_moore", "name": "Jack Moore", "bot": "Strider", "tier": "T4", "skill": "Moore's Momentum: Strider gains +5% damage per dash stack used in combat."},
    {"id": "alisa_kovalev", "name": "Alisa Kovalev", "bot": "Demeter", "tier": "T4", "skill": "Repair Protocol: Demeter's Absorber shield repairs 20% more hull durability."},
    {"id": "appm_3tr", "name": "APPM-3TR", "bot": "Demeter", "tier": "T4", "skill": "Nanite Overload: Demeter repairs 10% grey damage upon teleporting to an ally."},
    {"id": "ghost", "name": "Ghost", "bot": "Orochi", "tier": "T4", "skill": "Silent Assassin: Orochi gains +10% weapon damage while in stealth."},
    {"id": "min_ji_novak", "name": "Min-ji Novak", "bot": "Ares", "tier": "T4", "skill": "Novak's Retribution: Retribution built-in cannons gain +20% firing duration."},
    {"id": "rose_lin", "name": "Rose Lin", "bot": "Typhon", "tier": "T4", "skill": "Blackout Focus: Typhon gains +10% speed and +10% damage for 5 seconds after Blackout."},
    {"id": "andrey_knyazev", "name": "Andrey Knyazev", "bot": "Behemoth", "tier": "T4", "skill": "Siege Fortress: In Siege Mode, Behemoth gains +15% weapon range and +40 Defense Points."},
    
    # Titan Legendary Pilots
    {"id": "yang_lee_titan", "name": "Yang Lee (Titan)", "bot": "Any Titan", "tier": "Titan", "skill": "Titan Sensor Lock: Bypasses enemy Stealth (Quantum Radar) & grants +15% Titan weapon damage."},
    {"id": "liam_stern", "name": "Liam Stern", "bot": "Bedwyr", "tier": "Titan", "skill": "Phalanx Bastion: Bedwyr's barrier shield absorbs +30% more kinetic/energy damage."},
    {"id": "nessa_manning_titan", "name": "Nessa Manning (Titan)", "bot": "Aether / Rook", "tier": "Titan", "skill": "Celestial Overdrive: Titan ability recharge accelerated by 20% with +10% titan speed."},
    {"id": "oliver_song_titan", "name": "Oliver Song (Titan)", "bot": "Luchador / Minos", "tier": "Titan", "skill": "Titan Shockwave: Titan jump/slam blast radius increased by 30% with +15% damage."},
    {"id": "pilot_newton", "name": "Pilot Newton", "bot": "Newton", "tier": "Titan", "skill": "Choke Lift: Telekinesis choke duration increased by +2 seconds with +15% sniper damage."}
]

ROOT_DIR = "/Users/Chris David/Documents/Games/WRBrain"
GAMES_DIR = "/Users/Chris David/Documents/Games/WarRobots"

os.makedirs(os.path.join(ROOT_DIR, "data/pilots"), exist_ok=True)
os.makedirs(os.path.join(GAMES_DIR, "Pilots"), exist_ok=True)

for p in PILOTS:
    # Save individual JSON
    p_data = {
        "id": p["id"],
        "name": p["name"],
        "bot": p["bot"],
        "tier": p["tier"],
        "skill": p["skill"],
        "skills": [
            "Armor Expert",
            "Road Hog",
            "Mechanic",
            "Master Gunsmith",
            "Dodger",
            "Tough Guy",
            "Deft Survivor"
        ]
    }
    with open(os.path.join(ROOT_DIR, "data/pilots", f"{p['id']}.json"), "w") as fp:
        json.dump(p_data, fp, indent=2)

    # Save Markdown Profile
    md = f"""# 🧑‍✈️ {p['name']} — Legendary Pilot Profile

> **ID:** `{p['id']}` | **Tier:** `{p['tier']}` | **Assigned Unit:** `{p['bot']}`

---

## 👑 Innate Legendary Perk
* **Specialty:** {p['skill']}

---

## 🎖️ Skill Slot Matrix (Ranks 1–7)
* **Rank 1 (Private, Lv 1–10):** Innate Legendary Specialty + Slot 1
* **Rank 2 (Corporal, Lv 11–20):** Slot 2 Unlocked
* **Rank 3 (Sergeant, Lv 21–30):** Slot 3 Unlocked
* **Rank 4 (Lieutenant, Lv 31–40):** Slot 4 Unlocked
* **Rank 5 (Captain, Lv 41–50):** Slot 5 Unlocked
* **Rank 6 (Major, Lv 51–60):** Slot 6 Unlocked
* **Rank 7 (Colonel, Lv 61–70):** All 7 Slots Unlocked
"""
    with open(os.path.join(GAMES_DIR, "Pilots", f"{p['name'].replace('/', '_')}.md"), "w") as fp:
        fp.write(md)

print(f"✅ Generated {len(PILOTS)} Legendary Pilots.")
