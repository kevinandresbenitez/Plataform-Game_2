let Utils = require('../../Utils/index.js');

module.exports = class SelectableElements{
    #location;

    #elements = [];
    elementSelected;
    Keys;
    className;

    constructor(props){
        let {KeySelectPrev,KeySelectNext} = props.keys;
        this.elementSelected = props.elementSelected || 0;
        this.Keys =props.keys;
        this.className = props.className || 'selected';

        
        // Verifi location from the items selectionables
        let {location} = props || false;
        if(!location || !Utils.existsDomElement(location)){
            throw new Error("Error in the constructor SelecteableMenu,'location' not found or does not exist");
        }
        this.#location = props.location;
    }

    set location(value){
        throw new Error("Error location cant change, is defined in the constructor ");
    }
    get location(){
        return this.#location;
    }

    get elements(){
        return this.#elements
    }

    addElements=(element)=>{
        if(Utils.isDomElement(element)){
            this.#elements.push(element);
            this.location.appendChild(element)
        }else{
            throw new Error('Function need dom Element');
        }
        
        this.UpdateChanges();
    }


    removeElements=(element)=>{
        this.#elements.remove(element);
    }

    UpdateChanges=()=>{
        if(this.#elements.length > 0){
            this.#elements.forEach((item)=>{item.classList.remove(this.className)})
            this.#elements[this.elementSelected].classList.add(this.className);
        }
    }


    selectNextElement=()=>{
        let limit = this.elements.length - 1 ;
        if(this.elementSelected == limit){
            this.elementSelected = 0;    
        }else{
            this.elementSelected += 1;
        }        
    }

    selectPrevElement=()=>{
        if(this.elementSelected == 0){
            this.elementSelected = this.elements.length - 1;
        }else{
            this.elementSelected -= 1;
        }      
    }


    DisableKeys=()=>{
        window.removeEventListener('keydown',this.ProcessKeysEvents);
    }

    ActivateKeys=()=>{
        window.addEventListener('keydown',this.ProcessKeysEvents);
    }

    ProcessKeysEvents = (event)=>{
        switch (event.key){
            case (this.Keys.KeySelectNext):
                this.selectNextElement();
                this.UpdateChanges();
            break

            case (this.Keys.KeySelectPrev):
                this.selectPrevElement();
                this.UpdateChanges();
            break
        }
    }


}
