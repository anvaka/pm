import appEvents from '../service/appEvents.js';
import eventify from 'ngraph.events';
import scene from '../store/scene.js';
import qs from 'qs';

export default cameraService();

// TODO: This should probably be called appState, and we can add more
// config related arguments to the query string
function cameraService() {
  var cameraPosition, lastPos, lastLookAt;
  var api = {
    getCameraPosition: getCameraPosition,
    getCameraLookAt: getCameraLookAt,
    set: set
  };

  appEvents.queryChanged.on(moveCameraIfNeeded);

  eventify(api);
  return api;

  function getCameraPosition() {
    ensureInitialized();
    return lastPos;
  }

  function getCameraLookAt() {
    ensureInitialized();
    return lastLookAt;
  }

  function moveCameraIfNeeded() {
    var hashLocation = parseFromHash(window.location.hash);
    if (same(hashLocation.pos, lastPos) && same(hashLocation.lookAt, lastLookAt)) return;

    set(hashLocation.pos, hashLocation.lookAt);
    api.fire('changed');
  }

  function set(pos, lookAt) {
    if (same(pos, lastPos) &&
        same(lookAt, lastLookAt) &&
       lookAt.w === lastLookAt.w) return;

    var name = scene.getGraphName();
    var hash = '#/galaxy/' + name +
      '?cx=' + Math.round(pos.x)  +
      '&cy=' + Math.round(pos.y) +
      '&cz=' + Math.round(pos.z) +
      '&lx=' + lookAt.x +
      '&ly=' + lookAt.y +
      '&lz=' + lookAt.z +
      '&lw=' + lookAt.w;

    if (!lastPos) lastPos = {};
    lastPos.x = pos.x;
    lastPos.y = pos.y;
    lastPos.z = pos.z;

    if (!lastLookAt) lastLookAt = {};
    lastLookAt.x = lookAt.x;
    lastLookAt.y = lookAt.y;
    lastLookAt.z = lookAt.z;
    lastLookAt.w = lookAt.w;

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
      return {
        pos: {x : 0, y: 0, z: 0 },
        lastLookAt: {x: 0, y: 0, z: 0, w: 1}
      };
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

    return {
      pos: normalize(pos),
      lookAt: normalize(lookAt)
    };
  }

  function ensureInitialized() {
    if (!lastPos) {
      var hashLocation = parseFromHash(window.location.hash);
      lastPos = hashLocation.pos;
      lastLookAt = hashLocation.lookAt;
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
