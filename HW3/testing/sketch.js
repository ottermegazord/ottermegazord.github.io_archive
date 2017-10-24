

// an array for the magnitude
// an array for lat & long
var latitudes, longitudes;
var t_pop, t_lon, t_lat, t_tots, t_name, t_percent;
var people;
var seal;
var america_asian = 19437463;

var maxPop, minPop, maxLon, minLon;
var margin = 100;
var population;

// table as the data set
var table;
var top;

var counter;

// my leaflet.js map
var mymap;
var base;
var val;

var slider;

// cities
var new_york = L.marker([40.712775, -74.005973]).bindPopup('New York, New York'),
    los_angeles = L.marker([34.052234, -118.243685]).bindPopup('This is Denver, CO.'),
    chicago = L.marker([41.878114, -87.629798]).bindPopup('This is Aurora, CO.'),
    boston = L.marker([42.360082, -71.058880]).bindPopup('This is Golden, CO.');

function preload() {
    //my table is comma separated value "csv"
    //and has a header specifying the columns labels
    table = loadTable("assets/location_2.csv", "csv", "header");
    t_top = loadTable("assets/top.csv", "csv", "header");
    asians = loadTable("assets/allasians_parse.csv", "csv", "header");
    //console.log(top);
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);
}

function setup() {
    // LEAFLET CODE
    // create your own map
    //mymap = L.map('mapid').setView([51.505, -0.09], 2);

    var cities = L.layerGroup([new_york, los_angeles, chicago, boston]);

    base = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    });


    mymap = L.map('mapid', {
        center: [51.505, -0.09],
        zoom: 2,
        layers: [base, cities]
    });

    var baseMaps = {
        "Base": base
    };

    var overlayMaps = {
        "Cities": cities,
    };

    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
    // get the tiles you need. Don't have to touch this
    //mymap.on('click', onMapClick);


    drawDataPoints();
    loadData();
    createCanvas(800, 600);
    //displayData();

    slider = createSlider(0, t_pop.length-1, 0);
    slider.position(width/2 - 240, 1125);
    slider.style('width', '500px');

    p0 = loadImage('images/0.svg');
    p1 = loadImage('images/10.svg');
    p2 = loadImage('images/20.svg');
    p3 = loadImage('images/30.svg');
    p4 = loadImage('images/40.svg');
    p5 = loadImage('images/50.svg');
    p6 = loadImage('images/60.svg');
    p7 = loadImage('images/70.svg');
    p8 = loadImage('images/80.svg');
    p9 = loadImage('images/90.svg');
    p10 = loadImage('images/100.svg');

    seal_0 = loadImage('images/alameda.png');
    seal_1 = loadImage('images/los_angeles.png');
    seal_2 = loadImage('images/cook_county.png');
    seal_3 = loadImage('images/honolulu.png');
    seal_4 = loadImage('images/los_angeles.png');
    seal_5 = loadImage('images/queens.png');
    seal_6 = loadImage('images/alameda.png');
    seal_7 = loadImage('images/cook_county.png');
    seal_8 = loadImage('images/honolulu.png');
    seal_9 = loadImage('images/los_angeles.png');
    seal_10 = loadImage('images/queens.png');
    seal_11 = loadImage('images/los_angeles.png');
    seal_12 = loadImage('images/cook_county.png');
    seal_13 = loadImage('images/honolulu.png');
    seal_14 = loadImage('images/los_angeles.png');
    seal_15 = loadImage('images/queens.png');
    seal_16 = loadImage('images/alameda.png');
    seal_17 = loadImage('images/cook_county.png');
    seal_18 = loadImage('images/honolulu.png');
    seal_19 = loadImage('images/los_angeles.png');

    seal = [seal_0,seal_1,seal_2,seal_3,seal_4,seal_5,seal_6,seal_7,seal_8,seal_9,seal_10,seal_11,seal_12,seal_13,seal_14,seal_15,seal_16,seal_17,seal_18,seal_19];


    people = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

   //console.log(deca(0.94), rema(0.94));
}

function deca(prob){
    var num = int(prob*100);
    var dec = Math.floor(num/10);
    return dec;
}
function rema(prob){
    var num = int(prob*100);
    var rem = int(num)%10;
    return rem;
}

