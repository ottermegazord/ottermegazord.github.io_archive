var f = function (p) {

    var dropdown;
    var router;

    p.setup = function(){
        p.createCanvas(430,360);

        // // Load Images
        m1 = p.loadImage('images/neighborhoods/Allston.png');
        m2 = p.loadImage('images/neighborhoods/Back Bay.png');
        m3 = p.loadImage('images/neighborhoods/Bay Village.png');
        m4 = p.loadImage('images/neighborhoods/Beacon Hill.png');
        m5 = p.loadImage('images/neighborhoods/Brighton.png');
        m6 = p.loadImage('images/neighborhoods/Charlestown.png');
        m7 = p.loadImage('images/neighborhoods/Chinatown.png');
        m8 = p.loadImage('images/neighborhoods/Dorchester.png');
        m9 = p.loadImage('images/neighborhoods/Downtown.png');
        m10 = p.loadImage('images/neighborhoods/East Boston.png');
        m11 = p.loadImage('images/neighborhoods/Fenway.png');
        m12 = p.loadImage('images/neighborhoods/Harbor Islands.png');
        m13 = p.loadImage('images/neighborhoods/Hyde Park.png');
        m14 = p.loadImage('images/neighborhoods/Jamaica Plain.png');
        m15 = p.loadImage('images/neighborhoods/Leather District.png');
        m16 = p.loadImage('images/neighborhoods/Longwood Medical Area.png');
        m17 = p.loadImage('images/neighborhoods/Mattapan.png');
        m18 = p.loadImage('images/neighborhoods/Mission Hill.png');
        m19 = p.loadImage('images/neighborhoods/North End.png');
        m20 = p.loadImage('images/neighborhoods/Roslindale.png');
        m21 = p.loadImage('images/neighborhoods/Roxbury.png');
        m22 = p.loadImage('images/neighborhoods/South Boston.png');
        m23 = p.loadImage('images/neighborhoods/South Boston Waterfront.png');
        m24 = p.loadImage('images/neighborhoods/South End.png');
        m25 = p.loadImage('images/neighborhoods/West End.png');
        m26 = p.loadImage('images/neighborhoods/West Roxbury.png');

        // Load dropdown

        dropdown = p.createSelect();
        dropdown.option('Allston');
        dropdown.option('Back Bay');
        dropdown.option('Bay Village');
        dropdown.option('Beacon Hill');
        dropdown.option('Brighton');
        dropdown.option('Charlestown');
        dropdown.option('Chinatown');
        dropdown.option('Dorchester');
        dropdown.option('East Boston');
        dropdown.option('Fenway');
        dropdown.option('Harbor Islands');
        dropdown.option('Hyde Park');
        dropdown.option('Jamaica Plain');
        dropdown.option('Leather District');
        dropdown.option('Longwood Medical Area');
        dropdown.option('Mattapan');
        dropdown.option('Mission Hill');
        dropdown.option('North End');
        dropdown.option('Roslindale');
        dropdown.option('Roxbury');
        dropdown.option('South Boston');
        dropdown.option('South Boston Waterfront');
        dropdown.option('South End');
        dropdown.option('West End');
        dropdown.option('West Roxbury');

        dropdown.changed(p.mySelectEvent);



    };

    p.draw = function(){
        p.background(255);
        dropdown.position(p.width/2-10, 350);

        switch (router){
            default:
                p.image(m1, 0, 0, m1.width/4, m1.height/4);
                break;

            case 1:
                p.image(m1, 0, 0, m1.width/4, m1.height/4);
                break;

            case 2:
                p.image(m2, 0, 0, m2.width/4, m2.height/4);
                break;

            case 3:
                p.image(m3, 0, 0, m1.width/4, m1.height/4);
                break;

            case 4:
                p.image(m4, 0, 0, m2.width/4, m2.height/4);
                break;

            case 5:
                p.image(m5, 0, 0, m1.width/4, m1.height/4);
                break;

            case 6:
                p.image(m6, 0, 0, m2.width/4, m2.height/4);
                break;

            case 7:
                p.image(m7, 0, 0, m1.width/4, m1.height/4);
                break;

            case 8:
                p.image(m8, 0, 0, m2.width/4, m2.height/4);
                break;

            case 9:
                p.image(m9, 0, 0, m1.width/4, m1.height/4);
                break;

            case 10:
                p.image(m10, 0, 0, m2.width/4, m2.height/4);
                break;

            case 11:
                p.image(m11, 0, 0, m1.width/4, m1.height/4);
                break;

            case 12:
                p.image(m12, 0, 0, m2.width/4, m2.height/4);
                break;

            case 13:
                p.image(m13, 0, 0, m1.width/4, m1.height/4);
                break;

            case 14:
                p.image(m14, 0, 0, m2.width/4, m2.height/4);
                break;

            case 15:
                p.image(m15, 0, 0, m1.width/4, m1.height/4);
                break;

            case 16:
                p.image(m16, 0, 0, m2.width/4, m2.height/4);
                break;

            case 17:
                p.image(m17, 0, 0, m1.width/4, m1.height/4);
                break;

            case 18:
                p.image(m18, 0, 0, m2.width/4, m2.height/4);
                break;

            case 19:
                p.image(m19, 0, 0, m1.width/4, m1.height/4);
                break;

            case 20:
                p.image(m20, 0, 0, m2.width/4, m2.height/4);
                break;

            case 21:
                p.image(m21, 0, 0, m2.width/4, m2.height/4);
                break;

            case 22:
                p.image(m22, 0, 0, m2.width/4, m2.height/4);
                break;

            case 23:
                p.image(m23, 0, 0, m2.width/4, m2.height/4);
                break;

            case 24:
                p.image(m24, 0, 0, m2.width/4, m2.height/4);
                break;

            case 25:
                p.image(m25, 0, 0, m2.width/4, m2.height/4);
                break;
            case 26:
                p.image(m26, 0, 0, m2.width/4, m2.height/4);
                break;
        }
    };

    p.mySelectEvent = function(){
        var selected = this.selected();
        switch (selected) {
            case 'Allston':
                router = 1;
                break;
            case 'Back Bay':
                router = 2;
                break;
            case 'Bay Village':
                router = 3;
                break;
            case 'Beacon Hill':
                router = 4;
                break;
            case 'Brighton':
                router = 5;
                break;
            case 'Charlestown':
                router = 6;
                break;
            case 'Chinatown':
                router = 7;
                break;
            case 'Dorchester':
                router = 8;
                break;
            case 'Downtown':
                router = 9;
                break;
            case 'East Boston':
                router = 10;
                break;
            case 'Fenway':
                router = 11;
                break;
            case 'Harbor Islands':
                router = 12;
                break;
            case 'Hyde Park':
                router = 13;
                break;
            case 'Jamaica Plain':
                router = 14;
                break;
            case 'Leather District':
                router = 15;
                break;
            case 'Longwood Medical Area':
                router = 16;
                break;
            case 'Mattapan':
                router = 17;
                break;
            case 'Mission Hill':
                router = 18;
                break;
            case 'North End':
                router = 19;
                break;
            case 'Roslindale':
                router = 20;
                break;

            case 'Roxbury':
                router = 21;
                break;
            case 'South Boston':
                router = 22;
                break;
            case 'South Boston Waterfront':
                router = 23;
                break;
            case 'South End':
                router = 24;
                break;
            case 'West End':
                router = 25;
                break;
            case 'West Roxbury':
                router = 26;
                break;

        }
    }

};

var myp5 = new p5(f, 'selector');