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
var circles = [];

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
        circles.push({ x: 0.5*windowWidth*(0.1+Math.random()), y: 0.5*windowHeight*(Math.random()), color:'#000', breed: name_ani, radius_num: num, arm_num:arm, active: false})
    }
};
// Draw on the canvas.
function draw() {

    let backColor=backcolPic.color();
    let alphaValue = slider.value;
    let circleSize=slider_size.value;
    let newColor = colPic.color();
    let alphaValueLine =slider_line.value;
    let lineWeight =slider_line_weight.value/10;
    let newColorLine = linecolPic.color();
    let alphaValueText =slider_text.value;
    let newColorText = textcolPic.color();
    fontsize = slider_font_size.value;

    background(backColor);
    textSize(fontsize);
    text(msg, width / 2, height - 25);


    newColor.setAlpha(alphaValue);
    newColorLine.setAlpha(0.01+alphaValueLine*Math.abs(Math.sin(float*Math.PI)));
    newColorText.setAlpha(alphaValueText);


    if (circles.length > 0) {
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            let radius = circleSize*circle.radius_num;
            let armnum = circle.arm_num;
            strokeWeight(lineWeight);
            stroke(newColorLine);
            noFill();
            var cx1,cy1,cx2,cy2,cx3,cy3,cx4,cy4;
            cx1=circle.x;
            cy1=circle.y-radius;

            let pts = [];

            for(let j=1;j<armnum+1;j+=1){
                var ratio=2*(Math.cos(Math.PI*(j+0.75)/(0.75*armnum)));

                cx2 = cx1-39*ratio*Math.cos(i+float*Math.PI);
                cy2=cy1-1.5*radius*Math.abs(Math.sin(i+float*Math.PI));
                cx3 = (cx2+30/3*ratio);
                cy3=cy2-30;
                cx4 = cx3+30/3*ratio;
                cy4=cy3-(j/armnum+0.5)*30*0.2;
                pts = [
                    createVector(cx1, cy1),
                    createVector(cx2, cy2),
                    createVector(cx3, cy3),
                    createVector(cx4, cy4)
                ];
                bezier(pts[0].x, pts[0].y,
                    pts[1].x, pts[1].y,
                    pts[2].x, pts[2].y,
                    pts[3].x, pts[3].y);
            };

            fill(newColorText);
            textSize(7);
            noStroke();
            text(circle.breed, cx1, cy1+2*radius+10);
            // console.log(text)

// console.log(curvex)
            fill(newColor);
            ellipse(circle.x, circle.y, radius,radius);

        }
    }
    float+=0.002
};

function gotFile(file) {
    console.log(file);
    inputFile = file;

    msg = 'Parsing file...';

    csv = parseCSV(inputFile);
    console.log(csv);
    if (csv) {
        circles=[]
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
            circles.push({ x: 0.5*windowWidth*(Math.random()), y: 0.5*windowHeight*(Math.random()), color:'#000', breed: name_ani, radius_num: num, arm_num:arm, active: false})
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
        if (circles.length > 0) {
            for (var i = 0; i < circles.length; i++) {
                var circle = circles[i],
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
        if (circles.length > 0) {
            for (var i = 0; i < circles.length; i++) {
                var circle = circles[i];
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
