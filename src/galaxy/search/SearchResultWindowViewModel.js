import formatNumber from '../utils/formatNumber.js';

export default SearchResultWindowViewModel;

function SearchResultWindowViewModel(list) {
  this.className = 'search-results-window';
  this.list = list;
  this.matchesCountString = formatNumber(list.length);
}

SearchResultWindowViewModel.prototype.__name = 'SearchResultWindowViewModel';
