import formatNumber from '../utils/formatNumber.js';

export default SearchResultWindowViewModel;

function SearchResultWindowViewModel(list) {
  this.className = 'search-results-window';
  this.list = list;

  if (list.length > 0) {
    this.title = 'Found *' + formatNumber(list.length) + '* ' + matches(list.length);
  } else {
    this.title = 'No matches found';
  }
}

function matches(length) {
  return (length > 1)  ? 'matches' : 'match';
}
