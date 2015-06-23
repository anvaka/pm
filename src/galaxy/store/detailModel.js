/**
 * Prepares data for selected node details
 */
import appEvents from '../service/appEvents.js';
import scene from './scene.js';

import getBaseNodeViewModel from './baseNodeViewModel.js';

import eventify from 'ngraph.events';

export default detailedNodeView();

function detailedNodeView() {
  var api = {
    getViewModel: getViewModel
  };

  var currentNodeId;

  appEvents.selectNode.on(updateDetails);

  eventify(api);

  return api;

  function updateDetails(nodeId) {
    currentNodeId = nodeId;
    api.fire('changed');
  }

  function getViewModel() {
    if (currentNodeId === undefined) return;

    var viewModel = getBaseNodeViewModel(currentNodeId);
    return viewModel;
  }
}
