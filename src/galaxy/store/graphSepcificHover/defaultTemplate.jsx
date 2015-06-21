import React from 'react';

export default createDefaultTemplate;

function createDefaultTemplate(viewModel) {
  var style = {
    left: viewModel.left + 20,
    top: viewModel.top - 35
  };

  return (
      <div style={style} className='node-hover-tooltip'>
        <h5>{viewModel.name}</h5>
        <div className='in-degree'>
          <span className='label-value vcenter'>{viewModel.inDegree}  </span>
          <span className='label-text vcenter'> {viewModel.inDegreeLabel}</span>
        </div>
        <div className='out-degree'>
          <span className='label-value vcenter'>{viewModel.outDegree}  </span>
          <span className='label-text vcenter'> {viewModel.outDegreeLabel}</span>
        </div>
      </div>
    );
}
