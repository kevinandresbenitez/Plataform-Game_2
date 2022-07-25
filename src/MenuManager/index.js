let Utils = require('../Utils/index');
let MainClass = require('./MainClass/index.js')
let SelectableElements =require('./SelectableElements/index.js');


// Sections
class Home extends MainClass.Menu{
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
        this.MenuElements.addElements(Utils.createElementDom({className:'btn-init',element:'button'}));
        this.MenuElements.addElements(Utils.createElementDom({className:'btn-config',element:'button',onClick:this.openConfig}));
        this.MenuElements.ActivateKeys();
    }

    openConfig=()=>{
        this.MenuElements.DisableKeys();
        // Create Modal
        let ConfigModal = new HomeConfig({location:this.#domElement});
        ConfigModal.onDelete = ()=>{this.MenuElements.ActivateKeys()};
        ConfigModal.create();
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

class HomeConfig extends MainClass.Menu{
    #domElement
    #ConfigElements
    // function berore delete modal
    onDelete;
    
    constructor(props){
        super(props);
        this.#domElement = Utils.createElementDom({className:'config modal',element:'div'});
    }

    create(){
        super.create();

        // Create Items in the config
        this.#ConfigElements = new SelectableElements({keys:{KeySelectPrev:'ArrowLeft',KeySelectNext:'ArrowRight',Open:'Enter'},class:'selected',location:this.#domElement});
        this.ConfigElements.addElements(Utils.createElementDom({className:'item',element:'button',onClick:this.deleteModal}));
        this.addElements(Utils.createElementDom({className:'item title',element:'div'}));
        this.ConfigElements.addElements(Utils.createElementDom({className:'item',element:'button'}));
        this.ConfigElements.ActivateKeys();
    }

    deleteModal=()=>{
        this.delete()
        this.ConfigElements.DisableKeys();

        // if have a function on delete enabled 
        if(this.onDelete){
            this.onDelete();
        }
        
    }


    get domElement(){   
        return this.#domElement;
    }

    get ConfigElements(){
        return this.#ConfigElements;
    }

}

module.exports = {Home};