/* WRBrain - Main Application Bootstrap */

function renderAll() {
  renderHome();
  renderHangar('hangar1', 'hangar1-grid');
  renderHangar('hangar2', 'hangar2-grid');
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.CommanderAuth && typeof window.CommanderAuth.restoreHangarFromCloud === 'function') {
    window.CommanderAuth.restoreHangarFromCloud();
  }
  renderAll();
});
renderAll();
