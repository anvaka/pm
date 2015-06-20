import React from 'react';
import LoadingIndicator from './loadingIndicator.jsx';
import Scene from './scene.jsx';
import events from './service/events.js';

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
      events.downloadGraphRequested.fire(currentPath);
    }
  }
}
