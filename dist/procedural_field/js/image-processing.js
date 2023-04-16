// ██████╗  █████╗ ████████╗ █████╗ 
// ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ██║  ██║███████║   ██║   ███████║
// ██║  ██║██╔══██║   ██║   ██╔══██║
// ██████╔╝██║  ██║   ██║   ██║  ██║
// ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
//                                  

/**
 * An map of letters to channel ids.
 */
const CHANNEL_ID = {
  'r': 0,
  'R': 0,
  'g': 1,
  'G': 1,
  'b': 2,
  'B': 2,
  'a': 3,
  'A': 3
};

/**
 * An object containing different 3x3 convolution kernels 
 * as 1-dimensional arrays.
 */
const KERNELS = {
  'identity':
      [0, 0, 0,
       0, 1, 0,
       0, 0, 0],

  'horizontalEdge':
      [-1, -1, -1,
        0,  0,  0,
        1,  1,  1],

  'verticalEdge':
      [-1, 0, 1,
       -1, 0, 1,
       -1, 0, 1],

  'edge':
      [ 0, -1,  0,
       -1,  4, -1,
        0, -1,  0],

  'edgeStrong':
      [-1, -1, -1,
       -1,  8, -1,
       -1, -1, -1],

  'sharpen':
      [ 0, -1,  0,
       -1,  5, -1,
        0, -1,  0],

  'emboss':
      [-2, -1, 0,
       -1,  1, 1,
        0,  1, 2],

  'boxBlur':
      [ 1 / 9, 1 / 9, 1 / 9,
        1 / 9, 1 / 9, 1 / 9,
        1 / 9, 1 / 9, 1 / 9],

  'gaussianBlur':
      [ 1 / 16, 2 / 16, 1 / 16,
        2 / 16, 4 / 16, 2 / 16,
        1 / 16, 2 / 16, 1 / 16]
};



//  ██████╗██╗      ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║     ██╔═══██╗████╗  ██║██╔════╝
// ██║     ██║     ██║   ██║██╔██╗ ██║█████╗  
// ██║     ██║     ██║   ██║██║╚██╗██║██╔══╝  
// ╚██████╗███████╗╚██████╔╝██║ ╚████║███████╗
//  ╚═════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//                                            

/**
 * Returns a deep copy of the input image.
 * @param {p5.Image} src 
 * @returns 
 */
function cloneImage(src) {
  // Make sure that the input image has the pixels updated
  src.loadPixels();

  // Initialize image
  let img = createImage(src.width, src.width);
  img.loadPixels();
  
  // Iterate over all the bytes in the pixel array.
  let totalPixels = 4 * img.width * img.height;
  for (let i = 0; i < totalPixels; i++) {
    // Copy pixel values one by one
    img.pixels[i] = src.pixels[i];
  }

  img.updatePixels();
  return img;
}

/**
 * Returns the selected image channel as a grayscale image.
 * @param {p5.Image} src 
 * @param {String} channelLetter 
 * @returns 
 */
function extractChannel(src, channelLetter) {
  // Make sure that the input image has the pixels updated
  src.loadPixels();

  // Initialize image
  let img = createImage(src.width, src.width);
  img.loadPixels();
  
  // Which channel to extract?
  const ch = CHANNEL_ID[channelLetter];
  
  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  let totalPixels = 4 * img.width * img.height;
  for (let i = 0; i < totalPixels; i += 4) {
    // Copy pixel values from the corresponding channel
    img.pixels[i] = src.pixels[i + ch];
    img.pixels[i + 1] = src.pixels[i + ch];
    img.pixels[i + 2] = src.pixels[i + ch];
    img.pixels[i + 3] = 255;  // force full opacity
  }

  img.updatePixels();
  return img;
}



