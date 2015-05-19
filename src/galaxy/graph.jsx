import React from 'react';
import pixel from 'ngraph.pixel';
import createGraph from 'ngraph.generators';

export default class LoadingIndicator extends React.Component {
  render() {
    return <div ref='graphContainer' className='graph-full-size'></div>;
  }
  componentDidMount() {
    var container = React.findDOMNode(this.refs.graphContainer);
    debugger;
    pixel(createGraph.grid(10, 10, 10), {
      container: container
    });
  }
}
