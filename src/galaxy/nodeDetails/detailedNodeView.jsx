import detailModel from './detailModel.js';

import React from 'react';
import specialNodeDetails from './all.js';
import scene from '../store/scene.js';

module.exports = require('maco')(detailedNodeView);

function detailedNodeView(x) {
  x.render = function () {
    var viewModel = detailModel.getViewModel();
    if (!viewModel) return null;
    var NodeDetails = getNodeDetails(viewModel);

    return (
      <div className='node-details'>
        <NodeDetails model={viewModel} />
      </div>
    );
  }

  x.componentDidMount = function() {
    detailModel.on('changed', updateView);
  }

  x.componentWillUnmount = function () {
    detailModel.off('changed', updateView);
  }

  function getNodeDetails(viewModel) {
    var Template = specialNodeDetails[scene.getGraphName()] || specialNodeDetails.default;
    return Template;
  }

  function updateView() {
    x.forceUpdate();
  }
}
