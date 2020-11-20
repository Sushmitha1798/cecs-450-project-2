const canvas = d3.select(".canva");

 
const svg = canvas.append("svg")
            .attr('width', "100%")
            .attr('height',"1000");

const speed = 2;
const circle = svg.selectAll("circle");
const line = svg.selectAll("line");
d3.json('bioGraph/p1GraphData.json').then(data=>{
    circle.data(data)
    .enter().append("circle")
    .transition()
    .delay(function(d,i){return  d.sequence * speed;})
    .attr("r",(d,i) =>d.duration/30)
    .attr("cx",(d,i) =>d.x1)
    .attr("cy",(d,i)=>d.y1/1.5)
    .attr("fill","red")
    .attr("stroke","green")
    .attr('stroke-width', 0.2)
    .attr('fill-opacity',.1);

    line.data(data)
    .enter().append("line")
    .transition()
    .delay(function(d,i){return  d.sequence * speed;})
    .style("stroke", "indigo")
    .style("stroke-width", 1)
    .attr("x1", (d,i)=>d.x1)
    .attr("y1", (d,i)=>d.y1/1.5)
    .attr("x2", (d,i)=>d.x2)
    .attr("y2", (d,i)=>d.y2/1.5) 
    .attr("stroke-opacity",.08);
    
})