/* WRBrain - War Robots Level Scaling & Multiplier Engine */

const BOT_LEVELS = [
  "Lv 1", "Lv 2", "Lv 3", "Lv 4", "Lv 5", "Lv 6", "Lv 7", "Lv 8", "Lv 9", "Lv 10", "Lv 11", "Lv 12",
  "MK2 Lv 1", "MK2 Lv 2", "MK2 Lv 3", "MK2 Lv 4", "MK2 Lv 5", "MK2 Lv 6", "MK2 Lv 7", "MK2 Lv 8", "MK2 Lv 9", "MK2 Lv 10", "MK2 Lv 11", "MK2 Lv 12",
  "MK3"
];
const WEAPON_LEVELS = BOT_LEVELS;
const TITAN_LEVELS = Array.from({ length: 150 }, (_, i) => `Lv ${i + 1}`);
const TITAN_WEAPON_LEVELS = Array.from({ length: 25 }, (_, i) => `Lv ${i + 1}`);
const DRONE_LEVELS = Array.from({ length: 12 }, (_, i) => `Lv ${i + 1}`);
const PILOT_LEVELS = Array.from({ length: 70 }, (_, i) => `Lv ${i + 1}`);
const MOTHERSHIP_LEVELS = Array.from({ length: 60 }, (_, i) => `Lv ${i + 1}`);

function getLevelMultiplier(levelStr, type = 'bot_or_weapon') {
  if (!levelStr) return 1.0;
  
  if (type === 'bot_or_weapon') {
    if (levelStr === 'MK3' || levelStr === 'MK3 Lv 1') return 3.90;
    
    if (levelStr.startsWith('MK2')) {
      const parts = levelStr.replace('MK2', '').trim().replace('Lv', '').trim();
      const mk2Lvl = Math.max(1, Math.min(12, parseInt(parts) || 1));
      const mk1Max = 2.62;
      const mk2Bonus = 0.20 + ((mk2Lvl - 1) * 0.02);
      return mk1Max * (1 + mk2Bonus);
    }
    
    const lvlNum = Math.max(1, Math.min(12, parseInt(levelStr.replace('Lv', '').trim()) || 1));
    return Math.pow(1.092, lvlNum - 1);
  }
  
  if (type === 'titan') {
    const lvlNum = Math.max(1, Math.min(150, parseInt(levelStr.replace('Lv', '').trim()) || 1));
    return 1.0 + ((lvlNum - 1) / 149) * 1.85;
  }
  
  if (type === 'titan_weapon') {
    const lvlNum = Math.max(1, Math.min(25, parseInt(levelStr.replace('Lv', '').trim()) || 1));
    return 1.0 + ((lvlNum - 1) / 24) * 1.25;
  }

  return 1.0;
}

function getLevelBadgeStyle(levelStr) {
  if (!levelStr) return 'bg-gray-800 text-gray-300 border-gray-700';
  if (levelStr === 'MK3') return 'bg-gradient-to-r from-red-600 to-amber-500 text-black font-black border-amber-400 shadow-md shadow-amber-500/30';
  if (levelStr.startsWith('MK2')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold';
  return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
}

window.onHangarSliderDrag = function(hangarKey, itemType, slotIndex, subIndex, sliderValue) {
  const isTitan = itemType === 'titan';
  const isTitanW = itemType === 'titan_weapon';
  const levelList = isTitan ? TITAN_LEVELS : isTitanW ? TITAN_WEAPON_LEVELS : BOT_LEVELS;
  const newLevel = levelList[sliderValue] || levelList[0];
  const sIdx = (slotIndex !== null && slotIndex !== undefined) ? slotIndex : 'null';
  const subIdx = (subIndex !== null && subIndex !== undefined) ? subIndex : 'null';

  // 1. Update Badge text and styling in place
  const badge = document.getElementById(`lvl-badge-${hangarKey}-${itemType}-${sIdx}-${subIdx}`);
  if (badge) {
    badge.innerText = newLevel;
    badge.className = `text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${isTitan || isTitanW ? 'bg-red-500/20 text-red-300 border-red-500/40' : getLevelBadgeStyle(newLevel)}`;
  }

  // 2. Update memory state in AppState & live stat labels
  const hangar = AppState.hangars[hangarKey];
  if (hangar) {
    if (isTitan && hangar.titanSlot) {
      hangar.titanSlot.level = newLevel;
      const mt = MASTER_TITANS.find(t => t.id === hangar.titanSlot.titanId);
      const mult = getLevelMultiplier(newLevel, 'titan');
      const hpEl1 = document.getElementById(`live-hp-${hangarKey}-titan`);
      const hpEl2 = document.getElementById(`live-hp2-${hangarKey}-titan`);
      if (mt) {
        const str = `${Math.round((mt.hp || 950000) * mult).toLocaleString()} HP`;
        if (hpEl1) hpEl1.innerText = str;
        if (hpEl2) hpEl2.innerText = str;
      }
    } else if (isTitanW && hangar.titanSlot && hangar.titanSlot.weapons && hangar.titanSlot.weapons[subIndex]) {
      hangar.titanSlot.weapons[subIndex].level = newLevel;
      const wId = hangar.titanSlot.weapons[subIndex].id;
      const mw = MASTER_WEAPONS.find(w => w.id === wId);
      const mult = getLevelMultiplier(newLevel, 'titan_weapon');
      const dpsEl = document.getElementById(`live-dps-${hangarKey}-titan-null-${subIndex}`);
      if (dpsEl && mw) dpsEl.innerText = `${Math.round(mw.burstDps * mult).toLocaleString()} DPS`;
    } else if (itemType === 'robot' && hangar.slots && hangar.slots[slotIndex]) {
      hangar.slots[slotIndex].level = newLevel;
      const mb = MASTER_ROBOTS.find(r => r.id === hangar.slots[slotIndex].robotId);
      const mult = getLevelMultiplier(newLevel, 'bot_or_weapon');
      const hpEl = document.getElementById(`live-hp-${hangarKey}-robot-${slotIndex}`);
      if (hpEl && mb) hpEl.innerText = `${Math.round((mb.hp || 220000) * mult).toLocaleString()} HP`;
    } else if (itemType === 'weapon' && hangar.slots && hangar.slots[slotIndex] && hangar.slots[slotIndex].weapons && hangar.slots[slotIndex].weapons[subIndex]) {
      hangar.slots[slotIndex].weapons[subIndex].level = newLevel;
      const wId = hangar.slots[slotIndex].weapons[subIndex].id;
      const mw = MASTER_WEAPONS.find(w => w.id === wId);
      const mult = getLevelMultiplier(newLevel, 'bot_or_weapon');
      const dpsEl = document.getElementById(`live-dps-${hangarKey}-weapon-${slotIndex}-${subIndex}`);
      if (dpsEl && mw) dpsEl.innerText = `${Math.round(mw.burstDps * mult).toLocaleString()} DPS`;
    }
  }
};

window.onHangarSliderRelease = function(hangarKey) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState)); } catch (e) {}
  if (currentAuditHangar === hangarKey && typeof runAudit === 'function') {
    runAudit(hangarKey);
  }
};

