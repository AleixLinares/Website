class Ghost {
	constructor() {
		this.i=11
		this.j=15
		this.x=this.j*sizeH+sizeH/2
		this.y=this.i*sizeW+sizeW/2
		this.looking="up"
		this.path=[]
		this.corner_i = 0
		this.corner_j = 0 
		this.mode="start"
		this.color ="white"
		this.invisibleColor="white"
		this.frightenedColor ="#0017A8"
		this.vel=2
		this.restartTimer=-1
		this.frightenedimg =document.getElementById("scared");	
	}

	update(end, pacmanPos) {

		if(this.mode=="start") return

		var start={i:this.i, j:this.j}		

		if(gameMode!= "frightened" && this.i==pacmanPos.i && this.j==pacmanPos.j) killed=true			


		if(this.mode!="ded" && this.mode=="frightened" && this.i==pacmanPos.i && this.j==pacmanPos.j) {
			this.mode="ded"
			this.vel=7
			this.x=this.j*sizeH+sizeH/2
			this.y=this.i*sizeW+sizeW/2
		}


		var behind
		if(this.looking=="up") behind={i:this.i+1,j:this.j}
		if(this.looking=="down") behind={i:this.i-1,j:this.j}
		if(this.looking=="left") behind={i:this.i,j:this.j+1}
		if(this.looking=="right") behind={i:this.i,j:this.j-1}
		this.path=[]		
		if(this.color=="orange") {
			if(this.mode=="frightened") {
				this.vel=1
				end = getRandomNode({i:this.i, j:this.j})
				this.path = AStarSearch(start, end, behind)
			}
			else if((Math.hypot(this.i-end.i, this.j-end.j)<=8 || this.mode=="scatter") && this.mode!="ded") {
				this.vel=2
				this.path = AStarSearch(start, {i:this.corner_i, j:this.corner_j}, behind)		
			}
			else if(this.mode=="ded") {
				behind={i:-1, j:-1}
				if(this.i==11 && this.j==14) {
					this.mode=oldgameMode
					this.vel=2
					this.i=14
					this.j=15
					this.x=this.j*sizeH+sizeH/2
					this.y=this.i*sizeW+sizeW/2
					this.looking="left"
					return

				}
				else this.path = AStarSearch(start, {i:11, j:14}, behind)		
			}
			else {
				this.vel=2 
				this.path = AStarSearch(start, end, behind)
			}
		}
		else {			
			if(this.mode=="frightened") {
				this.vel=1
				end = getRandomNode({i:this.i, j:this.j})
				this.path = AStarSearch(start, end, behind)
			}
			else if(this.mode=="scatter") {
				this.vel=2
				this.path = AStarSearch(start, {i:this.corner_i, j:this.corner_j}, behind)	
			}
			else if(this.mode=="ded") {
				behind={i:-1, j:-1}
				if(this.i==11 && this.j==14) {
					this.mode=oldgameMode
					if(this.color=="red") {
						this.i=14
						this.j=14
					}
					else if(this.color=="pink") {
						this.i=14
						this.j=13
					}
					else if(this.color=="cyan") {
						this.i=14
						this.j=12
					}
					this.vel=2
					this.x=this.j*sizeH+sizeH/2
					this.y=this.i*sizeW+sizeW/2
					this.looking="left"
					return

				}
				else this.path = AStarSearch(start, {i:11, j:14}, behind)		
			}
			else {
				this.vel=2							
				this.path = AStarSearch(start, end, behind)		
			}	
		}
		
		var dest={i:this.i, j:this.j}
		if(this.path.length>0) {
			var l= this.path.length
			dest.i=this.path[l-2][1]
			dest.j=this.path[l-2][0]
			//this.x=this.j*sizeH+sizeH/2
			//this.y=this.i*sizeW+sizeW/2
		}		
		if(dest.i==this.i && dest.j==this.j) {
			if(this.looking=="up" || this.looking=="down") {
				if(matrix[this.i][this.j-1]!=1 && matrix[this.i][this.j+1]!=1) {
					var side = Math.floor(Math.random() * 2);					
					if(side==1) dest={i:this.i, j:this.j-1}
					else dest={i:this.i, j:this.j+1}
				}
				else if(matrix[this.i][this.j-1]!=1)  dest={i:this.i, j:this.j-1}
				else if(matrix[this.i][this.j+1]!=1)  dest={i:this.i, j:this.j+1}	
			}			
			if(this.looking=="left" || this.looking=="right") {
				if(matrix[this.i-1][this.j]!=1 && matrix[this.i+1][this.j]!=1) {
					var side = Math.floor(Math.random() * 2);
					if(side==1) dest={i:this.i-1, j:this.j}
					else dest={i:this.i+1, j:this.j}
				}
				else if(matrix[this.i-1][this.j]!=1)  dest={i:this.i-1, j:this.j}
				else if(matrix[this.i+1][this.j]!=1)  dest={i:this.i+1, j:this.j}	
			}			
		}

		followDirection=true
		if((this.x-sizeH/2)%sizeH==0 && (this.y-sizeW/2)%sizeW==0) {
			if(dest.i<this.i && dest.j==this.j) {
				if(matrix[this.i-1][this.j]!=1) {			
					this.y-=this.vel
					this.looking="up"
					followDirection=false					
				}							
			}
			if(dest.i>this.i && dest.j==this.j) {
				if(matrix[this.i+1][this.j]!=1) {
					this.y+=this.vel
					this.looking="down"
					followDirection=false
				}
			}
			if(dest.i==this.i && dest.j>this.j) {
				if(matrix[this.i][this.j+1]!=1) {
					this.x+=this.vel
					this.looking="right"
					followDirection=false
				}
			}
			if(dest.i==this.i && dest.j<this.j) {
				if(matrix[this.i][this.j-1]!=1) {
					this.x-=this.vel
					this.looking="left"
					followDirection=false					
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
		}		
		else {
			if(this.looking=="up") {
				this.y-=this.vel
			}
			if(this.looking=="down") {
				this.y+=this.vel
			}
			if(this.looking=="left") {
				this.x-=this.vel
			}
			if(this.looking=="right") {
				this.x+=this.vel
			}			
			if((this.x-sizeH/2)%sizeH==0 && (this.y-sizeW/2)%sizeW==0) {
				this.j=(this.x-sizeH/2)/sizeH				
				this.i=(this.y-sizeW/2)/sizeW
			}
		}
		if(gameMode!= "frightened" && this.i==pacmanPos.i && this.j==pacmanPos.j) killed=true
		
	}
	draw() {

		context.beginPath()
		//context.arc( this.x,this.y, 20,0,2 * Math.PI)
		if(this.mode=="frightened") {
			context.globalAlpha = 1;
			context.drawImage(this.frightenedimg, this.x-sizeH/2-6,this.y-sizeW/2-6, 40, 40);
		}
		else if(this.mode=="ded") {
			context.globalAlpha = 0.5;
			context.drawImage(this.img, this.x-sizeH/2-6,this.y-sizeW/2-6, 40, 40);
		}
		else {
			context.globalAlpha = 1;
			context.fillStyle= context.drawImage(this.img, this.x-sizeH/2-6,this.y-sizeW/2-6, 40, 40);
		}
		//context.fill()		
		context.closePath();
		/*for(var i=1; i<this.path.length; ++i) {			
			context.beginPath();
			context.moveTo(this.path[i-1][0]*sizeH+sizeH/2,this.path[i-1][1]*sizeW+sizeW/2);
			context.lineTo(this.path[i][0]*sizeH+sizeH/2,this.path[i][1]*sizeW+sizeW/2);									
			context.strokeStyle=this.color
			context.lineWidth=2
			context.stroke();
			context.closePath();
		}*/
	}

	changeMode(mode) {
		if(this.mode=="frightened" && mode!="frightened") {
			if((this.x-sizeH/2)%sizeH!=0 || (this.y-sizeW/2)%sizeW!=0) {
				this.x=this.j*sizeH+sizeH/2
				this.y=this.i*sizeW+sizeW/2	
			}
		}
		this.mode=mode						
				
	}

	swapDirection() {
		if(this.looking=="up") this.looking="down"
		else if(this.looking=="down") this.looking="up"
		else if(this.looking=="right") this.looking="left"
		else if(this.looking=="left") this.looking="right"
	}	

}

class Blinky extends Ghost {
	constructor() {
		super()
		this.i=11
		this.j=14
		this.x=this.j*sizeH+sizeH/2
		this.y=this.i*sizeW+sizeW/2
		this.corner_i = 1
		this.corner_j = 26
		this.color = "red"
		this.looking="right"
		this.invisibleColor="rgb(255,0,0,0.5)"
		this.img=document.getElementById("blinky");	
	}

	
}
class Inky extends Ghost {
	constructor() {
		super()
		this.i=14
		this.j=12
		this.x=this.j*sizeH+sizeH/2
		this.y=this.i*sizeW+sizeW/2
		this.corner_i = 29
		this.corner_j = 26
		this.color = "cyan"
		this.looking="left"
		this.invisibleColor="rgb(0,255,255,0.5)"
		this.img=document.getElementById("inky");	
	}
}

class Pinky extends Ghost {
	constructor() {
		super()
		this.i=14
		this.j=13
		this.x=this.j*sizeH+sizeH/2
		this.y=this.i*sizeW+sizeW/2
		this.corner_i = 1
		this.corner_j = 1
		this.color = "pink"
		this.looking="right"
		this.invisibleColor="rgb(255,192,203,0.5)"
		this.img=document.getElementById("pinky");	
	}
	
}

class Clyde extends Ghost {
	constructor() {
		super()
		this.i=14
		this.j=15
		this.x=this.j*sizeH+sizeH/2
		this.y=this.i*sizeW+sizeW/2
		this.corner_i = 29
		this.corner_j = 1 
		this.color = "orange"
		this.looking="left"
		this.invisibleColor="rgb(255,166,0,0.5)"
		this.img=document.getElementById("clyde");	
	}
}

function getRandomNode(ghostPos) {

	var iL=ghostPos.i, iH=ghostPos.i
	var jL=ghostPos.j, jH=ghostPos.j
 	var candidates=[]

	while(iL>1) {			
		iL--
		if(matrix[iL][ghostPos.j]==6 || matrix[iL][ghostPos.j]==7 || matrix[iL][ghostPos.j]==8) {
			candidates.push({i:iL, j:ghostPos.j})
			break
		}
	}
	while(jL>1) {			
		jL--
		if(matrix[ghostPos.i][jL]==6 || matrix[ghostPos.i][jL]==7 || matrix[ghostPos.i][jL]==8) {
			candidates.push({i:ghostPos.i, j:jL})
			break
		}
	}
	while(iH<sizeY-1) {			
		iH++
		if(matrix[iH][ghostPos.j]==6 || matrix[iH][ghostPos.j]==7 || matrix[iH][ghostPos.j]==8) {
			candidates.push({i:iH, j:ghostPos.j})
			break
		}
	}
	while(jH<sizeX-1) {			
		jH++
		if(matrix[ghostPos.i][jH]==6 || matrix[ghostPos.i][jH]==7 || matrix[ghostPos.i][jH]==8) {
			candidates.push({i:ghostPos.i, j:jH})
			break
		}
	}	
	
	var choice = Math.floor(Math.random()*candidates.length);
	return candidates[choice]
}