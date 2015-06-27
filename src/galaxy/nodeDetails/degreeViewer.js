import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js';
import formatNumber from '../utils/formatNumber.js';

export default showDegree;

function showDegree(id, connectionType) {
  var rootInfo = scene.getNodeInfo(id);
  var conenctions = scene.getConnected(id, connectionType);

  var viewModel = new DegreeWindowViewModel(rootInfo.name, conenctions, connectionType);

  appEvents.showPackageListWindow.fire(viewModel, 'degree');
  appEvents.selectNode.fire(id);
}

function DegreeWindowViewModel(name, list, connectionType) {
  this.className = 'degree-results-window';
  this.list = list;
  this.nodeName = name;
  this.degreeNumber = formatNumber(list.length);
  this.connectionType = connectionType;
  this.degreeKindName = getDegreeName(connectionType, list.length);
}

// TODO: This is a dupe.
function getDegreeName(connectionType, count) {
  var graphName = scene.getGraphName();
  switch (graphName) {
    case 'npm':
    case 'bower':
    case 'cpan':
    case 'composer':
    case 'rubygems':
    case 'gosearch':
      return dependencyName(connectionType, count);
    case 'github':
      return followerName(connectionType, count);
  }
  return connectionType === 'in' ? 'indegree' : 'outdegree';
}

function dependencyName(connectionType, count) {
  if (connectionType === 'in') {
    return count === 1 ? 'dependent' : 'dependents';
  }
  return count === 1 ? 'dependency' : 'dependencies';
}

function followerName(connectionType, count) {
  if (connectionType === 'out') {
    return count === 1 ? 'follower' : 'followers';
  }

  return 'following';
}
