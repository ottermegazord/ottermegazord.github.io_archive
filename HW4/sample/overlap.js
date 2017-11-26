d3.csv("testing.csv", function(csv) {
    csv = csv.filter(function(key) {
        return key != "b" && key != "g" && key != "band_name" && key != "link" ;
    });
},
    function(data) {
        console.log(data[1]);}
        );



// var chart = c3.generate({
//     data: {
//         url: 'testing.csv',
//         hide: 'a'
//
//     }
// });

