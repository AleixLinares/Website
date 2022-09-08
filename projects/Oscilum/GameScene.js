var frameTime = 1000/60;
var prevTime=0;
var currentTime;
var deltaTime=0, timeAnimation=0, deathTime=0;
var drawLine=false, touchingGround=false, hookDeployed=false, moving=false, dying=false;
let renderArray = []
let runner, render, mouse, hook=null, projectile=null, deathDetector, deathGround, player;
let deathSound = new Audio("./projects/Oscilum/CasualDeathSound.wav")

let windowWidth = window.innerWidth/1.4;
let windowHeight = window.innerHeight/1.4;

var state = {
  pressedKeys: {
    esc: false,
    up: false,
    down: false,
    enter: false,
    W: false,
    S: false,
    A: false,
    D: false,
    left: false,
    right: false,
    space: false
  }
}

var keyMap = {
  27: 'esc',
  38: 'up',
  40: 'down',
  13: 'enter',
  87: 'W',
  83: 'S',
  65: 'A',
  68: 'D',
  32: 'space',
  37: 'left',
  39: 'right'

}
function keydown(event) {
  var key = keyMap[event.keyCode] 
  console.log(event)
  state.pressedKeys[key] = true 
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

function gameInit() {

	renderArray = []
	runner = Matter.Runner.create();

	engine = Matter.Engine.create();	

	mouse = Matter.Mouse.create(canvas)
	
	windowWidth = canvas.width;
	windowHeight = canvas.height;

	render = Matter.Render.create({
		element: document.body,
		canvas: canvas,
		engine: engine,
		options:{
			wireframes: false,
			background: "skyblue",			
			width: canvas.width,
      height: canvas.height,
      hasBounds: true
		}
	});

	render.bounds.max.x = render.bounds.min.x + render.options.width;
  render.bounds.max.y = render.bounds.min.y + render.options.height;

	gameContainer=document.getElementById("gameContainer")
	gameContainer.appendChild(canvas);

	context.clearRect(0,0, canvas.width, canvas.height)	

	window.addEventListener("keydown", keydown, false)
	window.addEventListener("keyup", keyup, false)

	player = new Player(650,200, 20, "red")
	//player= new Player(5700,1400,20, "blue")
	let detector = Matter.Bodies.rectangle(650,200+25,5,1,{
		isSensor: true,
		label: "detector",
		render: {
			visible: false
		}
	});
	renderArray.push(detector)
	var scenarioOptions = {
		isStatic:true,
		label: "scenario",
		render: {
			fillStyle: "white",
			strokeStyle: "black",
			lineWidth: 0
			},
		collisionFilter: {
				group: 1
			}
		};	
		var scenarioOptions2 = {
		isStatic:true,
		label: "scenario",
		render: {
			fillStyle: "orange",
			strokeStyle: "black",
			lineWidth: 0
		},
		collisionFilter: {
				group: 1
			}
		};		
	let ground = Matter.Bodies.rectangle(700,780,500,280,scenarioOptions);
	renderArray.push(ground)
	let roof = Matter.Bodies.rectangle(3200,50,5000,600,scenarioOptions);
	renderArray.push(roof)
	let roof2 = Matter.Bodies.rectangle(1*350,50,500,600,scenarioOptions);
	renderArray.push(roof2)
	let ground2 = Matter.Bodies.rectangle(700+600,780,500,280,scenarioOptions);
	renderArray.push(ground2)
	let ground3 = Matter.Bodies.rectangle(700+600+1000,780,500,280,scenarioOptions);
	renderArray.push(ground3)
	let support = Matter.Bodies.rectangle(700+600+550,350,100,50,scenarioOptions);
	renderArray.push(support)
	let roof3 = Matter.Bodies.rectangle(3500,250,500,600,scenarioOptions);
	renderArray.push(roof3)
	let ground4 = Matter.Bodies.rectangle(4000,1000,500,280,scenarioOptions);
	renderArray.push(ground4)
	let roof4 = Matter.Bodies.rectangle(4900,500,300,1000,scenarioOptions);
	renderArray.push(roof4)
	let roof5 = Matter.Bodies.rectangle(4900,1750,300,1000,scenarioOptions);
	renderArray.push(roof5)
	let ground5 = Matter.Bodies.rectangle(5700,1500,700,280,{
		isStatic:true,
		label: "finish",
		render: {	
			fillStyle: "white",
			strokeStyle: "black",
			lineWidth: 0,	
			sprite: {
						texture: "./projects/Oscilum/finish.png",
						yOffset: 0.84
						//yScale: 2.1
					} 
				}	
	});
	renderArray.push(ground5)
	let ground6 = Matter.Bodies.rectangle(5700,1500,700,280,scenarioOptions);
	renderArray.push(ground6)
	deathGround = Matter.Bodies.rectangle(3000, 1500, 10000,200, {
		isSensor: true,
		isStatic:true,
		render: {	
			fillStyle: "yellow",
			strokeStyle: "black",
			lineWidth: 1,
			visible: false
			},
		collisionFilter: {
				group: 0,
				category: "0x0002",
				mask: "0x0004"
			}	
	})
	renderArray.push(deathGround)
	deathDetector = Matter.Detector.create({
		bodies: [player.body,deathGround]
	});

	canvas.addEventListener('mousedown', function() { 

		Matter.Render.startViewTransform(render)
		if(hook)  {
			Matter.Composite.remove(engine.world,hook);
			hookDeployed=false;
			hook=null
		}
		if(projectile) {
			Matter.Composite.remove(engine.world,projectile);
			projectile=null;
		}
		drawLine=true;
		projectile = Matter.Bodies.circle(player.body.position.x, player.body.position.y, 3, {
			label: "noGravity",
			friction: 0,
      frictionStatic: 0,
      frictionAir: 0,
      restitution: 1,
      render: {
				fillStyle: "red"	
			},
			collisionFilter: {
				group: -1,
				//category: "0x0004"
				//mask: "0x0002"
			}		
		})
		var shiftX = (player.body.position.x-windowWidth / 2)
		var shiftY = (player.body.position.y-windowHeight / 2)	
		var velocity = Matter.Vector.mult(Matter.Vector.normalise({x:(mouse.position.x+shiftX)-(player.body.position.x), y:mouse.position.y+shiftY-player.body.position.y}),25)		
		Matter.Body.setVelocity(projectile, velocity)
		Matter.Composite.add(engine.world,projectile);
	});

	canvas.addEventListener('mouseup', function() { 

		if(hook)  {
			Matter.Composite.remove(engine.world,hook);
			hookDeployed=false;
			hook=null
		}
		if(projectile) {
			Matter.Composite.remove(engine.world,projectile);
			projectile=null;
		}
		drawLine=false;		
	});
	

	Matter.Composite.add(engine.world,renderArray);
	Matter.Runner.start(runner, engine);
	Matter.Render.run(render);

	Matter.Events.on(render, 'beforeRender', function() {     
    
      // center view at player 
	   	Matter.Bounds.shift(render.bounds,
	    {
	        x: (player.body.position.x - (render.bounds.max.x-render.bounds.min.x) / 2),
	        y: (player.body.position.y - (render.bounds.max.y-render.bounds.min.y) / 2)
	    });
    });

	Matter.Events.on(engine, 'beforeUpdate', function() {

		if(projectile) {
			var dist = Math.hypot(projectile.position.x-player.body.position.x, projectile.position.y-player.body.position.y)
			if(dist>=450) {
				Matter.Composite.remove(engine.world,projectile);
				projectile=null;
			}
		}

		var bodies = Matter.Composite.allBodies(engine.world)
    var gravity = engine.world.gravity;
    for(var i=0; i<bodies.length; ++i) {
    	if (bodies[i].label=="noGravity") {
	        Matter.Body.applyForce(bodies[i], bodies[i].position, {
	            x: -gravity.x * gravity.scale * bodies[i].mass,
	            y: -gravity.y * gravity.scale * bodies[i].mass
	        });
	    }
	  }
});
	Matter.Events.on(engine, 'afterUpdate', function() {

		if(player)Matter.Body.setPosition(detector, {x:player.body.position.x, y: player.body.position.y+25})
	});

	Matter.Events.on(engine, "collisionStart", event => {
		var pairs = event.pairs;
		let scenarioAux, projectileAux;
    
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];        
      if(pair.bodyA.label=="noGravity" || pair.bodyB.label=="noGravity") {
        	if(pair.bodyA.label=="noGravity") {
        		scenarioAux=pair.bodyB;
        		projectileAux=pair.bodyA;
        	}
        	else if(pair.bodyB.label=="noGravity") {
        		scenarioAux=pair.bodyA;
        		projectileAux=pair.bodyB;
        	}
        	hook = Matter.Constraint.create({
						bodyA: player.body,
						bodyB: scenarioAux,
						stiffness: 0.05,	
						type: "line",
						pointB:	{x:projectileAux.position.x-scenarioAux.position.x, y:projectileAux.position.y-scenarioAux.position.y},
						render: {
							type: "line",
							lineWidth: 2,
							strokeStyle: "red"
						}	
					});
			    Matter.Composite.add(engine.world,hook);
			    hookDeployed=true;
			    if(projectile) {
			    	Matter.Composite.remove(engine.world,projectileAux);
					  projectile=null;
			    }
			    break}        
    	}

	});

	Matter.Events.on(engine, "collisionActive", event => {
		var pairs = event.pairs;
		var detectorCollision = false, playerCollision=false;

		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];  			
			if(pair.bodyA.label=="detector" && pair.bodyB.label=="scenario") {
				detectorCollision=true
			}			
			if((pair.bodyA.label=="player" && pair.bodyB.label=="scenario")||(pair.bodyB.label=="player" && pair.bodyA.label=="scenario")) {
				playerCollision=true 				
				
			}	
		}
		if(detectorCollision && playerCollision) {
			touchingGround=true			
		}
	})
	Matter.Events.on(engine, "collisionEnd", event => {
		var pairs = event.pairs;
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];
			if((pair.bodyA.label=="player" && pair.bodyB.label=="scenario")||(pair.bodyB.label=="player" && pair.bodyA.label=="scenario")) {
				touchingGround=false 				
			}
		}		
	})	

	Matter.Events.on(render, "afterRender", event => {	
		Matter.Render.startViewTransform(render)
		if(drawLine && projectile) {			
			render.context.beginPath();
			render.context.moveTo(player.body.position.x, player.body.position.y);
			render.context.lineTo(projectile.position.x, projectile.position.y);
			render.context.lineWidth = 2;
			render.context.strokeStyle = "red";
			render.context.stroke();
		}
	})


	window.requestAnimationFrame(loop)


}

