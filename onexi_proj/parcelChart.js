function drawVisualization() {
    $.get("data/parcel_count.csv", function(csvString) {
        // transform the CSV string into a 2-dimensional array
        var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

        // this new DataTable object holds all the data
        var data = new google.visualization.arrayToDataTable(arrayData);
        // parcelVsYear - En-route ATFM delay - YY - CHART
        var parcelVsYear = new google.visualization.ChartWrapper({
            chartType: 'LineChart',
            containerId: 'parcelVsYear',
            dataTable: data,
            options:{
                width: 650, height: 300,
                title: 'Number of Parcels Over Time',
                titleTextStyle : {color: 'grey', fontSize: 11},
                vAxis: {"title": "Parcels", "minValue": 150000},
                hAxis: {"title": "Year", "showTextEvery": 1, gridlines: {count: 14}, format: '0000'},
                legend: 'none'
            }
        });
        parcelVsYear.draw();
    });
}
google.setOnLoadCallback(drawVisualization)