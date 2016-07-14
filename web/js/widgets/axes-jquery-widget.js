/**
 * Created by johan on 2016-07-06.
 */

$.widget( "waterfall.axlar", {

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
            mousedown(function(event) {
                switch (event.which) {
                    case 1:
                        console.log('Left Mouse button pressed.');
                        break;
                    case 2:
                        console.log('Middle Mouse button pressed.');
                        break;
                    case 3:
                        console.log('Right Mouse button pressed.');
                        break;
                    default:
                        console.log('You have a strange Mouse!');
                }
            }).
            contextmenu(function(){return false;}).
            dblclick(function(){return false;}).
            appendTo("body");

        //var brushOverlay = $("<svg id='brushOverlay'>").
        //    attr("width","600").
        //    attr("height","400").
        //    css("position","absolute").
        //    css("top","0").
        //    css("left","0").
        //    appendTo(axContainer);

        //var svgContent = $("<svg id='xAxisContainer' width='400' height='20' style='border:solid 1px';>").appendTo("axContainer");
        var xAxisContainer = $("<svg id='xAxisContainer'>").
            attr("width","400").
            attr("height","300").
            css("border","solid 1px").
            css("position","absolute").
            css("top","0").
            css("right","0").
            appendTo(axContainer);

        this.xScale = d3.scaleLinear().range([0,400]).domain([0,10]);
        this.xAxis = d3.axisBottom(this.xScale);//.tickSize(5).tickSubdivide(true);

        this.xAxisGroup = d3.select("#xAxisContainer").append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,100)")
            .call(this.xAxis);

        d3.select("#axContainer").call(d3.zoom().scaleExtent([0, 10]).on("zoom", function(){
                TW._zoomed();
        }));

        //var brush = d3.brush().on("end", function() {console.log("brushing");}),
        //    idleTimeout,
        //    idleDelay = 350;

        //var brush = d3.brushX().extent([[0, 0], [600, 400]]).on("brush", function() {
        //    console.log("brushing");
        //});

        //d3.select("#brushOverlay").
        //    call(brush);
        //    call(brush.move, this.xScale.range());


    },

    _zoomed : function(testax) {
        //var TW = this;
        console.log(d3.event.sourceEvent.type);
        console.log("zoomingg");
        this.xAxisGroup.call(this.xAxis.scale(d3.event.transform.rescaleX(this.xScale)));
    },


});
