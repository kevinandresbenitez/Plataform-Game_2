let Utils = require('../../Utils/index');

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


    create(){
        this.location.appendChild(this.domElement);
    }

    delete = ()=>{
        this.location.removeChild(this.domElement);
    }

    addElements=(element)=>{
        this.domElement.appendChild(element);
    }


    
}

module.exports={Menu};