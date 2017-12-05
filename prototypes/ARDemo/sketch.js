// create a variable to hold our world object
var world;

// create a variable to hold our marker
var marker;

var car;

function setup() {
	// create our world (this also creates a p5 canvas for us)
	world = new World('ARScene');
	angleMode(DEGREES);

	// grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
	marker = world.getMarker('w_marker');

	// create some geometry to add to our marker
	/*var littleCube = new Box({
		x:0,
		y:0.25,
		z:0,
		red:0,
		green:255,
		blue:0,
		width:0.5,
		height:0.5,
		depth:0.5
	});*/

	// add the cube to our marker
	//marker.addChild(littleCube);

	car = new Car();
	marker.addChild(car.object);
}


function draw() {
	car.move();
}

function Car() {
	this.object = new OBJ({
		asset: 'car_obj',
		mtl: 'car_mtl',
		x: 0,
		y: 0.5,
		z: 0,
		scaleX:0.003,
		scaleY:0.003,
		scaleZ:0.003,
	});

	this.speed = 0;
	this.max = 0.07;
	this.acc = 0.003;
	this.dec = 0.003;
	this.dir = 0;
	this.object.rotateY(this.dir);
	this.turn = 7;

	this.move = function() {
		if (keyIsDown(38)) { //up arrow
			this.accelerate();
		} else {
			this.decelerate();
		}
		this.speed = constrain(this.speed, 0, this.max);

		if (this.speed > 0) {
			if (keyIsDown(37)) { //left arrow
				this.turnLeft();

			}

			if (keyIsDown(39)) { //right arrow
				this.turnRight();

			}
			this.object.rotateY(this.dir);
		}

		this.object.nudge((this.speed*sin(this.dir)),0,(this.speed*cos(this.dir)));
		//console.log(this.dir);
	}

	this.accelerate = function() {
		this.speed += this.acc;
	}

	this.decelerate = function() {
		this.speed -= this.dec;
	}

	this.turnLeft = function() {
		this.dir += this.turn*(this.speed/this.max);
	}

	this.turnRight = function() {
		this.dir -= this.turn*(this.speed/this.max);
	}
}
