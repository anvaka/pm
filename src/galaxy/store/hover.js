import React from 'react';
import eventify from 'ngraph.events';

import appEvents from '../service/appEvents.js';
import scene from './scene.js';
import getBaseNodeViewModel from './baseNodeViewModel.js';

export default hoverStore();

function hoverStore() {
  var store = {};
  eventify(store);

  appEvents.nodeHover.on(prepareViewModelAndNotifyConsumers);

  return store;

  function prepareViewModelAndNotifyConsumers(hoverDetails) {
    var hoverTemplate = null;
    if (hoverDetails.nodeIndex !== undefined) {
      var currentGraphName = scene.getGraphName();
      var viewModel = createViewModel(hoverDetails, currentGraphName);

      hoverTemplate = createDefaultTemplate(viewModel);
    }

    store.fire('changed', hoverTemplate);
  }

  function createViewModel(model, graphName) {
    if (model === null) throw new Error('Model is not expected to be null');

    var hoverViewModel = getBaseNodeViewModel(model.nodeIndex, graphName);
    hoverViewModel.left = model.mouseInfo.x;
    hoverViewModel.top = model.mouseInfo.y;

    return hoverViewModel;
  }
}

function createDefaultTemplate(viewModel) {
  var style = {
    left: viewModel.left + 20,
    top: viewModel.top - 35
  };

  return (
      <div style={style} className='node-hover-tooltip'>
        <h5>{viewModel.name}</h5>
        <div className='in-degree'>
          <span className='label-value vcenter'>{viewModel.inDegree}  </span>
          <span className='label-text vcenter'> {viewModel.inDegreeLabel}</span>
        </div>
        <div className='out-degree'>
          <span className='label-value vcenter'>{viewModel.outDegree}  </span>
          <span className='label-text vcenter'> {viewModel.outDegreeLabel}</span>
        </div>
      </div>
    );
}
