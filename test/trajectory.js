function setup() {
    createCanvas(1000,400);
    fill(20);
    background(255)
}

function draw() {

    var s = map(second(), 0, 60, 0, 800);
    var x = map(second(), 0, 60, 0, 800);
    y = x*tan(PI/6) - ((9.81*9.81)/(2 * 95.5 * 95.5 * cos(PI/6)*cos(PI/6) ));
    console.log(y, second())
    background(255)
    stroke(0);
    strokeWeight(20);
    line(10, 300, 810, 300);

    stroke(5);
    strokeWeight(15);
    fill(20);
    ellipse(x, y, 55, 55);
    ellipse(s, 300, 55, 55);
}