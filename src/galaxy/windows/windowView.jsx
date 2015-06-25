import React from 'react';
import ReactList from 'react-list';
import WindowTitle from './windowTitle.jsx';
import NodeInfoRow from './nodeInfoRow.jsx';

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
      <WindowTitle text={windowViewModel.title} />
      <div className='window-list-content'>
        <ReactList itemRenderer={renderItem}
                   length={items.length}
                   type='uniform' />
      </div>
      <div className='list-actions'>
      </div>
    </div>
  );

  function renderItem(idx) {
    return <NodeInfoRow key={idx} viewModel={items[idx]} />
  }
}
