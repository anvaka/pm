import detailModel from './store/detailedNodeView.js';
import DependencyList from './dependencyList.jsx';

import React from 'react';
import boot from  'react-bootstrap';

let {TabbedArea, TabPane} = boot;

module.exports = require('maco')(detailedNodeView);

function detailedNodeView(x) {
  x.render = function () {
    var viewModel = detailModel.getViewModel();
    if (!viewModel) return null;
    var activeKey = 1;
    if (viewModel.inDegree === 0) {
      activeKey = 2;
    }

    return (
      <div className='node-details'>
        <h5>{viewModel.name}</h5>
        <TabbedArea activeKey={activeKey} animation={false}>
          <TabPane eventKey={1} tab={viewModel.inDegreeLabel}>
            <DependencyList context={detailModel} type='in' emptyLabel={viewModel.inDegreeLabel} />
          </TabPane>
          <TabPane eventKey={2} tab={viewModel.outDegreeLabel}>
            <DependencyList context={detailModel} type='out' emptyLabel={viewModel.outDegreeLabel} />
          </TabPane>
        </TabbedArea>
      </div>
    );
  }

  x.componentDidMount = function() {
    detailModel.on('changed', updateView);
  }

  x.componentWillUnmount = function () {
    detailModel.off('changed', updateView);
  }

  function updateView() {
    x.forceUpdate();
  }
}
