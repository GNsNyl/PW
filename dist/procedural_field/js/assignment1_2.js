// --------------------
let r;
var inc = 0.1;
var noiseMax = 2;
var phase = 0;
var zoff = 0;
// // --------------------
// read data

let table,tablefile,tableArray;
let backcolPic,colPic,linecolPic,textcolPic;
let font;
let bg;
let w, h;
let img;
let fontsize=12;

let float=0.01;

// new------------------------------
let inputFile;
let csv;
let msg = 'Drag and drop file into the canvas';

// sliders--------------------
// let canvasWidthSlider, canvasHeightSlider;
//
// let circleSizeSlider, circleOpacitySlider;
// let curveWeightSlider, curveOpacitySlider;
// let fontSizeSlider,fontOpacitySlider;
// const sliderList=[canvasWidthSlider, canvasHeightSlider,circleSizeSlider, circleOpacitySlider,
//     curveWeightSlider, curveOpacitySlider,fontSizeSlider,fontOpacitySlider]
// // --------------------

// preload table data
function preload() {
    table = loadTable(
        "data/name200.csv",
        'csv',
        'header');
};

var slider_size = document.getElementById("myRangeSize");
var slider = document.getElementById("myRange");
var slider_line = document.getElementById("myRangeLine");
var slider_line_weight = document.getElementById("myRangeLineWeight");
var slider_text= document.getElementById("myRangeText");
var slider_font_size= document.getElementById("myRangeFontSize");
var blobs = [];

let cns;

function setup() {
    clear();
    // canvasWidthSlider=createSlider(10, 1200, 650);
    // canvasHeightSlider=createSlider(10, 1200, 650);
    // canvasWidthSlider.position(0,300)
    // canvasHeightSlider.position(0,200)
    // canvasWidthSlider.parent("drawing-container");
    // canvasHeightSlider.parent("drawing-container");
    // circleSizeSlider=createSlider(10, 1200, 650);
    // circleOpacitySlider=createSlider(10, 1200, 650);
    //
    // curveWeightSlider=createSlider(10, 1200, 650);
    // curveOpacitySlider=createSlider(10, 1200, 650);
    //
    // fontSizeSlider=createSlider(10, 1200, 650);
    // fontOpacitySlider=createSlider(10, 1200, 650);

    cns=createCanvas(0.6*windowWidth, 0.7*windowHeight);
    cns.parent("drawing-container");
    cns.drop(gotFile);
// set slider position------------------------------------
//     for (let z=0;z<sliderList.length;z++){
//         sliderList[z].position(0,canvasHeightSlider.value()+15+z*15)
//     }
    // textFont(font);
    // textSize(fontsize);
    textAlign(CENTER, CENTER);

    strokeWeight(0);

    backcolPic = createColorPicker("black");
    backcolPic.parent("#circle")
    backcolPic.size(25,25)

    colPic = createColorPicker("white");
    colPic.parent("#circle")
    colPic.size(25,25)

    linecolPic = createColorPicker("white");
    linecolPic.parent("#curve")
    linecolPic.size(25,25)

    textcolPic = createColorPicker("white");
    textcolPic.parent("#text")
    textcolPic.size(25,25)


    // backcolPic.position(100, 450);
    // colPic.position(100, 520);
    // linecolPic.position(100, 590);
    // textcolPic.position(100, 660);


    ellipseMode(RADIUS);
    tableArray = table.getArray();
    for (let i = 0; i < tableArray.length; i++) {
        let name_ani=tableArray[i][0]
        let num=tableArray[i][1]/10
        let arm=tableArray[i][2]
        blobs.push({ x: 0.5*windowWidth*(0.1+Math.random()), y: 0.5*windowHeight*(Math.random()), color:'#000', breed: name_ani, radius_num: num, arm_num:arm, active: false})
    }
};
// Draw on the canvas.
function draw() {

    let backColor=backcolPic.color();
    let alphaValue = slider.value;
    let blobsize=slider_size.value;
    let fillColor = colPic.color();
    let alphaValueLine =slider_line.value;
    let lineWeight =slider_line_weight.value/10;
    let lineColor = linecolPic.color();
    let alphaValueText =slider_text.value;
    let newColorText = textcolPic.color();
    fontsize = slider_font_size.value;

    background(backColor);
    textSize(fontsize);
    text(msg, width / 2, height - 25);


    fillColor.setAlpha(alphaValue);
    lineColor.setAlpha(alphaValueLine);
    newColorText.setAlpha(alphaValueText);

    // let minR=50;
    // let maxR=100;
    for (let i = 0; i < tableArray.length; i++) {
        let blob=blobs[i]

        addIrregular(0.3*blob.radius_num, 0.7*blob.radius_num,1+i/tableArray.length,zoff,lineColor,fillColor,lineWeight,blob.x,blob.y)

    }
    zoff+=0.007

    float+=0.002
};

