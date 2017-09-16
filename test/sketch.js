
var cx, cy;//center radius of clock
//hands
var secondsRadius;
var angles = [30, 10, 45, 60];

function setup(){

    createCanvas(1000, 1000);
    var radius = min(width, height / 2);
    secondsRadius = 100;
    cx = width/2;
    cy = height/2;
}

function draw(){

    minute_filler(700, angles);
    fill(200);
    ellipse(cx,cy, 700,700);
    fill(255);
    ellipse(cx,cy, 200, 200);

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
