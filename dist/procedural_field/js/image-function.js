
/**
 * Fill the canvas with a solid color on a per-pixel basis.
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 */
function canvasSolid(r, g, b, a) {
    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = 4 * (x + y * width);
            pixels[index + 0] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;
        }
    }
    updatePixels();
}

/**
 * Fill the canvas with a gradient color linearly interpolated
 * between two extremes in RGB space.
 * @param {Number} r0
 * @param {Number} g0
 * @param {Number} b0
 * @param {Number} a0
 * @param {Number} r1
 * @param {Number} g1
 * @param {Number} b1
 * @param {Number} a1
 */
function canvasRGBGradientH(r0, g0, b0, a0, r1, g1, b1, a1)
{
    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Normalized coordinate in X axis
            const nx = x / width;

            // Interpolate colors linearly per RGB channel
            const index = 4 * (x + y * width);
            pixels[index + 0] = r0 + nx * (r1 - r0);
            pixels[index + 1] = g0 + nx * (g1 - g0);
            pixels[index + 2] = b0 + nx * (b1 - b0);
            pixels[index + 3] = a0 + nx * (a1 - a0);
        }
    }
    updatePixels();
}

/**
 * Fill the canvas with a gradient color linearly interpolated
 * between two extremes in RGB space.
 * @param {Number} r0
 * @param {Number} g0
 * @param {Number} b0
 * @param {Number} a0
 * @param {Number} r1
 * @param {Number} g1
 * @param {Number} b1
 * @param {Number} a1
 */
function canvasRGBGradientV(r0, g0, b0, a0, r1, g1, b1, a1)
{
    loadPixels();
    for (let y = 0; y < height; y++) {
        // Normalized coordinate in Y axis
        const ny = y / height;
        for (let x = 0; x < width; x++) {
            // Interpolate colors linearly per RGB channel
            const index = 4 * (x + y * width);
            pixels[index + 0] = r0 + ny * (r1 - r0);
            pixels[index + 1] = g0 + ny * (g1 - g0);
            pixels[index + 2] = b0 + ny * (b1 - b0);
            pixels[index + 3] = a0 + ny * (a1 - a0);
        }
    }
    updatePixels();
}


/**
 * Fill the canvas with a gradient color linearly interpolated
 * between two extremes in HSV space.
 * @param {Number} hue0 Start hue value
 * @param {Number} hue1 End hue value
 */
function canvasHueGradientH(hue0, hue1)
{
    loadPixels();
    for (let x = 0; x < width; x++) {
        // Normalized coordinate in X axis
        const nx = x / width;
        const hue = hue0 + nx * (hue1 - hue0);
        const rgb = HSBToRGB([hue, 100, 100, 100]);

        for (let y = 0; y < height; y++) {
            const index = 4 * (x + y * width);
            pixels[index + 0] = rgb[0];
            pixels[index + 1] = rgb[1];
            pixels[index + 2] = rgb[2];
            pixels[index + 3] = rgb[3];
        }
    }
    updatePixels();
}

/**
 * Fill the canvas with a gradient color linearly interpolated
 * between two extremes in HSV space.
 * @param {Number} hue0 Start hue value
 * @param {Number} hue1 End hue value
 */
function canvasHueGradientV(hue0, hue1)
{
    // console.log(HSBToRGB([hue0, 100, 100, 100]));

    loadPixels();
    for (let y = 0; y < height; y++) {
        // Normalized coordinate in Y axis
        const ny = y / height;
        const hue = hue0 + ny * (hue1 - hue0);
        const rgb = HSBToRGB([hue, 100, 100, 100]);

        for (let x = 0; x < width; x++) {
            const index = 4 * (x + y * width);
            pixels[index + 0] = rgb[0];
            pixels[index + 1] = rgb[1];
            pixels[index + 2] = rgb[2];
            pixels[index + 3] = rgb[3];
        }
    }
    updatePixels();
}
