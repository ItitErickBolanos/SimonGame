var app = angular.module("simonGame", ['ngMaterial']);

app.controller("gameController", ['$scope', function($scope){
  $scope.simon = new SimonGame();
  $scope.gamePower = false;
  $scope.counter = "- -";

  $scope.evaluateMoves = function(button){
    $scope.gameState = $scope.simon.getGameState();
    if ($scope.gameState){
      var audio = document.getElementById(button + 'Sound');
      audio.play();
      $scope.correctMove = $scope.simon.evaluatePlayerMoves(button);
    }
  };

  $scope.nextMove = function(button){
    if ($scope.correctMove){
      $scope.counter = $scope.simon.getMoveCounter() < 10 ? "0" + $scope.simon.getMoveCounter() : $scope.simon.getMoveCounter();
      if ($scope.counter == "20"){
        $scope.simon.showWin();
      } else {
        $scope.simon.generateMoves();
        $scope.simon.showMoves();
      }
    }
    var audio = document.getElementById(button + 'Sound');
    audio.pause();
    audio.currentTime = 0;
  }

  $scope.switchGameOn = function(){
    $scope.simon.switchGameOn();
    $scope.gamePower = $scope.simon.getGamePower();
    $scope.counter = "- -";
  }

  $scope.startGame = function(){
    if ($scope.gamePower) {
      $scope.simon.startGame();
      $scope.counter = $scope.simon.getMoveCounter() < 10 ? "0" + $scope.simon.getMoveCounter() : $scope.simon.getMoveCounter();
    }
  }
}]);
