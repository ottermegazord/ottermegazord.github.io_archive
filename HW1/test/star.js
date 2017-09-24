var x;

var x, y, z;

function setup() {
    createCanvas(720, 400);
    homer = loadImage("https://media.giphy.com/media/xT5LMQ2BWhY9uZAhiM/giphy.gif");
    // Starts in the middle
    x = width;
    y = height/2;
    z = 0;
}

function draw() {
    background(200);

    //image(homer, 0, 0);
    // Draw a circle

    push();
    translate(width/2, height/2);
    rotate(frameCount / 70.0);
    star(0, 0, 90, 180, Math.floor((minute()/10)%10));
    console.log(minute()/10);
    pop();

    push();
    translate(width/2, height/2);
    rotate(frameCount / 70.0);
    star(0, 0, 80, 50, int(minute()%10));
    console.log(minute()%10);
    pop();

    stroke(50);
    fill(100);
    ellipse(x, y, 30, 30);
    fill(255)
    ellipse(x, y, 10, 10);
    textSize(40)
    text(hour(), z, y);

    y = y + random(-1, 1);
    x = x - 5;
    z = z + 5;

    if (z > width/2){
        z = 0;
    }

    if (x < width/2) {
        x = width;
        fill(0);
        textSize(2*second() + 40);
        text(second(), width/2, height/2);
    }
}


function star(x, y, radius1, radius2, npoints) {
    var angle = TWO_PI / npoints;
    var halfAngle = angle/2.0;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius2;
        var sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a+halfAngle) * radius1;
        sy = y + sin(a+halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}