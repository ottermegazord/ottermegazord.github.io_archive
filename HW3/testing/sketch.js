// an array for the magnitude
// an array for lat & long
var latitudes, longitudes;
var t_pop, t_lon, t_lat;

var maxPop, minPop, maxLon, minLon;
var margin = 100;
var population;

// table as the data set
var table;
var top;

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


    drawDataPoints();
    loadData();
    createCanvas(800, 600);
    //displayData();

    slider = createSlider(0, t_pop.length, 0);
    slider.position(width/2 - 240, 1125);
    slider.style('width', '500px');
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

    t_pop = t_top.getColumn("population");
    t_lat = t_top.getColumn("latitude");
    t_lon = t_top.getColumn("longitude");
    t_tots = t_top.getColumn("county");
    console.log(chinese);

    var latlngs = [];

    for (var j = 0; j < t_pop.length; j++) {
        latlngs[j] = [t_lat[j], t_lon[j]];
    }
    //console.log(latlngs);
    //var latlngs = [[45.51, -122.68], [37.77, -122.43], [34.04, -118.2]];
    //console.log(latlngs);
    var polyline = L.polyline(latlngs, {color: 'yellow'}, smoothFactor = 2000).addTo(mymap);
// zoom the map to the polyline
    mymap.fitBounds(polyline.getBounds());


    //console.log(populations[5])
    for (var i = 0; i < latitudes.length; i++) {
        //console.log(indian[i]);
        if (indian[i]) {
            var circle = L.circle([latitudes[i], longitudes[i]], {
                color: 'white',
                fillColor: '#FDFEFE3',
                fillOpacity: 0.5,
                radius: indian[i]/2
            }).addTo(mymap);
            var stringer = name[i] + '<br>' + 'Indians: ' + indian[i];
            circle.bindPopup(stringer);
        }

    }
//   // cycle through array
    for (var i = 0; i < latitudes.length; i++) {
        //console.log(chinese[i]);
        if (chinese[i]) {
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
        if (korean[i]) {
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
        if (filipino[i]) {
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
    t_pop = t_top.getColumn("population");
    t_lon = t_top.getColumn("longitude");

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
    console.log(val);
    displayData();
    s = "are asians really everywhere?";
    textSize(35);
    text(s, 180, 55);
}

function displayData(){
        background(36,36,38);
        fill(255,0,0);
        ellipse(0,0, 40, 40);

        //noStroke();
        // go through building count array
        // map the x value to floor height
        // map the y value to number of buildings
        for(var i=1; i<longitudes.length; i++){
            if(longitudes[i]<0){
                //console.log(longitudes[i]);
                var x = map(longitudes[i],minLon, maxLon, margin, width-margin);
                var y = map(population[i], minPop, maxPop,height-margin,margin);
                ellipse(x,y,5,5);
                //var textDisplay = bldgCounts[i] + " buildings with " + i + " floors.";
            }
        }

        for(var i=1; i<t_lon.length; i++){
            if(t_lon[i]<0){

                //console.log(t_lon[i]);
                var x = map(t_lon[i],t_minLon, t_maxLon, margin, width-margin);
                var y = map(t_pop[i], t_minPop, t_maxPop,height-margin,margin);
                if (i == val){
                    var probs = t_pop[i] / t_tots[i];
                    textSize(10);
                    var meaner = "P(X = asians): " + probs.toFixed(3);
                    text(meaner, x+20, y+20);
                    fill(193, 12, 26);
                    ellipse(x,y,23,23);
                }
                else {
                    fill(93, 173, 226);
                    ellipse(x,y,20,20);
                }
                //var textDisplay = bldgCounts[i] + " buildings with " + i + " floors.";
            }
        }

}

