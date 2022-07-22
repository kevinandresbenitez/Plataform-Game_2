let MenuManager = require('./MenuManager/index');

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