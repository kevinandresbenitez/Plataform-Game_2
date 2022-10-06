const AnimationFrame = require('../../../Utils/class/AnimationFrame/index.js');

module.exports = class DinamicElement{

    constructor(position){
        if(!position){
            throw(new Error('Failed user nedd Position'));
        }

        this.position = position ;
    }


    // Animation manager
    Animation;

    // System collision blocks items
    LevelMosaics;
    LevelMosaicsPosition;
    
    // Gravity Configs
    gravity={
        isEnabled : true,
        speed:0
    }
    
    // Position from the user
    position={
        x:0,
        y:0
    };


    // Spedd config
    speedRun = 20;


    getCollisionableBlocksForPosition=(MosaicDistance,position)=>{
        // Get position mosaic actualy
        let firstMosaic;
        for(let i=0 ;i < MosaicDistance.length;i++){
            if(i){
                if((position.x < MosaicDistance[i])  && (position.x > MosaicDistance[i - 1])){
                    firstMosaic = i ;
                }
            }else{
                if(position.x < MosaicDistance[i]){
                    firstMosaic = i ;
                }
            }    
        }

        // second 
        let SecondMosiac;
        if(firstMosaic == 0){
            SecondMosiac = 1
        }else if(firstMosaic == (MosaicDistance.length - 1)){
            SecondMosiac = MosaicDistance.length - 2
        }else{
            SecondMosiac = firstMosaic - 1;
        }


        // third
        let thirddMosiac;
        if(firstMosaic == 0){
            thirddMosiac = 2
        }else if(firstMosaic == (MosaicDistance.length - 1)){
            thirddMosiac = MosaicDistance.length - 3
        }else{
            thirddMosiac = firstMosaic + 1;
        }
        
        return [firstMosaic,SecondMosiac,thirddMosiac]
    }

    loadColisionSystem=(MosaicBlocks,MosaicDistance)=>{
        this.LevelMosaics = MosaicBlocks;
        this.LevelMosaicsPosition = this.getCollisionableBlocksForPosition(MosaicDistance,this.position);
    }

    setAnimation=(arrayImages,interval,positionX,positionY)=>{
        this.Animation = new AnimationFrame(arrayImages,interval,positionX,positionY);
    }
    

    move ={
        left:()=>{
            this.position.x -= this.speedRun;
        },

        right:()=>{
            this.position.x+= this.speedRun;
        },

        bottom:()=>{
            this.position.y += this.speedRun;
        },
        
        jump:()=>{
            this.position.y -= 15;
            console.log('saltando')
        }  
    }

    verify = {
        
        collisionBlockTop:()=>{
            for(let i =0 ;this.MainThis.levelLoader.Blocks.length > i;i++){                
                let top = (this.position[1] + this.height == this.MainThis.levelLoader.Blocks[i].topLeft[1] ) && (this.position[0] + this.width > this.MainThis.levelLoader.Blocks[i].topLeft[0] && this.position[0] < this.MainThis.levelLoader.Blocks[i].topRight[0]  );
                if(top){
                    return true;
                }                
            }
        },

        collisionBlockBottom:()=>{
            for(let i =0 ;this.MainThis.levelLoader.Blocks.length > i;i++){
                let bottom =(this.position[1] == this.MainThis.levelLoader.Blocks[i].buttomLeft[1] ) && (this.position[0]+this.width > this.MainThis.levelLoader.Blocks[i].buttomLeft[0] && this.position[0] < this.MainThis.levelLoader.Blocks[i].buttomRight[0]  );
                if(bottom){
                    return true;
                }                
            }
        },

        collisionBlockRight:()=>{
            for(let i =0 ;this.MainThis.levelLoader.Blocks.length > i;i++){
                let right =((this.position[0] + this.width == this.MainThis.levelLoader.Blocks[i].buttomLeft[0]) && (this.position[1]  < this.MainThis.levelLoader.Blocks[i].buttomLeft[1] ) && (this.position[1] > this.MainThis.levelLoader.Blocks[i].topLeft[1] || this.position[1] + this.height > this.MainThis.levelLoader.Blocks[i].topLeft[1]))
                if(right){
                    return true;
                }
            }
        },

        collisionBlockLeft:()=>{
            for(let i =0 ;this.MainThis.levelLoader.Blocks.length > i;i++){
                let left =((this.position[0] == this.MainThis.levelLoader.Blocks[i].buttomRight[0]) && (this.position[1]  < this.MainThis.levelLoader.Blocks[i].buttomRight[1] ) && (this.position[1] > this.MainThis.levelLoader.Blocks[i].topRight[1] || this.position[1] + this.height > this.MainThis.levelLoader.Blocks[i].topRight[1]));
                if(left){
                    return true;
                }
            }
        }

    }


}