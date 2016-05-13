function Game(app)
{
	var character;
	var level;

	this.initialize = function() {
		app.add(this);

		character = new Character(app, this);
		level = new Level(app, this);

		character.initialize();
		level.initialize();
	}

	this.getCharacter = function() {
		return character;
	}

	this.update = function(time) {
	}

	this.render = function(ctx) {

	}
}