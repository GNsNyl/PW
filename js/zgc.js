// CHART
var zgcw,zgch;
// const zgc_width = document.getElementById('zgc-container').getBoundingClientRect().width - map_margin.left - map_margin.right;
// const zgc_height = document.getElementById('zgc-container').getBoundingClientRect().height - map_margin.top - map_margin.bottom;

let zgcsvg,zgcprojection,zgcland,zgcworld ;
let zgcroadland,zgcroadworld ;
let zgcbuildingworld;
let zgcfoodsvg, zgcfoodworld, zgcfoodSign,zgcfoodtextsvg ;
let zgccountworld;

d3.json("data/zgc/zgc.geojson", function(json) {

    // width and height
    zgcw = window.innerWidth;
    zgch = window.innerHeight;;

    // container zgcsvg
    zgcsvg = d3.select("#zgc-container")
        .append("svg")
        .attr("width", zgcw)
        .attr("height", zgch)
    ;
    // PLOT MAP
    zgcprojection = d3.geo.mercator()
        .scale(570000)
        .translate([zgcw/2, zgch/2])
        .center([116.385,39.96]);

    zgcland = d3.geo.path()
        .projection(zgcprojection);

    zgcworld = zgcsvg.selectAll(".out > path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", 'out')
        .attr("d", zgcland)
        .style("stroke-width", 1)
        // .style("fill","#ffffff")
        .style('stroke', "#000000");

});


d3.json("data/zgc/zgcbuilding.geojson", function(json) {

    zgcbuildingworld = zgcsvg.selectAll(".building > path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", 'building')

        .attr("d", zgcland)
        .style("stroke-width",0)
        .style("fill","#2d2d2d")
        // .style('stroke', "none");

});


d3.json("data/zgc/count.geojson", function(json) {

    // width and height

    zgccountworld = zgcsvg.selectAll(".count > path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", 'count')

        .attr("d", zgcland)
        .style("stroke-width",0)
        .style("opacity", function(d){
            return d.properties.Count_*0.03
        })
        .style("fill","#ffffff")
    // .style('stroke', "none");

});

d3.json("data/zgc/zgcroads.geojson", function(json) {

    zgcroadworld = zgcsvg.selectAll(".road > path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", 'road')
        .style("z-index", 20)
        .attr("d", zgcland)
        .style("stroke-width", function(d){
            if(d.properties.fclass=="primary"){
                return 1
            }else if(d.properties.fclass=="secondary") {
                return 0.7
            }else if(d.properties.fclass=="tertiary") {
                return 0.4
            }else{
                return 0.2}
        })
        .style('stroke', "#ffffff");

});

d3.json("data/zgc/zgcfood.geojson", function(json) {

    zgcfoodsvg = d3.select("#zgc-food-container")
        .append("svg")
        // .style("margin-top","-30vh")
        .attr("width", zgcw)
        .attr("height", zgch/2)
    ;
    var mouseoverfood = function(d) {

        d3.selectAll('.c'+d.typecode)
            .transition()
            .duration(150)
            .attr("r", 55);

        d3.select(this)
            .transition()
            .duration(50)
            .style("fill", '#000000')

    };

    var mouseleavefood = function(d) {
        d3.selectAll('.rest')
            .transition()
            .duration(150)
            .attr("r", 0.5);

        d3.select(this)
            // .style("stroke", "none")
            .transition()
            .duration(50)
            .style("fill", '#ffffff')

    };


    zgcfoodworld = zgcfoodsvg.selectAll(".food > circle")
        .data(json.features)
        .enter()

        .append("circle")
        .attr("class", function(d) {
            return "food rest"+" c"+String(d.properties.typecode).slice(0, 4)
        })
        .style("stroke-width",0.2)
        .style("fill","none")
        .style('stroke', "#ffffff")
        .attr("r", function(d) {
            return 0.5
        })

        .attr("cx", function(d) {
            return zgcprojection([d.properties.LONWGS84, d.properties.LATWGS84])[0];
        })
        .attr("cy", function(d) {
            return zgcprojection([d.properties.LONWGS84, d.properties.LATWGS84])[1];
        });

    zgcfoodSign=zgcfoodsvg.selectAll(".foodc>circle")
        .data([{"id":"0","typecode":"0500","name":"Food"},{"id":"1","typecode":"0501","name":"Chinese Food"},{"id":"2","typecode":"0502","name":"Fast Food"},{"id":"3","typecode":"0503","name":"Foreign Food"},{"id":"4","typecode":"0505","name":"Coffee"},{"id":"5","typecode":"0506","name":"Tea House"},{"id":"6","typecode":"0507","name":"Beverage"},{"id":"7","typecode":"0508","name":"Pastry"}])
        .enter()
        .append("circle")
        .attr('class', 'foodc')
        .style("stroke-width",0.2)
        .style("fill","#ffffff")
        .style('stroke', "#000000")
        .attr("r", 5)
        .attr("cx", function(d) {
            return zgcw/5+70*(d.id-4);})
        .attr("cy", 10)
        .on("mouseover", mouseoverfood)
        // .on("mousemove", mousemove)
        .on("mouseleave", mouseleavefood);


    zgcfoodtextsvg=zgcfoodsvg.selectAll(".foodt>text")
        .data([{"id":"0","typecode":"0500","name":"Food"},{"id":"1","typecode":"0501","name":"Chinese Food"},{"id":"2","typecode":"0502","name":"Fast Food"},{"id":"3","typecode":"0503","name":"Foreign Food"},{"id":"4","typecode":"0505","name":"Coffee"},{"id":"5","typecode":"0506","name":"Tea House"},{"id":"6","typecode":"0507","name":"Beverage"},{"id":"7","typecode":"0508","name":"Pastry"}])
        .enter()
        .append("text")
        .attr('class','foodt')
        .attr("fill","#000000")
        .attr("y", 30)
        .attr("x", function(d) {
            return zgcw/5+70*(d.id-4);})
        .style('text-anchor', 'middle')
        // .attr('transform', 'rotate(90 0 0)')
        .text(function(d){
            return d.name
        });



});


// [
//     0500
//     "中餐" 0501
//     快餐 0503
//     外国餐厅 0502
//     咖啡 0505
//     茶艺 0506
//     冷饮 0507
//     高点 0508； 0509
// ]


