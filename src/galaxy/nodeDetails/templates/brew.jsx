import commonPackageTemplate from './commonPackageTempalte.jsx';

export default require('maco').template(brew);

function brew(props) {
  var model = props.model;

  var link = 'http://braumeister.org/formula/' + encodeURIComponent(model.name);
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
