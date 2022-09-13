var frameTime = 1000/60
var prevTime=0
var currentTime
var deltaTime=0
var context;


function menuInit() {	

	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	gameInit()
}

menuInit()
