var frame=0, followDirection=true;
var snakeEating = new Audio('./projects/Snake/eatingSound.wav');
class Snake {
	constructor() {
		//init class		
		this.body=[{x:7,y:9},{x:6,y:9},{x:5,y:9},{x:4,y:9},{x:3,y:9},{x:2,y:9}]		
		this.direction = "east"		
		for(var i=0; i<this.body.length; i++) {
			 matrix[this.body[i].y][this.body[i].x]=1				
		}		
	}

	draw() {
			context.beginPath()
			for(var i=0; i<this.body.length; i++) {
			 	context.rect(this.body[i].x*35, this.body[i].y*35, 35,35)	
			}
			context.fillStyle="#77FF00"									
			context.fill()
			context.lineWidth = 2;
			context.strokeStyle = "black";
			context.stroke();
			context.closePath();		
	}
	update() {
		frame++;
		var newPos;
		followDirection=true	
		if(state.pressedKeys.W) {
			newPos={x:this.body[0].x,y:this.body[0].y-1}
			if(newPos.x==this.body[1].x && newPos.y==this.body[1].y) {
				followDirection=true				
			}
			else {
				followDirection=false
				this.direction="north"
			}
		}
		else if(state.pressedKeys.S) {
			newPos={x:this.body[0].x,y:this.body[0].y+1}
			if(newPos.x==this.body[1].x && newPos.y==this.body[1].y) {
				followDirection=true				
			}
			else {
				followDirection=false
				this.direction="south"
			}
		}
		else if(state.pressedKeys.D) {
			newPos={x:this.body[0].x+1,y:this.body[0].y}	
			if(newPos.x==this.body[1].x && newPos.y==this.body[1].y) {
				followDirection=true
				
			}
			else {
				this.direction="east"
				followDirection=false
			}
		}
		else if(state.pressedKeys.A) {
			newPos={x:this.body[0].x-1,y:this.body[0].y}
			if(newPos.x==this.body[1].x && newPos.y==this.body[1].y) {
				followDirection=true				
			}
			else{
				followDirection=false
				this.direction="west"
			}
		}
		if(followDirection){
			if(this.direction=="north") newPos={x:this.body[0].x,y:this.body[0].y-1}
			else if(this.direction=="south") newPos={x:this.body[0].x,y:this.body[0].y+1}
			else if(this.direction=="east") newPos={x:this.body[0].x+1,y:this.body[0].y}
			else if(this.direction=="west") newPos={x:this.body[0].x-1,y:this.body[0].y}
		}	
		if(frame>=5) {			
			this.body.unshift(newPos)	
			if(newPos.y<0 || newPos.y>=20 || newPos.x<0 || newPos.x>=40) {
				endGame=true
			}
			else if(matrix[newPos.y][newPos.x]==2) {
				snakeEating.play()
				if(this.body.length>=800) winGame=true;
				var correctPos=false
				var x=0
				var y=0
				while(!correctPos) {
					x= Math.floor(Math.random() * 40)
					y= Math.floor(Math.random() * 20)
					if(matrix[y][x]==0) correctPos=true
				}
				apple.x=x;
				apple.y=y;
				matrix[y][x]=2;	
				matrix[newPos.y][newPos.x]=1
			}	
			else if(matrix[newPos.y][newPos.x]==1) {				
				endGame=true
			}	
			else {
				var removePos=this.body.pop()	
				matrix[removePos.y][removePos.x]=0
				matrix[newPos.y][newPos.x]=1
				
			}						
			frame=0			
		}		
   		
	} 	
}