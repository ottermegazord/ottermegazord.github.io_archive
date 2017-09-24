// Sketch for using the darksky API
// https://darksky.net/dev/docs
// This sketch requires you to start a local server or run it on a server
// See more about how to do that here:
// https://github.com/processing/p5.js/wiki/Local-server

var queryResult;
var spaceData

function setup() {
    createCanvas(320, 568);
    background(0);
    loadJSON('https://api.darksky.net/forecast/436fdc35bab87ffdf2f6cf130fc5ddc5/1.3521, 103.8198', getData, 'jsonp')
}

function getData(data){
    spaceData = data;
}

function draw(){
    if (spaceData) {
        currentWeather = spaceData.currently;
        console.log(currentWeather.humidity);
    }
}
