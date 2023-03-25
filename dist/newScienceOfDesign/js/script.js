function drawAll(){
    const canvas = document.getElementById("cvs-01");
    const ctx= canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(effect,x,y,color) {
            this.effect=effect;
            this.x=Math.random()*this.effect.width;
            this.y=Math.random()*this.effect.height;
            this.originX=Math.floor(x);
            this.originY=Math.floor(y);
            this.color=color;


            this.dx =0;
            this.dy = 0;
            this.distance=0;
            this.force=0;
            this.angle=0
            this.size =3;
            this.ease=0.2;
            this.friction=0.95;
            this.vx=0;
            this.vy=0;
            // this.vx=Math.random()*2-1;
            // this.vy=Math.random()*2-1;

        }
        draw(context){
            context.fillStyle=this.color;
            context.fillRect(this.x,this.y,this.size,this.size);
        }
        update(){
            this.dx = this.effect.mouse.x-this.x;
            this.dy = this.effect.mouse.y-this.y;
            this.distance=this.dx*this.dx+this.dy*this.dy;
            this.force=-this.effect.mouse.radius/this.distance;
            if (this.distance<this.effect.mouse.radius){
                this.angle=Math.atan2(this.dy,this.dx);
                this.vx+=this.force*Math.cos(this.angle)
                this.vy+=this.force*Math.sin(this.angle)

            }



            this.x+=(this.vx*=this.friction)+(this.originX-this.x)*this.ease;
            this.y+=(this.vy*=this.friction)+(this.originY-this.y)*this.ease;
        }
        warp(){
            this.x=Math.random()*this.effect.width;
            this.y=Math.random()*this.effect.height;
            this.ease=0.01;

        }
    };

    class Effect{
        constructor(width, height) {
            this.width=width;
            this.height=height;
            this.particlesArray = [];
            this.image=document.getElementById("img-01");
            this.imgX=(this.width-this.image.width*0.3)*0.5;
            this.imgY=(this.height-this.image.height*0.3)*0.5;

            // console.log(this.imgX)
            this.centerX=this.width*0.5;
            this.centerY=this.height*0.5;
            this.gap = 5;
            this.mouse = {
                radius:3000,
                x: undefined,
                y: undefined
            };
            window.addEventListener('mousemove',event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
                // console.log( this.mouse.x)

            })


        }
        init(context){
            context.drawImage(this.image,this.imgX,this.imgY,this.image.width*0.3,this.image.height*0.3);
            const pixels = context.getImageData(0,0,this.width,this.height).data;
            for (let y=0;y<this.height; y+=this.gap){
                for(let x =0; x < this.width;x+=this.gap){
                    const index = (y*this.width+x)*4;
                    const red=pixels[index];
                    const green=pixels[index+1];
                    const blue=pixels[index+2];
                    const alpha = pixels[index+3];

                    const color='rgb('+red+','+green+','+blue+','+alpha+')';
                    if (alpha>0){
                        this.particlesArray.push(new Particle(this, x,y,color));
                    }
                }
            }
            // console.log(pixels)

        }
        draw(context){
            this.particlesArray.forEach(particle => particle.draw(context));
        }
        update(){
            this.particlesArray.forEach(particle => particle.update());
        }
        warp(){
            this.particlesArray.forEach(particle => particle.warp());
        }
    };

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    // effect.draw(ctx);
    // effect.update()


    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    };
    animate()
    // ctx.drawImage(image1,0,0,500,500);



};
window.addEventListener('load',drawAll)
window.addEventListener('resize',drawAll)