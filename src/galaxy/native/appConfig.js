import appEvents from '../service/appEvents.js';
import eventify from 'ngraph.events';
import scene from '../store/scene.js';
import qs from 'qs';


var defaultConfig = {
  pos: {x : 0, y: 0, z: 0 },
  lookAt: {x: 0, y: 0, z: 0, w: 1},
  showLinks: true,
  maxVisibleDistance: 150,
  scale: 1.75,
  manifestVersion: 0
};

export default appConfig();

function appConfig() {
  var hashConfig = parseFromHash(window.location.hash);
  var hashUpdate; // async hash update id

  var api = {
    getCameraPosition: getCameraPosition,
    getCameraLookAt: getCameraLookAt,
    getShowLinks: getShowLinks,
    getScaleFactor: getScaleFactor,
    getMaxVisibleEdgeLength: getMaxVisibleEdgeLength,
    setCameraConfig: setCameraConfig,
    setShowLinks: setShowLinks,
    getManifestVersion: getManifestVersion,
    setManifestVersion: setManifestVersion
  };

  appEvents.toggleLinks.on(toggleLinks);
  appEvents.queryChanged.on(queryChanged);

  eventify(api);
  return api;


  function getScaleFactor() {
    return hashConfig.scale;
  }

  function getManifestVersion() {
    return hashConfig.manifestVersion;
  }

  function getMaxVisibleEdgeLength() {
    var val = parseFloat(document.getElementById("range").value);
    return val * val * hashConfig.scale;
  }

  function getCameraPosition() {
    return hashConfig.pos;
  }

  function toggleLinks() {
    setShowLinks(!hashConfig.showLinks);
  }

  function getCameraLookAt() {
    return hashConfig.lookAt;
  }

  function getShowLinks() {
    return hashConfig.showLinks;
  }

  function queryChanged() {
    var currentHashConfig = parseFromHash(window.location.hash);
    var cameraChanged = !same(currentHashConfig.pos, hashConfig.pos) ||
                        !same(currentHashConfig.lookAt, hashConfig.lookAt);
    var showLinksChanged = hashConfig.showLinks !== currentHashConfig.showLinks;

    if (cameraChanged) {
      setCameraConfig(currentHashConfig.pos, currentHashConfig.lookAt);
      api.fire('camera');
    }
    if (showLinksChanged) {
      setShowLinks(currentHashConfig.showLinks);
    }
    setManifestVersion(currentHashConfig.manifestVersion);
  }

  function setShowLinks(linksVisible) {
    if (linksVisible === hashConfig.showLinks) return;
    hashConfig.showLinks = linksVisible;
    api.fire('showLinks');
    updateHash();
  }

  function setManifestVersion(version) {
    if (version === hashConfig.manifestVersion) return;
    hashConfig = parseFromHash(window.location.hash);
    hashConfig.manifestVersion = version;
    updateHash();

    var name = scene.getGraphName();
    appEvents.downloadGraphRequested.fire(name);
  }

  function setCameraConfig(pos, lookAt) {
    if (same(pos, hashConfig.pos) &&
        same(lookAt, hashConfig.lookAt) &&
        lookAt.w === hashConfig.lookAt.w) return;

    hashConfig.pos.x = pos.x;
    hashConfig.pos.y = pos.y;
    hashConfig.pos.z = pos.z;

    hashConfig.lookAt.x = lookAt.x;
    hashConfig.lookAt.y = lookAt.y;
    hashConfig.lookAt.z = lookAt.z;
    hashConfig.lookAt.w = lookAt.w;

    updateHash();
  }

  function updateHash() {
    // TODO: This needs to be rewritten. It should not update all fields,
    // only those that modified.
    var name = scene.getGraphName();
    var pos = hashConfig.pos;
    var lookAt = hashConfig.lookAt;
    var hash = '#/galaxy/' + name +
      '?cx=' + Math.round(pos.x) +
      '&cy=' + Math.round(pos.y) +
      '&cz=' + Math.round(pos.z) +
      '&lx=' + lookAt.x.toFixed(4) +
      '&ly=' + lookAt.y.toFixed(4) +
      '&lz=' + lookAt.z.toFixed(4) +
      '&lw=' + lookAt.w.toFixed(4) +
      '&ml=' + hashConfig.maxVisibleDistance +
      '&s=' + hashConfig.scale +
      '&l=' + (hashConfig.showLinks ? '1' : '0') +
      '&v=' + hashConfig.manifestVersion;

    setHash(hash);
  }

  function setHash(hash) {
    // I noticed Chrome address string becomes very slow if we update URL too
    // often. Thus, I'm adding small throttling here.
    if (hashUpdate) {
      window.clearTimeout(hashUpdate);
    }

    hashUpdate = setTimeout(function() {
      if (window.history) {
        window.history.replaceState(undefined, undefined, hash);
      } else {
        window.location.replace(hash);
      }
      hashUpdate = null;
    }, 400);
  }

  function same(v1, v2) {
    if (!v1 || !v2) return false;
    return v1.x === v2.x &&
           v1.y === v2.y &&
           v1.z === v2.z;
  }

  function parseFromHash(hash) {
    if (!hash) {
      return defaultConfig;
    }

    var query = qs.parse(hash.split('?')[1]);

    var pos = {
      x: query.cx || 0,
      y: query.cy || 0,
      z: query.cz || 0
    };

    var lookAt = {
      x: query.lx || 0,
      y: query.ly || 0,
      z: query.lz || 0,
      w: getNumber(query.lw || 1)
    };

    var showLinks = (query.l === '1');

    return {
      pos: normalize(pos),
      lookAt: normalize(lookAt),
      showLinks: showLinks,
      maxVisibleDistance: getNumber(query.ml, defaultConfig.maxVisibleDistance),
      scale: getNumber(query.s, defaultConfig.scale),
      manifestVersion: query.v || defaultConfig.manifestVersion
    };
  }
}

function normalize(v) {
  if (!v) return v;
  v.x = getNumber(v.x);
  v.y = getNumber(v.y);
  v.z = getNumber(v.z);
  return v;
}

function getNumber(x, defaultValue) {
  if (defaultValue === undefined) defaultValue = 0;

  x = parseFloat(x);
  if (isNaN(x)) return defaultValue;
  return x;
}
