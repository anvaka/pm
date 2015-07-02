export default createTouchControl;

function createTouchControl(renderer) {
  var api = {
    destroy: destroy
  };
  var wasdControls, touchControls;

  init();

  return api;

  function init() {
    var container = renderer.getContainer();
    container.addEventListener('touchstart', onTouchStart, false);
    container.addEventListener('touchend', onTouchEnd, false);

    // todo: should this be part of unrender itself?
    wasdControls = renderer.input();
    if (window.orientation !== undefined) {
      var camera = renderer.camera();
      touchControls = require('three.orientation')(camera);
      renderer.onFrame(updateFromDeviceOritentation);
    }
  }

  function updateFromDeviceOritentation() {
    touchControls.update();
  }

  function destroy() {
    container.removeEventListener('touchstart', onTouchStart, false);
    container.removeEventListener('touchend', onTouchEnd, false);
    if (touchControls) {
      // todo: release touch too
    }
  }

  function onTouchStart(e) {
    if (!e.touches) return;

    if (e.touches.length > 0) {
      wasdControls.moveState.forward = (e.touches.length === 1);
      wasdControls.moveState.back = (e.touches.length === 2);
      wasdControls.updateMovementVector();
    }
  }

  function onTouchEnd(e) {
    if (!e.touches) return;
    wasdControls.moveState.forward = (e.touches.length === 1);
    wasdControls.moveState.back = (e.touches.length === 2);
    wasdControls.updateMovementVector();
  }
}
