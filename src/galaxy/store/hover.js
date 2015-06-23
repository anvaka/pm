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
      var viewModel = createViewModel(hoverDetails);
      hoverTemplate = createDefaultTemplate(viewModel);
    }

    store.fire('changed', hoverTemplate);
  }

  function createViewModel(model) {
    if (model === null) throw new Error('Model is not expected to be null');

    var hoverViewModel = getBaseNodeViewModel(model.nodeIndex);
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
        {viewModel.name}
        <span className='in-degree'>{viewModel.inDegree}</span>
        <span className='out-degree'>{viewModel.outDegree}</span>
      </div>
    );
}