function addIrregular(minR, maxR,noiseMax,zoff,lineColor,fillColor,lineWeight,cx,cy){

    beginShape();
    // noFill();
    stroke(lineColor)
    strokeWeight(lineWeight)
    fill(fillColor)
    for (let a = 0; a <= TWO_PI; a += inc) {
        let xoff = map(cos(a), -1, 1, 0, noiseMax);
        let yoff = map(sin(a), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, zoff), 0, 1, minR, maxR);
        let x = 2*r * Math.cos(a);
        let y = 3*r * Math.sin(a);

        line(cx,cy,cx+x,cy+y)
        vertex(cx+x, cy+y);
    }
    endShape(CLOSE);
}

function gotFile(file) {
    console.log(file);
    inputFile = file;

    msg = 'Parsing file...';

    csv = parseCSV(inputFile);
    console.log(csv);
    if (csv) {
        blobs=[]
        console.log("running")
        // table = loadTable(
        //     inputFile.name,
        //     'csv',
        //     'header');
        // console.log(csv);

        tableArray = table.getArray();
        for (let i = 0; i < csv.length; i++) {
            // print(tableArray[i][1]);
            let num=csv[i][1]/10
            let arm=parseInt(csv[i][2])
            let name_ani=csv[i][0]

            // console.log(num)
            blobs.push({ x: 0.5*windowWidth*(0.1+Math.random()), y: 0.5*windowHeight*(Math.random()), color:'#000', breed: name_ani, radius_num: num, arm_num:arm, active: false})
        }
    }


    msg = ``;


}
function parseCSV(file) {
    const csv = [];
    // Split rows by new line character
    const rows = file.data.split('\n');
    // Split each row in columns using the comma as separator.
    rows.forEach((row) => {
        csv.push(row.split(','));
    })
    // Be careful! If your data contains text wrapped in "" with commas inside,
    // the above method will split those cells!
    return csv;
}


// Run when the mouse/touch is down.
function mousePressed() {
    if(mouseX>0){

        if (mouseY > 0){
            if (blobs.length > 0) {
                for (var i = 0; i < blobs.length; i++) {
                    var circle = blobs[i],
                        distance = dist(mouseX, mouseY, circle.x, circle.y);
                    if (distance < circle.radius_num) {
                        circle.active = true;
                        // circle.color = '#3f3f3f';
                        // circle.color=colPic.color();
                    } else {
                        circle.active = false;
                        circle.color = colPic.color();
                    }
                }
            }
            // Prevent default functionality.
            return false;}}
};

// Run when the mouse/touch is dragging.
function mouseDragged() {
    if(mouseX>0){

        if (mouseY > 0){
            if (blobs.length > 0) {
                for (var i = 0; i < blobs.length; i++) {
                    var circle = blobs[i];
                    if (circle.active) {
                        circle.x = mouseX;
                        circle.y = mouseY;
                        break;
                    }
                }
            }
            // Prevent default functionality.
            return false;
        }}

};

function keyPressed(){
    //if the key is a s
    if(key == 's'){
        //save out to a file
        save('data-viz.png');
    }
};

window.onresize=function updateWindow(){
    w = window.innerWidth || e.clientWidth || g.clientWidth;
    h = window.innerHeight|| e.clientHeight|| g.clientHeight;
    cns.resize(w,h);
    // console.log(cns.width)
};