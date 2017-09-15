
var xPos = 0;
var yPos = 2
function setup() {
  createCanvas(640, 480);
  background(220);
}

function draw() {
  console.log(second());
  console.log("It is: " + hour() + "and "  + minute());
  background(240)
  fill(255,0,0);
  rect(xPos,yPos,300,400);
  if (xPos == 1){
    xPos = 0
  }
  else{
  xPos = xPos + 22
  yPos = yPos + 1}
  /*if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);*/
}
