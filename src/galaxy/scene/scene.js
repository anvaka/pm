import unrender from 'unrender';
import eventify from 'ngraph.events';
import appEvents from '../service/appEvents.js';

export default sceneController;

sceneController.attach = attachScene;
sceneController.detach = detachScene;

function sceneController(container) {
  var renderer, links, positions;
  appEvents.on('positions', setPositions);
  appEvents.on('links', setLinks);

  var api = {
    destroy: destroy
  };

  eventify(api);
  return api;

  function setPositions(_positions) {
    positions = _positions;
    if (!renderer) renderer = unrender(container);
    renderer.particles(positions);

    var hitTest = renderer.hitTest();
    hitTest.on('over', handleOver);
  }

  function handleOver(indexes) {
    renderer.highlight(indexes, 0xff0000);
    api.fire('over', indexes);
  }

  function setLinks(_links) {
    links = _links;
  }

  function destroy() {
    renderer.destroy();
    appEvents.off('positions', setPositions);
    renderer = null;
  }

  return api;
}

function detachScene(dom) {
  if (!dom.__sceneController) return;
  dom.__sceneController.destroy();
}

function attachScene(dom) {
  dom.__sceneController = sceneController(dom);
  return dom.__sceneController;
}
