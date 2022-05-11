class Boat{

    constructor(x,y,w,h, boatPosition){
        this.w = w;
        this.h = h;
        this.boatPosition = boatPosition;
        this.image = loadImage("assets/boat.png");

        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world,this.body);

    }

    display(){
        var angle = this.body.angle;
        var position = this.body.position;

        push();
        translate(position.x,position.y);
        rotate(angle);
        image(this.image,0,this.boatPosition,this.w,this.h);
        pop();

    }


}