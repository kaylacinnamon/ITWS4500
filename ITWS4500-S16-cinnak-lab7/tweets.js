var page = angular.module('twitterAPI',[]);

page.controller("firstController",["$scope", "$http", function($scope, $http) {
  //starts the search variable as empty
  $scope.search = "";
  $scope.num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  $scope.exportList = ['JSON', 'CSV'];
  $scope.fileName = "";
  $scope.searchFunction = function() {

    document.getElementById("loading").style.display = "";
    var url = "/tweets";

    var query = {
      search: $scope.search,
      count: $scope.count
    };

    //gets the tweets from twitter
    $http.get(url, {params:query}).then(function(response) {
      //puts the tweets in the scope from the controller
      //$scope.tweets = response.data;
      document.getElementById("loading").style.display = "none";
      //function to help parse the date from the tweets (used in the html)
      $scope.mySplit = function(string, nb) {
        var array = string.split(" ");
        return array[nb];
      }
    });
  };
  $scope.exportFunction = function() {
    //gets the file type from the user
    $.post('/export', {exportType: $scope.exportType});
    $http.get('/export').success(function(data) {
      //gets the alert text from the node server
      $scope.myJSON = data.myJSON;
      $scope.myCSV = data.myCSV;
      //post the JSON alert if the user chooses JSON
      if ($scope.exportType == 'JSON') {
        alert(data.myJSON);
      }
      //post the CSV alert if the user chooses CSV
      else if ($scope.exportType == 'CSV') {
        alert(data.myCSV);
      }
    });
  };
  $scope.buildFunction = function() {
    //sends alert to user
    $http.get('/build').success(function(data) {
      $scope.myBuild = data.myBuild;
      alert(data.myBuild);
    });
  };
  $scope.readFunction = function() {
    $http.get('/read').then(function(response) {
      $scope.tweets = response.data;
      //function to help parse the date from the tweets (used in the html)
      $scope.mySplit = function(string, nb) {
        var array = string.split(" ");
        return array[nb];
      }
    });
  }
  $scope.XMLFunction = function() {
    //gets the file name from the user
    $.post('/XML', {fileName: $scope.fileName});
    //sends alert to user
    $http.get('/XML').success(function(data) {
      $scope.myXML = data.myXML;
      alert(data.myXML);
    });
  };
}]);