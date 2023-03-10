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



// Our main render shader
let myShader;
// Always use `preload` in p5 for any async functions that may take long
// to execute but are needed before program starts.
function preload() {
    myShader = loadShader('js/shaders/vshader.vert', 'js/shaders/fshader.frag');
}

function setup() {
    const cnsWO3=createCanvas(width, height, WEBGL);
    cnsWO3.parent("drawing-container-wo-4");
    // createCanvas(width, height, WEBGL);
    pixelDensity(1);


}




function draw() {
    // ------------------------wo2-----------------------
    clear()
    // background('rgb(0,0,0)')
    wc = color(255,255,255);
    layer=10
    tx1=0;
    ty1=-height/6;
    tx2=width/6;
    ty2=Math.floor((tx2-tx1)*Math.sqrt(3)+ty1);

    tx5=-width/2;
    tx6=width/12.5;
    ty6=(ty2-ty1)/2+ty1;



    // -----------------------shader------------------------
    // Set the active shader
    shader(myShader);
    // Send whichever information we want to pass to the shader
    // using uniforms
    myShader.setUniform('u_resolution', [width, height]);
    // myShader.setUniform('u_t6', [tx6+0.5, ty6+0.5]);
    myShader.setUniform('tx6', 3*width/5+tx6);
    myShader.setUniform('ty6', ty2);
    myShader.setUniform('u_time', rotation); // time in secs
    // Draw a full screen rectangle to apply the shader to
    strokeWeight(0)
    // var r=max(tx6, height-ty6);

    // translate(tx6+250,ty6)
    arc(0, 0, 0.5*width,  0.5*width, -Math.PI/5, -Math.PI/12 );
// rect(0,0,width,height)
    // console.log(`${width}x${height} FPS: ${Math.round(frameRate(), 0)}`);

    // -------------------from---wo2-------------------------
    // noFill();
    stroke(wc);
    strokeWeight(3)
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
    // console.log(tx1)
    // console.log(mouseX)

}

// function calcAngleDegrees(x, y) {
//     return Math.atan2(y, x) * 180 / Math.PI;
// }

// ----------------------wo2-------------------------
//
function drawTriangle(a,tx1,ty1,tx2,ty2,tx3,ty3,tx4,ty4,tx5,ty5,wc){
    // noFill();
    // stroke(wc);
    // strokeWeight(3)
    triangle(tx1,ty1,tx2,ty2,tx3,ty3);
    rotate(0.009*Math.sin(rotation*PI ));
    // console.log(0.002*Math.sin(rotation*PI ))
    line(tx4,ty4,tx5,ty5)
    strokeWeight(1)

    line(tx4,ty4,tx6-8,ty6-23)

}
