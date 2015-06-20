/**
 * Manages graph model life cycle. The low-level rendering of the particles
 * is handled by ../native/renderer.js
 */
import loadGraph from  '../service/graphLoader.js';
import events from '../service/events.js';

import eventify from 'ngraph.events';

export default sceneStore();

function sceneStore() {
  var loadInProgress = true;
  var graph;

  var api = {
    isLoading: isLoading,
    getGraph: getGraph
  };

  events.downloadGraphRequested.on(downloadGraph);

  eventify(api);

  return api;

  function isLoading() {
    return loadInProgress;
  }

  function downloadGraph(graphName) {
    loadGraph(graphName, reportProgress).then(loadComplete);
  }

  function getGraph() {
    return graph;
  }

  function reportProgress(progress) {
    api.fire('loadProgress', progress);
  }

  function loadComplete(model) {
    loadInProgress = false;
    graph = model;
    api.fire('loadProgress', {});
  }
}
