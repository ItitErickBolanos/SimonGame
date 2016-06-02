function SimonGame(){
    this.gameOn = false;
    this.gameInProgress = false;
    this.strictMode = false;
    this.moveCounter = null;
    this.moveHistory = [];
    this.playerMoves = [];
    this.lightUpTimeout = null
    this.lightOffTimeout = null;
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

    clearValues: function(){
      this.gameInProgress = true;
      this.moveCounter = null;
      this.moveHistory = [];
      this.playerMoves = [];
      if (this.lightUpTimeout != null) {
          clearTimeout(this.lightUpTimeout);
          if (this.lightOffTimeout != null) {
              clearTimeout(this.lightOffTimeout);
          }
          $(".button").removeClass("blue green red yellow");
          this.lightUpTimeout = this.lightOffTimeout = null;
      }
    },

    switchGameOn: function(){
      this.gameOn = !this.gameOn;
      if(!this.gameOn){
          this.clearValues();
      }
      return this.gameOn;
    },

    startGame: function(){
      this.clearValues();
      this.generateMoves();
      this.showMoves();
    },

    toggleStrict: function(){
      this.strictMode = !this.strictMode;
    },

    generateMoves: function(){
      var randomMove = Math.floor((Math.random() * 4));
      this.moveHistory.push(this.GAMEBUTTONS[randomMove]);
      this.moveCounter = this.moveHistory.length;
    },

    showMoves: function(){
      var that = this, i = 0;
      for(var i = 0; i < this.moveHistory.length; i++){
          this.lightUpButtons(i);
      }
    },

    lightUpButtons: function(i){
      var that = this;
      this.lightUpTimeout = setTimeout(function() {
        var audio = document.getElementById(that.moveHistory[i] + 'Sound');
        audio.play();
        $("#" + that.moveHistory[i]).addClass(that.moveHistory[i]);
        that.lightOffTimeout = setTimeout(function() {
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
        return 2;
      }
      if(this.playerMoves.length == this.moveHistory.length){
        this.playerMoves = [];
        return 1;
      }
      return 0;
    },

    showMistake: function(){
      var that = this;
      if(!this.strictMode){
        this.playerMoves = [];
        setTimeout(function(){
            that.showMoves();
        }, 500);
      } else {
        setTimeout(function(){
            that.startGame();
        }, 500);
      }
    },

    showWin: function(){
      console.log("YOU WIN!");
      this.startGame();
    }


}
