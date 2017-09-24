// var x = 20;
// var y = 20;
// var bw = 100;
// var lengthBar = 400;

function setup() {
    createCanvas(480,430);
}

function draw() {
    background(0);
    fill(255, 0, 0);

    var x = 20;
    var y = 20;
    var bw = 100;
    var lengthBar = 400;

    var d = map(day(), 0, 31, 0, lengthBar);
    var h = map(hour(), 0, 60, 0, lengthBar);
    var m = map(minute(), 0, 60, 0, lengthBar);
    var s = map(second(), 0, 60, 0, lengthBar);

    var c_s = map(second(), 0, 60, 255, 0);
    var c_m = map(minute(), 0, 60, 255, 0);
    var c_h = map(hour(), 0, 24, 255, 0);
    var c_d = map(day(), 0, 31, 255, 0);

    fill(c_d);
    rect(x,y, bw, d);
    fill(c_h);
    rect(x + bw + 10, y, bw, h);
    fill(c_m);
    rect(x + 2*bw + 20 ,y, bw,m);
    fill(c_s);
    rect(x + 3*bw + 30 ,y, bw,s);
}