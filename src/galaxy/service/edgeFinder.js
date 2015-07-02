export default edgeFinder;

function edgeFinder(from, to, outL, inL, labels) {
  var result = [];
  var anyFrom = typeof from === 'boolean';
  var anyTo = typeof to === 'boolean';
  if (anyFrom && anyTo) {
    // it's either all or nothing:
    if (from && to) {
      addAllEdges();
    }
    return result;
  }

  if (anyFrom && !anyTo) {
    if (!from) return result;

    addAnyFrom(to, inL);
    return result;
  } else if (anyTo && !anyFrom) {
    if (!to) return result;

    addAnyTo(from, outL);
    return result;
  }
  var indexSource = from;
  var iterateSource = to;
  var iterateDeps = inL;

  if (from.length > to.length) {
    indexSource = to;
    iterateSource = from;
    iterateDeps = outL;
  }
  var index = buildIndex(indexSource);

  compositeSearch();

  return result;

  function buildIndex(src) {
    var index = Object.create(null);
    for (var i = 0; i < src.length; ++i) {
      index[src[i].id] = true;
    }
    return index;
  }

  function compositeSearch() {
    for (var i = 0; i < iterateSource.length; ++i) {
      var item = iterateSource[i].id;
      addIndexed(item, iterateDeps[item]);
    }
  }

  function addIndexed(nodeId, neighbours) {
    if (!neighbours) return;
    for (var i = 0; i < neighbours.length; ++i) {
      if (index[neighbours[i]]) {
        result.push(nodeId, neighbours[i]);
      }
    }
  }

  function addAnyFrom(to, inL) {
    for (var i = 0; i < to.length; ++i) {
      var nodeId = to[i].id;
      addEdges(nodeId, inL[nodeId]);
    }
  }

  function addAnyTo(from, outL) {
    for (var i = 0; i < from.length; ++i) {
      var nodeId = from[i].id;
      addEdges(nodeId, outL[nodeId]);
    }
  }

  function addAllEdges() {
    for (var i = 0; i < labels.length; ++i) {
      addEdges(i, outL[i]);
      addEdges(i, inL[i]);
    }
  }

  function addEdges(node, edges) {
    if (!edges) return;
    for (var i = 0; i < edges.length; ++i) {
      result.push(node, edges[i]);
    }
  }
}
