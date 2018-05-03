var app = angular.module('myApp', ['onexi_proj/libraries/chart.js']);

app.controller('myController', function($scope) {
    //los labels, estos pueden estar quemados
    $scope.yAxisLabel = 'Minútos';
    $scope.ZAxisLabel = 'Meses';
    //Los colores, según el caso de uso están quemados por tipo de servicio
    $scope.colors = [ '#00377B', '#FFCB00', '#74A449', '#FF6347', '#D8262E'];
    //el rango de meses en el eje x
    $scope.labels = [1, 2, 3, 4, 5, 6, 7];
    // los tipos de servicio a diagramar por cada meses
    $scope.series = ['tigo', 'todo destino', 'internacional', 'tigo', 'roaming'];
    // datos por tipo de servicio
    $scope.data = [
        [62, 200, 176, 189, 167, 190, 145],
        [28, 48, 40, 19, 86, 23, 90],
        [28, 132, 40, 19, 45, 27, 90],
        [28, 48, 40, 123, 12, 27, 90],
        [28, 48, 40, 19, 86, 27, 90]
    ];
});
