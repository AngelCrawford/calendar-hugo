document.addEventListener('DOMContentLoaded', function() {

	// THANKS: https://codepen.io/zystvan/details/LEbNRp

	// now we will setup our basic variables for the demo
	var canvas = document.getElementById('firework'),
			ctx = canvas.getContext('2d'),
			// full screen dimensions
			cw = 900,
			ch = 900,
			// firework collection
			fireworks = [],
			// particle collection
			particles = [],
			// starting hue
			hue = 120,
			// this will time the auto launches of fireworks, one launch per 80 loop ticks
			timerTotal = 75,
			timerTick = 0;
			
	// set canvas dimensions
	canvas.width = cw;
	canvas.height = ch;

	var animateId;

	// get a random number within a range
	function random( min, max ) {
		return Math.random() * ( max - min ) + min;
	}

	// calculate the distance between two points
	function calculateDistance( p1x, p1y, p2x, p2y ) {
		var xDistance = p1x - p2x,
				yDistance = p1y - p2y;
		return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
	}

	// create firework
	function Firework( sx, sy, tx, ty ) {
		// actual coordinates
		this.x = sx;
		this.y = sy;
		// starting coordinates
		this.sx = sx;
		this.sy = sy;
		// target coordinates
		this.tx = tx;
		this.ty = ty;
		// distance from starting point to target
		this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
		this.distanceTraveled = 0;
		// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
		this.coordinates = [];
		this.coordinateCount = 2;
		// populate initial coordinate collection with the current coordinates
		while( this.coordinateCount-- ) {
			this.coordinates.push( [ this.x, this.y ] );
		}
		this.angle = Math.atan2( ty - sy, tx - sx );
		this.speed = 5;
		this.acceleration = 500;
		this.brightness = random( 50, 70 );
		// circle target indicator radius
		this.targetRadius = 1;
	}

	// update firework
	Firework.prototype.update = function( index ) {
		// remove last item in coordinates array
		this.coordinates.pop();
		// add current coordinates to the start of the array
		this.coordinates.unshift( [ this.x, this.y ] );
		
		// cycle the circle target indicator radius
		if( this.targetRadius < 8 ) {
			this.targetRadius += 0.3;
		} else {
			this.targetRadius = 1;
		}
		
		// speed up the firework
		this.speed *= this.acceleration;
		
		// get the current velocities based on angle and speed
		var vx = Math.cos( this.angle ) * this.speed,
				vy = Math.sin( this.angle ) * this.speed;
		// how far will the firework have traveled with velocities applied?
		this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
		
		// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
		if( this.distanceTraveled >= this.distanceToTarget ) {
			createParticles( this.tx, this.ty );
			// remove the firework, use the index passed into the update function to determine which to remove
			fireworks.splice( index, 1 );
		} else {
			// target not reached, keep traveling
			this.x += vx;
			this.y += vy;
		}
	}

	// draw firework
	Firework.prototype.draw = function() {
		ctx.beginPath();
		// move to the last tracked coordinate in the set, then draw a line to the current x and y
		ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
		ctx.lineTo( this.x, this.y );
		ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
		ctx.stroke();
		
		ctx.beginPath();
		// draw the target for this firework with a pulsing circle
		ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
		ctx.stroke();
	}

	// create particle
	function Particle( x, y ) {
		this.x = x;
		this.y = y;
		// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
		this.coordinates = [];
		this.coordinateCount = 5;
		while( this.coordinateCount-- ) {
			this.coordinates.push( [ this.x, this.y ] );
		}
		// set a random angle in all possible directions, in radians
		this.angle = random( 0, Math.PI * 2 );
		this.speed = random( 1, 10 );
		// friction will slow the particle down
		this.friction = 0.95;
		// gravity will be applied and pull the particle down
		this.gravity = 1;
		// set the hue to a random number +-20 of the overall hue variable
		this.hue = random( hue - 20, hue + 20 );
		this.brightness = random( 50, 80 );
		this.alpha = 1;
		// set how fast the particle fades out
		this.decay = random( 0.015, 0.03 );
	}

	// update particle
	Particle.prototype.update = function( index ) {
		// remove last item in coordinates array
		this.coordinates.pop();
		// add current coordinates to the start of the array
		this.coordinates.unshift( [ this.x, this.y ] );
		// slow down the particle
		this.speed *= this.friction;
		// apply velocity
		this.x += Math.cos( this.angle ) * this.speed;
		this.y += Math.sin( this.angle ) * this.speed + this.gravity;
		// fade out the particle
		this.alpha -= this.decay;
		
		// remove the particle once the alpha is low enough, based on the passed in index
		if( this.alpha <= this.decay ) {
			particles.splice( index, 1 );
		}
	}

	// draw particle
	Particle.prototype.draw = function() {
		ctx. beginPath();
		// move to the last tracked coordinates in the set, then draw a line to the current x and y
		ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
		ctx.lineTo( this.x, this.y );
		ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
		ctx.stroke();
	}

	// create particle group/explosion
	function createParticles( x, y ) {
		// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
		var particleCount = 125;
		while( particleCount-- ) {
			particles.push( new Particle( x, y ) );
		}
	}

	var currentTime = new Date();
	var stopTime = new Date(currentTime.getTime() + 9900);

	// main demo loop
	function loop() {
		// this function will run endlessly with requestAnimationFrame
		animateId = requestAnimationFrame(loop);

		// this will stop the loop after x seconds
		var currentTime = new Date();
		if (currentTime >= stopTime) {
			cancelAnimationFrame(animateId);
		}
			
		// increase the hue to get different colored fireworks over time
		hue += 0.9;
		
		// normally, clearRect() would be used to clear the canvas
		// we want to create a trailing effect though
		// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
		ctx.globalCompositeOperation = 'destination-out';
		// decrease the alpha property to create more prominent trails
		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect( 0, 0, cw, ch );
		// change the composite operation back to our main mode
		// lighter creates bright highlight points as the fireworks and particles overlap each other
		ctx.globalCompositeOperation = 'lighter';
		
		// loop over each firework, draw it, update it
		var i = fireworks.length;
		while( i-- ) {
			fireworks[ i ].draw();
			fireworks[ i ].update( i );
		}
		
		// loop over each particle, draw it, update it
		var i = particles.length;
		while( i-- ) {
			particles[ i ].draw();
			particles[ i ].update( i );
		}
		
		// launch fireworks automatically to random coordinates
		if( timerTick >= timerTotal ) {
			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
			fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
			timerTick = 0;
		} else {
			timerTick++;
		}

	}

	// once the window loads, we are ready for some fireworks! but only on new years eve!
	var dateObject = new Date();
	var month = dateObject.getMonth() + 1;
	var day = dateObject.getDate();

	var newYearStartOldYear = dateObject.getFullYear() + "-12-27";
	var newYearEndOldYear = dateObject.getFullYear() + "-12-31";
	var newYearStartNewYear = dateObject.getFullYear() + "-01-01";
	var newYearEndNewYear = dateObject.getFullYear() + "-01-07";
	var nowDate = dateObject.getFullYear() + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;

	if ( (nowDate >= newYearStartOldYear && nowDate <= newYearEndOldYear) || (nowDate >= newYearStartNewYear && nowDate <= newYearEndNewYear) ) {
		window.onload = loop;
	}

});