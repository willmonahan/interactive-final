// create a variable to hold our world object
var world;

// create a variable to hold our marker
var marker;

var allCars = {};

function setup() {
	world = new World('ARScene');
	angleMode(DEGREES);

	marker = world.getMarker('w_marker');

	//marker.addChild(car.object);


}


function draw() {
	var updates = firebase.database().ref("/");
	updates.on("value", function(snapshot) {
		allData = snapshot.val();
		console.log("Database Updated");
		for (var key in allData) {
			if (typeof allCars[key] == "undefined" && key != "undefined") {
				allCars[key] = new Car();
				marker.addChild(allCars[key].object);
			}
		}
	})

	for (var key in allCars) {
		//console.log(allData[key].goAction);
		if (allData[key].turnAction == "left") {
			allCars[key].turnLeft();
		}
		if (allData[key].turnAction == "right") {
			allCars[key].turnRight();
		}
		if (allData[key].goAction == "forward") {
			allCars[key].goForwards();
		} else if (allData[key].goAction == "backward") {
			allCars[key].goBackwards();
		} else if (allCars[key].speed > allCars[key].acc/2 || allCars[key].speed < -allCars[key].acc/2) {
			allCars[key].decelerate();
			//console.log("beep");
		}
	}

	for (var key in allCars) {
		allCars[key].move();
	}
}

function Car() {
	this.object = new OBJ({
		asset: 'car_obj',
		mtl: 'car_mtl',
		x: 0,
		y: 0,
		z: 0,
		scaleX:0.008,
		scaleY:0.008,
		scaleZ:0.008,
	});

	this.speed = 0;
	this.max = 0.07;
	this.acc = 0.003;
	this.dec = 0.003;
	this.dir = 0;
	this.moving = "forwards"
	this.object.rotateY(this.dir);
	this.turn = 5;
	this.go = false;

	this.move = function() {
		//console.log(this.object.getX() + " - " + this.object.getZ());
		if (this.speed > 0) {
			this.speed = constrain(this.speed, 0, this.max);
		} else if (this.speed < 0) {
			this.speed = constrain(this.speed, -this.max, 0);
		}

		if (this.speed < this.acc/2 && this.speed > -this.acc/2) {
			this.speed = 0;
		} else {
			this.object.rotateY(this.dir);
		}

		this.object.nudge((this.speed*sin(this.dir)),0,(this.speed*cos(this.dir)));

		//console.log(this.dir);

		if (this.object.getZ() > 8) {
			this.object.setZ(-8);
		}
		if (this.object.getZ() < -8) {
			this.object.setZ(8);
		}
		if (this.object.getX() > 8) {
			this.object.setX(-8);
		}
		if (this.object.getX() < -8) {
			this.object.setX(8);
		}
	}

	this.goForwards = function() {
		this.speed += this.acc;
		this.moving = "forwards";
	}

	this.goBackwards = function() {
		this.speed -= this.acc;
		this.moving = "backwards";
	}

	this.decelerate = function() {
		//this.speed -= this.dec;
		if (this.speed > 0) {
			this.speed -= this.dec;
		} else {
			this.speed += this.dec;
		}
	}

	this.turnLeft = function() {
		this.dir += this.turn*(this.speed/this.max);
	}

	this.turnRight = function() {
		this.dir -= this.turn*(this.speed/this.max);
	}
}
