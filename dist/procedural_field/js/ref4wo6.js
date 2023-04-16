// Variables for source images and manipulated ones.
let src, img;
let srclsb, imglsb;

const bit = 0;

// Heavy assets should be loaded inside `preload()`
// to make sure they are fully available before the sketch starts.
// Also, make sure you are running this sketch on a local server
// to avoid problems due to cross-origin requests (CORS).
function preload() {
    src = loadImage("assets/jlx-512px.png");
}

// Run once before start.
// Most static image heavy-lifting should go here.
function setup() {
    // Create a fullscreen canvas
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    // Optionally, convert input to BW
    // src = imageToBW(src);

    // Extract least significant bit from red channel.
    srclsb = extractBit(src, 'r', bit);

    // Remove the least significant bit of each channel.
    // The effect is visually impossible to discern.
    img = removeBit(src, 'r', bit);
    img = removeBit(img, 'g', bit);
    img = removeBit(img, 'b', bit);

    // But can be extracted as information:
    imglsb = extractBit(img, 'r', bit);
}

// Run every frame
function draw() {
    background(127);

    // Display original image with original size
    image(src, 10, 10);
    text("Original", 10, 10);

    // Display modified image
    image(img, 20 + src.width, 10);
    text("Modified: No LSB", 20 + src.width, 10);

    // Display LSB before modification
    image(srclsb, 10, 20 + src.height);
    text("Original Red LSB", 10, 20 + src.height);

    // Display LSB channel
    image(imglsb, 20 + src.width, 20 + src.height);
    text("Modified Red LSB", 20 + src.width, 20 + src.height);
}





// Save the image when key pressed
function keyPressed() {
    if (key == 's' || key == 'S') {
        saveCanvas('frame_' + frameCount, 'png');
        img.save("processed-image.png");
    }
}

// Proper canvas resizing
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}