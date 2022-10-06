const MainClass = require('../../Utils/class/Menus/index.js');
const Utils = require('../../Utils');
const SelectableElements = require('../../Utils/class/SelecteableElements')
const LevelLoader = require('../../Level Loader/index');

module.exports = class LevelSelector extends MainClass.Menu{
    #LevelSelectorElements;
    // function to return home / callback
    #returnCallback

    // Level config
    #levelSelected = 1;
    #levelSelectorCarrusel;

    constructor(location,returnCallback){
        let domElement = Utils.createElementDom({className:'levelSelector keepRadioAspect',element:'div'});
        super(location,domElement);
        // set return function 
        this.#returnCallback =returnCallback;  
    }

    create(){
        super.create();
        Utils.resizeWindow();
        
        
        
        // Create buttons start game and return home page
        this.#LevelSelectorElements =  new SelectableElements({keys:{KeySelectPrev:'ArrowLeft',KeySelectNext:'ArrowRight',Open:'Enter'},class:'selected',location:this.domElement});
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
            this.returnCallback();
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
            this.main =  new LevelLoader(document.querySelector('.container'),this.functions.returnLevelSelectorMenuCallback);
            this.main.create();
            this.main.loadLevel(1);
        },

        returnLevelSelectorMenuCallback:()=>{
            this.create();
            
        }

    }


    get returnCallback(){
        return this.#returnCallback;
    }

    get LevelSelectorElements(){
        return this.#LevelSelectorElements;
    }

    get levelSelectorCarrusel(){
        return this.#levelSelectorCarrusel;
    }

}