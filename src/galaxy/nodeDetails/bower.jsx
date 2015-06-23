import commonPackageTemplate from './commonPackageTempalte.jsx';

export default require('maco').template(bower);

function bower(props) {
  var model = props.model;

  var link = 'http://bower.io/search/?q=' + encodeURIComponent(model.name);
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
