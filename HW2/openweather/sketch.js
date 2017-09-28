
//weather parameters

var min_temp;
var weather;
var name;
var timer;
//var searchBox = new google.maps.places.SearchBox();

var api = "https://api.darksky.net/forecast/";
var city = 'London';
var lat = 37.8267;
var long = -122.4233;
var apiKey = "7be81ecb86b93e238f5f477eed0f1418";
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

function setup() {
    createCanvas(320, 568);
    setInterval(askWeather, 1000);
    setInterval(askNews(),1000);
    input = createInput();
    input.position(20, 65);

    button = createButton('go!');
    button.position(input.x + input.width, 65);
    button.mousePressed(greet);

    greeting = createElement('h2', 'what is your name?');
    greeting.position(20, 5);

    textAlign(CENTER);
    textSize(50);
    clear_sky = loadImage('images/background-21717_1280.jpg');

}

function askWeather(){
    loadJSON(url, gotData, 'jsonp');
}

function askNews(){
    loadJSON(test, gotNewsData);
}

function gotNewsData(data1) {
    news = data1;
    news_1 = news.articles[1].title;
    news_2 = news.articles[2].title;
    news_3 = news.articles[3].title;
    news_4 = news.articles[4].title;

    console.log(news.articles)
}

function gotData(data) {
    weather = data;
    timer = weather.currently;
    summary = weather.minutely.summary;
    min_temp = weather.currently.temperature;
}

function greet(){
    name = input.value();
}

function draw() {
    background(0);
    image(clear_sky, 0, 0, width, 5*height/8);
    if (weather) {
        fill(255);
        //console.log(timer);
        textFont('Arial', 20);
        text(timeConverter(timer.time), width / 2, height / 4);
        text(summary.toUpperCase(), width / 2, height / 2);
        text(min_temp + '\xB0F', width / 2, height / 3);
        console.log(news_1, news_2, news_3, news_4);

        textFont('Arial', 10);
        text(news_1 + '. ' + news_2 + '. ' + news_3 + '. ' + news_4 +'.', ticker_x, 4*height/5);
        text(news_1 + '. ' + news_2 + '. ' + news_3 + '. ' + news_4 +'.', ticker_x - 3.2*width, 4*height/5);
        if (ticker_x == width*2){
            ticker_x = width;
        }
        ticker_x = ticker_x + 1;


    }
}
