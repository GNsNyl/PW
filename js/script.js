let beginUp = new Array();
let beginDown = new Array();

let nodeNum=300;
// var mySvg;


let width=screen.width,height=screen.height;
// let width,height;
let zoff=0;

let cl0; //颜色

var car,people,building,balloon,dog,rat;
let allsvg;
const svgNum = [3,2,6,2,1,2,1];
const svgSize=[60,20,25,80,70,35]
let svgPos = [];


function preload(){
    car = loadImage("img/car.svg");
    people = loadImage("img/people.svg");
    building = loadImage("img/building.svg");
    balloon= loadImage("img/balloon.svg")
    dog= loadImage("img/dog.svg")
    rat= loadImage("img/rat.svg")
    allsvg=[building,car,people,balloon,dog,rat];

     // width=screen.width;
    // height=screen.height;


}

function setup() {
    const cns=createCanvas(width, height);
    cns.parent("drawing-container");
pixelDensity(1)
    for (let i = 0; i < nodeNum; i++) {
        let x = i / nodeNum * width;
        // let x = random(0.1*gear_width,0.9*gear_width);

        let y1 = height / 2;
        let y2 = 1.2 * height / 2;
        beginUp.push (createVector (x , y1));
        beginDown.push (createVector (x , y2));
    }
    for(let z=0;z<allsvg.length;z++){
        let eachPos=new Array();
        for (let m=0;m<svgNum[z];m++){
            let x= Math.random()*900
            eachPos.push(createVector (x , 1.1 * height / 2))
        }
        svgPos.push(eachPos)

    }



    background('rgb(250,250,250)')

    // pixelDensity(1);
}

function draw() {

    clear();
    imageMode(CORNER);
    for(let z=0;z<allsvg.length;z++){
        for (let m=0;m< svgNum[z]; m++){
            // console.log(svgPos[z][m].x)
            // console.log(allsvg[z])
            // image(allsvg[z], 500, 700);
            //
            image(allsvg[z], svgPos[z][m].x, svgPos[z][m].y);
            allsvg[z].resize(svgSize[z],svgSize[z])
            svgPos[z][m].x=svgPos[z][m].x+Math.pow(-1,m)*Math.sin(zoff)
        }
    }



    for (let i = 0; i < nodeNum; i++) {
        let dt=dist(mouseX,mouseY,beginDown[i].x,beginDown[i].y)
        if(beginDown[i].y<1.2 * height / 2){
            beginDown[i].y=beginDown[i].y+1
        }
        if(beginDown[i].y>1.2 * height / 2){
            beginDown[i].y=beginDown[i].y-1
        }
        if(dt<100){
            beginDown[i].x = beginUp[i].x+20*Math.sin(-dt/600*Math.PI);

                if(beginDown[i].y<=1.39 * height / 2){
                beginDown[i].y = mouseY-80*Math.cos(-dt/200*Math.PI);
            }
            // beginDown[i].y = mouseY-80*Math.cos(-dt/200*Math.PI);
        }
        // let l= i%5;
        // if(l==0){
        stroke(0, 0, 0)
        // fill(0,255,0);
        strokeWeight(0.5);
        // ellipse(beginUp[i].x, beginUp[i].y, 2, 2);
        line(beginUp[i].x,beginUp[i].y,beginDown[i].x,beginDown[i].y)
    }



    // set color-----------------------------------------------------------------------------------
    cl0=color(0,0,0); //浅绿

    // draw rainbow-----------------------------------------------------------------------------------




    zoff+=0.0019

    mountainLine (PI , 2 , 1.05 * zoff , 125 , 500 ,mouseX, mouseY , 0.008 , -50 , height , 0.75 , cl0 ,cl0)

    strokeWeight(0.3);
    stroke(0, 0, 0);
    setLineDash([2,5])
    line(mouseX-2000, mouseY,mouseX+2000,mouseY)
    line(mouseX, mouseY+2000,mouseX,mouseY-2000);
    setLineDash([0])
    strokeWeight(0.75);

    rect(mouseX-4,mouseY-4,8,8)

}


function mountainLine(angle,noiseMax, zoff, minR, maxR,mouseX,mouseY, inc, px,py,rd, fillC,strokeC){
    noFill();

    // strokeWeight(mouseY/height)
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

