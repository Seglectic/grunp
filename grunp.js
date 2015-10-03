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
	scanLines();
};



setInterval(grunpDate,20);