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

  container.addEventListener('keydown', keydown, false);
  return api;

  function destroy() {
    container.removeEventListener('keydown', keydown, false);
  }

  function keydown(e) {
    if (e.which === 32) { // spacebar
      events.toggleSteering.fire();
    }
  }
}
