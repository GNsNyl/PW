class Circle_bubble {
    constructor(_circle1, _cSpeed, _cRad, _lineLength, _primeGear) {
        this.cRad = _cRad;
        this.cSpeed = _cSpeed;
        this.cRot = 0.2;
        // this.len = _lineLength;
        this.cir = createVector(_circle1.x, _circle1.y);
        this.puppetGear = _puppetGear;

        this.locPoint = createVector(10, 0);
        this.offsetLoc = createVector(0, 0);
        this.offsetScale = 0.0;
        this.offsetSpeed = 0.0;
        this.moving = false;
        this.sizeVector = createVector(0, 0);
        this.speedVector = createVector(0, 0);
        this.rotateBool = false;
        this.sizeBool = false;
        this.circle1Orbit = createVector(0, 0);
        this.hoverCenter = false;
        this.hoverSpeed = false;
        this.hoverScale = false;
        this.linepoints = [];
        // this.primeGear = _primeGear;
        this.cirSpeed;
        this.touchingGear = false;
        this.circumference;
        this.touchflag = true;
        this.getsPowerFrom = -1;
        this.testbool = false;
        this.rotPointDif = createVector(0, 0);
        this.hoverTurn = false;
        this.hoverTurnFill = false;
    }
    display() {

        //this.cirSpeed = this.cSpeed * (this.cRad + fudge);
        // this.cirSpeed = this.cSpeed * this.cRad;



        // if(this.testbool == false && this.primeGear == false){
        //     this.cSpeed = 0;
        //     this.touchingGear = false;
        // }


        var spRot = map(this.cSpeed, -0.02, 0.02, -PI + 0.2, -0.2); // -0.1, 0.1,
        this.speedVector.x = cos(spRot) * 30 + this.cir.x;
        this.speedVector.y = sin(spRot) * 30 + this.cir.y;


        if (dist(mouseX, mouseY, this.cir.x, this.cir.y) < 15) {
            this.hoverCenter = true;
        } else {
            this.hoverCenter = false;
        }
        if (MP && this.hoverCenter && this.moving == false && somethingBeingMoved == false) { // over hand

            this.moving = true;
            this.offsetLoc.x = this.cir.x - mouseX
            this.offsetLoc.x = this.cir.y - mouseY;
            somethingBeingMoved = true;
            //print(this.gearNum);

        }
        // for setting the prime gear speed
        if (dist(mouseX, mouseY, this.speedVector.x, this.speedVector.y) < 6) {
            this.hoverSpeed = true;
        } else {
            this.hoverSpeed = false;
        }

        // if(this.primeGear){
        //
        //     if (MP && this.hoverSpeed == true && this.moving == false) { // over rotspeed
        //
        //         this.rotateBool = true;
        //     }
        // }

        // if (this.rotateBool ) {
        //     var mRot = atan2(mouseY - this.cir.y, mouseX - this.cir.x);  // here
        //     if (mouseY < this.cir.y && this.primeGear == true) { //so it doesn't "flip";
        //         mRot = constrain(mRot, -PI + 0.2, -0.2);
        //         this.cSpeed = map(mRot, -PI + 0.2, -0.2, -0.02, 0.02); //  -0.02, 0.02
        //     }
        // }
        if(stopBool == false){
            this.cRot += this.cSpeed;
        }


        // for turning the gear by hand.

        if (dist(mouseX, mouseY, this.locPoint.x, this.locPoint.y) < 6  ) {
            this.hoverTurnFill = true;
            if(MP){
                this.hoverTurn = true;
            }
        }
        else{
            if(mouseIsPressed == false){
                this.hoverTurnFill = false;
            }
        }
        // if(mouseIsPressed == false){
        //       this.hoverTurn = false;
        //   }
        if(this.hoverTurn){
            var mRotTurn = atan2(mouseY - this.cir.y, mouseX - this.cir.x);  // here
            this.cRot = mRotTurn;
            somethingBeingMoved == true;
        }



        // this.locPoint.x = this.cir.x + cos(this.cRot) * (this.cRad * 1.5 );  //  - 10
        // this.locPoint.y = this.cir.y + sin(this.cRot) * (this.cRad * 1.5);

        //  for(var i = 0; i < 10; i++){
        //   var radsize = (TWO_PI / 10) * i;
        //   var xline = this.cir.x + cos(this.cRot + radsize) * this.cRad;
        //   var yline = this.cir.y + cos(this.cRot + radsize) * this.cRad;
        //   this.linepoints [i] = createVector(xline, yline);

        // }


        if (this.moving) {
            if (shift == false && cont == false) { //regular moving
                this.cir.x = mouseX + this.offsetLoc.x;
                this.cir.y = mouseY + this.offsetLoc.y;
            }
            // if (cont && primeGear == true) { // rotate apeed
            //   var dis = mouseX - this.offsetSpeed;
            //   dis = constrain(dis, -30, 30);
            //   this.cSpeed = map(dis, -30, 30,  -0.01, 0.01); // -0.1, 0.1
            // }
        }

        if (mouseIsPressed == false) {
            this.moving = false;
            if(this.rotateBool){
                this.rotateBool = false;
                if(this.cSpeed < 0.0015 && this.cSpeed > -0.0015) {  // sets the roate handle to snap to 0
                    this.cSpeed = 0.0;
                }
            }
            this.sizeBool = false;
            this.hoverTurn = false;
        }

        if (this.sizeBool) { // reset size
            var d = dist(mouseX, mouseY, this.cir.x, this.cir.y);
            //this.cRad
            // if( this.primeGear){
            //     if (d > 35 && d < 360) { // 35 160
            //         var d = int(dist(mouseX, mouseY, this.cir.x, this.cir.y));
            //         if(d%3 == 0){
            //             this.cRad = d;
            //         }
            //
            //     }
            // }
           if (d > 21 && d < 360) { // 35 160

                // if (d > 35 && d < 360) { // 35 160
                var d = int(dist(mouseX, mouseY, this.cir.x, this.cir.y));
                // if(d%3 == 0){
                //     this.cRad = d;
                // }
                // // }
                // this.cRad = dist(mouseX, mouseY, this.cir.x, this.cir.y); // old way
            }

        }
        // this.cRad = floor(this.cRad);  // set the size to an int


        // if (machineVisible ) { // machineVisibleTemp
        //     strokeWeight(1);
        //     stroke(1, 1, 1);
        //     if(this.testbool){
        //         // fill(255, 0, 0);
        //     }
        //     // fill(255, 10);
        //     fill(0, 0, 100, .2)
        //     ellipse(this.cir.x, this.cir.y, this.cRad * 2, this.cRad * 2);
        //     this.cirSpeed = nf(this.cirSpeed, 4, 4);
        //
        //
        //     // lines and linkages
        //     if(this.puppetGear && showBlob){
        //         stroke(0, 0, 71);  // 180
        //         line(this.locPoint.x, this.locPoint.y, this.cir.x, this.cir.y);
        //         if(this.hoverTurnFill){
        //             //fill(100);
        //             fill(0, 0, 40);
        //         }
        //         ellipse(this.locPoint.x, this.locPoint.y, 6,6);
        //         noFill();
        //         line(this.locPoint.x, this.locPoint.y, this.locPoint.x, this.locPoint.y-200);
        //         stroke(1, 1, 1);
        //     }
        //
        //     var lineNum = int(this.cRad/3); // 2.5
        //
        //     for(var i = 0; i < lineNum; i++){ // draw spokes and gear ends  draw spokes and gear ends  draw spokes and gear ends  draw spokes and gear ends
        //         var radsize = (TWO_PI / lineNum) * i;
        //         var xline = this.cir.x + cos(this.cRot + radsize) * this.cRad;
        //         var yline = this.cir.y + sin(this.cRot + radsize) * this.cRad;
        //         this.linepoints [i] = createVector(xline, yline);
        //         push(); // Draw all the gears
        //         translate(xline, yline);
        //         rotate(this.cRot + radsize + HALF_PI); // this.cRot +
        //         this.Q1 = createVector(-3, -8); // draw gear
        //         this.Q2 = createVector(3, -8);
        //         this.Q3 = createVector(5, 0);
        //         this.Q4 = createVector(-5, 0);
        //         quad(this.Q1.x, this.Q1.y, this.Q2.x, this.Q2.y, this.Q3.x, this.Q3.y, this.Q4.x, this.Q4.y);
        //         //image(pgTooth, 0, 0);
        //
        //         pop(); // Restore original state
        //     }
        //
        //     let sqSize = 10;
        //     if (mouseX < this.cir.x + sqSize && mouseX > this.cir.x - sqSize && mouseY < this.cir.y + sqSize + this.cRad && mouseY > this.cir.y - sqSize + this.cRad) { // over square
        //         // over the suqare
        //         if(somethingBeingMoved == false){
        //             this.hoverScale = true;
        //
        //             fill(200);
        //             rect(this.cir.x, this.cir.y + this.cRad , sqSize, sqSize); // draws even if not over circle
        //             noFill();
        //             if (mouseIsPressed) {
        //                 if(overSQ == false){ // if no other spquares are pressed
        //                     this.sizeBool = true;
        //                     overSQ = true;
        //                 }else{
        //                     overSQ = true;
        //                 }
        //             }
        //             else{
        //                 overSQ = false;
        //             }
        //         }
        //     }
        //     if (dist(mouseX, mouseY, this.cir.x, this.cir.y) < this.cRad) { // general over
        //         if( this.primeGear == true){ // only draw speed tools on the prime gear
        //             arc(this.cir.x, this.cir.y, 60, 60, -PI + 0.2, -0.2);
        //             if (this.hoverSpeed) {
        //                 //fill(200);
        //                 fill(0, 0, 78);
        //             } else {
        //                 // fill(240);
        //                 fill(0, 0, 94);
        //             }
        //             ellipse(this.speedVector.x, this.speedVector.y, 6, 6);
        //         }
        //         if (this.hoverCenter) {
        //             //fill(200, 200);
        //             fill(0, 0, 78, .8);
        //
        //         } else {
        //             noFill();
        //         }
        //         if(this.primeGear == true){
        //             //fill(200, 100, 100, 20);
        //             fill(0, 50, 78, .2);
        //         }
        //         ellipse(this.cir.x, this.cir.y, 30, 30);
        //         rectMode(CENTER);
        //
        //
        //         if (this.hoverScale) {
        //             //fill(200);
        //             fill(0, 0, 78);
        //         } else {
        //             //fill(240);
        //             fill(0, 0, 94);
        //         }
        //
        //         // fill(240);
        //         fill(0, 0, 94);
        //         rect(this.cir.x, this.cir.y + this.cRad , sqSize, sqSize);
        //     }
        //     if(this.primeGear == true){
        //         // fill(200, 100, 100, 20);
        //         fill(0, 50, 78, .2);
        //         ellipse(this.cir.x, this.cir.y, 30, 30);
        //     }
        // }
        noFill();
    }
}