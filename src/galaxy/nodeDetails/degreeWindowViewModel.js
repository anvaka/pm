import scene from '../store/scene.js';
import formatNumber from '../utils/formatNumber.js';

export default DegreeWindowViewModel;

function DegreeWindowViewModel(name, list, connectionType, id) {
  this.id = id;
  this.className = 'degree-results-window';
  this.list = list;
  this.nodeName = name;
  this.degreeNumber = formatNumber(list.length);
  this.connectionType = connectionType;
  this.degreeKindName = getDegreeName(connectionType, list.length);
}

DegreeWindowViewModel.prototype.__name = 'DegreeWindowViewModel';

// TODO: This is a dupe.
function getDegreeName(connectionType, count) {
  var graphName = scene.getGraphName();
  switch (graphName) {
    case 'npm':
    case 'bower':
    case 'cpan':
    case 'cran':
    case 'composer':
    case 'rubygems':
    case 'gosearch':
    case 'debian':
    case 'arch':
    case 'brew':
    case 'nuget':
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
    return 'following'
  }

  return count === 1 ? 'follower' : 'followers';
}
