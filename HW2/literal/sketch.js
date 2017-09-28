// Sketch for using the darksky API
// https://darksky.net/dev/docs
// This sketch requires you to start a local server or run it on a server
// See more about how to do that here:
// https://github.com/processing/p5.js/wiki/Local-server

var queryResult;
var spaceData;
var cx, cy; // center position of canvas
// Radius for hands of the clock
var secondsRadius;
var clockDiameter;
var url = 'https://api.darksky.net/forecast/436fdc35bab87ffdf2f6cf130fc5ddc5/1.3521, 103.8198';
var spaceData;

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

function Drop(){

    this.x = random(width);
    this.y = random(-1000,-50);
    this.z = random(0,20);
    this.gravity = map(this.z,0,20,0.01,0.2);
    this.length = map(this.z,0,20,10,30);
    this.speed = map(this.z, 0, 20, 3,10);

    this.fall = function(){

        this.y += this.speed;
        this.speed += this.gravity;
        if (this.y > height){
            this.y = random(-100,-200);
            this.speed = map(this.z, 0, 20, 3,10);
        }
    }

    this.show = function(){
        //c
        stroke(255);
        strokeWeight(map(this.z, 0, 20, 1, 3));
        line(this.x, this.y, this.x, this.y + this.length);
    }
}


function setup() {
    createCanvas(320, 568);
    background(0);
    var radius = min(width, height) / 2;
    hoursRadius = radius * 0.50;
    clockDiameter = radius * 1.8;
    cx = width/2;
    cy = height/2;
    secondsRadius = radius * 0.72;


    newDrops = [];
    for (var i = 0; i < 250; i++) {
        newDrops.push(new Drop());
    };

    moon = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/f8/Earths_Moon.svg");
    sun = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/fc/Sun_icon.svg");
}

function askDarkSky(){
    loadJSON(url, getData, 'jsonp');
}

function getData(data){
    spaceData = data;
}

function draw(){
    setInterval(askDarkSky, 1000);
    background(0);
    var s = map(hour(), 0, 60, 0, TWO_PI) - PI;
    if (spaceData) {
        stroke(0);
        currentWeather = spaceData.minutely;
        date = timeConverter(currentWeather.time);
        //console.log(date);
        if(hour() > 7 && hour() < 19 ) {
            line(255);
            fill(255, 153, 0);
            // image(moon, cx + cos(s) * secondsRadius, cx + sin(s) * secondsRadius, moon.width/30, moon.height/30)
            ellipse(cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius, 40, 40);
        }
        // else if (second() > 30){
        //     fill(100);
        //     image(moon, 0, height/2, moon.width/2, moon.height/2)
        //     //ellipse(cx + cos(s - PI) * secondsRadius, cy + sin(s - PI) * secondsRadius, 40, 40);
        // }//ellipse(cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
        //
        // if(second() < 31) {
        //     fill(50);
        //     image(sun, 0, height/2, moon.width/2, moon.height/2)
        //     //ellipse(cx + cos(s - PI) * secondsRadius, cy + sin(s - PI) * secondsRadius, 40, 40);
        // }
        else {
            fill(115, 115, 115);
            // image(sun, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius, sun.width/10, sun.height/10)
            ellipse(cx + cos(s + PI) * secondsRadius, cy + sin(s + PI) * secondsRadius, 40, 40);
        }

        console.log(currentWeather.time)
        if(currentWeather.precipType == "snow" ){
            newDrops.forEach(function(drop){
                drop.fall();
                drop.show();
            });
        }

        stroke(0);
        fill(255);
        time = timeConverter(currentWeather.time)
        text(time, width/2.3, height/2);

    }
}
