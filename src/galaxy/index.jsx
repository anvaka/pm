import React from 'react';
import createGraphModel from  './service/graphModel.js';
import LoadingIndicator from './loadingIndicator.jsx';
import Scene from './scene.jsx';

export default class GalaxyPage extends React.Component {
  constructor(props) {
    super(props);
    var model = createGraphModel();
    model.on('progress', this.updateState, this);
    model.on('graphModel', this.hideProgress, this);
    model.load(this.getName());
    this.state = {
      loading: true,
      graphModel: model
    };
    this._model = model;
  }

  render() {
    return (
      <div>
        if (this.state.loading) {
          <LoadingIndicator message={this.state.loadLog} />
        }

        <Scene graphModel={this.state.graphModel}/>
      </div>
    );
  }

  componentWillReceiveProps() {
    this._model.load(this.getName());
  }

  getName() {
    return this.props.params.name;
  }

  updateState(progress) {
    this.setState({
      loadLog: `${progress.name}: ${progress.file} - ${progress.completed}`
    });
  }

  hideProgress() {
    this.setState({ loading: false });
  }
}
