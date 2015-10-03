import commonPackageTemplate from './commonPackageTempalte.jsx';

export default require('maco').template(fedora);

function fedora(props) {
  var model = props.model;

  var link = 'https://admin.fedoraproject.org/pkgdb/package/' + encodeURIComponent(model.name);
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
