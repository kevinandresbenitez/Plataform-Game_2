module.exports = class Gravity {
    intervalFunction;
    static Elements = [] ;

    static addElement(element){
        Gravity.Elements.push(element);
    }

    runGravity=()=>{
        let Elements = Gravity.Elements.filter(element => {return element.gravityConfig.isEnabled});
        
        Elements.forEach((elementWithGravityEnable)=>{

            let [firstMosaic,secondMosaic,thirdMosaic] = elementWithGravityEnable.getCollisionableBlocksForPosition(elementWithGravityEnable.LevelMosaicsDistance,elementWithGravityEnable.position);
            
            // verify if the element collision with floor
            if( !(
                elementWithGravityEnable.verify.collisionBlockTop(elementWithGravityEnable.LevelMosaics[firstMosaic]) ||
                elementWithGravityEnable.verify.collisionBlockTop(elementWithGravityEnable.LevelMosaics[secondMosaic]) ||
                elementWithGravityEnable.verify.collisionBlockTop(elementWithGravityEnable.LevelMosaics[thirdMosaic])
                )
            ){
                elementWithGravityEnable.position.y += elementWithGravityEnable.gravityConfig.speed;
            }

        });

    }

    enable=()=>{
        this.intervalFunction= setInterval(this.runGravity,50)
    }

    disable=()=>{
        clearInterval(this.intervalFunction);
    }

}