function setLayer(){
    drawDataPoints();
    loadData();
}

function drawDataPoints() {
    strokeWeight(5);
    stroke(255, 0, 0);

    // get the two arrays of interest: depth and magnitude
    chinese = asians.getColumn("chinese");
    indian = asians.getColumn("indian");
    korean = asians.getColumn("korean");
    filipino = asians.getColumn("filipino");
    japanese = asians.getColumn("japanese");
    latitudes = asians.getColumn("latitude");
    longitudes = asians.getColumn("longitude");
    var name = asians.getColumn("name");

    t_pop = t_top.getColumn("asian_pop");
    t_lat = t_top.getColumn("latitude");
    t_lon = t_top.getColumn("longitude");
    t_tots = t_top.getColumn("population");
    t_name = t_top.getColumn("name");
    t_percent = t_top.getColumn("percent")
    //console.log(chinese);

    var latlngs = [];

    for (var j = 0; j < t_pop.length; j++) {
        latlngs[j] = [t_lat[j], t_lon[j]];
    }
    //console.log(latlngs);
    //var latlngs = [[45.51, -122.68], [37.77, -122.43], [34.04, -118.2]];
    //console.log(latlngs);
    //var polyline = L.polyline(latlngs, {color: 'yellow'}, smoothFactor = 2000).addTo(mymap);
// zoom the map to the polyline
    //mymap.fitBounds(polyline.getBounds());
    mymap.setView(new L.LatLng(37.0902, -95.7129), 4);

    //console.log(populations[5])
    for (var i = 0; i < latitudes.length; i++) {
        //console.log(indian[i]);
        if (indian[i]!=0) {
            var circle = L.circle([latitudes[i], longitudes[i]], {
                color: 'white',
                fillColor: '#FDFEFE3',
                fillOpacity: 0.5,
                radius: indian[i]/2
            }).addTo(mymap);
            var stringer = name[i] + '<br>' + 'Indians: ' + indian[i];
            circle.bindPopup(stringer);
            circle.on('click', onMapClick);
        }

    }
//   // cycle through array
    for (var i = 0; i < latitudes.length; i++) {
        //console.log(chinese[i]);
        if (chinese[i]!= 0) {
            var circle = L.circle([latitudes[i], longitudes[i]], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: chinese[i]/2
            }).addTo(mymap);
            var stringer = name[i] + '<br>' + 'Chinese: ' + chinese[i];
            circle.bindPopup(stringer);
            circle.on('click', onMapClick);
        }
    }


    for (var i = 0; i < latitudes.length; i++) {
        //console.log(chinese[i]);
        if (korean[i] != 0) {
            var circle = L.circle([latitudes[i], longitudes[i]], {
                color: 'red',
                fillColor: '#ffeb33',
                fillOpacity: 0.5,
                radius: korean[i]/2
            }).addTo(mymap);
            var stringer = name[i] + '<br>' + 'Korean: ' + korean[i];
            circle.bindPopup(stringer);
            circle.on('click', onMapClick);
        }

    }

    for (var i = 0; i < latitudes.length; i++) {
        //console.log(chinese[i]);
        if (filipino[i] != 0) {
            var circle = L.circle([latitudes[i], longitudes[i]], {
                color: 'red',
                fillColor: '#1327ff',
                fillOpacity: 0.5,
                radius: filipino[i]/2
            }).addTo(mymap);
            var stringer = name[i] + '<br>' + 'Filipino: ' + filipino[i];
            circle.bindPopup(stringer);
            circle.on('click', onMapClick);
        }

    }



    // for (var i = 0; i < t_pop.length; i++) {
    //     var circle = L.circle([t_lat[i], t_lon[i]], {
    //         color: 'red',
    //         fillColor: '#204dff',
    //         fillOpacity: 0.5,
    //         radius: (t_pop[i] / 5)
    //     }).addTo(mymap);
    //     circle.bindPopup(t_pop[i]);
    // }

}


