import React from 'react';
import commonPackageTemplate from './commonPackageTempalte.jsx';

export default require('maco').template(github);

function github(props) {
  var model = props.model;

  var avatarSrc = 'https://avatars.githubusercontent.com/' + model.name + '?s=50';
  var link = 'https://github.com/' + model.name;
  var linkText = model.name;

  return (
    <div className='container-fluid row'>
      <div className='hidden-xs'>
        <div className='col-xs-6'>
          <a href={link} target='_blank'>
            <img src={avatarSrc} alt={linkText} className='github-avatar-detail'/>
            <h4 title={linkText}>{linkText}</h4>
          </a>
        </div>
        <div className="col-xs-3">
          <div className="row">
            <h2 className='in-degree'>{model.inDegree}</h2>
          </div>
          <div className="row small">{model.inDegreeLabel}</div>
        </div>
        <div className="col-xs-3">
          <div className="row">
            <h2 className='out-degree'>{model.outDegree}</h2>
          </div>
          <div className="row small">{model.outDegreeLabel}</div>
        </div>
      </div>
      <div className='visible-xs-block'>
        <div className='col-xs-12 info-block'>
          <a href={link} target="_blank">{linkText}</a>
          has
          <span className='in-degree'>{model.inDegree}</span>
          {model.inDegreeLabel}, and
          <span className='out-degree'>{model.outDegree}</span>
          {model.outDegreeLabel}
        </div>
      </div>
    </div>
  )
 
}
