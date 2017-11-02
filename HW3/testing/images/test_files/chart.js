var s = function (p) {

// an array for the magnitude
// an array for lat & long
    var latitudes, longitudes;
    var t_pop, t_lon, t_lat, t_tots, t_name, t_percent;
    var people;
    var seal;
    var america_asian = 19437463;
    var ethnic = ["Indian", "Chinese", "Filipino", "Japanese", "Korean", "Vietnamese", "Others"];

    var width = 800;
    var height = 370;
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

    p.preload = function (){
        //my table is comma separated value "csv"
        //and has a header specifying the columns labels
        table = p.loadTable("assets/location_2.csv", "csv", "header");
        t_top = p.loadTable("assets/top.csv", "csv", "header");
        asians = p.loadTable("assets/allasians_parse.csv", "csv", "header");
        //console.log(top);
    }

    p.setup = function(){

        p.drawDataPoints();
        p.loadData();
        p.createCanvas(800, 370);
        //displayData();

        slider = p.createSlider(0, t_pop.length - 1, 0);
        slider.position(width / 2 + 40, 270);
        slider.style('width', '300px');

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
        //console.log(deca(0.94), p.rema(0.94));
    }


    p.deca = function(prob) {
        var num = p.int(prob * 100);
        var dec = Math.floor(num / 10);
        return dec;
    }

    p.rema = function(prob) {
        var num = p.int(prob * 100);
        var rem = p.int(num) % 10;
        return rem;
    }

    p.drawDataPoints = function() {
        p.strokeWeight(5);
        p.stroke(255, 0, 0);

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
    }


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

        maxPop = 0;
        minPop = 1000000000;
        maxLon = -200;
        minLon = 1000000000;

        t_maxPop = 0;
        t_minPop = 1000000000;
        t_maxLon = -200;
        t_minLon = 1000000000;

    };

    p.draw = function() {
        val = slider.value();
        p.displayData();

        p.imageMode(p.CENTER);
        p.image(seal[val], width / 4 + 50, 175, seal[val].width / 10, seal[val].width / 10);
        p.imageMode(p.CORNER);

    };

    p.people_loader_1 = function(prob) {
        var rem = p.rema(prob);
        var dec = p.deca(prob);
        var last;
        var loc = -1;

        p.fill(255);
        p.textAlign(p.LEFT);
        p.textSize(15);
        p.text("While about " + Math.floor(prob * 10) + " in 10 people are of Asian descent", 50 + 350, 90);

        for (var i = 0; i < dec; i++) {
            p.image(p10, i * 40 + 390, 100, people[i].width / 2, people[i].height / 2);
            loc = i;
        }

        loc += 1;
        last = loc + 1;
        //console.log(last);

        p.image(people[rem], loc * 40 + 390, 100, people[rem].width / 2, people[rem].height / 2);
        for (i = last; i < 10; i++) {
            p.image(people[0], i * 40 + 390, 100, people[0].width / 2, people[0].height / 2);
        }
    };

//Chart
    p.angler = function(indian, chinese, filipino, japanese, korean, vietnamese, others) {
        var total = p.int(indian) + p.int(chinese) + p.int(filipino) + p.int(japanese) + p.int(korean) + p.int(vietnamese) + p.int(others);
        var angle = [360 * indian / total, 360 * chinese / total, 360 * filipino / total, 360 * japanese / total, 360 * korean / total, 360 * others / total];
        return angle;
    }

    p.likelyAsian = function(t_name, t_tots, indian, chinese, filipino, japanese, korean, vietnamese, others) {
        var total = p.int(indian) + p.int(chinese) + p.int(filipino) + p.int(japanese) + p.int(korean) + p.int(vietnamese) + p.int(others);
        var countypercent = total / t_tots * 100;
        var person = countypercent / 5.3;
        p.textSize(90);
        p.fill('#ffff00');
        p.text(Math.round(person) + "X", width / 2 + 60, 250);
        p.textSize(20);
        p.fill(255);
        p.text("more likely to find an Asian here than anywhere in America", width / 2 + 190, 180, 200, 80);
        p.textSize(30);
        p.fill(255);
        p.text("You are", 40 + 360, 180, 40, 80);
        p.fill('#ffff00');
        p.textSize(15);
        return Math.round(person);
    };

    p.pieChart = function(diameter, angles) {
        var lastAngle = 0;
        for (var i = 0; i < data.length; i++) {
            var gray = p.map(i, 0, data.length, 0, 255);
            p.fill(gray);
            console.log(i);
            p.arc(width / 4 + 50, 175, diameter, diameter, lastAngle, lastAngle + p.radians(angles[i]));
            lastAngle += p.radians(angles[i]);
            p.fill(36, 36, 38);
            p.ellipse(width / 4 + 50, 175, diameter - 100, diameter - 100);
            // noFill()
        }
        for (var i = 0; i < data.length; i++) {
            var gray = p.map(i, 0, data.length, 0, 255);
            p.fill(gray);
            console.log(i);
            p.rect(20, 80 + i * 30, 30, 30);
            p.fill(255);
            p.textSize(10);
            p.text(ethnic[i], 60, 20 + 80 + i * 30);
        }


    };

    p.displayData = function() {
        p.background(36, 36, 38);
        p.fill(255, 0, 0);

        //console.log(router);
        //console.log(angler(t_indian[val],t_chinese[val],t_filipino[val],t_japanese[val],t_korean[val],t_vietnamese[val],t_others[val]));
        //p.text(t_name[val], 20, 30);
        data = p.angler(t_indian[val], t_chinese[val], t_filipino[val], t_japanese[val], t_korean[val], t_vietnamese[val], t_others[val]);


        p.pieChart(250, data);
        p.likelyAsian(t_name[val], t_tots[val], t_indian[val], t_chinese[val], t_filipino[val], t_japanese[val], t_korean[val], t_vietnamese[val], t_others[val]);
        p.people_loader_1(t_percent[val]);

    }
};

var myp5 = new p5(s, 'chart');