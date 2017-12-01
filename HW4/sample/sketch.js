main_header = function(p) {

    var canvaswidth = 1366;

    var myFont;

    p.preload= function(){
        myFont = p.loadFont("HussarBdExt.otf")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 270);

    };


    p.draw = function(){
        p.background(255);
        p.textFont(myFont);
        p.textSize(80);
        p.text("Colors of Music", 40, 230);

    };

};

var myp5 = new p5(main_header, 'main_header');


rnb = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1;
    var img;
    var counterer = 0;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;
    var myFont;

    p.preload = function(){
        table1 = p.loadTable("rnb_sorted.csv", "csv", "header");
        myFont = p.loadFont("HussarBdExt.otf")
        // table2 = loadTable("pop_sorted.csv", "csv", "header")
        // table3 = loadTable("rnb_sorted.csv", "csv", "header")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 300);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.91*i + 192, 0, 0.5, 160, r, g, b, i);
            // boxes[i] = new p.Box(0.91*i + 192, 0, 5, 160, r, g, b, i);
        }
        img = p.loadImage(table1.get(counterer,5));
        //console.log(window.address);

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
                img_address = table1.get(counterer, 5);
                img = p.loadImage(img_address);
                //console.log(img_address);
                // if no make it inactive and change the color
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
        //p.background(255);

        //reset the active bubble number
        activeBoxNumber = "None";
        // p.cpalette(img_address);
        p.image(img, 32, 0, img.width/4, img.height/4);
        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
            }
        }
        // Display active bubble number
        p.fill(255);
        //console.log(counterer);
        p.fill(0);
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address){
        var image_palette = new Image();
        var htmlcolor;
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;
        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            //DV[3] = palette['DarkVibrant'].getPopulation();
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            //V[3] = palette['Vibrant'].getPopulation();
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            //M[3] = palette['Muted'].getPopulation();
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            //LV[3] = palette['LightVibrant'].getPopulation();
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];
            //DM[3] = palette['DarkMuted'].getPopulation();


        });


        p.fill(DV[0], DV[1], DV[2]);
        p.rect(0, 0, 32, 32);
        p.fill(V[0], V[1], V[2]);
        p.rect(0, 32, 32, 32);
        p.fill(M[0], M[1], M[2]);
        p.rect(0, 2*32, 32, 32);
        p.fill(LV[0], LV[1], LV[2]);
        p.rect(0, 3*32, 32, 32);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(0, 4*32, 32, 32);
        //console.log(DV[3], V[3], M[3], LV[3], DM[3]);


    }




};

var myp5 = new p5(rnb, 'rnb');


indie = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1;
    var img;
    var counterer = 0;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;

    p.preload = function(){
        table1 = p.loadTable("indie_sorted.csv", "csv", "header");
        // table2 = loadTable("pop_sorted.csv", "csv", "header")
        // table3 = loadTable("rnb_sorted.csv", "csv", "header")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 160);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.91*i + 192, 0, 0.5, 160, r, g, b, i);
        }
        img = p.loadImage(table1.get(counterer,5));
        //console.log(window.address);

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
                img_address = table1.get(counterer, 5);
                img = p.loadImage(img_address);
                //console.log(img_address);
                // if no make it inactive and change the color
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
        //p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        // p.cpalette(img_address);
        p.image(img, 32, 0, img.width/4, img.height/4);
        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
            }
        }
        // Display active bubble number
        p.fill(255);
        //.log(counterer);
        p.fill(0);
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address){
        var image_palette = new Image();
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;
        var htmlcolor;

        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];


        });


        p.fill(DV[0], DV[1], DV[2]);
        p.rect(0, 0, 32, 32);
        p.fill(V[0], V[1], V[2]);
        p.rect(0, 32, 32, 32);
        p.fill(M[0], M[1], M[2]);
        p.rect(0, 2*32, 32, 32);
        p.fill(LV[0], LV[1], LV[2]);
        p.rect(0, 3*32, 32, 32);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(0, 4*32, 32, 32);


    }




};

var myp5 = new p5(indie, 'indie');


