var materialColors = [["#B71C1C","#C62828","#D32F2F","#E53935","#F44336","#EF5350","#E57373","#EF9A9A"],
["#4A148C","#6A1B9A","#7B1FA2","#8E24AA","#9C27B0","#AB47BC","#BA68C8","#CE93D8"],
["#1A237E","#283593","#303F9F","#3949AB","#3F51B5","#5C6BC0","#7986CB","#9FA8DA"],
["#01579B","#0277BD","#0288D1","#039BE5","#03A9F4","#29B6F6","#4FC3F7","#81D4FA"],
["#004D40","#00695C","#00796B","#00897B","#009688","#26A69A","#4DB6AC","#80CBC4"],
["#33691E","#558B2F","#689F38","#7CB342","#8BC34A","#9CCC65","#AED581","#C5E1A5"],
["#F57F17","#F9A825","#FBC02D","#FDD835","#FFEB3B","#FFEE58","#FFF176","#FFF59D"],
["#E65100","#EF6C00","#F57C00","#FB8C00","#FF9800","#FFA726","#FFB74D","#FFCC80"],
["#212121","#424242","#616161","#757575","#9E9E9E","#BDBDBD","#E0E0E0","#EEEEEE","#F5F5F5","#FAFAFA"]];
var differentColors = [];
for (var i = 0; i < materialColors.length; i++) {
	differentColors[i] = materialColors[i][4];
}
var toShow = differentColors;

var colorState = 0;

var carColors = [];

var command = "none";
var canvas;
var newCommands = "";
var prevCommands = "";

var state = "none";

function setup() {
	canvas = createCanvas(windowWidth,windowHeight);

	canvas.parent("#controller");
	noStroke();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	switch (state) {
		case "colors":
			drawColors(toShow);
			break;
		case "controller":
			drawController();
			controller();
			break;
	}
}

function controller() {
	if (user_info) {
		var turnCommand = "none";
		var isTurning = false;
		var goCommand = "none";
		var isGoing = false;
		for (var i = 0; i < touches.length; i++) {
			if (dist(touches[i].x,touches[i].y,width/2,0) <= width/8) {
				signUserOut();
			}
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
		newCommands = turnCommand + goCommand;

		if (newCommands != prevCommands) {
			var userData = {
	 			goAction: goCommand,
				turnAction: turnCommand,
				colors: carColors
	 		};

	 		var update = {};
	 		update[user_info.uid+"/"] = userData;
	 		firebase.database().ref().update(update);
			prevCommands = newCommands;
		}
	}
}

function drawController() {
	fill(4*255/5); //turn left, green
	rect(0,0,width/4,height);
	fill(3*255/5); //turn right, blue
	rect(width/4,0,width/4,height);
	fill(2*255/5);
	rect(width/2,0,width/2,height/2)
	fill(255/5);
	rect(width/2,height/2,width/2,height/2);
	fill(0);
	ellipse(width/2,0,width/8,width/8);
}

function drawColors(colors) {
	for (var i = 0; i < colors.length; i++) {
		fill(colors[i]);
		if (windowHeight > windowWidth) {
			rect(0, windowHeight*(colors.length-1-i)/colors.length, windowWidth, windowHeight/colors.length);
		} else {
			rect(windowWidth*i/colors.length, 0, windowWidth/colors.length, windowHeight);
		}
	}
}

function touchStarted() {
	if (state == "colors") {
		switch (colorState) {
			case 0:
			case 2:
			case 4:
				if (windowHeight > windowWidth) {
					var newArrayNum = floor(mouseY/(height/toShow.length));
					toShow = materialColors[materialColors.length-1-newArrayNum];
				} else {
					var newArrayNum = floor(mouseX/(width/toShow.length));
					toShow = materialColors[newArrayNum];
				}
				colorState ++;
				break;
			case 1:
			case 3:
			case 5:
				var chosenColor;
				if (windowHeight > windowWidth) {
					var newArrayNum = floor(mouseY/(height/toShow.length));
					chosenColor = toShow[toShow.length-1-newArrayNum];
				} else {
					var newArrayNum = floor(mouseX/(width/toShow.length));
					chosenColor = toShow[newArrayNum];
				}
				carColors.push([parseInt(chosenColor.substr(1,2),16),parseInt(chosenColor.substr(3,2),16),parseInt(chosenColor.substr(5,2),16)]);
				toShow = differentColors;
				colorState ++;

				if (colorState == 6) {
					state = "controller";
				}
				break;
		}
	}

	return false;
}

function signUserOut() {
	var update = {};
	update[user_info.uid+"/"] = null;
	firebase.database().ref().update(update)

	var colorState = 0;
	var carColors = [];
	var command = "none";
	var newCommands = "";
	var prevCommands = "";
	var state = "none";

	firebase.auth().signOut();
}
