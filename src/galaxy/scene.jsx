import React from 'react';
import scene from './scene/scene.js';
import HoverPreview from './hoverPreview.jsx';

export default class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div ref='graphContainer' className='graph-full-size'>
        <HoverPreview model={this.state.hoverModel} />
      </div>
    );
  }

  componentDidMount() {
    var container = React.findDOMNode(this.refs.graphContainer);
    var controller = scene.attach(container);
    controller.on('over', function (e) {
      this.setState({ hoverModel: e });
    }, this);
  }

  componentWillUnmount() {
    var container = React.findDOMNode(this.refs.graphContainer);
    scene.detach(container);
  }
}
