let oldBounds;

class Lookout {
	constructor(x,y,minX,minY,maxX,maxY) {

		this.body= Matter.Bodies.rectangle(x,y,100,25,{
			isSensor: true,
			isStatic: true,
			render: {
					fillStyle: "yellow"				
				},		
			label: "lookout",
			collisionFilter: {
				group: 0,
				category: "0x0002",
				mask: "0x0004"
			}		
		});		
		this.minX=minX
		this.minY=minY		
		this.maxX=maxX
		this.maxY=maxY		
		Matter.Composite.add(engine.world,this.body);	
	}

	lookAt() {
		oldBounds = JSON.parse(JSON.stringify(render.bounds))		
		Matter.Render.lookAt(render, {
		  min: { x: this.minX, y: this.minY },
		  max: { x: this.maxX, y: this.maxY }
		});
	}
	unLookAt() {		
		Matter.Render.lookAt(render, oldBounds);	
		console.log(render.bounds)
	}
}