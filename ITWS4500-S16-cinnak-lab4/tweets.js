var page = angular.module('twitterAPI',[]);

page.controller("firstController",["$scope", "$http", function($scope, $http) {
  //starts the search variable as empty
  $scope.search = "";
  $scope.searchFunction = function() {
    var url = "get_tweets.php";
    //if someone puts something in the search bar
    if ($scope.search != "") {
      //append it to the url
      url += "?q=" + $scope.search;
    }
    //gets the tweets from twitter
    $http.get(url).then(function(response) {
      //puts the tweets in the scope from the controller
      $scope.tweets = response.data.statuses;
      //function to help parse the date from the tweets (used in the html)
      $scope.mySplit = function(string, nb) {
        var array = string.split(" ");
        return array[nb];
      }
    });
  };

  $scope.searchFunction();
}]);