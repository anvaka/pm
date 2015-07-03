import appEvents from '../service/appEvents.js';
import eventify from 'ngraph.events';

export default cameraService();

function cameraService() {
  var cameraPosition;
  var api = {
    getCameraPosition: getCameraPosition
  };
  appEvents.moveCamera.on(moveCamera);

  eventify(api);
  return api;

  function getCameraPosition() {
    return cameraPosition;
  }

  function moveCamera(pos) {
    cameraPosition = pos;
    api.fire('move', pos);
  }
}
