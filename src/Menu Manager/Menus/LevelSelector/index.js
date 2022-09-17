const MainClass = require('../../Main Class');
const Utils = require('../../../Utils');
const SelectableElements = require('../../../Utils/SelecteableElements')
const LevelLoader = require('../../../Level Loader/index');

module.exports = class LevelSelector extends MainClass.Menu{
    #domElement;
    #LevelSelectorElements;
    // function to return home
    showHome;

    // Level config
    #levelSelected = 1;
    #levelSelectorCarrusel;

    constructor(props){
        super(props);
        this.#domElement = Utils.createElementDom({className:'levelSelector keepRadioAspect',element:'div'});
        this.showHome = props.showHome;
    }

    create(){
        super.create();
        Utils.resizeWindow();
        
        
        
        // Create buttons start game and return home page
        this.#LevelSelectorElements =  new SelectableElements({keys:{KeySelectPrev:'ArrowLeft',KeySelectNext:'ArrowRight',Open:'Enter'},class:'selected',location:this.#domElement});
        // Create carrusel
        
        let Carrusel = Utils.createElementDom({className:'carrusel-levels',element:'div',onClick:this.functions.selectLevels});
        
        
        this.LevelSelectorElements.addElements(Utils.createElementDom({className:'start-game',element:'button',onClick:this.functions.startGame}));
        this.LevelSelectorElements.addElements(Utils.createElementDom({className:'exit',element:'button',onClick:this.functions.returnHome}));
        this.LevelSelectorElements.addElements(Carrusel);
        this.LevelSelectorElements.EnableKeys();

        this.#levelSelectorCarrusel = new SelectableElements({keys:{KeySelectPrev:'ArrowLeft',KeySelectNext:'ArrowRight',Open:'Enter'},class:'selected',location:Carrusel})
        this.levelSelectorCarrusel.addElements(Utils.createElementDom({className:'level',element:'div' , onClick:this.functions.returnSelectLevels}));
        this.levelSelectorCarrusel.addElements(Utils.createElementDom({className:'level',element:'div'}));
        this.levelSelectorCarrusel.addElements(Utils.createElementDom({className:'level',element:'div'}));
        this.levelSelectorCarrusel.addElements(Utils.createElementDom({className:'level',element:'div'}));

    }

     

    functions={
        returnHome:()=>{
            this.LevelSelectorElements.DisableKeys();
            this.delete();
            this.showHome();
        },

        selectLevels:()=>{
            this.LevelSelectorElements.DisableKeys();
            this.levelSelectorCarrusel.EnableKeys();
        },

        returnSelectLevels:()=>{
            this.levelSelectorCarrusel.DisableKeys();
            this.LevelSelectorElements.EnableKeys();            
        },

        startGame:()=>{
            // desactivate all menus keys
            this.levelSelectorCarrusel.DisableKeys();
            this.LevelSelectorElements.DisableKeys();
            this.delete();
            
            // Load Level
            let main = new LevelLoader({location:document.querySelector('.container')});
            main.create();
            main.loadLevel(1);
        }

    }


    get domElement(){   
        return this.#domElement;
    }

    get LevelSelectorElements(){
        return this.#LevelSelectorElements;
    }

    get levelSelectorCarrusel(){
        return this.#levelSelectorCarrusel;
    }

}