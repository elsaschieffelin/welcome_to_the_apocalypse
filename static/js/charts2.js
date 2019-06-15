var margin = {top: 20, right: 80, bottom: 30, left: 50},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom,
xSelector = margin.left + width;

var xScale = d3.scale.linear()
.range([0, width]);

var yScale = d3.scale.linear()
.range([height, 0]);

var xAxis = d3.svg.axis()
.orient("bottom");

var yAxis = d3.svg.axis()
.orient("left");

var line = d3.svg.line()
.x(function(d, i) { return xScale(i); })
.y(function(d, i) { return yScale(d); });

var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dynamicLine;

function updateLineChart(dataset, color) {
 dynamicLine
 .transition()
 .duration(750)
 .attr("d", line(dataset.timeseries))
 .attr("stroke", color);
}

d3.json("timeseries.json", function(error, dataset) {
 if (error) throw error;

 xScale.domain([0, dataset[0].timeseries.length]);

 yScale.domain([
               d3.min(dataset, function(c) { return d3.min(c.timeseries); }),
               d3.max(dataset, function(c) { return d3.max(c.timeseries); })
               ]);

 xAxis.scale(xScale);

 yAxis.scale(yScale);

 svg.append("g")
 .attr("class", "x axis")
 .attr("transform", "translate(0," + height + ")")
 .call(xAxis);

 svg.append("g")
 .attr("class", "y axis")
 .call(yAxis)
 .append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 6)
 .attr("dy", ".71em")
 .style("text-anchor", "end")
 .text("Value");

 var color = d3.scale.category10();

 dynamicLine = this.svg.append("path")
 .attr('class', 'line')
 .attr("d", line(dataset[0].timeseries))
 .attr("stroke", color(0));

 // Selector Creation
 var ySelector = d3.scale.linear()
 .domain([0, dataset.length - 1])
 .range([margin.top, height / 4 * 3]);

 var selector = this.svg.selectAll('circle')
 .data(dataset)
 .enter()
 .append('circle')
 .attr('class', 'selector')
 .attr('cx', xSelector)
 .attr('cy', function(d, i) {
   return ySelector(i);
 })
 .attr('r', 8)
 .attr('fill', function(d, i) {
   return color(i);
 })
 .on('mouseenter', function(d, i) {
   d3.select(this).attr('stroke-width', 3);

   updateLineChart(d, color(i));
 })
 .on('mouseleave', function(d, i) {
   d3.select(this).attr('stroke-width', 'initial');
 });
});