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
window.THREE = unrender.THREE;

import eventify from 'ngraph.events';
import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js';
import getNearestIndex from './getNearestIndex.js';
import createTouchControl from './touchControl.js';
import createLineView from './lineView.js';
import cameraService from './cameraService.js';

export default sceneRenderer;

function sceneRenderer(container) {
  var renderer, positions, graphModel, touchControl;
  var hitTest, hoveredHighlight, cameraPosition;
  var lineView;
  var registeredHighlights = Object.create(null);

  appEvents.positionsDownloaded.on(setPositions);
  appEvents.linksDownloaded.on(setLinks);
  appEvents.toggleSteering.on(toggleSteering);
  appEvents.focusOnNode.on(focusOnNode);
  appEvents.highlightQuery.on(highlightQuery);
  appEvents.highlightLinks.on(highlightLinks);
  appEvents.toggleLinks.on(toggleLinks);
  cameraService.on('move', moveCamera);

  appEvents.cls.on(cls);

  var api = {
    destroy: destroy
  };

  eventify(api);

  return api;

  function toggleSteering() {
    if (!renderer) return;

    var input = renderer.input();
    var isDragToLookEnabled = input.toggleDragToLook();

    // steering does not require "drag":
    var isSteering = !isDragToLookEnabled;
    appEvents.showSteeringMode.fire(isSteering);
  }

  function focusOnNode(nodeId) {
    if (!renderer) return;

    renderer.lookAt(nodeId * 3, highlightFocused);

    function highlightFocused() {
      appEvents.selectNode.fire(nodeId);
    }
  }

  function setPositions(_positions) {
    destroyHitTest();

    positions = _positions;

    if (!renderer) {
      renderer = unrender(container);
      hoveredHighlight = renderer.createHighlight();
      touchControl = createTouchControl(renderer);
      moveCameraInternal();
    }

    renderer.particles(positions);

    hitTest = renderer.hitTest();
    hitTest.on('over', handleOver);
    hitTest.on('click', handleClick);
    hitTest.on('dblclick', handleDblClick);
  }

  function setLinks(links, totalLinks) {
    if (links.length > 200000) return; // too much for now, will freeze/crash computer

    if (!lineView) {
      lineView = createLineView(renderer.scene(), unrender.THREE);
    }
    lineView.render(links, positions, totalLinks)
  }

  function toggleLinks() {
    if (lineView) {
      lineView.toggleLinks();
    }
  }

  function moveCamera(_pos) {
    moveCameraInternal();
  }

  function moveCameraInternal() {
    if (!renderer) return;

    var pos = cameraService.getCameraPosition();
    if (!pos) return;

    renderer.camera().position.set(pos.x, pos.y, pos.z);
  }

  function destroyHitTest() {
    if (!hitTest) return; // nothing to destroy

    hitTest.off('over', handleOver);
    hitTest.off('click', handleClick);
    hitTest.off('dblclick', handleDblClick);
  }

  function handleClick(e) {
    var nearestIndex = getNearestIndex(positions, e.indexes, e.ray, 30);

    appEvents.selectNode.fire(getModelIndex(nearestIndex));
  }

  function handleDblClick(e) {
    var nearestIndex = getNearestIndex(positions, e.indexes, e.ray, 30);
    if (nearestIndex !== undefined) {
      focusOnNode(nearestIndex/3);
    }
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
    if (nodeIndex === undefined) {
      // reset old highlihgt:
      hoveredHighlight.clear();
    } else {
      hoveredHighlight.show([nodeIndex], 0xff0000, 3);
    }
  }

  function highlightQuery(query, color, scale) {
    var highlight = registeredHighlights[query.request];
    if (!highlight) {
      highlight = registeredHighlights[query.request] = renderer.createHighlight(query.request);
    }
    var nodeIds = query.results.map(toNativeIndex);
    highlight.show(nodeIds, color, scale);
    appEvents.queryHighlighted.fire(query, color);
  }

  function highlightLinks(links, color) {
    var lines = new Float32Array(links.length * 3);
    for (var i = 0; i < links.length; ++i) {
      var i3 = links[i] * 3;
      lines[i * 3] = positions[i3];
      lines[i * 3 + 1] = positions[i3 + 1];
      lines[i * 3 + 2] = positions[i3 + 2];
    }
    renderer.lines(lines, color);
  }

  function cls() {
    Object.keys(registeredHighlights).forEach(removeHighlight);
  }

  function removeHighlight(key) {
    var highlight = registeredHighlights[key];
    renderer.destroyHighlight(highlight);
    delete registeredHighlights[key];
  }

  function toNativeIndex(i) {
    return i.id * 3;
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
    appEvents.positionsDownloaded.off(setPositions);
    appEvents.linksDownloaded.off(setLinks);

    if (touchControl) touchControl.destroy();
    renderer = null;

    cameraService.off('move', moveCamera);
    // todo: app events?
  }
}
