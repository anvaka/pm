import React from 'react';
import ReactList from 'react-list';

module.exports = require('maco').template(windowView);

function windowView(props) {
  var windowViewModel = props.viewModel;
  var className = 'window-container';

  if (windowViewModel.className) {
    className += ' ' + windowViewModel.className;
  }

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
