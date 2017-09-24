
var cx, cy;//center radius of clock
//hands
var secondsRadius;
var angles = [30, 10, 45, 60];
var d = new Date();

// big hour circle r
var big_hour_r = 120
var small_hour_r = 80

var color = map(second(), 0, 60, 0, 255)


function setup(){

    createCanvas(1000, 1000);
    var radius = min(width, height / 2);
    secondsRadius = 100;
    cx = width/2;
    cy = height/2;
}

function hour_hole(x, y, r1, g1, b1, r2, g2, b2, _hour, big_hour_r){

    strokeWeight(10)
    fill(r1, g2, b2);

    if (hour() == _hour){
        fill(r1, g1, b1);
        console.log(hour());
    }
    else{
        fill(r2, g2, b2);
    }
    ellipse(x, y, big_hour_r, big_hour_r);
}

function draw(){

    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    var s_minute = map(minute(), 0, 60, 0, TWO_PI);
    console.log(minute())

    //crust
    fill(150,100,20)
    ellipse(cx,cy, 800,800);

    strokeWeight(20)
    fill(244,75,66);
    ellipse(cx,cy, 700,700);

    fill(120, 23, 12)
    minute_filler(700, s_minute);
    strokeWeight(10)

    fill(255);
    ellipse(cx,cy, 200, 200);


    // Draw 12, 3, 6, 9
    fill(255);

    // Draw the hands of the clock
    stroke(0);
    strokeWeight(20);
    line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);



    hour_hole(cx, cy - 225, 244, 66, 75, 0, 153, 151, 12, big_hour_r);
    hour_hole(cx, cy - 225, 244, 66, 75, 0, 153, 151, 0, big_hour_r);
    hour_hole(cx + 225, cy, 244, 66, 75, 0, 153, 151, 3, big_hour_r);
    hour_hole(cx + 225, cy, 244, 66, 75, 0, 153, 151, 15, big_hour_r);
    hour_hole(cx, cy + 225, 244, 66, 75, 0, 153, 151, 6, big_hour_r);
    hour_hole(cx, cy + 225, 244, 66, 75, 0, 153, 151, 18, big_hour_r);
    hour_hole(cx - 225, cy, 244, 66, 75, 0, 153, 151, 9, big_hour_r);
    hour_hole(cx - 225, cy, 244, 66, 75, 0, 153, 151, 18, big_hour_r);

    hour_hole(cx + 112.5, cy - 194, 244, 66, 75, 0, 153, 151, 1, small_hour_r);
    hour_hole(cx + 112.5, cy - 194, 244, 66, 75, 0, 153, 151, 13, small_hour_r);
    hour_hole(cx + 194, cy - 112.5, 244, 66, 75, 0, 153, 151, 2, small_hour_r);
    hour_hole(cx + 194, cy - 112.5, 244, 66, 75, 0, 153, 151, 14, small_hour_r);

    hour_hole(cx + 194, cy + 112.5, 244, 66, 75, 0, 153, 151, 4, small_hour_r);
    hour_hole(cx + 194, cy + 112.5, 244, 66, 75, 0, 153, 151, 16, small_hour_r);
    hour_hole(cx + 112.5, cy + 194, 244, 66, 75, 0, 153, 151, 5, small_hour_r);
    hour_hole(cx + 112.5, cy + 194, 244, 66, 75, 0, 153, 151, 17, small_hour_r);

    hour_hole(cx - 112.5, cy + 194, 244, 66, 75, 0, 153, 151, 7, small_hour_r);
    hour_hole(cx - 112.5, cy + 194, 244, 66, 75, 0, 153, 151, 19, small_hour_r);
    hour_hole(cx - 194, cy + 112.5, 244, 66, 75, 0, 153, 151, 8, small_hour_r);
    hour_hole(cx - 194, cy + 112.5, 244, 66, 75, 0, 153, 151, 20, small_hour_r);

    hour_hole(cx - 194, cy - 112.5, 244, 66, 75, 0, 153, 151, 10, small_hour_r);
    hour_hole(cx - 194, cy - 112.5, 244, 66, 75, 0, 153, 151, 22, small_hour_r);
    hour_hole(cx - 112.5, cy - 194, 244, 66, 75, 0, 153, 151, 11, small_hour_r);
    hour_hole(cx - 112.5, cy - 194, 244, 66, 75, 0, 153, 151, 23, small_hour_r);

    //
    // var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    // var s_minute = map(hour(), 0, 60, 0, TWO_PI) - HALF_PI;

}

function minute_filler(diameter, data) {

    fill(244,226,66)
    arc(cx, cy, diameter, diameter,  -1 * HALF_PI , data - HALF_PI, PIE)

}
