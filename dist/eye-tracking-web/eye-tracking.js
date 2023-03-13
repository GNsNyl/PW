// try {
// Configure graphics
var width = window.innerWidth,
    height = window.innerHeight;

let grf,imgsleft,imgsright,imgstb;


d3.json("data/image.json", function(json){
  grf = d3.select('#graphic')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

 imgsleft = grf.selectAll(".left>image")
    .data(json)
    .enter()
     .append("image")
     .attr("class","left")
    .attr("xlink:href", function(d){
        return "img/"+d.left
    })
    .attr("x", function(d){
        let q = d.id%4;
        return 200*q+200
    })
    .attr("y", function(d){
        let row = Math.floor(d.id/4)

        return 200*row
    })
     .attr("width", "150")
     .attr("height", "150");

    imgsright = grf.selectAll(".right>image")
        .data(json)
        .enter()
        .append("image")
        .attr("class","right")

        .attr("xlink:href", function(d){

            return "img/"+d.right
        })
        .attr("x", function(d){
            let q = d.id%4;
            return 200*q+200
        })
        .attr("y", function(d){
            let q = d.id%4;
            let row = Math.floor(d.id/4)

            return 200*row
        })
        .attr("width", "150")
        .attr("height", "150");
    //
    imgstb = grf.selectAll(".tb>image")
        .data(json)
        .enter()

        .append("image")
.attr("class","tb")

        .attr("xlink:href", function(d){

            return "img/"+d.tb
        })
        .attr("x", function(d){
            let q = d.id%4;
            return 200*q+200
        })
        .attr("y", function(d){
            let q = d.id%4;
            let row = Math.floor(d.id/4)

            return 200*row
        })
        .attr("width", "150")
        .attr("height", "150");


})

window.onresize=function updateWindow(){
    w = window.innerWidth || e.clientWidth || g.clientWidth;
    h = window.innerHeight|| e.clientHeight|| g.clientHeight;

    grf.attr("width", w).attr("height", h);
};