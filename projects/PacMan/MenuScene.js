var frameTime = 1000/60
var prevTime=0
var currentTime
var deltaTime=0
var context, context2;


function menuInit() {	

	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	const canvas2 = document.getElementById("canvas2");
	context2 = canvas2.getContext("2d");

	gameInit()
}

menuInit()
