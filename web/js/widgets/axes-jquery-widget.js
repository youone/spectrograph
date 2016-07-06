/**
 * Created by johan on 2016-07-06.
 */

$.widget( "waterfall.axes", {

    // default options
    options: {
        nLines: 10,
        nRows: 10,
        lineWidth: 0,
        rowWidth: 0,

        // callbacks
        change: null,
        random: null
    },

    xScale: null,
    xAxis: null,

    locals: {
        imageData : null,
    },

    _create : function () {

        var TW = this;

        console.info("creating the widget");



        //var axContainer = $("<div id='axContainer' style='border:solid 1px; width:600px; height:400px;'>").appendTo("body");
        var axContainer = $("<div>").
            attr("id","axContainer").
            attr("class", "zoomOverlay").
            width(600).
            height(400).
            css("border","solid 1px").
            appendTo("body");

        //var svgContent = $("<svg id='xAx' width='400' height='20' style='border:solid 1px';>").appendTo("axContainer");
        var xAx = $("<svg id='xAx'>").
            attr("width","400").
            attr("height","20").
            css("border","solid 1px").
            appendTo(axContainer);

        this.xScale = d3.scale.linear().range([20,380]).domain([0,10]);
        this.xAxis = d3.svg.axis().scale(this.xScale).tickSize(5).tickSubdivide(true);

        d3.select("#xAx").append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(-10,0)")
            .call(this.xAxis);


        var zm = d3.behavior.zoom().x(this.xScale).scaleExtent([0, 10]).on("zoom", function() {
            TW._zoomed(TW.xAxis);
        });
        var zoomOverlay = d3.select("#axContainer").call(zm);

        //d3.select("#svgContent").append("g")
        //    .attr("class", "y axis")
        //    .attr("transform", "translate(20,0)")
        //    .call(yAxis);


    },

    _zoomed : function(axis) {
        console.log("zooming");
        var TW = this;
        d3.select("#xAx").select(".x.axis").call(axis);
    },


});
