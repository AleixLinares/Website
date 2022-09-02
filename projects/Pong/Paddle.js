class Paddle {
	constructor(x,y,size,color,velocity,playable, players) {
		//init class
		this.body = Matter.Bodies.rectangle(x, y,size.x,size.y,{
			render: {
				fillStyle: color
			},		
			isStatic: true			
		});
		Matter.Composite.add(engine.world,this.body);
		this.playable=playable
		this.velocity=velocity		
		this.twoPlayers=players
	}

	draw() {		
		//Now renderer does this 		
	}
	update(deltaTime) {		
		
		var paddleCurrentPosition= this.body.position
		if(!this.playable) {					
			var ballCurrentPosition=ball.body.position.y
			if(paddleCurrentPosition.y-50<=0) Matter.Body.set(this.body, "position", {x:this.body.position.x, y:51})
			else if(paddleCurrentPosition.y+50>canvas.height) Matter.Body.set(this.body, "position", {x:this.body.position.x, y:canvas.height-50})
			else {		
				if(paddleCurrentPosition.y<ballCurrentPosition)	Matter.Body.set(this.body, "position", {x:this.body.position.x, y:this.body.position.y+this.velocity.y})		
																	
				if(paddleCurrentPosition.y>ballCurrentPosition) Matter.Body.set(this.body, "position", {x:this.body.position.x, y:this.body.position.y-this.velocity.y})						
			}		
		}	
		else {					
			if(!this.twoPlayers && state.pressedKeys.up && paddleCurrentPosition.y-75>10) Matter.Body.set(this.body, "position", {x:this.body.position.x, y:this.body.position.y-this.velocity.y})
			if(!this.twoPlayers && state.pressedKeys.down && paddleCurrentPosition.y+85<canvas.height) Matter.Body.set(this.body, "position", {x:this.body.position.x, y:this.body.position.y+this.velocity.y})
			if(this.twoPlayers && state.pressedKeys.W && paddleCurrentPosition.y-75>10) Matter.Body.set(this.body, "position", {x:this.body.position.x, y:this.body.position.y-this.velocity.y})
			if(this.twoPlayers && state.pressedKeys.S && paddleCurrentPosition.y+85<canvas.height) Matter.Body.set(this.body, "position", {x:this.body.position.x, y:this.body.position.y+this.velocity.y})
		}
	}
}