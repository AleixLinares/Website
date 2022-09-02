var frameTime = 1000/60;
var prevTime=0;
var currentTime;
var deltaTime=0;
var endGame=false;	
var endLoop=false;
var drawLine=false, touchingGround=false, hookDeployed=false, moving=false;
let renderArray = []
let runner, render, mouse, hook=null,X1=0,Y1=0,X2=0,Y2=0, projectile=null;

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
  state.pressedKeys[key] = true 
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

function gameInit(players, mode) {

	renderArray = []
	runner = Matter.Runner.create();

	engine = Matter.Engine.create();	

	mouse = Matter.Mouse.create(canvas)
	
	windowWidth = window.innerWidth/1.4;
	windowHeight = window.innerHeight/1.4;

	render = Matter.Render.create({
		element: document.body,
		canvas: canvas,
		engine: engine,
		options:{
			wireframes: false,
			background: "skyblue",			
			width: windowWidth,
      height: windowHeight,
      hasBounds: true
		}
	});

	render.bounds.max.x = render.bounds.min.x + render.options.width;
  render.bounds.max.y = render.bounds.min.y + render.options.height;

	gameContainer=document.getElementById("gameContainer")
	gameContainer.appendChild(canvas);

	context.clearRect(0,0, canvas.width, canvas.height)	

	endLoop=false;
	endGame=false;

	window.addEventListener("keydown", keydown, false)
	window.addEventListener("keyup", keyup, false)

	player = new Player(650,200, 20, "red")
	
	var scenarioOptions = {
		isStatic:true,
		label: "scenario",
		render: {
			fillStyle: "white",
			strokeStyle: "black",
			lineWidth: 0
		}};	
		var scenarioOptions2 = {
		isStatic:true,
		label: "scenario",
		render: {
			fillStyle: "orange",
			strokeStyle: "black",
			lineWidth: 0
		}};	
	let ground = Matter.Bodies.rectangle(700,780,500,280,scenarioOptions);
	renderArray.push(ground)
	let roof = Matter.Bodies.rectangle(3200,200,5000,300,scenarioOptions);
	renderArray.push(roof)
	let roof2 = Matter.Bodies.rectangle(1*350,200,500,300,scenarioOptions);
	renderArray.push(roof2)
	let ground2 = Matter.Bodies.rectangle(700+600,780,500,280,scenarioOptions);
	renderArray.push(ground2)
	let ground3 = Matter.Bodies.rectangle(700+600+1000,780,500,280,scenarioOptions);
	renderArray.push(ground3)
	let support = Matter.Bodies.rectangle(700+600+550,350,100,50,scenarioOptions);
	renderArray.push(support)
	let roof3 = Matter.Bodies.rectangle(3500,400,500,300,scenarioOptions);
	renderArray.push(roof3)
	let ground4 = Matter.Bodies.rectangle(4000,1000,500,280,scenarioOptions);
	renderArray.push(ground4)
	let roof4 = Matter.Bodies.rectangle(4900,500,300,1000,scenarioOptions);
	renderArray.push(roof4)
	let roof5 = Matter.Bodies.rectangle(4900,1750,300,1000,scenarioOptions2);
	renderArray.push(roof5)
	let ground5 = Matter.Bodies.rectangle(5700,1500,700,280,scenarioOptions2);
	renderArray.push(ground5)

	canvas.addEventListener('mousedown', function() { 

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
				group: -1
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
	        x: (player.body.position.x - windowWidth / 2),
	        y: (player.body.position.y - windowHeight / 2)
	    });

    });

	Matter.Events.on(engine, 'beforeUpdate', function() {

		if(projectile) {
			var dist = Math.hypot(projectile.position.x-player.body.position.x, projectile.position.y-player.body.position.y)
			if(dist>=350) {
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

	Matter.Events.on(engine, "collisionStart", event => {
		var pairs = event.pairs;
		let scenarioAux, projectileAux;
    
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];        
      if(pair.bodyA.label=="noGravity" || pair.bodyB.label=="noGravity") {
      	console.log(pair)		
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
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];   
			if(pair.bodyA.label=="player" && pair.bodyB.label=="scenario") touchingGround=true 
		}
	})
	Matter.Events.on(engine, "collisionEnd", event => {
		var pairs = event.pairs;
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];   
			if(pair.bodyA.label=="player" && pair.bodyB.label=="scenario") touchingGround=false 
		}		
	})	

	Matter.Events.on(render, "afterRender", event => {	
		if(drawLine && projectile) {			
			render.context.beginPath();
			render.context.moveTo(player.body.position.x-(player.body.position.x-windowWidth / 2), player.body.position.y- (player.body.position.y-windowHeight / 2));
			render.context.lineTo(projectile.position.x-(player.body.position.x-windowWidth / 2), projectile.position.y- (player.body.position.y-windowHeight / 2));
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
	
	
	prevTime = currentTime

	update(deltaTime)

	//console.log(deltaTime + " > "  +frameTime)

	//console.log("FPS: " +1/deltaTime*1000)


	if(!state.pressedKeys.esc) window.requestAnimationFrame(loop)	
}

function update(deltaTime){

	if(!hookDeployed && touchingGround && state.pressedKeys.A && (player.body.velocity.y<0.1 || player.body.velocity.y>-0.1)) {		
		Matter.Body.setVelocity(player.body,{x:-6,y:0})
		moving=true;
	}	
	if(!hookDeployed && touchingGround && state.pressedKeys.D && (player.body.velocity.y<0.1 || player.body.velocity.y>-0.1)) {
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

	if(!hookDeployed && touchingGround && state.pressedKeys.space && (player.body.velocity.y<0.1 || player.body.velocity.y>-0.1)) {		
		Matter.Body.applyForce(player.body,player.body.position,{x:0,y:-0.04})
	}
	
}
function draw() {
	
}
