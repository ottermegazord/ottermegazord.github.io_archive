metal_section = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1, table2, table3, table4,table5;
    var img;
    var img2;
    var img3;
    var img4;
    var img5;
    var opp2, opp3, opp4, opp5;
    var counterer = 1;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;
    var myFont;

    p.preload = function(){
        table1 = p.loadTable("metal_sorted.csv", "csv", "header");
        table2 = p.loadTable("pop_sorted.csv", "csv", "header");
        table3 = p.loadTable("indie_sorted.csv", "csv", "header");
        table4 = p.loadTable("rnb_sorted.csv", "csv", "header");
        table5 = p.loadTable("country_sorted.csv", "csv", "header");
        myFont = p.loadFont("HussarBdExt.otf")

    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 2000);
        p.background(100);

        img = p.loadImage(table1.get(0,5));
        img2 = p.loadImage(table2.get(0,5));
        img3 = p.loadImage(table3.get(0,5));
        img4 = p.loadImage(table4.get(0,5));
        img5 = p.loadImage(table5.get(0,5));

        opp2 = p.loadImage(table2.get(0,5));
        opp3 = p.loadImage(table3.get(0,5));
        opp4 = p.loadImage(table4.get(0,5));
        opp5 = p.loadImage(table5.get(0,5));

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(1.05*i, 0, 15, 100, r, g, b, i);
        }
        //console.log(counterer);

    };

    p.Box = function(x, y, width, height, r, g, b, counter) {
        // These variables are unique to each box
        this.counter = counter;
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.col = p.color(r, g, b);
        this.colorRollOver = p.color(200, 0, 0);
        this.colorRollOff = p.color(this.r, this.g, this.b);
        this.width = width;
        this.height = height;
        this.active = false;

        // update function
        this.update = function () {
            // check if mouse is over the box
            if (p.mouseX > this.x && p.mouseX < this.x + this.width
                && p.mouseY > this.y && p.mouseY < this.y + this.height) {
                // if yes, make this box active and change the color to red
                this.col = this.colorRollOver;
                this.active = true;
                counterer = counter;
            } else {
                this.col = this.colorRollOff;
                this.active = false;
            }
        };

        // display the box with the updated values
        this.display = function () {
            p.noStroke();
            p.fill(this.col);
            p.rect(this.x, this.y, this.width, this.height);
            // p.rect(this.x, this.y, this.width, this.height / 2);
            p.fill(0);
        }
    };

    p.draw = function(){
        p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";

        p.image(img, 120, 200, img.width * 1.12, img.height*1.12);
        p.image(img2, 40, 1570, 320, 320);
        p.image(img3, 360, 1570, img3.width/2, img3.height/2);
        p.image(img4, 700, 1570, img4.width/2, img4.height/2);
        p.image(img5, 1000, 1570, img5.width/2, img5.height/2);

        p.cpalette(img_address, table1.get(p.int(counterer),3),  table1.get(p.int(counterer),4));

        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
                img_address = table1.get(counterer, 5);
            }
        }
        img = p.loadImage(table1.get(p.int(counterer),5));
        img2 = p.loadImage(table2.get(p.int(counterer),5));
        img3 = p.loadImage(table3.get(p.int(counterer),5));
        img4 = p.loadImage(table4.get(p.int(counterer),5));
        img5 = p.loadImage(table5.get(p.int(counterer),5));



        var r_height = p.map(table1.get(p.int(counterer),0),0,255, 1370, 1170);
        var g_height = p.map(table1.get(p.int(counterer),1),0,255, 1370, 1170);
        var b_height = p.map(table1.get(p.int(counterer),2),0,255, 1370, 1170);
        var avg_r = [table1.get(p.int(counterer),0),table1.get(p.int(counterer),1),table1.get(p.int(counterer),2)];


        p.fill(avg_r[0], avg_r[1], avg_r[2]);
        p.rect(120, 1170, 300, 200);
        p.strokeWeight(10);
        p.stroke(0);
        p.line(120, 1420, 420, 1420);
        p.strokeWeight(0);
        p.text('average color', 120, 1470);


        p.fill(255,0,0);
        p.triangle(300 + 240, 1370, 520+ 240, 1370, 410+ 240, r_height);
        p.fill(0,255,0);
        p.triangle(520+ 240, 1370, 740+ 240, 1370, 630+ 240, g_height);
        p.fill(0,0,255);
        p.triangle(740+ 240, 1370, 960+ 240, 1370, 850+ 240, b_height);
        p.fill(0);

        p.strokeWeight(10);
        p.stroke(0);
        p.line(300 + 240, 1420, 1200, 1420);
        p.strokeWeight(0);
        p.fill(0);
        p.text('average RGB', 540, 1470);

        p.stroke(0);
        p.strokeWeight(10);
        p.line(860, 880, 1200, 880);
        p.triangle(1200, 870, 1200, 890, 1220, 880);
        p.stroke(0);
        p.strokeWeight(0);
        p.text('# of pixels', 940, 920);

        p.stroke(0);
        p.strokeWeight(10);
        p.line(120, 980, 1200, 980);
        p.line(120, 1120, 1200, 1120);
        p.stroke(0);
        p.strokeWeight(0);


        // Display active bubble number
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address, artist, album){
        this.artist = artist;
        this.album = album;
        var image_palette = new Image();
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;

        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            var htmlcolor;
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            DV[3] = palette['DarkVibrant'].getPopulation();
            DV[4]=  palette['DarkVibrant'].getHex();
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            V[3] = palette['Vibrant'].getPopulation();
            V[4]=  palette['Vibrant'].getHex();
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            M[3] = palette['Muted'].getPopulation();
            M[4]=  palette['Muted'].getHex();
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            LV[3] = palette['LightVibrant'].getPopulation();
            LV[4]=  palette['LightVibrant'].getHex();
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];
            DM[3] = palette['DarkMuted'].getPopulation();
            DM[4]=  palette['DarkMuted'].getHex();

        });

        var top_color = 0;

        var length = [];
        length[0] = p.map(DV[3], 0, 12000, 0, 100);
        length[1] = p.map(V[3], 0, 12000, 0, 100);
        length[2] = p.map(M[3], 0, 12000, 0, 100);
        length[3] = p.map(LV[3], 0, 12000, 0, 100);
        length[4] = p.map(DM[3], 0, 12000, 0, 100);
        var longest = 0;

        var index = 0;

        for (i=0; i<5; i++){
            if (longest <= length[i]){
                longest = length[i];
                index = i;
            }
        }

        switch(index) {
            case 0:
                top_color = p.str(DV[4]);
                break;
            case 1:
                top_color = p.str(V[4]);
                break;
            case 2:
                top_color = p.str(M[4]);
                break;
            case 3:
                top_color = p.str(LV[4]);
            case 4:
                top_color = p.str(DM[4]);
                break;
            default:
                top_color = "#6195ed";
        }

        var n_match = ntc.name(top_color);

        //console.log(n_match[1]);

        var normalized = [];
        for (i=0; i<5; i++){
            normalized[i] = length[i]/longest;
        }

        var long_normal = 0;

        for (i=0; i<5; i++){
            if (long_normal <= normalized[i]){
                long_normal = normalized[i];
            }
        }

        p.fill(DV[0], DV[1], DV[2]);
        p.rect(860, 200, 100, 128);
        p.rect(960, 220, normalized[0]/long_normal*200, 80);
        p.fill(V[0], V[1], V[2]);
        p.rect(860, 328, 100, 128);
        p.rect(960, 348, normalized[1]/long_normal*200, 80);
        p.fill(M[0], M[1], M[2]);
        p.rect(860, 456, 100, 128);
        p.rect(960, 476, normalized[2]/long_normal*200, 80);
        p.fill(LV[0], LV[1], LV[3]);
        p.rect(860, 584, 100, 128);
        p.rect(960, 604, normalized[3]/long_normal*200, 80);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(860, 712, 100, 128);
        p.rect(960, 732, normalized[4]/long_normal*200, 80);
        p.fill(255);

        p.fill(0);
        p.textFont(myFont);
        p.textSize(30);
        var descriptor = "this album is predominantly " + n_match[1].toLowerCase() + '.';
        var explanor = "based on this color, we think you'll love these albums";
        var title = this.album.replace(/^\s+/g, '');
        var artist =  this.artist.replace(/^\s+/g, '');
        p.text("color analysis of " + artist + "'s " + title.substr(0, 30), 120, 1030);

        p.text(descriptor, 120, 1080);
        p.text(explanor, 120, 1520);


    }



};

