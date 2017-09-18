var half_width, day_width, old_second, old_hour, today, date, mills, m_width;

function setup() {
    //devicePixelScaling(false)
    createCanvas(windowWidth, windowHeight);

    date = new Date();
}//end setup


function draw() {
    ;

    half_width = windowWidth/2;
    day_width = windowWidth/6;
    m_width = map(second(), 0, 60, 0, windowHeight);

    background(255);
    //translate origin to center
    translate(width/2, height/2);
    strokeCap(SQUARE);

    if(second() != old_second){
        mills = millis();
        old_second = second();
    }

    //only check what day it is if the hour has changed.
    if(hour() != old_hour){
        today = date.getDay();
        old_hour = hour();
    }

    // //second
    // fill("#669900");
    // noStroke();
    // arc(0,0,half_width+windowWidth/6, half_width+windowWidth/6, -PI/2, TWO_PI*((second()+((millis()-mills)/1000)-15)/60));
    // fill(15);
    // noStroke();
    // ellipse(0,0,half_width, half_width)

    //minute
    fill("#669900");
    stroke("#669900");
    arc(0,0,half_width, half_width, -PI/2,TWO_PI*((minute()+(second()/60)-15)/60));
    fill(15);
    noStroke();
    ellipse(0,0,half_width-windowWidth/6, half_width-windowWidth/6)

    //hour
    fill("#0D47A1");
    stroke("#0D47A1");
    arc(0,0,half_width-windowWidth/6, half_width-windowWidth/6, -PI/2,TWO_PI*((hour()+(minute()/60)-3)/12));
    fill(15);
    noStroke();
    ellipse(0,0,half_width-windowWidth/3, half_width-windowWidth/3)

    //translate back to corner
    translate(-width/2, -height/2);

    //second bar
    fill("#263238");
    noStroke();
    rect(0, m_width, windowHeight/5, windowHeight);
    //rect(0, windowHeight-50, today*day_width + ((hour()/23)*day_width), windowHeight);

    //day dashes
    stroke(100);
    for(i = 1; i < 6; i++){
        line(0,i*windowHeight/6, windowWidth/4,i*windowHeight/6);
    }

}//end loop


//if the window is resized, resize the canvas to fit the new window size
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}//end windowResized