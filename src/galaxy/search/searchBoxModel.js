import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js'
import clientRuntime from '../runtime/clientRuntime.js';

import SearchResultWindowViewModel from './SearchResultWindowViewModel.js';

export default searchBoxModel();

const searchResultsWindowId = 'search-results';

function searchBoxModel() {
  let api = {
    search: search,
    submit: submit
  };

  return api;

  function search(newText) {
    if (newText && newText[0] === ':') return; // processed in submit

    var searchResults = scene.find(newText);
    var searchResultWindowViewModel = new SearchResultWindowViewModel(searchResults);

    if (searchResults.length) {
      appEvents.showNodeListWindow.fire(searchResultWindowViewModel, searchResultsWindowId);
    } else {
      appEvents.hideNodeListWindow.fire(searchResultsWindowId);
    }
  }

  function submit(command) {
    if (!command || command[0] !== ':') return; // We can handle only commands here

    // Yes, this is not secure, I know
    command = 'with (ctx) { ' + command.substr(1) + ' }';
    var dynamicFunction = new Function('ctx', command);
    dynamicFunction(clientRuntime);
  }
}
