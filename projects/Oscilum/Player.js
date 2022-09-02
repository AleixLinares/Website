class Player {
	constructor(x,y,size,color) {

		this.body= Matter.Bodies.circle(x,y,size,{
		render: {
				fillStyle: color,	
				sprite: {
					texture: "./projects/Oscilum/spriteTest.png",
					xScale: 2,
					yScale: 2
				} 		
			},
		restitution: 0,
		label: "player",		
		friciton: 0.1,
		frictionAir:0.0005,
		//density: 20,
		collisionFilter: {
				group: -1
			}				
		});
		Matter.Composite.add(engine.world,this.body);	
	}
}