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
    pixelDensity(1);

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


    // console.log(tx6)

    // paintCanvas(pixelGBGradient);
    // text(frameCount, 10, height - 10);
    // noLoop();
    drawRoof(350,350,500,350,15,rotation)
    rotation+=0.001
}
function drawRoof(tx1,ty1,tx2,ty2,dist,rotation){
    stroke(wc)
    strokeWeight(0.2)
    noFill()

    let pointList=[]
    for(let i=0;i<5;i++){
        let tx1_1 = tx1 + 55*i
        let ty1_1 = 55*Math.sin(Math.PI*0.1+i)+ty1

        pointList.push(tx1_1, ty1_1)
    }

    bezier(pointList[0],pointList[1],pointList[2],pointList[3],pointList[4],
        pointList[5],pointList[6],pointList[7],)


}


