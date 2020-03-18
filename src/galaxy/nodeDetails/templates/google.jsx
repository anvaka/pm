import React from 'react';
import commonPackageTemplate from './commonPackageTemplate.jsx';

export default require('maco').template(google, React);

function google(props) {
  var model = props.model;

  var link = 'http://www.google.com/search?q=' + encodeURIComponent(model.name);
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
