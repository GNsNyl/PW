let tx1,tx2,tx3,ty1,ty2,ty3;
let tx4,ty4,tx5,ty5,angleIn;
let tx6,ty6;
let wc;//white color for triangle
let width=900,height=900;
let layer;
let rotation=0;
// let d;
function setup() {
    const cns=createCanvas(width, height);
    cns.parent("drawing-container");
    // d = pixelDensity()
    pixelDensity(1);
    // wc = color(255,255,255);
    // layer=10
    // tx1=width/2;
    // ty1=height/3;
    // tx2=2*width/3;
    // tx5=0;
    // tx6=3*width/5;
    // ty6=3*height/5
    // angleIn=0.2;

}

function draw() {
    background('rgb(0,1,0)')
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
    paintCanvas(tx6,ty6)

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

    };

    // console.log(tx6)

    // paintCanvas(pixelGBGradient);
    // text(frameCount, 10, height - 10);
    // noLoop();
    rotation+=0.01
}

function drawTriangle(a,tx1,ty1,tx2,ty2,tx3,ty3,tx4,ty4,tx5,ty5,wc){
    // tx3=2*tx1-tx2;
    // ty2=Math.floor((tx2-tx1)*Math.sqrt(3)+ty1);
    // ty3=ty2;
    // tx4=tx3+2*(tx1-tx3)/3;
    // ty4=1*(ty2-ty1)/3+ty1;
    // ty5=tx4*Math.tan(Math.PI*13/90)+ty1;



    // loadPixels();
    // // let x;
    // // let a=0.03;
    // for (let ty=ty1;ty<ty1+30; ty++){
    //     // let cl= color('rgb(255, 255, 255)');
    //     // cl.setAlpha(1-(ty-ty1)/30)
    //
    //     for (let y = ty; y < ty3; y++) {
    //        var x = Math.floor((y-ty1)/Math.sqrt(3)+tx1);
    //        console.log(x)
    //             // Compute pixel color using given function
    //             // Apply color to canvas pixels
    //             const index = 4 * (x + y *900 );
    //             pixels[index + 0] = 255;
    //             pixels[index + 1] = 255;
    //             pixels[index + 2] = 255;
    //             pixels[index + 3] = [1-(ty-ty1)/30];
    //     }
    // }
    // updatePixels();

    noFill();
    stroke(wc);
    strokeWeight(3)
    triangle(tx1,ty1,tx2,ty2,tx3,ty3);
    rotate(0.006*Math.sin(rotation*PI ));

    line(tx4,ty4,tx5,ty5)
    strokeWeight(1)

    line(tx4,ty4,tx6-8,ty6-23)

};

function paintCanvas(tx6,ty6)
{
    // console.log('run')

    const time = millis();  // try instead calculating millis() on the fly when calling the pixelFunction!
    loadPixels();
    for (let ag = 0; ag < 256; ag++) {
        // console.log(((ag/256)*5+3)/16)
        var angle=Math.PI*((ag/255)*5+2)/29;
        const remainder=4*width/9;
        // console.log(remainder)

        for (let x = tx6-5; x < width; x++) {
            // Normalized coordinate in X axis
            var nx = (x+5-tx6) /remainder;
            // console.log(nx)
            var y = 379+Math.floor((x+5-tx6)*Math.tan(angle));
            // Compute pixel color using given function
            const rgba = pixelGBGradient(ag, nx, time, frameCount);

            // Apply color to canvas pixels
            const index = 4 * (x + y * width);
            pixels[index + 0] = rgba[0];
            pixels[index + 1] = rgba[1];
            pixels[index + 2] = rgba[2];
            pixels[index + 3] = rgba[3];
        }
    }
    updatePixels();
}

function pixelGBGradient(ag, nx, time, frame) {
    const red = frame % 256;
    const green = 255 * ag/255;
    const blue = Math.floor(255 * nx);
    const alpha = 255;
// console.log(blue)
    return [red, green, blue, alpha];
}
