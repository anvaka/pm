import unrender from 'unrender';
import eventify from 'ngraph.events';
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

  eventify(api);
  return api;

  function setPositions(positions) {
    if (!nativeScene) createNativeScene();
    nativeScene.particles(positions);
    var hitTest = nativeScene.hitTest();
    hitTest.on('over', fire('over'));
  }

  function fire(name) {
    return function(e) {
      api.fire(name,e);
    };
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
  return dom.__nativeScene;
}
