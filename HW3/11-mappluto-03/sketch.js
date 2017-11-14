var table;
var bldgCounts = [];
var maxPop, minPop, maxLon, minLon;
var margin = 250;
var population;
var longitudes;

// we will preload the data set. 
// That will display "Loading..." on the screen so we see something's happening
function preload(){
	table = loadTable('data/location_2.csv', 'csv', 'header');
}



// In this program everything happens in setup
function setup() {
	createCanvas(windowWidth, windowHeight);
  loadData();
  displayData();
}

function loadData() {
  	population = table.getColumn("population");
  	longitudes = table.getColumn("longitude");
    maxPop = 0;
    minPop = 1000000000;
    maxLon = -200;
    minLon = 1000000000;


    // what are the min and max values of the amount of floors?
    for(var i=0; i<population.length; i++){
        var popCount = int(population[i]);
        if(popCount > maxPop){
            maxPop = popCount;
        }
        if(popCount < minPop){
            minPop = popCount;
        }
    }

    for(var i=0; i<longitudes.length; i++){
        var lonCount = float(longitudes[i]);
        if(lonCount > maxLon){
            maxLon = lonCount;
        }
        if(lonCount < minLon){
            minLon = lonCount;
        }
    }
    console.log(minLon, maxLon);
}

function displayData(){

  fill(255,0,0);
  //noStroke();
  // go through building count array
  // map the x value to floor height
  // map the y value to number of buildings
  for(var i=1; i<longitudes.length; i++){
      if(longitudes[i]<0){
        var x = map(longitudes[i],minLon, maxLon, margin, width-margin);
        var y = map(population[i], minPop, maxPop,height-margin,margin);
        ellipse(x,y,5,5);
        //var textDisplay = bldgCounts[i] + " buildings with " + i + " floors.";
      }
  }
}
