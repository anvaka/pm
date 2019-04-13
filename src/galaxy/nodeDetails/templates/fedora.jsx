import React from 'react';
import commonPackageTemplate from './commonPackageTemplate.jsx';

export default require('maco').template(fedora, React);

function fedora(props) {
  var model = props.model;

  var link = 'https://admin.fedoraproject.org/pkgdb/package/' + encodeURIComponent(model.name);
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
