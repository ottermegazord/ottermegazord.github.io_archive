// array that will contain all the boxes 
var boxes = [];
var activeBoxNumber = "None";
var table1;
var img;
var img_address;
var counterer = 0;


function preload(){
    table1 = loadTable("metal_sorted.csv", "csv", "header");
    // table2 = loadTable("pop_sorted.csv", "csv", "header")
    // table3 = loadTable("rnb_sorted.csv", "csv", "header")
}
function setup() {
    createCanvas(1000, 1000);
    background(0);

    // create all the different instances of the boxes
    for (var i=0; i<=1699; i++) {
    	var r = int(table1.get(i,0));
        var g =int(table1.get(i,1));
        var b =int(table1.get(i,2));
        // create a box with number "i", at a random x and y location
        boxes[i] = new Box(i, 30, 4, 200, r, g, b, i);
    }
    img = loadImage(table1.get(counterer,5));
    // output the first bubble object instance
}

// drawing
function draw() {
    background(0);
    //reset the active bubble number
    activeBoxNumber = "None";

    image(img, 0, height/2, img.width/2, img.height/2);
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
    fill(255);
    text("Active Box Number: " + activeBoxNumber, 20,20);
	console.log(counterer);
	fill(0);
	text(table1.get(counterer,5), 200, 400);

}



// an abstract class that defines an object
function Box(x, y, width, height, r, g, b, counter) {

    // These variables are unique to each box
	this.counter = counter;
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.col = color(r, g, b);
    this.colorRollOver = color(100,100,100);
    this.colorRollOff = color(this.r,this.g, this.b);
    this.width = width;
    this.height = height;
    this.active = false;

    // update function
    this.update = function() {
        // check if mouse is over the box
        if(mouseX>this.x && mouseX< this.x+this.width
            && mouseY > this.y && mouseY< this.y+this.height ){
            // if yes, make this box active and change the color to red
            this.col = this.colorRollOver;
            this.active = true;
			counterer = counter;
            img_address = table1.get(counterer,5);
            img = loadImage(img_address);
            // if no make it inactive and change the color
        }else{
            this.col = this.colorRollOff;
            this.active = false;
        }
    };

    // display the box with the updated values
    this.display = function() {
        noStroke();
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
        fill(0);

    };
}