
let tx1,tx2,tx3,ty1,ty2,ty3;
// let tx4,ty4,tx5,ty5,angleIn;
// let tx6,ty6;
let wc;//white color for triangle
let width=screen.width,height=screen.height;
let layer;
let zoff=0;

let cl0; //颜色

let d;
function setup() {
    const cns=createCanvas(width, height);
    cns.parent("drawing-container");




    background('rgb(250,250,250)')

    // pixelDensity(1);
}

function draw() {

    clear();



    // set color-----------------------------------------------------------------------------------
    cl0=color(0,0,0);
    zoff+=0.0019
    mountainLine (PI , 2 , 1.05 * zoff , 125 , 500 ,mouseX, mouseY , 0.008 , -50 , height , 0.75 , cl0 ,cl0, 3)
    // mouse cursor
    strokeWeight(0.3);
    stroke(0, 0, 0);
    setLineDash([2,5])
    line(mouseX-2000, mouseY,mouseX+2000,mouseY)
    line(mouseX, mouseY+2000,mouseX,mouseY-2000);
    setLineDash([0])
    strokeWeight(0.75);

    rect(mouseX-4,mouseY-4,8,8)

}


function mountainLine(angle,noiseMax, zoff, minR, maxR,mouseX,mouseY, inc, px,py,rd, fillC,strokeC, layers){
    noFill();
    strokeWeight(0.1)
    stroke(strokeC)
    beginShape();
    for (let a = 0; a <= angle; a += inc) {
        let xoff = map(cos(a+rd), -1, 1, 0, noiseMax);
        let yoff = map(sin(a), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, zoff), 0, 1, minR, maxR);
        let x = 2*r * Math.cos(a);
        let y = 3*r * Math.sin(a)*Math.sin(Math.log(2+mouseY/height));
        vertex(2*x+px, py+3-y);
    }
    endShape(CLOSE);
};

function setLineDash(list) {
    drawingContext.setLineDash(list);
};

