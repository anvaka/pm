import React from 'react';
import commonPackageTemplate from './commonPackageTemplate.jsx';

export default require('maco').template(npmTemplate, React);

function npmTemplate(props) {
  var model = props.model;

  var link = 'https://www.npmjs.org/package/' + model.name;
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
