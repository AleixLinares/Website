var frameTime = 1000/60, frames=0;
var prevTime=0;
var currentTime;
var deltaTime=0;
let matrix=[], changes=[], matrixAux=[];
let minX, minY, maxX, maxY, difX, difY, sizeX, sizeY, drawGrid=false, moving=false, animate=false, pressed=false,width,height;
const delta = 6;
let startX;
let startY;

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

	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	width= canvas.width
	height = canvas.height

	window.addEventListener("keydown", keydown, false)
	window.addEventListener("keyup", keyup, false)

	maxX=120
	maxY=60
	minX=0
	minY=0
	difX=maxX-minX
	difY=maxY-minY
	sizeX=480
	sizeY=240
	size=width/(maxX-minX)

	matrix = Array.from(new Array(sizeX), () => new Array(sizeY).fill(0))
	matrixAux= JSON.parse(JSON.stringify(matrix))
	
	grid()

	canvas.addEventListener('wheel', function(event) {	
		
		if(!moving) {
		if (event.deltaY < 0) {					
			if(maxX-minX>=20 && maxY-minY>=10) {
				maxX-=2
				--maxY
				minX+=2
				++minY
				size=width/(maxX-minX)				
			}	
		}
		else if (event.deltaY > 0) {		
			if(maxX<sizeX-1 && minX>1 && maxY<sizeY-1 && minY>1) {
				maxX+=2
				++maxY
			  minX-=2
				--minY				
				
			}
			else if(minY==0) {
				if(minX==0) {
					maxX+=2
					maxY++
					
				}
				else if(maxX==sizeX-1) {
					minX-=2
					maxY++
					
				}
				else {
					maxX++
					minX--
					maxY++
					
				}
			}
			else if(minX==0) {
				if(minY==0) {
					maxX+=2
					maxY++
					
				}
				else if(maxY==sizeY-1) {
					minY--
					maxX+=2
					
				}
				else {
					maxX+=4
					minY--
					maxY++
					
				}
			}
			else if(maxX==sizeX-1) {
				if(minY==0) {
					minX-=2
					maxY++
					
				}
				else if(maxY==sizeY-1) {
					minY--
					minX-=2
					
				}
				else {
					minX-=4
					minY--
					maxY++
					
				}
			}
			else if(maxY==sizeY-1) {
				if(minX==0) {
					maxX+=2
					--minY
					
				}
				else if(maxX==sizeX-1) {
					--minY
					minX-=2
					
				}
				else {					
					--minY
					--minX
					++maxX
					
				}
			}
		}	
	}
	if(maxX>=sizeX) maxX=sizeX
	if(maxY>=sizeY) maxY=sizeY
	if(minX<0) minX=0
	if(minY<0) minY=0
	drawGrid=true
	difX=maxX-minX
	difY=maxY-minY
	size=width/(maxX-minX)

	event.preventDefault();
  event.stopPropagation();	
  return false
	});
	


	canvas.addEventListener('mousedown', function(event) {	

		if(!animate) {
			var x = event.offsetX;
	    var y = event.offsetY;
	    if(x<0) x=0
	    if(x>width) x=width
	    if(y<0) y=0
	    if(y>height) y=height    
	    var i = Math.floor(x / size)+minX
	    var j = Math.floor(y / size)+minY
	    if(matrix[i][j]==0) matrix[i][j]=1   	
	    else matrix[i][j]=0
	    changes.push({x:i,y:j})	  
    }			
	});

	window.requestAnimationFrame(loop)

}

