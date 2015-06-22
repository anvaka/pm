/**
 * Wrapper on top of graph data. Not sure where it will go yet.
 */
export default graph;

function graph(rawGraphLoaderData) {
  var {labels, outLinks, inLinks, positions} = rawGraphLoaderData;
  var empty = [];

  var api = {
    getNodeInfo: getNodeInfo,
    getConnected: getConnected
  };

  return api;

  function getConnected(startId, connectionType) {
    if (connectionType === 'out') {
      return outLinks[startId] || empty;
    } else if (connectionType === 'in') {
      return inLinks[startId] || empty;
    }
    return empty;
  }

  function getNodeInfo(id) {
    if (!labels) return;

    var outLinksCount = 0;
    if (outLinks[id]) {
      outLinksCount = outLinks[id].length;
    }

    var inLinksCount = 0;
    if (inLinks[id]) {
      inLinksCount = inLinks[id].length;
    }

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
    return links;
  }
}
