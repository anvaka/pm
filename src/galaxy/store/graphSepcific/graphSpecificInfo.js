export default graphSpecificInfo;

function graphSpecificInfo(graphName) {
  switch(graphName) {
    case 'npm':
    case 'bower':
    case 'cpan':
    case 'cran':
    case 'composer':
    case 'rubygems':
    case 'debian':
    case 'arch':
    case 'brew':
    case 'nuget':
    case 'python':
      return new PackagesGraph(graphName);
    case 'gosearch':
      return new GoGraph(graphName);
    case 'github':
      return new FollowersGraph(graphName);
  }
  return new DefaultGraph(graphName);
}

function DefaultGraph(graphName) {
  this.graphName = graphName;
  this.getInDegreeLabel = function getInDegreeLabel(inDegreeValue) {
    return 'in-degree';
  };

  this.getOutDegreeLabel = function getInDegreeLabel(outDegreeValue) {
    return 'out-degree';
  };
}

function PackagesGraph(graphName) {
  DefaultGraph.call(this, graphName);

  this.getInDegreeLabel = function getInDegreeLabel(inDegreeValue) {
    return inDegreeValue === 1 ? 'dependent' : 'dependents';
  };

  this.getOutDegreeLabel = function getInDegreeLabel(outDegreeValue) {
    return outDegreeValue === 1 ? 'dependency' : 'dependencies';
  };
}

function GoGraph(graphName) {
  PackagesGraph.call(this, graphName);
}

function FollowersGraph(graphName) {
  DefaultGraph.call(this, graphName);

  this.getInDegreeLabel = function getInDegreeLabel(inDegreeValue) {
    return inDegreeValue === 1 ? 'follower' : 'followers';
  };

  this.getOutDegreeLabel = function getInDegreeLabel(outDegreeValue) {
    return 'following';
  };
}
