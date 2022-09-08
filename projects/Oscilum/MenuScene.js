var frameTime = 1000/60
var prevTime=0
var currentTime
var deltaTime=0
var context, cicle=0, decorationCicle1=0, timeAnimation=0, changedScene=false;
var audio = new Audio('./projects/Pong/navigation.wav');

function menuInit() {	

	cicle=0
	changedScene=false	

	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.width= window.innerWidth/1.4;
	canvas.height = window.innerHeight/1.4;	

	//gameInit()

	document.addEventListener("keypress",changeScene);
	document.addEventListener("keyup", buttonPress);		
	setTimeout(startMenu,100);	
	setTimeout(paintArrow,100);
	setTimeout(window.requestAnimationFrame(menuLoop), 100)
	
}


function startMenu() {
	context.clearRect(0,0, canvas.width, canvas.height)
	context.beginPath()
	context.font = "150px press_start_2pregular"
	context.fillStyle = "#ffffff"
	context.strokeStyle = "#000000"
	context.lineWidth=4
	context.textAlign="center"
	context.textBaseLine="middle"			
	context.strokeText("Oscilum", canvas.width/2, 250)	
	context.fillText("Oscilum", canvas.width/2, 250)
	context.font = "30px press_start_2pregular"
	context.lineWidth=1
	context.fillText("Start", canvas.width/2, 400)
	context.fillText("Credits (Coming soon)", canvas.width/2, 500)
	context.fillText("Level Editor (Coming soon)", canvas.width/2, 600)
	context.strokeText("Start", canvas.width/2, 400)
	context.strokeText("Credits (Coming soon)", canvas.width/2, 500)
	context.strokeText("Level Editor (Coming soon)", canvas.width/2, 600)
	context.closePath()
}


function paintArrow() {
	if(cicle==0) {		
  		context.beginPath();
		size=20
		center=382
		context.moveTo(canvas.width/2-80, center);
		context.lineTo(canvas.width/2-110, center-size);
		context.lineTo(canvas.width/2-110, center+size);
		context.fillStyle="white"
		context.fill();
		context.closePath()
	}	
	else if(cicle==1) {
		context.beginPath();
		size=20
		center=482
		context.moveTo(canvas.width/2-320, center);
		context.lineTo(canvas.width/2-350, center-size);
		context.lineTo(canvas.width/2-350, center+size);
		context.fillStyle="white"
		context.fill();
		context.closePath()
	}
	else {
		context.beginPath();
		size=20
		center=582
		context.moveTo(canvas.width/2-390, center);
		context.lineTo(canvas.width/2-420, center-size);
		context.lineTo(canvas.width/2-420, center+size);
		context.fillStyle="white"
		context.fill();
		context.closePath()
	}
}

function buttonPress(event) {
	if(event.keyCode==38 || event.keyCode==87) {
		audio.play()
		if(cicle==0) cicle=2
		else --cicle
		paintArrow() 
		startMenu()		
	}
	if(event.keyCode==40 || event.keyCode==83) { 
		audio.play() 
		if(cicle==2) cicle=0
		else ++cicle
		paintArrow() 
		startMenu()		 
	}		
	
}

function decoration(deltaTime) {
	timeAnimation+=deltaTime
	if(timeAnimation>75) {
		timeAnimation-=75			
		decorationCicle1++;
		if(decorationCicle1>11) decorationCicle1=0;
	}
	var y = 230
	if(decorationCicle1==0 || decorationCicle1==6) { 
		context.beginPath();
		context.arc(1120, 320, 20, 0, 2 * Math.PI);
		context.fillStyle="white"
		context.fill();
		context.beginPath();
		context.moveTo(1120, y);
		context.lineTo(1120, 320);
		context.strokeStyle="white"
		context.stroke();
	}
	if(decorationCicle1==11 || decorationCicle1==7) { 
		context.beginPath();
		context.arc(1100, 310, 20, 0, 2 * Math.PI);
		context.fillStyle="white"
		context.fill();
		context.beginPath();
		context.moveTo(1120, y);
		context.lineTo(1100, 310);
		context.strokeStyle="white"
		context.stroke();
	}
	if(decorationCicle1==10 || decorationCicle1==8) { 
		context.beginPath();
		context.arc(1090, 300, 20, 0, 2 * Math.PI);
		context.fillStyle="white"
		context.fill();
		context.beginPath();
		context.moveTo(1120, y);
		context.lineTo(1090, 300);
		context.strokeStyle="white"
		context.stroke();
	}
	if(decorationCicle1==9) { 
		context.beginPath();
		context.arc(1080, 280, 20, 0, 2 * Math.PI);
		context.fillStyle="white"
		context.fill();
		context.beginPath();
		context.moveTo(1120, y);
		context.lineTo(1080, 280);
		context.strokeStyle="white"
		context.stroke();
	}
	if(decorationCicle1==1 || decorationCicle1==5) { 
		context.beginPath();
		context.arc(1140, 310, 20, 0, 2 * Math.PI);
		context.fillStyle="white"
		context.fill();
		context.beginPath();
		context.moveTo(1120, y);
		context.lineTo(1140, 310);
		context.strokeStyle="white"
		context.stroke();
	}
	if(decorationCicle1==2 || decorationCicle1==4) { 
		context.beginPath();
		context.arc(1150, 300, 20, 0, 2 * Math.PI);
		context.fillStyle="white"
		context.fill();
		context.beginPath();
		context.moveTo(1120, y);
		context.lineTo(1150, 300);
		context.strokeStyle="white"
		context.stroke();
	}
	if(decorationCicle1==3) { 
		context.beginPath();
		context.arc(1160, 280, 20, 0, 2 * Math.PI);
		context.fillStyle="white"
		context.fill();
		context.beginPath();
		context.moveTo(1120, y);
		context.lineTo(1160, 280);
		context.strokeStyle="white"
		context.stroke();
	}
}

function menuLoop(currentTime) {
	deltaTime = currentTime - prevTime

	//if(deltaTime > frameTime) {		
	//console.log(render.bounds)

	prevTime = currentTime
	startMenu()
	paintArrow()	
	decoration(deltaTime)

	//console.log(deltaTime + " > "  +frameTime)

	//console.log("FPS: " +1/deltaTime*1000)


	if(!changedScene) window.requestAnimationFrame(menuLoop)	
}

function changeScene(event) {
	if (event.keyCode == 13) {
	  	document.removeEventListener("keypress", changeScene)
	  	document.removeEventListener("keyup", buttonPress)
	  	changedScene=true
	   	gameInit();
  }
}


menuInit()
