// 0: only image
// 1: touch
// 2: sound
let container,imgContainer
let svgkk,svgivy, svglafina, svgtara,svgyoutian,svganony;
const svgList=[svgkk,svgivy, svglafina, svgtara,svgyoutian,svganony];
const nameList=['kk','ivy','lafina','tara','youtian','anony1'];
const colorList=['#FFFF00','#F08080','#00FFFF','#00FF00','#FFF8DC','#F4A460',]
const materialList=['b','c','l','u','w','x'];
imgContainer=document.getElementById('img-container')
for (let i=0;i<6;i++){
        var mimg=document.createElement('img')
        mimg.src='img/material/'+materialList[i]+'.png';
        mimg.style.width='15px';
        mimg.style.marginLeft='15px';
        mimg.style.opacity=0.5;
        mimg.className=materialList[i];
        imgContainer.appendChild(mimg)
}
container=d3.select('#data-container')
const r=40;
const t=400;
let w=window.innerWidth/7;
let h=window.innerHeight;

var mouseover = function(d) {

        var cls = d3.select(this).attr("class");
        d3.selectAll('.'+cls)
            .transition()
            .duration(50)
            .style("opacity", 1)
};
var mouseleave = function(d) {
        var cls = d3.select(this).attr("class");
        d3.selectAll('.'+cls)
            .transition()
            .duration(50)
            .style("opacity", 0.5)
};
for(let k=0;k<6;k++) {

        svgList[k] = container.append ('svg')
            .style ('width' , w)
            .style ('height' , h)
        ;
        svgList[k].append('text')
            .text(nameList[k])
            .attr('x',0)
            .attr('y',t+20)
            .style('stroke',"#ffffff")
        svgList[k].append('line')
            .style('stroke','#ffffff')
            .style ("stroke-width" , 0.3)
            .attr('x1',0)
            .attr('y1',t)
            .attr('x2',80)
            .attr('y2',t)
            .style("opacity", 0.5);
        svgList[k].append('line')
            .style('stroke','#ffffff')
            .style ("stroke-width" , 0.3)
            .attr('x1',0)
            .attr('y1',t-25)
            .attr('x2',80)
            .attr('y2',t-25)
            .style("opacity", 0.5)
        ;

        d3.csv ("./data/fixation/"+nameList[k]+"count.csv" , function (csv) {

                for (let i = 0; i < 6; i++) {
                        for (let j = 0; j < 2; j++) {
                                var d = t- csv[j][materialList[i]]
                                var dd = t- csv[j+1][materialList[i]]
                                svgList[k].append ('line')
                                    .attr ('class' , materialList[i])
                                    .style ("stroke" , colorList[i])
                                    .style ("stroke-width" , 1)
                                    .attr ('x1' , r * j)
                                    .attr ('y1' , d)
                                    .attr ('x2' , r * j + r)
                                    .attr ('y2' , dd)
                                    .style("opacity", 1)
                                    .on("mouseover", mouseover)
                                    .on("mouseleave", mouseleave);
                        }}
        });

        d3.csv ("./data/fixation/"+nameList[k]+"sum.csv" , function (csv) {

                for (let i = 0; i < 6; i++) {
                        for (let j = 0; j < 3; j++) {
                                var h = 2*t- 0.01*csv[j][materialList[i]]
                                svgList[k].append ('line')
                                    .attr ('class' , materialList[i])
                                    .style ("stroke" , colorList[i])
                                    .style ("stroke-width" , 1)
                                    .attr ('x1' , r/3 * i+3*j)
                                    .attr ('y1' , 2*t)
                                    .attr ('x2' , r/3 * i+3*j)
                                    .attr ('y2' , h)
                                    .style("opacity", 1)
                                    .on("mouseover", mouseover)
                                    .on("mouseleave", mouseleave)

                        }}
        });

}
