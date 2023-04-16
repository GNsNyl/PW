/**
 * Remaps a number from one range to another.
 * @param {*} value 
 * @param {*} valueMin 
 * @param {*} valueMax 
 * @param {*} outputMin 
 * @param {*} outputMax 
 * @param {*} withinBounds 
 * @returns 
 * @see https://p5js.org/reference/#/p5/map
 * @see https://github.com/processing/p5.js/blob/a8862389633404da72d8d76db3d44d45b1fc5535/src/math/calculation.js#L448
 */
function remap(value, valueMin, valueMax, outputMin, outputMax) {
  // Compute remapped method
  return outputMin + (outputMax - outputMin) * (value - valueMin) / (valueMax - valueMin);
}

/**
 * Calculates the distance between two points.
 * @param {Number} x0 
 * @param {Number} y0 
 * @param {Number} x1 
 * @param {Number} y1 
 * @returns 
 */
function distance(x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Computes closest value between 0 and `max` at `steps` intervals.
 * @param {Number} value 
 * @param {Number} max 
 * @param {Number} steps 
 * @returns 
 */
 function closestStep(value, max, steps) {
  return Math.round((steps - 1) * value / max) * Math.floor(max / (steps - 1));
}