metal = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1;
    var img;
    var counterer = 0;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;

    p.preload = function(){
        table1 = p.loadTable("metal_sorted.csv", "csv", "header");
        // table2 = loadTable("pop_sorted.csv", "csv", "header")
        // table3 = loadTable("rnb_sorted.csv", "csv", "header")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 160);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.91*i + 192, 0, 0.5, 160, r, g, b, i);
        }
        img = p.loadImage(table1.get(counterer,5));
        //console.log(window.address);

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
                img_address = table1.get(counterer, 5);
                img = p.loadImage(img_address);
                //console.log(img_address);
                // if no make it inactive and change the color
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
        //p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        // p.cpalette(img_address);
        p.image(img, 32, 0, img.width/4, img.height/4);
        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
            }
        }
        // Display active bubble number
        p.fill(255);
        //console.log(counterer);
        p.fill(0);
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address){
        var image_palette = new Image();
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;

        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];


        });


        p.fill(DV[0], DV[1], DV[2]);
        p.rect(0, 0, 32, 32);
        p.fill(V[0], V[1], V[2]);
        p.rect(0, 32, 32, 32);
        p.fill(M[0], M[1], M[2]);
        p.rect(0, 2*32, 32, 32);
        p.fill(LV[0], LV[1], LV[2]);
        p.rect(0, 3*32, 32, 32);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(0, 4*32, 32, 32);


    }




};

var myp5 = new p5(metal, 'metal');


pop = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1;
    var img;
    var counterer = 0;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;

    p.preload = function(){
        table1 = p.loadTable("pop_sorted.csv", "csv", "header");
        // table2 = loadTable("pop_sorted.csv", "csv", "header")
        // table3 = loadTable("rnb_sorted.csv", "csv", "header")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 160);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.91*i + 192, 0, 0.5, 160, r, g, b, i);
        }
        img = p.loadImage(table1.get(counterer,5));
        //console.log(window.address);

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
                img_address = table1.get(counterer, 5);
                img = p.loadImage(img_address);
                //console.log(img_address);
                // if no make it inactive and change the color
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
        //p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        // p.cpalette(img_address);
        p.image(img, 32, 0, img.width/4, img.height/4);
        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
            }
        }
        // Display active bubble number
        p.fill(255);
        //console.log(counterer);
        p.fill(0);
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address){
        var image_palette = new Image();
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;

        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];


        });


        p.fill(DV[0], DV[1], DV[2]);
        p.rect(0, 0, 32, 32);
        p.fill(V[0], V[1], V[2]);
        p.rect(0, 32, 32, 32);
        p.fill(M[0], M[1], M[2]);
        p.rect(0, 2*32, 32, 32);
        p.fill(LV[0], LV[1], LV[2]);
        p.rect(0, 3*32, 32, 32);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(0, 4*32, 32, 32);


    }




};

var myp5 = new p5(pop, 'pop');


country = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1;
    var img;
    var counterer = 0;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;

    p.preload = function(){
        table1 = p.loadTable("country_sorted.csv", "csv", "header");
        // table2 = loadTable("pop_sorted.csv", "csv", "header")
        // table3 = loadTable("rnb_sorted.csv", "csv", "header")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 160);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.91*i + 192, 0, 0.5, 160, r, g, b, i);
        }
        img = p.loadImage(table1.get(counterer,5));
        //console.log(window.address);

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
                img_address = table1.get(counterer, 5);
                img = p.loadImage(img_address);
                //console.log(img_address);
                // if no make it inactive and change the color
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
        //p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        // p.cpalette(img_address);
        p.image(img, 32, 0, img.width/4, img.height/4);
        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
            }
        }
        // Display active bubble number
        p.fill(255);
        //console.log(counterer);
        p.fill(0);
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address){
        var image_palette = new Image();
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;
        var htmlcolor;

        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];


        });


        p.fill(DV[0], DV[1], DV[2]);
        p.rect(0, 0, 32, 32);
        p.fill(V[0], V[1], V[2]);
        p.rect(0, 32, 32, 32);
        p.fill(M[0], M[1], M[2]);
        p.rect(0, 2*32, 32, 32);
        p.fill(LV[0], LV[1], LV[2]);
        p.rect(0, 3*32, 32, 32);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(0, 4*32, 32, 32);


    }




};

var myp5 = new p5(country, 'country');


eighties = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1;
    var img;
    var counterer = 0;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;

    p.preload = function(){
        table1 = p.loadTable("eighties_sorted.csv", "csv", "header");
        // table2 = loadTable("pop_sorted.csv", "csv", "header")
        // table3 = loadTable("rnb_sorted.csv", "csv", "header")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 160);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.91*i + 192, 0, 0.5, 160, r, g, b, i);
        }
        img = p.loadImage(table1.get(counterer,5));
        //console.log(window.address);

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
                img_address = table1.get(counterer, 5);
                img = p.loadImage(img_address);
                //console.log(img_address);
                // if no make it inactive and change the color
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
        //p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        // p.cpalette(img_address);
        p.image(img, 32, 0, img.width/4, img.height/4);
        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
            }
        }
        // Display active bubble number
        p.fill(255);
        //console.log(counterer);
        p.fill(0);
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address){
        var image_palette = new Image();
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;
        var htmlcolor;

        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];


        });


        p.fill(DV[0], DV[1], DV[2]);
        p.rect(0, 0, 32, 32);
        p.fill(V[0], V[1], V[2]);
        p.rect(0, 32, 32, 32);
        p.fill(M[0], M[1], M[2]);
        p.rect(0, 2*32, 32, 32);
        p.fill(LV[0], LV[1], LV[2]);
        p.rect(0, 3*32, 32, 32);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(0, 4*32, 32, 32);


    }




};

