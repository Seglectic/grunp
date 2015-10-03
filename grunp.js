/*
					GRunP
				Gun Run Jump
*/

grunp = new optiWink();

boxy = new grunp.entity(20,50,true);

for (var i = 0; i < 1000; i++) {
	new grunp.entity(Math.random()*grunp.canvas.width,Math.random()*grunp.canvas.height);
};
