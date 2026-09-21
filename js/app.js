/* WRBrain - Main Application Bootstrap */

function renderAll() {
  if (typeof renderHome === 'function') {
    renderHome();
  }
  if (typeof renderHangarDeckSelector === 'function') {
    renderHangarDeckSelector();
  }
  const activeKey = window.currentActiveHangarKey || (typeof currentActiveHangarKey !== 'undefined' ? currentActiveHangarKey : "hangar1");
  if (typeof renderHangar === 'function') {
    renderHangar(activeKey, 'hangar-active-grid');
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


