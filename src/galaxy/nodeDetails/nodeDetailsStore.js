/**
 * Prepares data for selected node details
 */
import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js';

import getBaseNodeViewModel from '../store/baseNodeViewModel.js';

import eventify from 'ngraph.events';

export default nodeDetailsStore();

function nodeDetailsStore() {
  var api = {
    getSelectedNode: getSelectedNode
  };

  var currentNodeId;

  appEvents.selectNode.on(updateDetails);

  eventify(api);

  return api;

  function updateDetails(nodeId) {
    currentNodeId = nodeId;
    api.fire('changed');
  }

  function getSelectedNode() {
    if (currentNodeId === undefined) return;

    return getBaseNodeViewModel(currentNodeId);
  }
}
