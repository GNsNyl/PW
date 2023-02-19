let tx1,tx2,tx3,ty1,ty2,ty3;
let tx4,ty4,tx5,ty5,angleIn;
let tx6,ty6;
let wc;//white color for triangle
let width=900,height=900;
let layer;
let zoff=0;

let cl1,cl2,cl3,cl4,cl5,cl6,cl7; //颜色

// let d;
function setup() {
    const cns=createCanvas(width, height);
    cns.parent("drawing-container");
    // d = pixelDensity()
    pixelDensity(1);
}

function draw() {
    //试色
    background('rgb(176,229,212)')
    background('rgb(66,112,98)')
    background('rgb(54,129,133)')
    background('rgb(54,129,133)')
    background('rgb(12,32,42)')
    background('rgb(112,200,201)')
    background('rgb(147,139,104)')
    background('rgb(31,22,56)')
    background('rgb(54,129,133)')
    background('rgb(245,199,157)')

    //真正的bsckground
    background('rgb(218,214,201)')


    // set color-----------------------------------------------------------------------------------

    cl1=color(176,229,212); //浅绿
    cl2= color(66,112,98); //深绿
    cl3=color(54,129,133);
    cl4=color(12,32,42);
    cl5=color(112,200,201);
    cl6=color(147,139,104);
    cl6=color(31,22,56);
    cl7=color(245,199,157);
    // draw rainbow-----------------------------------------------------------------------------------


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

    // console.log(tx6)

    // paintCanvas(pixelGBGradient);
    // text(frameCount, 10, height - 10);
    noLoop();
    zoff+=0.0007
    mountain(2, zoff, 25, 100, 0.1, 300,300 ,0.9,cl4,cl2)
    mountain(5, 1.05*zoff, 25, 250, 0.08, 200,500,0.75,cl5,cl3 )

}
function mountain(noiseMax, zoff, minR, maxR, inc, px,py,rd,fillC, strokeC){

    loadPixels();
    for (let x = 0; x < width; x++) {
        const gray = 255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * x / 200));

        for (let y = 0; y < height; y++) {
            const index = 4 * (x + y * width);
            pixels[index + 0] = gray;
            pixels[index + 1] = gray;
            pixels[index + 2] = gray;
            pixels[index + 3] = 255;
        }
    }
    updatePixels();


    translate(px, py);

    beginShape();
    // noFill();
    fill(fillC);
    stroke(strokeC)
    for (let a = 0; a <= PI; a += inc) {
        let xoff = map(cos(a+rd), -1, 1, 0, noiseMax);
        let yoff = map(sin(a), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, zoff), 0, 1, minR, maxR);
        let x = 2*r * Math.cos(a);
        let y = 3*r * Math.sin(a);

        // line(0,0,x,-y)
        vertex(2*x, -y);
    }
    endShape(CLOSE);

};

// function mountain(noiseMax, zoff, minR, maxR, inc, px,py,rd,fillC, strokeC){
//
//     translate(px, py);
//
//     beginShape();
//     // noFill();
//     fill(fillC);
//     stroke(strokeC)
//     for (let a = 0; a <= PI; a += inc) {
//         let xoff = map(cos(a+rd), -1, 1, 0, noiseMax);
//         let yoff = map(sin(a), -1, 1, 0, noiseMax);
//         let r = map(noise(xoff, yoff, zoff), 0, 1, minR, maxR);
//         let x = 2*r * Math.cos(a);
//         let y = 3*r * Math.sin(a);
//
//         // line(0,0,x,-y)
//         vertex(2*x, -y);
//     }
//     endShape(CLOSE);
//
// };


/**
 * Fills the canvas with vertical wave stripes.
 * @param {Number} sizeX
 */
function canvasWaveV(sizeX)
{
    loadPixels();
    for (let x = 0; x < width; x++) {
        // Compute gray value for X
        // https://graphtoy.com/?f1(x,t)=255%20*%20(0.5%20+%200.5%20*cos(%F0%9D%9C%8F*x%20/%20100))&v1=true&grid=1&coords=67.69140044604674,117.41494066648303,245.41327097380992
        const gray = 255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * x / sizeX));

        for (let y = 0; y < height; y++) {
            const index = 4 * (x + y * width);
            pixels[index + 0] = gray;
            pixels[index + 1] = gray;
            pixels[index + 2] = gray;
            pixels[index + 3] = 255;
        }
    }
    updatePixels();
}

