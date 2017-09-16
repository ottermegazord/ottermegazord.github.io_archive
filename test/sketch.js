
var cx, cy;//center radius of clock
//hands
var secondsRadius;
var angles = [30, 10, 45, 60];
var d = new Date();

// big hour circle r
var big_hour_r = 120
var small_hour_r = 80


function setup(){

    createCanvas(1000, 1000);
    var radius = min(width, height / 2);
    secondsRadius = 100;
    cx = width/2;
    cy = height/2;
}

function hour_hole(x, y, fill_on, fill_off, _hour, big_hour_r){

    strokeWeight(10)
    fill(fill_on);

    if (hour() == _hour){
        fill(fill_on);
        console.log(hour());
    }
    else{
        fill(fill_off);
    }
    ellipse(x, y, big_hour_r, big_hour_r);
}

function draw(){

    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    var s_minute = map(hour(), 0, 60, 0, TWO_PI);

    //crust
    fill(150,100,20)
    ellipse(cx,cy, 800,800);

    strokeWeight(20)
    fill(200);
    ellipse(cx,cy, 700,700);

    fill(120, 23, 12)
    minute_filler(700, s);
    strokeWeight(10)

    fill(255);
    ellipse(cx,cy, 200, 200);


    // Draw 12, 3, 6, 9
    fill(255);

    // Draw the hands of the clock
    stroke(0);
    strokeWeight(20);
    line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);


    hour_hole(cx, cy - 225, 0, 255, 12, big_hour_r);
    hour_hole(cx + 225, cy, 0, 255, 3, big_hour_r);
    hour_hole(cx, cy + 225, 0, 255, 6, big_hour_r);
    hour_hole(cx - 225, cy, 0, 255, 9, big_hour_r);

    hour_hole(cx + 112.5, cy - 194, 0, 255, 1, small_hour_r);
    hour_hole(cx + 194, cy - 112.5, 0, 255, 2, small_hour_r);

    hour_hole(cx + 194, cy + 112.5, 0, 255, 4, small_hour_r);
    hour_hole(cx + 112.5, cy + 194, 0, 255, 5, small_hour_r);

    hour_hole(cx - 112.5, cy + 194, 0, 255, 7, small_hour_r);
    hour_hole(cx - 194, cy + 112.5, 0, 255, 8, small_hour_r);

    hour_hole(cx - 194, cy - 112.5, 0, 255, 10, small_hour_r);
    hour_hole(cx - 112.5, cy - 194, 0, 255, 11, small_hour_r);

    //
    // var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    // var s_minute = map(hour(), 0, 60, 0, TWO_PI) - HALF_PI;

}

function minute_filler(diameter, data) {

    fill(255,0,0)
    arc(cx, cy, diameter, diameter, 0, data, radians(360), PIE)

    // var lastAngle = 0;
    // for (var i = 0; i < data.length; i++) {
    //     var gray = map(i, 0, data.length, 0, 255);
    //     fill(gray);
    //     arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
    //     lastAngle += radians(angles[i]);
    // }
}
