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
      <div className='visible-xs-block'>
        <div className='col-xs-12 info-block'>
          <a href={link} target="_blank">{linkText}</a>
          has <a href='#' className='in-degree'>{model.inDegree}</a>
          {model.inDegreeLabel}, and
          <a href='#' className='out-degree'>{model.outDegree}</a>
          {model.outDegreeLabel}
        </div>
      </div>
    </div>
  );
}
