var command = "none";
var canvas;
function setup() {
	canvas = createCanvas(windowWidth,windowHeight);

	canvas.parent("#controller");
	noStroke();

	fill(4*255/5); //turn left, green
	rect(0,0,width/4,height);
	fill(3*255/5); //turn right, blue
	rect(width/4,0,width/4,height);
	fill(2*255/5);
	rect(width/2,0,width/2,height/2)
	fill(255/5);
	rect(width/2,height/2,width/2,height/2);
}

function windowResized1() {
	resizeCanvas(windowWidth, windowHeight);
	fill(4*255/5); //turn left, green
	rect(0,0,width/4,height);
	fill(3*255/5); //turn right, blue
	rect(width/4,0,width/4,height);
	fill(2*255/5);
	rect(width/2,0,width/2,height/2)
	fill(255/5);
	rect(width/2,height/2,width/2,height/2);
}

function draw() {
	var turnCommand = "none";
	var isTurning = false;
	var goCommand = "none";
	var isGoing = false;
	for (var i = 0; i < touches.length; i++) {
		if (touches[i].x < width/4) {
			turnCommand = "left";
			isTurning = true;
		} else if (touches[i].x > width/4 && touches[i].x < width/2) {
			turnCommand = "right";
			isTurning = true;
		} else {
			if (touches[i].y < height/2) {
				goCommand = "forward"
				isGoing = true;
			} else if(touches[i].y > height/2) {
				goCommand = "backward"
				isGoing = true;
			}
		}
	}

	if (isTurning || isGoing || touches.length == 0) {
		if (!isTurning) {
			turnCommand = "none";
		}
		if (!isGoing) {
			goCommand = "none";
		}
		var userData = {
 			goAction: goCommand,
			turnAction: turnCommand
 		};

 		var update = {};
 		update[user_info.uid+"/"] = userData;
 		firebase.database().ref().update(update);
	}
}

// function mousePressed() {
// 	if (mouseX < width/2) {
// 		command = "left";
// 	} else {
// 		command = "right";
// 	}
//
// 	if (user_info) {
// 		var userData = {
// 			action: command
// 		};
//
// 		var update = {};
// 		update[user_info.uid+"/"] = userData;
// 		firebase.database().ref().update(update);
// 	}
// }
//
// function mouseReleased() {
// 	command = "none";
//
// 	if (user_info) {
// 		var userData = {
// 			action: command
// 		};
//
// 		var update = {};
// 		update[user_info.uid+"/"] = userData;
// 		firebase.database().ref().update(update);
// 	}
// }
