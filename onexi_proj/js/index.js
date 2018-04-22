data = [
    {
        "date":"2004",
        "close":144163
    },
    {
        "date":"2005",
        "close":145978
    },
    {
        "date":"2006",
        "close":148913
    },
    {
        "date":"2007",
        "close":151860
    },
    {
        "date":"2008",
        "close":155564
    },
    {
        "date":"2009",
        "close":158092
    },
    {
        "date":"2010",
        "close":160083
    },
    {
        "date":"2011",
        "close":161261
    },
    {
        "date":"2012",
        "close":162148
    },
    {
        "date":"2013",
        "close":162895
    },
    {
        "date":"2014",
        "close":163499
    },
    {
        "date":"2015",
        "close":165414
    },
    {
        "date":"2016",
        "close":166465
    },
    {
        "date":"2017",
        "close":168181
    }
];
var div_width = parseInt(d3.select('body').style('width').replace('px',''));
var margin = {top: 20, right: 50, bottom: 30, left: 30},
    width = div_width - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse,
    bisectDate = d3.bisector(function(d) { return d.date; }).left,
    formatValue = d3.format(",.2f");

var maxY = d3.max(data, function(d) { return d.close; });

var x = d3.time.scale()
    .range([0, width-margin.left-margin.right]);

var y = d3.scale.linear()
    .range([height-margin.top-margin.bottom, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0)
    .tickFormat(d3.time.format('%Y'))
    .ticks(d3.time.years, 1);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .ticks(maxY / 20000);

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
  .attr('viewBox','0 0 '+width+' '+height+margin.top)
.attr('preserveAspectRatio','xMinYMin')
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  data.sort(function(a, b) {
    return a.date - b.date;
  });

  x.domain([data[0].date, data[data.length - 1].date]);
  y.domain(d3.extent(data, function(d) { return d.close; }));

  var area = d3.svg.area()
	.x(function(d) { return x(d.date); })
	.y0(height)
	.y1(function(d) { return y(d.close); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+(width-50)+",0)")
      .call(yAxis);
d3.selectAll('.y.axis g.tick').attr("class", "yAxisTicks tick");
d3.selectAll('.x.axis g.tick').attr("class", "xAxisTicks tick");
function make_y_axis() {        
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(maxY / 20000);
    
};
  svg.append("g")         
      .attr("class", "grid")
      .style("stroke-dasharray", ("3, 3"))
      .call(make_y_axis()
        .tickSize((-width+margin.right+margin.left), 0, 0)
        .tickFormat("")
       );

  svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  var focusLine = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  var focusText = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("circle")
      .attr("r", 6);

  focusLine.append("line")
        .attr("class", "x")
        .style("stroke", "#46464F")
        .style("opacity", 0.9)
        .attr("y1", 0)
        .attr("y2", -maxY);

  focusText.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null);        
                                    focusLine.style("display", null)
                                    focusText.style("display", null);;})
      .on("mouseout", function() { focus.style("display", "none"); 
                                   focusLine.style("display", "none");
                                   focusText.style("display", "none");})
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
    focusText.select("text").attr("transform", "translate(" + x(d.date) + "," + -10 + ")").text(d.close + " PARCELS");
    focusLine.attr("transform", "translate(" + x(d.date) + "," + height + ")");
  }