let blockImg = require('../../../public/Images/Blocks/Block.png');

class Block{
    constructor(x,y,lenght){
        this.x =x;
        this.y =y;
        this.lenght = lenght;
    }
}

class SolidBlock extends Block{
    constructor(x,y,lenght){
        super(x,y,lenght);
        this.img = blockImg;
    }

        //Get current frame from the user
    getFrame=async()=>{

        return ({imagen:await this.getImgFrame(),
            width:this.lenght,
            height:this.lenght,
            position :{
            x:this.x,
            y:this.y,}
        })
    }


    getImgFrame=()=>{
        let newImg = new Image();
        newImg.src = this.img;

        return new Promise((resolve,reject)=>{
            resolve(newImg)
        })
    }


}

class NoSolidBlock extends Block{
    constructor(x,y,lenght){
        super(x,y,lenght);
        this.img = blockImg;
    }

    getFrame=()=>{
        return {
            imagen:this,img,
            width:this.lenght,
            height:this.lenght,
            position :{
                x:this.x,
                y:this.y,
            }
        }
    }

}

module.exports={SolidBlock,NoSolidBlock}