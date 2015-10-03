
grunpGame = function(){

	this.preload = function(){
		
	};


	this.create = function(){

	};


	this.update = function(){

	};


	this.render = function(){

	};
};


var game = new Phaser.Game(window.innerWidth-18,window.innerHeight-17, Phaser.AUTO, 'game');
game.state.add("game",grunpGame);
game.state.start("game");