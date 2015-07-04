/**
 * This file defines special keyboard bindings for the scene. Most movement
 * keyboard bindings are handled by `unrender` module (e.g. WASD). Here
 * we handle additional keyboard shortcuts. For example toggle steering mode
 */
export default sceneKeyboardBinding;

import events from '../service/appEvents.js';

function sceneKeyboardBinding(container) {
  var api = {
    destroy: destroy
  };
  var lastShiftKey = false;

  container.addEventListener('keydown', keydown, false);
  container.addEventListener('keyup', keyup, false);
  return api;

  function destroy() {
    container.removeEventListener('keydown', keydown, false);
    container.removeEventListener('keyup', keyup, false);
  }

  function keydown(e) {
    if (e.which === 32) { // spacebar
      events.toggleSteering.fire();
    } else if (e.which === 76) { // L - toggle links
      if (!e.ctrlKey && !e.metaKey) {
        events.toggleLinks.fire();
      }
    }
    if (e.shiftKey && !lastShiftKey) {
      lastShiftKey = true;
      events.accelerateNavigation.fire(true);
    }
  }

  function keyup(e) {
    if (lastShiftKey && !e.shiftKey) {
      lastShiftKey = false;
      events.accelerateNavigation.fire(false);
    }
  }

}
