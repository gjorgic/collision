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

    // add component to array
    // Each element must have render & update method
	var add = function(component) {
		components.push(component);
	}

	var updateApp = function(){
		var time = new Date(),
			length = components.length;

		// update each component
		for(var i = 0; i < length; i++) {
			components[i].update(time);
		}
	}

	var renderApp = function(){

		// clear canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
    
		var length = components.length;

		for(var i = 0; i < length; i++) {
			components[i].render(context);
		}

		// run renderApp again (loop)
		requestAnimationFrame(renderApp);
	}

	var self = {
		add: add,
		config: config
	}

	/**
	 * Run app
	 */
	this.run = function() {
		canvas = document.createElement('canvas');

		canvas.setAttribute('width', config.width);
		canvas.setAttribute('height', config.height);

		context = canvas.getContext("2d");

		// Update app every 80 ms
		updateInterval = setInterval(updateApp, 80);

		// run rendering
		renderApp();
	}

	// append canvas to elemet
	this.appendTo = function(el) {
		el.appendChild(canvas);
	}

	// export function create new Game
	this.createGame = function(){
		game = new Game(self);
		game.initialize();
	}
}