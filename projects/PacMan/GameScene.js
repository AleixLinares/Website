var frameTime = 1000/60, frames=0, escPressed=false, pinkyDest,inkyDest, inkyTest, score=0, dots=0, timeControl=0,frightenedTimeControl=0, gameMode="scatter", oldgameMode="scatter"
var prevTime=0, once=false, lives=3, killed=false,restarted=false, inkyTime=0, clydeTime=0;
var currentTime;
var deltaTime=0;
let matrix=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,6,2,2,2,2,6,2,2,2,2,2,6,1,1,6,2,2,2,2,2,6,2,2,2,2,6,1],
[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
[1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
[1,6,2,2,2,2,6,2,2,6,2,2,6,2,2,6,2,2,6,2,2,6,2,2,2,2,6,1],
[1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
[1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
[1,6,2,2,2,2,6,1,1,6,2,2,6,1,1,6,2,2,6,1,1,6,2,2,2,2,6,1],
[1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,1,8,0,0,8,8,8,8,0,0,8,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1],
[0,0,0,0,0,0,6,0,0,8,1,4,4,8,4,4,4,1,8,0,0,6,0,0,0,0,0,0],
[1,1,1,1,1,1,2,1,1,0,1,4,4,4,8,4,4,1,0,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,1,8,0,0,0,0,0,0,0,0,8,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
[1,6,2,2,2,2,6,2,2,6,2,2,6,1,1,6,2,2,6,2,2,6,2,2,2,2,6,1],
[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
[1,7,2,6,1,1,6,2,2,6,2,2,6,0,0,6,2,2,6,2,2,6,1,1,6,2,7,1],
[1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
[1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
[1,6,2,6,2,2,6,1,1,6,2,2,6,1,1,6,2,2,6,1,1,6,2,2,6,2,6,1],
[1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
[1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
[1,6,2,6,2,2,2,2,2,2,2,2,6,2,2,6,2,2,2,2,2,2,2,2,2,2,6,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
//6->intersection with dot, 7-> intersection with big dot, 8->intersection without dot
let sizeX=matrix[0].length, sizeY=matrix.length,width,height,sizeW,sizeH, size;
const delta = 6;
let startX;
let startY;
let img;



let windowWidth = window.innerWidth/1.4;
let windowHeight = window.innerHeight/1.4;

var state = {
  pressedKeys: {
  	enter: false,
    esc: false,
    up: false,
    D: false,
    A: false,
    W: false,
    S: false,
    E: false,
    R: false
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
  69: 'E',
  82: 'R'
}
function keydown(event) {
  if(!event.repeat) {
  	var key = keyMap[event.keyCode] 
 	 	state.pressedKeys[key] = true 
  }  
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

function gameInit() {
	
	img= document.getElementById("layout");	
	matrix=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,6,2,2,2,2,6,2,2,2,2,2,6,1,1,6,2,2,2,2,2,6,2,2,2,2,6,1],
	[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
	[1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
	[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
	[1,6,2,2,2,2,6,2,2,6,2,2,6,2,2,6,2,2,6,2,2,6,2,2,2,2,6,1],
	[1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
	[1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
	[1,6,2,2,2,2,6,1,1,6,2,2,6,1,1,6,2,2,6,1,1,6,2,2,2,2,6,1],
	[1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,1,1,8,0,0,8,8,8,8,0,0,8,1,1,2,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1],
	[0,0,0,0,0,0,6,0,0,8,1,4,4,8,4,4,4,1,8,0,0,6,0,0,0,0,0,0],
	[1,1,1,1,1,1,2,1,1,0,1,4,4,4,8,4,4,1,0,1,1,2,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,1,1,8,0,0,0,0,0,0,0,0,8,1,1,2,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
	[1,6,2,2,2,2,6,2,2,6,2,2,6,1,1,6,2,2,6,2,2,6,2,2,2,2,6,1],
	[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
	[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
	[1,7,2,6,1,1,6,2,2,6,2,2,6,0,0,6,2,2,6,2,2,6,1,1,6,2,7,1],
	[1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
	[1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
	[1,6,2,6,2,2,6,1,1,6,2,2,6,1,1,6,2,2,6,1,1,6,2,2,6,2,6,1],
	[1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
	[1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
	[1,6,2,6,2,2,2,2,2,2,2,2,6,2,2,6,2,2,2,2,2,2,2,2,2,2,6,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
	restarted=false
	lives=3
	width= canvas.width
	height = canvas.height
	sizeW=height/(sizeY)  
    sizeH=width/(sizeX) 
    score=0
    dots=0
 
	window.addEventListener("keydown", keydown, false)
	window.addEventListener("keyup", keyup, false)

	startConfig()

}

function loop(currentTime) {
	console.log(gameMode)
	//console.log(deltaTime)
	deltaTime = currentTime - prevTime
	prevTime= currentTime 	

	if(restarted) {
		inkyTime+=deltaTime
		if(dots>=30 && inkyTime>5000) {						
			if(inky.mode=="start") inky.changeMode(gameMode)
		}
		clydeTime+=deltaTime
		if(dots>=81 && clydeTime>10000) {
			if(clyde.mode=="start") clyde.changeMode(gameMode)
		}
		if(dots>=30 && inkyTime>5000 && dots>=81 && clydeTime>10000) {	
			inkyTime=0
			clydeTime=0		
			restarted=false
		}
	}
	
	if(dots==30) inky.changeMode(gameMode)
	if(dots==81) clyde.changeMode(gameMode)
	
	

	if(gameMode!="frightened") timeControl+=deltaTime
	else if(once) {
		once=false
		if(inky.mode!="ded" && inky.mode!="start" && inky.mode!="frightened") {
			inky.changeMode("frightened")
			inky.swapDirection()
		}
		if(clyde.mode!="ded" && clyde.mode!="start" && clyde.mode!="frightened") {
			clyde.changeMode("frightened")
			clyde.swapDirection()
		}  
		if(blinky.mode!="ded"  && blinky.mode!="start" && blinky.mode!="frightened"){
			blinky.changeMode("frightened")
			blinky.swapDirection()
		} 
		if(pinky.mode!="ded"  && pinky.mode!="start" && pinky.mode!="frightened") {
			pinky.changeMode("frightened")
			pinky.swapDirection()
		}
	}
	if(gameMode=="frightened") frightenedTimeControl+=deltaTime
	if(frightenedTimeControl>10000 && gameMode=="frightened") {
		frightenedTimeControl=0
		if(inky.mode!="ded" && inky.mode!="start") inky.changeMode(oldgameMode)
		if(clyde.mode!="ded" && clyde.mode!="start")  clyde.changeMode(oldgameMode)
		if(blinky.mode!="ded" && blinky.mode!="start")blinky.changeMode(oldgameMode)
		if(pinky.mode!="ded" && pinky.mode!="start")pinky.changeMode(oldgameMode)
		gameMode=oldgameMode
	}		

	if(timeControl>20000 && gameMode=="chase") {
		timeControl-=20000
		if(inky.mode!="ded" && inky.mode!="start") inky.changeMode("scatter")
		if(clyde.mode!="ded" && clyde.mode!="start")  clyde.changeMode("scatter")
		if(blinky.mode!="ded" && blinky.mode!="start")blinky.changeMode("scatter")
		if(pinky.mode!="ded" && pinky.mode!="start")pinky.changeMode("scatter")
		gameMode="scatter"
	}
	else if(timeControl>5000 && gameMode=="scatter") {
		timeControl-=5000
		if(inky.mode!="ded" && inky.mode!="start") inky.changeMode("chase")
		if(clyde.mode!="ded" && clyde.mode!="start")  clyde.changeMode("chase")
		if(blinky.mode!="ded" && blinky.mode!="start")blinky.changeMode("chase")
		if(pinky.mode!="ded" && pinky.mode!="start")pinky.changeMode("chase")
		gameMode="chase"
	}
	//if(deltaTime > frameTime) {	

	//console.log("FPS: " +1/deltaTime*1000)
	update(deltaTime)
	if(killed) lives--
	draw()	
	

	if(lives==0) {
		killed=false
		loseScreen()		
	}
	else if (lives>0 && killed) {
		restarted=true
		killed=false
		startConfig()
	}
	else if(score==440) winScreen() 
	else window.requestAnimationFrame(loop);

	
	
}

function update(deltaTime){		



	pacman.update(deltaTime)
	var pacmanPos={i:pacman.i, j: pacman.j}
	blinky.update(pacmanPos,pacmanPos)
	var blinkyPos = {i: blinky.i, j: blinky.j}
	inkyDest=getInkyDest(pacmanPos, blinkyPos)
	inky.update(inkyDest,pacmanPos)
	pinkyDest=getPinkyDest(pacmanPos)
	pinky.update(pinkyDest,pacmanPos)
	clyde.update(pacmanPos,pacmanPos)	

}
function draw() {	

	context.clearRect(0,0,width,height)	
	context.globalAlpha = 1;
	context.drawImage(img, 0, 0, width, height);
	for(var i=0; i<sizeY; ++i) {
		for(var j=0; j<sizeX; ++j) {				

				if(escPressed && matrix[i][j]==1) {
					context.beginPath()
					context.rect(j*sizeH, i*sizeW, sizeH,sizeW)
					context.fillStyle="#000000"	
					context.fill()
					context.closePath();
				}
				if(matrix[i][j]==2 || matrix[i][j]==6) {					
					context.beginPath()
					context.arc(j*sizeH+sizeH/2, i*sizeW+sizeW/2, 3,0,2 * Math.PI)
					context.fillStyle="#FFB897"	
					context.fill()
					context.closePath();
				}	
				if(matrix[i][j]==3 || matrix[i][j]==7) {
					context.beginPath()
					context.arc( j*sizeH+sizeH/2,i*sizeW+sizeW/2, 10,0,2 * Math.PI)
					context.fillStyle="#FFB897"	
					context.fill()
					context.closePath();
				}				
				/*context.font = "12px Arial";
				context.fillStyle = "red";
				context.fillText( i +"," +j , j*sizeH+sizeH/2, i*sizeW+sizeW/2);	
				context.textAlign = "center";*/
			}		
		}

		pacman.draw()		
		blinky.draw()
		inky.draw()
		pinky.draw()
		clyde.draw()

		context2.clearRect(0,0,784,50)	
		context2.beginPath()	
		context2.fillStyle = "white"
		context2.textAlign="center"
		context2.textBaseLine="middle"		
		context2.font = "20px press_start_2pregular"	
		context2.fillText(score, 50, 35)				
		context2.closePath()
		if(lives>2){
			context2.beginPath()
			context2.arc( 784-50-25-25-30,25, 20,0,2 * Math.PI)
			context2.fillStyle="#FFFF00"	
			context2.fill()
			context2.closePath();
			context2.beginPath()
			context2.moveTo(784-50-25-25-30,25);
			context2.lineTo(784-50-25-25-30-20,25-15);
			context2.lineTo(784-50-25-25-30-20,25+15);			
			context2.fillStyle="#000000"	
			context2.fill()
			context2.closePath();
		}
		if(lives>1){
			context2.beginPath()
			context2.arc( 784-50-25-15,25, 20,0,2 * Math.PI)
			context2.fillStyle="#FFFF00"	
			context2.fill()
			context2.closePath();
			context2.beginPath()
			context2.moveTo(784-50-25-15,25);
			context2.lineTo(784-50-25-15-20,25-15);
			context2.lineTo(784-50-25-15-20,25+15);			
			context2.fillStyle="#000000"	
			context2.fill()
			context2.closePath();
		}
		if(lives>0){
			context2.beginPath()
			context2.arc( 784-50,25, 20,0,2 * Math.PI)
			context2.fillStyle="#FFFF00"	
			context2.fill()
			context2.closePath();
			context2.beginPath()
			context2.moveTo(784-50,25);
			context2.lineTo(784-50-20,25-15);
			context2.lineTo(784-50-20,25+15);			
			context2.fillStyle="#000000"	
			context2.fill()
			context2.closePath();
		}
		/*context.beginPath()
		context.rect(inkyDest.j*sizeH, inkyDest.i*sizeW, sizeH/2,sizeW)
		context.fillStyle="cyan"	
		context.fill()
		context.closePath();
		context.beginPath()
		context.rect(inkyTest.j*sizeH+sizeH/2, inkyTest.i*sizeW, sizeH/2,sizeW)
		context.fillStyle="green"	
		context.fill()
		context.closePath();*/


	}

function getPinkyDest(pacmanPos) {

	if(pacman.looking=="up") {
		var i=pacmanPos.i-4;		
		while(i<pacmanPos.i) {			
			if(i>=0 && (matrix[i][pacmanPos.j]!=1 && matrix[i][pacmanPos.j]!=4)) return {i: i, j:pacmanPos.j} 
			++i;
		}
	}
	if(pacman.looking=="down") {
		var i=pacmanPos.i+4;		
		while(i>pacmanPos.i) {			
			if(i<sizeY && (matrix[i][pacmanPos.j]!=1 && matrix[i][pacmanPos.j]!=4)) return {i: i, j:pacmanPos.j} 
			--i;
		}
	}
	if(pacman.looking=="right") {
		var j=pacmanPos.j+4;		
		while(j>pacmanPos.j) {			
			if(j<sizeX && (matrix[pacmanPos.i][j]!=1 && matrix[pacmanPos.i][j]!=4)) return {i: pacmanPos.i, j:j} 
			--j;
		}
	}
	if(pacman.looking=="left") {
		var j=pacmanPos.j-4;		
		while(j<pacmanPos.j) {			
			if(j>=0 && (matrix[pacmanPos.i][j]!=1 && matrix[pacmanPos.i][j]!=4)) return {i: pacmanPos.i, j:j} 
			++j;
		}
	}
	return pacmanPos
}

function getInkyDest(pacmanPos, blinkyPos) {

	var tempPos={i: pacmanPos.i, j:pacmanPos.j}
	if(pacman.looking=="up") {
		var i=pacmanPos.i-2;		
		while(i<pacmanPos.i) {			
			if(i>=0 && (matrix[i][pacmanPos.j]!=1 && matrix[i][pacmanPos.j]!=4)) {
				tempPos = {i: i, j:pacmanPos.j} 
				break
			}
			++i;
		}
	}
	if(pacman.looking=="down") {
		var i=pacmanPos.i+2;		
		while(i>pacmanPos.i) {			
			if(i<sizeY && (matrix[i][pacmanPos.j]!=1 && matrix[i][pacmanPos.j]!=4)) {
				tempPos = {i: i, j:pacmanPos.j} 
				break
			}
			--i;
		}
	}
	if(pacman.looking=="right") {
		var j=pacmanPos.j+2;	

		while(j>pacmanPos.j) {
			if(j<sizeX && (matrix[pacmanPos.i][j]!=1 && matrix[pacmanPos.i][j]!=4)) {
				tempPos = {i: pacmanPos.i, j:j} 
				break
			}
			--j;
		}
	}
	if(pacman.looking=="left") {
		var j=pacmanPos.j-2;		
		while(j<pacmanPos.j) {			
			if(j>=0 && (matrix[pacmanPos.i][j]!=1 && matrix[pacmanPos.i][j]!=4)) { 
				tempPos = {i: pacmanPos.i, j:j} 
				break
			}
			++j;
		}
	}

	var difI=tempPos.i-blinkyPos.i
	var difJ=tempPos.j-blinkyPos.j
	inkyTest = {i:0, j:0}
	inkyTest.i=tempPos.i
	inkyTest.j=tempPos.j

	tempPos.i+=difI
	tempPos.j+=difJ

	
	while(tempPos.i<2) tempPos.i++
	while(tempPos.i>sizeY-2) tempPos.i--
	while(tempPos.j<2) tempPos.j++
	while(tempPos.j>sizeX-2) tempPos.j--

	var mov=1
	
	while(matrix[tempPos.i][tempPos.j]==1 || matrix[tempPos.i][tempPos.j]==4) {
		if(tempPos.i-mov>1 && matrix[tempPos.i-mov][tempPos.j]!=1 && matrix[tempPos.i-mov][tempPos.j]!=4) tempPos.i-=mov
		else if(tempPos.j-mov>1 && matrix[tempPos.i][tempPos.j-mov]!=1 && matrix[tempPos.i][tempPos.j-mov]!=4) tempPos.j-=mov
		else if(tempPos.i+mov<sizeY-1 && matrix[tempPos.i+mov][tempPos.j]!=1 && matrix[tempPos.i+mov][tempPos.j]!=4) tempPos.i+=mov
		else if(tempPos.j+mov<sizeX-1 && matrix[tempPos.i][tempPos.j+mov]!=1 && matrix[tempPos.i][tempPos.j+mov]!=4) tempPos.j+=mov

		mov++

	}	

	inkyDest = tempPos
	return tempPos
}

function loseScreen() {
				context.clearRect(0,0, canvas.width, canvas.height)
				context.drawImage(img, 0, 0, width, height);
				for(var i=0; i<sizeY; ++i) {
					for(var j=0; j<sizeX; ++j) {	
							
							if(matrix[i][j]==2 || matrix[i][j]==6) {					
								context.beginPath()
								context.arc(j*sizeH+sizeH/2, i*sizeW+sizeW/2, 3,0,2 * Math.PI)
								context.fillStyle="#FFB897"	
								context.fill()
								context.closePath();
							}	
							if(matrix[i][j]==3 || matrix[i][j]==7) {
								context.beginPath()
								context.arc( j*sizeH+sizeH/2,i*sizeW+sizeW/2, 10,0,2 * Math.PI)
								context.fillStyle="#FFB897"	
								context.fill()
								context.closePath();
							}									
						}		
					}
				context.beginPath()	
				context.fillStyle = "yellow"
				context.textAlign="center"
				context.textBaseLine="middle"		
				context.font = "25px press_start_2pregular"	
				context.fillText("YOU LOSE!!", canvas.width/2, canvas.height/2+75)				
				context.fillText("Press enter to play again", canvas.width/2, canvas.height/2+150)	
				context.closePath()
				document.addEventListener("keyup", restart)
}

function winScreen() {
			context.clearRect(0,0, canvas.width, canvas.height)
			context.drawImage(img, 0, 0, width, height);
			context.beginPath()	
			context.fillStyle = "yellow"
			context.textAlign="center"
			context.textBaseLine="middle"		
			context.font = "25px press_start_2pregular"	
			context.fillText("YOU WIN!! CONGRATULATIONS!!", canvas.width/2, canvas.height/2-12)				
			context.fillText("Press enter to play again", canvas.width/2, canvas.height/2+150)	
			context.closePath()
			document.addEventListener("keyup", restart)
}

function restart(event) {	
  if (event.keyCode === 13) {
      menuInit()
  }
}

function startConfig() {
	pacman = new Pacman()
    blinky = new Blinky()
    inky = new Inky()
    pinky = new Pinky()
    clyde = new Clyde()
    killed=false

    blinky.changeMode("scatter")
	pinky.changeMode("scatter")
	setTimeout(draw,100)

	setTimeout(startLoop,3000)
}

function startLoop() {
	window.requestAnimationFrame(loop)
}