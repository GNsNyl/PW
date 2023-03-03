let tx1,tx2,tx3,ty1,ty2,ty3;
let tx4,ty4,tx5,ty5,angleIn;
let tx6,ty6;
let wc;//white color for triangle
let width=900,height=900;
let layer;
let rotation=0;
let roofx=[];
let roofy=[]
var offset = 0;
var strum = 1;
// let d;
function setup() {
    const cns=createCanvas(width, height);
    cns.parent("arch-container");
    pixelDensity(1);

    for(let x = 0; x < width; x++){
        //var angle = map(x, 0, width, 0, TWO_PI);
        var angle = offset + x * 0.02;
        // map x between 0 and width to 0 and Two Pi
        var y = map(sin(angle), -strum, strum, 150, 250);
        roofx.push(x)
        roofy.push(y)
    }
}

function draw() {
    clear()

    // background('rgb(0,1,0)')
    wc = color(0,0,0);

    // draw rainbow-----------------------------------------------------------------------------------

    drawRoof()
    drawBot()

    // noLoop();
    // rotation+=0.001
}
function drawRoof(){
    stroke(wc)
    strokeWeight(2)
    noFill()
    // drawing roof--------------------------
    beginShape();
    for(let i = 0; i < width; i++){
        vertex(roofx[i], roofy[i]);
    }
    endShape();

}

function drawBot(){
    stroke(wc)
    strokeWeight(2)
    noFill()
    // drawing roof--------------------------
    beginShape();
    for(var x = 0; x < width; x++){
        //var angle = map(x, 0, width, 0, TWO_PI);
        var angle = offset + x * 0.03;
        // map x between 0 and width to 0 and Two Pi
        var y = map(sin(angle), -strum, strum, 150, 250);
        vertex(x, y+300);
        if(x%10==0){
            line(roofx[x],roofy[x],x,y+300)

        }

    }

        endShape();

}
