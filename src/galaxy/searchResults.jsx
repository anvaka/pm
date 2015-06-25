import React from 'react';
import ReactList from 'react-list';
import searchModel from './store/searchBox.js';

module.exports = require('maco')(searchResults);

function searchResults(x) {
  x.render = function () {
    var results = searchModel.searchResults()
    if (results.length === 0) return null;

    return (
      <div style={{overflow: 'auto', maxHeight: 400}}>
          <ReactList
            itemRenderer={renderItem}
            length={results.length}
            type='uniform' />
        </div>);

    function renderItem(idx) {
      return toui(results[idx]);
    };

    function toui(x) {
      return <div>{x.name}</div>;
    }
  }


  x.componentDidMount = function() {
    searchModel.on('showSearchResults', rerender);
  }

  x.componentWillUnmount = function () {
    searchModel.off('showSearchResults', rerender);
  }

  function rerender() {
    x.forceUpdate();
  }
}
