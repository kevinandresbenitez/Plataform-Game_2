const MainClass = require('../../Utils/class/Menus/index.js');
import { SelectableElements } from '../../Utils/class/SelecteableElements';
import {createElementDom} from '../../Utils/domElementsHelper/index.js'

class HomeConfig extends MainClass.Menu{
    #ConfigElements
    #returnCallback;
    
    constructor(location,returnCallback){
        let domElement = createElementDom({className:'config modal',element:'div'});
        super(location,domElement);

        // set return function 
        this.#returnCallback =returnCallback;  
    }

    create(){
        super.create();
        // Create Items in the config
        this.#ConfigElements = new SelectableElements({keys:{KeySelectPrev:'ArrowLeft',KeySelectNext:'ArrowRight',Open:'Enter'},class:'selected',location:this.domElement});
        this.ConfigElements.addElements(createElementDom({className:'item',element:'button',onClick:this.deleteModal}));
        this.addElements(createElementDom({className:'item title',element:'div'}));
        this.ConfigElements.addElements(createElementDom({className:'item',element:'button'}));
        this.ConfigElements.EnableKeys();
    }

    deleteModal=()=>{
        this.delete()
        this.ConfigElements.DisableKeys();
        this.returnCallback();
    }

    get returnCallback(){
        return this.#returnCallback;
    }
    get ConfigElements(){
        return this.#ConfigElements;
    }

}

export {HomeConfig}