/**
 * Wrapper on top of graph data. Not sure where it will go yet.
 */
export default graph;

function graph(rawGraphLoaderData) {
  var {labels, outLinks, inLinks, positions} = rawGraphLoaderData;
  var empty = [];

  var api = {
    getNodeInfo: getNodeInfo,
    getConnected: getConnected,
    find: find
  };

  return api;


  function find(query) {
    var result = [];
    if (!labels) return result;

    if (typeof query === 'string') {
      // short circuit if it's blank string - no results
      if (!query) return result;
      query = regexMatcher(query);
    }

    for (var i = 0; i < labels.length; ++i) {
      if (query(i, labels, outLinks, inLinks, positions)) {
        result.push(getNodeInfo(i));
      }
    }

    return result;
  }

  function regexMatcher(str) {
    var regex = compileRegex(str);
    if (!regex) return no;

    return function (i, labels, outLinks, inLinks, pos) {
      return labels[i].match(regex);
    }
  }

  function no() { return false; }

  function compileRegex(pattern) {
    try {
      return new RegExp(pattern, 'ig');
    } catch (e) {
      // this cannot be compiled. Ignore it.
    }
  }

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
      id: id,
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
