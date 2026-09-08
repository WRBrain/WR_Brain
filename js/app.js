/* WRBrain - Main Application Bootstrap */

function renderAll() {
  if (typeof renderHome === 'function') {
    renderHome();
  }
  if (typeof renderHangarDeckSelector === 'function') {
    renderHangarDeckSelector();
  }
  if (typeof renderHangar === 'function' && typeof currentActiveHangarKey !== 'undefined') {
    renderHangar(currentActiveHangarKey, 'hangar-active-grid');
  }
  if (typeof renderPersonalStorage === 'function') {
    renderPersonalStorage();
  }
}
window.renderAll = renderAll;

window.addEventListener('DOMContentLoaded', () => {
  if (window.CommanderAuth && typeof window.CommanderAuth.restoreHangarFromCloud === 'function') {
    window.CommanderAuth.restoreHangarFromCloud();
  }
  renderAll();
});
renderAll();