//  ██████╗ ██████╗ ██╗      ██████╗ ██████╗ 
// ██╔════╝██╔═══██╗██║     ██╔═══██╗██╔══██╗
// ██║     ██║   ██║██║     ██║   ██║██████╔╝
// ██║     ██║   ██║██║     ██║   ██║██╔══██╗
// ╚██████╗╚██████╔╝███████╗╚██████╔╝██║  ██║
//  ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝
//                                           
//  ██████╗ ██████╗ ██████╗ ██████╗ 
// ██╔════╝██╔═══██╗██╔══██╗██╔══██╗
// ██║     ██║   ██║██████╔╝██████╔╝
// ██║     ██║   ██║██╔══██╗██╔══██╗
// ╚██████╗╚██████╔╝██║  ██║██║  ██║
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
//                                  

/**
 * Returns the input image converted to black and white.
 * @param {p5.Image} src 
 * @param {String} method 
 * @returns 
 */
function imageToBW(src, method) {
  // Make sure that the input image has the pixels updated
  src.loadPixels();

  // Initialize image
  let img = createImage(src.width, src.width);
  img.loadPixels();
  
  // Create some temp variables for calculations
  let r, g, b, a, gray;
  let totalPixels = 4 * img.width * img.height;

  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  for (let i = 0; i < totalPixels; i += 4) {
    // Retrieve source rgbs
    r = src.pixels[i];       // red
    g = src.pixels[i + 1];   // green
    b = src.pixels[i + 2];   // blue
    a = src.pixels[i + 3];   // alpha

    // Compute gray value
    switch (method) {
      case 'luma':
      case 'LUMA':
        // Compute chromatic-aware average
        // See https://en.wikipedia.org/wiki/Luma_(video)
        gray = 0.299 * r + 0.587 * g + 0.114 * b;
        break;

      default:
        // Compute simple average
        gray = 0.333 * r + 0.334 * g + 0.333 * b;
    }

    // Apply to new image
    img.pixels[i] = gray;       // red
    img.pixels[i + 1] = gray;   // green
    img.pixels[i + 2] = gray;   // blue
    img.pixels[i + 3] = a;      // alpha
  }

  img.updatePixels();
  return img;
}

/**
 * Returns an new image downsampled to `levels` per channel.
 * Uses fast pixel array access.
 * @param {p5.Image} src 
 * @param {Number} levels 
 * @returns 
 */
function posterizeImage(src, levels) {
  // Compute input src params
  src.loadPixels();
  let totalPixels = 4 * src.width * src.height;

  // Create an empty image
  let img = createImage(src.width, src.height);
  img.loadPixels();

  // Go over all pixels
  let r, g, b, a;
  for (let i = 0; i < totalPixels; i += 4) {
    // Retrieve source rgbs
    r = src.pixels[i];       // red
    g = src.pixels[i + 1];   // green
    b = src.pixels[i + 2];   // blue
    a = src.pixels[i + 3];   // alpha

    // Compute closest level threshold
    r = closestStep(r, 255, levels);
    g = closestStep(g, 255, levels);
    b = closestStep(b, 255, levels);

    // Apply to new image
    img.pixels[i] = r;       // red
    img.pixels[i + 1] = g;   // green
    img.pixels[i + 2] = b;   // blue
    img.pixels[i + 3] = a;   // alpha (unchanged)
  }

  // Update modified pixels and return image
  img.updatePixels();
  return img;
}



/**
 * Applies a convolution kernel to an image. 
 * @param {p5.Image} src 
 * @param {Array} kernel 
 * @returns 
 */
