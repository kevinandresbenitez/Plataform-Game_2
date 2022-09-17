const MainClass = require('../../Main Class');
const Utils = require('../../../Utils');
const SelectableElements = require('../../../Utils/SelecteableElements');

module.exports = class HomeConfig extends MainClass.Menu{
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
        this.ConfigElements.EnableKeys();
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