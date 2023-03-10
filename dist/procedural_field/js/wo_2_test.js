let tx1,tx2,tx3,ty1,ty2,ty3;
let tx4,ty4,tx5,ty5;
let tx6,ty6;
let wc;//white color for triangle
let width=900,height=900;
let layer;
let rotation=0;
const a0=15;
// let d;

// let d;
function setup() {
    const cns=createCanvas(width, height);
    cns.parent("drawing-container");
    pixelDensity(1);


}

function draw() {
    background('rgb(0,0,0)')
    wc = color(255,255,255);
    layer=10
    tx1=width/2;
    ty1=height/3;
    tx2=2*width/3;
    tx5=-100;
    tx6=width*(5/9)
    ty6=(ty2-ty1)/3+ty1;
    // paintCanvas(pixelHueGradient);
    // triangle(35, 100, 50, 100, 100, 50);
    // draw rainbow-----------------------------------------------------------------------------------
    // paintCanvas(tx6)
    // console.log(ty6)
    canvasHueGradientA(tx6-315,ty6-30,100*rotation, 360+100*rotation);

    for (let a=0;a<layer;a++){
        wc.setAlpha(255*(1-Math.tan(Math.PI*a/4/layer)));
        ty1=ty1+a;
        tx3=2*tx1-tx2;
        ty2=Math.floor((tx2-tx1)*Math.sqrt(3)+ty1);
        ty3=ty2;
        tx4=(tx1+tx3)/2;
        ty4=(ty2+ty1)/2;
        ty5=tx4*Math.tan(Math.PI*15/90)+ty1;
        drawTriangle(a,tx1,ty1,tx2,ty2,tx3,ty3,tx4,ty4,tx5,ty5,wc)
    }
    rotation+=0.03;

    // noLoop();
}

function drawTriangle(a,tx1,ty1,tx2,ty2,tx3,ty3,tx4,ty4,tx5,ty5,wc){

    noFill();
    stroke(wc);
    strokeWeight(3)
    triangle(tx1,ty1,tx2,ty2,tx3,ty3);
    rotate(0.002*Math.sin(rotation*PI ));
    // console.log(0.002*Math.sin(rotation*PI ))
    line(tx4,ty4,tx5,ty5)
    strokeWeight(1)

    line(tx4,ty4,tx6-8,ty6-23)

}

// --------------------------------------------------------

function canvasHueGradientA(tx6,ty6,hue0, hue1)
{
    loadPixels();
    for (let x = tx6; x < width; x++) {
        // Normalized coordinate in X axis
        for (let y = ty6; y < height; y++) {
            let aD=calcAngleDegrees(x-tx6,y-ty6)-a0;//angle difference
            if(aD>0 && aD<=25){
                    let na = aD/25;
                    const hue = hue0 + na * (hue1 - hue0);
                    const rgb = HSBToRGB([hue, 100, 100, 100]);
                    const index = 4 * (x + y * width);
                    // console.log(x,y)
                    pixels[index] = rgb[0];
                    pixels[index + 1] = rgb[1];
                    pixels[index + 2] = rgb[2];
                    pixels[index + 3] = rgb[3];
            }
        }
    }
    updatePixels();
}
function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}