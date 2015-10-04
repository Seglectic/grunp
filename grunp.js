/*
					GRunP
				Gun Run Jump
*/

grunp = new optiWink();

boxy = new grunp.entity(20,50,true);
boxy.update = function(){

}

for (var i = 0; i < 10; i++) {
	new grunp.entity(Math.random()*grunp.canvas.width,Math.random()*grunp.canvas.height);
};