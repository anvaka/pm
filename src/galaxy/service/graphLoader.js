/**
 * Graph loader downloads graph from repository. Each graph consist of multiple
 * files:
 *
 * manifest.json - declares where the last version of the graph is stored.
 * positions.bin - a binary file of int32 trpilets. Each triplet defines
 *   node position in 3d space. Index of triplet is considered as node id.
 * links.bin - a sequence of edges. Read https://github.com/anvaka/ngraph.tobinary#linksbin-format
 *   for more information about its structure.
 * labels.json - array of node names. Position of a label in the array corresponds
 *   to the triplet index.
 *
 * During download this downloader will report on global event bus its progress:
 *  events.labelsDownloaded - labels file is downloaded;
 *  events.linksDownloaded - links file is downloaded;
 *  events.positionsDownloaded - positions file is downloaded;
 */

import config from '../../config.js';
import request from './request.js';
import createGraph from './graph.js';
import events from './events.js';

export default loadGraph;

/**
 * @param {string} name of the graph to be downloaded
 * @param {progressCallback} progress notifies when download progress event is
 * received
 * @param {completeCallback} complete notifies when all graph files are downloaed
 *
 */
function loadGraph(name, progress) {
  var positions, labels;
  var graphLinks = [];
  var inDegree = [];

  // todo: handle errors
  var galaxyEndpoint = config.dataUrl + name;

  var manifest;

  return loadManifest()
    .then(loadPositions)
    .then(loadLinks)
    .then(loadLabels)
    .then(convertToGraph);

  function convertToGraph() {
    return createGraph({
      positions: positions,
      labels: labels,
      links: graphLinks,
      inDegree: inDegree
    });
  }

  function loadManifest() {
    return request(galaxyEndpoint + '/manifest.json', {
      responseType: 'json'
    }).then(setManifest);
  }

  function setManifest(response) {
    manifest = response;
    galaxyEndpoint += '/' + manifest.last;
  }

  function loadPositions() {
    return request(galaxyEndpoint + '/positions.bin', {
      responseType: 'arraybuffer',
      progress: reportProgress(name, 'positions')
    }).then(setPositions);
  }

  function setPositions(buffer) {
    positions = new Int32Array(buffer);
    events.positionsDownloaded.fire(positions);
  }

  function loadLinks() {
    return request(galaxyEndpoint + '/links.bin', {
      responseType: 'arraybuffer',
      progress: reportProgress(name, 'links')
    }).then(setLinks);
  }

  function setLinks(buffer) {
    var links = new Int32Array(buffer);
    var lastArray = [];
    graphLinks[0] = lastArray;

    for (var i = 0; i < links.length; ++i) {
      if (links[i] < 0) {
        var srcIndex = -(links[i]) - 1;
        lastArray = graphLinks[srcIndex] = [];
      } else {
        var toNode = links[i] - 1;
        lastArray.push(toNode);
        if (inDegree[toNode] === undefined) {
          inDegree[toNode] = 1;
        } else {
          inDegree[toNode] += 1;
        }
      }
    }

    events.linksDownloaded.fire(graphLinks);
  }

  function loadLabels() {
    return request(galaxyEndpoint + '/labels.json', {
      responseType: 'json',
      progress: reportProgress(name, 'labels')
    }).then(setLabels);
  }

  function setLabels(data) {
    labels = data;
    events.labelsDownloaded.fire(labels);
  }

  function reportProgress(name, file) {
    return function(e) {
      progress({
        name: name,
        file: file,
        completed: Math.round(e.percent * 100) + '%'
      });
    };
  }
}
