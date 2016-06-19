//$(document).ready(function () {

    function zoomed() {
        console.log('hej');
        vis.select(".x.axis").call(xAxis);
        vis.select(".y.axis").call(yAxis);
        vis.selectAll(".line").attr("d", lineFunc(lineData));
        vis.selectAll(".datarect").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    var lineData = [
        {'x':0,  'y':0, 'c':'blue'},
        {'x':20, 'y':20, 'c':'red'},
        {'x':40, 'y':10, 'c':'green'},
        {'x':60, 'y':40, 'c':'black'},
        {'x':80, 'y':5, 'c':'grey'},
        {'x':100,'y':60, 'c':'blue'}
    ];

    var vis = d3.select("body").append("svg")
        .attr("width", 500)
        .attr("height", 250);

    var WIDTH = 500;
    var HEIGHT = 250;
    var MARGINS = {top : 20, right : 20, bottom : 20, left : 50};

    var xScale = d3.scale.linear()
        .range([ MARGINS.left,
            WIDTH - MARGINS.right ])
        .domain([ d3.min(lineData, function(d) {return d.x;}),
            d3.max(lineData, function(d) {return d.x;}) ]);
    var xScaleFactor = Math.abs(xScale(1)-xScale(0));

    var yScale = d3.scale.linear()
        .range([ HEIGHT - MARGINS.top,
            MARGINS.bottom ])
        .domain([ d3.min(lineData, function(d) {return d.y;}),
            d3.max(lineData, function(d) {return d.y;}) ]);
    var yScaleFactor = Math.abs(yScale(1)-yScale(0));



    var xAxis = d3.svg.axis()
        .scale(xScale)
//.tickSize(-HEIGHT + MARGINS.top)
        .tickSize(5)
        .tickSubdivide(true);

    var yAxis = d3.svg.axis()
        .scale(yScale)
//.tickSize(-WIDTH + MARGINS.right)
        .tickSize(5)
        .orient("left")
        .tickSubdivide(true);

    vis.append("g")
        .attr("class", "x axis")
        .attr("transform","translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);

    vis.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);


    var lineFunc = d3.svg.line()
        .x(function(d) {return xScale(d.x);})
        .y(function(d) {return yScale(d.y);})
        .interpolate('linear');

    //vis.append("path")
    //    .attr("d", lineFunc(lineData))
    //    .attr("stroke", "blue")
    //    .attr("stroke-width", 2).attr("fill", "none")
    //    .attr("class","line")
    //    .attr("clip-path", "url(#clip)");

    vis.selectAll("rect").data(lineData).enter().append("rect")
        .attr('x', function(d) {return xScale(d.x);})
        .attr('y', function(d) {return yScale(d.y);})
        .attr('width', 3*xScaleFactor)
        .attr('height', 3*yScaleFactor)
        //.attr('width', 10)
        //.attr('height', 10)
        .attr('fill', function(d) {return d.c;})
        .attr("clip-path", "url(#clip)")
        .attr('class','datarect');

    var zoomOverlay = vis.append("rect")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("class", "zoomOverlay")
        .call(d3.behavior.zoom().x(xScale).y(yScale).scaleExtent([1, 10]).on("zoom", zoomed))


//.on("mousedown.zoom", null)
//.on("touchstart.zoom", null)
//.on("touchmove.zoom", null)
//.on("touchend.zoom", null);

//});