let tx1,tx2,tx3,ty1,ty2,ty3;
let tx4,ty4,tx5,ty5,angleIn;
let tx6,ty6;
let wc;//white color for triangle
let width=screen.width,height=screen.height;
let layer;
let zoff=0;

let cl0,cl00,cl1,cl2,cl3,cl4,cl5,cl6,cl7; //颜色

let d;
function setup() {
    const cns=createCanvas(width, height);
    cns.parent("drawing-container");
    d = pixelDensity();
    background('rgb(250,250,250)')

    // pixelDensity(1);
}

function draw() {


    //试色
    // background('rgb(176,229,212)')
    // background('rgb(66,112,98)')
    // background('rgb(54,129,133)')
    // background('rgb(54,129,133)')
    // background('rgb(12,32,42)')
    // background('rgb(112,200,201)')
    // background('rgb(147,139,104)')
    // background('rgb(31,22,56)')
    // background('rgb(54,129,133)')
    // background('rgb(106,119,101)')
    //
    //真正的bsckground
    // background('rgb(218,214,201)')
    // background('rgb(250,250,250)')
    //

    // set color-----------------------------------------------------------------------------------
    cl0=color(0,0,0); //浅绿
    cl00=color(255,255,255); //浅绿

    cl1=color(176,229,212); //浅绿
    cl2= color(66,112,98); //深绿
    cl3=color(54,129,133);
    cl4=color(12,32,42);
    cl5=color(112,200,201);
    cl6=color(147,139,104);
    cl6=color(31,22,56);
    // cl7=color(245,199,157);
    cl7=color(106,119,101)
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

    // paintCanvas(pixelGBGradient);
    // text(frameCount, 10, height - 10);
    zoff+=0.0019
    // mountainLine(PI,2, zoff, 25, 150, 0.01, 300,height ,0.9,cl2,5)
    // mountainLine(PI,3, 1.05*zoff, 25, 550, 0.008, 500,height,0.75,cl3 ,3)
    // stroke('none');
        mountainLine (PI , 2 , 1.05 * zoff , 125 , 500 , mouseY , 0.008 , -50 , height , 0.75 , cl0 ,cl1, 3)

    // fill(cl00);
    // if(frameCount%2==0){
    //     circle(mouseX, mouseY, Math.sin(zoff)*3);//
    // }
    // mountain(3, 1.05*zoff, 25, 150, 0.008, 300,height/3,0.75,cl4 ,1)

    // noLoop();

}


function mountainLine(angle,noiseMax, zoff, minR, maxR,mouse, inc, px,py,rd, fillC,strokeC, layers){
    // strokeC.setAlpha(1)
    noFill();
    // fill(fillC,
    //     100,
    //     100,
    //     1);
    stroke(strokeC)
    // for(let i = layers; i > 0; i--) {
    //     // strokeC.setAlpha(15)
    //     stroke(
    //         strokeC,
    //         // 100,
    //         // 100,
    //         // 3
    //     );
        // strokeWeight(i*Math.sin(0.5*Math.PI*mouse/height));
        beginShape();

        for (let a = 0; a <= angle; a += inc) {
        let xoff = map(cos(a+rd), -1, 1, 0, noiseMax);
        let yoff = map(sin(a), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, zoff), 0, 1, minR, maxR);
        let x = 2*r * Math.cos(a);
        let y = 3*r * Math.sin(a)*Math.sin(Math.log(2+mouse/height));

        // line(px,py,2*x+px,-y+py)
        vertex(2*x+px, py+3-y);
    }
        endShape(CLOSE);
    // }
};
//
// function mountain(noiseMax, zoff, minR, maxR, inc, px,py,rd, fillC, layers){
//     // fillC.setAlpha(251)
//     // // noFill();
//     fill(fillC,
//         100,
//         100,
//         1);
//     // stroke(cl7)
//     for(let i = layers; i > 0; i--) {
//         // strokeC.setAlpha(15)
//         stroke(
//             cl7,
//             100,
//             100,
//             3
//         );
//         strokeWeight(i);
//         beginShape();
//
//         for (let a = 0; a <= PI; a += inc) {
//             let xoff = map(cos(a+rd), -1, 1, 0, noiseMax+i/6);
//             let yoff = map(sin(a), -1, 1, 0, noiseMax+i/6);
//             let r = map(noise(xoff, yoff, zoff), 0, 1, minR*(i+1)/6, maxR*(i+2)/6);
//             let x = 2*r * Math.cos(a);
//             let y = 3*r * Math.sin(a);
//             // line(px,py,2*x+px,-y+py)
//             vertex(2*x+px, py-y);
//         }
//         endShape(CLOSE);
//     }
// };



/**
 * Fills the canvas with vertical wave stripes.
 * @param {Number} sizeX
 */
// function canvasWaveV(sizeX)
// {
//     loadPixels();
//     for (let x = 0; x < width; x++) {
//         // const gray = 255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * x / 200));
//         let chosenColor;
//         for (let y = 0; y < 100*Math.sin(0.01*x); y++) {
//             const index = 4 * (x + y * width);
//             chosenColor=strokeC
//             // if(Math.random()/Math.log10(10+y)>0.5){
//             //      chosenColor=fillC;
//             // }else{
//             //      chosenColor=strokeC;
//             // };
//
//
//             pixels[index + 0] = red(chosenColor);
//             pixels[index + 1] = green(chosenColor);
//             pixels[index + 2] = blue(chosenColor);
//             pixels[index + 3] = 255/Math.log10(10+y);
//         }
//     }
//     updatePixels();
// }

