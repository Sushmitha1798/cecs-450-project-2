const canvas = d3.select(".canva");

var circle = null;
var line = null;
var data_shown = false;
var myColor = d3.scaleOrdinal()
.range(['#00e6ff', '#0066ff', '#1900ff'])
myColor.domain([0, 500, 1000]);  
var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltipDiv")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("");
//Create canvas
function createCanvas(){
  const svg = canvas.append("svg")
  .attr('width', "100%")
  .attr('height',"800");

  speed = 1;
  circle = svg.selectAll("circle");
  line = svg.selectAll("line");
}

//Generate Selected Data
function generateData(graph, selector_id, file_ext)
{
  var data_selector = document.getElementById(selector_id);
  var pdata = data_selector.options[data_selector.selectedIndex].value;
  var datafile = graph + '/' + pdata + file_ext;
  d3.json(datafile).then(data=>{
// show saccades
    line.data(data)
    .enter().append("line")
    .style("stroke", "white")
    .style("stroke-width", 1)
    .attr("x1", (d,i)=>d.x1/1.1)
    .attr("y1", (d,i)=>d.y1/1.5)
    .attr("x2", (d,i)=>d.x2/1.1)
    .attr("y2", (d,i)=>d.y2/1.5) 
    .attr("stroke-opacity",.08)
    .on('mouseover', function(event,d) {
      d3.select(this)
      .attr("stroke-width",3)
      .attr('stroke-opacity',.9);
      const info = "<b>saccade length :</b>" + d.saccade + "<br>"

      tooltip.html(info);
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", function(d, i) {
        return tooltip.style("top",
            (event.pageY-10)+"px")
                .style("left",(event.pageX+10)+"px");
    })
    .on('mouseout', function(d, i){
      d3.select(this)
      .attr("stroke-width",1)
      .attr('stroke-opacity',.08);

        tooltip.style("visibility", "hidden");
        d3.select('#details').html('');
    });
    circle.data(data)
    .enter().append("circle")
    .style("fill", function (d) { return myColor(d.duration); } )
    .attr("r",(d,i) =>d.duration/30)
    .attr("cx",(d,i) =>d.x1/1.1)
    .attr("cy",(d,i)=>d.y1/1.5)
    .attr("stroke","black")
    .attr('stroke-width', 0.2)
    .attr('fill-opacity',0.5)
    .on('mouseover', function(event,d) {
      d3.select(this)
      .attr("r",(d,i) =>d.duration/15)
      .attr('fill-opacity',.9);
      const info = "<b>Sequence Number :</b>" + d.sequence + "<br>"
                + "<b>X</b>:" + d.x1+", <b>Y</b>:"+d.y1 + "<br>"
                + "<b>Duration: </b> " + d.duration + "<br>";

      tooltip.html(info);
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", function(d, i) {
        return tooltip.style("top",
            (event.pageY-10)+"px")
                .style("left",(event.pageX+10)+"px");
    })
    .on('mouseout', function(d, i){
      d3.select(this)
      .attr("r",(d,i) =>d.duration/30)
      .attr('fill-opacity',.5);

        tooltip.style("visibility", "hidden");
        d3.select('#details').html('');
    });
  })
}


// var div = document.createElement("div");
// document.body.appendChild(div);
var selectorDiv = document.getElementById('dataSelectors');
var btnDiv = document.getElementById('dataBTNs');

var values_1 = ["p2", "p4", "p6", "p10", "p12", "p14", "p16", "p18", "p20", "p24", "p28", "p30", "p32", "p34", "p36"];
var values_2 = ["p1", "p3", "p5", "p7", "p11", "p13", "p15", "p17", "p19", "p21", "p23", "p25", "p27", "p31", "p33", "p35"];

//Create dropdown selector for confGraph data
var conf_g_select = document.createElement("select");
conf_g_select.name = "cg-person";
conf_g_select.id = "conf-g-pdata";

//Insert person graph options for confGraph dropdown selector
for (const val of values_1) {
  var option = document.createElement("option");
  option.value = val;
  option.text = "Conf Graph " + val;
  conf_g_select.appendChild(option);
  }
