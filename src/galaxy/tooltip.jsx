import React from 'react';

export default class Tooltip extends React.Component {
  render() {
    var model = this.props.model || {};
    var tooltipStyle = {
      left: model.x,
      top: model.y,
      display: model.visible ? 'block' : 'none'
    };
    var name = model.name;
    return <div style={tooltipStyle} className='node-hover-tooltip'>
      {name}
    </div>
  }
}
