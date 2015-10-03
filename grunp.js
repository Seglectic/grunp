/*
					GRunP
				Gun Run Jump
*/

/*
				  Environment Setup
		This section is for the preparation of
		the web environment to allow to for a 
		a decent browser experience
*/

canvas = document.createElement("canvas");
canvas.id = "game";
canvas.height=window.innerHeight-20;
canvas.width=window.innerWidth-20;
c = canvas.getContext("2d");
document.body.appendChild(canvas);



/*
				Controls Setup
		Sets up global control objects 
		for mouse, keyboard, maybe touch?
*/

//global gamePad object
var gPad = {
	up:false,
	down:false,
	left:false,
	right:false,
};


//Handles press
function keyDown(e){
    key = e.keyCode;
    
    if([32, 37, 38, 39, 40].indexOf(key) > -1) {e.preventDefault();} //If arrow keys, prevent browser's default scroll action
    switch(key){
        case 87: gPad.up=true;break;
        case 65: gPad.left=true;break;
        case 83: gPad.down=true;break;
        case 68: gPad.right=true;break;
        case 38: gPad.up=true;break;
        case 37: gPad.left=true;break;
        case 40: gPad.down=true;break;
        case 39: gPad.right=true;break;
		// case 32: gPad.firing = true; break;
        // case 70: gPad.firing = true;break;
        // case 16: gPad.warping= true; break;
        default:break;
    }
}

//Handles key release
function keyUp(e){
    key = e.keyCode;
    switch(key){
        case 87: gPad.up=false; break;
        case 65: gPad.left=false;break;
        case 83: gPad.down=false;break;
        case 68: gPad.right=false;break;
        case 38: gPad.up=false;break;
        case 37: gPad.left=false;break;
        case 40: gPad.down=false;break;
        case 39: gPad.right=false;break;
		// case 32: gPad.firing = false; break;
        // case 70: gPad.firing = false;break;
        // case 16: gPad.warping = false; break;
        default:break;
    }
}


addEventListener("keydown",keyDown);
addEventListener("keyup",keyUp);



/*
					  General-Purpose Functions
		This section reserved for general functions that find
		use throughout puddle and not specific to any object
*/

//Check if 2D point within circle (point x, point y, (x,y,radius) of circle)
pointCircleCollide = function(px,py,x,y,r){
	x -= r;
	y -= r;
	w = (r*2);
	h = (r*2);
	if(px>x&px<x+w&py>y&py<y+h){return true;}
	else{return false;}
};

//Check if 2D point within circle (point x, point y, (x,y,width,height) of rect)
pointRectCollide = function(px,py,x,y,w,h){
	if(px>x&px<x+w&py>y&py<y+h){return true;}
};


//AABB rect collision detection
rCollide = function(x1,y1,w1,h1,x2,y2,w2,h2){
	return;
}

//2D distance
distance = function(x1,y1,x2,y2){
	var d = Math.sqrt( ((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1)) );
	return d;
};

//Check collision between two circles
circleCollide = function(x1,y1,r1,x2,y2,r2){
	var d = distance(x1,y1,x2,y2);
	var rDist = r1+r2
	if (d<=rDist){
		return true;}
	else{return false}
}

//Random range from min-max, bool int if rounding
RNG = function(min,max,int){
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
gravity = function(){
	this.masses = [];

	//Apply forces on all objects in masses array
	this.applyGravity = function(){
		for (var i = this.masses.length - 1; i >= 0; i--) {
			e = this.masses[i];
			if (e.yVel<5){
				e.yVel += 1;
			}
		};
	}
}



/*
				Entity Object
		Defines a game object to be drawn into
		the game display with standardized vals
*/

entity = function(x,y,controlling){
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
		if (this.y<canvas.height-this.h){
			this.y+=1;
		}
	}

	this.controls = function(){
		if(this.controlling){
			if(gPad.up){  }
			if(gPad.down){ this.yVel=5; }
			if(gPad.left){ this.xVel=-5; }
			if(gPad.right){ this.xVel=5; }
		}
	}

	this.update = function(){
		this.controls();
		this.physics();
		this.draw();
	};

	this.draw = function(){
		c.fillStyle = "rgba(255,255,255,"+this.color.a+")";
		c.fillRect(this.x,this.y,this.w,this.h);		
	};
};

enemies = []
for (var i = 0; i < 10; i++) {
	enemies.push(new entity());
}; 

boxy = new entity(20,50);
boxy.controlling = true;



/*
					Visual FX
		Defines some fancy/necessary routines
		for painting to our canvas.
*/

//Draw puddle background
drawbG = function(){
    c.fillStyle= "rgba(0,0,0,1)";
    c.fillRect(0,0,canvas.width,canvas.height);
};

//Draw scanlines
scanLines = function(){
    for (line=1;line<=canvas.height;line+=2){
        c.fillStyle="rgba(30,30,30,0.3)";
        c.fillRect(0,line,canvas.width,1);
    }
}



/*
					Main Update Loop
				Where the magic happens.
*/

grunpDate = function(){
	drawbG();
	boxy.update();
	scanLines();

	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].update();
	};
};



setInterval(grunpDate,20);