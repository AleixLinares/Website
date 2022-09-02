var frameTime = 1000/60;
var prevTime=0;
var currentTime;
var deltaTime=0;
var scoreLeft=0;
var scoreRight=0;
var endGame=false;	
var winGame=false;
let matrix=[]

let windowWidth = window.innerWidth/1.4;
let windowHeight = window.innerHeight/1.4;

var state = {
  pressedKeys: {
    esc: false,
    up: false,
    D: false,
    A: false,
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
  83: 'S',
  65: 'A',
  68: 'D'

}
function keydown(event) {
  var key = keyMap[event.keyCode] 
  state.pressedKeys[key] = true 
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

function gameInit() {

	document.removeEventListener("keyup",restart);
	endGame=false;	
	winGame=false;

	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	var width= canvas.width
	var height = canvas.height

	var w_size= 40
	var h_size= 20

	for(var i=0; i<w_size; ++i) {		
		for(var j=0; j<h_size; ++j) {
			context.beginPath()
			context.rect(i*35, j*35, 35,35)						
			context.fillStyle="red"						
			context.fill()
			context.lineWidth = 2;
			context.strokeStyle = "black";
			context.stroke();
			context.closePath();
		}		
	}

	matrix = Array.from(new Array(20), () => new Array(40).fill(0))

	snake = new Snake();
	var correctPos=false;
	var x=0
	var y=0
	while(!correctPos) {
		x= Math.floor(Math.random() * 40)
		y= Math.floor(Math.random() * 20)
		if(matrix[y][x]==0) correctPos=true
	}
	apple = new Apple(x,y)

	//document.addEventListener("keypress",changeScene);
	//document.addEventListener("keyup", buttonPress);

	window.addEventListener("keydown", keydown, false)
	window.addEventListener("keyup", keyup, false)
	

	window.requestAnimationFrame(loop)


}

function loop(currentTime) {
	//console.log(deltaTime)
	deltaTime = currentTime - prevTime
	prevTime= currentTime 	
	//if(deltaTime > frameTime) {		

	//console.log("FPS: " +1/deltaTime*1000)

	update()
	draw()
		
	if(winGame) {
		endGame=true
		winScreen()
	}
	
	if(!endGame) {
		window.requestAnimationFrame(loop);
	}
	else if(!winGame) loseScreen()
}

function update(){		
	
	snake.update();
	
}
function draw() {
	context.clearRect(0,0, canvas.width, canvas.height)
	snake.draw()	
	apple.draw()
}


function loseScreen() {
				context.clearRect(0,0, canvas.width, canvas.height)
				context.beginPath()	
				context.fillStyle = "black"
				context.textAlign="center"
				context.textBaseLine="middle"		
				context.font = "25px press_start_2pregular"	
				context.fillText("YOU LOSE!!", canvas.width/2, canvas.height/2-50)				
				context.fillText("Press enter to continue", canvas.width/2, canvas.height/2+50)	
				context.closePath()
				document.addEventListener("keyup", restart)
}

function winScreen() {
			context.clearRect(0,0, canvas.width, canvas.height)
				context.beginPath()	
				context.fillStyle = "black"
				context.textAlign="center"
				context.textBaseLine="middle"		
				context.font = "25px press_start_2pregular"	
				context.fillText("YOU WIN!! CONGRATULATIONS!!", canvas.width/2, canvas.height/2-50)				
				context.fillText("Press enter to continue", canvas.width/2, canvas.height/2+50)	
				context.closePath()
				document.addEventListener("keyup", restart)
}

function restart(event) {
  if (event.keyCode === 13) {
      gameInit()
  	}
	}


gameInit()