function convoluteFilter(src, kernel) {
  // Sanity: this algorithm will only work if the kernel has 9 values (3x3)
  if (kernel.length != 9) {
    return null;
  }

  // Let's create a new empty image to set pixels to
  let img = createImage(src.width, src.height);
  img.loadPixels();

  // Load the pixels from the input image
  src.loadPixels();

  // Define temp variables for the colors of the 3x3 pixel region
  let c = [], ids = [];
  let con, id, index;

  // Iterate over all the pixels (minus the boundary ones)
  for (let x = 1; x < src.width - 1; x++) {
    for (let y = 1; y < src.height - 1; y++) {
      index = 4 * (x + y * src.width);

      // Find the ids of the nine pixels in the convolution
      ids[0] = 4 * ( (x - 1) + (y - 1) * src.width );  // top-left 
      ids[1] = 4 * ( (x    ) + (y - 1) * src.width );  // top 
      ids[2] = 4 * ( (x + 1) + (y - 1) * src.width );  // top-right
      ids[3] = 4 * ( (x - 1) + (y    ) * src.width );  // left
      ids[4] = 4 * ( (x    ) + (y    ) * src.width );  // center
      ids[5] = 4 * ( (x + 1) + (y    ) * src.width );  // right
      ids[6] = 4 * ( (x - 1) + (y + 1) * src.width );  // bottom-left
      ids[7] = 4 * ( (x    ) + (y + 1) * src.width );  // bottom
      ids[8] = 4 * ( (x + 1) + (y + 1) * src.width );  // bottom-right

      // For each of those ids, get the color
      for (let i = 0; i < ids.length; i++) {
        id = ids[i];
        c[i] = [ src.pixels[id], src.pixels[id + 1], src.pixels[id + 2], src.pixels[id + 3] ];
      }

      // Compute the convoluted value of this pixel for each channel
      con = [0, 0, 0, 255];
      for (let channel = 0; channel < 3; channel++) {
        for (let i = 0; i < c.length; i++) {
          con[channel] += kernel[i] * c[i][channel];
        }
      }

      // Set this gray value on the new image
      id = ids[4];  // center pixel id
      img.pixels[id] = con[0];
      img.pixels[id + 1] = con[1];
      img.pixels[id + 2] = con[2];
      img.pixels[id + 3] = con[3];
    }
  }

  // Update pixels and return image
  img.updatePixels();
  return img;
}



/**
 * Applies Floyd-Steinberg dithering to an image, 
 * using threshold levels per channel.
 * See https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering
 * @param {p5.Image} src 
 * @param {Number} levels 
 * @returns 
 */
function dither(src, levels) {
  // Make a copy of the source image, to avoid modifying it.
  const clone = cloneImage(src);

  // Create an empty image
  let img = createImage(clone.width, clone.height);
  img.loadPixels();
  const totalPixels = 4 * img.width * img.height;

  // Go over all pixels
  let id, r, g, b, a, rT, gT, bT, errR, errG, errB, q;
  for (let i = 0; i < totalPixels; i += 4) {
    // Retrieve pixel color as [R, G, B, A]
    id = i;
    r = clone.pixels[id]; 
    g = clone.pixels[id + 1]; 
    b = clone.pixels[id + 2]; 
    a = clone.pixels[id + 3]; 

    // Compute closest level threshold
    rT = closestStep(r, 255, levels);
    gT = closestStep(g, 255, levels);
    bT = closestStep(b, 255, levels);

    // Assign new thresholded color to image
    img.pixels[i] = rT;
    img.pixels[i + 1] = gT;
    img.pixels[i + 2] = bT;
    img.pixels[i + 3] = a;  // maintain same alpha

    // Compute thresholding error per channel
    errR = r - rT;
    errG = g - gT;
    errB = b - bT;

    // Distribute error to neighbors on **source** image
    // for further computation in future iterations.
    // RIGHT
    id = i + 4;
    q = 7 / 16;
    clone.pixels[id]     += q * errR;
    clone.pixels[id + 1] += q * errG;
    clone.pixels[id + 2] += q * errB;

    // BOTTOM-LEFT
    id = i + 4 * (clone.width - 1);
    q = 3 / 16;
    clone.pixels[id]     += q * errR;
    clone.pixels[id + 1] += q * errG;
    clone.pixels[id + 2] += q * errB;

    // BOTTOM
    id = i + 4 * clone.width;
    q = 5 / 16;
    clone.pixels[id]     += q * errR;
    clone.pixels[id + 1] += q * errG;
    clone.pixels[id + 2] += q * errB;

    // BOTTOM-RIGHT
    id = i + 4 * (clone.width + 1);
    q = 1 / 16;
    clone.pixels[id]     += q * errR;
    clone.pixels[id + 1] += q * errG;
    clone.pixels[id + 2] += q * errB;
  }

  // Update modified pixels and return image
  img.updatePixels();
  return img;
}



