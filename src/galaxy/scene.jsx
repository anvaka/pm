import React from 'react';
import HoverInfo from './hoverInfo.jsx';
import NodeDetails from './detailedNodeView.jsx';
import SteeringIndicator from './steeringIndicator.jsx';
import SearchBar from './searchBar.jsx';
import createNativeRenderer from './native/renderer.js';
import createKeyboardBindings from './native/sceneKeyboardBinding.js';

module.exports = require('maco')(scene);

function scene(x) {
  var nativeRenderer, keyboard;
  var hoverModel;

  x.render = function() {
    return (
      <div>
        <div ref='graphContainer' className='graph-full-size'/>
        <HoverInfo />
        <NodeDetails />
        <SteeringIndicator />
        <SearchBar />
      </div>
    );
  };

  x.componentDidMount = function() {
    var container = React.findDOMNode(x.refs.graphContainer);
    nativeRenderer = createNativeRenderer(container);
    keyboard = createKeyboardBindings(container);
  };

  x.componentWillUnmount = function() {
    if (nativeRenderer) nativeRenderer.destroy();
    if (keyboard) keyboard.destroy();
  };
}
