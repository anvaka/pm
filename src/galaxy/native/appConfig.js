import appEvents from '../service/appEvents.js';
import eventify from 'ngraph.events';
import scene from '../store/scene.js';
import qs from 'qs';

export default appConfig();

var defaultConfig = {
  pos: {x : 0, y: 0, z: 0 },
  lookAt: {x: 0, y: 0, z: 0, w: 1},
  showLinks: true
};

function appConfig() {
  var cameraPosition;
  var hashConfig;

  var api = {
    getCameraPosition: getCameraPosition,
    getCameraLookAt: getCameraLookAt,
    setCameraConfig: setCameraConfig
  };

  appEvents.queryChanged.on(moveCameraIfNeeded);

  eventify(api);
  return api;

  function getCameraPosition() {
    ensureInitialized();
    return hashConfig.pos;
  }

  function getCameraLookAt() {
    ensureInitialized();
    return hashConfig.lookAt;
  }

  function moveCameraIfNeeded() {
    ensureInitialized();
    var currentHashConfig = parseFromHash(window.location.hash);
    var cameraChanged = !same(currentHashConfig.pos, hashConfig.pos) ||
                        !same(currentHashConfig.lookAt, hashConfig.lookAt);
    var showLinkChanged = hashConfig.showLinks !== currentHashConfig.showLinks;

    if (cameraChanged) {
      setCameraConfig(currentHashConfig.pos, currentHashConfig.lookAt);
      api.fire('camera');
    }
  }

  function setCameraConfig(pos, lookAt) {
    if (same(pos, hashConfig.pos) &&
        same(lookAt, hashConfig.lookAt) &&
        lookAt.w === hashConfig.lookAt.w) return;

    if (!hashConfig.pos) hashConfig.pos = {};
    hashConfig.pos.x = Math.round(pos.x);
    hashConfig.pos.y = Math.round(pos.y);
    hashConfig.pos.z = Math.round(pos.z);

    if (!hashConfig.lookAt) hashConfig.lookAt = {};
    hashConfig.lookAt.x = lookAt.x;
    hashConfig.lookAt.y = lookAt.y;
    hashConfig.lookAt.z = lookAt.z;
    hashConfig.lookAt.w = lookAt.w;

    updateHash();
  }

  function updateHash() {
    var name = scene.getGraphName();
    var pos = hashConfig.pos;
    var lookAt = hashConfig.lookAt;
    var hash = '#/galaxy/' + name +
      '?cx=' + pos.x  +
      '&cy=' + pos.y +
      '&cz=' + pos.z +
      '&lx=' + lookAt.x +
      '&ly=' + lookAt.y +
      '&lz=' + lookAt.z +
      '&lw=' + lookAt.w +
      '&l=' + (hashConfig.showLinks ? '1' : '0');

    if (window.history) {
      window.history.replaceState(undefined, undefined, hash);
    } else {
      window.location.replace(hash);
    }
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
      showLinks: showLinks
    };
  }

  function ensureInitialized() {
    if (!hashConfig) {
      hashConfig = parseFromHash(window.location.hash);
    }
  }
}

function normalize(v) {
  if (!v) return v;
  v.x = getNumber(v.x);
  v.y = getNumber(v.y);
  v.z = getNumber(v.z);
  return v;
}

function getNumber(x) {
  x = parseFloat(x);
  if (isNaN(x)) return 0;
  return x;
}
