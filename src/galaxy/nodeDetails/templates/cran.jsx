import React from 'react';
import commonPackageTemplate from './commonPackageTemplate.jsx';

export default require('maco').template(cran, React);

function cran(props) {
  var model = props.model;

  var link = 'https://mran.revolutionanalytics.com/packages/info/?' + encodeURIComponent(model.name);
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
