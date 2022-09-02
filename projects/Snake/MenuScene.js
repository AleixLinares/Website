var frameTime = 1000/60
var prevTime=0
var currentTime
var deltaTime=0
var cicle=false
var players=null;
var mode = null;
var context;
var audio = new Audio('./projects/Snake/navigation.wav');

function menuInit() {
	setTimeout(paintArrow,100);
	setTimeout(playerSelector,100);

	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.width= window.innerWidth/1.4;
	canvas.height = window.innerHeight/1.4;	

	document.addEventListener("keypress",changeScene);
	document.addEventListener("keyup", buttonPress);

	cicle=false
	players=null;
	mode = null;
}

function paintArrow() {
	if(cicle==0) {
		context.clearRect(0,0, canvas.width, canvas.height)
  		context.beginPath();
		size=20
		center=532
		context.moveTo(canvas.width/2-130, center);
		context.lineTo(canvas.width/2-155, center-size);
		context.lineTo(canvas.width/2-155, center+size);
		context.fillStyle="white"
		context.fill();
		context.closePath()
	}	
	else {
		context.clearRect(0,0, canvas.width, canvas.height)
		context.beginPath();
		size=20
		center=607
		context.moveTo(canvas.width/2-130, center);
		context.lineTo(canvas.width/2-155, center-size);
		context.lineTo(canvas.width/2-155, center+size);
		context.fillStyle="white"
		context.fill();
		context.closePath()
	}
}


function playerSelector() {
        
        context.beginPath()
	context.font = "200px press_start_2pregular"
	context.fillStyle = "#ffffff"
	context.textAlign="center"
	context.textBaseLine="middle"				
	context.fillText("Snake", canvas.width/2, 350)
	context.font = "30px press_start_2pregular"
	context.fillText("1 Player", canvas.width/2, 550)
	context.fillText("2 Players", canvas.width/2+17, 625)
	context.closePath()
       }

function modeSelector() {
        
        context.beginPath()
	context.font = "200px press_start_2pregular"
	context.fillStyle = "#ffffff"
	context.textAlign="center"
	context.textBaseLine="middle"				
	context.fillText("Pong", canvas.width/2, 350)
	context.font = "30px press_start_2pregular"
	context.fillText("First to ten", canvas.width/2+70, 550)
	context.fillText("No limit", canvas.width/2+12, 625)
	context.closePath()
       }


function changeScene(event) {
	if (event.keyCode == 13 && players==null) {
		context.clearRect(0,0, canvas.width, canvas.height);
		players=cicle;
		cicle=false;
		paintArrow();
		modeSelector();
	}
	else if (event.keyCode == 13 && mode==null) {
	  	document.removeEventListener("keypress", changeScene)
	  	document.removeEventListener("keyup", buttonPress)
	  	mode=cicle;
	   	gameInit(players, mode);
  }
}



function buttonPress(event) {
	if(event.keyCode==38 || event.keyCode==87) {
		audio.play()
		if(cicle) cicle = false
		else cicle = true
		paintArrow()
		
	}
	if(event.keyCode==40 || event.keyCode==83) { 
		audio.play() 
		if(!cicle) cicle = true
		else cicle = false		
		paintArrow()  
	 }
	 if(players==null) playerSelector();
	 else modeSelector();
}

menuInit()
