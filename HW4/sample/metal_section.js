metal_section = function(p) {

    var canvaswidth = 1440;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1, table2, table3, table4,table5, table6, table7;
    var img;
    var img2;
    var img3;
    var img4;
    var img5, img6, img7;
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
        table6 = p.loadTable("eighties_sorted.csv", "csv", "header");
        table7 = p.loadTable("rock_sorted.csv", "csv", "header");
        myFont = p.loadFont("HussarBdExt.otf")

    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 750);
        p.background(100);

        img = p.loadImage(table1.get(0,5));
        img2 = p.loadImage(table2.get(0,5));
        img3 = p.loadImage(table3.get(0,5));
        img4 = p.loadImage(table4.get(0,5));
        img5 = p.loadImage(table5.get(0,5));
        img6 = p.loadImage(table6.get(0,5));
        img7 = p.loadImage(table7.get(0,5));

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
            boxes[i] = new p.Box(1.1*i, 600, 15, 100, r, g, b, i);
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
        p.cpalette(img_address, table1.get(p.int(counterer),3),  table1.get(p.int(counterer),4));
        //reset the active bubble number
        activeBoxNumber = "None";

        p.imageMode(p.CENTER);
        p.image(img, p.width/2 - 20, 270, img.width*0.75, img.height*0.75);
        p.imageMode(p.CORNER);

        p.image(img2, 980, 290, img.width/6, img.height/6);
        p.image(img3, 980 + img.width/6 + 5, 290, img.width/6, img.height/6);
        p.image(img4, 980 + 2*(img.width/6 + 5), 290, img.width/6, img.height/6);

        p.image(img5, 980, 290 + img.height/6 + 5, img.width/6, img.height/6);
        p.image(img6, 980 + img.width/6 + 5, 290 + img.height/6 + 5, img.width/6, img.height/6);
        p.image(img7, 980 + 2*(img.width/6 + 5), 290 + img.height/6 + 5, img.width/6, img.height/6);

        img = p.loadImage(table1.get(p.int(counterer),5));
        img2 = p.loadImage(table2.get(p.int(counterer),5));
        img3 = p.loadImage(table3.get(p.int(counterer),5));
        img4 = p.loadImage(table4.get(p.int(counterer),5));
        img5 = p.loadImage(table5.get(p.int(counterer),5));
        img6 = p.loadImage(table6.get(p.int(counterer),5));
        img7 = p.loadImage(table7.get(p.int(counterer),5));

        // p.cpalette(img_address, table1.get(p.int(counterer),3),  table1.get(p.int(counterer),4));

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
        // img = p.loadImage(table1.get(p.int(counterer),5));
        // img2 = p.loadImage(table2.get(p.int(counterer),5));
        // img3 = p.loadImage(table3.get(p.int(counterer),5));
        // img4 = p.loadImage(table4.get(p.int(counterer),5));
        // img5 = p.loadImage(table5.get(p.int(counterer),5));


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
        p.rect(210, 30, 200, 96);
        p.fill(V[0], V[1], V[2]);
        p.rect(210, 126, 200, 96);
        p.fill(M[0], M[1], M[2]);
        p.rect(210, 222, 200, 96);
        p.fill(LV[0], LV[1], LV[3]);
        p.rect(210, 318, 200, 96);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(210, 414, 200, 96);
        p.fill(255);

        p.fill(0);
        p.textFont(myFont);
        p.textSize(30);
        var descriptor = "this album is predominantly " + n_match[1].toLowerCase() + '.';
        var explanor = "based on this color, we think you'll love these albums";
        var title = this.album.replace(/^\s+/g, '');
        var artist =  this.artist.replace(/^\s+/g, '');
        var avg_r = [table1.get(p.int(counterer),0),table1.get(p.int(counterer),1),table1.get(p.int(counterer),2)];
        p.text(title.substr(0, 30), 980, 140, 400);
        p.textSize(20);
        p.text(artist, 980, 80);
        p.strokeWeight(5);
        p.stroke(avg_r[0],avg_r[1], avg_r[2]);
        p.line(980, 90, 980 + p.textWidth(artist), 90);
        p.strokeWeight(0);
        // p.text(artist + "'s " + title.substr(0, 30), 1000, 200);

        var sim_text = "similar albums by color";

        p.text(sim_text, 980, 240, 400);
        p.text(15);

        p.strokeWeight(5);
        p.stroke(255, 0, 0);
        p.line(980, 250, 980 + p.textWidth(sim_text), 250);
        p.strokeWeight(0);


    }



};

var myp5 = new p5(metal_section, 'metal_section');

metal_header = function(p) {

    var canvaswidth = 1440;

    var myFont;

    p.preload= function(){
        myFont = p.loadFont("HussarBdExt.otf")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 200);

    };


    p.draw = function(){
        p.background(255);
        p.textFont(myFont);
        p.textSize(80);
        p.text("metal", 30, 170);

    };

};

var myp5 = new p5(metal_header, 'metal_header');