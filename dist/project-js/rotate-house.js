let planimg,rotateimg,viewimg;
let ag;

const plan_margin = {top: 0, right: 0, bottom: 0, left: 0};
const plan_width = document.getElementById('plan-container').getBoundingClientRect().width - plan_margin.left - plan_margin.right;
const plan_height = document.getElementById('plan-container').getBoundingClientRect().height - plan_margin.top - plan_margin.bottom;

function preload() {
    planimg = loadImage('./img_port/rotate/1st.png');
    rotateimg = loadImage('./img_port/rotate/rotate.png');
    viewimg = loadImage('./img_port/rotate/view.png');

    // console.log(planimg)
}



function setup() {
    const cns=createCanvas(plan_width, plan_height);
    cns.parent("#plan-container");
    imageMode(CENTER);

    // pixelDensity(1);
    // image(planimg,600, 200,500,500)



}

function draw() {

    clear();
    image(planimg,plan_width/2, plan_height/2,750,750);

    image(viewimg,0.93*plan_width-0.8*mouseX, 3*plan_height/4,plan_width,150);
    stroke("none")
    fill('rgb(255,255,255)')
    rect(0,1.9*plan_height/3,0.43*plan_width)
    rect(0.57*plan_width,1.9*plan_height/3,plan_width)


    translate(plan_width/2-16, plan_height/2+15);
    if(mouseX/plan_width<=1){
        ag=(-1/12+1/3*mouseX/plan_width)*PI
    }else{
        ag=PI/4
    }

    rotate(ag);
    image(rotateimg,0, 0,50,539)



}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}