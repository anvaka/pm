import React from 'react';
import scene from './scene/scene.js';

export default class Scene extends React.Component {
  render() {
    return <div ref='graphContainer' className='graph-full-size'></div>;
  }

  componentDidMount() {
    var container = React.findDOMNode(this.refs.graphContainer);
    scene.attach(container);
  }

  componentWillUnmount() {
    var container = React.findDOMNode(this.refs.graphContainer);
    scene.detach(container);
  }
}
