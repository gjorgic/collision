function Level(app, game)
{
	var width = 1000;
	var height = 1000;

	var brick = {
		width: 50,
		height: 50
	}

	var mapPoints = [];

	this.initialize = function() {
		app.add(this);

		// setup map
		mapPoints = this.initializeMap();
	}

	this.update = function() {

		var characterSize = game.getCharacter().size();
		var characterPosition = game.getCharacter().position();

		mapPoints = mapPoints.map(function(brick, i){
			var cd = new CollisionDetector(brick, {
				width: 50,
				height: 50,
				position: game.getCharacter().position()
			});

			var cdc = cd.collision();

			if(!!cdc) {
				game.getCharacter().collisionHandler(cd.collision());
				brick.color = 'red';
			} else {
				brick.color = '#eeeeee';
			}

			return brick;
		})
	}

	this.render = function(ctx) {

		mapPoints.map(function(m){
			
			ctx.beginPath();
			ctx.rect(
						m.position.x * app.config.dpul,
						m.position.y * app.config.dpul,
						m.width * app.config.dpul,
						m.height * app.config.dpul
					);
	    	ctx.fillStyle = m.color;
	    	ctx.fill();
	    	ctx.stroke();
		});
	}

	this.initializeMap = function() {

		var horizontalBrickCount = width / brick.width;
		var verticalBrickCount = height / brick.height;

		var map = [];

		for(var x = 0; x < horizontalBrickCount; x++) {
			for(var y = 0; y < height; y++) {

				X = (x * brick.width);
				Y = (y * brick.height);

				if(!x || !y || (x == horizontalBrickCount - 1) || (y == verticalBrickCount - 1) || (x == 10 && y == 10)) {
					map.push({
						width: brick.width,
						height: brick.height,
						position: {x: X, y: Y},
						color: '#eeeeee',
						texture: ''
					});
				}
			}
		}

		return map;
	}
}