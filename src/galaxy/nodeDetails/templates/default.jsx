import React from 'react';

export default require('maco').template(template);

function template(props) {
  var model = props.model;

  return (
    <div className='package-preview container-fluid row'>
      <div className='hidden-xs'>
        <div className='col-xs-6'>
          <h4 title={model.name}>{model.name}</h4>
        </div>
        <div className="col-xs-3">
          <div className="row">
            <a href='#' className='in-degree'>
              <h2>{model.inDegree}</h2>
            </a>
          </div>
          <div className="row small">{model.inDegreeLabel}</div>
        </div>
        <div className="col-xs-3">
          <div className="row">
            <a href='#' className='out-degree'>
              <h2>{model.outDegree}</h2>
            </a>
          </div>
          <div className="row small">{model.outDegreeLabel}</div>
        </div>
      </div>
    </div>
  );
}
