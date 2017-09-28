
var url = 'https://api.darksky.net/forecast/7be81ecb86b93e238f5f477eed0f1418/37.8267,-122.4233';
var currentWeather;

function setup(){
    createCanvas(800, 800);
    background(0);
    setInterval(askDarkSky, 1000);

}
function askDarkSky(){
    loadJSON(url, getData, 'jsonp');
}


function getData(data){
    queryResult = data;
    currentWeather = queryResult.currently;
    console.log(currentWeather.time);
}
function draw(){
    //ellipse(width/2, height/2, 200, 200);
    // console.log(masa)
    //text(masa, width/2, height/2);
}