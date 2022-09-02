class Apple {
	constructor(x,y) {
		//init class
		this.x=x;
		this.y=y;		
		matrix[this.y][this.x]=2
	}

	draw() {
			context.beginPath()			
			context.rect(this.x*35, this.y*35, 35,35)
			context.fillStyle="#FF1818"									
			context.fill()			
			context.lineWidth = 2;
			context.strokeStyle = "#A50000";
			context.stroke();
			context.closePath();		
			context.beginPath();
			context.rect(this.x*35+20, this.y*35+5, 5,5)
			context.fillStyle="#FFFFFF"									
			context.fill()
			context.closePath();
			context.beginPath();
			context.rect(this.x*35+17, this.y*35-8, 2,8)
			context.fillStyle="#64350A"									
			context.fill()
			context.closePath();	
	}
	update() {
	}
}