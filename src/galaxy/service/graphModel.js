import appEvents from './appEvents.js';
import config from '../../config.js';
import request from './request.js';
import eventify from 'ngraph.events';

export default graphModel;

function graphModel() {
  var positions, links, labels;
  var api = {
    load: load,
    getPositions: getPositions,
    getLinks: getLinks
  };

  eventify(api);

  return api;

  function getPositions() {
    return positions;
  }

  function getLinks() {
    return links;
  }

  function load(name) {
    // todo: handle errors
    var galaxyEndpoint = config.dataUrl + name;

    var manifest;

    return loadManifest()
      .then(loadPositions)
      .then(loadLinks)
      .then(loadLabels);

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
      links = new Int32Array(buffer);
      appEvents.fire('links', api);
    }

    function loadLabels() {
      return request(galaxyEndpoint + '/labels.json', {
        responseType: 'json',
        progress: reportProgress(name, 'labels')
      }).then(setLabels);
    }

    function setLabels(data) {
      labels = data;
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
