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
var y = 0;
var x = 0;
var xPos = 0;

var s;

//var searchBox = new google.maps.places.SearchBox();

var api = "https://api.darksky.net/forecast/";
var city = 'Cambridge, MA';
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

    boatPos = 0;

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
    console.log(visibility);
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
        //image(img, x-20, y-20, img.width/5, img.height/5);
        //image(img, x-40, y-40, img.width/5, img.height/5);
        //image(img, x-40, y + 40, img.width/5, img.height/5);
        image(img, x - 50, y - 30,  img.width/5, img.height/5);
        image(img, x - 70, y - 40,  img.width/5, img.height/5);
        image(img, x - 70, y - 10,  img.width/5, img.height/5);
        image(img, x - 70, y - 10,  img.width/5, img.height/5);
        image(img, x - 40, y - 10,  img.width/5, img.height/5);
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
        rect(this.x, this.y, 20, 20);
    }
}
function snow() {
    newSnow.forEach(function(snow){
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
    var h = map(hour(), 0, 23, 0, 2*PI) + PI/2;
    var h;

    // var h = 1/23 * 2*PI + PI/2;
    background(200);
    if(weather){
        // temperature = map(curr_temp, 0, 100, 0, 255);
        // fill(temperature);
        stroke(200);

        if (hour() > 6 || hour() < 19){
            fill(255, 102, 0);
        }

        else{
            fill(46, 64, 83);
        }
        ellipse(random(-1, 1) + cx + cos(h) * sradius, random(-1, 1) + cy + sin(h) * sradius, 60, 60);

        if(minutely_icon == 'rain'){
            //console.log(minutely_icon);
            rain();
        }

        if(minutely_icon == 'thunderstorm'){
            //console.log(minutely_icon);
            setInterval()
            rain();
        }

        if(minutely_icon == 'snow'){
            //console.log(minutely_icon);
            rain();
        }
        eightbitcloud(minutely_icon, img, random(-1, 1) + cx + cos(h) * sradius, random(-1, 1) + cy + sin(h) * sradius);
        textSize(15);

        fill(18, 130, 249);

        triangle(60, height/2-20, width, height/2 - 10*visibility, width, height/2 + 10*visibility);
        rect(40, height/2-40, 20, 40);
        rect(20, height/2, 60, 370);
        rect(0, 4*height/6 + boat.height/2 - 40, 120, 30);
        rect(0, 4*height/6 + boat.height/2 - 20, width, 200);
        image(boat, boatPos, 4*height/6, boat.width/2, boat.height/2);
        boatPos += windSpeed;
        if (boatPos>width){
            boatPos = -10;
        }

        console.log(visibility);
    }

}


