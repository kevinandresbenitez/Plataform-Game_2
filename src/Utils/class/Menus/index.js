let Utils = require('../../index');

class Menu{
    // location : location where the object will be worked , Required
    #location;
    #domElement;

    constructor(location = false , domElement = false){
        if(!location || !Utils.existsDomElement(location)){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }

        if(!domElement || !Utils.isDomElement(domElement)){
            throw new Error("Error in the constructor Menu,'domElement' not found or does not exist");
        }

        this.#location =location;
        this.#domElement=domElement;
    }


    set location(value){
        throw new Error("Error location cant change, is defined in the constructor ");
    }
    get location(){
        return this.#location;
    }

    set domElement(value){
        throw new Error("Error domElement cant change, is defined in the constructor ");
    }

    get domElement(){
        return this.#domElement;
    }

    create(){
        this.location.appendChild(this.domElement);
        Utils.resizeWindow();
    }

    delete = ()=>{
        this.location.removeChild(this.domElement);
    }

    addElements=(element)=>{
        if(!(Utils.isDomElement(element))){
            throw new Error("need a dom element");
        }

        this.domElement.appendChild(element);
    }


    
}

module.exports={Menu};