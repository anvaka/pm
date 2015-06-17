import React from 'react';

export default class Tooltip extends React.Component {
  render() {
    var tooltipStyle;
    var name;
    var inDegree = 0, outDegree = 0;
    if (this.props.model) {
      var model = this.props.model;
      tooltipStyle = {
        left: model.x,
        top: model.y - 35,
        display: 'block'
      };
      name = model.node.name;
      inDegree = model.node.in;
      outDegree = model.node.out;
    } else {
      tooltipStyle = { display : 'none'};
      name = '';
    }

    return <div style={tooltipStyle} className='node-hover-tooltip'>
      <span className='in-degree'>{inDegree} -&gt; </span>
        {name}
      <span className='out-degree'> -&gt; {outDegree}</span>
    </div>
  }
}
