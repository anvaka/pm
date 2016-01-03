import React from 'react';
import commonPackageTemplate from './commonPackageTempalte.jsx';

export default require('maco').template(debian, React);

function debian(props) {
  var model = props.model;

  var link = 'https://www.google.com/?gws_rd=ssl#q=' + encodeURIComponent(model.name) + '+inurl:debian.org';
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}
