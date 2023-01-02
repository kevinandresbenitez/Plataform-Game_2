import {existsDomElement,isDomElement} from '../../domElementsHelper/index.js';
import {resizeWindow} from '../../window/index.js';

class Menu{
    // location : location where the object will be worked , Required
    #location;
    #domElement;

    constructor(location = false , domElement = false){
        if(!location || !existsDomElement(location)){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }

        if(!domElement || !isDomElement(domElement)){
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
        resizeWindow();
    }

    delete = ()=>{
        this.location.removeChild(this.domElement);
    }

    addElements=(element)=>{
        if(!(isDomElement(element))){
            throw new Error("need a dom element");
        }

        this.domElement.appendChild(element);
    }


    
}

export {Menu};