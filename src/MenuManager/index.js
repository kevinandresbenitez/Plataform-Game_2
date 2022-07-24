let Utils = require('../Utils/index');
let MainClass = require('./MainClass/index.js')
let SelectableElements=require('./SelectableElements/index.js');


// Sections
class Home extends MainClass.Menu{
    // Dom element created for the class
    #domElement;
    #selectableElements;

    constructor(props){
        super(props);
        this.#domElement = Utils.createElementDom({className:'home keepRadioAspect',element:'div'});
    }


    create(){
        super.create();

        // Add selecteableElements
        this.#selectableElements = new SelectableElements({keys:{KeySelectPrev:'ArrowLeft',KeySelectNext:'ArrowRight'},class:'selected',location:this.#domElement});
        // Add items
        this.selectableElements.addElements(Utils.createElementDom({className:'btn-init',element:'button'}));
        this.selectableElements.addElements(Utils.createElementDom({className:'btn-config',element:'button'}));
        this.selectableElements.ActivateKeys();
    }



    get domElement(){   
        return this.#domElement;
    }

    get selectableElements(){   
        return this.#selectableElements;
    }
    
}

module.exports = {Home};