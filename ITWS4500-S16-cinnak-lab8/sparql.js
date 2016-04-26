var page = angular.module('sparql',[]);

page.controller("firstController",["$scope", "$http", function($scope, $http) {
  //starts the search variable with the query
  $scope.search = 
  "SELECT DISTINCT ?movie ?producer ?director WHERE {" +
    '\n \t' + "?movie a dbo:Film;" +
    '\n \t' + "dbo:producer ?producer;" +
    '\n \t' + "dbo:director ?director." +
    '\n' + "} LIMIT 10";

  $scope.searchFunction = function() {

    document.getElementById("loading").style.display = "";
    var url = "/sparql";

    //sends the query to the back end
    $.post(url, {search: $scope.search});

    //gets the query results from the back end
    $http.get(url).then(function(response) {
      document.getElementById("loading").style.display = "none";
      $scope.array = response.data;

      //gets the headers from the array
      $scope.headers = [response.data[0][0], response.data[0][1], response.data[0][2]];
    });
  };
}]);