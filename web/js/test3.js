$(document).ready(function () {

    "use strict";

    //var theCanvas = $("<canvas width=500px height=1px>").basicElement().appendTo("body");
    var container = $("<div>").
        css("width","300px").
        css("height","200px").
        basicElement().appendTo("body");


    for (var i=0; i<100; i++) {
        var position = (i+10).toString() + "px";
        container.basicElement("addLine", position);
    }

    var container2 = $("<div>").
        attr("id","axifyMe").
        css("width","300px").
        css("height","200px").
        axlar().appendTo("body");


    console.log("hej")
});
