function App(config)
{
	config = config || {};
	config.width = config.width || 800;
	config.height = config.height || 800;

	config.dpul = config.width / 1000;

	var updateInterval;
	var renderInterval;
	var components = [];

	var canvas;
	var context;

	var game;

	var requestAnimationFrame =  
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
          return setTimeout(callback, 10);
        };

	var add = function(component) {
		components.push(component);
	}

	var updateApp = function(){
		var time = new Date(),
			length = components.length;

		for(var i = 0; i < length; i++) {
			components[i].update(time);
		}
	}

	var renderApp = function(){

		context.clearRect(0, 0, canvas.width, canvas.height);
    
		var length = components.length;

		for(var i = 0; i < length; i++) {
			components[i].render(context);
		}

		requestAnimationFrame(renderApp);
	}

	var self = {
		add: add,
		config: config
	}

	this.run = function() {
		canvas = document.createElement('canvas');

		canvas.setAttribute('width', config.width);
		canvas.setAttribute('height', config.height);

		context = canvas.getContext("2d");

		updateInterval = setInterval(updateApp, 80);

		renderApp();
	}

	this.appendTo = function(el) {
		console.log(canvas);
		el.appendChild(canvas);
	}

	this.createGame = function(){
		game = new Game(self);
		game.initialize();
	}
}