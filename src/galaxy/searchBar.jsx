import React from 'react';
import SearchResults from './searchResults.jsx';
import events from './service/appEvents.js';

module.exports = require('maco')(searchBar);

function searchBar(x) {
  x.render = function () {
    return (
      <div className='container row'>
        <div className='search col-xs-12 col-sm-6 col-md-4'>
          <form className='search-form' role='search'>
            <div className='input-group'>
              <input type='text'
                className='form-control no-shadow' placeholder='type :help() or enter a search term'
                onChange={runSearch}/>
                <span className='input-group-btn'>
                  <button className='btn' tabindex='-1' type='button'>
                    <span className='glyphicon glyphicon-search'></span>
                  </button>
                </span>
            </div>
          </form>

          <SearchResults />
        </div>
      </div>
    );
  }

  function runSearch(e) {
    events.commandBarChanged.fire(e.target.value);
  }
}
