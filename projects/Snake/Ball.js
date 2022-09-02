

class Ball {
	constructor(x,y,size,color,velocity) {
		//init class
		this.body= Matter.Bodies.circle(canvas.width/2, canvas.height/2,size,{
		render: {
			fillStyle: color
		},
		friction: 0,
		frictionAir:0,
		frictionStatic: 0,
		restitution: 1.01,
		density: 0.005
		});
		Matter.Composite.add(engine.world,this.body);		
		this.velocity=velocity;
		this.start();
	}

	draw() {
		//Now renderer does this 		
	}
	update(deltaTime) {			
   		//Now runner does this  		
	}

 	start() {		
		var vel;
		var r = Math.floor(Math.random() * (4))				
		if(r==0) {
			vel = {x:this.velocity.x,y:this.velocity.y}		
		}
		else if(r==1) {
			vel = {x:-this.velocity.x,y:this.velocity.y}		
		}
		else if(r==2) {
			vel = {x:this.velocity.x,y:-this.velocity.y}	
		}
		else if(r==3) {
			vel = {x:-this.velocity.x,y:-this.velocity.y}
		}		

		Matter.Body.set(this.body, "position", {x:canvas.width/2, y:canvas.height/2})
		Matter.Body.setVelocity(this.body, {x:vel.x, y:vel.y})
	}
}