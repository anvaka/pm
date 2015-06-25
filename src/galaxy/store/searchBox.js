import appEvents from '../service/appEvents.js';

import scene from './scene.js'
import eventify from 'ngraph.events';

export default searchBoxStore();

function searchBoxStore() {
  appEvents.commandBarChanged.on(handleChange);
  var searchResults = [];
  var api = {
    searchResults: getSearchResults
  };
  eventify(api);

  return api;

  function handleChange(newText) {
    searchResults = scene.find(newText)
    var searchResultsViewModel = new SearchResultsViewModel(searchResults)

    if (searchResults.length) {
      appEvents.showPackageListWindow.fire(searchResultsViewModel, 'search');
    } else {
      appEvents.hidePackageListWindow.fire('search');
    }
  }

  function getSearchResults() {
    return searchResults;
  }
}

function SearchResultsViewModel(list) {
  this.className = 'search-results-window';
  if (list.length > 0) {
    this.title = 'Found *' + list.length + '* matches';
  } else {
    this.title = 'No matches';
  }
  this.list = list;
}
