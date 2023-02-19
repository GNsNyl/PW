// read data

let table,tablefile,tableArray;
let backcolPic,colPic,linecolPic,textcolPic;
let font;
let bg;
let w, h;
let img;
// let lineWeight;
// --------------------
// // --------------------

// preload table data
function preload() {

}
var slider_size = document.getElementById("myRangeSize");
var slider = document.getElementById("myRange");
var slider_line_weight = document.getElementById("myRangeLineWeight");
var slider_line = document.getElementById("myRangeLine");

let cns;

function setup() {
    clear();

    // Create canvas using width/height of window.
    cns=createCanvas(windowWidth, windowHeight);
    cns.parent("drawing-container");

    textAlign(CENTER, CENTER);

    strokeWeight(0);

    backcolPic = createColorPicker((13,13,13));
    linecolPic = createColorPicker("grey");
    backcolPic.position(100, 450);
    linecolPic.position(100, 590);
    ellipseMode(RADIUS);

};

// Draw on the canvas.
function draw() {
    let backColor = backcolPic.color ();
    let alphaValueLine = slider_line.value;
    let lineWeight = slider_line_weight.value;

    let newColorLine = linecolPic.color ();

    background (backColor);

    newColorLine.setAlpha (alphaValueLine);

    const a = 9
    const b = 16
    const c = 4
    const amp = 120
    beginShape ()
    strokeWeight (lineWeight);
    stroke(newColorLine);
    fill(backColor)
    for (let i = 0; i <= TWO_PI + 0.001; i += 0.001) {
        let theta = i + (sin (b * i) / c)
        let r = amp * (2 + 0.5 * sin (a * i))
        let x = r * cos (theta);
        let y = r * sin (theta);
        vertex (x+3*amp , y+3*amp)
    }
    endShape ();

    // sketch.js dentro de function(draw)
    for (let i = 0; i <= TWO_PI; i += 0.009) {
        let theta = i + (sin (b * i) / c)
        let r = amp * (2 + 0.5 * sin (a * i))
        let x = r * cos (theta);
        let y = r * sin (theta);
        vertex (x , y)
        line (x * 0.2+3*amp , y * 0.2 +3*amp, x +3*amp, y+3*amp)
    }

}
// Run when the mouse/touch is down.
function mousePressed() {

};

// Run when the mouse/touch is dragging.
function mouseDragged() {

};

function keyPressed(){
    //if the key is a s
    if(key == 's'){
        //save out to a file
        save('workout-2.png');
    }
};

window.onresize=function updateWindow(){
    w = window.innerWidth || e.clientWidth || g.clientWidth;
    h = window.innerHeight|| e.clientHeight|| g.clientHeight;
    cns.resize(w,h);
    // console.log(cns.width)
};