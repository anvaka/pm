export default graphSpecificInfo;

function graphSpecificInfo(graphName) {
  switch(graphName) {
    case 'npm':
    case 'bower':
    case 'cpan':
    case 'composer':
    case 'rubygems':
      return new PackagesGraph(graphName);
    case 'gosearch':
      return new GoGraph(graphName);
    case 'github':
      return new FollowersGraph(graphName);
  }
  return new DefaultGraph(graphName);
}

function DefaultGraph() {
  this.getInDegreeLabel = function getInDegreeLabel(inDegreeValue) {
    return 'in-degree';
  };

  this.getOutDegreeLabel = function getInDegreeLabel(outDegreeValue) {
    return 'out-degree';
  };

  this.getNodeName = function getNodeName(currentName) {
    return currentName;
  }
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

  this.getNodeName = function (currentName) {
    if (currentName) {
      // most of the go packages are on github, which results in huge name.
      // Lets shorted it:
      return currentName.replace('github.com/', '');
    }
    return currentName;
  };
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
