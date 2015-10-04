/**
 * Renders collection of windows
 */
import React from 'react';
import NodeListView from './nodeListView.jsx';
import windowCollectionModel from './windowCollectionModel.js';

module.exports = require('maco')(windowCollectionView);

function windowCollectionView(x) {
  x.render = function () {
    var windows = windowCollectionModel.getWindows();
    if (windows.length === 0) return null;

    return <div>{windows.map(toWindowView)}</div>;
  }

  x.componentDidMount = function () {
    windowCollectionModel.on('changed', update);
  };

  x.componentWillUnmount = function() {
    windowCollectionModel.off('changed', update);
  }

  function toWindowView(windowViewModel, idx) {
    return <NodeListView viewModel={windowViewModel} key={idx} />;
  }

  function update() {
    x.forceUpdate();
  }
}
