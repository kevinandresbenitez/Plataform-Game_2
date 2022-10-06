// Import render utils
const DinamicElementClass = require('../../Utils/class/DinamicElement/index.js');


// Import images from the user
let UserWaitRight0= require('../../../public/Images/Player/waitRight/0.png');
let UserWaitRight1= require('../../../public/Images/Player/waitRight/1.png');
let UserWaitRight2= require('../../../public/Images/Player/waitRight/2.png');
let UserWaitRight3= require('../../../public/Images/Player/waitRight/3.png');

let UserWaitLeft0= require('../../../public/Images/Player/waitLeft/0.png');
let UserWaitLeft1= require('../../../public/Images/Player/waitLeft/1.png');
let UserWaitLeft2= require('../../../public/Images/Player/waitLeft/2.png');
let UserWaitLeft3= require('../../../public/Images/Player/waitLeft/3.png');

let UserRunLeft0= require('../../../public/Images/Player/runLeft/0.png');
let UserRunLeft1= require('../../../public/Images/Player/runLeft/1.png');

let UserRunRight0= require('../../../public/Images/Player/runRight/0.png');
let UserRunRight1= require('../../../public/Images/Player/runRight/1.png');


module.exports = class Player extends DinamicElementClass{
    constructor(props){
        super(props.position);

        // Set position default
        this.changeAnimation.runRight();
    }
    
    // Moviment Manajer
    inMoviment={
        right:false,
        left:false,
    }
    
    
    EnableKeys=()=>{
        document.addEventListener('keydown',this.EventKeys.KeyDown);
        document.addEventListener('keyup',this.EventKeys.KeyUp);
        this.intervalMoviment =setInterval(this.ProcessMoviment,40);
    }

    DisableKeys=()=>{
        document.removeEventListener('keydown',this.EventKeys.KeyDown);
        document.removeEventListener('keyup',this.EventKeys.KeyUp);
        document.removeEventListener('click',this.pabeando)
        clearInterval(this.intervalMoviment);
    }
    
    
    ProcessMoviment=()=>{
        if(this.inMoviment.right){
            this.move.right();
        }

        if(this.inMoviment.left){
            this.move.left();
        }
        
        if(this.inMoviment.jump){
            this.move.jump();
        }
    }
    

    changeAnimation={
        runLeft:()=>{
            this.setAnimation([UserRunLeft0,UserRunLeft1],10,this.position.x,this.position.y)
        },
        runRight:()=>{
            this.setAnimation([UserRunRight0,UserRunRight1],10,this.position.x,this.position.y)
        },
        waitLeft:()=>{
            this.setAnimation([UserWaitLeft0,UserWaitLeft1,UserWaitLeft2,UserWaitLeft3],10,this.position.x,this.position.y)
        },
        waitRight:()=>{
            this.setAnimation([UserWaitRight0,UserWaitRight1,UserWaitRight2,UserWaitRight3],10,this.position.x,this.position.y)
        }
    }


    EventKeys = {
        KeyDown:(e)=>{
            const moveRight=()=>{
                if(!this.inMoviment.right){
                    this.inMoviment.right = true;
                    this.changeAnimation.runRight();
                }
            };
            const moveLeft=()=>{
                if(!this.inMoviment.left){
                    this.inMoviment.left=true;
                    this.changeAnimation.runLeft();
                }
            };

            const jump=()=>{
                if(!this.inMoviment.jump){
                    this.inMoviment.jump=true;
                }
            }

            const handlers={
                ArrowRight:moveRight,
                ArrowLeft:moveLeft,
                ArrowUp:jump
            }
            
            if(handlers.hasOwnProperty(e.key)){
                handlers[e.key]()
            }
            
            return true
        },

        KeyUp:(e)=>{
            const stopMoveRight =()=>{
                this.inMoviment.right=false;
                this.changeAnimation.waitRight();
            };
            const stopMoveLeft =()=>{
                this.inMoviment.left=false;
                this.changeAnimation.waitLeft();
            };

            const stopJump=()=>{
                this.inMoviment.jump=false;
            }

            const handlers={
                ArrowRight:stopMoveRight,
                ArrowLeft:stopMoveLeft,
                ArrowUp:stopJump
            }
            
            if(handlers.hasOwnProperty(e.key)){
                handlers[e.key]()
            }
            return true


        }
    }

    
    
}