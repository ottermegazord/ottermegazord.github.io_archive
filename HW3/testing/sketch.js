

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

    //var cities = L.layerGroup([new_york, los_angeles, chicago, boston]);

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
    createCanvas(800, 600);
    //displayData();

    slider = createSlider(0, t_pop.length-1, 0);
    slider.position(width/2 + 30, 1165);
    slider.style('width', '300px');

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

    dropdown = createSelect(); // or create dropdown?
    dropdown.option('Route 1');
    dropdown.option('Route 2');
    dropdown.option('Route 3');
    dropdown.option('Route 4');
    dropdown.option('Route 5');
    dropdown.option('Route 6');
    dropdown.option('Route 7');
    dropdown.option('Route 8');
    dropdown.option('Route 9');
    dropdown.option('Route 10');

    dropup = createSelect(); // or create dropdown?
    dropup.option('Route 1');
    dropup.option('Route 2');
    dropup.option('Route 3');
    dropup.option('Route 4');
    dropup.option('Route 5');
    dropup.option('Route 6');
    dropup.option('Route 7');
    dropup.option('Route 8');
    dropup.option('Route 9');
    dropup.option('Route 10');

    //dropdown.select('value3');
    dropdown.changed(mySelectEvent);
    dropup.changed(yourSelectEvent);

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

