import React from 'react';
import HoverInfo from './hoverInfo.jsx';
import NodeDetails from './detailedNodeView.jsx';
import createNativeRenderer from './native/renderer.js';

module.exports = require('maco')(scene);

function scene(x) {
  var nativeRenderer;
  var hoverModel;

  x.render = function() {
    return (
      <div>
        <div ref='graphContainer' className='graph-full-size'/>
        <HoverInfo />
        <NodeDetails />
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
