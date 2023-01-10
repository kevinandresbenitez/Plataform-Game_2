import { Levels } from '../Game Elements/Levels/index.js';
import { getForLevel } from '../Utils/getForLevel/index.js';
import { existsDomElement , createElementDom } from '../Utils/domElementsHelper/index.js';
import {resizeWindow} from '../Utils/window/index.js';

class CanvasGame { 
    #location
    #domElement

    //Containers
    #CanvasStaticElements
    #CanvasDinamicElements

    constructor(location){
        if(!(location && existsDomElement(location))){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }
        this.#location = location;   
        this.#domElement = createElementDom({className:'canvas-container keepRadioAspect',element:'div'});

        this.#location.appendChild(this.#domElement);
    }

    delete=()=>{
        this.#location.removeChild(this.#domElement);
    }
    get CanvasStaticElements(){
        return this.#CanvasStaticElements;
    }

    get CanvasDinamicElements(){
        return this.#CanvasDinamicElements;
    }

    canvasIscreated=()=>{
        return this.#domElement.children.length
    }
    
    createCanvasForLevel=(level)=>{
        // verify level exist
        if(!(Levels[level - 1])){
            throw new Error('Level not exist');
        }

        // if canvas is already 
        if(this.canvasIscreated()){
            return false;
        }

        // add canvas elements
        this.#CanvasStaticElements =createElementDom({className:'canvas-StaticElements',element:'canvas'});
        this.#CanvasDinamicElements =createElementDom({className:'canvas-DinamicElements',element:'canvas'});
        
        
        // add dimentions for the container
        this.#domElement.style.width =getForLevel.widthCanvas(level) + "px";
        // add dimentions for the canvas
        this.#CanvasStaticElements.width =getForLevel.widthCanvas(level);
        this.#CanvasStaticElements.height =900;
        
        this.#CanvasDinamicElements.width =getForLevel.widthCanvas(level);
        this.#CanvasDinamicElements.height =900;

        //Add elements in the dom
        this.#domElement.appendChild(this.#CanvasStaticElements);
        this.#domElement.appendChild(this.#CanvasDinamicElements);
        
        //Resize window
        resizeWindow();
    }

    deleteCanvas = ()=>{
        // if canvas is not already 
        if(!this.canvasIscreated()){
            return false;
        }
        this.#domElement.removeChild(this.#CanvasDinamicElements);
        this.#domElement.removeChild(this.#CanvasStaticElements);
    }


    clear={
        dinamicElements:()=>{
            // get dimentions from the canvas and clear canvas
            let ContextCanvas = this.CanvasDinamicElements.getContext('2d');
            ContextCanvas.clearRect(0, 0,1600,900);
        },
        staticElements:()=>{
            // get dimentions from the canvas and clear canvas
            let ContextCanvas = this.CanvasStaticElements.getContext('2d');
            ContextCanvas.clearRect(0, 0,1600,900);
        }
    }

    drawFrames={

        static:(Frames)=>{
            let ContextCanvas = this.CanvasStaticElements.getContext('2d');
            // Clear canvas Static
            this.clear.staticElements();
            Frames.forEach((item)=>{
                item.imagen.addEventListener('load',()=>{
                    ContextCanvas.drawImage(item.imagen,item.position.x,item.position.y,item.width,item.height);
                })
                
            })
        },

        dinamic:(Frames)=>{
            let ContextCanvas = this.CanvasDinamicElements.getContext('2d');
            // Clear canvas dinamic
            this.clear.dinamicElements();

            // Draw Images
            Frames.forEach((item)=>{
                ContextCanvas.drawImage(item.imagen,item.position.x,item.position.y,item.width,item.height);
            })
        }
    }


}

export {CanvasGame}