// rain streams
var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;
var newDrops;

// sun parameters
var cx, cy;

var xcor = 0;
var ycor = 0;
var xvel = 5;
var yvel = 3;

//weather parameters

var curr_temp;
var visibility;
var weather;
var timer;
var icon;
var max_temp;
var min_temp;
var temphour_1;
var temphour_2;
var temphour_3;
var temphour_4;
var windSpeed;
var summary;
var day_temp;
var boatPos;
var boat2Pos;
var y = 0;
var x = 0;
var xPos = 0;

var s;

//var searchBox = new google.maps.places.SearchBox();

var api = "https://api.darksky.net/forecast/";
var city = 'Cambridge, MA';
// var lat = 1.290270;
// var long = 103.851959;
var lat = 42.3736;
var long = -71.1097;
var apiKey = "a0646b621a688dc51bdbab269421f606";
var units = '&units=metric';
var url = api + apiKey + '/' + lat + ',' + long;

function changeLngLat(new_lng, new_lat){
    lat = new_lat;
    long = new_lng;
}



// images

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
    return time;
}

function hourConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    return hour;
}

function dayConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var day = a.getDay();
    var word_day;
    switch(day){
        case 0:
            return 'SUN';
            break;
        case 1:
            return 'MON';
            break;
        case 2:
            return 'TUE';
            break;
        case 3:
            return 'WED';
            break;
        case 4:
            return 'THU';
            break;
        case 5:
            return 'FRI';
            break;
        case 6:
            return 'SAT';
            break;
    }
}


function graphData(newData) {
    // map the range of the input to the window height:
    var yPos = map(newData, 0, 255, 0, height);
    // draw the line in a pretty color:
    stroke(0xA8, 0xD9, 0xA7);
    line(xPos, height, xPos, height - yPos);
    // at the edge of the screen, go back to the beginning:
    if (xPos >= width) {
        xPos = 0;
        // clear the screen by resetting the background:
          background(0x08, 0x16, 0x40);
    } else {
        // increment the horizontal position for the next reading:
        xPos += 0.01;
    }
}

function setup() {
    // sun parameters
    img = loadImage('images/8bitcloud.png');
    boat = loadImage('images/boat.png');
    boat2 = loadImage('images/boat2.png');
    sun = loadImage('images/sun.png');
    moon = loadImage('images/moon.png');
    lighthouse = loadImage('images/lighthouse.png');
    waves = loadImage('images/waves.png');

    boatPos = 0;
    boat2Pos = width;

    var radius = min(width, height) / 2;
    sradius = radius * 2;
    askWeather();
    //console.log(summary);
    //setInterval(askWeather, 60000);
    createCanvas(320, 568);
    cx = width/2;
    cy = height/2 - 100;
    textAlign(CENTER);
    textSize(50);

    //rain
    newDrops = [];
    for (var i = 0; i < 250; i++) {
        newDrops.push(new Drop());
    };

    newSnow = [];
    for (var i = 0; i < 250; i++) {
        newSnow.push(new Snow());
    };
}



function askWeather(){
    loadJSON(url, gotData, 'jsonp');
}

//test geocoding



