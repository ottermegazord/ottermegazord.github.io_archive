// rain streams
var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;

// sun parameters
var cx, cy

//weather parameters

var curr_temp;
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
    var radius = min(width, height) / 2;
    sradius = radius * 0.72;
    cx = width/2;
    cy = height/2;
    askWeather();
    console.log(summary);
    //setInterval(askWeather, 60000);
    createCanvas(320, 568);
    textAlign(CENTER);
    textSize(50);
    img = loadImage('images/cat.jpg');
}



function askWeather(){
    loadJSON(url, gotData, 'jsonp');
}

//test geocoding



function gotData(data) {
    weather = data;
    timer = weather.currently;
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
    console.log(summary);
    return summary;

    //hours

    console.log(timer);
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

function sun(time, px, py){
  translate(px, py);
  rotate(radians(time));
  fill(255);
  ellipse(0, 0, 100, 100);

}

function draw() {
    background(255);
    if(weather){
        h = map(hour(), 0, 24, 0, PI) - 7*PI/12;
        temperature = map(curr_temp, 0, 100, 0, 255);
        fill(temperature);
        stroke(200);
        ellipse(cx + cos(h) * sradius, cy + sin(h) * sradius + 2*windSpeed*random(-5,5), 20, 20);

        textSize(15);

        for (i = 0; i<5; i++){
            text(summary, x+i, y-i);
            text(summary, x+5*i, y+5*i);
            text(summary, x+10*i, y-10*i);
            y += windSpeed/30;
            x += windSpeed/30;
            if (y== height){
                y = 0;
                console.log("done");
            }
            if (x== width){
                x = 0;
                console.log("done");
            }
            graphData(random(0,1));
            console.log(tempday_1, tempday_2);
        }
        // text(summary, width/2, y);
        // y += 1;
        var test = [40, 1.3, 20];
        console.log(summary);
    }

}


