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
    var moveCameraRequest = getMoveCameraRequest(x.props.query);
    if (moveCameraRequest) {
      appEvents.moveCamera.fire(moveCameraRequest);
    }
  }
}

function getMoveCameraRequest(query) {
  if (!query) return;
  var pos = {
    x: parseFloat(query.cx),
    y: parseFloat(query.cy),
    z: parseFloat(query.cz)
  };
  if (isNaN(pos.x) || isNaN(pos.y) || isNaN(pos.z)) return; // we are strict!
  return pos;
}
