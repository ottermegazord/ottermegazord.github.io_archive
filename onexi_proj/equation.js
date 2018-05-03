
var a = function( p ) {

    var xmargin = 30;
    var minLat = 42.230617414892976;
    var maxLat = 42.39615117161284;
    var minLong =  -71.18486620169273;
    var maxLong = -70.92757293553836;
    var minDate = 1072915200;
    var maxDate = 1609372800;
    var from, to


    p.setup = function(){

        from = p.color(255, 255, 204);
        to = p.color(128, 0, 38);
        var canvas = p.createCanvas(450,300);
        // canvas.parent('equation_chart');
        p.noStroke();
        longSlider = p.createSlider(minLong, maxLong, Math.floor((minLong+maxLong)/2), 0.001);
        longSlider.style('rotate', 90);
        longSlider.style('width', '200px');
        longSlider.position(135 + xmargin, 100);
        longSlider.style('rotate', -90);

        latSlider = p.createSlider(minLat, maxLat, Math.floor((minLat+maxLat)/2), 0.001);
        latSlider.style('width', '200px');
        latSlider.position(5 + xmargin, 230);

        timeSlider = p.createSlider(minDate, maxDate , Math.floor((minDate+maxDate)/2), 1);
        timeSlider.style('width', '260px');
        timeSlider.position(5, 265);

    };

    p.draw = function(){

        var time = timeSlider.value();
        var lat = latSlider.value();
        var long = longSlider.value();

        var date = new Date(time*1000);
        var month = date.getMonth();
        var year = 1900 + date.getYear();

        var timeString = "Date: " + month + "/" + year;
        var latString = "Latitude: " + lat;
        var longString = "Longtitude: " + long;

        var timeOutput = p.map(time, minDate, maxDate, 0, 1);
        var latOutput = p.map(lat, minLat, maxLat, 0, 1);
        var longOutput = p.map(long, minLong, maxLong, 0, 1);

        var min = 0;
        var max = 255 + 255 + 255;
        var output = -623.29792218 + 460.40609718 *timeOutput + 844.08462232  * latOutput + 754.00846418 * longOutput;

        // var mapOutput = p.map(output, min, max, 0, 200);
        var mapOutput = p.map(output, min, max, 0, 1);
        var colorOutput = p.lerpColor(from, to, mapOutput);

        // var mapTime = p.map(value,start1,stop1,start2,stop2);

        console.log(timeOutput, latOutput, longOutput);
        p.background(255);
        p.colorMode(p.RGB, 1);
        p.fill(colorOutput);
        p.rect(0 + xmargin, 0, 200, 200);
        p.colorMode(p.RGB, 255);

        var outputString = "Value of land: $" + output.toFixed(2) + "sqft";


        p.fill(0);
        p.rotate(p.HALF_PI * 1);
        p.text('Longitude', 80, -240);
        p.rotate(p.HALF_PI * -1);
        p.text('Time', 100+10, 250);
        p.text('Latitude', 115, 220);

        p.fill(0);
        p.textStyle(p.BOLD);
        p.text('Input', 450 * 1/2 + 60, p.height * 1/8);
        p.textStyle(p.NORMAL);
        p.text(latString, 450 * 1/2 + 60, p.height * 1/8 + 20);
        p.text(longString, 450 * 1/2 + 60, p.height * 1/8 + 40);
        p.text(timeString, 450 * 1/2 + 60, p.height * 1/8 + 60);
        p.textStyle(p.BOLD);
        p.text('Output', 450 * 1/2 + 60, p.height * 1/8 + 90);
        p.textStyle(p.NORMAL);
        p.text(outputString, 450 * 1/2 + 60, p.height * 1/8 + 110);


    };
};

var myp5 = new p5(a, 'equation');