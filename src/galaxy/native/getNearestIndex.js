/**
 * Based on octree search results tries to find index of a point which is
 * nearest to the ray in z-direction, and is closer than maxDistanceFromRay
 */

export default getNearestIndex;

function getNearestIndex(allPoints, intersectedIndexes, ray, maxDistanceFromRay) {
  if (intersectedIndexes.length === 0) return intersectedIndexes;

  // This is not necessary the fastest solution, but in practice it is very fast
  intersectedIndexes.sort(byProximityToRay);

  var candidate = intersectedIndexes[0];

  if (getDistanceToRay(candidate) < maxDistanceFromRay) {
    return candidate;
  }

  // No point is closer than maxDistanceFromRay, return undefined answer
  return;

  function byProximityToRay(x, y) {
    var distX = getDistanceToRay(x);
    var distY = getDistanceToRay(y);
    return distX - distY;
  }

  function getDistanceToRay(idx) {
    var x = allPoints[idx];
    var y = allPoints[idx + 1];
    var z = allPoints[idx + 2];

    var dx = ray.direction.x * (x - ray.origin.x);
    var dy = ray.direction.y * (y - ray.origin.y);
    var dz = ray.direction.z * (z - ray.origin.z);

    var directionDistance = dx + dy + dz;
    var vx = ray.direction.x * directionDistance + ray.origin.x;
    var vy = ray.direction.y * directionDistance + ray.origin.y;
    var vz = ray.direction.z * directionDistance + ray.origin.z;

    return (vx - x) * (vx - x) + (vy - y) * (vy - y) + (vz - z) * (vz - z);
  }
}
