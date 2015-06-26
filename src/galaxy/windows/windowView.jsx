import React from 'react';
import ReactList from 'react-list';
import WindowTitle from './windowTitle.jsx';
import NodeInfoRow from './nodeInfoRow.jsx';

module.exports = require('maco')(windowView);
var windowId = 0;

function windowView(x) {
  var className = 'window-container';
  windowId += 1;

  x.render = function () {
    var windowViewModel = x.props.viewModel;

    if (windowViewModel.className) {
      className += ' ' + windowViewModel.className;
    }

    var items = windowViewModel.list;
    var id = windowId + windowViewModel.className + items.length;

    return (
      <div className={className} key={windowId}>
        <WindowTitle text={windowViewModel.title} />
        <div className='window-list-content'>
          {content(items)}
        </div>
        <div className='list-actions'>
        </div>
      </div>
    );

    function renderItem(idx, key) {
      var vm = items[idx];
      return <NodeInfoRow key={key} viewModel={vm} />
    }

    function content(items) {
      if (items.length > 0) {
          return <ReactList itemRenderer={renderItem}
                    length={items.length}
                    type='simple'
                    key={id}/>
      } else {
        return null;
      }
    }
  }
}
