import scene from './store/scene.js';
import React from 'react';
import hoverModel from './store/hover.js';

module.exports = require('maco')(hoverInfo);

function hoverInfo(x) {
  var hoverTemplate = null;

  x.render = function render() {
    return hoverTemplate;
  };

  x.componentDidMount = function() {
    hoverModel.on('changed', updateView);
  }

  x.componentWillUnmount = function () {
    hoverModel.off('changed', updateView);
  }

  function updateView(viewTemplate) {
    hoverTemplate = viewTemplate;
    x.forceUpdate();
  }
}
