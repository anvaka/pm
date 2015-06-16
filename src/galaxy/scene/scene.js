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

  function handleOver(indexes, ray) {
    var nearestIndex = nearest(30, ray);
    renderer.highlight(nearestIndex, 0xff0000);
    api.fire('over', getHighlightModel(nearestIndex));

    function nearest(maxRadius, ray) {
      if (indexes.length === 0) return indexes;

      indexes.sort(byProximityToRay);

      var candidate = indexes[0];
      if (getDistance(candidate) < maxRadius) {
        return [candidate];
      }

      return [];

      function byProximityToRay(x, y) {
        var distX = getDistance(x), distY = getDistance(y);
        return distX - distY;
      }

      function getDistance(idx) {
        var x = positions[idx];
        var y = positions[idx + 1];
        var z = positions[idx + 2];
        var dx = ray.direction.x * (x - ray.origin.x);
        var dy = ray.direction.y * (y - ray.origin.y);
        var dz = ray.direction.z * (z - ray.origin.z);
        var directionDistance = dx + dy + dz;
        var vx = ray.direction.x * directionDistance + ray.origin.x;
        var vy = ray.direction.y * directionDistance + ray.origin.y;
        var vz = ray.direction.z * directionDistance + ray.origin.z;
        return (vx - x) * (vx - x) + (vy - y) * (vy - y) + (vz - z) * (vz - z);
      }
    }
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
