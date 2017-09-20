
var d = 70;
var p1 = d;
var p2 = p1+d;
var p3 = p2+d;
var p4 = p3+d;

//this gets called only once in the very beginning
function setup() {
	createCanvas(800,500);
	background(100)
    img = loadImage("assets/white_runner_md.jpg");
}

//this gets called every frame (about 60 frames per second)
function draw(){
    background(100)
    fill(255);
    ellipse(30, 40, 40, 30);
    stroke(255);
    var i;
    var j;
    textSize(30)
    var m = map(minute(), 0, 60, 0, windowWidth)

    for (i = 100; i < 700; i+= 100 ) {
        text(hour(), i, 50);
    }
    for (i = 100; i < 700; i+= 100 ) {
        text(second(), i, 550);
    }
    for (i = 100; i < 700; i+= 100 ){
        for (j = 100; j < 500; j+= 100)
          line(i + second(), j , i, j + 50 + second())
    }

    for (i = 100; i < 700; i+= 100 ){
        for (j = 100; j < 500; j+= 100)
            line(i + second(), j , i, j + 50 + second())
    }

    image(img, 100, 100);

    stroke(200);
    fill(255)
    strokeWeight(1)
    for(i = 1; i < 6; i++){
        line(0,i*windowHeight/6, m,i*windowHeight/6);
        text(minute(), m, i*windowHeight/6);
        image(img, m - 30, i*windowHeight/6,img.width/4, img.height/4);
    }

}