function loop(currentTime) {
	//console.log(deltaTime)
	deltaTime = currentTime - prevTime
	prevTime= currentTime 	
	//if(deltaTime > frameTime) {		

	//console.log("FPS: " +1/deltaTime*1000)
	var canmove=false

	if(state.pressedKeys.D && maxX<sizeX-1) {
		maxX++
		minX++
		canmove=true
		moving=true
		drawGrid=true
	}
	if(state.pressedKeys.A && minX>0) {
		maxX--
		minX--
		canmove=true
		moving=true
		drawGrid=true
	}
	if(state.pressedKeys.W && minY>0) {
		maxY--
		minY--		
		canmove=true
		moving=true
		drawGrid=true
	}
	if(state.pressedKeys.S && maxY<sizeY-1) {
		maxY++
		minY++
		canmove=true
		moving=true
		drawGrid=true
	}

	if(!canmove) moving=false
	frames++
	if(state.pressedKeys.enter && !pressed) {
		pressed=true
		animate=!animate
	}
	else if(!state.pressedKeys.enter && pressed) {
		pressed=false
	}
		
	if(animate) update()
	draw()
		
	window.requestAnimationFrame(loop);
	
	
}

function update(){		

	matrixAux= JSON.parse(JSON.stringify(matrix))

	for(var i=0; i<matrixAux.length; ++i) {
		for(var j=0; j<matrixAux[0].length; ++j) {
			if(matrixAux[i][j]==1) {
				if(count(i,j).alive<2 || count(i,j).alive>3) { 
					matrix[i][j] = 0 
					changes.push({x:i,y:j}) 
				}						
			}
			else {
				if(count(i,j).alive==3) { 
					matrix[i][j] = 1
					changes.push({x:i,y:j}) 
				}	
			}
		}
 } 	
 frames=0

	
}
function draw() {	

	if(drawGrid) {
		difX=maxX-minX
		difY=maxY-minY
		grid()
		drawGrid=false
	}

	if(changes.length!=0) {
		for(var i=0; i<changes.length; ++i) {			
			context.clearRect((changes[i].x-minX)*size,(changes[i].y-minY)*size, size, size)
			context.beginPath()
			context.rect((changes[i].x-minX)*size, (changes[i].y-minY)*size, size,size)						
			if(matrix[(changes[i].x)][(changes[i].y)]==0) context.fillStyle="#EEEEEE"
			else context.fillStyle="#000000"					
			context.fill()
			context.lineWidth = 0.5;
			context.strokeStyle = "#000000";
			context.stroke();
			context.closePath();
		}			
	}
	changes=[]	
}


function count(i,j) {

	var result = {alive: 0, dead:0}
	
	if(j>0) {
		if(matrixAux[i][j-1]==1) result.alive++
		else result.dead++
	} 
	if(i>0) {
		if(matrixAux[i-1][j]==1) result.alive++
		else result.dead++
	}
	if(j+1<matrixAux[0].length) {
	if(matrixAux[i][j+1]==1) result.alive++
	else result.dead++
	}
	if(i+1<matrixAux.length) {
		if(matrixAux[i+1][j]==1) result.alive++
		else result.dead++
	}
	if(j>0 && i>0) {
		if(matrixAux[i-1][j-1]==1) result.alive++
		else result.dead++
	} 
	if(i>0 && j+1<matrixAux[0].length) {
		if(matrixAux[i-1][j+1]==1) result.alive++
		else result.dead++
	}
	if(j+1<matrixAux[0].length && i+1<matrixAux.length) {
	if(matrixAux[i+1][j+1]==1) result.alive++
	else result.dead++
	}
	if(i+1<matrixAux.length && j>0) {
		if(matrixAux[i+1][j-1]==1) result.alive++
		else result.dead++
	}
	
	return result

}

function grid() {
	context.clearRect(0,0,width,height)
	for(var i=0; i<difX; ++i) {
		context.beginPath()
		context.moveTo(i*size,0)
		context.lineTo(i*size, height);
		context.lineWidth = 1;
		context.strokeStyle = "#000000";
		context.stroke();
	}	
	for(var j=0; j<difY; ++j) {	
			context.beginPath()
			context.moveTo(0,j*size)
			context.lineTo(width, j*size);
			context.lineWidth = 1;
			context.strokeStyle = "#000000";
			context.stroke();
	}
	for(var i=0; i<matrix.length; ++i) {
		for(var j=0; j<matrix[0].length; ++j) {												
				if(matrix[i][j]==1) {
					context.beginPath()
					context.rect((i-minX)*size, (j-minY)*size, size,size)
					context.fillStyle="#000000"	
					context.fill()
					context.closePath();
				}					
			}
		}

}
