import React from 'react';
import commonPackageTemplate from './commonPackageTempalte.jsx';

export default require('maco').template(composer, React);

function composer(props) {
  var model = props.model;

  var link = 'https://packagist.org/packages/' + model.name;
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
