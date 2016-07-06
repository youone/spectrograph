/**
 * Created by johan on 2016-07-04.
 */

$.widget( "waterfall.basicElement", {

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

    locals: {
        imageData : null,
    },

    _create : function () {

        console.info("creating the widget");

        //var canvasContext = this.element[0].getContext("2d");
        //var nLines = 300;
        //var nRows = 200;
        //var imageData = canvasContext.createImageData(300, 200);
        ////console.log(imageData.data);
        //
        //var lineNo = 1;
        //var lightValue = Math.floor((Math.random() * 255) + 1);
        //for (var i = (lineNo - 1) * 4 * 300; i < lineNo * 4 * 300; i += 4) {
        //    //imageData.data[i + 0] = Math.floor((Math.random() * 255) + 1);
        //    //imageData.data[i + 1] = Math.floor((Math.random() * 255) + 1);
        //    //imageData.data[i + 2] = Math.floor((Math.random() * 255) + 1);
        //    //imageData.data[i + 3] = lightValue;
        //    imageData.data[i + 0] = 0;
        //    imageData.data[i + 1] = 0;
        //    imageData.data[i + 2] = 255;
        //    imageData.data[i + 3] = 255;
        //}
        //
        ////for (iPix = 0; iPix<100000; iPix+=3) {
        ////    imageData.data[iPix + 0] = Math.floor((Math.random() * 255) + 1);
        ////    imageData.data[iPix + 1] = Math.floor((Math.random() * 255) + 1);
        ////    imageData.data[iPix + 2] = Math.floor((Math.random() * 255) + 1);
        ////    //imageData.data[i + 3] = lightValue;
        ////}
        //canvasContext.putImageData(imageData, 0, 0);


    },

    addLine : function(position) {

        console.log("adding line");
        var lineCanvas = $("<canvas width=300px height=1px>").
            css("position","absolute").
            css("top",position);
        var canvasContext = lineCanvas[0].getContext("2d");
        canvasContext.imageSmoothingEnabled= false;
        var imageData = canvasContext.createImageData(300, 1);
        for (var i = 0; i < 4 * 300; i += 4) {
            imageData.data[i + 0] = Math.floor((Math.random() * 255) + 1);
            imageData.data[i + 1] = Math.floor((Math.random() * 255) + 1);
            imageData.data[i + 2] = Math.floor((Math.random() * 255) + 1);
            imageData.data[i + 3] = 255;
        }
        canvasContext.putImageData(imageData, 0, 0);
        lineCanvas.appendTo(this.element);

    },

});
