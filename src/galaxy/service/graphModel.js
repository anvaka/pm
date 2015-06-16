import appEvents from './appEvents.js';
import config from '../../config.js';
import request from './request.js';
import eventify from 'ngraph.events';

export default graphModel;

function graphModel() {
  var positions, labels;
  var graphLinks = [];
  var inDegree = [];
  var api = {
    load: load,
    getPositions: getPositions,
    getLinks: getLinks,
    getName: getName,
    getNodeInfo: getNodeInfo
  };

  eventify(api);

  return api;

  function getNodeInfo(idx) {
    if (!labels) return;
    var outLinksCount = 0;
    if (graphLinks[idx]) {
      outLinksCount = graphLinks[idx].length;
    }
    var inDegreeValue = inDegree[idx] || 0;

    return {
      name: labels[idx],
      out: outLinksCount,
      in: inDegreeValue
    };
  }

  function getName(idx) {
    if (!labels) return '';
    if (idx < 0 || idx > labels.length) {
      throw new Error(idx + " is outside of labels.json range");
    }
    return labels[idx];
  }

  function getPositions() {
    return positions;
  }

  function getLinks() {
    return graphLinks;
  }

  function load(name) {
    // todo: handle errors
    var galaxyEndpoint = config.dataUrl + name;

    var manifest;

    return loadManifest()
      .then(loadPositions)
      .then(loadLinks)
      .then(loadLabels)
      .then(declareModelIsReady);

    function declareModelIsReady() {
      appEvents.fire('graphModel', api);
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
      appEvents.fire('positions', positions);
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
        }
        else {
          var toNode = links[i] - 1;
          lastArray.push(toNode);
          if (inDegree[toNode] === undefined) {
            inDegree[toNode] = 1;
          } else {
            inDegree[toNode] += 1;
          }
        }
      }

      appEvents.fire('links', graphLinks);
    }

    function loadLabels() {
      return request(galaxyEndpoint + '/labels.json', {
        responseType: 'json',
        progress: reportProgress(name, 'labels')
      }).then(setLabels);
    }

    function setLabels(data) {
      labels = data;
      appEvents.fire('labels', labels);
    }
  }

  function reportProgress(name, file) {
    return function (e) {
      api.fire('progress', {
        name: name,
        file: file,
        completed: Math.round(e.percent * 100) + '%'
      });
    };
  }
}