function renderLevelSliderControl(hangarKey, itemType, slotIndex, subIndex, currentLevel, levelList, type = 'bot_or_weapon') {
  const currentIdx = Math.max(0, levelList.indexOf(currentLevel));
  const sIdx = (slotIndex !== null && slotIndex !== undefined) ? slotIndex : 'null';
  const subIdx = (subIndex !== null && subIndex !== undefined) ? subIndex : 'null';
  const sliderClass = type === 'titan' ? 'level-slider level-slider-titan' : 'level-slider';
  const badgeStyle = type === 'titan' ? 'bg-red-500/20 text-red-300 border-red-500/40' : getLevelBadgeStyle(currentLevel);
  const badgeId = `lvl-badge-${hangarKey}-${itemType}-${sIdx}-${subIdx}`;

  // Quick Preset buttons
  let presetsHtml = '';
  if (type === 'bot_or_weapon') {
    presetsHtml = `
      <div class="flex items-center gap-1 mt-1">
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 1')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#111620] hover:bg-[#1a2332] text-gray-400 hover:text-white border border-[#263040]">1</button>
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 12')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#111620] hover:bg-[#1a2332] text-blue-300 hover:text-white border border-blue-900/40">12</button>
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'MK2 Lv 12')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#111620] hover:bg-[#1a2332] text-amber-300 hover:text-white border border-amber-900/40">MK2</button>
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'MK3')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40">MK3 ★</button>
      </div>
    `;
  } else if (type === 'titan') {
    presetsHtml = `
      <div class="flex items-center gap-1 mt-1">
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 1')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#111620] hover:bg-[#1a2332] text-gray-400 border border-[#263040]">1</button>
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 50')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#111620] hover:bg-[#1a2332] text-red-300 border border-red-900/40">50</button>
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 100')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#111620] hover:bg-[#1a2332] text-red-300 border border-red-900/40">100</button>
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 150')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/50">150 ★</button>
      </div>
    `;
  } else if (type === 'titan_weapon') {
    presetsHtml = `
      <div class="flex items-center gap-1 mt-1">
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 1')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#111620] hover:bg-[#1a2332] text-gray-400 border border-[#263040]">1</button>
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 12')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#111620] hover:bg-[#1a2332] text-orange-300 border border-orange-900/40">12</button>
        <button onclick="changeItemLevel('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, 'Lv 25')" class="px-1.5 py-0.2 text-[9px] font-bold rounded bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/50">25 ★</button>
      </div>
    `;
  }

  return `
    <div class="inline-flex flex-col items-start bg-[#0b1019] border border-[#263040] rounded-lg px-2 py-1 shadow-inner">
      <div class="flex items-center gap-2 w-full">
        <span id="${badgeId}" class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${badgeStyle}">${currentLevel}</span>
        <input type="range" min="0" max="${levelList.length - 1}" value="${currentIdx}" 
          oninput="onHangarSliderDrag('${hangarKey}', '${itemType}', ${sIdx}, ${subIdx}, this.value)" 
          onchange="onHangarSliderRelease('${hangarKey}')"
          class="${sliderClass} w-24 sm:w-28" title="Drag smoothly to scale level">
      </div>
      ${presetsHtml}
    </div>
  `;
}

// Fallback compatibility
function renderLevelDropdown(hangarKey, itemType, slotIndex, subIndex, currentLevel, levelList) {
  return renderLevelSliderControl(hangarKey, itemType, slotIndex, subIndex, currentLevel, levelList, itemType);
}