/**
 * Returns a BW image representing the pixels that have given `bit`
 * active in given channel.
 * @param {p5.Image} src Input image
 * @param {String} channelLetter A letter indicating the channel to extract
 * @param {Number} bit A 0-7 number indicating the bit to extract
 * @returns 
 */
function extractBit(src, channelLetter, bit) {
  // Figure out number of channel to parse.
  const ch = CHANNEL_ID[channelLetter];

  // Compute the decimal value equivalent to only that bit on.
  // E.g: bit 6 = 0100 0000 = 2^6 = DEC 64 
  // When used for bitwise operations, this is typically referred to as a 'mask' 
  // const mask = Math.pow(2, bit);
  const mask = 1 << bit;  // same result as above, using bitwise operators

  // Compute input src params
  src.loadPixels();
  const totalPixels = 4 * src.width * src.height;

  // Create an empty image
  let bitImg = createImage(src.width, src.height);
  bitImg.loadPixels();

  // Go over all pixels
  let c, bAnd, gray;
  for (let i = 0; i < totalPixels; i += 4) {
    // Retrieve channel value
    c = src.pixels[i + ch];

    // Bitwise AND operator! (not to be confused with AND comparison &&)
    // This operation takes the two values and performs 
    // the boolean AND operation for each bit of its binary digits.
    // For example:
    //    1101 0010  (DEC 210)
    //  & 1000 0000  (DEC 128)
    //  -----------
    //  = 1000 0000  (DEC 128)
    //
    // Or:
    //    0101 1011  (DEC 91)
    //  & 0010 0000  (DEC 32)
    //  -----------
    //  = 0000 0000  (DEC 0)
    bAnd = c & mask;

    // If the bit was present, the bitwise AND operation
    // will return the same byte itself:
    if (bAnd == mask) {
      gray = 255;
    }
    else {
      gray = 0;
    }

    // Set this pixel on/off
    bitImg.pixels[i] = gray;
    bitImg.pixels[i + 1] = gray;
    bitImg.pixels[i + 2] = gray;
    bitImg.pixels[i + 3] = 255;
  }

  // Update modified pixels and return image
  bitImg.updatePixels();
  return bitImg;
}

/**
 * Returns a new image with the all data from 
 * input bit removed from input channel.
 * @param {p5.Image} src Input image
 * @param {String} channelLetter A letter indicating the channel to extract
 * @param {Number} bit A 0-7 number indicating the bit to extract
 * @returns 
 */
function removeBit(src, channelLetter, bit) {
  // Figure out number of channel to parse.
  const ch = CHANNEL_ID[channelLetter];

  // Compute the decimal value equivalent to only that bit on.
  // E.g: bit 6 == 0100 0000 == 2^6 == DEC 64 
  // When used for bitwise operations, this is typically referred to as a 'mask' 
  // const byte = Math.pow(2, bit);
  const byte = 1 << bit;  // same result as above, using bitwise operators

  // The mask that we will use will actually be the opposite
  // binary digits, so we use the bitwise NOT operator ~
  // (not to be confused with NOT boolean operator !)
  // E.g: ~0100 0000 == 1011 1111
  // See below for more
  const mask = ~byte;

  // Compute input src params
  src.loadPixels();
  const totalPixels = 4 * src.width * src.height;

  // Create a copy of the image
  let img = cloneImage(src);

  // Go over only the color values for the selected channel
  let c, off;
  for (let i = ch; i < totalPixels; i += 4) {
    // Retrieve channel value
    c = src.pixels[i];

    // The goal is to keep all the information in the byte,
    // except for the bit we want to remove. This can be done
    // with a bitwise AND on the opposite of the selected bit:
    // For example:
    //    1101 0010  (DEC 210)
    //  & 1011 1111  (DEC 191, or ~64: all bits 1's except bit 6)
    //  -----------
    //  = 1001 0010  (DEC 146, all 0/1s are the same as 210 except bit 6)
    off = c & mask;

    // Change only the specified bit, other channels stay the same
    img.pixels[i] = off;
  }

  // Update modified pixels and return image
  img.updatePixels();
  return img;
}