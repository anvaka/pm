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
    var positions = new Float32Array(linksCount * 6);
    var colors = new Float32Array(linksCount * 6);
    var r = 16000;
    var i = 0;
    var linkId = 0;

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

        positions[linkId] = fromX;
        positions[linkId + 1] = fromY;
        positions[linkId + 2] = fromZ;
        positions[linkId + 3] = toX;
        positions[linkId + 4] = toY;
        positions[linkId + 5] = toZ;

        colors[linkId] = fromX / r + 0.5;
        colors[linkId + 1] = fromY / r + 0.5;
        colors[linkId + 2] = fromZ / r + 0.5;
        colors[linkId + 3] = toX / r + 0.5;
        colors[linkId + 4] = toY / r + 0.5;
        colors[linkId + 5] = toZ / r + 0.5;

        linkId += 6;
      }
    }

    var geometry = new THREE.BufferGeometry();
    var material = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors
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
