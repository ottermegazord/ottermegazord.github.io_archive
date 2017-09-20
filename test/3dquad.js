function setup() {
    createCanvas(800, 800, WEBGL);
}

function draw() {
    var t1x = 0;
    var t1y = map(sin(0.011 * frameCount + 10), -1, 1, -100, 100);
    var t1z = 0;
    var t2x = map(sin(0.0013 * frameCount + 15), -1, 1, -100, 100);
    var t2y = 0;//map(sin(0.009 * frameCount + 20), -1, 1, -200, 200);
    var t2z = map(sin(0.015 * frameCount + 35), -1, 1, -100, 100);

    var xang = map(sin(0.008 * frameCount + 40), -1, 1, 0, TWO_PI);
    var sx = map(sin(0.046 * frameCount + 25), -1, 1, 0, 200);
    var sy = map(sin(0.018 * frameCount + 55), -1, 1, 0, 200);
    var sz = map(sin(0.021 * frameCount + 65), -1, 1, 0, 200);

    var m1x = 0;//map(sin(0.012 * frameCount + 5), -1, 1, -200, 200);
    var m1y = map(sin(0.011 * frameCount + 10), -1, 1, -200, 200);
    var m1z = 0;//map(sin(0.014 * frameCount + 30), -1, 1, -200, 200);
    var m2x = map(sin(0.0013 * frameCount + 15), -1, 1, -200, 200);
    var m2y = 0;//map(sin(0.009 * frameCount + 20), -1, 1, -200, 200);
    var m2z = map(sin(0.015 * frameCount + 35), -1, 1, -200, 200);

    var h1x = 0;//map(sin(0.012 * frameCount + 5), -1, 1, -200, 200);
    var h1y = map(sin(0.011 * frameCount + 10), -1, 1, -400, 400);
    var h1z = 0;//map(sin(0.014 * frameCount + 30), -1, 1, -200, 200);
    var h2x = map(sin(0.0013 * frameCount + 15), -1, 1, -400, 400);
    var h2y = 0;//map(sin(0.009 * frameCount + 20), -1, 1, -200, 200);
    var h2z = map(sin(0.015 * frameCount + 35), -1, 1, -400, 400);


    translate(0, 0, -200);
    rotateY(0.008 * frameCount);

    for (var i = 0; i < second(); i++) {
        push();
        rotateZ(map(i, 0, second(), 0, TWO_PI));
        translate(t1x, t1y, t1z);
        for (var j = 0; j < 1; j++) {
            push();
            rotateY(map(j, 0, second(), 0, TWO_PI));
            translate(t2x, t2y, t2z);
            box(sx, sy, sz);
            pop();
        }
        pop();
    }

    for (var i = 0; i < minute(); i++) {
        push();
        rotateZ(map(i, 0, minute(), 0, TWO_PI));
        translate(m1x, m1y, m1z);
        for (var j = 0; j < 1; j++) {
            push();
            rotateY(map(j, 0, minute(), 0, TWO_PI));
            translate(m2x, m2y, m2z);
            box(sx, sy, sz);
            pop();
        }
        pop();
    }

    for (var i = 0; i < hour(); i++) {
        push();
        rotateZ(map(i, 0, hour(), 0, TWO_PI));
        translate(h1x, h1y, h1z);
        for (var j = 0; j < 1; j++) {
            push();
            rotateY(map(j, 0, hour(), 0, TWO_PI));
            translate(h2x, h2y, h2z);
            box(sx, sy, sz);
            pop();
        }
        pop();
    }
}