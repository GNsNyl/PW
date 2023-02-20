// online version: https://editor.p5js.org/garciadelcastillo/sketches/rufe1_uVr

/**
 * p5.js will always execute setup() **once**
 * at the beginning of the execution loop.
 */
const cWidth=1200;
const cHeight=900;
let nodeNum = 25;
const nodesbegin = new Array();

const nodes = new Array();
const nodesGear = new Array();

// const timer = millis()
const radius=50;
let speedRate=0.01;


function setup() {
  // Create a canvas element and add it to the document
  createCanvas(cWidth, cHeight);


  for (let i = 0; i < nodeNum; i++) {
    let x = 0.85*(60+i/nodeNum * cWidth);
    let y = random(0.3*cHeight,0.7*cHeight);
    ellipse(x, y, 10, 10);
    nodesbegin.push(createVector(x, y));
    nodes.push(createVector(x, y));

    nodesGear.push(createVector(x, y-300));

  }
  // console.log(nodesbegin[1].x)

  // draw lines
  // for (let i = 0; i < nodeNum - 1; i++) {
  //   let n = nodes[i];
  //   for (let j = i + 1; j < nodeNum; j++) {
  //     let m = nodes[j];
  //     if (dist(n.x, n.y, m.x, m.y) < 400) {
  //       line(n.x, n.y, m.x, m.y);
  //     }
  //
  //     // line(n.x, n.y, m.x, m.y);
  //   }
  // }
}

/**
 * p5.js will always execute draw() **continuously**
 * during the execution loop at roughly 60fps.
 */
function draw() {
  // let time = millis();

  // All drawing instructions will go to the default canvas
  background(0, 0, 0);

  for (let i = 0; i < nodeNum; i++) {
    nodes[i].x = nodesbegin[i].x + radius*Math.sin(speedRate*frameCount+i);
    nodes[i].y = nodesbegin[i].y + radius*Math.cos(speedRate*frameCount+i);
    ellipse(nodes[i].x, nodes[i].y, 2, 2);
    let l= i%3;
    if(l==0){
      ellipse(nodes[i].x, nodes[i].y+400, 2, 2);
      strokeWeight(0.15);
      line(nodes[i].x,nodes[i].y+400,nodes[i].x,nodes[i].y)
      // strokeWeight(0.01);

    };
    // ellipse(nodes[i].x, nodes[i].y+200, 2, 2);

    // nodes.push(createVector(x, y));
  }
  // console.log(nodes[1].x)
  const w=10;
  const h=10;

  // draw lines
  for (let i = 0; i < nodeNum - 1; i++) {
    let n = nodes[i];
    for (let j = i + 1; j < nodeNum; j++) {
      let m = nodes[j];
      if (dist(n.x, n.y, m.x, m.y) < 300) {
        strokeWeight(0.3);
        line(n.x, n.y, m.x, m.y);
        stroke(255, 255, 255)

        let ratio = (m.y-n.y)/(m.x-n.x)

        let d = dist(n.x, n.y, m.x, m.y);
        // for (let u=0; u<Math.floor(d/25);u++){
        //   stroke(144, 115, 30);
        //   strokeWeight(2);
          // strokeCap('square');
          // line(n.x +10+ u*(m.x-n.x)/Math.floor(d/25), n.y+ 10/ratio, n.x +30+ u*(m.x-n.x)/Math.floor(d/25), n.y+ 30/ratio,);
        //
        //   let x1=n.x+u/10*(m.x-n.x),
        //       y1=n.y+u/10*(m.y-n.y),
        //       x2=x1 -w,
        //       y2=y1,
        //       x3=x2,
        //       y3=y1-h,
        //   x4=x2+w,
        //       y4=y1+h;
        //
        //   // y2=nodes[i].y+h;
        //   // stroke(0);
        //   // strokeWeight(0.1);
        //   fill(246, 208, 184);
        //   quad(x1,y1,x2,y2,x3,y3,x4,y4)
        // }

      }}};

  // for (let i = 0; i < nodeNum-1; i++) {
  //   nodes[i].x = nodesbegin[i].x + radius*Math.sin(speedRate*frameCount+i);
  //   nodes[i].y = nodesbegin[i].y + radius*Math.cos(speedRate*frameCount+i);
  //   for (let j=0; j <10;j++){
  //     let w=10, h=10;
  //     let x1=nodes[i].x+j/10*(nodes[i+1].x-nodes[i].x),
  //         y1=nodes[i].y+j/10*(nodes[i+1].y-nodes[i].y),
  //         x2=x1 +w,
  //         y2=y1,
  //         x3=x2,
  //         y3=y1+h;
  //
  //         // y2=nodes[i].y+h;
  //     quad(x1,y1,x2,y2,x3,y3)
  //
  //   }
  //   quad(nodes[i].x,nodes[i].y,)
  //   // ellipse(nodes[i].x, nodes[i].y, 2, 2);
  //   // nodes.push(createVector(x, y));
  // }

  //
  // // Tree
  // stroke(144, 115, 30);
  // strokeWeight(10);
  // strokeCap('square');
  // line(475, 230, 475, 145);
  //
  // noStroke();
  // fill(75, 116, 71);
  // circle(475, 145, 75);
  // Door
  // stroke(0);
  // strokeWeight(1);
  // fill(246, 208, 184);
  // rect(280, 190, 20, 40);

  // // Roof
  // fill(219, 128, 71);
  // beginShape();
  // vertex(280, 130);
  // vertex(380, 130);
  // vertex(290, 70);
  // endShape(CLOSE);

  speedRate=0.01+mouseX/15000;

}

/**
 * A function to define what to do whenever the mouse
 * is pressed over the canvas.
 */
function mousePressed() {
  console.log(mouseX + " " + mouseY);
};




