class Tower{

    constructor(x,y,w,h){

        var options = {
            isStatic:true
        }

        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x,y,w,h,options);
        this.image = loadImage("assets/tower.png");

        World.add(world,this.body);

    }

    display(){
        var position = this.body.position;

        push();
        image(this.image, position.x,position.y,this.w,this.h)
        pop();
    }


}