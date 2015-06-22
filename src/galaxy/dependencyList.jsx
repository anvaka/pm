import React from 'react';
import ReactList from 'react-list';
import scene from './store/scene.js';

module.exports = require('maco')(dependencyList);

function dependencyList(x) {
  var adjacent;

  x.render = function() {
    var context = this.props.context;
    if (!context) return null;

    adjacent = context.getNodes(this.props.type);
    if (adjacent.length === 0) {
      return <div>{this.props.emptyLabel}</div>;
    }

    return (
      <div className='dependency-list'>
        <ReactList
            itemRenderer={renderItem}
            length={adjacent.length}
            type='uniform'
          />
      </div>
    )
  }

  function renderItem(index, key) {
    var nodeInfo = scene.getNodeInfo(adjacent[index]);
    return <div key={key}>{nodeInfo.name}</div>
  }
}
