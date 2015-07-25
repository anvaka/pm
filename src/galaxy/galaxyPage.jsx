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
    // FIXME: This will cause double load when user clicks back and forward
    // history buttons. appConfig is also listening to manifest change events
    // and will conflict with this one
    var routeChanged = x.props.params.name !== currentPath;
    if (routeChanged) {
      currentPath = x.props.params.name;
      appEvents.downloadGraphRequested.fire(currentPath);
    }
    appEvents.queryChanged.fire();
  }
}
