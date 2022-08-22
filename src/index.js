const LevelLoader = require('./LevelLoader');
let MenuManager = require('./MenuManager/index');
let Utils = require('./Utils/index.js');


// Import css Styles
require('normalize.css');
require('../public/less/index.less');

class main {

    static init=()=>{
        let home = new MenuManager.Home({location:document.querySelector('.container')});
        home.create();
        
    }

}


// main.init();
let le = new LevelLoader({location:document.querySelector('.container')});
le.create();
le.loadLevel(1)


// On document load 
window.addEvent//Listener('load',()=>{Utils.resizeWindow()})
window.addEventListener('resize',(event)=>{Utils.resizeWindow()})