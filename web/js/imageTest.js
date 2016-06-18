$(document).ready(function () {


    var cnvs = $("#myCanvas")[0];
    var ctx = cnvs.getContext("2d");
    var imgData = ctx.createImageData(1024, 500);
    var iLine = 1;
    var imageB64 = '';

    var imgHeight = 1025, imgWidth = 1024,      // Image dimensions (don't change these)
        width =  1024, height = 500,             // Dimensions of cropped region
        translate0 = [0, -180], scale0 = 1;  // Initial offset & scale

    var svg = d3.select("body").append("svg")
        .attr("width",  width + "px")
        .attr("height", height + "px");

    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width + "px")
        .attr("height", height + "px");

    svg = svg.append("g")
        .attr("transform", "translate(" + translate0 + ")scale(" + scale0 + ")")
        .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
        .append("g");

    var image2 = svg.append("image")
        .attr("width",  imgWidth + "px")
        .attr("height", imgHeight + "px");
        //.attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
        //.attr("xlink:href", "Base.png");
        //.attr("xlink:href", imageB64);

        //console.log($(image2.node()));

    addLine();
    //shiftImage();

    function addLine() {
        console.log('adding line ' + iLine);
        for (var i = 499; i > 0; i--) {
            shiftLine(i);
        }
        drawLine(1);
        ctx.putImageData(imgData, 0, 0);
        //imageB64 = cnvs.toDataURL("image/png");
        //console.log(imageB64.substring(0,20));
        ////var image2 = svg.remove();
        ////var image2 = svg.append("image")
        ////    .attr("width",  imgWidth + "px")
        ////    .attr("height", imgHeight + "px")
        ////    //.attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
        ////    //.attr("xlink:href", "Base.png");
        ////    .attr("xlink:href", imageB64);
        ////$(image2.node()).attr("xlink:href", imageB64);
        //$(image2.node()).attr("href", imageB64);
        setTimeout(addLine, 1);
    }

    function shiftImage() {
        imgData.data.set(deleteLastLine(), 4 * 1024);
        drawLine(1);
        ctx.putImageData(imgData, 0, 0);
        setTimeout(shiftImage, 2000);
    }

    function shiftLine(lineNo) {
        for (var i = (lineNo - 1) * 4 * 1024; i < lineNo * 4 * 1024; i += 4) {
            imgData.data[i + 4 * 1024 + 0] = imgData.data[i + 0];
            imgData.data[i + 4 * 1024 + 1] = imgData.data[i + 1];
            imgData.data[i + 4 * 1024 + 2] = imgData.data[i + 2];
            imgData.data[i + 4 * 1024 + 3] = imgData.data[i + 3];
        }
    }

    function drawLine(lineNo) {
        var lightValue = Math.floor((Math.random() * 255) + 1);
        for (var i = (lineNo - 1) * 4 * 1024; i < lineNo * 4 * 1024; i += 4) {
            imgData.data[i + 0] = Math.floor((Math.random() * 255) + 1);
            imgData.data[i + 1] = Math.floor((Math.random() * 255) + 1);
            imgData.data[i + 2] = Math.floor((Math.random() * 255) + 1);
            imgData.data[i + 3] = lightValue;
        }
    }

    function deleteLastLine() {
        return (imgData.data.subarray(0, (500 - 1) * 4 * 1024))
    }


    function zoom() {
        svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        //console.log("translate: " + d3.event.translate + ", scale: " + d3.event.scale);
    }


//    var ctx = cnvs.getContext("2d");
//    var imgData = ctx.createImageData(1538, 1025);




});
