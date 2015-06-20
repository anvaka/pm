/**
 * Wrapper on top of graph data. Not sure where it will go yet.
 */
export default graph;

function graph(rawGraphLoaderData) {
  var {labels, links, positions, inDegree} = rawGraphLoaderData;

  var api = {
    getNodeInfo: getNodeInfo
  };

  return api;

  function getNodeInfo(id) {
    if (!labels) return;

    var outLinksCount = 0;
    if (graphLinks[id]) {
      outLinksCount = links[id].length;
    }
    var inLinksCount = inDegree[id] || 0;

    return {
      name: labels[id],
      out: outLinksCount,
      in : inLinksCount
    };
  }

  function getName(id) {
    if (!labels) return '';
    if (id < 0 || id > labels.length) {
      throw new Error(id + " is outside of labels range");
    }
    return labels[id];
  }

  function getPositions() {
    return positions;
  }

  function getLinks() {
    return graphLinks;
  }

}
