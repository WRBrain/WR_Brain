/* WRBrain - App State Management & Persistence */

const STORAGE_KEY = "WRBRAIN_PERSIST_V6";
    let AppState = (function() {
      let state = null;
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) state = JSON.parse(saved);
      } catch (e) {}

      if (!state) {
        state = {
          hangars: {
            hangar1: {
              id: "hangar1",
              name: "Hangar 1: Primary Assault Team",
              mothership: { id: "paladin", name: "Paladin", level: "Lv 60", tier: "T4", effect: "Deploys a 300,000 HP Aegis Dome and repairs 250,000 unhealable Grey Damage." },
              titanSlot: {
                titanId: "luchador",
                level: "Lv 15",
                weapons: [
                  { id: "veyron", name: "Veyron", size: "Alpha", level: "Lv 1", tier: "T4" },
                  { id: "evora", name: "Evora", size: "Beta", level: "Lv 1", tier: "T4" },
                  { id: "evora", name: "Evora", size: "Beta", level: "Lv 1", tier: "T4" }
                ]
              },
              slots: [
                { robotId: "nuo", level: "Lv 1", drone: { id: "apopo", name: "Apopo", level: "Lv 12", tier: "T4" }, weapons: [{ id: "ardent_hwangje", size: "Heavy", level: "Lv 1" }, { id: "urhag", size: "Medium", level: "MK2 Lv 1" }, { id: "urhag", size: "Medium", level: "MK2 Lv 11" }] },
                { robotId: "scorpion", level: "Lv 5", weapons: [{ id: "cryo", size: "Medium", level: "Lv 6" }, { id: "cryo", size: "Medium", level: "Lv 1" }, { id: "sinister_rime", size: "Light", level: "Lv 6" }] },
                { robotId: "ammit", level: "Lv 1", weapons: [{ id: "kroko", size: "Heavy", level: "Lv 1" }, { id: "hippo", size: "Medium", level: "Lv 1" }, { id: "hippo", size: "Medium", level: "Lv 1" }, { id: "aramis", size: "Light", level: "Lv 1" }] },
                { robotId: "rex", level: "Lv 4", weapons: [{ id: "murix", size: "Heavy", level: "Lv 4" }, { id: "murix", size: "Heavy", level: "Lv 4" }, { id: "elox", size: "Medium", level: "Lv 4" }, { id: "ksiphos", size: "Light", level: "Lv 1" }] },
                { robotId: "hastatus", level: "Lv 6", weapons: [{ id: "pilum", size: "Medium", level: "Lv 3" }, { id: "gladius", size: "Light", level: "Lv 4" }, { id: "gladius", size: "Light", level: "Lv 4" }] }
              ]
            },
            hangar2: {
              id: "hangar2",
              name: "Hangar 2: Specialized Strike Squad",
              mothership: { id: "avalon", name: "Avalon", level: "Lv 35", tier: "T4", effect: "Cleanses all negative status effects (Rust, EMP, Blind), grants Immunity stacks, and heals Grey Damage." },
              titanSlot: {
                titanId: "indra",
                level: "Lv 1",
                weapons: [
                  { id: "vajra", name: "Vajra", size: "Alpha", level: "Lv 1", tier: "T4" },
                  { id: "maha_vajra", name: "Maha-Vajra", size: "Beta", level: "Lv 1", tier: "T4" },
                  { id: "maha_vajra", name: "Maha-Vajra", size: "Beta", level: "Lv 1", tier: "T4" }
                ]
              },
              slots: [
                { robotId: "ultimate_ares", level: "Lv 3", weapons: [{ id: "damper", size: "Medium", level: "Lv 1" }, { id: "shatter", size: "Medium", level: "Lv 1" }, { id: "razdor", size: "Light", level: "Lv 1" }, { id: "razdor", size: "Light", level: "Lv 1" }] },
                { robotId: "void_shoggoth", level: "Lv 1", weapons: [{ id: "decay", size: "Heavy", level: "Lv 1" }, { id: "basileus", size: "Medium", level: "Lv 1" }, { id: "neon_machaira", size: "Light", level: "Lv 1" }, { id: "machaira", size: "Light", level: "Lv 1" }] },
                { robotId: "vector", level: "Lv 6", weapons: [{ id: "fahrenheit", size: "Heavy", level: "Lv 1" }, { id: "kroko", size: "Medium", level: "Lv 1" }, { id: "celsius", size: "Medium", level: "Lv 1" }, { id: "steel_hedjet", size: "Light", level: "Lv 1" }] },
                { robotId: "dagon", level: "Lv 1", weapons: [{ id: "gladius", size: "Light", level: "Lv 2" }, { id: "gladius", size: "Light", level: "Lv 2" }, { id: "gladius", size: "Light", level: "Lv 2" }, { id: "tamer", size: "Light", level: "Lv 1" }, { id: "velos", size: "Light", level: "Lv 1" }, { id: "velos", size: "Light", level: "Lv 1" }] },
                { robotId: "siren", level: "Lv 1", weapons: [{ id: "smuta", size: "Heavy", level: "Lv 1" }, { id: "smuta", size: "Heavy", level: "Lv 1" }, { id: "smite", size: "Light", level: "Lv 1" }] }
              ]
            }
          },
          reserveRobots: [
            { robotId: "bagliore", level: "Lv 1", tier: "T4" },
            { robotId: "fafnir", level: "Lv 1", tier: "T4" },
            { robotId: "fenrir", level: "Lv 1", tier: "T4" },
            { robotId: "imugi", level: "Lv 1", tier: "T4" },
            { robotId: "nether", level: "Lv 1", tier: "T4" },
            { robotId: "omen_fang", level: "Lv 1", tier: "T4" },
            { robotId: "raven", level: "Lv 2", tier: "T3" },
            { robotId: "weyland", level: "Lv 2", tier: "T3" },
            { robotId: "ao_qin", level: "Lv 1", tier: "T2" },
            { robotId: "carnage", level: "Lv 1", tier: "T2" },
            { robotId: "kumiho", level: "Lv 1", tier: "T2" },
            { robotId: "lancelot", level: "Lv 1", tier: "T2" }
          ],
          reserveTitans: [
            { titanId: "luchador", level: "Lv 15", tier: "T4" },
            { titanId: "indra", level: "Lv 1", tier: "T4" },
            { titanId: "kid", level: "Lv 10", tier: "T3" }
          ],
          reserveDrones: [
            { id: "persephone", name: "Persephone", level: "Lv 9", tier: "T4", role: "Targeted HP Repair Field", desc: "Targeted healing beam sustains allied hull durability.", count: 1 },
            { id: "kestrel", name: "Kestrel", level: "Lv 12", tier: "T4", role: "Speed & Execution", count: 1 },
            { id: "shai", name: "Shai", level: "Lv 9", tier: "T4", role: "Last Stand Defense", count: 1 },
            { id: "armadillo", name: "Armadillo", level: "Lv 4", tier: "T4", role: "Beacon Stacking Armor", count: 1 },
            { id: "barrel", name: "Barrel", level: "Lv 6", tier: "T4", role: "Suicide Nuke", count: 1 }
          ],
          reservePilots: [
            { id: "bernadette_wolff", name: "Bernadette Wolff", bot: "Fenrir", level: "Lv 50", tier: "T4", skill: "+60% Base Durability", count: 1 },
            { id: "river_chase", name: "River Chase", bot: "Typhon", level: "Lv 40", tier: "T4", skill: "+25% Bonus Weapon Damage", count: 1 },
            { id: "yang_lee", name: "Yang Lee", bot: "Siren / Harpy", level: "Lv 30", tier: "T4", skill: "Quantum Radar & Shieldbreaker", count: 1 }
          ],
          reserveMotherships: [
            { id: "paladin", name: "Paladin", level: "Lv 60", tier: "T4", effect: "Aegis Dome + Grey Damage Repair", count: 1 },
            { id: "avalon", name: "Avalon", level: "Lv 35", tier: "T4", effect: "Cleanse All Negative Effects + Aegis", count: 1 },
            { id: "dreadnought_a42", name: "Dreadnought A42", level: "Lv 25", tier: "T2", effect: "Orbital Kinetic Strike", count: 1 }
          ],
          reserveWeapons: {
            heavy: [
              { id: "lumen_h", name: "Lumen-H", tier: "T4", level: "Lv 1", count: 1 },
              { id: "athos", name: "Athos", tier: "T4", level: "Lv 1", count: 1 },
              { id: "kelvin", name: "Kelvin", tier: "T4", level: "Lv 1", count: 1 },
              { id: "liodari", name: "Liodari", tier: "T4", level: "Lv 1", count: 2 },
              { id: "pilum", name: "Pilum", tier: "T4", level: "Lv 1", count: 4 },
              { id: "boom", name: "Boom", tier: "T4", level: "Lv 6", count: 2 },
              { id: "kirin", name: "Kirin", tier: "T4", level: "Lv 1", count: 2 },
              { id: "dune", name: "Dune", tier: "T4", level: "Lv 1", count: 4 },
              { id: "brisant", name: "Brisant", tier: "T4", level: "Lv 1", count: 1 },
              { id: "talon", name: "Talon", tier: "T4", level: "Lv 1", count: 1 },
              { id: "smuta", name: "Smuta", tier: "T4", level: "Lv 1", count: 1 },
              { id: "decay", name: "Decay", tier: "T4", level: "Lv 1", count: 1 },
              { id: "kang_dae", name: "Kang Dae", tier: "T2", level: "Lv 5", count: 13 },
              { id: "thunder", name: "Thunder", tier: "T1", level: "Lv 5", count: 11 }
            ],
            medium: [
              { id: "nanea", name: "Nanea", tier: "T4", level: "Lv 1", count: 1 },
              { id: "kroko", name: "Kroko", tier: "T4", level: "Lv 1", count: 1 },
              { id: "mogwan", name: "Mogwan", tier: "T4", level: "Lv 1", count: 1 },
              { id: "growler", name: "Growler", tier: "T4", level: "Lv 1", count: 1 },
              { id: "cryo", name: "Cryo", tier: "T4", level: "Lv 1", count: 1 },
              { id: "porthos", name: "Porthos", tier: "T4", level: "Lv 1", count: 1 },
              { id: "havoc", name: "Havoc", tier: "T4", level: "Lv 1", count: 1 },
              { id: "tulumbas", name: "Tulumbas", tier: "T2", level: "Lv 1", count: 14 },
              { id: "punisher_t", name: "Punisher T", tier: "T1", level: "Lv 1", count: 19 }
            ],
            light: [
              { id: "aramis", name: "Aramis", tier: "T4", level: "Lv 1", count: 2 },
              { id: "hippo", name: "Hippo", tier: "T4", level: "Lv 1", count: 1 },
              { id: "voonith", name: "Voonith", tier: "T4", level: "Lv 1", count: 1 },
              { id: "velos", name: "Velos", tier: "T4", level: "Lv 1", count: 1 },
              { id: "gladius", name: "Gladius", tier: "T4", level: "Lv 1", count: 2 },
              { id: "scatter", name: "Scatter", tier: "T4", level: "Lv 1", count: 2 },
              { id: "blaze", name: "Blaze", tier: "T3", level: "Lv 1", count: 4 },
              { id: "punisher", name: "Punisher", tier: "T1", level: "Lv 1", count: 24 }
            ],
            alpha: [
              { id: "veyron", name: "Veyron", tier: "T4", level: "Lv 1", count: 1 },
              { id: "tonans", name: "Tonans", tier: "T4", level: "Lv 1", count: 1 }
            ],
            beta: [
              { id: "evora", name: "Evora", tier: "T4", level: "Lv 1", count: 2 },
              { id: "fulgur", name: "Fulgur", tier: "T4", level: "Lv 1", count: 2 }
            ]
          }
        };
      }

      // Guarantee collections exist
      if (!state.reserveTitans) state.reserveTitans = [{ titanId: "luchador", level: "Lv 15", tier: "T4" }, { titanId: "kid", level: "Lv 10", tier: "T3" }];
      if (!state.reserveDrones) state.reserveDrones = [{ id: "kestrel", name: "Kestrel", level: "Lv 12", tier: "T4", role: "Speed & Execution", count: 1 }, { id: "barrel", name: "Barrel", level: "Lv 6", tier: "T4", role: "Suicide Nuke", count: 1 }];
      if (!state.reservePilots) state.reservePilots = [{ id: "bernadette_wolff", name: "Bernadette Wolff", bot: "Fenrir", level: "Lv 50", tier: "T4", skill: "+60% Base Durability", count: 1 }];
      if (!state.reserveMotherships) state.reserveMotherships = [{ id: "paladin", name: "Paladin", level: "Lv 60", tier: "T4", effect: "Aegis Dome + Grey Damage Repair", count: 1 }];
      if (!state.reserveRobots) state.reserveRobots = [];
      if (!state.reserveWeapons) state.reserveWeapons = { heavy: [], medium: [], light: [], alpha: [], beta: [] };

      // Ensure Apopo and Lumen-H are present
      if (!state.reserveDrones.find(d => d.id === 'apopo')) {
        state.reserveDrones.unshift({ id: "apopo", name: "Apopo", level: "Lv 12", tier: "T4", role: "Assault Combat Support", desc: "Provides high-yield defense points on taking damage and amplifies active firepower under 300m.", count: 1 });
      }
      if (state.reserveWeapons && state.reserveWeapons.heavy && !state.reserveWeapons.heavy.find(w => w.id === 'lumen_h')) {
        state.reserveWeapons.heavy.unshift({ id: "lumen_h", name: "Lumen-H", tier: "T4", level: "Lv 1", count: 1 });
      }

      // Ensure Titan slots exist in both hangars
      if (state.hangars && state.hangars.hangar1 && !state.hangars.hangar1.titanSlot) {
        state.hangars.hangar1.titanSlot = {
          titanId: "luchador",
          level: "Lv 15",
          weapons: [
            { id: "veyron", name: "Veyron", size: "Alpha", level: "Lv 1", tier: "T4" },
            { id: "evora", name: "Evora", size: "Beta", level: "Lv 1", tier: "T4" },
            { id: "evora", name: "Evora", size: "Beta", level: "Lv 1", tier: "T4" }
          ]
        };
      }
      if (state.hangars && state.hangars.hangar2 && !state.hangars.hangar2.titanSlot) {
        state.hangars.hangar2.titanSlot = {
          titanId: "indra",
          level: "Lv 1",
          weapons: [
            { id: "vajra", name: "Vajra", size: "Alpha", level: "Lv 1", tier: "T4" },
            { id: "maha_vajra", name: "Maha-Vajra", size: "Beta", level: "Lv 1", tier: "T4" },
            { id: "maha_vajra", name: "Maha-Vajra", size: "Beta", level: "Lv 1", tier: "T4" }
          ]
        };
      }

      // Ensure Mothership exists in both hangars
      if (state.hangars && state.hangars.hangar1 && !state.hangars.hangar1.mothership) {
        state.hangars.hangar1.mothership = { id: "paladin", name: "Paladin", level: "Lv 60", tier: "T4", effect: "Deploys a 300,000 HP Aegis Dome and repairs 250,000 unhealable Grey Damage." };
      }
      if (state.hangars && state.hangars.hangar2 && !state.hangars.hangar2.mothership) {
        state.hangars.hangar2.mothership = { id: "avalon", name: "Avalon", level: "Lv 35", tier: "T4", effect: "Cleanses all negative status effects (Rust, EMP, Blind), grants Immunity stacks, and heals Grey Damage." };
      }

      // Ensure Hastatus Gladius is updated to Lv 4
      if (state.hangars && state.hangars.hangar1 && state.hangars.hangar1.slots && state.hangars.hangar1.slots[4]) {
        const hSlot = state.hangars.hangar1.slots[4];
        if (hSlot.robotId === 'hastatus' && hSlot.weapons) {
          hSlot.weapons.forEach(w => {
            if (w && w.id === 'gladius' && w.level === 'Lv 3') w.level = 'Lv 4';
          });
        }
      }

      // Ensure all equipped and reserve pilots have 7 skills initialized
      ['hangar1', 'hangar2'].forEach(hk => {
        if (state.hangars && state.hangars[hk] && state.hangars[hk].slots) {
          state.hangars[hk].slots.forEach(slot => {
            if (slot && slot.pilot && (!slot.pilot.skills || slot.pilot.skills.length === 0)) {
              const mb = MASTER_ROBOTS.find(r => r.id === slot.robotId);
              slot.pilot.skills = getDefaultPilotSkills(mb ? mb.role : "Brawler");
            }
          });
        }
      });
      if (state.reservePilots) {
        state.reservePilots.forEach(p => {
          if (!p.skills || p.skills.length === 0) {
            p.skills = getDefaultPilotSkills("Brawler");
          }
        });
      }

      return state;
    })();

    function saveState() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState)); } catch (e) {}
      renderAll();
    }
