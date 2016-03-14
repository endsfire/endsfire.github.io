var data = [{name:"O", val:2},{name:"T", val:4},{name:"H", val:5},{name:"F",val:6}];
var margin = {top: 10, bottom: 35, left: 35, right:10};
var cWidth = Math.min((document.getElementById("main_container").offsetWidth/1.01),1600) - (margin.left + margin.right+32);
var cHeight = 400;

var x = d3.scale.ordinal()
	.domain(data.map(function(d){ return d.name; }))
	.rangeRoundBands([0,cWidth],.1);

var y = d3.scale.linear()
	.domain([0,d3.max(data,function(d){ return d.val; })])
	.range([cHeight, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var svg = d3.select("svg")
	.attr("width",cWidth + margin.left + margin.right)
	.attr("height",cHeight + margin.top + margin.bottom)
  .append("g")
	.attr("transform","translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("rect")
	.data(data)
  .enter().append("rect")
	.attr("width",x.rangeBand())
	.attr("x",function(d){ return x(d.name); })
	.attr("y",function(d){ return y(d.val); })
	.attr("height",function(d){ return cHeight - y(d.val); })
	.attr("fill","#729f98");

svg.append("g")
	.attr("class","x axis")
	.attr("transform","translate(0," + cHeight + ")")
	.call(xAxis);

svg.append("g")
	.attr("class","y axis")
	.call(yAxis);