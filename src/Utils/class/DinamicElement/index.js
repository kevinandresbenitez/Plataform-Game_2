const AnimationFrame = require('../../../Utils/class/AnimationFrame/index.js');
import {Gravity} from '../../../Level Loader/Gravity.js'

class DinamicElement{

    constructor(position){
        if(!position){
            throw(new Error('Failed user nedd Position'));
        }

        this.position = position;
        Gravity.addElement(this)
    }


    // Animation manager
    Animation;

    
    // Position from the user
    position={
        x:0,
        y:0
    };


    // Spedd config
    speedRun = 20;


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


}

export {DinamicElement}