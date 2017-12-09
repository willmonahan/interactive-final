// variable to hold a reference to our A-Frame world
var world;

function setup() {
	// no canvas needed
	noCanvas();

	// create a connection to our VR world
	world = new World("VRScene");

	var floor = new Plane({
		red:0,
		blue:255,
		green:0,
		width:100,
		height:100,
		rotationX:-90
	});
	world.add(floor);

	var cab = new Box({
		green:0,
		blue:0,
		width:1,
		depth:1,
		height:.9,
		y:.65
	});
	world.add(cab);

	var windshields = new Box({
		red:0,
		green:0,
		blue:0,
		y:0.65,
		width:1.001,
		depth:.9,
		height:.8
	});
	world.add(windshields);

	var trunk = new Box({
		green:0,
		blue:0,
		width:1.75,
		depth:.999,
		height:.4,
		y:.4
	});
	world.add(trunk);

	var wheel1 = new Circle({
		x:-.5,
		y:.2,
		z:.52,
		radius:0.2,
		red:0,
		green:255,
		blue:0,
		side:'double'
	});
	world.add(wheel1);

	var wheel2 = new Circle({
		x:.5,
		y:.2,
		z:.52,
		radius:0.2,
		red:0,
		green:255,
		blue:0,
		side:'double'
	});
	world.add(wheel2);

	var wheel3 = new Circle({
		x:-.5,
		y:.2,
		z:-.52,
		radius:0.2,
		red:0,
		green:255,
		blue:0,
		side:'double'
	});
	world.add(wheel3);

	var wheel4 = new Circle({
		x:.5,
		y:.2,
		z:-.52,
		radius:0.2,
		red:0,
		green:255,
		blue:0,
		side:'double'
	});
	world.add(wheel4);

	var frontLight1 = new Box({
		width:.1,
		depth:.1,
		height:.1,
		x:.865,
		y:.45,
		z:.35
	});
	world.add(frontLight1);

	var frontLight2 = new Box({
		width:.1,
		depth:.1,
		height:.1,
		x:.865,
		y:.45,
		z:-.35
	});
	world.add(frontLight2);

	var backLight1 = new Box({
		width:.1,
		depth:.1,
		height:.1,
		x:-.865,
		y:.45,
		z:.35,
		green:0,
		blue:0
	});
	world.add(backLight1);

	var backLight2 = new Box({
		width:.1,
		depth:.1,
		height:.1,
		x:-.865,
		y:.45,
		z:-.35,
		green:0,
		blue:0
	});
	world.add(backLight2);
}

function draw() {

}
