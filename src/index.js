import {resizeWindow} from './Utils/window/index.js';
import {Home} from './Menus/Home/index.js';


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
window.addEventListener('load',()=>{resizeWindow()})
window.addEventListener('resize',(event)=>{resizeWindow()})