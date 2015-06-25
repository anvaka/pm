import React from 'react';

module.exports = require('maco').template(windowTitle);

function windowTitle(props) {
  var tags = props.text.split('*').map(toTags);

  return (
    <h4 className='window-title'>
      {tags}
    </h4>
  );

  function toTags(text, index) {
    if (index % 2 === 0) {
      return <small key={index}>{text}</small>;
    }
    return <strong key={index}>{text}</strong>;
  }
}
