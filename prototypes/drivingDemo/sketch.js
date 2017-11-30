var carImage;
var car;

function preload() {
	carImage = loadImage("images/car.png");
}

function setup() {
	createCanvas(500,500);
	imageMode(CENTER);
	angleMode(DEGREES);
	car = new Car(250,400);
}

function draw() {
	background(0);
	car.move();
	car.show();
}

function Car(x,y) {
	this.x = x;
	this.y = y;
	this.scale = 0.02;
	this.dir = 0;

	this.speed = 0;
	this.max = 8
	this.acc = 0.08;
	this.dec = 0.24;
	this.turn = 3;

	this.img = carImage;

	this.move = function() {
		if (keyIsDown(38)) { //up arrow
			this.speed += this.acc;
			console.log(this.speed);
		} else {
			this.speed -= this.dec;
		}
		this.speed = constrain(this.speed, 0, this.max);

		if (this.speed > 0) {
			if (keyIsDown(37)) { //left arrow
				this.dir -= this.turn*(this.speed/this.max);
				console.log("left");
			}

			if (keyIsDown(39)) { //right arrow
				this.dir += this.turn*(this.speed/this.max);
				console.log("right");
			}
		}

		this.y -= this.speed * cos(this.dir);
		this.x += this.speed * sin(this.dir);

		//wraparound logic
		if (this.y < 0) {
			this.y = height;
		}
		if (this.y > height) {
			this.y = 0;
		}
		if (this.x < 0) {
			this.x = width;
		}
		if (this.x > width) {
			this.x = 0;
		}
	}

	this.show = function() {
		push();
		translate(this.x, this.y);
		rotate(this.dir);
		image(this.img, 0, 0, this.scale*this.img.width, this.scale*this.img.height);
		pop();
	}
}
