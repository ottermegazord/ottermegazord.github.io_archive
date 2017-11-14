
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
var average_low, average_high;
var distance_low, distance_high;

// table as the data set
var table;
var top;

var counter;

// my leaflet.js map
var mymap;
var base;
var val;
var dropdown, dropup;

var slider;

var r1, r2, r3, r4, r5, r6, r7, r8, r9,r10;
var router, higher;

// cities
// var new_york = L.marker([40.712775, -74.005973]).bindPopup('New York, New York'),
//     los_angeles = L.marker([34.052234, -118.243685]).bindPopup('This is Denver, CO.'),
//     chicago = L.marker([41.878114, -87.629798]).bindPopup('This is Aurora, CO.'),
//     boston = L.marker([42.360082, -71.058880]).bindPopup('This is Golden, CO.');

function preload() {
    //my table is comma separated value "csv"
    //and has a header specifying the columns labels
    table = loadTable("assets/location_2_map.csv", "csv", "header");
    t_top = loadTable("assets/top_map.csv", "csv", "header");
    asians = loadTable("assets/allasians_parse_map.csv", "csv", "header");
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

function setup() {
    // LEAFLET CODE
    // create your own map
    //mymap = L.map('mapid').setView([51.505, -0.09], 2);

    //var cities = L.layerGroup([new_york, los_angeles, chicago, boston]);

    base = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        // '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        // 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    });


    mymap = L.map('mapid', {
        center: [51.505, -0.09],
        zoom: 5,
        layers: [base]
        // layers: [base, cities]
    });

    var baseMaps = {
        "Base": base
    };

    // var overlayMaps = {
    //     "Cities": cities,
    // };

    //L.control.layers(baseMaps, overlayMaps).addTo(mymap);
    L.control.layers(baseMaps).addTo(mymap);
    // get the tiles you need. Don't have to touch this


    drawDataPoints();
    loadData();
    var canvas = createCanvas(800, 600);
    var sheet = createCanvas(200, 180);
    // canvas.parent("container");
    //displayData();

    // slider = createSlider(0, t_pop.length-1, 0);
    // slider.position(width/2 + 30, 1165);
    // slider.style('width', '300px');

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

    h1 = loadImage('images/high1.svg');
    h2 = loadImage('images/high2.svg');
    h3 = loadImage('images/high3.svg');
    h4 = loadImage('images/high4.svg');
    h5 = loadImage('images/high5.svg');


    r1 = loadImage('images/route1.svg');
    r2 = loadImage('images/route2.svg');
    r3 = loadImage('images/route3.svg');
    r4 = loadImage('images/route4.svg');
    r5 = loadImage('images/route5.svg');
    r6 = loadImage('images/route6.svg');
    r7 = loadImage('images/route7.svg');
    r8 = loadImage('images/route8.svg');
    r9 = loadImage('images/route9.svg');
    r10 = loadImage('images/route10.svg');

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
            counter = i;
            circle.bindPopup(stringer);
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

//

