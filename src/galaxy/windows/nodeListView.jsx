/**
 * This component renders list of packages in single window.
 * There can be multiple lists opened at any time. The list is currently
 * managed by windowCollectionView
 */
import React from 'react';
import ReactList from 'react-list';
import WindowTitle from './windowTitle.jsx';
import NodeInfoRow from './nodeInfoRow.jsx';

module.exports = require('maco')(nodeListView);
var windowId = 0;

function nodeListView(x) {
  windowId += 1;

  x.render = function () {
    var windowViewModel = x.props.viewModel;
    var className = 'window-container';

    if (windowViewModel.className) {
      className += ' ' + windowViewModel.className;
    }

    var items = windowViewModel.list;
    var id = windowId + windowViewModel.className + items.length;

    return (
      <div className={className}>
        <WindowTitle viewModel={windowViewModel} />
        <div className='window-list-content'>
          {content(items)}
        </div>
      </div>
    );

    function renderItem(idx, key) {
      var vm = items[idx];
      return <NodeInfoRow key={key} viewModel={vm} />
    }

    function getHeight() {
      // FIXME: Hardcoding is not good.
      return 20;
    }

    function content(items) {
      if (items.length > 0) {
          return <ReactList itemRenderer={renderItem}
                    length={items.length}
                    itemSizeGetter={getHeight}
                    type='variable'
                    key={id}/>
      } else {
        return null;
      }
    }
  }
}
