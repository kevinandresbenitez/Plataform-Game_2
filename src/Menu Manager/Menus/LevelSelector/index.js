const MainClass = require('../../Main Class');
const Utils = require('../../../Utils');
const SelectableElements = require('../../../Utils/SelecteableElements')

module.exports = class LevelSelector extends MainClass.Menu{
    #domElement;
    #LevelSelectorElements;
    // function to return home
    showHome;

    constructor(props){
        super(props);
        this.#domElement = Utils.createElementDom({className:'levelSelector keepRadioAspect',element:'div'});
        this.showHome = props.showHome;
    }

    create(){
        super.create();
        Utils.resizeWindow();
        

        this.#LevelSelectorElements =  new SelectableElements({keys:{KeySelectPrev:'ArrowLeft',KeySelectNext:'ArrowRight',Open:'Enter'},class:'selected',location:this.#domElement});
        this.LevelSelectorElements.addElements(Utils.createElementDom({className:'start-game',element:'button'}));
        this.LevelSelectorElements.addElements(Utils.createElementDom({className:'exit',element:'button',onClick:this.functions.returnHome}));
        this.LevelSelectorElements.addElements(Utils.createElementDom({className:'carrusel-levels',element:'div'}));

        this.LevelSelectorElements.ActivateKeys();

    }

     

    functions={
        returnHome:()=>{
            this.LevelSelectorElements.DisableKeys();
            this.delete();
            this.showHome();
        }
    }


    get domElement(){   
        return this.#domElement;
    }

    get LevelSelectorElements(){
        return this.#LevelSelectorElements;
    }


}