function gotData(data) {
    weather = data;
    console.log(weather);
    timer = weather.currently;
    visibility = weather.currently.visibility;
    summary = weather.minutely.summary;
    minutely_icon = weather.minutely.icon;
    curr_temp = weather.currently.temperature;
    icon = weather.minutely.icon;
    max_temp = weather.daily.data[0].temperatureMax;
    min_temp = weather.daily.data[0].temperatureMin;

    temphour_1 = weather.hourly.data[0].temperature;
    temphour_2 = weather.hourly.data[1].temperature;
    temphour_3 = weather.hourly.data[2].temperature;
    temphour_4 = weather.hourly.data[3].temperature;

    icon_1 = weather.hourly.data[0].icon;
    icon_2 = weather.hourly.data[1].icon;
    icon_3 = weather.hourly.data[2].icon;
    icon_4 = weather.hourly.data[3].icon;

    time_1 = hourConverter(weather.hourly.data[0].time);
    time_2 = hourConverter(weather.hourly.data[1].time);
    time_3 = hourConverter(weather.hourly.data[2].time);
    time_4 = hourConverter(weather.hourly.data[3].time);

    //daily

    tempday_1 = weather.daily.data[0].apparentTemperatureMin;
    tempday_2 = weather.daily.data[1].apparentTemperatureMin;
    tempday_3 = weather.daily.data[2].apparentTemperatureMin;
    tempday_4 = weather.daily.data[3].apparentTemperatureMin;

    dicon_1 = weather.daily.data[0].icon;
    dicon_2 = weather.daily.data[1].icon;
    dicon_3 = weather.daily.data[2].icon;
    dicon_4 = weather.daily.data[3].icon;

    day_1 = dayConverter(weather.daily.data[0].time);
    day_2 = dayConverter(weather.daily.data[1].time);
    day_3 = dayConverter(weather.daily.data[2].time);
    day_4 = dayConverter(weather.daily.data[3].time);

    day_temp = [day_1, day_2, day_3, day_4];

    windSpeed = weather.currently.windSpeed;
    windBearing = weather.currently.windBearing;
    humidity = weather.currently.humidity;
    //console.log(visibility);
    return summary;

    //hours

    //console.log(timer);
}

function Symbol(x, y, speed) {
    this.x = x;
    this.y = y;
    this.value = 'x';
    this.speed = speed;

    this.render = function(){
        fill(0, 255, 70);
        text(this.value, this.x, this.y);
        this.rain();
    }

    this.rain = function(){
        this.y += this.speed;
    }
}

function eightbitcloud(icon, img, x, y){
    if (icon == 'cloudy'|| icon == 'partly-cloudy-day' || icon == 'partly-cloudy-night'){
        if (icon == 'cloudy'){
            var i = 0;
            for (i = 1; i <= 10; i++){
                image(img, i*width/10 - 100 + i*10, random(-1,1),  img.width/3, img.height/3);
                image(img, i*width/10 - 100 + i*22, random(-1,1) - 28,  img.width/3, img.height/3);
            }

        }
        //image(img, x-20, y-20, img.width/5, img.height/5);
        //image(img, x-40, y-40, img.width/5, img.height/5);
        //image(img, x-40, y + 40, img.width/5, img.height/5);
        image(img, x - 50, y - 30,  img.width/3, img.height/3);
        image(img, x - 70, y - 40,  img.width/3, img.height/3);
        image(img, x - 70, y - 10,  img.width/3, img.height/3);
        image(img, x - 70, y - 10,  img.width/3, img.height/3);
        image(img, x - 40, y - 10,  img.width/3, img.height/3);
        image(img, x, y,  img.width/3, img.height/3);
        image(img, x + 10, y + 10,  img.width/3, img.height/3);
        //console.log('running');
    }
}

function sun(time, px, py){
  translate(px, py);
  rotate(radians(time));
  fill(255);
  ellipse(0, 0, 100, 100);

}

function Snow(){

    this.x = random(width);
    this.y = random(-1000,-50);
    this.z = random(0,20);
    this.gravity = map(this.z,0,1,0.14,0.012);
    // this.gravity = map(this.z,0,20,0.01,0.2);
    this.length = map(this.z,0,20,10,30);
    this.speed = map(this.z, 0, 100, 3,10);

    this.fall = function(){

        this.y += this.speed;
        this.speed += this.gravity;
        if (this.y > height){
            this.y = random(-100,-200);
            this.speed = map(this.z, 0, 20, 3,6);
        }
    }

    this.show = function(){
        //console.log(this.y);
        stroke(50);
        strokeWeight(map(this.z, 0, 20, 1, 3));
        rect(this.x, this.y, 20, 20);
    }
}
function snow() {
    newSnow.forEach(function(snow){
        fill(255);
        snow.fall();
        snow.show();
    })
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
            this.speed = map(this.z, 0, 20, 3,6);
        }
    }

    this.show = function(){
        //console.log(this.y);
        stroke(50);
        strokeWeight(map(this.z, 0, 20, 1, 3));
        line(this.x, this.y, this.x, this.y + this.length);
    }
}
function rain() {
    newDrops.forEach(function(drop){
        drop.fall();
        drop.show();
    })
}

