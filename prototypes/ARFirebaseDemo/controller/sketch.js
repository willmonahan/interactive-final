var command = "none";
var canvas;
function setup() {
	canvas = createCanvas(windowWidth,windowHeight);

	canvas.parent("#controller");
	noStroke();

	fill(0,255,0);
	rect(0,0,width/2,height);
	fill(0,0,255);
	rect(width/2,0,width/2,height);
}

function draw() {

}

function mousePressed() {
	if (mouseX < width/2) {
		command = "left";
	} else {
		command = "right";
	}

	if (user_info) {
		var userData = {
			action: command
		};

		var update = {};
		update[user_info.uid+"/"] = userData;
		firebase.database().ref().update(update);
	}
}

function mouseReleased() {
	command = "none";

	if (user_info) {
		var userData = {
			action: command
		};

		var update = {};
		update[user_info.uid+"/"] = userData;
		firebase.database().ref().update(update);
	}
}
