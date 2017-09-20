var x, y;

function setup() {
    createCanvas(720, 400);
    // Starts in the middle
    x = width / 2;
    y = height;
}

function draw() {
    background(100);

    var s = map(second(), 0, 60, 0, 255);
    var m = map(minute(), 0, 60, 255, 0);
    var count = 0;

    // Draw a circle
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