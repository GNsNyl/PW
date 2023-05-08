const researchList=[
    '',
    '<h1><a href="https://www.nature.com/articles/221963a0">Vision Substitution by Tactile Image Projection</a></h1><p>Nature, vol. 221, March 8. 1969.<br>Paul Bach-y-Rita, Cartl R C. Collins</p>' +
    '<br><p>"We deseribe here a yision substitution system which is being developed as a practical aid for the blind and as a means of studying the processing of afferent information in the central nervous system."</p><br><img src="img/r/TV.png" height="150px"><img src="img/r/wm.png" height="150px">',
    '<h1><a href="https://www.semanticscholar.org/paper/Design-of-Vibrotactile-Feedback-and-Stimulation-for-Giordano-Sullivan/21a7652137dd1205f8f859bd622b7894cb859593">Design of Vibrotactile Feedback and Stimulation for Music Performance</a></h1><p>Marcello Giordano, John Sullivan and Marcelo M. Wanderley</p>' +
    '<br><p>"Our research, conducted in the context of a multidisciplinary project involving haptic researchers, composers, and wearable designers,is aimed at the development of a language of tactile icons specifically designed to convey musical information to professional musicians. These icons, delivered via specialized garments equipped with arrays of vibrotactile actuators, have been evaluated to determine their effectiveness and reliability.They will be used as the building blocks of a wearable score language,which composers will use to create new pieces and art installations."</p><br><img src="img/r/belt.png" height="150px">',
    '<h1><a href="https://eagleman.com/science/sensory-substitution/">Sensory substitution</a></h1><p>David Eagleman and his lab</p>' +
    '<br><p>"The original form factor in my laboratory was a vest with vibratory motors stitched into it. It captured sounds and converted them to patterns of vibration on the skin."</p><br><img src="img/r/vest.png" height="150px">',
    '<h1><a href="https://www.woojer.com/">Sensory augmentation</a></h1><p>woojer</p>' +
    '<br><p>"Forget about just hearing sound, you can now feel sound. Woojer delivers an amplified level of immersion. Imagine standing in the front row of Tomorrowland, you know that oomph you feel in your body? That energy pulsating into your bones? That’s what Woojer feels like. Get everything that your headphones alone can’t deliver."</p><br><img src="img/r/vest2.png" height="150px">',

];
const expList=[
    '',
    "<p>Tack subjects eye movements without any further perturbation, to set the baseline for comparison</p><br><img style='width: 90%' src='img/icon/material.png'> <p>In each session, participants are asked to look at 5 pages of slide of different arrangements of the six images</p>",
    '<p>Subjects are asked to touch the material sample before looking at the screen, to check if there is any correlation between haptic and visual attention</p><br><img style=\'width: 90%\' src=\'img/icon/material.png\'>',
    '<p>Subjects are asked to listen to the sound sample while looking at the screen, to check if there is any correlation between auditory and visual attention</p>'+
        '<br><img onclick="playM(0)" style="padding: 10px" src="img/icon/cello.png" height="50px"><img onclick="playM(1)" style="padding: 10px"  src="img/icon/piano.png" height="50px"><img onclick="playM(2)" style="padding: 10px"  src="img/icon/organ.png" height="50px"><img onclick="playM(3)" style="padding: 10px"  src="img/icon/shakuhachi.png" height="50px"><img onclick="playM(4)" style="padding: 10px" src="img/icon/synthpad.png" height="50px"><br><img style=\'width: 90%\' src=\'img/icon/material.png\'>'
];
function researchPage(n){
    var research=document.getElementById("research")
    if(n==0){
        research.style.display='none'
    }else{
        research.innerHTML =
            researchList[n];
        research.style.display='block'
    }
};

function expPage(n){
    var exp=document.getElementById("exp")

    if(n==0){
        exp.style.display='none'
    }else{
        exp.innerHTML =
            expList[n];
        exp.style.display='block'
    }
};
audioList=['sound/cello1.mp3','sound/piano.mp3','sound/churchorgan.mp3','sound/shakuhachi.mp3','sound/pads.mp3',]
function playM(n){
    var thisAudio = document.createElement("audio");
    thisAudio.setAttribute('src',audioList[n]);
    thisAudio.play()
}



var width = window.innerWidth,
    height = window.innerHeight;
let arm,armPage,ring,album, emptyCircle;
var audio = document.createElement("audio");
audio.setAttribute('src','sound/piano.mp3')

var playMusic = function (d){
    audio.play()

    d3.select(this)
        .transition()
        .duration(1500)
        .attr('transform', 'rotate(-30 ' +width*0.22+' '+height*0.67+')');
    ring.attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
        .transition()
        .duration(150)
        .attr("y",height*0.27+15*Math.random())
}

var pauseMusic= function(d) {
    audio.pause();
    audio.currentTime = 0;
    d3.select(this)
        .transition()
        .duration(1500)
        .attr('transform', 'rotate(0 ' +width*0.2+' '+height*0.67+')');
    ring.attr("y",height*0.27)
}
armPage = d3.select('#vision-page')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
arm=armPage.append("image")
    .attr("xlink:href",  "img/arm.png")
    .attr("x", function(){ return width*0.11-13.1*height/64})
    .attr("height", height)
    .style("position",'absolute');
ring=armPage.append("image")
    .attr("xlink:href",  "img/greenBar.png")
    .attr("x", width*0.11)
    .attr("y",height*0.25 )
    .attr("width", "200")
    // .attr("height", "20")

    .style("position",'absolute');

album=armPage.append("image")
    .attr('id','greenCircle')
    .attr("xlink:href",  "img/greenCircle.png")
    .attr("x", width*0.1)
    .attr("y",height*0.67 )
    .attr("width", "200")
    .style("position",'absolute')
    .on("mouseover", playMusic)
    .on("mouseleave", pauseMusic);
emptyCircle=armPage.append('circle')
    .attr('r','100')
    .attr("cx", width*0.136)
    .attr("cy",height*0.73 )
    .style('stroke','#ffffff')
    .style('stroke-width',8)
    .style('stroke-dasharray','1 7')
    .style('fill','none')
    .style("position",'absolute');
