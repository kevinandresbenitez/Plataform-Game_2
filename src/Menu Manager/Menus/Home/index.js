const MainClass = require('../../Main Class');
const Utils = require('../../../Utils');
const HomeConfig = require('../HomeConfig');
const LevelSelector = require('../LevelSelector');
const SelectableElements = require('../../../Utils/SelecteableElements');

// Sections
module.exports = class Home extends MainClass.Menu{
    // Dom element created for the class
    #domElement;
    #MenuElements;
    #ConfigElements;

    constructor(props){
        super(props);
        this.#domElement = Utils.createElementDom({className:'home keepRadioAspect',element:'div'});
    }


    create(){
        super.create();

        // Add selecteableElements
        this.#MenuElements = new SelectableElements({keys:{KeySelectPrev:'ArrowLeft',KeySelectNext:'ArrowRight',Open:'Enter'},class:'selected',location:this.#domElement});
        // Add items
        this.MenuElements.addElements(Utils.createElementDom({className:'btn-init',element:'button',onClick:this.functions.openLevelSelector}));
        this.MenuElements.addElements(Utils.createElementDom({className:'btn-config',element:'button',onClick:this.functions.openConfig}));
        this.MenuElements.ActivateKeys();
    }

    functions={
        openConfig:()=>{
            this.MenuElements.DisableKeys();
            // Create Modal
            let ConfigModal = new HomeConfig({location:this.#domElement});
            ConfigModal.onDelete = ()=>{this.MenuElements.ActivateKeys()};
            ConfigModal.create();
        },

        openLevelSelector:()=>{
            // Create Level Selector Section
            this.hidde();
    
            let levelSelector = new LevelSelector({location:document.querySelector('.container'),showHome:this.show});
            levelSelector.create();
        }
    }

    hidde =()=>{
        this.domElement.style.display = 'none';
        this.MenuElements.DisableKeys();
    }

    show =()=>{
        this.domElement.style.display = 'flex';
        this.MenuElements.ActivateKeys();
    }

    get domElement(){   
        return this.#domElement;
    }
    get MenuElements(){   
        return this.#MenuElements;
    }
    get ConfigElements(){
        return this.#ConfigElements
    }
    
}