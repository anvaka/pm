import React from 'react';
export default commonPackageTemplate;

function commonPackageTemplate(model, link, linkText) {
  return (
    <div className='container-fluid row'>
      <div className='hidden-xs'>
        <div className='col-xs-6'>
          <a href={link} target='_blank'>
            <h4 title={linkText}>{linkText}</h4>
          </a>
        </div>
        <div className="col-xs-3">
          <div className="row">
            <h2 id={model.id} className='in-degree'>{model.inDegree}</h2>
          </div>
          <div className="row small">{model.inDegreeLabel}</div>
        </div>
        <div className="col-xs-3">
          <div className="row">
            <h2 id={model.id} className='out-degree'>{model.outDegree}</h2>
          </div>
          <div className="row small">{model.outDegreeLabel}</div>
        </div>
      </div>
      <div className='visible-xs-block'>
        <div className='row info-block'>
          <div className='col-xs-6 no-overflow'><a href={link} target="_blank">{linkText}</a></div>
          <div id={model.id} className='in-degree col-xs-3'>{model.inDegree}</div>
          <div id={model.id} className='out-degree col-xs-3'>{model.outDegree}</div>
        </div>
      </div>
    </div>
  );
}
