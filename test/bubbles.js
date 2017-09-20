var x, y;
var xspacing = 70;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 10.0;      // Start angle at 0 // Height of wave
var period = 500.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var s

function setup() {
    createCanvas(720, 400);
    // Starts in the middle
    x = width / 2;
    y = height;

    w = width+16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w/xspacing));

    fill(255);
    ellipse(30, 40, 40, 30);
    stroke(255);
    var i;
    var j;
    for (i = 100; i < 700; i+= 1 ){
        for (j = 100; j < 500; j+= 100)
            line(i , j , i, j + second())
    }
    background(0);
}

function draw() {
    background(0);

    var s = map(second(), 0, 60, 0, 255);
    var m = map(minute(), 0, 60, 255, 0);
    var count = 0;

    // Draw a circle    calcWave();
    calcWave()
    renderWave()

    fill(100);

    for (count = 0; count < 61; count++){
        fill(100)
        ellipse((720/24) * hour(), (400/24) * hour(), 100, 100)
        console.log(count)
    }

        //ellipse(widthWindow/2, widthHeight/2, 30, 30)
        //console.log(count);
        //count += 1;


    for (i = 0; i < 720; i+= 100) {
        fill(m)
        ellipse(i, y, 50, 50);
    }

    for (i = 0; i < 720; i+= 100) {
        fill(m)
        ellipse(i + 10, y + 10, 50, 50);
    }

    for (i = 0; i < 720; i+= 100) {
        fill(m)
        ellipse(i + 20, y + 20, 50, 50);
    }
    // ellipse(x, y, 24, 24);
    // ellipse(x + 40, y + 40, 24, 24);

    // Jiggling randomly on the horizontal axis
    x = x + random(-8, 8);
    // Moving up at a constant speed
    y = y - s/20;

    // Reset to the bottom
    if (y < 0) {
        y = height;
    }

    for (count = 0; count < 61; count++){
        fill(100)
        ellipse((720/24) * hour(), (400/24) * hour(), 100, 100)
        console.log(count)
    }

}

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.05;
    s = map(second(), 0, 60, 0, 100)
    m = map(minute(), 0, 60, 0, height/2)
    amplitude = m;

    // For every x value, calculate a y value with sine function
    var x = theta;
    for (var i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x)*amplitude + random(-2, 2);
        x+=dx;
    }
}

function renderWave() {
    noStroke();
    fill(255);
    // A simple way to draw the wave with an ellipse at each location
    for (var x = 0; x < yvalues.length; x++) {
        textSize(15)
        text(minute(), x * xspacing, height / 2 + yvalues[x])
        //rect(x * xspacing, height / 2 + yvalues[x], 16, 16);
    }
}
