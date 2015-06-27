import React from 'react';
import HoverInfo from './hoverInfo.jsx';
import NodeDetails from './nodeDetails/nodeDetailsView.jsx';

import SteeringIndicator from './steeringIndicator.jsx';
import SearchBox from './search/searchBoxView.jsx';
import WindowCollection from './windows/windowCollectionView.jsx';
import createNativeRenderer from './native/renderer.js';
import createKeyboardBindings from './native/sceneKeyboardBinding.js';

import appEvents from './service/appEvents.js';

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

      // since we are handling all clicks, we should avoid excessive work and
      // talk with DOM only when absolutely necessary:
      var isInDegree = clickedEl.classList.contains('in-degree');
      var isOutDegree = !isInDegree && clickedEl.classList.contains('out-degree');
      if (isInDegree || isOutDegree) {
        var nodeId = parseInt(clickedEl.id, 10);
        var connectionType = isInDegree ? 'in' : 'out';

        appEvents.showDegree.fire(nodeId, connectionType);
      }
    }
}
