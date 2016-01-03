import React from 'react';
import formatNumber from '../utils/formatNumber.js';

module.exports = require('maco').template(windowTitle, React);

function windowTitle(props) {
  var item = props.viewModel;
  var image = '';
  if (item.icon) {
    image = <img src={item.icon} width='15px' />;
  }

  return (
      <div className='row'>
        <div className='no-oveflow col-md-6 col-xs-6'>
        {image}
         <span id={item.id} className='node-focus'>
            {item.name}
          </span>
        </div>
        <div id={item.id} className='in-degree col-md-3 col-xs-3'>
         {formatNumber(item.in)}
        </div>
        <div id={item.id} className='out-degree col-md-3 col-xs-3'>
         {formatNumber(item.out)}
        </div>
      </div>
  );
}
