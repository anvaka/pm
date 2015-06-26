import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js';
import formatNumber from '../utils/formatNumber.js';

export default showDegree;

function showDegree(id, connectionType) {
  var rootInfo = scene.getNodeInfo(id);
  var conenctions = scene.getConnected(id, connectionType);
  var viewModel = new DegreeWindowViewModel(rootInfo.name, conenctions, connectionType);

  appEvents.showPackageListWindow.fire(viewModel, 'degree');
}

function DegreeWindowViewModel(name, list, connectionType) {
  this.className = 'degree-results-window';
  this.list = list;
  this.nodeName = name;
  this.dependenciesNumber = formatNumber(list.length);
  if (connectionType === 'in') {
    this.connectionClassName = 'in-degree';
    this.dependenciesKindName = 'dependents';
  } else {
    this.connectionClassName = 'out-degree';
    this.dependenciesKindName = 'dependencies';
  }
}
