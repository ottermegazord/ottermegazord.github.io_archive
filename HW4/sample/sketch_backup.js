/*
	keep track of the mouse click positions
draw a polygon from all the mouse click positions
*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var table1;
var table2;
var table3;
var colors;


function preload(){
	table1 = loadTable("metal_sorted.csv", "csv", "header");
    // table2 = loadTable("pop_sorted.csv", "csv", "header")
    // table3 = loadTable("rnb_sorted.csv", "csv", "header")
}

function setup() {
	createCanvas(1000,800);
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function draw(){
	background(0);
	for (var i=0; i<=1000; i++){
		//fill(table1.get(i,3));
        //console.log(table1.get(i,3));
        noStroke();
		rect(0.5*i, 30, 0.5, 200);
		console.log(table1.get(i,3));
		//fill(63.0, 63.0, 63.0)
        fill(int(table1.get(i,0)), int(table1.get(i,1)), int(table1.get(i,2)));
        //fill(i);
	}

    // for (var j=0; j<=1000; j++){
    // 	//fill(table1.get(i,3));
    //    //console.log(table1.get(i,3));
    //    noStroke();
    // 	rect(0.5*j, 430, 0.5, 200);
    // 	console.log(table2.get(j,3));
    // 	//fill(63.0, 63.0, 63.0)
    //    fill(int(table2.get(j,0)), int(table2.get(j,1)), int(table2.get(j,2)));
    //    //fill(i);
    // }
    //
    // for (var k=0; k<=1000; k++){
    //     //fill(table1.get(i,3));
    //     //console.log(table1.get(i,3));
    //     noStroke();
    //     rect(0.5*k, 230, 0.5, 200);
    //     console.log(table3.get(k,3));
    //     //fill(63.0, 63.0, 63.0)
    //     fill(int(table3.get(k,0)), int(table3.get(k,1)), int(table3.get(k,2)));
    //     //fill(i);
    // }

}

function hello(){
	console.log('hello');
}