document.body.appendChild(selectorDiv).appendChild(conf_g_select);

//Create dropdown selector for confTree data
var conf_t_select = document.createElement("select");
conf_t_select.name = "ct-person";
conf_t_select.id = "conf-t-pdata";

//Insert person graph options for confTree dropdown selector
for (const val of values_2) {
  var option = document.createElement("option");
  option.value = val;
  option.text = "Conf Tree " + val;
  conf_t_select.appendChild(option);
  }
document.body.appendChild(selectorDiv).appendChild(conf_t_select);

//Create dropdown selector for bioGraph data
var bio_g_select = document.createElement("select");
bio_g_select.name = "bg-person";
bio_g_select.id = "bio-g-pdata";

//Insert person graph options for bioGraph dropdown selector
for (const val of values_2) {
  var option = document.createElement("option");
  option.value = val;
  option.text = "Bio Graph " + val;
  bio_g_select.appendChild(option);
  }
document.body.appendChild(selectorDiv).appendChild(bio_g_select);

//Create dropdown selector for bioTree data
var bio_t_select = document.createElement("select");
bio_t_select.name = "bt-person";
bio_t_select.id = "bio-t-pdata";

//Insert person graph options for bioTree dropdown selector
for (const val of values_1) {
  var option = document.createElement("option");
  option.value = val;
  option.text = "Bio Tree " + val;
  bio_t_select.appendChild(option);
  }
document.body.appendChild(selectorDiv).appendChild(bio_t_select);

//Create button 1
var conf_graph_btn = document.createElement("BUTTON");
conf_graph_btn.id = "conf_graph";
conf_graph_btn.innerText = "Conference Graph";
document.body.appendChild(btnDiv).appendChild(conf_graph_btn);

//button 1 click event
conf_graph_btn.addEventListener ("click", function() {
  if(data_shown == false)
  {
    generateData('confGraph', conf_g_select.id, 'GraphData.json');
    data_shown = true;
  }
  else
  {
    canvas.selectAll('*').remove();
    createCanvas();
    generateData('confGraph', conf_g_select.id, 'GraphData.json');
  }
});

//Create button 2
var conf_tree_btn = document.createElement("BUTTON");
conf_tree_btn.id = "conf_tree";
conf_tree_btn.innerText = "Conference Tree";
document.body.appendChild(btnDiv).appendChild(conf_tree_btn);

//button 2 click event
conf_tree_btn.addEventListener ("click", function() {
  if(data_shown == false)
  {
    generateData('confTree', conf_t_select.id, 'TreeData.json');
    data_shown = true;
  }
  else
  {
    canvas.selectAll('*').remove();
    createCanvas();
    generateData('confTree', conf_t_select.id, 'TreeData.json');
  }
});

//Create button 3
var bio_graph_btn = document.createElement("BUTTON");
bio_graph_btn.id = "bio_graph";
bio_graph_btn.innerText = "Biomed Graph";
document.body.appendChild(btnDiv).appendChild(bio_graph_btn);

//button 3 click event
bio_graph_btn.addEventListener ("click", function() {
  if(data_shown == false)
  {
    generateData('bioGraph', bio_g_select.id, 'GraphData.json');
    data_shown = true;
  }
  else
  {
    canvas.selectAll('*').remove();
    createCanvas();
    generateData('bioGraph', bio_g_select.id, 'GraphData.json');
  }
});

//Create button 4
var bio_tree_btn = document.createElement("BUTTON");
bio_tree_btn.id = "bio_tree";
bio_tree_btn.innerText = "Biomed Tree";
document.body.appendChild(btnDiv).appendChild(bio_tree_btn);

//button 4 click event
bio_tree_btn.addEventListener ("click", function() {
  if(data_shown == false)
  {
    generateData('bioTree', bio_t_select.id, 'TreeData.json');
    data_shown = true;
  }
  else
  {
    canvas.selectAll('*').remove();
    createCanvas();
    generateData('bioTree', bio_t_select.id, 'TreeData.json');
  }
});
conf_graph_btn.click()
conf_graph_btn.click()
//createCanvas();