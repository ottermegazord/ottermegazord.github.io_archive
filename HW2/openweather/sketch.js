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

//var searchBox = new google.maps.places.SearchBox();

var api = "https://api.darksky.net/forecast/";
var city = 'Cambridge, MA';
var lat = 42.3736;
var long = -71.1097;


function changeLngLat(new_lng, new_lat){
    lat = new_lat;
    long = new_lng;
}

var apiKey = "a0646b621a688dc51bdbab269421f606";
var units = '&units=metric';
var url = api + apiKey + '/' + lat + ',' + long;

var news_api = "https://newsapi.org/v1/articles?";
var source = "source=techcrunch"
var news_apiKey = "apiKey=39ab5a0a119c48deb4457229e931ad65";
var news_url = news_api + source + '&' + news_apiKey;
var news_title;
var news;
var test = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=39ab5a0a119c48deb4457229e931ad65';
var news_1;
var news_2;
var news_3;
var news_4;

var ticker_x = 320;

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

function setup() {
    createCanvas(320, 568);
    askWeather()
    setInterval(askNews(),1000000);
    // input = createInput();
    // input.position(20, 65);
    //
    // button = createButton('go!');
    // button.position(input.x + input.width, 65);
    // button.mousePressed(greet);
    //
    // greeting = createElement('h2', 'what is your city?');
    // greeting.position(20, 5);

    textAlign(CENTER);
    textSize(50);
    clear_night = loadImage('images/main-qimg-ddd632b74daa70e59cb90e13bff2af34-c.jpeg');
    clear_sky = loadImage('images/background-21717_1280.jpg');

    clear_day_icon = loadImage('images/clear-day.svg');
    clear_night_icon = loadImage('images/clear-night.svg');


}

function weatherIcon1(iconString){
    switch(iconString){
        case 'clear-day':
            image(clear_day_icon, 12, 5*height/8 + 40, clear_day_icon.width/12, clear_day_icon.width/12);
            break;

        case 'clear-night':
            image(clear_night_icon, 12, 5*height/8 + 40, clear_night_icon.width/12, clear_night_icon.width/12);
            break;
    }

}

function weatherIcon2(iconString){
    switch(iconString){
        case 'clear-day':
            image(clear_day_icon, 12 + width/4, 5*height/8 + 40, clear_day_icon.width/12, clear_day_icon.width/12);
            break;

        case 'clear-night':
            image(clear_night_icon, 12 + width/4, 5*height/8 + 40, clear_night_icon.width/12, clear_night_icon.width/12);
            break;
    }

}

function weatherIcon3(iconString){
    switch(iconString){
        case 'clear-day':
            image(clear_day_icon, 12 + 2*width/4, 5*height/8 + 40, clear_day_icon.width/12, clear_day_icon.width/12);
            break;

        case 'clear-night':
            image(clear_night_icon, 12 + 2*width/4, 5*height/8 + 40, clear_night_icon.width/12, clear_night_icon.width/12);
            break;
    }

}

function weatherIcon4(iconString){
    switch(iconString){
        case 'clear-day':
            image(clear_day_icon, 12 + 3*width/4, 5*height/8 + 40, clear_day_icon.width/12, clear_day_icon.width/12);
            break;

        case 'clear-night':
            image(clear_night_icon, 12 + 3*width/4, 5*height/8 + 40, clear_night_icon.width/12, clear_night_icon.width/12);
            break;
    }

}
function askWeather(){
    loadJSON(url, gotData, 'jsonp');
}

function askNews(){
    loadJSON(test, gotNewsData);
}

//test geocoding

var g_api = "https://maps.googleapis.com/maps/api/geocode/";
var format = "json?"
var address = 'address='+ city;
var g_url = g_api + format + address;

// function gotLocationData(location){
//     var glocation = location;
//     var lat = glocation.results[0].geometry.location.lng;
//     var long = glocation.results[0].geometry.location.lat;
//     return lat, long;
// }

function gotNewsData(data1) {
    news = data1;
    news_1 = news.articles[1].title;
    news_2 = news.articles[2].title;
    news_3 = news.articles[3].title;
    news_4 = news.articles[4].title;

    //console.log(news.articles)
}

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
    time_2 = hourConverter(weather.hourly.data[1].time)
    time_3 = hourConverter(weather.hourly.data[2].time)
    time_4 = hourConverter(weather.hourly.data[3].time)

    //hours

    console.log(icon_1);
}

function greet(){
    city = input.value();
    glocation = city;
}

function draw() {
    changeLngLat(103.851, 1.290270);
    background(0);
    switch(icon){
        case 'clear-day':
            image(clear_sky, 0, 0, width, 5*height/8);
            break;

        case 'clear-night':
            image(clear_night, 0, 0, width, 5*height/8);
            break;
    }

    if (weather) {
        fill(255);
        //console.log(timer);
        textFont('Arial', 20);
        text(city.toUpperCase(), width/2, height / 20);
        text(timeConverter(timer.time), width / 2, height / 4);
        text(minutely_icon.toUpperCase(), width / 2, height / 2);
        textFont('Arial', 8);
        text(summary.toUpperCase(), width / 2, height / 2 + 10);

        textFont('Arial', 60);
        text(curr_temp + '\xB0F', width / 2, height / 3 + 40);
        textSize(5);
        text('Min:' + min_temp + '\'\xB0F' + ' ' + 'Max: ' + max_temp + '\'\xB0F', width/2, height/ 6);
        //console.log(news_1, news_2, news_3, news_4);

        textFont('Arial', 10);
        text(news_1 + '. ' + news_2 + '. ' + news_3 + '. ' + news_4 +'.', ticker_x, 5*height/8 + 16);
        text(news_1 + '. ' + news_2 + '. ' + news_3 + '. ' + news_4 +'.', ticker_x - 3.2*width, 5*height/8 +16);
        if (ticker_x == width*2){
            ticker_x = width;
        }
        ticker_x = ticker_x + 1;
        rect(0, 5*height/8 + 12 + 12, width, 80);
        fill(0);
        text(time_1, 35, 5*height/8 + 43);
        text(time_2, width/4 + 35, 5*height/8 + 43);
        text(time_3, 2*width/4 + 35, 5*height/8 + 43);
        text(time_4, 3*width/4 + 35, 5*height/8 + 43);
        text(temphour_1, 35, 5*height/8 + 92);
        text(temphour_2, width/4 + 35, 5*height/8 + 92);
        text(temphour_3, 2*width/4 + 35, 5*height/8 + 92);
        text(temphour_4, 3*width/4 + 35, 5*height/8 + 92);
        weatherIcon1(icon_1);
        weatherIcon2(icon_2);
        weatherIcon3(icon_3);
        weatherIcon4(icon_4);


    }
}
