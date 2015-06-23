/**
 * This is a bridge between ultrafast particle renderer and react world.
 *
 * It listens to graph loading events. Once graph positions are loaded it calls
 * native renderer to show the positions.
 *
 * It also listens to native renderer for user interaction. When user hovers
 * over a node or clicks on it - it reports user actions back to the global
 * events bus. These events are later consumed by stores to show appropriate
 * UI feedback
 */
import unrender from 'unrender';
import eventify from 'ngraph.events';
import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js';
import getNearestIndex from './getNearestIndex.js';

export default sceneRenderer;

function sceneRenderer(container) {
  var renderer, positions, graphModel;
  var hitTest;

  appEvents.positionsDownloaded.on(setPositions);

  var api = {
    destroy: destroy
  };

  eventify(api);
  return api;

  function setPositions(_positions) {
    destroyHitTest();

    positions = _positions;

    if (!renderer) renderer = unrender(container);
    renderer.particles(positions);

    hitTest = renderer.hitTest();
    hitTest.on('over', handleOver);
    hitTest.on('click', handleClick);
  }

  function destroyHitTest() {
    if (!hitTest) return; // nothing to destroy
    hitTest.off('over', handleOver);
  }

  function handleClick(e) {
    var nearestIndex = getNearestIndex(positions, e.indexes, e.ray, 30);

    appEvents.selectNode.fire(getModelIndex(nearestIndex));
  }


  function handleOver(e) {
    var nearestIndex = getNearestIndex(positions, e.indexes, e.ray, 30);

    highlightNode(nearestIndex);
    appEvents.nodeHover.fire({
      nodeIndex: getModelIndex(nearestIndex),
      mouseInfo: e
    });
  }

  function highlightNode(nodeIndex) {
    if (nodeIndex !== undefined) {
      renderer.highlight([nodeIndex], 0xff0000, 3);
    } else {
      // reset old highlihgt:
      renderer.highlight(nodeIndex, 0xff0000);
    }
  }

  function getModelIndex(nearestIndex) {
    if (nearestIndex !== undefined) {
      // since each node represented as triplet we need to divide by 3 to
      // get actual index:
      return nearestIndex/3
    }
  }

  function destroy() {
    renderer.destroy();
    scene.off('positions', setPositions);
    renderer = null;
  }
}
