/* WRBrain - Main Application Bootstrap */

function renderAll() {
  renderHome();
  if (typeof renderHangarDeckSelector === 'function') {
    renderHangarDeckSelector();
  }
  if (typeof renderHangar === 'function') {
    renderHangar(currentActiveHangarKey, 'hangar-active-grid');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.CommanderAuth && typeof window.CommanderAuth.restoreHangarFromCloud === 'function') {
    window.CommanderAuth.restoreHangarFromCloud();
  }
  renderAll();
});
renderAll();

