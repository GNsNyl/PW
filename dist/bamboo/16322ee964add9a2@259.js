// https://observablehq.com/@d3/ridgeline-plot@259
function _1(md){return(
md`# Ridgeline Plot

Ridgeline plots are an alternative to [horizon charts](/@mbostock/d3-horizon-chart) and small-multiple area charts that allow greater precision for a given vertical space at the expense of occlusion (overlapping areas).

This form is also known as a *joy plot* for its notable use on [the cover](/@mbostock/psr-b1919-21) of Joy Division’s [*Unknown Pleasures* album](https://en.wikipedia.org/wiki/Unknown_Pleasures). This name is controversial as it references the [sexual slavery practices](https://en.wikipedia.org/wiki/German_military_brothels_in_World_War_II) of the Nazis during World War II. However, Joy Division sought to [draw attention to](http://aviewfromtheannex.blogspot.com/2010/04/no-joy-division-was-not-into-fascism.html) the danger of fascism to society, not to celebrate it.

Data: [Moritz Klack](/@moklick)`
)}

function _chart(d3,DOM,width,height,xAxis,yAxis,data,y,area,line)
{
  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);
  
  const group = svg.append("g")
    .selectAll("g")
    .data(data.series)
    .join("g")
      .attr("transform", d => `translate(0,${y(d.name) + 1})`);

  group.append("path")
      .attr("fill", "#ddd")
      .attr("d", d => area(d.values));

  group.append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", d => line(d.values));

  return svg.node();
}


function _overlap(){return(
8
)}

function _height(data){return(
data.series.length * 17
)}

function _margin(){return(
{top: 40, right: 20, bottom: 30, left: 120}
)}

function _x(d3,data,margin,width){return(
d3.scaleTime()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])
)}

function _y(d3,data,margin,height){return(
d3.scalePoint()
    .domain(data.series.map(d => d.name))
    .range([margin.top, height - margin.bottom])
)}

function _z(d3,data,overlap,y){return(
d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([0, -overlap * y.step()])
)}

function _xAxis(height,margin,d3,x,width){return(
g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0))
)}

function _yAxis(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(0).tickPadding(4))
    .call(g => g.select(".domain").remove())
)}

function _area(d3,x,data,z){return(
d3.area()
    .curve(d3.curveBasis)
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y0(0)
    .y1(d => z(d))
)}

function _line(area){return(
area.lineY1()
)}

async function _data(d3,FileAttachment)
{
  const data = d3.csvParse(await FileAttachment("traffic.csv").text(), d3.autoType);
  const dates = Array.from(d3.group(data, d => +d.date).keys()).sort(d3.ascending);
  return {
    dates: dates.map(d => new Date(d)),
    series: d3.groups(data, d => d.name).map(([name, values]) => {
      const value = new Map(values.map(d => [+d.date, d.value]));
      return {name, values: dates.map(d => value.get(d))};
    })
  };
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["traffic.csv", {url: new URL("./files/4ea24221b4db5e916702f2056cc385f5a14a80a44c7c304af89957c5cb6c5707cf64372ab0c4ecd9858375af251ce70e9eb397da832f22afc57faf2f54eec9f9.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","xAxis","yAxis","data","y","area","line"], _chart);
  main.variable(observer("overlap")).define("overlap", _overlap);
  main.variable(observer("height")).define("height", ["data"], _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","data","margin","height"], _y);
  main.variable(observer("z")).define("z", ["d3","data","overlap","y"], _z);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], _yAxis);
  main.variable(observer("area")).define("area", ["d3","x","data","z"], _area);
  main.variable(observer("line")).define("line", ["area"], _line);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
  return main;
}
