import commonPackageTemplate from './commonPackageTempalte.jsx';

export default require('maco').template(goSearch);

function goSearch(props) {
  var model = props.model;

  var link = 'http://go-search.org/view?id=' + encodeURIComponent(model.name);
  var linkText = (typeof model.name === 'string') ? model.name.replace('github.com/', '') : model.name;

  return commonPackageTemplate(model, link, linkText);
}
