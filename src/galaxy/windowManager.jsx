import windowStore from './store/windowStore.js';
import React from 'react';
import ReactList from 'react-list';

module.exports = require('maco')(windowManager);

var Window = require('maco')(windowInstance);

function windowManager(x) {
  windowStore.on('changed', update);

  x.render = function () {
    var windows = windowStore.getWindows();
    if (windows.length === 0) return null;

    return <div>{windows.map(toWindowView)}</div>;
  }

  function update() {
    x.forceUpdate();
  }

  function toWindowView(windowViewModel, idx) {
    return <Window viewModel={windowViewModel} key={idx} />;
  }
}

function windowInstance(x) {
  x.render = function () {
    var windowViewModel = x.props.viewModel;
    var className = 'window-container';
    if (windowViewModel.className) className += ' ' + windowViewModel.className;

    var items = windowViewModel.list;

    return (
      <div className={className}>
        <div className='window-title'>
          {windowViewModel.title}
        </div>
        <div style={{overflow: 'auto', maxHeight: 400}}>
          <ReactList itemRenderer={renderItem} length={items.length} type='uniform' />
        </div>
        <div className='listActions'>
        </div>
      </div>
    );

    function renderItem(idx) {
      return <div>{items[idx].name}</div>;
    }
  }
}
