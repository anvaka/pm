import React from 'react';
import HoverInfo from './hoverInfo.jsx';
import NodeDetails from './nodeDetails/nodeDetailsView.jsx';
import showDeree from './nodeDetails/degreeViewer.js';

import SteeringIndicator from './steeringIndicator.jsx';
import SearchBox from './search/searchBoxView.jsx';
import WindowCollection from './windows/windowCollectionView.jsx';
import createNativeRenderer from './native/renderer.js';
import createKeyboardBindings from './native/sceneKeyboardBinding.js';

module.exports = require('maco')(scene);

function scene(x) {
  var nativeRenderer, keyboard;
  var hoverModel, degreeClickDelegator;

  x.render = function() {
    return (
      <div>
        <div ref='graphContainer' className='graph-full-size'/>
        <HoverInfo />
        <NodeDetails />
        <SteeringIndicator />
        <SearchBox />
        <WindowCollection />
      </div>
    );
  };

  x.componentDidMount = function() {
    var container = React.findDOMNode(x.refs.graphContainer);
    nativeRenderer = createNativeRenderer(container);
    keyboard = createKeyboardBindings(container);
    degreeClickDelegator = container.parentNode;
    degreeClickDelegator.addEventListener('click', handleDegreeClick);
  };

  x.componentWillUnmount = function() {
    if (nativeRenderer) nativeRenderer.destroy();
    if (keyboard) keyboard.destroy();
    if (degreeClickDelegator) degreeClickDelegator.removeEventListener('click', handleDegreeClick);
  };

  function handleDegreeClick(e) {
      var clickedEl = e.target;
      var isInDegree = clickedEl.classList.contains('in-degree');
      if (isInDegree) {
        showDeree(parseInt(clickedEl.id, 10), 'in');
        return;
      }
      var isOutDegree = clickedEl.classList.contains('out-degree');
      if (isOutDegree) {
        showDeree(parseInt(clickedEl.id, 10), 'out');
        return;
      }
    }
}
