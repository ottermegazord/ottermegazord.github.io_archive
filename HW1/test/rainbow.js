var cx, cy; // center position of canvas
var radius;
var clockDiameter;

function setup() {
    createCanvas(800, 800);
    radius = Math.min(width, height) / 3;
    clockDiameter = radius * 1.8;
    cx = width / 2;
    cy = height / 2;
}

function draw(){
    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
    var s_color_r = map(second(), 0, 60, 0, 255)
    var s_color_b = map(second(), 0 , 60, 0, 100)
    var s_color_g = map(second(), 0 , 60, 100, 200)
    var h_color_r = map(second(), 0, 60, 0, 255)
    var h_color_b = map(second(), 0 , 60, 0, 100)
    var h_color_g = map(second(), 0 , 60, 100, 200)
    var m_color_r = map(second(), 0, 60, 0, 255)
    var m_color_b = map(second(), 0 , 60, 0, 100)
    var m_color_g = map(second(), 0 , 60, 100, 200)

    //second
    stroke(s_color_r, s_color_b, s_color_g);
    strokeWeight(20);
    line(cx + cos(s) * radius, cy + sin(s) * radius, cx + cos(s) * radius, cy + sin(s));//h
    // minute hand
    stroke(s_color_r, s_color_b, s_color_g);
    strokeWeight(20);
    line(cx + cos(s) * radius, cy + sin(s) * radius, cx + cos(s) * radius, cy + sin(s));//s
    // hour hand
    stroke(0);
    stroke(s_color_r, s_color_b, s_color_g);
    line(cx + cos(s) * radius, cy + sin(s) * radius, cx + cos(s) * radius, cy + sin(s) * radius);//m

    //minute
    stroke(m_color_r, m_color_g, m_color_b);
    strokeWeight(20);
    line(cx + cos(m) * radius, cy + sin(m) * radius, cx + cos(m) * radius, cy + sin(m));//h
    // minute hand
    stroke(m_color_r, m_color_g, m_color_b);
    strokeWeight(20);
    line(cx + cos(m) * radius, cy + sin(m) * radius, cx + cos(m) * radius, cy + sin(m));//s
    // hour hand
    stroke(0);
    stroke(m_color_r, m_color_g, m_color_b);
    line(cx + cos(m) * radius, cy + sin(m) * radius, cx + cos(m) * radius, cy + sin(m) * radius);//m

    //hour
    stroke(h_color_r, h_color_g, h_color_b);
    strokeWeight(20);
    line(cx + cos(h) * radius, cy + sin(h) * radius, cx + cos(h) * radius, cy + sin(h));//h
    // minute hand
    stroke(h_color_r, h_color_g, h_color_b);
    strokeWeight(20);
    line(cx + cos(h) * radius, cy + sin(h) * radius, cx + cos(h) * radius, cy + sin(h));//s
    // hour hand
    stroke(0);
    stroke(h_color_r, h_color_g, h_color_b);
    line(cx + cos(h) * radius, cy + sin(h) * radius, cx + cos(h) * radius, cy + sin(h) * radius);//m
}