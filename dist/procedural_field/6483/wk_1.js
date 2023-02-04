// TUTORIAL
// https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07

//VISUALIZATION ONE-----------------------------------------------------------------------------------------------------------------------------
const wk_1_margin = {top: 0, right: 0, bottom: 0, left: 0};
const wk_1_1_width = document.getElementById('wk_1_1').getBoundingClientRect().width - wk_1_margin.left - wk_1_margin.right;
const wk_1_1_height = document.getElementById('wk_1_1').getBoundingClientRect().height - wk_1_margin.top - wk_1_margin.bottom;

const svg = d3.select('#wk_1_1').append("svg")
    .attr("width", wk_1_1_width + wk_1_margin.left + wk_1_margin.right)
    .attr("height", wk_1_1_height + wk_1_margin.top + wk_1_margin.bottom)
    .append("g")
    .attr("transform", "translate(" + wk_1_margin.left + "," + wk_1_margin.top + ")");


function convert() {
    var input = document.getElementById("ti1").value;
    let output = [];

    for (var i = 0; i < input.length; i++) {
        output.push(input[i].charCodeAt(0).toString(2))
    }
    // console.log("output_int: ", output);
    console.log("input: ", input[0]);
    updateVisualization(output);
}


let rect_w = 3;
let rect_h= 600;
let x_pos;
let y_pos = (wk_1_1_height - rect_h)/2


function updateVisualization(_output) {

    let output_letter = [];
    let output_index = [];

    for (let i = 0; i < _output.length; i++) {
        let letter = _output[i].split('');
        // console.log("letter: ", letter)
        // console.log("letter: ", letter.length)
        for(let j = 0; j < letter.length; j++) {
            output_letter.push(letter[j]);
            output_index.push(i);
        }
    }

    // console.log("output_index", output_index[0], output_index);
    // console.log(output_letter[0][0])

    x_pos = 0;
    // console.log(output_letter[0], output_letter.length);

    // appending the chart and tooltips
    let rect_group = svg.selectAll("rect").data(output_letter);
    let rect_tooltip = svg.append('g').append('text').classed('rect_tooltip_text', true);

    rect_group
        .enter()
        .append("rect")
        .classed("rect_group", true)
        .merge(rect_group)
        .attr('x', (d, i) => i * rect_w)
        .attr('y', y_pos)
        .attr('width', rect_w)
        .attr('height', rect_h)
        .attr('fill', function(d) {
            if(d==1){
                return 'rgba(255,255,255,0.9)';
            }
            else{
                return 'rgb(0,0,0)';
            }
        })
        .on('mouseover', function(event, d) {
            let mouse = d3.pointer(event);
            d3.selectAll('rect').style('opacity', '0.5')
            d3.select(this).style('opacity', '0.9')

            // console.log(output_index[d],output_index)

            svg.selectAll('.rect_tooltip_text')
                .data(output_letter)
                .style("opacity", 1)
                .text(
                    function(d,i){ return d;
                    })
                .attr("x", mouse[0])
                .attr("y", wk_1_1_height-10)
                // .attr('alignment-baseline', 'alphabetic')
                .attr('text-anchor','middle')
                .attr('fill', 'rgb(255,255,255)')

        })
        .on('mouseout', function(event, d) {
            d3.selectAll('rect').style('opacity', '0.9')
            svg.selectAll('.rect_tooltip_text').style("opacity", 0)
        })

    rect_group.exit().remove();


    // var timesRun = 0;
    // var interval = setInterval(function(){
    //     timesRun += 1;
    //
    //     d3.selectAll('rect')
    //         .transition()
    //         .duration(output_letter.length*5000)
    //         .attr("transform", "translate("+ -output_letter.length*100 +",0)")
    //         .ease(d3.easeElastic);
    //
    //     if(timesRun === 1){
    //         clearInterval(interval);
    //     }
    //     console.log("transition")
    // }, 2000);


}


//VISUALIZATION TWO-----------------------------------------------------------------------------------------------------------------------------

// let song, buttton, amp;
// let volHistory = [];
// const wk_1_2_width = document.getElementById('wk_1_2').getBoundingClientRect().width - wk_1_margin.left - wk_1_margin.right;
// const wk_1_2_height = document.getElementById('wk_1_2').getBoundingClientRect().height - wk_1_margin.top - wk_1_margin.bottom;
//
//
// function preload() {
//     song = loadSound('audio/sound_1.mp3');
//     getAudioContext().resume();
// }
//
// function setup() {
//     let myCanvas = createCanvas(wk_1_2_width, wk_1_2_height);
//     myCanvas.parent('wk_1_2');
//     song.play();
//     amp = new p5.Amplitude();
// }
//
// function draw() {
//     background(0);
//     let vol = amp.getLevel();
//     volHistory.push(vol);
//
//     noFill();
//     beginShape();
//     for (let x = 0; x < volHistory.length; x++) {
//         stroke(255)
//         let y = map(volHistory[x], 0, 1, height, 0);
//         vertex(x, y);
//     }
//     endShape();
//
//     if(volHistory.length > width) {
//         volHistory.splice(0,1);
//     }
//
//     // ellipse(300, 300, vol*300, vol*300);
//     console.log(vol)
// }
//
// // Chrome 70 will require user gestures required to enable web audio api
// // Click on the web page to start audio
// function touchStarted() {
//     getAudioContext().resume();
// }