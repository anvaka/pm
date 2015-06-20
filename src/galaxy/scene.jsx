import React from 'react';
import Tooltip from './tooltip.jsx';
import createNativeRenderer from './native/renderer.js';

module.exports = require('maco')(scene);

function scene(x) {
  var nativeRenderer;
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
    nativeRenderer = createNativeRenderer(container);
  };

  x.componentWillUnmount = function() {
    if (nativeRenderer) nativeRenderer.destroy();
  };
}