var myp5 = new p5(metal_section, 'metal_section');

indie_section = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1, table2, table3, table4,table5;
    var img;
    var img2;
    var img3;
    var img4;
    var img5;
    var opp2, opp3, opp4, opp5;
    var counterer = 1;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;
    var myFont;

    p.preload = function(){
        table2 = p.loadTable("metal_sorted.csv", "csv", "header");
        table3 = p.loadTable("pop_sorted.csv", "csv", "header");
        table4 = p.loadTable("indie_sorted.csv", "csv", "header");
        table5 = p.loadTable("rnb_sorted.csv", "csv", "header");
        table1 = p.loadTable("country_sorted.csv", "csv", "header");
        myFont = p.loadFont("HussarBdExt.otf")

    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 2000);
        p.background(100);

        img = p.loadImage(table1.get(0,5));
        img2 = p.loadImage(table2.get(0,5));
        img3 = p.loadImage(table3.get(0,5));
        img4 = p.loadImage(table4.get(0,5));
        img5 = p.loadImage(table5.get(0,5));

        opp2 = p.loadImage(table2.get(0,5));
        opp3 = p.loadImage(table3.get(0,5));
        opp4 = p.loadImage(table4.get(0,5));
        opp5 = p.loadImage(table5.get(0,5));

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(1.05*i, 0, 15, 100, r, g, b, i);
        }
        //console.log(counterer);

    };

    p.Box = function(x, y, width, height, r, g, b, counter) {
        // These variables are unique to each box
        this.counter = counter;
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.col = p.color(r, g, b);
        this.colorRollOver = p.color(200, 0, 0);
        this.colorRollOff = p.color(this.r, this.g, this.b);
        this.width = width;
        this.height = height;
        this.active = false;

        // update function
        this.update = function () {
            // check if mouse is over the box
            if (p.mouseX > this.x && p.mouseX < this.x + this.width
                && p.mouseY > this.y && p.mouseY < this.y + this.height) {
                // if yes, make this box active and change the color to red
                this.col = this.colorRollOver;
                this.active = true;
                counterer = counter;
            } else {
                this.col = this.colorRollOff;
                this.active = false;
            }
        };

        // display the box with the updated values
        this.display = function () {
            p.noStroke();
            p.fill(this.col);
            p.rect(this.x, this.y, this.width, this.height);
            // p.rect(this.x, this.y, this.width, this.height / 2);
            p.fill(0);
        }
    };

    p.draw = function(){
        p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";

        p.image(img, 120, 200, img.width * 1.12, img.height*1.12);
        p.image(img2, 40, 1570, 320, 320);
        p.image(img3, 360, 1570, img3.width/2, img3.height/2);
        p.image(img4, 700, 1570, img4.width/2, img4.height/2);
        p.image(img5, 1000, 1570, img5.width/2, img5.height/2);

        p.cpalette(img_address, table1.get(p.int(counterer),3),  table1.get(p.int(counterer),4));

        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
                img_address = table1.get(counterer, 5);
            }
        }
        img = p.loadImage(table1.get(p.int(counterer),5));
        img2 = p.loadImage(table2.get(p.int(counterer),5));
        img3 = p.loadImage(table3.get(p.int(counterer),5));
        img4 = p.loadImage(table4.get(p.int(counterer),5));
        img5 = p.loadImage(table5.get(p.int(counterer),5));



        var r_height = p.map(table1.get(p.int(counterer),0),0,255, 1370, 1170);
        var g_height = p.map(table1.get(p.int(counterer),1),0,255, 1370, 1170);
        var b_height = p.map(table1.get(p.int(counterer),2),0,255, 1370, 1170);
        var avg_r = [table1.get(p.int(counterer),0),table1.get(p.int(counterer),1),table1.get(p.int(counterer),2)];


        p.fill(avg_r[0], avg_r[1], avg_r[2]);
        p.rect(120, 1170, 300, 200);
        p.strokeWeight(10);
        p.stroke(0);
        p.line(120, 1420, 420, 1420);
        p.strokeWeight(0);
        p.text('average color', 120, 1470);


        p.fill(255,0,0);
        p.triangle(300 + 240, 1370, 520+ 240, 1370, 410+ 240, r_height);
        p.fill(0,255,0);
        p.triangle(520+ 240, 1370, 740+ 240, 1370, 630+ 240, g_height);
        p.fill(0,0,255);
        p.triangle(740+ 240, 1370, 960+ 240, 1370, 850+ 240, b_height);
        p.fill(0);

        p.strokeWeight(10);
        p.stroke(0);
        p.line(300 + 240, 1420, 1200, 1420);
        p.strokeWeight(0);
        p.fill(0);
        p.text('average RGB', 540, 1470);

        p.stroke(0);
        p.strokeWeight(10);
        p.line(860, 880, 1200, 880);
        p.triangle(1200, 870, 1200, 890, 1220, 880);
        p.stroke(0);
        p.strokeWeight(0);
        p.text('# of pixels', 940, 920);

        p.stroke(0);
        p.strokeWeight(10);
        p.line(120, 980, 1200, 980);
        p.line(120, 1120, 1200, 1120);
        p.stroke(0);
        p.strokeWeight(0);


        // Display active bubble number
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address, artist, album){
        this.artist = artist;
        this.album = album;
        var image_palette = new Image();
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;

        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            var htmlcolor;
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            DV[3] = palette['DarkVibrant'].getPopulation();
            DV[4]=  palette['DarkVibrant'].getHex();
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            V[3] = palette['Vibrant'].getPopulation();
            V[4]=  palette['Vibrant'].getHex();
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            M[3] = palette['Muted'].getPopulation();
            M[4]=  palette['Muted'].getHex();
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            LV[3] = palette['LightVibrant'].getPopulation();
            LV[4]=  palette['LightVibrant'].getHex();
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];
            DM[3] = palette['DarkMuted'].getPopulation();
            DM[4]=  palette['DarkMuted'].getHex();

        });

        var top_color = 0;

        var length = [];
        length[0] = p.map(DV[3], 0, 12000, 0, 100);
        length[1] = p.map(V[3], 0, 12000, 0, 100);
        length[2] = p.map(M[3], 0, 12000, 0, 100);
        length[3] = p.map(LV[3], 0, 12000, 0, 100);
        length[4] = p.map(DM[3], 0, 12000, 0, 100);
        var longest = 0;

        var index = 0;

        for (i=0; i<5; i++){
            if (longest <= length[i]){
                longest = length[i];
                index = i;
            }
        }

        switch(index) {
            case 0:
                top_color = p.str(DV[4]);
                break;
            case 1:
                top_color = p.str(V[4]);
                break;
            case 2:
                top_color = p.str(M[4]);
                break;
            case 3:
                top_color = p.str(LV[4]);
            case 4:
                top_color = p.str(DM[4]);
                break;
            default:
                top_color = "#6195ed";
        }

        var n_match = ntc.name(top_color);

        //console.log(n_match[1]);

        var normalized = [];
        for (i=0; i<5; i++){
            normalized[i] = length[i]/longest;
        }

        var long_normal = 0;

        for (i=0; i<5; i++){
            if (long_normal <= normalized[i]){
                long_normal = normalized[i];
            }
        }

        p.fill(DV[0], DV[1], DV[2]);
        p.rect(860, 200, 100, 128);
        p.rect(960, 220, normalized[0]/long_normal*200, 80);
        p.fill(V[0], V[1], V[2]);
        p.rect(860, 328, 100, 128);
        p.rect(960, 348, normalized[1]/long_normal*200, 80);
        p.fill(M[0], M[1], M[2]);
        p.rect(860, 456, 100, 128);
        p.rect(960, 476, normalized[2]/long_normal*200, 80);
        p.fill(LV[0], LV[1], LV[3]);
        p.rect(860, 584, 100, 128);
        p.rect(960, 604, normalized[3]/long_normal*200, 80);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(860, 712, 100, 128);
        p.rect(960, 732, normalized[4]/long_normal*200, 80);
        p.fill(255);

        p.fill(0);
        p.textFont(myFont);
        p.textSize(30);
        var descriptor = "this album is predominantly " + n_match[1].toLowerCase() + '.';
        var explanor = "based on this color, we think you'll love these albums";
        var title = this.album.replace(/^\s+/g, '');
        var artist =  this.artist.replace(/^\s+/g, '');
        p.text("color analysis of " + artist + "'s " + title.substr(0, 30), 120, 1030);

        p.text(descriptor, 120, 1080);
        p.text(explanor, 120, 1520);


    }



};

var myp5 = new p5(indie_section, 'indie_section');