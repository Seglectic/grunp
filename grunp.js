/*
					GRunP
				Gun Run Jump
*/

grunpGame = function(){

	this.preload = function(){
		grunp.load.image("boxy","gfx/boxy.png")


	};

	this.create = function(){
		grunp.physics.startSystem(Phaser.Physics.ARCADE);
		grunp.physics.arcade.gravity.y = 250;


		//Create main character 'boxy'
		this.boxy = grunp.add.sprite(200,200,"boxy");
		grunp.physics.enable(this.boxy,Phaser.Physics.ARCADE);
		this.boxy.body.collideWorldBounds = true;
		this.boxy.body.bounce.y = 0.2;


		//Create obstacle to jump over
		obstacles = grunp.add.group();
		obstacle = obstacles.create(100,100,"boxy");
		grunp.physics.enable(obstacles,Phaser.Physics.ARCADE);
		//obstacles.body.collideWorldBounds = true;
		//obstacles.body.bounce.y = 0.2;

		this.controls = grunp.input.keyboard.createCursorKeys();
	};

	this.update = function(){
		if (this.controls.left.isDown){
			this.boxy.body.velocity.x = -100;
		}
		else if(this.controls.right.isDown){
			this.boxy.body.velocity.x = 100;
		} 
		else if(!(this.controls.right.isDown||this.controls.left.isDown)) {
			this.boxy.body.velocity.x = 0;
		}


	};

	this.render = function(){


	};
}

var grunp = new Phaser.Game(window.innerWidth-18,window.innerHeight-17, Phaser.AUTO, 'GRunP');
grunp.state.add("grunpGame",grunpGame);
grunp.state.start("grunpGame");