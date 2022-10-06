const Utils = require('./Utils/index.js');
const Home = require('./Menus/Home/index.js');


// Import css Styles
require('normalize.css');
require('../public/less/index.less');

class main {

    static init=()=>{
        let home = new Home(document.querySelector('.container'));
        home.create();
        
    }

}

// init Program
main.init();



// On document load 
window.addEvent//Listener('load',()=>{Utils.resizeWindow()})
window.addEventListener('resize',(event)=>{Utils.resizeWindow()})