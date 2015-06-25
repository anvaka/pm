import React from 'react';
import formatNumber from '../utils/formatNumber.js';

module.exports = require('maco').template(windowTitle);

function windowTitle(props) {
  var item = props.viewModel;

  return (
      <div className='row'>
        <div className='col-md-8'>
         {item.name}
        </div>
        <div className='in-degree col-md-2'>
         {formatNumber(item.in)}
        </div>
        <div className='out-degree col-md-2'>
         {formatNumber(item.out)}
        </div>
      </div>
  );
}
