import React from 'react';
import LoadingIndicator from './loadingIndicator.jsx';
import Scene from './scene.jsx';
import appEvents from './service/appEvents.js';

module.exports = require('maco')(galaxyPage);

function galaxyPage(x) {
  var currentPath;

  x.render = function() {
    loadGraphIfRouteChanged();

    return (
      <div>
        <LoadingIndicator />
        <Scene />
      </div>
    );
  }

  function loadGraphIfRouteChanged() {
    var routeChanged = x.props.params.name !== currentPath;
    if (routeChanged) {
      currentPath = x.props.params.name;
      appEvents.downloadGraphRequested.fire(currentPath);
    }
    appEvents.queryChanged.fire();
  }
}
