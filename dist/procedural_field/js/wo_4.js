/*
 * @name Applying Shaders as Textures
 * @description Shaders can be applied to 2D/3D shapes as textures.
 * To learn more about shaders and p5.js: https://itp-xstory.github.io/p5js-shaders/
 */

let theShader;
let shaderTexture;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;

// from previous wo2js
let tx1,tx2,tx3,ty1,ty2,ty3;
let tx4,ty4,tx5,ty5;
let tx6,ty6;
let wc;//white color for triangle
let width=900,height=900;
let layer;
let rotation=0;
const a0=Math.PI/12;
// const time=millis();



function preload(){
    // load the shader
    theShader = loadShader('js/shaders/vshader.vert','js/shaders/fshader.frag');
}

function setup() {
    // disables scaling for retina screens which can create inconsistent scaling between displays
    //pixelDensity(1);
    // shaders require WEBGL mode to work
    // createCanvas(800, 800, WEBGL);
    const cnsWO3=createCanvas(width, height, WEBGL);
    cnsWO3.parent("drawing-container-wo-4");
    noStroke();

    // initialize the createGraphics layers
    shaderTexture = createGraphics(800, 800, WEBGL);

    // turn off the createGraphics layers stroke
    shaderTexture.noStroke();

    x = -50;
    y = 0;
}

function draw() {
    // wc = color(255,255,255);
    // layer=10
    // tx1=0;
    // ty1=-height/6;
    // tx2=width/6;
    // ty2=Math.floor((tx2-tx1)*Math.sqrt(3)+ty1);
    //
    // tx5=-width/2;
    // tx6=width/12.5;
    // ty6=(ty2-ty1)/2+ty1;
    //

    push();
    wc = color(255,255,255);
    layer=10
    tx1=0;
    ty1=-height/6;
    tx2=width/6;
    ty2=Math.floor((tx2-tx1)*Math.sqrt(3)+ty1);

    tx5=-width/2;
    tx6=width/12.5;
    ty6=(ty2-ty1)/2+ty1;


    // instead of just setting the active shader we are passing it to the createGraphics layer
    shaderTexture.shader(theShader);

    // here we're using setUniform() to send our uniform values to the shader
    theShader.setUniform("u_resolution", [width, height]);
    theShader.setUniform("u_time", millis() / 1000.0);
    theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
    theShader.setUniform('tx6', 3*tx6);
    theShader.setUniform('ty6', ty6-23);
    // passing the shaderTexture layer geometry to render on
    shaderTexture.rect(0,0,width,height);

    background(0);

    //pass the shader as a texture
    texture(shaderTexture);

    translate(-150, 0, 0);
    // push();
    // rotateZ(theta * mouseX * 0.0001);
    // rotateX(theta * mouseX * 0.0001);
    // rotateY(theta * mouseX * 0.0001);
    // theta += 0.05;
    // sphere(125);
    // pop();

    /* when you put a texture or shader on an ellipse it is rendered in 3d,
       so a fifth parameter that controls the # vertices in it becomes necessary,
       or else you'll have sharp corners. setting it to 100 is smooth. */
    let ellipseFidelity = int(map(mouseX, 0, width, 8, 100));
    // ellipse(260, 0, 200, 200, ellipseFidelity);
    arc(3*tx6, ty6-23, height, height, Math.PI/12,Math.PI/6);
    pop();



    for (let a=0;a<layer;a++){
        wc.setAlpha(255*(1-Math.tan(Math.PI*a/4/layer)));
        ty1=ty1+a;
        tx3=2*tx1-tx2;
        ty2=Math.floor((tx2-tx1)*Math.sqrt(3)+ty1);
        ty3=ty2;
        tx4=(tx1+tx3)/2;
        ty4=(ty2+ty1)/2;
        ty5=height/3+tx4*Math.tan(Math.PI*15/90)+ty1;
        drawTriangle(12*rotation,tx1,ty1,tx2,ty2,tx3,ty3,tx4,ty4,tx5,ty5,wc)
    }
    rotation+=0.003;
    // fill("#ffffff")
    // rect(0,0,100,100)
//

}


function drawTriangle(a,tx1,ty1,tx2,ty2,tx3,ty3,tx4,ty4,tx5,ty5,wc){
    // push();
    noFill();
    stroke(wc);
    strokeWeight(3)
    triangle(tx1,ty1,tx2,ty2,tx3,ty3);
    rotate(0.009*Math.sin(rotation*PI ));
    // console.log(0.002*Math.sin(rotation*PI ))
    line(tx4,ty4,tx5,ty5)
    strokeWeight(1)

    line(tx4,ty4,tx6-8,ty6-23)
    // pop();
}

