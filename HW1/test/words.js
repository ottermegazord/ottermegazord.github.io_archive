var x;

var x, y, z;

function setup() {
    createCanvas(300, 300);
    earth = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/fa/Globe.svg");
    // Starts in the middle
    x = width;
    y = height/2;
    z = 0;
}

function secondD(number){
    digit = Math.floor((number/10)%10);
    if (digit == 1){
        return "one"
    }
    if (digit == 2){
        return "zwei"
    }
    if (digit == 3){
        return "tre"
    }
    if (digit == 4){
        return "fire"
    }
    if (digit == 5){
        return "pump"
    }
    if (digit == 6){
        return "hex"
    }
    if (digit == 7){
        return "seitsemän"
    }
    if (digit == 8){
        return "zortzi"
    }
    if (digit == 9){
        return "ongačiel"
    }
    if (digit == 0){
        return "eber"
    }

}

function firstD(number){
    var digit = Math.floor(number%10);
    if (digit == 1){
        return "satu"
    }
    if (digit == 2){
        return "tu"
    }
    if (digit == 3){
        return "caqr"
    }
    if (digit == 4){
        return "lim"
    }
    if (digit == 5){
        return "pesse"
    }
    if (digit == 6){
        return "sex"
    }
    if (digit == 7){
        return "sibun"
    }
    if (digit == 8){
        return "minr"
    }
    if (digit == 9){
        return "zar"
    }
    if (digit == 0){
        return "ZERO"
    }

}

function draw() {

    background(200);
    image(earth, width/2-60, 3* height / 4 - 40, earth.width/5, earth.height/5);
    textSize(50)
    text(secondD(hour()) + firstD(hour()), width/2 -100, height/2 - 20);
    text(secondD(minute()) + firstD(minute()), width/2 - 100, height/2);
    console.log(secondD(minute()) + firstD(minute()))

    displaymissile();
    movemissile();
    displaydeadzone();
    resetmissile();


}

var growth = 1;
var gravity = 0.1;
var missile = {
    x: 150,
    y: -10,
    x2: 150,
    y2: 0,
    speed: 0
};

var deadzone = {
    x: 150,
    y: 200,
    w: 20,
    h: 10,
};



function displaymissile() {
    fill("#FF0000");
    stroke(0);
    line(missile.x, missile.y, missile.x2, missile.y2);
}

function movemissile() {
    missile.y = missile.y + missile.speed;
    missile.y2 = missile.y2 + missile.speed;
    missile.speed = missile.speed + gravity;
}

function displaydeadzone() {
    if (missile.y > deadzone.y) {
        missile.y = deadzone.y;
        ellipse(deadzone.x, deadzone.y, deadzone.w, deadzone.h);

        if (missile.y2 > deadzone.y) {
            missile.y2 = deadzone.y;
            deadzone.w = deadzone.w + growth;
            deadzone.h = deadzone.h + growth / 2;
        }
    }
}

function resetmissile() {
    if (deadzone.w > height/3) {
        background(255);
        missile.y = -10;
        missile.y2 = 0;
        missile.speed = 0;
        deadzone.w = 20;
        deadzone.h = 10;
    }
}


