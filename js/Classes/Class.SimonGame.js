function SimonGame(){
    this.gameOn = false;
    this.gameInProgress = false;
    this.strictMode = false;
    this.moveCounter = null;
    this.moveHistory = [];
    this.playerMoves = [];
    this.GAMEBUTTONS = ["green", "red", "yellow", "blue"];

}

SimonGame.prototype = {
    getGamePower: function(){
      return this.gameOn;
    },

    getGameState: function(){
      return this.gameInProgress;
    },

    getMoveCounter: function(){
      return this.moveCounter;
    },

    switchGameOn: function(){
      this.gameOn = !this.gameOn;
      if(!this.gameOn){
        this.moveCounter = null;
      }
      return this.gameOn;
    },

    startGame: function(){
      this.gameInProgress = true;
      this.moveCounter = null;
      this.moveHistory = [];
      this.playerMoves = [];
      this.generateMoves();
      this.showMoves();
    },

    activateStrict: function(){
      this.strictMode = !this.strictMode;
    },

    generateMoves: function(){
      var randomMove = Math.floor((Math.random() * 4));
      this.moveCounter = this.moveHistory.length + 1;
      this.moveHistory.push(this.GAMEBUTTONS[randomMove]);
    },

    showMoves: function(){
      var that = this, i = 0;
      for(var i = 0; i < this.moveHistory.length; i++){
          this.lightUpButtons(i);
      }
    },

    lightUpButtons: function(i){
      var that = this;
      setTimeout(function() {
        var audio = document.getElementById(that.moveHistory[i] + 'Sound');
        audio.play();
        $("#" + that.moveHistory[i]).addClass(that.moveHistory[i]);
        setTimeout(function() {
            $("#" + that.moveHistory[i]).removeClass(that.moveHistory[i]);
            audio.pause();
            audio.currentTime = 0;
        }, 700);
      }, 1000 * i);
    },

    evaluatePlayerMoves: function(button){
      this.playerMoves.push(button);
      if (this.moveHistory[this.playerMoves.length - 1] != this.playerMoves[this.playerMoves.length - 1]){
        this.showMistake();
        return false;
      }
      if(this.playerMoves.length == this.moveHistory.length){
        this.playerMoves = [];
        return true;
      }
      return false;
    },

    showMistake: function(){
      if(!this.strictMode){
        this.playerMoves = [];
        this.showMoves();
      } else {
        this.startGame();
      }
    },

    showWin: function(){
      console.log("YOU WIN!");
      this.startGame();
    }


}
