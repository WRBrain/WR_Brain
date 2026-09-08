/* WRBrain - Main Application Bootstrap */

function renderAll() {
      renderHome();
      renderHangar('hangar1', 'hangar1-grid');
      renderHangar('hangar2', 'hangar2-grid');
    }

    window.addEventListener('DOMContentLoaded', () => {
      renderAll();
    });
    renderAll();
