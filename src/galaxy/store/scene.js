/**
 * Manages graph model life cycle. The low-level rendering of the particles
 * is handled by ../native/renderer.js
 */
import loadGraph from  '../service/graphLoader.js';
import appEvents from '../service/appEvents.js';

import eventify from 'ngraph.events';

export default sceneStore();

function sceneStore() {
  var loadInProgress = true;
  var currentGraphName;
  var unknownNodeInfo = {
    inDegree: '?',
    outDegree: '?'
  }

  var graph;

  var api = {
    isLoading: isLoading,
    getGraph: getGraph,
    getGraphName: getGraphName,
    getNodeInfo: getNodeInfo,
    getConnected: getConnected,
    find: find
  };

  appEvents.downloadGraphRequested.on(downloadGraph);

  eventify(api);

  return api;

  function find(query) {
    return graph.find(query);
  }

  function isLoading() {
    return loadInProgress;
  }

  function downloadGraph(graphName) {
    if (graphName === currentGraphName) return;

    loadInProgress = true;
    currentGraphName = graphName;
    loadGraph(graphName, reportProgress).then(loadComplete);
  }

  function getGraph() {
    return graph;
  }

  function getGraphName() {
    return currentGraphName;
  }

  function getNodeInfo(nodeId) {
    if (!graph) {
      unknownNodeInfo.name = nodeId;
      return unknownNodeInfo;
    }
    var nodeInfo = graph.getNodeInfo(nodeId);
    // TODO: too tired, need to get this out from here
    if (currentGraphName === 'github') {
      nodeInfo.icon = 'https://avatars.githubusercontent.com/' + nodeInfo.name;
    }

    return nodeInfo;
  }

  function getConnected(nodeId, connectionType) {
    if (!graph) {
      return [];
    }
    return graph.getConnected(nodeId, connectionType).map(getNodeInfo);
  }

  function reportProgress(progress) {
    api.fire('loadProgress', progress);
  }

  function loadComplete(model) {
    loadInProgress = false;
    graph = model;
    api.fire('loadProgress', {});
    appEvents.graphDownloaded.fire();
  }
}
