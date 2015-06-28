import React from 'react';
import searchBoxModel from './searchBoxModel.js';

module.exports = require('maco')(searchBar);

function searchBar(x) {
  x.render = function () {
    return (
      <div className='container row'>
        <div className='search col-xs-12 col-sm-6 col-md-4'>
          <form className='search-form' role='search' onSubmit={runSubmit}>
            <div className='input-group'>
              <input type='text'
                ref='searchText'
                className='form-control no-shadow' placeholder='enter a search term'
                onChange={runSearch}/>
                <span className='input-group-btn'>
                  <button className='btn' tabIndex='-1' type='button'>
                    <span className='glyphicon glyphicon-search'></span>
                  </button>
                </span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function runSearch(e) {
    searchBoxModel.search(e.target.value);
  }

  function runSubmit(e) {
    var searchText = React.findDOMNode(x.refs.searchText).value;
    searchBoxModel.submit(searchText);
    e.preventDefault();
  }
}
