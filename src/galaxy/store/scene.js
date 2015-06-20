import createGraphLoader from  '../service/graphLoader.js';
import appEvents from '../service/appEvents.js';
import events from '../service/events.js';
import proxyEvents from '../service/proxyEvents.js';

import eventify from 'ngraph.events';

export default sceneStore();

function sceneStore() {
  var loadInProgress = true;
  var graph;

  var api = {
    isLoading: isLoading,
    getGraph: getGraph
  };

  appEvents.on('loadGraph', loadGraph);

  eventify(api);

  // Just refire this event on behalf of the store:
  proxyEvents(appEvents, api, [
   events.labelsDownloaded,
   events.linksDownloaded,
   events.positionsDownloaded
  ]);

  return api;

  function isLoading() {
    return loadInProgress;
  }

  function loadGraph(graphName) {
    var loadGraph = createGraphLoader(reportProgress, loadComplete);
    loadGraph(graphName);
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
