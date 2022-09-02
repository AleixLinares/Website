var frameTime = 1000/60;
var prevTime=0;
var currentTime;
var deltaTime=0;
var scoreLeft=0;
var scoreRight=0;
var audioPaddle = new Audio('./projects/Pong/bounce.wav');
var audioWall = new Audio('./projects/Pong/bounce.wav');
audioPaddle.volume = 0.1
audioWall.volume=0.1
var endGame=false;	
var endLoop=false;
let renderArray = []
let runner;
let render;

let windowWidth = window.innerWidth/1.4;
let windowHeight = window.innerHeight/1.4;

var state = {
  pressedKeys: {
    esc: false,
    up: false,
    down: false,
    enter: false,
    W: false,
    S: false
  }
}

var keyMap = {
  27: 'esc',
  38: 'up',
  40: 'down',
  13: 'enter',
  87: 'W',
  83: 'S'

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

	engine = Matter.Engine.create({
		gravity: {
			y: 0
		},
		velocityIterations: 50
	});

	Matter.Resolver._restingThresh = 0.001;
	
	windowWidth = window.innerWidth/1.4;
	windowHeight = window.innerHeight/1.4;

	render = Matter.Render.create({
		element: document.body,
		canvas: canvas,
		engine: engine,
		options:{
			wireframes: false,			
			width: windowWidth,
      height: windowHeight
		}
	});

	gameContainer=document.getElementById("gameContainer")
	gameContainer.appendChild(canvas);

	context.clearRect(0,0, canvas.width, canvas.height)	

	endLoop=false;
	endGame=false
	scoreLeft=0;
	scoreRight=0;

	window.addEventListener("keydown", keydown, false)
	window.addEventListener("keyup", keyup, false)

	paddleLeft = new Paddle(150, canvas.height/2, {x:20, y:100}, "white", {x:0,y:7}, players, players)
	paddleRight = new Paddle(canvas.width-150, canvas.height/2, {x:20, y:100}, "white", {x:0,y:7}, true, false)
	ball = new Ball(canvas.width/2, canvas.height/2, 15, "white", {x:4, y:4})	
	counterLeft = new TextDisplay(canvas.width/2+125, 50, "white", "left",50,15)
	counterRight = new TextDisplay(canvas.width/2-200, 50, "white", "right",50,15)

	var boundProperties =  {
		isStatic:true			
	}

	let ground = Matter.Bodies.rectangle(windowWidth/2,windowHeight+50,windowWidth,100,{
		isStatic:true,
		label: "ground"				
	});
	renderArray.push(ground)
	let roof = Matter.Bodies.rectangle(windowWidth/2,0-50,windowWidth,100,{
		isStatic:true,
		label: "roof"			
	});
	renderArray.push(roof)
	var leftWall = Matter.Bodies.rectangle(0-50,windowHeight/2,100,windowHeight,{
		isStatic:true,
		label: "leftWall"			
	});
	renderArray.push(leftWall)
	var rightWall = Matter.Bodies.rectangle(windowWidth+50,windowHeight/2,100,windowHeight,{
		isStatic:true,
		label: "rightWall"					
	});
	renderArray.push(rightWall)	

	let mouse = Matter.Mouse.create(render.canvas);
	let mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			render: {visible:true}
		}
	})
	render.mouse = mouse
	renderArray.push(mouseConstraint)

	Matter.Composite.add(engine.world,renderArray);
	

	Matter.Runner.start(runner, engine);
	Matter.Render.run(render);

	Matter.Events.on(engine, "beforeUpdate", function(e) {
		if(state.pressedKeys.esc) {
			Matter.Runner.stop(runner);
			Matter.Render.stop(render);
		} 
	})

	Matter.Events.on(engine, "collisionEnd", function(event) {		
			for(var pair of event.pairs) {
				if(pair.bodyA.label=="Circle Body" || pair.bodyB.label=="Circle Body") {
					var ballBody;
					if(pair.bodyA.label=="Circle Body") ballBody=pair.bodyA;
					if(pair.bodyB.label=="Circle Body") ballBody=pair.bodyB;
					var baseSpeedX = 4;
					var baseSpeedY = 4;
					let speedMultiplierX = baseSpeedX / Math.abs(ballBody.velocity.x)
					let speedMultiplierY = baseSpeedY / Math.abs(ballBody.velocity.y)					
					Matter.Body.setVelocity(ballBody, {
	        	x: ballBody.velocity.x * speedMultiplierX,	        
	        	y: ballBody.velocity.y * speedMultiplierY   
	      	});					
				}

				if((pair.bodyA.label=="Circle Body" && pair.bodyB.label=="leftWall") || (pair.bodyB.label=="Circle Body" && pair.bodyA.label=="leftWall")) {
					scoreLeft+=1
					audioWall.play()
					ball.start()
				}
				else if((pair.bodyA.label=="Circle Body" && pair.bodyB.label=="rightWall") || (pair.bodyB.label=="Circle Body" && pair.bodyA.label=="rightWall")) {
					scoreRight+=1
					audioWall.play()
					ball.start()
				}
				else if((pair.bodyA.label=="Circle Body" && pair.bodyB.label=="roof") || (pair.bodyB.label=="Circle Body" && pair.bodyA.label=="roof")) {
					audioWall.play()					
				}
				else if((pair.bodyA.label=="Circle Body" && pair.bodyB.label=="ground") || (pair.bodyB.label=="Circle Body" && pair.bodyA.label=="ground")) {
					audioWall.play()					
				}
			}
		});	

	window.requestAnimationFrame(loop)


}