function loadData() {
    population = table.getColumn("population");
    longitudes = table.getColumn("longitude");
    t_pop = t_top.getColumn("asian_pop");
    t_lat = t_top.getColumn("latitude");
    t_lon = t_top.getColumn("longitude");
    t_tots = t_top.getColumn("population");
    t_name = t_top.getColumn("name");
    t_percent = t_top.getColumn("percent");
    t_chinese = t_top.getColumn("chinese");
    t_indian = t_top.getColumn("indian");
    t_filipino = t_top.getColumn("filipino");
    t_japanese = t_top.getColumn("japanese");
    t_korean = t_top.getColumn("korean");
    t_vietnamese = t_top.getColumn("vietnamese");
    t_others = t_top.getColumn("others");

    maxPop = 0;
    minPop = 1000000000;
    maxLon = -200;
    minLon = 1000000000;

    t_maxPop = 0;
    t_minPop = 1000000000;
    t_maxLon = -200;
    t_minLon = 1000000000;


    // what are the min and max values of the amount of floors?
    for(var i=0; i<population.length; i++){
        var popCount = int(population[i]);
        if(popCount > maxPop){
            maxPop = popCount;
        }
        if(popCount < minPop){
            minPop = popCount;
        }
    }

    for(var i=0; i<longitudes.length; i++){
        var lonCount = float(longitudes[i]);
        if(lonCount > maxLon){
            maxLon = lonCount;
        }
        if(lonCount < minLon){
            minLon = lonCount;
        }
    }

    for(var i=0; i<t_pop.length; i++){
        var t_popCount = int(t_pop[i]);
        if(t_popCount > t_maxPop){
            t_maxPop = t_popCount;
        }
        if(t_popCount < t_minPop){
            t_minPop = t_popCount;
        }
    }

    for(var i=0; i<t_lon.length; i++){
        var t_lonCount = float(t_lon[i]);
        if(t_lonCount > t_maxLon){
            t_maxLon = t_lonCount;
        }
        if(t_lonCount < t_minLon){
            t_minLon = t_lonCount;
        }
    }
    //console.log(minLon, maxLon);
}

function draw(){
    val = slider.value();
    //console.log(val);
    displayData();
    s = "are asians really everywhere?";
    textSize(35);
    text(s, 180, 55);
}

function people_loader_1(prob){
    var rem = rema(prob);
    var dec = deca(prob);
    var last;
    var loc=-1;

    textSize(50);
    text("While", 90, height/4 + 60);
    text("in ", 10*40 + 235, height/4 + 60);
    text(t_name[val] , 90, height/4 + 120);
    text("are Asians", 90, height/4 + 180);

    for (var i = 0; i < dec; i++){
        image(p10, i*40 + 220, height/4, people[i].width/2, people[i].height/2);
        loc = i;
    }

    loc += 1;
    last = loc + 1;
    //console.log(last);

    image(people[rem], loc*40 + 220, height/4, people[rem].width/2, people[rem].height/2);
    for (i = last; i<10; i++){
        image(people[0], i*40 + 220, height/4, people[0].width/2, people[0].height/2);
    }
}

function people_loader_2(prob){
    var rem = rema(prob);
    var dec = deca(prob);
    var last;
    var loc=-1;


    for (var i = 0; i < dec; i++){
        image(p10, i*40 + 300, 2*height/4, people[i].width/2, people[i].height/2);
        loc = i;
    }

    loc += 1;
    last = loc + 1;
    //console.log(last);

    image(people[rem], loc*40 + 300, 2*height/4, people[rem].width/2, people[rem].height/2);
    for (i = last; i<10; i++){
        image(people[0], i*40 + 300, 2*height/4, people[0].width/2, people[0].height/2);
    }
}

function people_loader_3(prob){
    var rem = rema(prob);
    var dec = deca(prob);
    var last;
    var loc=-1;

    for (i = 0; i < dec; i++){
        image(p10, i*40 + 300, 3*height/4, people[i].width/2, people[i].height/2);
        loc = i;
    }

    loc += 1;
    last = loc + 1;


    image(people[rem], loc*40 + 300, 3*height/4, people[rem].width/2, people[rem].height/2);
    for (i = last; i<10; i++){
        image(people[0], i*40 + 300, 3*height/4, people[0].width/2, people[0].height/2);
    }
    //console.log(last);
}


