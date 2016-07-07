/**
 * Created by johan on 2016-07-06.
 */

$.widget( "waterfall.axlar", {

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
    xAxisGroup: null,

    locals: {
        imageData : null,
    },

    _create : function () {

        var TW = this;

        console.info("creating the widget");

        console.info($(this.element).width());
        console.info($(this.element).height());

        //var axContainer = $("<div id='axContainer' style='border:solid 1px; width:600px; height:400px;'>").appendTo("body");
        var axContainer = $("<div>").
            attr("id","axContainer").
            width(600).
            height(400).
            css("border","solid 1px").
            css("position","relative").
            html("hejsan").
            appendTo("body");

        var brushOverlay = $("<svg id='brushOverlay'>").
            attr("width","600").
            attr("height","400").
            css("position","absolute").
            css("top","0").
            css("left","0").
            appendTo(axContainer);

        //var svgContent = $("<svg id='xAxisContainer' width='400' height='20' style='border:solid 1px';>").appendTo("axContainer");
        var xAxisContainer = $("<svg id='xAxisContainer'>").
            attr("width","400").
            attr("height","20").
            css("border","solid 1px").
            appendTo(axContainer);

        this.xScale = d3.scaleLinear().range([20,380]).domain([0,10]);
        this.xAxis = d3.axisBottom(this.xScale);//.tickSize(5).tickSubdivide(true);

        this.xAxisGroup = d3.select("#xAxisContainer").append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(-10,0)")
            .call(this.xAxis);

        d3.select("#axContainer").call(d3.zoom().scaleExtent([0, 10]).on("zoom", function(){
                TW._zoomed();
        }));

        var brush = d3.brush().on("end", function() {console.log("brushing");}),
            idleTimeout,
            idleDelay = 350;

        //var brush = d3.brushX().extent([[0, 0], [600, 400]]).on("brush", function() {
        //    console.log("brushing");
        //});

        d3.select("#brushOverlay").
            call(brush);
        //    call(brush.move, this.xScale.range());


    },

    _zoomed : function(testax) {
        //var TW = this;
        console.log(d3.event.sourceEvent.type);
        console.log("zoomingg");
        this.xAxisGroup.call(this.xAxis.scale(d3.event.transform.rescaleX(this.xScale)));
    },


});
