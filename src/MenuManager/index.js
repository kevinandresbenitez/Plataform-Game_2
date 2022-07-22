let Utils = require('../Utils/index');

class Menu{

    // location : location where the object will be worked , Required
    #location;

    constructor(props){
        let {location} = props || false;

        if(!location || !Utils.existsDomElement(location)){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }

        this.#location = props.location;
    }


    set location(value){
        throw new Error("Error location cant change, is defined in the constructor ");
    }
    get location(){
        return this.#location;
    }


    create = ()=>{
        this.location.appendChild(this.domElement);
    }

    delete = ()=>{
        this.location.removeChild(this.domElement);
    }


    show = ()=>{
        this.domElement.classList.remove('hidde');
    }

    hidde = ()=>{
        this.domElement.classList.add('hidde');
    }
    
    isOpen = ()=>{
        return false;
    }
}

class Home extends Menu{
    // Dom element created for the class
    #domElement;

    constructor(props){
        super(props);
        this.#domElement = Utils.createElementDom({className:'home',element:'div'});
    }

    get domElement(){   
        return this.#domElement;
    }

    
}

module.exports = {Home};