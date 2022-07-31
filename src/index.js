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


main.init();


// On document load 
window.addEventListener('load',()=>{Utils.resizeWindow()})
window.addEventListener('resize',(event)=>{Utils.resizeWindow()})