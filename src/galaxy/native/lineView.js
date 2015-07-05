import appConfig from './appConfig.js';

export default renderLinks;

function renderLinks(scene, THREE) {
  var linksVisible = true;
  var linkMesh;

  var api = {
    /**
     * Renders links based on current graph model
     */
    render: render,
    /**
     * Turns links rendering on or off
     */
    toggleLinks: toggleLinks,
    /**
     * Gets or sets links visibility. If you pass truthy argument
     * sets visibility to that value. Otherwise returns current visibility
     */
    linksVisible: setOrGetLinksVisible
  };

  return api;

  function setOrGetLinksVisible(newValue) {
    if (newValue === undefined) {
      return linksVisible;
    }

    if (newValue) {
      scene.add(linkMesh);
    } else {
      scene.remove(linkMesh);
    }

    linksVisible = newValue;
    return linksVisible;
  }

  function render(links, idxToPos, linksCount) {
    var jsPos = [];
    var jsColors = [];
    var r = 16000;
    var i = 0;
    var linkId = 0;
    var maxVisibleDistance = appConfig.getMaxVisibleEdgeLength();

    for (i = 0; i < links.length; ++i) {
      var to = links[i];
      if (to === undefined) continue; // no links for this node

      var fromX = idxToPos[i * 3];
      var fromY = idxToPos[i * 3 + 1];
      var fromZ = idxToPos[i * 3 + 2];

      for (var j = 0; j < to.length; j++) {
        var toIdx = to[j];

        var toX = idxToPos[toIdx * 3];
        var toY = idxToPos[toIdx * 3 + 1];
        var toZ = idxToPos[toIdx * 3 + 2];

        var dist = distance(fromX, fromY, fromZ, toX, toY, toZ);
        if (maxVisibleDistance < dist) continue;
        jsPos.push(fromX, fromY, fromZ, toX, toY, toZ);
        jsColors.push(fromX / r + 0.5, fromY / r + 0.5, fromZ / r + 0.5, toX / r + 0.5, toY / r + 0.5, toZ / r + 0.5)
      }
    }

    var positions = new Float32Array(jsPos);
    var colors = new Float32Array(jsColors);

    var geometry = new THREE.BufferGeometry();
    var material = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending,
      opacity:0.5,
      transparent: true
    });

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    geometry.computeBoundingSphere();
    if (linkMesh) {
      scene.remove(linkMesh);
    }

    linkMesh = new THREE.Line(geometry, material, THREE.LinePieces);
    scene.add(linkMesh);
  }

  function toggleLinks() {
    setOrGetLinksVisible(!linksVisible);
  }
}

function distance(x1, y1, z1, x2, y2, z2) {
  return (x1 - x2) * (x1 - x2) +
        (y1 - y2) * (y1 - y2) +
        (z1 - z2) * (z1 - z2);
}
