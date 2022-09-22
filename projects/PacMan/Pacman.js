var followDirection=true;
class Pacman {
	constructor() {
		this.i=23
		this.j=14
		this.x=this.j*sizeH+sizeH/2
		this.y=this.i*sizeW+sizeW/2
		this.looking="right"
	}

	update(deltaTime) {
					
		followDirection=true
		var despl=4
		if((this.x-sizeH/2)%sizeH==0 && (this.y-sizeW/2)%sizeW==0) {
			//console.log("NODE")
			if(state.pressedKeys.W) {
				//console.log("W")
				if(matrix[this.i-1][this.j]!=1 && matrix[this.i-1][this.j]!=4) {			
					this.y-=despl
					this.looking="up"
					followDirection=false
					//state.pressedKeys.W=false
					//console.log("valid")
				}							
			}
			else if(state.pressedKeys.S) {
				if(matrix[this.i+1][this.j]!=1 && matrix[this.i+1][this.j]!=4) {
					this.y+=despl
					this.looking="down"
					followDirection=false
					state.pressedKeys.S=false
				}
			}
			else if(state.pressedKeys.D) {
				if(matrix[this.i][this.j+1]!=1 && matrix[this.i][this.j+1]!=4) {
					this.x+=despl
					this.looking="right"
					followDirection=false
					state.pressedKeys.D=false
				}
			}
			else if(state.pressedKeys.A) {
				if(matrix[this.i][this.j-1]!=1 && matrix[this.i][this.j-1]!=4) {
					this.x-=despl
					this.looking="left"
					followDirection=false
					state.pressedKeys.A=false
				}
			}
			if(followDirection) {
				if(this.looking=="up" && matrix[this.i-1][this.j]!=1) this.y-=4
				if(this.looking=="down" && matrix[this.i+1][this.j]!=1) this.y+=4
				if(this.looking=="left" && matrix[this.i][this.j-1]!=1) this.x-=4
				if(this.looking=="right" && matrix[this.i][this.j+1]!=1) this.x+=4
			}
			
			
			if((this.x-sizeH/2)%sizeH==0) this.j=(this.x-sizeH/2)/sizeH				
			if((this.y-sizeW/2)%sizeW==0) this.i=(this.y-sizeW/2)/sizeW
						
			if(this.i==14 && this.j==0) {
					this.i=14
					this.j=26
					this.x=this.j*sizeH+sizeH/2
					this.y=this.i*sizeW+sizeW/2
					this.looking="left"
			}
			else if(this.i==14 && this.j==27) {
					this.i=14
					this.j=1
					this.x=this.j*sizeH+sizeH/2
					this.y=this.i*sizeW+sizeW/2
					this.looking="right"						
			}
			if(matrix[this.i][this.j]==2){
				matrix[this.i][this.j]=0
				score++
				dots++
			} 
			if(matrix[this.i][this.j]==6){
				matrix[this.i][this.j]=8
				score++
				dots++
			}
			if(matrix[this.i][this.j]==3){
				matrix[this.i][this.j]=0	
				score+=50
				dots++	
				if(gameMode!="frightened") oldgameMode=gameMode					
				frightenedTimeControl=0
				once=true
				gameMode="frightened"
			} 
			if(matrix[this.i][this.j]==7){
				matrix[this.i][this.j]=8	
				score+=50	
				dots++
				if(gameMode!="frightened") oldgameMode=gameMode
				once=true
				frightenedTimeControl=0
				gameMode="frightened"
			} 					
		}		
		else {
			
			if(this.looking=="up") {
				if(state.pressedKeys.S) {
					this.y+=despl
					state.pressedKeys.S=false
					this.looking="down"
				}
				else this.y-=despl
			}
			else if(this.looking=="down") {
				if(state.pressedKeys.W) {
					this.y-=despl
					state.pressedKeys.W=false
					this.looking="up"
				}
				else this.y+=despl
			}
			else if(this.looking=="left") {
				if(state.pressedKeys.D) {
					this.x+=despl
					state.pressedKeys.D=false
					this.looking="right"
				}
				else this.x-=despl
			}
			else if(this.looking=="right") {
				if(state.pressedKeys.A) {
					this.x-=despl
					state.pressedKeys.A=false
					this.looking="left"
				}
				else this.x+=despl
			}	
			
			if((this.x-sizeH/2)%sizeH==0 && (this.y-sizeW/2)%sizeW==0) {
				this.j=(this.x-sizeH/2)/sizeH				
				this.i=(this.y-sizeW/2)/sizeW
			}
		}	
	}

	draw() {
		
		if(this.looking=="right") {
			context.beginPath();
			context.arc(this.x,this.y, 20, 0.25 * Math.PI, 1.25 * Math.PI, false);
			context.fillStyle = "rgb(255, 255, 0)";
			context.fill();
			context.beginPath();
			context.arc(this.x,this.y, 20, 0.75 * Math.PI, 1.75 * Math.PI, false);
			context.fill();
		}
		else if(this.looking=="left") {
			context.beginPath();
			context.arc(this.x,this.y, 20, 1.75 * Math.PI, 0.75 * Math.PI, false);
			context.fillStyle = "rgb(255, 255, 0)";
			context.fill();
			context.beginPath();
			context.arc(this.x,this.y, 20, 1.25 * Math.PI, 0.25 * Math.PI, false);
			context.fill();
		}
		else if(this.looking=="down") {
			context.beginPath();
			context.arc(this.x,this.y, 20, 1.25 * Math.PI, 0.25 * Math.PI, false);
			context.fillStyle = "rgb(255, 255, 0)";
			context.fill();
			context.beginPath();
			context.arc(this.x,this.y, 20, 0.75 * Math.PI, 1.75 * Math.PI, false);
			context.fill();
		}
		else if(this.looking=="up") {
			context.beginPath();
			context.arc(this.x,this.y, 20, 1.75 * Math.PI, 0.75 * Math.PI, false);
			context.fillStyle = "rgb(255, 255, 0)";
			context.fill();
			context.beginPath();
			context.arc(this.x,this.y, 20, 0.25 * Math.PI, 1.25 * Math.PI, false);
			context.fill();
		}
				
	}

	restartPos() {
		//console.log("KILL")
		//kill=false
		this.i=23
		this.j=14
		this.x=this.j*sizeH+sizeH/2
		this.y=this.i*sizeW+sizeW/2
	}
}