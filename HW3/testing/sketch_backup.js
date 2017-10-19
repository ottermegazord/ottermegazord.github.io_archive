// // an array for the magnitude
// var magnitudes;
// // an array for depth
// var depths;
// // an array for lat & long
// var latitudes, longitudes;
//
// // minimum and maximum values for magnitude and depth
// var magnitudeMin, magnitudeMax;
// var depthMin, depthMax;
//
// // table as the data set
// var table;
//
// // my leaflet.js map
// var mymap;
//
// function preload() {
//   //my table is comma separated value "csv"
//   //and has a header specifying the columns labels
//   table = loadTable("assets/significant_month_simple.csv", "csv", "header");
// }
//
// function setup() {
//   // LEAFLET CODE
//   // create your own map
//   mymap = L.map('mapid').setView([51.505, -0.09], 2);
//
//   // get the tiles you need. Don't have to touch this
//   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//     maxZoom: 18,
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//       '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//       'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     id: 'mapbox.streets'
//   }).addTo(mymap);
//
//
//   drawDataPoints();
// }
//
// function drawDataPoints(){
//   strokeWeight(5);
//   stroke(255,0,0);
//
//   // get the two arrays of interest: depth and magnitude
//   depths = table.getColumn("depth");
//   magnitudes = table.getColumn("mag");
//   latitudes = table.getColumn("latitude");
//   longitudes = table.getColumn("longitude");
//
//   // println(longitudes);
//
//   // get minimum and maximum values for both
//   magnitudeMin = 0.0;
//   magnitudeMax = getColumnMax("mag");
//
//   depthMin = 0.0;
//   depthMax = getColumnMax("depth");
//
//   // cycle through array
//   for(var i=0; i<depths.length; i++){
//     var circle = L.circle([latitudes[i], longitudes[i]], {
//       color: 'red',
//       fillColor: '#f03',
//       fillOpacity: 0.5,
//       radius: magnitudes[i] * 40000
//     }).addTo(mymap);
// }
// }
//
// // get the maximum value within a column
// function getColumnMax(columnName){
//   var col = table.getColumn(columnName);
//   // m is the maximum value
//   // purposefully start this very low
//   var m = 0.0;
//   for(var i =0; i< col.length; i++){
//     // each value within the column
//     // that is higher than m replaces the previous value
//     if(float(col[i])>m){
//       m = float(col[i]);
//     }
//   }
//   // after going through all rows, return the max value
//   return m;
// }

// an array for the magnitude
// an array for lat & long
var latitudes, longitudes, populations;
var t_pop, t_lon, t_lat;

// table as the data set
var table;
var top;

// my leaflet.js map
var mymap;

function preload() {
    //my table is comma separated value "csv"
    //and has a header specifying the columns labels
    table = loadTable("assets/location_2.csv", "csv", "header");
    t_top = loadTable("assets/top.csv", "csv", "header");
    asians = loadTable("assets/allasians_parse.csv", "csv", "header");
    //console.log(top);
}

function setup() {
    // LEAFLET CODE
    // create your own map
    mymap = L.map('mapid').setView([51.505, -0.09], 2);

    // get the tiles you need. Don't have to touch this
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);


    drawDataPoints();
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

    t_pop = t_top.getColumn("population");
    t_lat = t_top.getColumn("latitude");
    t_lon = t_top.getColumn("longitude");
    console.log(chinese);

    var latlngs = [];

    for (var j = 0; j < t_pop.length; j++) {
        latlngs[j] = [t_lat[j], t_lon[j]];
    }
    console.log(latlngs);
    //var latlngs = [[45.51, -122.68], [37.77, -122.43], [34.04, -118.2]];
    //console.log(latlngs);
    var polyline = L.polyline(latlngs, {color: 'yellow'}, smoothFactor = 10).addTo(mymap);
// zoom the map to the polyline
    mymap.fitBounds(polyline.getBounds());


    //console.log(populations[5])
    for (var i = 0; i < latitudes.length; i++) {
        console.log(indian[i]);
        if (indian[i]) {
            var circle = L.circle([latitudes[i], longitudes[i]], {
                color: 'white',
                fillColor: '#FDFEFE3',
                fillOpacity: 0.5,
                radius: indian[i]/2
            }).addTo(mymap);
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
        }

    }


    // for (var i = 0; i < t_pop.length; i++) {
    //     var circle = L.circle([t_lat[i], t_lon[i]], {
    //         color: 'red',
    //         fillColor: '#204dff',
    //         fillOpacity: 0.5,
    //         radius: (t_pop[i] / 5)
    //     }).addTo(mymap);
    // }

}


