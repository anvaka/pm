import React from 'react';
import formatNumber from '../utils/formatNumber.js';

module.exports = require('maco').template(windowTitle);

function windowTitle(props) {
  var item = props.viewModel;

  return (
      <div className='row'>
        <div id={item.id} className='node-focus col-md-6'>
         {item.name}
        </div>
        <div id={item.id} className='in-degree col-md-3'>
         {formatNumber(item.in)}
        </div>
        <div id={item.id} className='out-degree col-md-3'>
         {formatNumber(item.out)}
        </div>
      </div>
  );
}
