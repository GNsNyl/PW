// CHART
d3.json("img/beijing-municipality_1140 copy.geojson", function(json) {
  
  // width and height
  var w = window.innerWidth;
  var h = window.innerHeight;;
  
  // container svg
  var svg = d3.select("#map")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              // .classed("chart-wrap", true)
              .call(d3.behavior.zoom().on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
              }))
              .append("g");
  
  // PLOT MAP

  var projection = d3.geo.mercator()
      // .scale([2])
      .scale(1200000)
      // .translate([200, 280])
      .translate([w/2, h/2])
      .center([116.309,39.98]);
  var land = d3.geo.path()
      .projection(projection);
  var world = svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", land)
    // .style("fill", "#000000")
      .style("stroke-width", 0.6)

      .style('stroke', '#ffffff');
  // projection.fitExtent([[116.2202,40.0239], [116.1214,40.1159]]);

    var food_12;
    d3.json("img/2012_food.json", function(data) {
        food_12 = svg.selectAll("circle")
            .data(data.features)
            .enter()
            .append("circle")
            .style("opacity", 0.5)

            .attr("r", function(d) {
                return 300
            })
            .attr("cx", function(d) {
                return projection([d.LON, d.LAT])[0];
            })
            .attr("cy", function(d) {
                return projection([d.LON, d.LAT])[1];
            })
            .style("fill", "none")

            .style("stroke", "#ff7c7c")
            .style("stroke-width", 0.1)
    });
  // food
  // var food;
  // d3.json("img/food.json", function(data) {
  //   food = svg.selectAll("circle")
  //     .data(data.features)
  //     .enter()
  //     .append("circle")
  //       // .attr("cx", function(d) {
  //       //   return projection([116.4, 40.02])[0];
  //       // })
  //       // .attr("cy", function(d) {
  //       //   return projection([116.4, 40.02])[1];
  //       // })
  //       .attr("cx", function(d) {
  //           return 800+100*Math.sin(2*Math.random()*Math.PI)
  //
  //       })
  //       .attr("cy", function(d) {
  //           return 500+100*Math.cos(2*Math.random()*Math.PI)
  //       })
  //       .style("opacity", 1)
  //       .attr("r", function(d) {
  //           return 5
  //       })
  //       .transition()
  //       .delay(6000)
  //       .duration(2000)
  //       // .style("opacity", 0)
  //       .style("fill", "#ffffff")
  //       // .style("opacity", 1)
  //       .attr("r", function(d) {
  //           return 0.2
  //       })
  //       .attr("cx", function(d) {
  //           return projection([d.LONGCJ02, d.LATGCJ02])[0];
  //       })
  //       .attr("cy", function(d) {
  //           return projection([d.LONGCJ02, d.LATGCJ02])[1];
  //       })
  //   ;
  // });

    var food3;
    d3.json("img/food.json", function(data) {
        food3 = svg.selectAll("circle")
            .data(data.features)
            .enter()
            .append("circle")
            .transition()
              .delay(3000)
              .duration(2000)
            .style("opacity", 0.5)
            //
            // .attr("r", function(d) {
            //     return 220
            // })
            // .attr("cx", function(d) {
            //     return 500;
            // })
            // .attr("cy", function(d) {
            //     return 500;
            // })
            .style("fill", "none")

            .style("stroke", "#24ff00")
            .style("stroke-width", 0.1)


            .attr("r", function(d) {
                return 300
            })
            // .transition()
            // .delay(6000)
            // .duration(2000)
            .attr("cx", function(d) {
                return projection([d.LONGCJ02, d.LATGCJ02])[0];
            })
            .attr("cy", function(d) {
                return projection([d.LONGCJ02, d.LATGCJ02])[1];
            })
        ;
    });


    // setTimeout(addTravel,8000)
    // addTravel()
    // function addTravel(){
    //     var travelLine;
    //     d3.json("img/csvjson.json", function(data) {
    //         travelLine = svg.selectAll("line")
    //
    //             .data(data.features)
    //             // .attr("d",line)
    //             .enter()
    //             .append("line")
    //             .style("stroke", "#ffffff")
    //             .style("stroke-width", 0.1)
    //             // .style("opacity", 0)
    //             //
    //             // // .attr("x1", function(d) {
    //             // //     return projection([116+d.order/13333, d.LATGCJ02])[0];
    //             // // })
    //             // // .attr("x2", function(d) {
    //             // //     return projection([116+d.order/13333, d.LATGCJ02])[0]
    //             // // })
    //             // // .attr("y1", function(d) {
    //             // //     return projection([d.LONGCJ02, 40.02])[1];
    //             // // })
    //             // // .attr("y2", function(d) {
    //             // //     return projection([d.LONGCJ02, 40.02])[1]+80*(0.5-Math.random());
    //             // // })
    //             // .transition()
    //             // .delay(2000)
    //             // .duration(4000)
    //             // .style("opacity", 1)
    //
    //             // .attr("y2", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02])[1]+50*(0.5-Math.random());
    //             // })
    //             // .transition()
    //             // .delay(2000)
    //             // .duration(4000)
    //             // .attr("x1", function(d) {
    //             //     return projection([116+d.order/13333, d.LATGCJ02])[0];
    //             // })
    //             // .attr("x2", function(d) {
    //             //     return projection([116+d.order/13333+0.2, d.LATGCJ02])[0]
    //             // })
    //             // .attr("y1", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02])[1];
    //             // })
    //             // .attr("y2", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02+0.2])[1];
    //             // })
    //             // .transition()
    //             // .delay(2000)
    //             // .duration(4000)
    //             // .attr("x1", function(d) {
    //             //     return projection([d.LONGCJ02, d.LATGCJ02])[0];
    //             // })
    //             // .attr("x2", function(d) {
    //             //     return projection([d.LONGCJ02+0.2, d.LATGCJ02])[0];
    //             // })
    //             // .attr("y1", function(d) {
    //             //     return projection([d.LONGCJ02, d.LATGCJ02])[1];
    //             // })
    //             // .attr("y2", function(d) {
    //             //     return projection([d.LONGCJ02, d.LATGCJ02+0.2])[1];
    //             // })
    //             // .transition()
    //             // .delay(2000)
    //             // .duration(4000)
    //             .attr("x1", function(d) {
    //                 return projection([d.LONGCJ02, d.LATGCJ02])[0];
    //             })
    //             .attr("x2", function(d) {
    //                 return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 50*(0.5-Math.random());
    //             })
    //             .attr("y1", function(d) {
    //                 return projection([d.LONGCJ02, d.LATGCJ02])[1];
    //             })
    //             .attr("y2", function(d) {
    //                 return projection([d.LONGCJ02, d.LATGCJ02])[1]+50*(0.5-Math.random());
    //             })
    //             .style("opacity", 0)
    //
    //             // .attr("x1", function(d) {
    //             //     return projection([116+d.order/13333, d.LATGCJ02])[0];
    //             // })
    //             // .attr("x2", function(d) {
    //             //     return projection([116+d.order/13333, d.LATGCJ02])[0]
    //             // })
    //             // .attr("y1", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02])[1];
    //             // })
    //             // .attr("y2", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02])[1]+80*(0.5-Math.random());
    //             // })
    //             .transition()
    //             // .delay(2000)
    //             .duration(4000)
    //             .style("opacity", 1)
    //
    //
    //
    //         //
    //         //     .attr("x2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 1*(0.5-Math.random());
    //         //     })
    //         //
    //         //     .attr("y2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+1*(0.5-Math.random());
    //         //     })
    //         //     .transition()
    //         //     .delay(2000)
    //         //     .duration(4000)
    //         //
    //         //     .attr("x2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 10*(0.5-Math.random());
    //         //     })
    //         //
    //         //     .attr("y2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+10*(0.5-Math.random());
    //         //     })
    //         //     .transition()
    //         //     .delay(2000)
    //         //     .duration(4000)
    //         //
    //         //     .attr("x2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 1*(0.5-Math.random());
    //         //     })
    //         //
    //         //     .attr("y2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+1*(0.5-Math.random());
    //         //     })
    //         //     .transition()
    //         //     .delay(2000)
    //         //     .duration(4000)
    //         //
    //         //     .attr("x2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 10*(0.5-Math.random());
    //         //     })
    //         //
    //         //     .attr("y2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+10*(0.5-Math.random());
    //         //     })
    //         // .attr("x1", function(d) {
    //         //     return projection([116.4+3*(Math.random() - 0.3), 40.02+1.5*(Math.random() - 0.35)])[0];
    //         // })
    //         // .attr("x2", function(d) {
    //         //     return projection([116.4+3*(Math.random() - 0.3), 40.02+1.5*(Math.random() - 0.35)])[0];
    //         // })
    //         // .attr("y1", function(d) {
    //         //     return projection([116.4, 40.02])[1]
    //         // })
    //         // .attr("y2", function(d) {
    //         //     return projection([116.4, 40.02])[1]+10*(0.5-Math.random());
    //         // })
    //         ;});
    // }

  // RESPONSIVE WIDTH
  window.onresize = function(){
    // new width
    var width = window.innerWidth;
    svg.attr("width", width);
    // new map
    var newProjection = d3.geo.mercator().translate([width/2, h/2]);
    land.projection(newProjection);
    world.attr("d", land);
    // food.attr("cx", function(d) {
    //   return newProjection([d.LONGCJ02, d.LATGCJ02])[0];
    // });
  };
  
});