function loop(currentTime) {
	//console.log(deltaTime)
	deltaTime = currentTime - prevTime

	//if(deltaTime > frameTime) {		
	
	if(!endGame) {
		update(deltaTime);
		Matter.Engine.update(engine, deltaTime)
		draw();	
	}
	
	if(!endGame && !mode) {

		if(scoreLeft>=10) {			
			endGame=true;	
			Matter.Runner.stop(runner);
			Matter.Render.stop(render);
			endGameScreen("right")	
		}
		if(scoreRight>=10) {
			endGame=true;	
			Matter.Runner.stop(runner);
			Matter.Render.stop(render);
			endGameScreen("left")	
		}
	}	

	if(endGame && state.pressedKeys.enter) {
		context.clearRect(0,0, canvas.width, canvas.height)
		endGame=false
		scoreRight=0
		scoreLeft=0
		deltaTime=0;	
		menuInit()		
		endLoop=true
	}
	prevTime = currentTime

	//console.log(deltaTime + " > "  +frameTime)

	//console.log("FPS: " +1/deltaTime*1000)

	if(state.pressedKeys.esc) {
			endGame=true;	
			Matter.Runner.stop(runner);
			Matter.Render.stop(render);
			context.clearRect(0,0, canvas.width, canvas.height)
			endGame=false
			scoreRight=0
			scoreLeft=0
			deltaTime=0;	
			menuInit()		
			endLoop=true
	}

	if(!endLoop) window.requestAnimationFrame(loop)	
}

function update(deltaTime){
	
	paddleLeft.update(deltaTime)			
	paddleRight.update(deltaTime)	
	ball.update(deltaTime)	
	counterLeft.update(deltaTime)
	counterRight.update(deltaTime)
	
}
function draw() {
	counterLeft.draw()
	counterRight.draw()
}

function endGameScreen(player) {	
	context.beginPath()	
	context.fillStyle = "#ffffff"
	context.textAlign="center"
	context.textBaseLine="middle"		
	context.font = "25px press_start_2pregular"	
	if(player=="right") context.fillText("Player 1 wins", canvas.width/2, canvas.height/2-50)
	if(player=="left") context.fillText("Player 2 wins", canvas.width/2, canvas.height/2-50)	
	context.fillText("Press enter to continue", canvas.width/2, canvas.height/2+50)	
	context.closePath()
}
