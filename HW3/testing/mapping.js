var slider;
function setup() {
    slider = createSlider(0, 255, 100);
    slider.position(width/2, height/2);
    slider.style('width', '80px');
}

function draw() {
    var val = slider.value();
    background(val);
}