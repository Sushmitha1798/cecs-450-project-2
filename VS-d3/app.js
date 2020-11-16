const canvas = d3.select(".canva");

 
const svg = canvas.append("svg")
            .attr('width', "80%")
            .attr('height',800);

const circle = svg.selectAll("circle");

d3.json('bioTree/p2TreeData.json').then(data=>{
    circle.data(data)
    .enter().append("circle")
    .transition()
    .delay(function(d,i){return  d.sequence/1;})
    .attr("r",(d,i) =>d.duration/30)
    .attr("cx",(d,i) =>d.x/1.5)
    .attr("cy",(d,i)=>d.y/1.5)
    .attr("fill","red")
    .attr("stroke","green")
    .attr('stroke-width', 0.2)
    .attr('fill-opacity',.1);
})


