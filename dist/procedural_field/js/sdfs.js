// Signed Distance Functions
// Adapted from https://iquilezles.org/articles/distfunctions/
// and http://iquilezles.org/articles/distfunctions2d/

/**
 * 2D Circle
 * @param {*} pixel 
 * @param {*} center 
 * @param {*} radius 
 * @returns 
 */
function sdCircle(pixel, center, radius) {
  // float sdCircle( vec2 p, float r )
  // {
  //   return length(p) - r;
  // }

  const dx = pixel[0] - center[0];
  const dy = pixel[1] - center[1];

  return Math.sqrt(dx * dx + dy * dy) - radius;
}

/**
 * 2D Rectangle
 * @param {*} pixel 
 * @param {*} center 
 * @param {*} size 
 * @returns 
 */
function sdRect(pixel, center, size) {
  // float sdBox( in vec2 p, in vec2 b )
  // {
  //   vec2 d = abs(p)-b;
  //   return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
  // }

  const px = pixel[0] - center[0];
  const py = pixel[1] - center[1];

  const dx = Math.abs(px) - size[0];
  const dy = Math.abs(py) - size[1];

  const dxmax = Math.max(dx, 0);
  const dymax = Math.max(dy, 0);

  return Math.sqrt(dxmax * dxmax + dymax * dymax) +
    Math.min(Math.max(dx, dy), 0);
}

/**
 * 3D Sphere
 * @param {*} pixel 
 * @param {*} center 
 * @param {*} radius 
 * @returns 
 */
function sdSphere(pixel, center, radius) {
  // float sdSphere( vec3 p, float s )
  // {
  //   return length(p)-s;
  // }

  const dx = pixel[0] - center[0];
  const dy = pixel[1] - center[1];
  const dz = pixel[2] - center[2];

  return Math.sqrt(dx * dx + dy * dy + dz * dz) - radius;
}

/**
 * 3D Box
 * @param {*} pixel 
 * @param {*} center 
 * @param {*} radii [halfX, halfY, halfZ] dimensions
 * @returns 
 */
function sdBox(pixel, center, radii) {
  // float sdBox( vec3 p, vec3 b )
  // {
  //   vec3 q = abs(p) - b;
  //   return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
  // }

  const px = pixel[0] - center[0];
  const py = pixel[1] - center[1];
  const pz = pixel[2] - center[2];

  const dx = Math.abs(px) - radii[0];
  const dy = Math.abs(py) - radii[1];
  const dz = Math.abs(pz) - radii[2];

  const dxmax = Math.max(dx, 0);
  const dymax = Math.max(dy, 0);
  const dzmax = Math.max(dz, 0);

  return Math.sqrt(dxmax * dxmax + dymax * dymax + dzmax * dzmax) +
    Math.min(Math.max(dx, dy, dz), 0);
}

/**
 * 3D Torus in XY plane
 * @param {*} pixel 
 * @param {*} center 
 * @param {*} radii [ringR, widthR] dimensions
 * @returns 
 */
function sdTorusXY(pixel, center, radii)
{
  const px = pixel[0] - center[0];
  const py = pixel[1] - center[1];
  const pz = pixel[2] - center[2];

  const qx = Math.sqrt(px * px + py * py) - radii[0];
  const qy = pz;

  return Math.sqrt(qx * qx + qy * qy) - radii[1];
}

/**
 * 3D Torus in XZ plane
 * @param {*} pixel 
 * @param {*} center 
 * @param {*} radii [ringR, widthR] dimensions
 * @returns 
 */
function sdTorusXZ(pixel, center, radii)
{
  // float sdTorus( vec3 p, vec2 t )
  // {
  //   vec2 q = vec2(length(p.xz)-t.x,p.y);
  //   return length(q)-t.y;
  // }

  const px = pixel[0] - center[0];
  const py = pixel[1] - center[1];
  const pz = pixel[2] - center[2];

  const qx = Math.sqrt(px * px + pz * pz) - radii[0];
  const qy = py;

  return Math.sqrt(qx * qx + qy * qy) - radii[1];
}

/**
 * 3D Torus in YZ plane
 * @param {*} pixel 
 * @param {*} center 
 * @param {*} radii [ringR, widthR] dimensions
 * @returns 
 */
function sdTorusYZ(pixel, center, radii)
{
  const px = pixel[0] - center[0];
  const py = pixel[1] - center[1];
  const pz = pixel[2] - center[2];

  const qx = Math.sqrt(py * py + pz * pz) - radii[0];
  const qy = px;

  return Math.sqrt(qx * qx + qy * qy) - radii[1];
}





// SDF intersections: https://iquilezles.org/articles/distfunctions/
// Interesting post on SDF combination (in ): https://www.ronja-tutorials.com/post/035-2d-sdf-combination/


/**
 * Union of 2 SDFs
 * @param {*} d1 
 * @param {*} d2 
 * @returns 
 */
function opUnion(d1, d2) {
  return Math.min(d1, d2);
}

/**
 * Intersection of 2 SDFs
 * @param {*} d1 
 * @param {*} d2 
 * @returns 
 */
function opIntersection(d1, d2) {
  return Math.max(d1, d2);
}

/**
 * Subtraction of SDF1 - SDF2
 * @param {*} d1 
 * @param {*} d2 
 * @returns 
 */
function opSubtraction(d1, d2) {
  return Math.max(d1, -d2);
}


/**
 * Smooth union of 2 SDFs
 * @param {*} d1 
 * @param {*} d2 
 * @param {*} k 
 * @returns 
 */
function opSmoothUnion(d1, d2, k) {
  const h = Math.max(k - Math.abs(d1 - d2), 0);
  return Math.min(d1, d2) - 0.25 * h * h / k;
}


/**
 * Smooth subtraction of SDF1 - SDF2
 * @param {*} d1 
 * @param {*} d2 
 * @param {*} k 
 * @returns 
 */
function opSmoothSubtraction(d1, d2, k) {
  //float h = max(k-abs(-d1-d2),0.0);
  //return max(-d1, d2) + h*h*0.25/k;

  return -opSmoothUnion(d1, -d2, k);
}

/**
 * Smooth inersection of 2 SDFs
 * @param {*} d1 
 * @param {*} d2 
 * @param {*} k 
 * @returns 
 */
function opSmoothIntersection(d1, d2, k) {
  //float h = max(k-abs(d1-d2),0.0);
  //return max(d1, d2) + h*h*0.25/k;

  return -opSmoothUnion(-d1, -d2, k);
}