/**
 * This file defines special keyboard bindings for the scene. Most movement
 * keyboard bindings are handled by `unrender` module (e.g. WASD). Here
 * we handle additional keyboard shortcuts. For example toggle steering mode
 */
export default sceneKeyboardBinding;

import events from '../service/appEvents.js';
import Key from '../utils/key.js';

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
    if (e.which === Key.Space) {
      events.toggleSteering.fire();
    } else if (e.which === Key.L) { // L - toggle links
      if (!e.ctrlKey && !e.metaKey) {
        events.toggleLinks.fire();
      }
    } else if (e.which === Key.H || (e.which === Key['/'] && e.shiftKey)) { // 'h' or '?' key
      // Need to stop propagation, since help screen attempts to close itself
      // once user presses any key. We don't want that now, since this is
      // explicit request to render help
      e.stopPropagation();
      events.toggleHelp.fire();
    } else if (e.which === Key.Minus) {
        var el = document.getElementById("range");
        el.value = parseFloat(el.value) - 10;
        events.renderLinks.fire();
    } else if (e.which === Key.Plus) {
        var el = document.getElementById("range");
        el.value = parseFloat(el.value) + 10;
        events.renderLinks.fire();
    } else if (e.which === Key.P) {
        events.around.fire(2000,0,0,0);
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
