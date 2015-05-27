import React from 'react';
import scene from './scene/scene.js';
import Tooltip from './tooltip.jsx';

export default class Scene extends React.Component {
  render() {
    var tooltipModel = this.state && this.state.tooltip;
    return (
      <div ref='graphContainer' className='graph-full-size'>
        <Tooltip model={tooltipModel} />
      </div>
    );
  }

  componentDidMount() {
    var container = React.findDOMNode(this.refs.graphContainer);
    var controller = scene.attach(container);
    controller.on('over', function (e) {
      var visible = e.nodeIndex !== undefined;
      var name = visible ? this.props.graphModel.getName(e.nodeIndex) : '';

      var tooltip = {
        visible: visible,
        name: name,
        x: e.x,
        y: e.y
      };
      this.setState({ tooltip: tooltip });
    }, this);
  }

  componentWillUnmount() {
    var container = React.findDOMNode(this.refs.graphContainer);
    scene.detach(container);
  }
}
