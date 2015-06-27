import commonPackageTemplate from './commonPackageTempalte.jsx';

export default require('maco').template(ruby);

function ruby(props) {
  var model = props.model;

  var link = 'https://rubygems.org/gems/' + model.name;
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
