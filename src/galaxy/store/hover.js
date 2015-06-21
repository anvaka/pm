import appEvents from '../service/appEvents.js';
import scene from './scene.js';
import specificViewModelTransform from './graphSepcificHover/specificViewModelTransform.js';
import createDefaultTemplate from './graphSepcificHover/defaultTemplate.jsx';

import eventify from 'ngraph.events';

export default hoverStore();

function hoverStore() {
  var store = {};
  eventify(store);

  appEvents.nodeHover.on(prepareViewModelAndNotifyConsumers);

  return store;

  function prepareViewModelAndNotifyConsumers(hoverDetails) {
    var hoverTemplate = null;
    if (hoverDetails.nodeIndex !== undefined) {
      var viewModel = createViewModel(hoverDetails);

      var currentGraphName = scene.getGraphName();
      viewModel = specificViewModelTransform(currentGraphName, viewModel);

      hoverTemplate = createDefaultTemplate(viewModel);
    }

    store.fire('changed', hoverTemplate);
  }

  function createViewModel(model) {
    if (model === null) throw new Error('Model is not expected to be null');

    var nodeInfo = scene.getNodeInfo(model.nodeIndex)

    return {
      name: nodeInfo.name,
      inDegree: nodeInfo.in,
      inDegreeLabel: ' in degree',
      outDegree: nodeInfo.out,
      outDegreeLabel: ' out degree',
      left: model.mouseInfo.x,
      top: model.mouseInfo.y
    };
  }
}
