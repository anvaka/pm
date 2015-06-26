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
        <div className='col-xs-12 info-block'>
          <a href={link} target="_blank">{linkText}</a>
          has <span id={model.id} className='in-degree'>{model.inDegree}</span>
          {model.inDegreeLabel}, and
          <span id={model.id} className='out-degree'>{model.outDegree}</span>
          {model.outDegreeLabel}
        </div>
      </div>
    </div>
  );
}
