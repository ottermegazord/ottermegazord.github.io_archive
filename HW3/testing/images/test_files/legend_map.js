var s = function( p ) {

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
            console.log(color_filler[i]);
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

var myp5 = new p5(s, 'map_legend');