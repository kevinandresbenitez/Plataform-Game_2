// Import render utils
let AnimationFrame = require('../../Utils/AnimationFrame/index.js');


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


module.exports = class Player{

    // Animation manager
    Animation;

    
    // Gravity Configs
    gravity={
        isEnabled : true,
        speed:0
    }

    // Spedd config
    speedRun = 15;
    
    // Moviment Manajer
    inMoviment={
        right:false,
        left:false,
    }
    // Position from the user
    position={
        x:0,
        y:0
    };
    
    
    
    
    constructor(props){
        if(!props.position){
            throw(new Error('Failed user nedd props'));
        }

        this.position = props.position;
        this.setAnimation.waitRight();
    }


    EnableKeys=()=>{
        document.addEventListener('keydown',this.EventKeys.KeyDown);
        document.addEventListener('keyup',this.EventKeys.KeyUp);
        this.intervalMoviment =setInterval(this.ProcessMoviment,40);
    }

    DisableKeys=()=>{
        document.removeEventListener('keydown');
        document.removeEventListener('keyup');
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

    EventKeys = {
        KeyDown:(e)=>{
            const moveRight=()=>{
                if(!this.inMoviment.right){
                    this.inMoviment.right = true;
                    this.setAnimation.runRight();
                }
            };
            const moveLeft=()=>{
                if(!this.inMoviment.left){
                    this.inMoviment.left=true;
                    this.setAnimation.runLeft();
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
                this.setAnimation.waitRight();
            };
            const stopMoveLeft =()=>{
                this.inMoviment.left=false;
                this.setAnimation.waitLeft();
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

    setAnimation={
        runLeft:()=>{
            this.Animation = new AnimationFrame([UserRunLeft0,UserRunLeft1],10,this.position.x,this.position.y)
        },
        runRight:()=>{
            this.Animation = new AnimationFrame([UserRunRight0,UserRunRight1],10,this.position.x,this.position.y)
        },
        waitLeft:()=>{
            this.Animation = new AnimationFrame([UserWaitLeft0,UserWaitLeft1,UserWaitLeft2,UserWaitLeft3],10,this.position.x,this.position.y)
        },
        waitRight:()=>{
            this.Animation = new AnimationFrame([UserWaitRight0,UserWaitRight1,UserWaitRight2,UserWaitRight3],10,this.position.x,this.position.y)
        }
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
    
}