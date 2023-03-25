let boxArray=[];
let pixels=[];
let gap=50;
const contrast = 3; // 1 for perfect sine, > 1 for sharper lines, < 1 for grayer

const width=900;
const height=900;
function preload(){

   const canvas = document.getElementById("cvs-01");
    const ctx= canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    const image1=document.getElementById("light-m");
    ctx.drawImage(image1,0,0,width,height);
    pixels = ctx.getImageData(0,0,width,height).data;
    for (let y=0;y<height; y+=gap){
        for(let x =0; x < width;x+=gap){
            const index = (y*width+x)*4;
            const red=pixels[index];
            const green=pixels[index+1];
            // const blue=pixels[index+2];
            // const alpha = pixels[index+3];
            // const color='rgb('+red+','+green+','+blue+','+alpha+')';
            if (150<green+red){
                const box = {
                    center: [x, y, (green+red)/2],
                    radii: [90, 90, 90]
                };
                boxArray.push(box)
            }
        }
    }
    console.log(boxArray)
}


function setup() {
    const cnsWO3=createCanvas(width, height);
    cnsWO3.parent("drawing-container-wo-3");
    pixelDensity(1);

}

function draw() {
    background('rgb(253,130,130)');
    loadPixels();

    // const z = (frameCount - 1) % 512;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let sdfP=0;
            for(let q=0;q<boxArray.length;q++){
                const box=boxArray[q]
                // Compute SDF for each object
                const sdfBox = sdBox([x, y, 120], box.center, box.radii);
                // sdfP = opSmoothUnion(sdfBox, sdfP, 100);

                sdfP=Math.max(sdfP,sdfBox)
            }

            // Compute the final SDF as your combination choice
            // const sdf = opSmoothUnion(sdfSphere, sdfSphere, 100);

            // // Plot the SDF as you choose!
            // https://graphtoy.com/?f1(x,t)=x&v1=false&f2(x,t)=255*sign(max(0,x))&v2=false&f3(x,t)=255*sign(max(0,x))*(1-(floor(abs(x)/25)%252))&v3=true&f4(x,t)=255*sign(max(0,x))*0.5*(x,sin(%F0%9D%9C%8F*x/25)*3+1)&v4=false&f5(x,t)=255*sign(max(0,x))*0.5*(cos(%F0%9D%9C%8F*sqrt(x))*3+1)&v5=false&f6(x,t)=&v6=false&grid=1&coords=116.36387637326449,27.24269417762767,564.820013688099
            // const gray = sdfP;
            const gray = 255 * Math.sin(Math.max(0, sdfP/900));
            // const gray = 255 * Math.sign(Math.max(0, sdf)) * (1 - (Math.floor(Math.abs(sdf) / waveLength) % 2));
            // const gray = 255 * Math.sign(Math.max(0, sdf)) * 0.5 * (Math.sin(TAU * sdf / waveLength) * contrast + 1);
            // const gray = 255 * Math.sign(Math.max(0, sdfP)) * 0.5 * (Math.cos(TAU * Math.sqrt(sdfP)) * contrast + 1);
            console.log(gray)
            // Update the pixels
            const index = 4 * (x + y * width);
            pixels[index + 0] = gray;
            pixels[index + 1] = gray;
            pixels[index + 2] = gray;
            pixels[index + 3] = 255;

        }
    }
    updatePixels();

    // Render text after canvas was saved
    fill(255, 0, 0);
    // text(z, 10, height - 10);
noLoop()
}