//Chart
function angler(indian,chinese,filipino,japanese,korean,vietnamese,others){
    var total = int(indian) + int(chinese) + int(filipino) + int(japanese) + int(korean) + int(vietnamese) + int(others);
    var angle = [360*indian/total, 360*chinese/total, 360*filipino/total, 360*japanese/total, 360*korean/total, 360*others/total];
    return angle;
}

function likelyAsian(t_name,t_tots,indian,chinese,filipino,japanese,korean,vietnamese,others){
    var total = int(indian) + int(chinese) + int(filipino) + int(japanese) + int(korean) + int(vietnamese) + int(others);
    var countypercent = total/t_tots * 100;
    var person = countypercent/5.3;
    textSize(20);
    text("You're " + Math.round(person) + "X more likely to see an Asian here than anywhere in America", width/2-90, height/2 - 60, 200, 200);
    return Math.round(person);
}

function pieChart(diameter, angles) {
    var lastAngle = 0;
    for (var i = 0; i < data.length; i++) {
        var gray = map(i, 0, data.length, 0, 255);
        fill(gray);
        arc(width/2, height/2, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
        lastAngle += radians(angles[i]);
        fill(36,36,38);
        ellipse(width/2, height/2, diameter-100, diameter-100);
        fill(255,0,0);
        noFill()
    }
}

function displayData(){
    background(36,36,38);
    fill(255,0,0);

    console.log(counter);
    //console.log(angler(t_indian[val],t_chinese[val],t_filipino[val],t_japanese[val],t_korean[val],t_vietnamese[val],t_others[val]));
    text(t_name[val], 20, 30);
    data = angler(t_indian[val],t_chinese[val],t_filipino[val],t_japanese[val],t_korean[val],t_vietnamese[val],t_others[val]);

    pieChart(350, data);
    likelyAsian(t_name[val],t_tots[val],t_indian[val],t_chinese[val],t_filipino[val],t_japanese[val],t_korean[val],t_vietnamese[val],t_others[val]);
    people_loader_1(t_percent[val]);
    //people_loader_2(0.82213);
    //people_loader_3(0.323022);
    //image(seal[val], width/200+105, height/2-90, seal[val].width/10, seal[val].width/10);

    // var rem = rema(prob);
    // var dec = deca(prob);
    // var last;
    //
    // var loc;
    //
    // for (var i = 0; i < dec; i++){
    //     image(p10, i*40, height/2, people[i].width/2, people[i].height/2);
    //     loc = i;
    // }
    //
    // loc += 1;
    // last = loc + 1;
    // console.log(last);
    //
    // image(people[rem], loc*40, height/2, people[rem].width/2, people[rem].height/2);
    // for (i = last; i<10; i++){
    //     image(people[0], i*40, height/2, people[0].width/2, people[0].height/2);
    // }
}

// function displayData(){
//         background(36,36,38);
//         fill(255,0,0);
//         ellipse(0,0, 40, 40);
//
//         //noStroke();
//         // go through building count array
//         // map the x value to floor height
//         // map the y value to number of buildings
//         for(var i=1; i<longitudes.length; i++){
//             if(longitudes[i]<0){
//                 //console.log(longitudes[i]);
//                 var x = map(longitudes[i],minLon, maxLon, margin, width-margin);
//                 var y = map(population[i], minPop, maxPop,height-margin,margin);
//                 ellipse(x,y,5,5);
//                 //var textDisplay = bldgCounts[i] + " buildings with " + i + " floors.";
//             }
//         }
//
//         for(var i=1; i<t_lon.length; i++){
//             if(t_lon[i]<0){
//
//                 //console.log(t_lon[i]);
//                 var x = map(t_lon[i],t_minLon, t_maxLon, margin, width-margin);
//                 var y = map(t_pop[i], t_minPop, t_maxPop,height-margin,margin);
//                 if (i == val){
//                     var probs = t_pop[i] / t_tots[i];
//                     textSize(10);
//                     var meaner = "P(X = asians): " + probs.toFixed(3);
//                     text(meaner, x+20, y+20);
//                     fill(193, 12, 26);
//                     ellipse(x,y,23,23);
//                 }
//                 else {
//                     fill(93, 173, 226);
//                     ellipse(x,y,20,20);
//                 }
//                 //var textDisplay = bldgCounts[i] + " buildings with " + i + " floors.";
//             }
//         }
//
// }
