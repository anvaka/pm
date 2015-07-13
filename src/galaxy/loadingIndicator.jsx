import React from 'react';
import scene from './store/scene.js';

module.exports = require('maco')(loadingIndicator);

function loadingIndicator(x) {
  var loadingMessage = '';

  x.render = function() {
    return scene.isLoading() ?
        <div className='label loading'>{loadingMessage}</div> :
        null;
  }

  x.componentDidMount = function() {
    scene.on('loadProgress', updateLoadingIndicator);
  }

  x.componentWillUnmount = function () {
    scene.off('loadProgress', updateLoadingIndicator);
  }

  function updateLoadingIndicator(progress) {
    loadingMessage = `${progress.name}: ${progress.file} - ${progress.completed}`;
    x.forceUpdate();
  }
}
