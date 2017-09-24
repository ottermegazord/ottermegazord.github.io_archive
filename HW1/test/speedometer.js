
var cx, cy;
var minutesRadius

function setup() {
	createCanvas(800,500);
	background(100)

    var radius = min(width, height);
}



function draw(){

    s = map(second(), 0, 60, 0, 700);
    m = map(minute(), 0, 60, 0, 700);
    background(100);
    fill(60);
    arc(400, 400, 700, 700, -PI/8 - PI/2, PI/8 - PI/2, PIE);
    fill(25);
    arc(400, 400, m, m, -PI/8 - PI/2, PI/8 - PI/2, PIE);
    fill(50);
    arc(400, 400, 700, 700, -3*PI/5, PI/10 - PI/2, PIE);
    fill(80);
    arc(400, 400, s, s, -3*PI/5, PI/10 - PI/2, PIE);
    rect(360, 80, 80, 50);
    fill(0);
    textSize(30);
    textFont("Courier")
    text(hour(), 385, 115)



    // background(100);
    // fill(50);
    // mouth = random(0,2);
    // if ((second() %2 ) == 0){
    //     fill(50)
    //     arc(400, 250, 80, 80, -3*PI/4, 5*PI/4 - PI/2, PIE);
    //     console.log(mouth)
    // }
    // else{
    //     fill(50)
    //     arc(400, 250, 80, 80, -3*PI/4 - PI/4, 5*PI/4 + PI/4 - PI/2, PIE);
    // }z



}