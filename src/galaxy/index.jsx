import React from 'react';
import createGraphModel from  './service/graphModel.js';
import LoadingIndicator from './loadingIndicator.jsx';
import Graph from './graph.jsx';

export default class GalaxyPage extends React.Component {
  constructor(props) {
    super(props);
    pageLogic(this);
  }

  render() {
    var name = this.props.params.name;
    return (
      <div>
        <LoadingIndicator message={this.state.loadLog} />
        <Graph points={this.state.points} />
      </div>
    );
  }
}

function pageLogic(page) {
  var model = createGraphModel();
  model.on('progress', updateState);
  augmentPage();

  model.load(getName());

  return {};

  function getName() {
    return page.props.params.name;
  }

  function augmentPage() {
    page.state = { loading: true };
    page.componentWillReceiveProps = () => { model.load(getName()); };
  }

  function updateState(progress) {
    page.setState({
      loadLog: `${progress.name}: ${progress.file} - ${progress.completed}`
    });
  }
}