var myp5 = new p5(eighties, 'eighties');

rock = function(p) {

    var canvaswidth = 1366;
    var boxes = [];
    var activeBoxNumber = "None";
    var table1;
    var img;
    var counterer = 0;
    var DV = [];
    var V = [];
    var M = [];
    var DM = [];
    var LV = [];
    var img_address;

    p.preload = function(){
        table1 = p.loadTable("rock_sorted.csv", "csv", "header");
        // table2 = loadTable("pop_sorted.csv", "csv", "header")
        // table3 = loadTable("rnb_sorted.csv", "csv", "header")
    };

    p.setup = function () {
        p.createCanvas(canvaswidth, 160);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.91*i + 192, 0, 0.5, 160, r, g, b, i);
        }
        img = p.loadImage(table1.get(counterer,5));
        //console.log(window.address);

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
                img_address = table1.get(counterer, 5);
                img = p.loadImage(img_address);
                //console.log(img_address);
                // if no make it inactive and change the color
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
        //p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        // p.cpalette(img_address);
        p.image(img, 32, 0, img.width/4, img.height/4);
        //image(test_image, width/2, height/2, img.width/4, img.height/4);
        // go through all boxes
        for (var i = 0; i < boxes.length; i++) {
            // run each bubble's update and display functions
            boxes[i].update();
            boxes[i].display();
            // check if the current bubble is "active" and save that number
            if(boxes[i].active==true){
                activeBoxNumber = i;
            }
        }
        // Display active bubble number
        p.fill(255);
        //console.log(counterer);
        p.fill(0);
        // console.log(counterer);
        // p.text(table1.get(counterer,5), 200, 400);
        //console.log(img_address);

    };

    p.cpalette = function(img_address){
        var image_palette = new Image();
        image_palette.setAttribute('crossOrigin', '');
        image_palette.src = img_address;
        var htmlcolor;

        image_palette.addEventListener('load', function() {
            var vibrant = new Vibrant(image_palette);
            var swatches = vibrant.swatches();
            palette = swatches;
            //console.log(swatches);
            for (swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                        htmlcolor = palette['DarkVibrant'].getRgb();
            DV[0] = htmlcolor[0];
            DV[1] = htmlcolor[1];
            DV[2] = htmlcolor[2];
            htmlcolor = palette['Vibrant'].getRgb();
            V[0] = htmlcolor[0];
            V[1] = htmlcolor[1];
            V[2] = htmlcolor[2];
            htmlcolor = palette['Muted'].getRgb();
            M[0] = htmlcolor[0];
            M[1] = htmlcolor[1];
            M[2] = htmlcolor[2];
            htmlcolor = palette['LightVibrant'].getRgb();
            LV[0] = htmlcolor[0];
            LV[1] = htmlcolor[1];
            LV[2] = htmlcolor[2];
            htmlcolor = palette['DarkMuted'].getRgb();
            DM[0] = htmlcolor[0];
            DM[1] = htmlcolor[1];
            DM[2] = htmlcolor[2];


        });


        p.fill(DV[0], DV[1], DV[2]);
        p.rect(0, 0, 32, 32);
        p.fill(V[0], V[1], V[2]);
        p.rect(0, 32, 32, 32);
        p.fill(M[0], M[1], M[2]);
        p.rect(0, 2*32, 32, 32);
        p.fill(LV[0], LV[1], LV[2]);
        p.rect(0, 3*32, 32, 32);
        p.fill(DM[0], DM[1], DM[2]);
        p.rect(0, 4*32, 32, 32);


    }




};

var myp5 = new p5(rock, 'rock');

white_canvas = function(p){

    var canvaswidth = 1383;

    p.setup = function() {
        p.createCanvas(canvaswidth, 1240);
        p.background(255);
    };

    p.draw = function() {
        p.background(255);
    };
};

var myp5 = new p5(white_canvas, 'white_canvas');

