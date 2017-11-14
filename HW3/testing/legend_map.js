var s = function( p ) {

    var color_filler = ['#FDFEFE3', '#f03', '#ffeb33', '#1327ff'];
    var ethnicity = ['Indian', 'Chinese', 'Filipino', 'Korean'];
    var x = 100;
    var y = 100;
    var width = 200;
    var height = 180;
    var america_asian = 19437463;

    p.setup = function() {
        p.createCanvas(200, 180);
    };

    p.draw = function() {
        p.background("#242426");
        //console.log(color_filler[1]);
        p.textSize(15);
        p.textAlign(p.CENTER);
        fill(255);
        p.ellipse(20, 20, 20, 20);
        for (var i = 0; i < 4; i++){
            p.ellipse(width/3, i*30 + 50, 20, 20);
        }
        p.fill(255);
    };
};

var myp5 = new p5(s, 'map_legend');