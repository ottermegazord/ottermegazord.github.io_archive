var angleS = 0.0;
var angleM = 0.0;
var angleH = 0.0;
var sx = 0
var sy = 0;
var mx = 0
var my = 0;
var hx = 0
var hy = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    bg = loadImage("https://upload.wikimedia.org/wikipedia/commons/e/e5/Milky_Way_Galaxy_and_a_meteor.jpg")
    img = loadImage("https://upload.wikimedia.org/wikipedia/commons/e/e2/Ambox_globe.svg");
    pluto = loadImage("https://upload.wikimedia.org/wikipedia/commons/1/1b/Satellite_of_GDAL.svg");
    moon = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/f8/Earths_Moon.svg");
    sun = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/f3/Sun_orange_icon.svg");
}

function draw() {
    background(255);
    background(bg);
    translate(width / 2, height / 2);
    fill(100);
    strokeWeight(2);
    stroke(0);
    ellipse(0, 0, 400, 400);
    ellipse(0, 0, 165, 165);
    ellipse(0, 0, 120, 120);
    ellipse(0, 0, 60, 60);
    image(sun, width/2, height/2);

    angleS = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    angleM = map(minute(), 0, 60, 0, TWO_PI) - HALF_PI;
    angleH = map(hour(), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    sx = cos(angleS) * 165;
    sy = sin(angleS) * 165;
    mx = cos(angleM) * 120;
    my = sin(angleM) * 120;
    hx = cos(angleH) * 60;
    hy = sin(angleH) * 60;

    image(pluto, sx, sy, img.width/10, img.height/10);
    image(moon, mx, my, img.width/20, img.height/20);
    image(img, hx, hy, img.width/10, img.height/10);


}
