import getGraphSpecificInfo from './graphSepcific/graphSpecificInfo.js';
import scene from './scene.js';

export default getBaseNodeViewModel;

function getBaseNodeViewModel(nodeId) {
  var graphName = scene.getGraphName();
  var graphSpecificInfo = getGraphSpecificInfo(graphName);
  var nodeInfo = scene.getNodeInfo(nodeId)

  return {
    name: nodeInfo.name,
    id: nodeInfo.id,

    inDegree: nodeInfo.in,
    inDegreeLabel: graphSpecificInfo.getInDegreeLabel(nodeInfo.in),

    outDegree: nodeInfo.out,
    outDegreeLabel: graphSpecificInfo.getOutDegreeLabel(nodeInfo.out)
  };
}
