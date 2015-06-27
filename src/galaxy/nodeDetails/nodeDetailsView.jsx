import detailModel from './nodeDetailsStore.js';

import React from 'react';
import specialNodeDetails from './templates/all.js';
import scene from '../store/scene.js';

module.exports = require('maco')(detailedNodeView);

function detailedNodeView(x) {
  x.render = function () {
    var selectedNode = detailModel.getSelectedNode();
    if (!selectedNode) return null;
    var NodeDetails = getNodeDetails(selectedNode);

    return (
      <div className='node-details'>
        <NodeDetails model={selectedNode} />
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
