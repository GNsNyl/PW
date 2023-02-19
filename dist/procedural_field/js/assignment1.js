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
    table = loadTable(
        "data/name200.csv",
        'csv',
        'header');
            // console.log(table)

    // const output = document.getElementById('output');
    // const filepicker = document.getElementById('filepicker');

    // filepicker.addEventListener('change', (event) => {
    //     const files = event.target.files;
    //
    //     for (const file of files) {
    //         output.textContent = `${file.webkitRelativePath}\n`;
    //         console.log(output.textContent)
    //          table = loadTable(
    //             output.textContent,
    //             'csv',
    //             'header');
    //         console.log(table)
    //
    ////         circles=[];
    //         tableArray = table.getArray();
    //         console.log(tableArray)
    //
    //         for (let i = 0; i < tableArray.length; i++) {
    //             // print(tableArray[i][1]);
    //             let num=tableArray[i][1]/10
    //             let arm=tableArray[i][3]
    //             let name_ani=tableArray[i][0]
    //
    //             // console.log(tableArray)
    //             circles.push({ x: 0.8*windowWidth*Math.random(), y: 0.8*windowHeight*Math.random(), color:'#000', breed: name_ani, radius_num: num, arm_num:arm, active: false})
    //         }
    //         console.log(circles)
    //
    //         //
    //         // tableArray = table2.getArray();
    //         // for (let i = 0; i < tableArray.length; i++) {
    //         //     let num=tableArray[i][1]/10
    //         //     let arm=tableArray[i][3]
    //         //     let name_ani=tableArray[i][0]
    //         //
    //         //     // console.log(num)
    //         //     circles.push({ x: 0.8*windowWidth*Math.random(), y: 0.8*windowHeight*Math.random(), color:'#000', breed: name_ani, radius_num: num, arm_num:arm, active: false})
    //         //     draw }
    //     }
    //     // console.log(output.textContent)
    // });
}


var slider_size = document.getElementById("myRangeSize");

var slider = document.getElementById("myRange");
// console.log(slider.value);

var slider_line = document.getElementById("myRangeLine");
var slider_line_weight = document.getElementById("myRangeLineWeight");

var slider_text= document.getElementById("myRangeText");
var slider_font= document.getElementById("myRangeFont");

// var radius = 25;
var circles = [
    // { x: 50, y: 50, color:'#000', active: false },
    // { x: 150, y: 50, color: '#000', active: false },
    // { x: 250, y: 50, color: '#000', active: false }
]
// ------------------

// }
let cns;

function setup() {
    clear();
    // frameRate(1)

    cns=createCanvas(windowWidth, windowHeight);
    cns.parent("drawing-container");
    // console.log(cns.width)
    // textFont(font);
    // textSize(fontsize);
    textAlign(CENTER, CENTER);

    strokeWeight(0);

    backcolPic = createColorPicker("red");
    colPic = createColorPicker("white");
    linecolPic = createColorPicker("white");
    textcolPic = createColorPicker("white");

    backcolPic.position(100, 450);
    colPic.position(100, 520);
    linecolPic.position(100, 590);
    textcolPic.position(100, 660);


    ellipseMode(RADIUS);
    tableArray = table.getArray();
    for (let i = 0; i < tableArray.length; i++) {
        // print(tableArray[i][1]);
        let num=tableArray[i][1]/10
        let arm=tableArray[i][3]
        let name_ani=tableArray[i][0]

        // console.log(num)
        circles.push({ x: 0.65*windowWidth*(0.2+Math.random()), y: 0.7*windowHeight*(0.2+Math.random()), color:'#000', breed: name_ani, radius_num: num, arm_num:arm, active: false})
    }
    console.log(tableArray)

};
let float=0.01
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
    let fontsize=slider_font.value;
    // var file = document.getElementById("getval").files[0];

    // bg = loadImage(file);
    // console.log(file)
    background(backColor);
    // console.log(output.textContent)
//     if (img){
//     image(img, 500, 500);
//         console.log(output.textContent);
//
//         console.log(table)
//
// }

    newColor.setAlpha(alphaValue);
    newColorLine.setAlpha(alphaValueLine);
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
            // cy1=circle.y-radius+160*Math.cos((i/3+float)*Math.PI);
            cy1=circle.y-radius;

            // cy2=cy1-radius;
            // cy3=cy2-radius;
            // cy4=cy3-radius;
            // var x1listet=[];
            let pts = [];

            for(let j=1;j<armnum+1;j+=1){
                var ratio=2*(Math.cos(Math.PI*(j+0.75)/(0.75*armnum)));
               // x1listet=new Array()
               //  x1listet.push(cx1)

                // let p1 = { x: circle.x+radius, y: cy4 };
                // let p2 = { x: circle.x+radius-radius*ratio, y: cy3 };
                // let p3 = { x: circle.x+radius-radius*ratio+radius/3*ratio, y: cy2 };
                // let p4 = { x: circle.x+radius-radius*ratio+radius/3*ratio-radius/3*ratio, y: cy1 };
                 // cx1,cy1,cx2,cy2,cx3,cy3,cx4,cy4;
                // console.log(x1listet)
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
                // curve(cx1, cy4, cx2, cy3, cx3, cy2, cx4, cy1);
                // curve(cy1, cx4, cy2, cx3, cy3, cx2, cy4, cx1);
                // curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
            };

            textSize(fontsize);
            fill(newColorText);
            text(circle.breed, cx1, cy1);
            // console.log(fontsize)


// console.log(curvex)
            noStroke();
            fill(newColor);
            ellipse(circle.x, circle.y, radius,radius);

        }
        // console.log(x1listet)
    }
    float+=0.002
};

// Run when the mouse/touch is down.
function mousePressed() {
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
    return false;}
};

// Run when the mouse/touch is dragging.
function mouseDragged() {
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
    }

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
