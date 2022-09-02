var diccionari = {
		0 : "1110111",
		1 : "0010010",
		2 : "1011101",
		3 : "1011011",
		4 : "0111010",
		5 : "1101011",
		6 : "1101111",
		7 : "1010010",
		8 : "1111111",
		9 : "1111011",		
	}
function segmentDisplay(display,number) {

	var displacement=0
	var i=0
	if(display.side=="right") i=String(number).length-1
	while (i<String(number).length && i>=0) {

		n=Number(String(number)[i]);

		var s = diccionari[n]		

		if(s[0]=="1") {		
			context.beginPath()
			context.fillStyle=display.color
			context.fillRect(display.x+displacement, display.y, display.longSide, display.shortSide)			
			context.fill()
			context.closePath();
		}
		if(s[1]=="1") {
			context.beginPath()
			context.fillStyle=display.color
			context.fillRect(display.x+displacement, display.y, display.shortSide, display.longSide)			
			context.fill()
			context.closePath();
		}
		if(s[2]=="1") {
			context.beginPath()
			context.fillStyle=display.color
			context.fillRect(display.x+display.longSide-display.shortSide+displacement, display.y, display.shortSide, display.longSide)			
			context.fill()
			context.closePath();
		}
		if(s[3]=="1") {
			context.beginPath()
			context.fillStyle=display.color
			context.fillRect(display.x+displacement, display.y-display.shortSide+display.longSide, display.longSide, display.shortSide)			
			context.fill()
			context.closePath();
		}
		if(s[4]=="1") {
			context.beginPath()
			context.fillStyle=display.color
			context.fillRect(display.x+displacement, display.y-display.shortSide+display.longSide, display.shortSide, display.longSide)			
			context.fill()
			context.closePath();
		}
		if(s[5]=="1") {
			context.beginPath()
			context.fillStyle=display.color
			context.fillRect(display.x+display.longSide-display.shortSide+displacement, display.y-display.shortSide+display.longSide, display.shortSide, display.longSide)			
			context.fill()
			context.closePath();
		}
		if(s[6]=="1") {			
			context.beginPath()
			context.fillStyle=display.color
			context.fillRect(display.x+displacement, display.y+2*display.longSide-2*display.shortSide, display.longSide, display.shortSide)
			context.fill()
			context.closePath();
		}
		if(display.side=="left") {
			displacement += (display.shortSide +display.longSide)
			i=i+1
			}
		if(display.side=="right") {
			displacement -= (display.shortSide +display.longSide)
			i=i-1
		}
		
	}
}

class TextDisplay {

	constructor(x,y,color,side,longSide,shortSide) {
		//init class
		this.x=x
		this.y=y	
		this.color=color	
		this.side=side
		this.longSide=longSide
		this.shortSide=shortSide
	}

	draw() {	
		if(this.side=="left") segmentDisplay(this,scoreLeft)
		if(this.side=="right") segmentDisplay(this,scoreRight)
	}
	update(deltaTime) {	

		//segmentDisplay(this, scoreLeft)
		if(this.side=="left") segmentDisplay(this,scoreLeft)
		if(this.side=="right") segmentDisplay(this,scoreRight)
	}
}