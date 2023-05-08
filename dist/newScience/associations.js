height = 800;
width = 600;
margin = 50;

const instrumentList=['Flute','Cymbal','HighPitchSound','Bass','Piano','Contrabass','Tambourine','Trumpet','WindInstrument',
                'RockMusic','Brass','Guitar']
const qualityList = ['Wood','Paper','Metallic','Glass','Solid','Fluffy','Silk','StrawScratchString'];
letterheight = (height - (2 * margin)) / instrumentList.length/2;
// letterheight2 = (height - (2 * margin)) / qualityList.length;

letterwidth = (width - (2 * margin)) ;
const assData=[
    [0,0],[0,1],[0,2],[1,2],[2,3],[3,2],[4,4],[4,0],[5,5],[6,2],[7,2],[8,6],[9,2],[10,2],[11,2],[11,7]
]

var onClick= function (){
    var eachClass=d3.select(this).attr('data-letter')
    d3.selectAll('.line').style('opacity',0)
    d3.selectAll('.'+eachClass).style('opacity',1)

        // .style('stroke-width',3)
}
var onMouseLeave= function (){
    // d3.select(this).style("stroke-width", 0)

    // var eachClass=d3.select(this).attr('data-letter')
    d3.selectAll('.line').style('opacity',1)
    // d3.selectAll('.'+eachClass).style('opacity',1)

    // .style('stroke-width',3)
}


var asssvg = d3.select(".chart")
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr('class', "canvas")
    .attr("width", width - (margin * 2))
    .attr("height", height - (margin * 2))
    .attr("transform", "translate(" + margin + "," + 250+ ")");
// var background = asssvg.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("transform", "translate(" + -margin + ", " + -margin + ")")
//     .style("fill", "#efefef");


// Add the valueline path.

var lines = asssvg.append("g").attr("class", "lines");


// create First column

var letters = asssvg.append("g")
    .attr("class", "letters");

var letterbox = letters.selectAll("circle.letterbox")
    .data(instrumentList).enter()
    .append("circle")
    .attr("class", "letterbox")
    .attr("cy", function(d,i) {
        return i * letterheight;
    })
    .attr("cx", function(){
        return 0 * letterwidth;
    })
    .attr("data-letter", function(d){
        return d;
    })
    .attr("data-pos", function(){
        return 0;
    })
    .attr("r", 8)
    .style("fill", "rgba(255,255,255,0.23)")
    .attr("transform", "translate(0,-4)")

    .on("mouseleave", onMouseLeave)
    .on("mouseover", onClick);


var letter = letters.selectAll("text.letter")
    .data(instrumentList).enter()
    .append("text").attr("class", "letter")
    .text(function(d,i){
        return d;
    })
    .attr("y", function(d,i) {
        return i * letterheight;
    })
    .attr("x", function(){
        return 0 * letterwidth;
    })



var letters2 = asssvg.append("g")
    .attr("class", "letters2");

var letterbox2 = letters.selectAll("circle.letterbox2")
    .data(qualityList).enter()
    .append("circle")
    .attr("class", "letterbox2")
    .attr("cy", function(d,i) {
        return i * letterheight;
    })
    .attr("cx", function(){
        return 1 * letterwidth;
    })
    .attr("data-letter", function(d){
        return d;
    })
    .attr("data-pos", function(){
        return 0;
    })
    .attr("r", 8)
    .style("fill", "rgba(255,255,255,0.23)")
    .attr("transform", "translate(0,-4)")
    .on("mouseleave", onMouseLeave)
    .on("mouseover", onClick)



var letter2 = letters2.selectAll("text.letter2")
    .data(qualityList).enter()
    .append("text").attr("class", "letter2")
    .text(function(d,i){
        return d;
    })
    .attr("y", function(d,i) {
        return i * letterheight;
    })
    .attr("x", function(){
        return 1 * letterwidth
    });
    // .attr('onmouseover', mouseover);


// function render(input) {

    // lines.selectAll('g.line').remove();

    var line = lines.selectAll("g.line").data(assData).enter()
        .append("line")
        .attr("class", function(d){ return "line "+instrumentList[d[0]]+' '+qualityList[d[1]]})
        .style('stroke-width',1)
        // .style("opacity", function(d,i){
        //     return 100 / newdata.length;
        // })
        .attr("x1", 0)
        .attr("y1", function (d){

            return d[0]*letterheight
        })
        .attr("x2", letterwidth)
        .attr("y2", function (d){

            return d[1]*letterheight
        });
// }


// render();


// function resetSettings(){
//     settings = [];
//     render();
// }