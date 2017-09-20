var img;  // Declare variable 'img'.



function setup() {
    fill(255)
    createCanvas(1000, 1000);
    img = loadImage("assets/asteroid.png");  // Load the image
}

function draw() {

    background(255)
    //timer
    var s_color_r = map(second(), 0, 60, 0, 255)
    var s_color_b = map(second(), 0 , 60, 0, 100)
    var s_color_g = map(second(), 0 , 60, 100, 200)
    fill(s_color_r, s_color_b, s_color_g);
    strokeWeight(20);
    ellipse(1000 - 240, 240, 400, 400);
    var s_x = windowWidth/100 * second();
    var s_y = windowWidth/30 * second()

    // Displays the image at its actual size at point (0,0)
    //image(img, 0, 0);
    // Displays the image at point (0, height/2) at half size
    fill(0)
    noFill()
    //quad(s,30,s,20,s,12,s,20)
    rect()
    //fill(200)
    //quad(s+1,30,s,20,s,12,s,20)
    image(img, s_x, s_y, img.width/4, img.height/4);

}