function draw(){
    val = slider.value();
    //console.log(val);
    displayData();
    fill(255,0,0);
    s = "Are Asians everywhere?";
    textSize(35);
    text(s, 180, 55);
    dropup.position(80,890);
    dropdown.position(235,890);
    //console.log(3*height/2 + 80);
    fill('#000000');
    rect(30, 100, 330, 450);
    fill('#ffff00');
    textSize(18);
    text('"So I think I have seen all the Asians on my last trip to America..."', 50, 118, 300, 100);
    fill(36,36,38);
    rect(50, 180, 135, 100);
    rect(205, 180, 135, 100);
    // rect(50, 350, average_high*280, 30);
    // rect(50, 400, 280, 30);
    // console.log(average_low);
    // console.log(average_high);
    //rect(width/2 + 180, height/2 + 70, 150, 100);
    var high = map(average_high, 0, 19437463, 0, 220);
    var low = map(average_low, 0, 19437463, 0, 220);
    ellipse(200,425, 220, 220);
    fill(100);
    ellipse(200,425, high, high);
    fill(55);
    ellipse(200,425, low, low);

    //image(r1, 180, 55, r1.width*2, r1.height*2);
    //image(r2, 180, 55, r1.width*2, r1.height*2);

    switch(higher) {
        case 1:
            image(h1, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_high = 3659314;
            //console.log('this is dog!');
            break;
        case 2:
            image(h2, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_high=1349768;
            break;
        case 3:
            image(h3, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_high=2991152;
            break;
        case 4:
            image(h4, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_high=665313;
            break;
        case 5:
            image(h5, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_high=665313;
            //console.log('this is dog!');
            break;
        case 6:
            image(r6, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.005394504;
            break;
        case 7:
            image(r7, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.005819418;
            break;
        case 8:
            image(r8, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.00638049;
            break;
        case 9:
            image(r9, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.007208688;
            break;
        case 10:
            image(r10, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.00782957;
            break;
        default:
            image(h1, 50, 170, 3/4*r1.width, 3/4*r1.height);
            average_high=3659314 ;
            break;
    }

    switch(router) {
        default:
            image(r1, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=4108;
            break;
        case 1:
            image(r1, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=4108;
            //console.log('this is dog!');
            break;
        case 2:
            image(r2, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=3446;
            break;
        case 3:
            image(r3, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=5071;
            break;
        case 4:
            image(r4, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=4079;
            break;
        case 5:
            image(r5, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=1341;
            //console.log('this is dog!');
            break;
        case 6:
            image(r6, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.005394504;
            break;
        case 7:
            image(r7, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.005819418;
            break;
        case 8:
            image(r8, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.00638049;
            break;
        case 9:
            image(r9, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.007208688;
            break;
        case 10:
            image(r10, 205, 170, 3/4*r1.width, 3/4*r1.height);
            average_low=0.00782957;
            break;
    }

    imageMode(CENTER);
    image(seal[val], width/2 + 180, height/2 - 60, seal[val].width/10, seal[val].width/10);
    imageMode(CORNER);

}

function people_loader_1(prob){
    var rem = rema(prob);
    var dec = deca(prob);
    var last;
    var loc=-1;

    // textSize(50);
    // text("While", 90, height/4 + 60);
    // text("in ", 10*40 + 235, height/4 + 60);
    // text(t_name[val] , 90, height/4 + 120);
    // text("are Asians", 90, height/4 + 180);

    for (var i = 0; i < dec; i++){
        image(p10, i*40 + 370, height - 210, people[i].width/2, people[i].height/2);
        loc = i;
    }

    loc += 1;
    last = loc + 1;
    //console.log(last);

    image(people[rem], loc*40 + 370, height - 210, people[rem].width/2, people[rem].height/2);
    for (i = last; i<10; i++){
        image(people[0], i*40 + 370, height - 210, people[0].width/2, people[0].height/2);
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
    textSize(90);
    fill('#ffff00');
    text(Math.round(person) + "X", width/2+80, height - 50);
    textSize(20);
    fill(255,0,0);
    text("more likely to find an Asian here than anywhere in America", width/2 + 200, height - 120, 200, 80);
    textSize(30);
    text("But you're", width/2 - 5, height - 120, 40, 80);
    fill('#ffff00');
    textSize(15);
    text("Asian/Population", 650, height - 215);
    return Math.round(person);
}

function pieChart(diameter, angles) {
    var lastAngle = 0;
    for (var i = 0; i < data.length; i++) {
        var gray = map(i, 0, data.length, 0, 255);
        fill(gray);
        arc(width/2 + 180, height/2 - 60, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
        lastAngle += radians(angles[i]);
        fill(36,36,38);
        ellipse(width/2 + 180, height/2 - 60, diameter-100, diameter-100);
        fill(255,0,0);
        noFill()
    }


}

function displayData(){
    background(36,36,38);
    fill(255,0,0);

    //console.log(router);
    //console.log(angler(t_indian[val],t_chinese[val],t_filipino[val],t_japanese[val],t_korean[val],t_vietnamese[val],t_others[val]));
    //text(t_name[val], 20, 30);
    data = angler(t_indian[val],t_chinese[val],t_filipino[val],t_japanese[val],t_korean[val],t_vietnamese[val],t_others[val]);


    pieChart(250, data);
    likelyAsian(t_name[val],t_tots[val],t_indian[val],t_chinese[val],t_filipino[val],t_japanese[val],t_korean[val],t_vietnamese[val],t_others[val]);
    people_loader_1(t_percent[val]);

    // people_loader_2(0.82213);
    // people_loader_3(0.323022);

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


function yourSelectEvent() {
    var selected = this.selected();
    switch(selected) {
        case 'Route 1':
            //console.log('this is dog!');
            //image(r1, 180, 55, r1.width*2, r1.height*2);
            //ellipse(200, 200, width, height);
            higher = 1;
            //console.log('this is dog!');
            break;
        case 'Route 2':
            //image(r2, 180, 55, r1.width*2, r1.height*2);
            higher = 2;
            break;
        case 'Route 3':
            // image(r3, 180, 55, r1.width*2, r1.height*2);
            higher = 3;
            break;
        case 'Route 4':
            //console.log('this is a grape!');
            higher = 4;
            break;
        case 'Route 5':
            //image(r2, 180, 55, r1.width*2, r1.height*2);
            higher = 5;
            break;
        case 'Route 6':
            //image(r3, 180, 55, r1.width*2, r1.height*2);
            higher = 6;
            break;
        case 'Route 7':
            //console.log('this is a grape!');
            higher = 7;
            break;
        case 'Route 8':
            //image(r2, 180, 55, r1.width*2, r1.height*2);
            higher = 8;
            break;
        case 'Route 9':
            //image(r3, 180, 55, r1.width*2, r1.height*2);
            higher = 9;
            break;
        case 'Route 10':
            //console.log('this is a grape!');
            higher = 10;
            break;
    }
}

function mySelectEvent() {
    var selected = this.selected();
    switch(selected) {
        case 'Route 1':
            //console.log('this is dog!');
            //image(r1, 180, 55, r1.width*2, r1.height*2);
            //ellipse(200, 200, width, height);
            router = 1;
            //console.log('this is dog!');
            break;
        case 'Route 2':
            //image(r2, 180, 55, r1.width*2, r1.height*2);
            router = 2;
            break;
        case 'Route 3':
           // image(r3, 180, 55, r1.width*2, r1.height*2);
            router = 3;
            break;
        case 'Route 4':
            //console.log('this is a grape!');
            router = 4;
            break;
        case 'Route 5':
            //image(r2, 180, 55, r1.width*2, r1.height*2);
            router = 5;
            break;
        case 'Route 6':
            //image(r3, 180, 55, r1.width*2, r1.height*2);
            router = 6;
            break;
        case 'Route 7':
            //console.log('this is a grape!');
            router = 7;
            break;
        case 'Route 8':
            //image(r2, 180, 55, r1.width*2, r1.height*2);
            router = 8;
            break;
        case 'Route 9':
            //image(r3, 180, 55, r1.width*2, r1.height*2);
            router = 9;
            break;
        case 'Route 10':
            //console.log('this is a grape!');
            router = 10;
            break;
    }
}
