$(document).ready(function () {


    var cnvs = $("#myCanvas")[0];
    var ctx = cnvs.getContext("2d");
    var imgData = ctx.createImageData(1024, 500);
    var iLine = 1;

    addLine();
    shiftImage();

    function addLine() {
        console.log('adding line ' + iLine);
        for (var i = 499; i > 0; i--) {
            shiftLine(i);
        }
        drawLine(1);
        ctx.putImageData(imgData, 0, 0);
        setTimeout(addLine, 100);
    }

    function shiftImage() {
        imgData.data.set(deleteLastLine(), 4 * 1024);
        drawLine(1);
        ctx.putImageData(imgData, 0, 0);
        setTimeout(shiftImage, 100);
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


});
