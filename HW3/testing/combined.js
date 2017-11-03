var average_low, average_high;

var d = function(p){
    var colors = [150, 50, 0];
    var caption = ["Total AA Population", "AA Population in 10 Random Cities", "AA Population in Gateway Cities"];
    p.setup = function(){
        p.createCanvas(200, 180);

    };

    p.draw = function(){
        p.background(255);
        p.textSize(13);
        p.textAlign(p.CENTER);
        p.text("Key", 100, 20);
        p.textSize(10);
        p.textAlign(p.LEFT);
        for (var i = 0; i<3; i++){
            p.fill(colors[i]);
            p.rect(10, 20 + i*30, 20, 20);
        }
        for (var j = 0; j<3; j++){
            p.fill(50);
            p.text(caption[j], 38, 35 + j*30);
        }

        p.text('Gateway: ' + average_high + " Asians", 10, 120);
        p.text('Random: ' + average_low + " Asians", 10, 140);
        p.text('Total in America: 19437463 Asians', 10, 160);
    }
};

var myp5 = new p5(d, 'driver_legend');

var b = function( p ) {

    var t_top;

    p.preload = function(){
        t_top = p.loadTable("assets/top_drive.csv", "csv", "header");
    };
    p.setup = function() {
        var data = t_top.getColumn("asian_pop");
        var name = t_top.getColumn("name");
        var width = 200, // canvas width and height
            height = 450,
            margin = 20,
            w = width - 2 * margin, // chart area width and height
            h = height - 2 * margin;

        var barWidth =  (h / 10) * 0.8; // width of bar
        var barMargin = (h / 10) * 0.2; // margin between two bars

        p.createCanvas(300, 700);

        p.textSize(14);

        p.push();
        p.translate(margin, margin); // ignore margin area

        for(var i=0; i<10; i++) {
            p.push();
            p.fill('steelblue');
            p.noStroke();
            p.translate(0, i* (barWidth + barMargin)); // jump to the top right corner of the bar
            p.rectMode(p.RIGHT);
            p.rect(0, 0, data[i]/2400, barWidth); // draw rect

            p.fill('#FFF');
            p.text(name[i] + ': ' + data[i], 5, barWidth/2 + 5); // write data

            p.pop();
        }

        p.pop();
    }
};

var myp5 = new p5(b, 'bar_chart');

var a = function( p ) {

    var color_filler = ['#FDFEFE3', '#f03', '#ffeb33', '#1327ff'];
    var ethnicity = ['Indian', 'Chinese', 'Filipino', 'Korean'];
    var x = 100;
    var y = 100;
    var width = 200;
    var height = 180;

    p.setup = function() {
        p.createCanvas(200, 180);
    };

    p.draw = function() {
        p.background("#242426");
        //console.log(color_filler[1]);
        p.textSize(15);
        p.textAlign(p.CENTER);
        p.text('MAP KEY', width/2, height/5 - 10);
        p.textSize(10);
        p.textAlign(p.LEFT);
        for (var i = 0; i < 4; i++){
            p.fill(color_filler[i]);
            p.stroke(0);
            p.ellipse(width/3, i*30 + 50, 20, 20);
            p.fill("#242426");
            p.ellipse(width/3, i*30 + 50, 15, 15);
            p.fill(255);
            p.text(ethnicity[i], width/3 + 30, i*30 + 52);
        }
        p.fill(255);
    };
};

var myp5 = new p5(a, 'map_legend');

