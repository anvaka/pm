import unrender from 'unrender';
import appEvents from '../service/appEvents.js';

export default sceneController;

sceneController.attach = attachScene;
sceneController.detach = detachScene;

function sceneController(container) {
  var nativeScene;
  appEvents.on('positions', setPositions);

  var api = {
    destroy: destroy
  };

  return api;

  function setPositions(positions) {
    if (!nativeScene) createNativeScene();
    nativeScene.particles(positions);
  }

  function createNativeScene() {
    nativeScene = unrender(container);
  }

  function destroy() {
    nativeScene.destroy();
    appEvents.off('positions', setPositions);
    nativeScene = null;
  }

  return api;
}

function detachScene(dom) {
  if (!dom.__nativeScene) return;
  dom.__nativeScene.destroy();
}

function attachScene(dom) {
  dom.__nativeScene = sceneController(dom);
}
