let teapot;
let elt = document.getElementById('majiang-Container');
function preload() {
    // Load model with normalise parameter set to true
    teapot = loadModel('../img/zhong.obj', true);
}

function setup() {
    const mcvs=createCanvas(900, 900, WEBGL);
    mcvs.parent(elt);

    // describe('Vertically rotating 3-d teapot with red, green and blue gradient.');
}

function draw() {
    background(0);
    scale(0.1); // Scaled to make model fit into canvas
    rotateX(90);
    // rotateY(frameCount * 0.01);
    normalMaterial(); // For effect
    model(teapot);
}
// buttons
// copy
// reset
// edit
