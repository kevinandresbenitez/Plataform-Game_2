import { SystemCollision } from "./CollisionSystem";

class Gravity {
    intervalFunction;
    static Elements = [] ;

    static addElement(element){
        Gravity.Elements.push(element);
    }

    runGravity=()=>{
        let Elements = Gravity.Elements.filter(element => {return element.gravityConfig.isEnabled});

        Elements.forEach((elementWithGravity)=>{
            if (!SystemCollision.verify.collisionBlockTop(elementWithGravity)){
                elementWithGravity.position.y += elementWithGravity.gravityConfig.speed;
            }
        })
    }

    enable=()=>{
        this.intervalFunction= setInterval(this.runGravity,50)
    }

    disable=()=>{
        clearInterval(this.intervalFunction);
    }

}

export {Gravity}