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

var state = 0;
var toShow = differentColors;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();

	background(0);
}

function draw() {
	drawColors(toShow);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	drawColors(toShow);
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
	switch (state) {
		case 0:
			if (windowHeight > windowWidth) {
				var newArrayNum = floor(mouseY/(height/toShow.length));
				toShow = materialColors[materialColors.length-1-newArrayNum];
			} else {
				var newArrayNum = floor(mouseX/(width/toShow.length));
				toShow = materialColors[newArrayNum];
			}
			state = 1;
			break;
		case 1:
			if (windowHeight > windowWidth) {
				var newArrayNum = floor(mouseY/(height/toShow.length));
				toShow = [toShow[toShow.length-1-newArrayNum]];
			} else {
				var newArrayNum = floor(mouseX/(width/toShow.length));
				toShow = [toShow[newArrayNum]];
			}
			state = 2;
			break;
		case 2:
			toShow = differentColors;
			state = 0;
			break;
	}
}
