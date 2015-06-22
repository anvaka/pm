import getGraphSpecificInfo from './graphSepcific/graphSpecificInfo.js';
import scene from './scene.js';

export default getBaseNodeViewModel;

function getBaseNodeViewModel(nodeId, graphName) {
  var graphSpecificInfo = getGraphSpecificInfo(graphName);
  var nodeInfo = scene.getNodeInfo(nodeId)

  return {
    name: graphSpecificInfo.getNodeName(nodeInfo.name),

    inDegree: nodeInfo.in,
    inDegreeLabel: graphSpecificInfo.getInDegreeLabel(nodeInfo.in),

    outDegree: nodeInfo.out,
    outDegreeLabel: graphSpecificInfo.getOutDegreeLabel(nodeInfo.out)
  };
}
