/*
					optiWink Game Framework
*/


optiWink = function(){
/*
				  Environment Setup
		This section is for the preparation of
		the web environment to allow to for a 
		a decent browser experience
*/
	var self = this;
	this.canvas = document.createElement("canvas");
	this.canvas.id = "game";
	this.canvas.height=window.innerHeight-20;
	this.canvas.width=window.innerWidth-20;
	this.c = this.canvas.getContext("2d");
	document.body.appendChild(this.canvas);



/*
				Controls Setup
		Sets up global control objects 
		for mouse, keyboard, maybe touch?
*/

	//gamePad object
	this.gPad = {
		up:false,
		down:false,
		left:false,
		right:false,
	};


	//Handles press
	this.keyDown = function(e){
	    key = e.keyCode;
	    
	    if([32, 37, 38, 39, 40].indexOf(key) > -1) {e.preventDefault();} //If arrow keys, prevent browser's default scroll action
	    switch(key){
	        case 87: self.gPad.up=true;break;
	        case 65: self.gPad.left=true;break;
	        case 83: self.gPad.down=true;break;
	        case 68: self.gPad.right=true;break;
	        case 38: self.gPad.up=true;break;
	        case 37: self.gPad.left=true;break;
	        case 40: self.gPad.down=true;break;
	        case 39: self.gPad.right=true;break;
			// case 32: gPad.firing = true; break;
	        // case 70: gPad.firing = true;break;
	        // case 16: gPad.warping= true; break;
	        default:break;
	    }
	}

	//Handles key release
	this.keyUp = function(e){
	    key = e.keyCode;
	    switch(key){
	        case 87: self.gPad.up=false; break;
	        case 65: self.gPad.left=false;break;
	        case 83: self.gPad.down=false;break;
	        case 68: self.gPad.right=false;break;
	        case 38: self.gPad.up=false;break;
	        case 37: self.gPad.left=false;break;
	        case 40: self.gPad.down=false;break;
	        case 39: self.gPad.right=false;break;
			// case 32: gPad.firing = false; break;
	        // case 70: gPad.firing = false;break;
	        // case 16: gPad.warping = false; break;
	        default:break;
	    }
	}


	addEventListener("keydown",self.keyDown);
	addEventListener("keyup",self.keyUp);



/*
					  General-Purpose Functions
		This section reserved for general functions that find
		use throughout puddle and not specific to any object
*/

	//Check if 2D point within circle (point x, point y, (x,y,radius) of circle)
	this.pointCircleCollide = function(px,py,x,y,r){
		x -= r;
		y -= r;
		w = (r*2);
		h = (r*2);
		if(px>x&px<x+w&py>y&py<y+h){return true;}
		else{return false;}
	};

	//Check if 2D point within circle (point x, point y, (x,y,width,height) of rect)
	this.pointRectCollide = function(px,py,x,y,w,h){
		if(px>x&px<x+w&py>y&py<y+h){return true;}
	};


	//AABB rect collision detection
	this.rCollide = function(x1,y1,w1,h1,x2,y2,w2,h2){
		return;
	}

	//2D distance
	this.distance = function(x1,y1,x2,y2){
		var d = Math.sqrt( ((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1)) );
		return d;
	};

	//Check collision between two circles
	this.circleCollide = function(x1,y1,r1,x2,y2,r2){
		var d = distance(x1,y1,x2,y2);
		var rDist = r1+r2
		if (d<=rDist){
			return true;}
		else{return false}
	}

	//Random range from min-max, bool int if rounding
	this.RNG = function(min,max,int){
		var RNG = (Math.random()*(max-min))+min;
		if (int){RNG = Math.floor(RNG);}
		return RNG;
	};



/*
				World Gravity
		Defines an gravity object with [masses] 
		array whose children will have their downward
		'y' velocity increased till they reach terminal status
*/
	this.gravity = function(){

	}



	this.entities = [];
/*
					Entity Object
		Defines a game object to be drawn into
		the game display with standardized vals
*/
	this.entity = function(x,y,controlling){
		//Cartesian properties:
		this.x = x||(canvas.width/2)*Math.random();
		this.y = y||(canvas.height/2)*Math.random();
		//X,Y,and terminal velocity
		this.xVel = 0;
		this.yVel = 0;
		this.gDelta = 1; //How much gravity to increment
		this.tVel = 10;
		this.drag = 4;
		this.w = 20;
		this.h = 20;
		//Color properties
		this.color = {r:255,g:255,b:255,a:1};
		this.alpha = 1;
		//If player controlling this object
		if (controlling){this.controlling = controlling;}
		else{this.controlling=false;}
		//If not affected by gravity
		this.massless = false;

		//Rudimentary physics stuff
		this.physics = function(){
			this.x += this.xVel;
			this.y += this.yVel;
			
			if(this.drag>0){
				this.xVel += (0-this.xVel)*(0.01*this.drag)
				this.yVel += (0-this.yVel)*(0.01*this.drag)
			}

			//Gravity
			if (this.y<self.canvas.height-this.h){
				if (this.yVel<this.tVel){
					this.yVel += 0.01;
				}
			}
		}

		this.controls = function(){
			if(this.controlling){
				if(self.gPad.up){  }
				if(self.gPad.down){ this.yVel=5; }
				if(self.gPad.left){ this.xVel=-5; }
				if(self.gPad.right){ this.xVel=5; }
			}
		}

		//User modifiable update prototype
		this.update = function(){

		};

		//Necessary update function
		this.coreUpdate = function(){
			this.update();
			this.controls();
			this.physics();
			this.draw();
		};

		this.draw = function(){
			self.c.fillStyle = "rgba(255,255,255,"+this.color.a+")";
			self.c.fillRect(this.x,this.y,this.w,this.h);		
		};
		self.entities.push(this);
	};


/*
					Visual FX
		Defines some fancy/necessary routines
		for painting to our canvas.
*/

	//Draw puddle background
	this.drawbG = function(){
	    this.c.fillStyle= "rgba(0,0,0,1)";
	    this.c.fillRect(0,0,this.canvas.width,this.canvas.height);
	};

	//Draw scanlines
	this.scanLines = function(){
	    for (line=1;line<=self.canvas.height;line+=2){
	        self.c.fillStyle="rgba(30,30,30,0.3)";
	        self.c.fillRect(0,line,self.canvas.width,1);
	    }
	}



/*
					Main Update Loop
				Where the magic happens.
*/

	this.update = function(){
		self.drawbG();
		self.scanLines();

		//Update all entities
		for (var i = self.entities.length - 1; i >= 0; i--) {
			e = self.entities[i];
			e.coreUpdate();
		};

	};



	setInterval(this.update,20);
}

