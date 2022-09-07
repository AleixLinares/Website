class Player {
	constructor(x,y,size,color) {

		this.body= Matter.Bodies.circle(x,y,size,{
		render: {
				fillStyle: color,	
				sprite: {
					texture: "./projects/Oscilum/spriteTest2.png",
					xScale: 40/256,
					yScale: 40/256
				} 		
			},
		restitution: 0,
		label: "player",		
		friciton: 0.1,
		frictionAir:0.0005,
		//density: 20,
		collisionFilter: {
				group: 1,
				category: "0x0004",
				mask: "0x0002"
			}				
		});
		Matter.Composite.add(engine.world,this.body);	
	}
}