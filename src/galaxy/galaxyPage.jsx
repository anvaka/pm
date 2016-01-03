import React from 'react';
import LoadingIndicator from './loadingIndicator.jsx';
import Scene from './scene.jsx';
import appEvents from './service/appEvents.js';

module.exports = require('maco')(galaxyPage, React);

function galaxyPage(x) {
  var currentPath;

  x.render = function() {
    // This doesn't seem to belong here. The whole routing system is a mess
    // TODO: Come up with better routing
    loadGraphIfRouteChanged();

    return (
      <div>
        <LoadingIndicator />
        <Scene />
      </div>
    );
  };

  function loadGraphIfRouteChanged() {
    var routeChanged = x.props.params.name !== currentPath;
    if (routeChanged) {
      currentPath = x.props.params.name;
      appEvents.downloadGraphRequested.fire(currentPath);
    }
    appEvents.queryChanged.fire();
  }
}
