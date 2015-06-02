import unrender from 'unrender';
import eventify from 'ngraph.events';
import appEvents from '../service/appEvents.js';

export default sceneController;

sceneController.attach = attachScene;
sceneController.detach = detachScene;

function sceneController(container) {
  var renderer, positions, graphModel;
  appEvents.on('positions', setPositions);
  appEvents.on('graphModel', setGraphModel);

  var api = {
    destroy: destroy
  };

  eventify(api);
  return api;

  function setGraphModel(_graphModel) {
    graphModel = _graphModel;
  }

  function setPositions(_positions) {
    positions = _positions;
    if (!renderer) renderer = unrender(container);
    renderer.particles(positions);

    var hitTest = renderer.hitTest();
    hitTest.on('over', handleOver);
  }

  function handleOver(indexes) {
    renderer.highlight(indexes, 0xff0000);
    api.fire('over', getHighlightModel(indexes));
  }

  function getHighlightModel(indexes) {
    return {
      total: indexes.length,
      snippet: indexes.slice(0, 20).map(toInfo),
      indexes: indexes
    };
  }

  function toInfo(x) {
    if (!graphModel) return x;
    return graphModel.getNodeInfo(x/3);
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
