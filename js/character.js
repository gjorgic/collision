var Constants = {
	KEY_TOP: 38,
	KEY_RIGHT: 39,
	KEY_DOWN: 40,
	KEY_LEFT: 37
}

function Character(app){


	var width = 50;
	var height = 50;

	var acceleration = 90;
	var deltaTime = 0.08;
	var fractionForce = 20;

	var fraction = {left: 0, top: 0, right: 0, bottom: 0};
	var force = {left: 0, top: 0, right: 0, bottom: 0};
	var initialSpeed = {left: 0, top: 0, right: 0, bottom: 0};
	var position = {x: 150, y: 150};

	var keyEventHandler = function(e){
		relise = e.type == 'keyup' ? true : false;
		switch(e.which) {
			case Constants.KEY_LEFT:
				e.preventDefault();
				force.left = relise ? 0 : acceleration;
			break;
			case Constants.KEY_TOP:
				e.preventDefault();
				force.top = relise ? 0 : acceleration;
			break;
			case Constants.KEY_RIGHT:
				e.preventDefault();
				force.right = relise ? 0 : acceleration;
			break;
			case Constants.KEY_DOWN:
				e.preventDefault();
				force.bottom = relise ? 0 : acceleration;
			break;
		}
	}.bind(this);

	this.initialize = function() {

		// add this object to application elements array
		app.add(this);

		window.onkeydown = keyEventHandler;
		window.onkeyup = keyEventHandler;
	}


	this.stop = function(side){
		if(!side) {
			force = {up: 0, right: 0, down: 0, left: 0};
			return true;
		}

		if(["up", "right", "down", "left"].indexOf(side) < 0) {
			return false;
		}

		force[side] = 0;
		return true;
	}

	this.position = function(){
		return {
			x: position.x,
			y: position.y
		}
	}

	this.size = function() {
		return {
			width: width,
			height: height
		}
	}

	this.collisionHandler = function(pos) {
		if(pos.x) {
			initialSpeed.left = 0;
			initialSpeed.right = 0;
		}

		if(pos.y) {
			initialSpeed.top = 0;
			initialSpeed.bottom = 0;
		}

		position = {
			x: position.x + pos.x,
			y: position.y + pos.y
		};
	}

	this.update = function(time){
		var move = {};
		var keys = ['left', 'top', 'right', 'bottom'];

		for(var i in keys)
		{
			var key = keys[i];
			var f = force[key] - fraction[key];

			move[key] = (0.5 * f * deltaTime + initialSpeed[key]) * deltaTime;
			initialSpeed[key] += f * deltaTime;
		}

		var hs = initialSpeed.left - initialSpeed.right;
		var vs = initialSpeed.top - initialSpeed.bottom;

		var x = Math.max(0, move.right) - Math.max(0, move.left);
		var y = Math.max(0, move.bottom) -Math.max(0,  move.top);

		if(x > 0) { fraction.right = fractionForce; fraction.left = 0; }
		else if(x < 0) { fraction.left = fractionForce; fraction.right = 0; }
		else { fraction.left = 0; fraction.right = 0; }

		if(y > 0) { fraction.bottom = fractionForce; fraction.top = 0; }
		else if(y < 0) { fraction.top = fractionForce; fraction.bottom = 0; }
		else { fraction.top = 0; fraction.bottom = 0; }

		position.x = Math.floor(position.x + x);
		position.y = Math.floor(position.y + y);
	}

	this.render = function(ctx) {
		ctx.beginPath();
		ctx.rect(
					position.x * app.config.dpul,
					position.y * app.config.dpul,
					width * app.config.dpul,
					height * app.config.dpul
				);
    	ctx.fillStyle = '#000000';
    	ctx.fill();
    	ctx.stroke();
	}
}