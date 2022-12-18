const AnimationFrame = require('../../../Utils/class/AnimationFrame/index.js');
const Gravity = require('../../../Level Loader/Gravity.js');

module.exports = class DinamicElement{

    constructor(position){
        if(!position){
            throw(new Error('Failed user nedd Position'));
        }

        this.position = position ;
        Gravity.addElement(this)
    }


    // Animation manager
    Animation;

    // System collision blocks items
    LevelMosaics;
    LevelMosaicsPosition;
    

    
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
                if((position.x < MosaicDistance[i])  && (position.x >= MosaicDistance[i - 1])){
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
        this.LevelMosaicsDistance = MosaicDistance;
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

        down:()=>{
            this.position.y += this.speedRun;
        },
        
        jump:()=>{
            this.position.y -= this.speedRun;
        }  
    }

    verify = {
        
        collisionBlockTop:(blocks)=>{
            return blocks.some((block)=>{
                return (this.position.y + this.height == block.y) && (this.position.x + this.width > block.x) && (this.position.x < block.x + block.lenght)
            })
        },

        collisionBlockBottom:(blocks)=>{
            return blocks.some((block)=>{
                return (this.position.y == block.y + block.lenght) && (this.position.x + this.width > block.x) && (this.position.x < block.x + block.lenght)
                
            })
        },

        collisionBlockRight:(blocks)=>{
            return blocks.some((block)=>{
                return (this.position.x == block.x + block.lenght) && (this.position.y < block.y + block.lenght) && ((this.position.y > block.y)||(this.position.y + this.height > block.y))
            })
        },

        collisionBlockLeft:(blocks)=>{
            return blocks.some((block)=>{
                return (this.position.x + this.width == block.x) && (this.position.y < block.y + block.lenght) && (this.position.y > block.y || this.position.y + this.height > block.y)
            })

        }

    }


}