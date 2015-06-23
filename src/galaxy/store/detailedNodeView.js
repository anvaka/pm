import appEvents from '../service/appEvents.js';
import scene from './scene.js';
import getBaseNodeViewModel from './baseNodeViewModel.js';

import eventify from 'ngraph.events';

export default detailedNodeView();

function detailedNodeView() {
  var api = {
    getViewModel: getViewModel,
    getNodes: getNodes
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
    viewModel.inDegreeLabel = viewModel.inDegree + ' ' + viewModel.inDegreeLabel;
    viewModel.outDegreeLabel = viewModel.outDegree + ' ' + viewModel.outDegreeLabel;
    return viewModel;
  }

  function getNodes(type) {
    return scene.getConnected(currentNodeId, type);
  }
}
