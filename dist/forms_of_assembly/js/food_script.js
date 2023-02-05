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
      .scale(205000)
      // .translate([200, 280])
      .translate([w/2, h/2])
      .center([116.400,40.010]);
  var land = d3.geo.path()
      .projection(projection);
  var world = svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", land)
    .style("fill", "#000000")
      .style('stroke', '#1e1e1e');
  // projection.fitExtent([[116.2202,40.0239], [116.1214,40.1159]]);


  // food
  var food;
  d3.json("img/food.json", function(data) {
    food = svg.selectAll("circle")
      .data(data.features)
      .enter()
      .append("circle")
        // .attr("cx", function(d) {
        //   return projection([116.4, 40.02])[0];
        // })
        // .attr("cy", function(d) {
        //   return projection([116.4, 40.02])[1];
        // })

        .style("opacity", 0)
         .transition()
          .delay(6000)
          .duration(2000)
      //   .attr("cx", function(d) {
      //       return projection([116.4+3*(Math.random() - 0.3), 40.02+1.5*(Math.random() - 0.35)])[0]
      //
      //   })
      //   .attr("cy", function(d) {
      //       return projection([116.4, 40.02])[1]
      //     })
      //
      // .attr("r", function(d) {
      //   return 0.8
      // })
        // .attr("cl", function(d) {
        //   return d.typecode
        // })
        .style("fill", "#ffffff")
        .style("opacity", 1)
        .attr("r", function(d) {
            return 0.2
        })
        .attr("cx", function(d) {
            return projection([d.LONGCJ02, d.LATGCJ02])[0];
        })
        .attr("cy", function(d) {
            return projection([d.LONGCJ02, d.LATGCJ02])[1];
        });
        //  .transition()
        // .delay(14000)
        // .duration(2000)
        // .attr("r", function(d) {
        //   return 0.2
        // })
        // .attr("cx", function(d) {
        //   return projection([d.LONGCJ02, d.LATGCJ02])[0];
        // })
        // .attr("cy", function(d) {
        //   return projection([d.LONGCJ02, d.LATGCJ02])[1];
        // });
    
    // // TOOLTIP
    // meteors.on("mouseover", function(d) {
    //   var xPosition = parseFloat(d3.select(this).attr("cx")) + 20;
    //   if (xPosition > window.innerWidth / 2 + 30) {
    //     xPosition = parseFloat(d3.select(this).attr("cx")) - 220;
    //   }
    //   var yPosition = parseFloat(d3.select(this).attr("cy")) + 50;
    //   //Update the tooltip position and value
    //   d3.select("#tooltip")
    //     .style("left", xPosition + "px")
    //     .style("top", yPosition + "px")
    //     .select("#name")
    //     .text(d.properties.name);
    //   d3.select("#tooltip")
    //     .select("#address")
    //     .text(d.address);
    //   d3.select("#tooltip")
    //     .select("#name")
    //     .text(d.name);
    //   d3.select("#tooltip")
    //     .select("#XIAOLEI")
    //
    //   //Show the tooltip
    //   d3.select("#tooltip").classed("hidden", false);
    //  });

    // meteors.on("mouseout", function() {
    //   //Hide the tooltip
    //   d3.select("#tooltip").classed("hidden", true);
    // });
    
  });
   // var food_12;
   //  d3.json("img/2012_food.json", function(data) {
   //      food_12 = svg.selectAll("circle")
   //          .data(data.features)
   //          .enter()
   //          .append("circle")
   //          .style("opacity", 0)
   //          .transition()
   //          .duration(2000)
   //          .attr("cx", function(d) {
   //              return projection([116.4+3*(Math.random() - 0.3), 40.02+1.5*(Math.random() - 0.35)])[0]
   //          })
   //          .attr("cy", function(d) {
   //              return projection([116.4, 40.02])[1]
   //          })
   //          .attr("r", function(d) {
   //              return 0.8
   //          })
   //          .style("fill", "#e05a5a")
   //          .style("opacity", 1)
   //          .transition()
   //          .delay(4000)
   //          .duration(4000)
   //          .attr("r", function(d) {
   //              return 0.2
   //          })
   //          .attr("cx", function(d) {
   //              return projection([d.LON, d.LAT])[0];
   //          })
   //          .attr("cy", function(d) {
   //              return projection([d.LON, d.LAT])[1];
   //          });
   //  });

    // setTimeout(addTravel,8000)
    addTravel()
    function addTravel(){
        var travelLine;
        d3.json("img/csvjson.json", function(data) {
            travelLine = svg.selectAll("line")

                .data(data.features)
                // .attr("d",line)
                .enter()
                .append("line")
                .style("stroke", "#00ffea")
                .style("stroke-width", 0.1)
                .attr("x1", function(d) {
                    return projection([116+d.order/13333, d.LATGCJ02])[0];
                })
                .attr("x2", function(d) {
                    return projection([116+d.order/13333, d.LATGCJ02])[0]
                })
                .attr("y1", function(d) {
                    return projection([d.LONGCJ02, 40.02])[1];
                })
                .attr("y2", function(d) {
                    return projection([d.LONGCJ02, 40.02])[1]+80*(0.5-Math.random());
                })
                .transition()
                .delay(2000)
                .duration(4000)
                .attr("y2", function(d) {
                    return projection([d.LONGCJ02, 40.02])[1]+10*(0.5-Math.random());
                })
                .transition()
                .delay(2000)
                .duration(4000)
                .attr("x1", function(d) {
                    return projection([116+d.order/13333, d.LATGCJ02])[0];
                })
                .attr("x2", function(d) {
                    return projection([116+d.order/13333+0.2, d.LATGCJ02])[0]
                })
                .attr("y1", function(d) {
                    return projection([d.LONGCJ02, 40.02])[1];
                })
                .attr("y2", function(d) {
                    return projection([d.LONGCJ02, 40.02+0.2])[1];
                })
                .transition()
                .delay(2000)
                .duration(4000)
                .attr("x1", function(d) {
                    return projection([d.LONGCJ02, d.LATGCJ02])[0];
                })
                .attr("x2", function(d) {
                    return projection([d.LONGCJ02+0.2, d.LATGCJ02])[0];
                })
                .attr("y1", function(d) {
                    return projection([d.LONGCJ02, d.LATGCJ02])[1];
                })
                .attr("y2", function(d) {
                    return projection([d.LONGCJ02, d.LATGCJ02+0.2])[1];
                })
                .transition()
                .delay(2000)
                .duration(4000)
                .attr("x1", function(d) {
                    return projection([d.LONGCJ02, d.LATGCJ02])[0];
                })
                .attr("x2", function(d) {
                    return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 10*(0.5-Math.random());
                })
                .attr("y1", function(d) {
                    return projection([d.LONGCJ02, d.LATGCJ02])[1];
                })
                .attr("y2", function(d) {
                    return projection([d.LONGCJ02, d.LATGCJ02])[1]+10*(0.5-Math.random());
                })



            //
            //     .attr("x2", function(d) {
            //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 1*(0.5-Math.random());
            //     })
            //
            //     .attr("y2", function(d) {
            //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+1*(0.5-Math.random());
            //     })
            //     .transition()
            //     .delay(2000)
            //     .duration(4000)
            //
            //     .attr("x2", function(d) {
            //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 10*(0.5-Math.random());
            //     })
            //
            //     .attr("y2", function(d) {
            //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+10*(0.5-Math.random());
            //     })
            //     .transition()
            //     .delay(2000)
            //     .duration(4000)
            //
            //     .attr("x2", function(d) {
            //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 1*(0.5-Math.random());
            //     })
            //
            //     .attr("y2", function(d) {
            //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+1*(0.5-Math.random());
            //     })
            //     .transition()
            //     .delay(2000)
            //     .duration(4000)
            //
            //     .attr("x2", function(d) {
            //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 10*(0.5-Math.random());
            //     })
            //
            //     .attr("y2", function(d) {
            //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+10*(0.5-Math.random());
            //     })
            // .attr("x1", function(d) {
            //     return projection([116.4+3*(Math.random() - 0.3), 40.02+1.5*(Math.random() - 0.35)])[0];
            // })
            // .attr("x2", function(d) {
            //     return projection([116.4+3*(Math.random() - 0.3), 40.02+1.5*(Math.random() - 0.35)])[0];
            // })
            // .attr("y1", function(d) {
            //     return projection([116.4, 40.02])[1]
            // })
            // .attr("y2", function(d) {
            //     return projection([116.4, 40.02])[1]+10*(0.5-Math.random());
            // })
            ;

        });
    }




        // // TOOLTIP
        // meteors.on("mouseover", function(d) {
        //   var xPosition = parseFloat(d3.select(this).attr("cx")) + 20;
        //   if (xPosition > window.innerWidth / 2 + 30) {
        //     xPosition = parseFloat(d3.select(this).attr("cx")) - 220;
        //   }
        //   var yPosition = parseFloat(d3.select(this).attr("cy")) + 50;
        //   //Update the tooltip position and value
        //   d3.select("#tooltip")
        //     .style("left", xPosition + "px")
        //     .style("top", yPosition + "px")
        //     .select("#name")
        //     .text(d.properties.name);
        //   d3.select("#tooltip")
        //     .select("#address")
        //     .text(d.address);
        //   d3.select("#tooltip")
        //     .select("#name")
        //     .text(d.name);
        //   d3.select("#tooltip")
        //     .select("#XIAOLEI")
        //
        //   //Show the tooltip
        //   d3.select("#tooltip").classed("hidden", false);
        //  });

        // meteors.on("mouseout", function() {
        //   //Hide the tooltip
        //   d3.select("#tooltip").classed("hidden", true);
        // });



  // RESPONSIVE WIDTH
  window.onresize = function(){
    // new width
    var width = window.innerWidth;
    svg.attr("width", width);
    // new map
    var newProjection = d3.geo.mercator().translate([width/2, h/2]);
    land.projection(newProjection);
    world.attr("d", land);
    food.attr("cx", function(d) {
      return newProjection([d.LONGCJ02, d.LATGCJ02])[0];
    });
  };
  
});