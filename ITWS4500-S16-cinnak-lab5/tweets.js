var page = angular.module('twitterAPI',[]);

page.controller("firstController",["$scope", "$http", function($scope, $http) {
  //starts the search variable as empty
  $scope.search = "";
  $scope.num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
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
      $scope.tweets = response.data;
      document.getElementById("loading").style.display = "none";
      //function to help parse the date from the tweets (used in the html)
      $scope.mySplit = function(string, nb) {
        var array = string.split(" ");
        return array[nb];
      }
    });
  };
}]);