function loop(currentTime) {
	//console.log(deltaTime)
	deltaTime = currentTime - prevTime

	//if(deltaTime > frameTime) {		
	//console.log(render.bounds)
	if(state.pressedKeys.S) {
		Matter.Render.lookAt(render, {
        min: {y:render.bounds.min.y-20, x:render.bounds.min.x-20},
        max: {y:render.bounds.max.y+20, x:render.bounds.max.x+20},
    	});
		
	}
	if(state.pressedKeys.W) {
		Matter.Render.lookAt(render, {
        min: {y:render.bounds.min.y+20, x:render.bounds.min.x+20},
        max: {y:render.bounds.max.y-20, x:render.bounds.max.x-20},
    	});
		
	}

	prevTime = currentTime

	update(deltaTime)	

	//console.log(deltaTime + " > "  +frameTime)

	//console.log("FPS: " +1/deltaTime*1000)


	if(!state.pressedKeys.esc) window.requestAnimationFrame(loop)	
}

function update(deltaTime){

	var dyingList = Matter.Detector.collisions(deathDetector)
	
	if(dyingList.length!=0) {
		if(dyingList[0].collided) {			
			dying=true;
		}
	}
	if(!dying) {		
		if(!hookDeployed && touchingGround && state.pressedKeys.A) {	

			Matter.Body.setVelocity(player.body,{x:-6,y:0})
			moving=true;
		}	
		if(!hookDeployed && touchingGround && state.pressedKeys.D) {
			Matter.Body.setVelocity(player.body,{x:6,y:0})
			moving=true;
		}
		/*if(!hookDeployed && !touchingGround && state.pressedKeys.A) {		
			Matter.Body.setVelocity(player.body,{x:-2,y:player.body.velocity.y})
			moving=true;
		}	
		if(!hookDeployed && !touchingGround && state.pressedKeys.D) {
			Matter.Body.setVelocity(player.body,{x:2,y:player.body.velocity.y})
			moving=true;
		}*/
		if(touchingGround && moving && (!state.pressedKeys.D && !state.pressedKeys.A)) {
			moving=false	
			Matter.Body.setVelocity(player.body,{x:0,y:0})
			Matter.Body.setAngularVelocity(player.body,0)
		}	

		if(!hookDeployed && touchingGround && state.pressedKeys.space) {	
			touchingGround=false 
			Matter.Body.applyForce(player.body,player.body.position,{x:0,y:-0.04})
		}
	}
	if(dying) {
		if(deathTime==0) deathSound.play()
		deathTime+=deltaTime
		timeAnimation+=deltaTime
		if(deathTime>500) {
			dying=false
			touchingGround=false
			moving=false
			hookDeployed=false
			deathTime=0
			timeAnimation=0
			Matter.Composite.remove(engine.world,player.body)
			player = new Player(650,200, 20, "red")			
			//Matter.Composite.add(engine.world,player.body)
			deathDetector = Matter.Detector.create({
				bodies: [player.body,deathGround]
			});
		}
		else if(timeAnimation>50) {
			timeAnimation-=50			
			player.body.render.sprite.xScale-=0.015
			player.body.render.sprite.yScale-=0.015
			player.body.render.opacity-=0.1;
		}
	}
	
}
function draw() {
	
}
