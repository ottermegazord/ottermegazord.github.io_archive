
var a = function( p ) {

    var xmargin = 30;
    var minLat = 42.227019;
    var maxLat = 42.397632;
    var minLong =  -71.191196;
    var maxLong = -70.922636;
    var minDate = 1072915200;
    var maxDate = 1483228799;

    p.setup = function(){

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
        latSlider.position(5 + xmargin, 220);

        timeSlider = p.createSlider(minDate, maxDate , Math.floor((minDate+maxDate)/2), 1);
        timeSlider.style('width', '260px');
        timeSlider.position(5, 255);

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

        var timeOutput = p.map(time, minDate, maxDate, 0, 255);
        var latOutput = p.map(lat, minLat, maxLat, 0, 255);
        var longOutput = p.map(long, minLong, maxLong, 0, 255);

        var min = 0;
        var max = 255 + 255 + 255;
        var output = timeOutput + latOutput + longOutput;

        var mapOutput = p.map(output, min, max, 0, 255);

        // var mapTime = p.map(value,start1,stop1,start2,stop2);

        console.log(450, p.height);
        p.background(255);
        p.fill(mapOutput);
        p.rect(0 + xmargin, 0, 200, 200);

        var outputString = "Value of land: $" + output.toFixed(2);


        p.fill(0);
        p.text('Longitude', 300, 210);
        p.text('Latitude', 100+10, 250);
        p.text('Time', 115, 220);

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