var x, y;
var xspacing = 70;
var w;
var theta = 10.0;
var period = 500.0;
var dx;
var yvalues;
var s;

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

    calcWave()
    renderWave()

    fill(100);

    for (count = 0; count < 61; count++){
        fill(100)
        ellipse((720/24) * hour(), (400/24) * hour(), 100, 100)
        console.log(count)
    }

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

    x = x + random(-8, 8);
    y = y - s/20;

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
    theta += 0.05;
    s = map(second(), 0, 60, 0, 100)
    m = map(minute(), 0, 60, 0, height/2)
    amplitude = m;

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
    }
}