var s = function (p) {

// an array for the magnitude
// an array for lat & long
    var latitudes, longitudes;
    var t_pop, t_lon, t_lat, t_tots, t_name, t_percent;
    var people;
    var seal;
    var ethnic = ["Indian", "Chinese", "Filipino", "Japanese", "Korean", "Vietnamese", "Others"];
    var chinese;
    var indian;
    var korean;
    var filipino;
    var japanese;
    var t_chinese;
    var t_indian;
    var t_korean;
    var t_filipino;
    var t_japanese;
    var t_vietnamese, t_others;
    var width = 800;
    var population;
    var p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10;

// table as the data set
    var table;
    var t_top;
    var asians;


// my leaflet.js map
    var val;
    var data;

    var slider;

    var r1, r2, r3, r4, r5, r6, r7, r8, r9, r10;

    p.preload = function (){
        //my table is comma separated value "csv"
        //and has a header specifying the columns labels
        table = p.loadTable("assets/location_2_chart.csv", "csv", "header");
        t_top = p.loadTable("assets/top_chart.csv", "csv", "header");
        asians = p.loadTable("assets/allasians_parse_chart.csv", "csv", "header");
        //console.log(top);
    };

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

        var seal_0 = p.loadImage('images/alameda.png');
        var seal_1 = p.loadImage('images/los_angeles.png');
        var seal_2 = p.loadImage('images/cook_county.png');
        var seal_3 = p.loadImage('images/honolulu.png');
        var seal_4 = p.loadImage('images/los_angeles.png');
        var seal_5 = p.loadImage('images/queens.png');
        var seal_6 = p.loadImage('images/alameda.png');
        var seal_7 = p.loadImage('images/cook_county.png');
        var seal_8 = p.loadImage('images/honolulu.png');
        var seal_9 = p.loadImage('images/los_angeles.png');
        var seal_10 = p.loadImage('images/queens.png');
        var seal_11 = p.loadImage('images/los_angeles.png');
        var seal_12 = p.loadImage('images/cook_county.png');
        var seal_13 = p.loadImage('images/honolulu.png');
        var seal_14 = p.loadImage('images/los_angeles.png');
        var seal_15 = p.loadImage('images/queens.png');
        var seal_16 = p.loadImage('images/alameda.png');
        var seal_17 = p.loadImage('images/cook_county.png');
        var seal_18 = p.loadImage('images/honolulu.png');
        var seal_19 = p.loadImage('images/los_angeles.png');

        seal = [seal_0, seal_1, seal_2, seal_3, seal_4, seal_5, seal_6, seal_7, seal_8, seal_9, seal_10, seal_11, seal_12, seal_13, seal_14, seal_15, seal_16, seal_17, seal_18, seal_19];


        people = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];
        //console.log(deca(0.94), p.rema(0.94));
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
        val = slider.value();
        p.displayData();

        p.imageMode(p.CENTER);
        // p.image(seal[val], width / 4 + 50, 175, seal[val].width / 10, seal[val].width / 10);
        p.image(seal[val], width / 4 + 50, 175, 150, 150);
        p.imageMode(p.CORNER);
        console.log(seal[val].height/10)

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
            p.arc(width / 4 + 50, 175, diameter, diameter, lastAngle, lastAngle + p.radians(angles[i]));
            lastAngle += p.radians(angles[i]);
            p.fill(36, 36, 38);
            p.ellipse(width / 4 + 50, 175, diameter - 100, diameter - 100);
            // noFill()
        }
        for (var i = 0; i < data.length; i++) {
            var gray = p.map(i, 0, data.length, 0, 255);
            p.fill(gray);
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

var t = function (p) {

    var latitudes, longitudes;
    var t_pop, t_lon, t_lat, t_tots, t_name, t_percent;
    var h1, h2, h3, h4, h5;

    var population;
    // var average_low, average_high;

// table as the data set
    var table;

// my leaflet.js map
    var dropdown, dropup;
    var r1, r2, r3, r4, r5, r6, r7, r8, r9, r10;
    var router, higher;
    var t_top;
    var asians;
    var t_chinese;
    var t_indian;
    var t_korean;
    var t_filipino;
    var t_japanese;
    var t_vietnamese, t_others;

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
        p.createCanvas(400, 600);
        //displayData();

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

        dropdown = p.createSelect(); // or create dropdown?
        dropdown.option('Route 1');
        dropdown.option('Route 2');
        dropdown.option('Route 3');
        dropdown.option('Route 4');
        dropdown.option('Route 5');
        // dropdown.option('Route 6');
        // dropdown.option('Route 7');
        // dropdown.option('Route 8');
        // dropdown.option('Route 9');
        // dropdown.option('Route 10');

        dropup = p.createSelect(); // or create dropdown?
        dropup.option('Route 1');
        dropup.option('Route 2');
        dropup.option('Route 3');
        dropup.option('Route 4');
        dropup.option('Route 5');
        // dropup.option('Route 6');
        // dropup.option('Route 7');
        // dropup.option('Route 8');
        // dropup.option('Route 9');
        // dropup.option('Route 10');

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
        dropup.position(80, p.height/3 + 45);
        dropdown.position(235, p.height/3 + 45);
        //console.log(3*height/2 + 80);
        p.fill('#000000');
        p.rect(30, 70, 330, 450);
        p.fill(255);
        p.textSize(20);
        p.text("Driving to the Gateway Cities", 70, 3 / 4 * r1.height - 20, 350, 450);
        p.textSize(12);
        p.text("Gateway Cities Route", 60, 125, 350, 450);
        p.text("Random Cities Route", 220, 125, 350, 450);
        p.fill(50);
        p.rect(50, 140, 135, 100);
        p.rect(205, 140, 135, 100);
        var high = p.map(average_high, 0, 19437463, 0, 220);
        var low = p.map(average_low, 0, 19437463, 0, 220);
        p.ellipse(200, 390, 220, 220);
        p.fill(150);
        p.stroke(100);
        p.ellipse(200, 390, high, high);
        p.fill(0);
        p.stroke(55);
        p.ellipse(200, 390, low, low);
        //p.line(200,380, 200, low);
        p.stroke(0);


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
    };

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

var myp5 = new p5(t, 'driver');