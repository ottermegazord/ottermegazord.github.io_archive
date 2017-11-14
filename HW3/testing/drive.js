var f = function (p) {

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

    var r1, r2, r3, r4, r5, r6, r7, r8, r9, r10;
    var router, higher;

    p.preload = function() {
        //my table is comma separated value "csv"
        //and has a header specifying the columns labels
        table = p.loadTable("assets/location_2_drive.csv", "csv", "header");
        t_top = p.loadTable("assets/top_drive.csv", "csv", "header");
        asians = p.loadTable("assets/allasians_parse2_drive.csv", "csv", "header");
        //console.log(top);
    };

    p.setup = function() {
        
        p.loadData();
        p.createCanvas(330, 450);
        //displayData();
        p0 = p.loadImage('images/0.svg');
        p1 = p.loadImage('images/10.svg');
        p2 = p.loadImage('images/20.svg');
        p3 = p.loadImage('images/30.svg');
        p4 = p.loadImage('images/40.svg');
        p5 = p.loadImage('images/50.svg');
        p6 = p.loadImage('images/60.svg');
        p7 = p.loadImage('images/70.svg');
        p8 = p.loadImage('images/80.svg');
        p9 = p.loadImage('images/90.svg');
        p10 = p.loadImage('images/100.svg');

        h1 = p.loadImage('images/high1.svg');
        h2 = p.loadImage('images/high2.svg');
        h3 = p.loadImage('images/high3.svg');
        h4 = p.loadImage('images/high4.svg');
        h5 = p.loadImage('images/high5.svg');


        r1 = p.loadImage('images/route1.svg');
        r2 = p.loadImage('images/route2.svg');
        r3 = p.loadImage('images/route3.svg');
        r4 = p.loadImage('images/route4.svg');
        r5 = p.loadImage('images/route5.svg');
        r6 = p.loadImage('images/route6.svg');
        r7 = p.loadImage('images/route7.svg');
        r8 = p.loadImage('images/route8.svg');
        r9 = p.loadImage('images/route9.svg');
        r10 = p.loadImage('images/route10.svg');

        seal_0 = p.loadImage('images/alameda.png');
        seal_1 = p.loadImage('images/los_angeles.png');
        seal_2 = p.loadImage('images/cook_county.png');
        seal_3 = p.loadImage('images/honolulu.png');
        seal_4 = p.loadImage('images/los_angeles.png');
        seal_5 = p.loadImage('images/queens.png');
        seal_6 = p.loadImage('images/alameda.png');
        seal_7 = p.loadImage('images/cook_county.png');
        seal_8 = p.loadImage('images/honolulu.png');
        seal_9 = p.loadImage('images/los_angeles.png');
        seal_10 = p.loadImage('images/queens.png');
        seal_11 = p.loadImage('images/los_angeles.png');
        seal_12 = p.loadImage('images/cook_county.png');
        seal_13 = p.loadImage('images/honolulu.png');
        seal_14 = p.loadImage('images/los_angeles.png');
        seal_15 = p.loadImage('images/queens.png');
        seal_16 = p.loadImage('images/alameda.png');
        seal_17 = p.loadImage('images/cook_county.png');
        seal_18 = p.loadImage('images/honolulu.png');
        seal_19 = p.loadImage('images/los_angeles.png');

        seal = [seal_0, seal_1, seal_2, seal_3, seal_4, seal_5, seal_6, seal_7, seal_8, seal_9, seal_10, seal_11, seal_12, seal_13, seal_14, seal_15, seal_16, seal_17, seal_18, seal_19];


        people = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

        dropdown = p.createSelect(); // or create dropdown?
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

        dropup = p.createSelect(); // or create dropdown?
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
        dropdown.changed(p.mySelectEvent);
        dropup.changed(p.yourSelectEvent);

        //console.log(deca(0.94), rema(0.94));
    };


    p.deca = function(prob) {
        var num = p.int(prob * 100);
        var dec = Math.floor(num / 10);
        return dec;
    };

    p.rema = function(prob) {
        var num = p.int(prob * 100);
        var rem = p.int(num) % 10;
        return rem;
    };




    p.loadData = function() {
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

    };

    p.draw = function() {
        //console.log(val);
        p.displayData();
        p.fill(255, 0, 0);
        p.textSize(35);
        dropup.position(50 + 30, 250);
        dropdown.position(205 + 30, 250);
        //console.log(3*height/2 + 80);
        p.fill('#000000');
        p.rect(0, 0, 330, 450);
        p.fill(255);p.textSize(20);
        p.fill(36, 36, 38);
        p.rect(20, 70, 135, 100);
        p.rect(175, 70, 135, 100);
        var high = p.map(average_high, 0, 19437463, 0, 220);
        var low = p.map(average_low, 0, 19437463, 0, 220);
        p.ellipse(200, 400, 220, 220);
        p.fill(100);
        p.ellipse(200, 400, high, high);
        p.fill(55);
        p.ellipse(200, 400, low, low);


        switch (higher) {
            case 1:
                p.image(h1, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_high = 3659314;
                //console.log('this is dog!');
                break;
            case 2:
                p.image(h2, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_high = 1349768;
                break;
            case 3:
                p.image(h3, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_high = 2991152;
                break;
            case 4:
                p.image(h4, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_high = 665313;
                break;
            case 5:
                p.image(h5, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_high = 665313;
                //console.log('this is dog!');
                break;
            case 6:
                p.image(r6, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.005394504;
                break;
            case 7:
                p.image(r7, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.005819418;
                break;
            case 8:
                p.image(r8, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.00638049;
                break;
            case 9:
                p.image(r9, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.007208688;
                break;
            case 10:
                p.image(r10, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.00782957;
                break;
            default:
                p.image(h1, 50, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_high = 3659314;
                break;
        }

        switch (router) {
            default:
                p.image(r1, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 4108;
                break;
            case 1:
                p.image(r1, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 4108;
                //console.log('this is dog!');
                break;
            case 2:
                p.image(r2, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 3446;
                break;
            case 3:
                p.image(r3, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 5071;
                break;
            case 4:
                p.image(r4, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 4079;
                break;
            case 5:
                p.image(r5, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 1341;
                //console.log('this is dog!');
                break;
            case 6:
                p.image(r6, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.005394504;
                break;
            case 7:
                p.image(r7, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.005819418;
                break;
            case 8:
                p.image(r8, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.00638049;
                break;
            case 9:
                p.image(r9, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.007208688;
                break;
            case 10:
                p.image(r10, 205, 150, 3 / 4 * r1.width, 3 / 4 * r1.height - 20);
                average_low = 0.00782957;
                break;
        }

    };


    p.displayData = function() {
        p.background(36, 36, 38);
        p.fill(255, 0, 0);


    };


    p.yourSelectEvent = function() {
        var selected = this.selected();
        switch (selected) {
            case 'Route 1':
                //console.log('this is dog!');
                //p.image(r1, 180, 55, r1.width*2, r1.height*2);
                //p.ellipse(200, 200, width, height);
                higher = 1;
                //console.log('this is dog!');
                break;
            case 'Route 2':
                //p.image(r2, 180, 55, r1.width*2, r1.height*2);
                higher = 2;
                break;
            case 'Route 3':
                // p.image(r3, 180, 55, r1.width*2, r1.height*2);
                higher = 3;
                break;
            case 'Route 4':
                //console.log('this is a grape!');
                higher = 4;
                break;
            case 'Route 5':
                //p.image(r2, 180, 55, r1.width*2, r1.height*2);
                higher = 5;
                break;
            case 'Route 6':
                //p.image(r3, 180, 55, r1.width*2, r1.height*2);
                higher = 6;
                break;
            case 'Route 7':
                //console.log('this is a grape!');
                higher = 7;
                break;
            case 'Route 8':
                //p.image(r2, 180, 55, r1.width*2, r1.height*2);
                higher = 8;
                break;
            case 'Route 9':
                //p.image(r3, 180, 55, r1.width*2, r1.height*2);
                higher = 9;
                break;
            case 'Route 10':
                //console.log('this is a grape!');
                higher = 10;
                break;
        }
    }

    p.mySelectEvent = function(){
        var selected = this.selected();
        switch (selected) {
            case 'Route 1':
                //console.log('this is dog!');
                //p.image(r1, 180, 55, r1.width*2, r1.height*2);
                //p.ellipse(200, 200, width, height);
                router = 1;
                //console.log('this is dog!');
                break;
            case 'Route 2':
                //p.image(r2, 180, 55, r1.width*2, r1.height*2);
                router = 2;
                break;
            case 'Route 3':
                // p.image(r3, 180, 55, r1.width*2, r1.height*2);
                router = 3;
                break;
            case 'Route 4':
                //console.log('this is a grape!');
                router = 4;
                break;
            case 'Route 5':
                //p.image(r2, 180, 55, r1.width*2, r1.height*2);
                router = 5;
                break;
            case 'Route 6':
                //p.image(r3, 180, 55, r1.width*2, r1.height*2);
                router = 6;
                break;
            case 'Route 7':
                //console.log('this is a grape!');
                router = 7;
                break;
            case 'Route 8':
                //p.image(r2, 180, 55, r1.width*2, r1.height*2);
                router = 8;
                break;
            case 'Route 9':
                //p.image(r3, 180, 55, r1.width*2, r1.height*2);
                router = 9;
                break;
            case 'Route 10':
                //console.log('this is a grape!');
                router = 10;
                break;
        }
    }

};

var myp5 = new p5(f, 'driver');