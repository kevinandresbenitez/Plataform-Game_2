
let AnimationFrame = require('../Utils/AnimationFrame/index.js');

let UserWaitRight0= require('../../public/images/Player/waitRight/0.png');
let UserWaitRight1= require('../../public/images/Player/waitRight/1.png');
let UserWaitRight2= require('../../public/images/Player/waitRight/2.png');
let UserWaitRight3= require('../../public/images/Player/waitRight/3.png');

module.exports = class Player{

    // Animation manager
    Animation;

    // Gravity bolean
    gravity = true;

    get getGravity (){
        return 8;
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
        this.Animation = new AnimationFrame([UserWaitRight0,UserWaitRight1,UserWaitRight2,UserWaitRight3],10,this.position.x,this.position.y)
    }

    


    

}