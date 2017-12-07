
var numRows;
var numCirclesPerRow;
var rad;
var speed;

function setup() {
  createCanvas(1000, 800);
  colorMode(HSB);
  background(0);

}


function draw() {
  background(0);
  s = map(second(), 0, 60, 0, 60);
  h = map(hour(), 0, 23, 1, 24);
  m = map(minute(),0, 60, 0, 12);
  numCirclesPerRow = hour() % 12 + 1;
  numRows = m; //h;
  rad = 10;
  speed = 0.05;

  for (var r=0; r<numRows; r++) {
    for (var i=0; i<=numCirclesPerRow; i++) {
      
      var cx = map(i, 0, numCirclesPerRow, -100, width+100);
      var cy = map(r, 0, numRows, -100, height+100);
      
      var distFromCenter = dist(cx, cy, width/2, height/2);
      var angle = frameCount*speed + distFromCenter*0.02 + i*0.1;
      
      var x = cx + rad * cos(angle);
      var y = cy + rad * sin(angle);
      
      var offset = map(frameCount, 0, TWO_PI/speed, 0, 255);
      var h_ = (distFromCenter + offset) % 255;
      var s_ = 200;
      var b_ = 200;
      
      fill(h_, s_, b_);
      ellipse(x, y, s, s);
    }  
  }
}