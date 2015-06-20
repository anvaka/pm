/**
 * This is a bridge between ultrafast particle renderer and react world.
 *
 * It listens to Scene events and waits for a graph to be loaded. Once graph
 * positions are loaded it calls native renderer to show the positions.
 *
 * It also listens to native renderer for user interaction. When user hovers
 * over a node or clicks on it - it reports user actions back to the global
 * events bus. These events are later consumed by stores to show appropriate
 * UI feedback
 */
import unrender from 'unrender';
import eventify from 'ngraph.events';

// TODO: I should probably rename events (constant definitions of event names)
// and appEvents (global app event bus)
import events from '../service/events.js';
import appEvents from '../service/appEvents.js';

import scene from '../store/scene.js';
import getNearestIndex from './getNearestIndex.js';

export default sceneRenderer;

function sceneRenderer(container) {
  var renderer, positions, graphModel;
  var hitTest;

  scene.on(events.positionsDownloaded, setPositions);

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
  }

  function destroyHitTest() {
    if (!hitTest) return; // nothing to destroy
    hitTest.off('over', handleOver);
  }

  function handleOver(indexes, ray, mouse) {
    var nearestIndex = getNearestIndex(positions, indexes, ray, 30);

    highlightNode(nearestIndex);

    appEvents.fire('nodeOver', {
      index: nearestIndex,
      mouse: mouse
    });
  }

  function highlightNode(nodeIndex) {
    if (nodeIndex !== undefined) {
      renderer.highlight([nodeIndex], 0xff0000);
    } else {
      // reset old highlihgt:
      renderer.highlight(nodeIndex, 0xff0000);
    }
  }

  function destroy() {
    renderer.destroy();
    scene.off('positions', setPositions);
    renderer = null;
  }
}
