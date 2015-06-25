export default SearchResultWindowViewModel;

function SearchResultWindowViewModel(list) {
  this.className = 'search-results-window';
  this.list = list;

  if (list.length > 0) {
    this.title = 'Found *' + list.length + '* matches';
  } else {
    this.title = 'No matches';
  }
}
