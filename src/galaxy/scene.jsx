import React from 'react';
import Tooltip from './tooltip.jsx';
import createSceneController from './scene/scene.js';

module.exports = require('maco')(scene);

function scene(x) {
  var controller;
  var hoverModel;

  x.render = function() {
    return (
      <div ref='graphContainer' className='graph-full-size'>
        <Tooltip model={hoverModel} />
      </div>
    );
  };

  x.componentDidMount = function() {
    var container = React.findDOMNode(x.refs.graphContainer);
    controller = createSceneController(container);
    controller.on('over', showTooltip);
  };

  x.componentWillUnmount = function() {
    if (controller) controller.destroy();
  };

  function showTooltip(e) {
    hoverModel = e;
    x.forceUpdate();
  }
}
