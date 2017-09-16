
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

function minute_hole(x, y, fill_on, fill_off, _second, big_hour_r){

    strokeWeight(10)
    fill(fill_on);

    if (second() == _second){
        fill(fill_on);
        console.log(second());
    }
    else{
        fill(fill_off);
    }
    ellipse(x, y, big_hour_r, big_hour_r);
}

function draw(){

    strokeWeight(20)
    minute_filler(700, angles);
    fill(200);
    ellipse(cx,cy, 700,700);
    fill(255);
    ellipse(cx,cy, 200, 200);


    // Draw 12, 3, 6, 9

    strokeWeight(10)
    fill(255);

    minute_hole(cx, cy - 225, 0, 255, 0, big_hour_r);
    minute_hole(cx + 225, cy, 0, 255, 15, big_hour_r);
    minute_hole(cx, cy + 225, 0, 255, 30, big_hour_r);
    minute_hole(cx - 225, cy, 0, 255, 45, big_hour_r);

    minute_hole(cx + 194, cy - 112.5, 0, 255, 5, small_hour_r);
    minute_hole(cx + 112.5, cy - 194, 0, 255, 5, small_hour_r);

    minute_hole(cx - 194, cy + 112.5, 0, 255, 5, small_hour_r);
    minute_hole(cx - 112.5, cy + 194, 0, 255, 5, small_hour_r);

    minute_hole(cx - 194, cy - 112.5, 0, 255, 5, small_hour_r);
    minute_hole(cx - 112.5, cy - 194, 0, 255, 5, small_hour_r);

    minute_hole(cx + 194, cy + 112.5, 0, 255, 5, small_hour_r);
    minute_hole(cx + 112.5, cy + 194, 0, 255, 5, small_hour_r);

    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;

    // Draw the hands of the clock
    stroke(0);
    strokeWeight(20);
    line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);


}

function minute_filler(diameter, data) {
    var lastAngle = 0;
    for (var i = 0; i < data.length; i++) {
        var gray = map(i, 0, data.length, 0, 255);
        fill(gray);
        arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
        lastAngle += radians(angles[i]);
    }
}