function draw() {
    var h = map(hour() + norm(minute(), 0, 60), 0, 23, 0, PI * 2) - HALF_PI;
    //var h = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    //var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
    //var h = map(second(), 0, 59, 0, 2*PI) + PI/2;
    //var h = 10/23 * 2 * PI - PI/2;
    h = 10/23 * PI * 2 - HALF_PI;
    console.log(second() % 12);

    // var h = 1/23 * 2*PI + PI/2;
    background(200);
    if(weather){
        temperature = map(curr_temp, 0, 100, 0, 255);
        stroke(200);

        if (h > (7/23*2*PI-PI/2) && h < (19/23*2*PI-PI/2)){ //6 19
            background(204, 255, 255);
            //h = /24 * TWO_PI - HALF_PI;
            image(sun, cx + cos(h + PI) * sradius - 65, cy + sin(h + PI) * sradius - 60, sun.width*2, sun.height*2);
            eightbitcloud('cloudy', img, random(-1, 1) + cx + cos(h + PI) * sradius , random(-1, 1) + cy + sin(h + PI) * sradius + 20);
            textSize(15);
            //ellipse(cx, cy, 40, 40);
        }

        else{
            console.log('running');
            background(46, 64, 83);
            image(moon, cx + cos(h) * sradius - 65, cy + sin(h) * sradius, sun.width*2, sun.height*2);
            eightbitcloud(minutely_icon, img, random(-1, 1) + cx + cos(h) * sradius - 65, random(-1, 1) + cy + sin(h) * sradius);
            textSize(15);
        }

        // image(sun, random(-1, 1) + cx + cos(test_h) * sradius, random(-1, 1) + cy + sin(test_h) * sradius, sun.width, sun.height);
        // image(sun, random(-1, 1) + cx + cos(h) * sradius, random(-1, 1) + cy + sin(h) * sradius, sun.width, sun.height);

        //ellipse(random(-1, 1) + cx + cos(h) * sradius, random(-1, 1) + cy + sin(h) * sradius, 200, 200);

        if(minutely_icon == 'rain'){
            //console.log(minutely_icon);
            rain();
        }

        if(minutely_icon == 'thunderstorm'){
            //console.log(minutely_icon);
            rain();
        }

        if(minutely_icon == 'snow'){
            //console.log(minutely_icon);
            rain();
        }

        //eightbitcloud(minutely_icon, img, random(-1, 1) + cx + cos(h) * sradius, random(-1, 1) + cy + sin(h) * sradius);
        // eightbitcloud('cloudy', img, random(-1, 1) + cx + cos(h) * sradius - 65, random(-1, 1) + cy + sin(h) * sradius);
        textSize(15);

        fill(255, temperature, 0);

        triangle(60, height/2 - 52, width, height/2 - 5*visibility, width, height/2 + 5*visibility);
        fill(0, 0, 255);
        image(lighthouse, -30, height/2 - 85, lighthouse.width * 5, lighthouse.height * 5);
        //rect(40, height/2-40, 20, 40);
        //rect(20, height/2, 60, 370);
        //image(waves, - 20 + random(-1, 1), 4*height/6 - 50, waves.width*3, waves.height*3);
        fill(100);
        rect(0, 4*height/6 + boat.height/2 - 40, 100, 50);
        //rect(0, 4*height/6 + boat.height/2 - 20, width, 200);
        image(waves, -10 + random(-1, 1), 4*height/6, waves.width * 3, waves.height * 3);
        image(waves, - 10 + random(-1, 1), 4*height/6 + 30, waves.width*3, waves.height*3);
        image(waves, -20 + random(-1, 1), 4*height/6 + 60, waves.width*4, waves.height*4);

        image(boat, boatPos, 4*height/6 - 45, boat.width * 4, boat.height * 4);
        boatPos += windSpeed;
        if (boatPos>width){
            boatPos = -10;
        }

        image(boat2, boat2Pos, 4*height/6 + 30, boat.width * 4, boat.height * 4);
        boat2Pos -= 0.8*windSpeed;
        if (boat2Pos < - 100){
            boat2Pos = width;
        }

        snow();

        console.log(minutely_icon);

        // //console.log(visibility);
    }

}


