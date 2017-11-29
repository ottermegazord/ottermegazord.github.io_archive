
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
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.8*i + 192, 0, 15, 160, r, g, b, i);
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
        p.background(255);

        //reset the active bubble number
        activeBoxNumber = "None";
        p.cpalette(img_address);
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
        p.createCanvas(canvaswidth, 300);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.8*i + 192, 0, 15, 160, r, g, b, i);
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
        p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        p.cpalette(img_address);
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
        p.createCanvas(canvaswidth, 300);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.8*i + 192, 0, 15, 160, r, g, b, i);
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
        p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        p.cpalette(img_address);
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
        p.createCanvas(canvaswidth, 300);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.8*i + 192, 0, 15, 160, r, g, b, i);
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
        p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        p.cpalette(img_address);
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
        p.createCanvas(canvaswidth, 300);
        p.background(255);

        // create all the different instances of the boxes
        for (var i=0; i<=1293; i++) {
            var r = p.int(table1.get(i,0));
            var g = p.int(table1.get(i,1));
            var b = p.int(table1.get(i,2));
            // create a box with number "i", at a random x and y location
            boxes[i] = new p.Box(0.8*i + 192, 0, 15, 160, r, g, b, i);
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
        p.background(255);
        //reset the active bubble number
        activeBoxNumber = "None";
        p.cpalette(img_address);
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

// metal_section = function(p) {
//
//     var canvaswidth = 1366;
//     var boxes = [];
//     var activeBoxNumber = "None";
//     var table1, table2, table3, table4,table5;
//     var img;
//     var img2, img3, img4, img5;
//     var opp2, opp3, opp4, opp5;
//     var counterer = 1;
//     var DV = [];
//     var V = [];
//     var M = [];
//     var DM = [];
//     var LV = [];
//     var img_address;
//
//     p.preload = function(){
//         table1 = p.loadTable("metal_sorted.csv", "csv", "header");
//         table2 = p.loadTable("pop_sorted.csv", "csv", "header");
//         table3 = p.loadTable("indie_sorted.csv", "csv", "header");
//         table4 = p.loadTable("rnb_sorted.csv", "csv", "header");
//         table5 = p.loadTable("country_sorted.csv", "csv", "header");
//
//
//     };
//
//     p.setup = function () {
//         p.createCanvas(canvaswidth, 2000);
//         p.background(100);
//
//         img = p.loadImage(table1.get(counterer,5));
//         img2 = p.loadImage(table2.get(counterer,5));
//         img3 = p.loadImage(table3.get(counterer,5));
//         img4 = p.loadImage(table4.get(counterer,5));
//         img5 = p.loadImage(table5.get(counterer,5));
//
//         opp2 = p.loadImage(table2.get(counterer,5));
//         opp3 = p.loadImage(table3.get(counterer,5));
//         opp4 = p.loadImage(table4.get(counterer,5));
//         opp5 = p.loadImage(table5.get(counterer,5));
//
//         // create all the different instances of the boxes
//         for (var i=0; i<=1293; i++) {
//             var r = p.int(table1.get(i,0));
//             var g = p.int(table1.get(i,1));
//             var b = p.int(table1.get(i,2));
//             // create a box with number "i", at a random x and y location
//             boxes[i] = new p.Box(0.8*i, 0, 15, 100, r, g, b, i);
//         }
//         //console.log(counterer);
//
//     };
//
//     p.Box = function(x, y, width, height, r, g, b, counter) {
//         // These variables are unique to each box
//         this.counter = counter;
//         this.x = x;
//         this.y = y;
//         this.r = r;
//         this.g = g;
//         this.b = b;
//         this.col = p.color(r, g, b);
//         this.colorRollOver = p.color(200, 0, 0);
//         this.colorRollOff = p.color(this.r, this.g, this.b);
//         this.width = width;
//         this.height = height;
//         this.active = false;
//
//         // update function
//         this.update = function () {
//             // check if mouse is over the box
//             if (p.mouseX > this.x && p.mouseX < this.x + this.width
//                 && p.mouseY > this.y && p.mouseY < this.y + this.height) {
//                 // if yes, make this box active and change the color to red
//                 this.col = this.colorRollOver;
//                 this.active = true;
//                 counterer = counter;
//                 img_address = table1.get(counterer, 5);
//                 // img = p.loadImage(table1.get(counterer,5));
//                 // img2 = p.loadImage(table2.get(counterer,5));
//                 // img3 = p.loadImage(table3.get(counterer,5));
//                 // img4 = p.loadImage(table4.get(counterer,5));
//                 // img5 = p.loadImage(table5.get(counterer,5));
//                 //
//                 // img = p.loadImage(img_address);
//                 // console.log(img_address);
//                 // if no make it inactive and change the color
//             } else {
//                 this.col = this.colorRollOff;
//                 this.active = false;
//             }
//         };
//
//         // display the box with the updated values
//         this.display = function () {
//             p.noStroke();
//             p.fill(this.col);
//             p.rect(this.x, this.y, this.width, this.height);
//             // p.rect(this.x, this.y, this.width, this.height / 2);
//             p.fill(0);
//         }
//     };
//
//     p.draw = function(){
//         p.background(255);
//
//         //reset the active bubble number
//         activeBoxNumber = "None";
//         p.cpalette(img_address);
//
//         p.image(img, 100, 100, img.width, img.height);
//         p.image(img2, 0, 740, img2.width/2, img2.height/2);
//         p.image(img3, 320, 740, img3.width/2, img3.height/2);
//         p.image(img4, 640, 740, img4.width/2, img4.height/2);
//         p.image(img5, 960, 740, img5.width/2, img5.height/2);
//
//         p.image(opp2, 0, 1090, opp2.width/2, opp2.height/2);
//         p.image(opp3, 320, 1090, opp3.width/2, opp3.height/2);
//         p.image(opp4, 640, 1090, opp4.width/2, opp4.height/2);
//         p.image(opp5, 960, 1090, opp5.width/2, opp5.height/2);
//
//         img = p.loadImage(table1.get(counterer,5));
//         img2 = p.loadImage(table2.get(counterer,5));
//         img3 = p.loadImage(table3.get(counterer,5));
//         img4 = p.loadImage(table4.get(counterer,5));
//         img5 = p.loadImage(table5.get(counterer,5));
//
//         opp2 = p.loadImage(table2.get(1293-counterer,5));
//         opp3 = p.loadImage(table3.get(1293-counterer,5));
//         opp4 = p.loadImage(table4.get(1293-counterer,5));
//         opp5 = p.loadImage(table5.get(1293-counterer,5));
//
//
//
//         // img = p.loadImage(table1.get(counterer,5));
//         // img2 = p.loadImage(table2.get(counterer,5));
//         // img3 = p.loadImage(table3.get(counterer,5));
//         // img4 = p.loadImage(table4.get(counterer,5));
//         // img5 = p.loadImage(table5.get(counterer,5));
//         //
//         // opp2 = p.loadImage(table2.get(1293-counterer,5));
//         // opp3 = p.loadImage(table3.get(1293-counterer,5));
//         // opp4 = p.loadImage(table4.get(1293-counterer,5));
//         // opp5 = p.loadImage(table5.get(1293-counterer,5));
//
//         //image(test_image, width/2, height/2, img.width/4, img.height/4);
//         // go through all boxes
//         for (var i = 0; i < boxes.length; i++) {
//             // run each bubble's update and display functions
//             boxes[i].update();
//             boxes[i].display();
//             // check if the current bubble is "active" and save that number
//             if(boxes[i].active==true){
//                 activeBoxNumber = i;
//             }
//         }
//         // Display active bubble number
//         p.fill(255);
//         //console.log(counterer);
//         p.fill(0);
//         // console.log(counterer);
//         // p.text(table1.get(counterer,5), 200, 400);
//         //console.log(img_address);
//
//     };
//
//     p.cpalette = function(img_address){
//         var image_palette = new Image();
//         image_palette.setAttribute('crossOrigin', '');
//         image_palette.src = img_address;
//
//         image_palette.addEventListener('load', function() {
//             var vibrant = new Vibrant(image_palette);
//             var swatches = vibrant.swatches();
//             var htmlcolor;
//             palette = swatches;
//             //console.log(swatches);
//             for (swatch in swatches)
//                 if (swatches.hasOwnProperty(swatch) && swatches[swatch])
//                     if (swatches.hasOwnProperty(swatch) && swatches[swatch])
//                         htmlcolor = palette['DarkVibrant'].getRgb();
//             DV[0] = htmlcolor[0];
//             DV[1] = htmlcolor[1];
//             DV[2] = htmlcolor[2];
//             DV[3] = palette['DarkVibrant'].getPopulation();
//             DV[4]=  palette['DarkVibrant'].getHex();
//             htmlcolor = palette['Vibrant'].getRgb();
//             V[0] = htmlcolor[0];
//             V[1] = htmlcolor[1];
//             V[2] = htmlcolor[2];
//             V[3] = palette['Vibrant'].getPopulation();
//             V[4]=  palette['Vibrant'].getHex();
//             htmlcolor = palette['Muted'].getRgb();
//             M[0] = htmlcolor[0];
//             M[1] = htmlcolor[1];
//             M[2] = htmlcolor[2];
//             M[3] = palette['Muted'].getPopulation();
//             M[4]=  palette['Muted'].getHex();
//             htmlcolor = palette['LightVibrant'].getRgb();
//             LV[0] = htmlcolor[0];
//             LV[1] = htmlcolor[1];
//             LV[2] = htmlcolor[2];
//             LV[3] = palette['LightVibrant'].getPopulation();
//             LV[4]=  palette['LightVibrant'].getHex();
//             htmlcolor = palette['DarkMuted'].getRgb();
//             DM[0] = htmlcolor[0];
//             DM[1] = htmlcolor[1];
//             DM[2] = htmlcolor[2];
//             DM[3] = palette['DarkMuted'].getPopulation();
//             DM[4]=  palette['DarkMuted'].getHex();
//
//         });
//
//         var top_color = 0;
//
//         var length = [];
//         length[0] = p.map(DV[3], 0, 12000, 0, 100);
//         length[1] = p.map(V[3], 0, 12000, 0, 100);
//         length[2] = p.map(M[3], 0, 12000, 0, 100);
//         length[3] = p.map(LV[3], 0, 12000, 0, 100);
//         length[4] = p.map(DM[3], 0, 12000, 0, 100);
//         var longest = 0;
//
//         var index = 0;
//
//         for (i=0; i<5; i++){
//             if (longest <= length[i]){
//                 longest = length[i];
//                 index = i;
//             }
//         }
//
//         switch(index) {
//             case 0:
//                 top_color = p.str(DV[4]);
//                 break;
//             case 1:
//                 top_color = p.str(V[4]);
//                 break;
//             case 2:
//                 top_color = p.str(M[4]);
//                 break;
//             case 3:
//                 top_color = p.str(LV[4]);
//             case 4:
//                 top_color = p.str(DM[4]);
//                 break;
//             default:
//                 top_color = "#6195ed";
//         }
//
//         var n_match = ntc.name(top_color);
//
//         //console.log(n_match[1]);
//
//         var normalized = [];
//         for (i=0; i<5; i++){
//             normalized[i] = length[i]/longest;
//         }
//
//         var long_normal = 0;
//
//         for (i=0; i<5; i++){
//             if (long_normal <= normalized[i]){
//                 long_normal = normalized[i];
//             }
//         }
//
//         p.fill(DV[0], DV[1], DV[2]);
//         p.rect(740, 100, 100, 128);
//         p.rect(840, 120, normalized[0]/long_normal*200, 80);
//         p.fill(V[0], V[1], V[2]);
//         p.rect(740, 228, 100, 128);
//         p.rect(840, 248, normalized[1]/long_normal*200, 80);
//         p.fill(M[0], M[1], M[2]);
//         p.rect(740, 356, 100, 128);
//         p.rect(840, 376, normalized[2]/long_normal*200, 80);
//         p.fill(LV[0], LV[1], LV[3]);
//         p.rect(740, 484, 100, 128);
//         p.rect(840, 504, normalized[3]/long_normal*200, 80);
//         p.fill(DM[0], DM[1], DM[2]);
//         p.rect(740, 612, 100, 128);
//         p.rect(840, 632, normalized[4]/long_normal*200, 80);
//
//         p.fill(200,0,0);
//         p.textSize(100);
//         p.text(n_match[1], 840, 632);
//     }
//
//
//
//
// };
//
// var myp5 = new p5(metal_section, 'metal_section');