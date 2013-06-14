/*
  Creates a particle system
  @param _canvas: the DOM canvas object to use
*/
var ParticleSystem = {

	// Constants
	PARTICLE_IMAGE_URL: 'img/background/particle.png',
	NUM_PARTICLES: 35,
	
	MIN_X: -40,
	MIN_Y: -40,
	MAX_X: 100,
	MAX_Y: 100,
	MAX_VEL_Y: 3,
	MIN_VEL_Y: 4,
	
	MAX_VEL_X: 0.3,
	MIN_VEL_X: -0.3,

	MAX_ACC_Y: 0.4,
	
	
	// Variables
	canvas: null,
	context: null,
	
	particle_acc_y: 0,
	lastPageYOffset: 0,
	particles: null,	// List of all particles
	
	canvasWidth: 0,
	canvasHeight: 0,
	particleImage: null,

	// Initialize this
	// @param _canvas: a reference to the canvas
	init: function(_canvas) 
	{
		_.bindAll(this, 'onParticleImageLoad', 'animate', 'onScroll', 'onClick');

		this.canvas = _canvas;
		this.context = this.canvas.getContext('2d');

		// Init canvas
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		
		this.resize();
		
		// Animation setup
		/*
		window.requestAnimFrame = (function(callback) {
			return	window.requestAnimationFrame || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame || 
					window.oRequestAnimationFrame || 
					window.msRequestAnimationFrame ||
					function(callback) {
						window.setTimeout(callback, 16.66);
					};
		})();
		*/
		
		// Switch direction when scrolling up or down
		
		// Load particle image
		this.particleImage = new Image();
		this.particleImage.onload = this.onParticleImageLoad;
		this.particleImage.src = this.PARTICLE_IMAGE_URL;
	},

	onParticleImageLoad: function() {
		
		this.initParticles();

		this.animate();
		
		window.onscroll = this.onScroll;

		//$(this.canvas).click(this.onClick);

		//window.onresize = this.resize;		
	},

	onClick: function(event) {
		console.log("onClick " + event.clientX + " " + event.clientY);

		var clickX = event.clientX;
		var clickY = event.clientY;
		
		this.context.drawImage(this.particleImage, clickX, clickY);


	},

	// Animate loop function
	animate: function() 
	{
		// clear
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		
		// Update particle
		this.updateParticles();
		
		// Draw
		this.drawParticles();
		
		// Request new frame
		window.requestAnimFrame(this.animate);
	},

	// Create a bunch of particles
	initParticles: function()
	{
		this.particles = new Array();
		
		for (var i = 0; i < this.NUM_PARTICLES; i++) {
			var _x = Math.random()*this.canvasWidth;
			var _y = Math.random()*this.canvasHeight;
			var _maxVelY = this.MIN_VEL_Y + Math.random()*(this.MAX_VEL_Y - this.MIN_VEL_Y);
			var _alpha = 1.0;
			var _velX = this.MIN_VEL_X + Math.random()*(this.MAX_VEL_X - this.MIN_VEL_X);
			
			// Half of all particles should run slower and be more faded, to simulate being in the back
			if (Math.random() < 0.5) {
				_maxVelY = 0.5*_maxVelY;
				_alpha = 0.5;
			}
			
			var particle = Object.create(Particle);
			particle.init(_x, _y, _maxVelY, this.MAX_ACC_Y, _alpha);
			
			this.particles.push(particle);
		}
		
		this.particle_acc_y = this.MAX_ACC_Y;
	},

	// Draw all the particles
	drawParticles: function()
	{
		for (var i = 0; i < this.NUM_PARTICLES; i++) {
			var particle = this.particles[i];
			
			var p_x = particle.x;
			var p_y = particle.y;
			
			this.context.globalAlpha = particle.alpha;
			this.context.drawImage(this.particleImage, p_x, p_y);
		}
	},

	// Update the particles
	updateParticles: function() 
	{
		for (var i = 0; i < this.NUM_PARTICLES; i++) {
			var particle = this.particles[i];
			
			// Update velocity
			particle.velY += particle.accY;
			if (particle.velY > particle.maxVelY)
				particle.velY = particle.maxVelY;
			if (particle.velY < -particle.maxVelY)
				particle.velY = -particle.maxVelY;
			
			// Update position
			particle.y += particle.velY;
			if (particle.y > this.MAX_Y) {
				particle.y = this.MIN_Y;
				this.setNewX(particle);
			}
			if (particle.y < this.MIN_Y) {
				particle.y = this.MAX_Y;
				this.setNewX(particle);
			}
			
			particle.x += particle.velX;			
		}
	},

	// Set a new x position and velocity, whenver a particle reaches top or bottom edge
	setNewX: function(particle)
	{
		particle.x = Math.random()*this.canvasWidth;
		particle.velX = this.MIN_VEL_X + Math.random()*(this.MAX_VEL_X - this.MIN_VEL_X);
	},
	
	
	// Switch the direction
	switchDirection: function()
	{
		this.particle_acc_y = -this.particle_acc_y;
		
		for (var i = 0; i < this.NUM_PARTICLES; i++) {
			var particle = this.particles[i];
			
			particle.accY = this.particle_acc_y;
		}
	},
	
	// When scroling, check the direction
	// If scroling up, move particles up. if down, move particles down
	onScroll: function()
	{
		var offset = window.pageYOffset;
		var new_acc_y;
		
		if (offset > this.lastPageYOffset)
			new_acc_y = this.MAX_ACC_Y;
		else
			new_acc_y = -this.MAX_ACC_Y;
		
		this.lastPageYOffset = offset;
		
		if (this.particle_acc_y != new_acc_y)
			this.switchDirection();
	},

	// Resize this particle system
	resize: function(w, h)
	{
		this.canvas.width = w;
		this.canvas.height = h;
		
		this.canvasWidth = w;
		this.canvasHeight = h;
		
		this.MAX_X = w;
		this.MAX_Y = h;
	}
	
}

// Particle declaration
var Particle = {
	
	// Variables
	x: 0,
	y: 0,
	maxVelY: 0,
	velY: 0,
	velX: 0,
	accY: 0,
	alpha: 0,

	// Constructor
	init: function(_x, _y, _maxVelY, _accY, _velX, _alpha) 
	{
		this.x = _x;
		this.y = _y;
		this.maxVelY = _maxVelY;
		this.velY = this.maxVelY;
		this.velX = _velX;
		this.accY = _accY;
		this.alpha = _alpha;
	}
}

//var particleSystem = Object.create(ParticleSystem);












