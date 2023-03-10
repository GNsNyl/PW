const DUMMY_DATA = [
    {id:'d1', value:10,region:'USA'},
    {id:'d1', value:10,region:'china'},
    {id:'d1', value:10,region:'ger'},
    {id:'d1', value:10,region:'can'},
]
const data_container=d3.select('#data_container')
data_container
  .selectAll('p2')
  .data(DUMMY_DATA)
  .enter()
  .append('p')
  .text(dta => dta.region);