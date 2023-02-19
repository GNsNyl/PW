// read data

let table,tablefile,tableArray;
let backcolPic,colPic,linecolPic,textcolPic;
let font;
let bg;
let w, h;
let img;
// let lineWeight;
// --------------------
let r;
var inc = 0.1;
var noiseMax = 2;
var phase = 0;
var zoff = 0;
// // --------------------

// preload table data
function preload() {
    table = loadTable(
        "../data/name200.csv",
        'csv',
        'header');
            console.log(table)
}


var slider_size = document.getElementById("myRangeSize");

var slider = document.getElementById("myRange");

var slider_line = document.getElementById("myRangeLine");
var slider_line_weight = document.getElementById("myRangeLineWeight");

var slider_text= document.getElementById("myRangeText");
var slider_font= document.getElementById("myRangeFont");

// var radius = 25;
// ------------------

// }
let cns;

function setup() {
    clear();
    // frameRate(1)

    cns=createCanvas(windowWidth, windowHeight);
    cns.parent("drawing-container");
    textAlign(CENTER, CENTER);
    backcolPic = createColorPicker((13,13,13));
    colPic = createColorPicker("red");
    linecolPic = createColorPicker("white");
    textcolPic = createColorPicker("white");

    backcolPic.position(100, 450);
    colPic.position(100, 520);
    linecolPic.position(100, 590);
    textcolPic.position(100, 660);

};

// Draw on the canvas.
function draw() {
    // set color  --------------------------------------------------

    let backColor=backcolPic.color();
    let alphaValue = slider.value;
    let circleSize=slider_size.value;
    let newColor = colPic.color();
    let alphaValueLine =slider_line.value;
    let lineWeight =slider_line_weight.value/10;

    let newColorLine = linecolPic.color();
    let alphaValueText =slider_text.value;
    let newColorText = textcolPic.color();
    let fontsize=slider_font.value;
    // var file = document.getElementById("getval").files[0];
    // bg = loadImage(file);

    // set color opacity --------------------------------------------------
    // newColor.setAlpha(alphaValue);
    newColorLine.setAlpha(alphaValueLine);
    newColorText.setAlpha(alphaValueText);

    background(backColor);
    // fill(newColor);
    stroke(newColorLine);
    strokeWeight(lineWeight);
    // add text--------------------------------------------------
let minR=50;
let maxR=100;
    // add blobs--------------------------------------------------
    // noiseMax = sliderNoise.value();
    // let all=[]

        // position of each blob----------------------------------
        translate(width / 2, height / 2);

        beginShape();
            noFill();

        for (let a = 0; a <= TWO_PI; a += inc) {
            let xoff = map(cos(a), -1, 1, 0, noiseMax);
            let yoff = map(sin(a), -1, 1, 0, noiseMax);
            let r = map(noise(xoff, yoff, zoff), 0, 1, minR, maxR);
            let x = 2*r * Math.cos(a);
            let y = 3*r * Math.sin(a);

            line(0,0,x,y)
            vertex(x, y);
        }
        endShape(CLOSE);
    beginShape();
    fill(newColor);

    for (let a = 0; a <= TWO_PI; a += inc) {
        let xoff = map(cos(a), -1, 1, 0, 4);
        let yoff = map(sin(a), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, zoff), 0, 1, minR, maxR);
        let x = 1.3*r * Math.cos(a);
        let y = 2*r * Math.sin(a);

        line(0,0,x,y)
        vertex(x, y);
    }
    endShape(CLOSE);


        // textSize(fontsize);
        // fill(newColorText);
        // text(annotation, px, py);
        //
        // sliderNoise = createSlider(0, 10, 0, 0.1);
        // sliderNoise.value(2);

    zoff += 0.01;
    // noLoop();


};

// Run when the mouse/touch is down.
// function mousePressed() {
//     if (mouseY > 0){
//         if (blobs.length > 0) {
//         for (var i = 0; i < blobs.length; i++) {
//             var blob = blobs[i],
//                 distance = dist(mouseX, mouseY, blob.x, blob.y);
//             if (distance < blob.radius_num) {
//                 blob.active = true;
//                 // circle.color = '#3f3f3f';
//                 // circle.color=colPic.color();
//             } else {
//                 blob.active = false;
//                 blob.color = colPic.color();
//             }
//         }
//     }
//     // Prevent default functionality.
//     return false;}
// };
//
// // Run when the mouse/touch is dragging.
// function mouseDragged() {
//     if (mouseY > 0){
//         if (blobs.length > 0) {
//             for (var i = 0; i < blobs.length; i++) {
//                 var blob = blobs[i];
//                 if (blob.active) {
//                     blob.x = mouseX;
//                     blob.y = mouseY;
//                     break;
//                 }
//             }
//         }
//         // Prevent default functionality.
//         return false;
//     }
//
// };

function keyPressed(){
    //if the key is a s
    if(key == 's'){
        //save out to a file
        save('data-viz.png');
    }
};

// window.onresize=function updateWindow(){
//     w = window.innerWidth || e.clientWidth || g.clientWidth;
//     h = window.innerHeight|| e.clientHeight|| g.clientHeight;
//     cns.resize(w,h);
//     // console.log(cns.width)
// };