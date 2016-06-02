var app = angular.module("simonGame", ['ngMaterial']);

app.controller("gameController", ['$scope', function($scope){
  $scope.simon = new SimonGame();
  $scope.gamePower = false;
  $scope.counter = "- -";
  $scope.strictToggle = false;

  $scope.evaluateMoves = function(button){
    $scope.gameState = $scope.simon.getGameState();
    if ($scope.gameState){
      var audio = document.getElementById(button + 'Sound');
      audio.play();
      $scope.correctMove = $scope.simon.evaluatePlayerMoves(button);
      if($scope.correctMove == 2){
          $scope.counter = "! !";
      }
    }
  };

  $scope.nextMove = function(button){
    if ($scope.correctMove == 1){
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
    $scope.counter = $scope.simon.getMoveCounter() < 10 ? "0" + $scope.simon.getMoveCounter() : $scope.simon.getMoveCounter();
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

  $scope.toggleStrictMode = function(){
     $scope.gameState = $scope.simon.getGameState();
     if ($scope.gamePower){ 
        $scope.strictToggle = !$scope.strictToggle;
        $scope.simon.toggleStrict();
     }
  }
}]);
