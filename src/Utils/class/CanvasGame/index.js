const Level = require('../../../Game Elements/Levels/index.js');
const Utils = require('../../index.js');
let GetForLevel= require('../../GetForLevel/index.js');

module.exports = class CanvasGame { 
    #location
    #domElement
    #renderIsEnabled

    //Containers
    #CanvasStaticElements
    #CanvasDinamicElements

    constructor(location){
        if(!(location && Utils.existsDomElement(location))){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }
        this.#location = location;   
        this.#domElement = Utils.createElementDom({className:'canvas-container keepRadioAspect',element:'div'});

        this.#location.appendChild(this.#domElement);
    }

    delete=()=>{
        this.#location.removeChild(this.#domElement);
    }

    set renderIsEnabled(value){
        this.#renderIsEnabled = value;
    }
    get renderIsEnabled(){
        return this.#renderIsEnabled;
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
        if(!(Level[level - 1])){
            throw new Error('Level not exist');
        }

        // if canvas is already 
        if(this.canvasIscreated()){
            return false;
        }

        // add canvas elements
        this.#CanvasStaticElements =Utils.createElementDom({className:'canvas-StaticElements',element:'canvas'});
        this.#CanvasDinamicElements =Utils.createElementDom({className:'canvas-DinamicElements',element:'canvas'});
        
        
        // add dimentions for the container
        this.#domElement.style.width =GetForLevel.widthCanvas(level) + "px";
        // add dimentions for the canvas
        this.#CanvasStaticElements.width =GetForLevel.widthCanvas(level);
        this.#CanvasStaticElements.height =900;
        
        this.#CanvasDinamicElements.width =GetForLevel.widthCanvas(level);
        this.#CanvasDinamicElements.height =900;

        //Add elements in the dom
        this.#domElement.appendChild(this.#CanvasStaticElements);
        this.#domElement.appendChild(this.#CanvasDinamicElements);
        
        //Resize window
        Utils.resizeWindow();
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

    draw={
        blocks:(Blocks)=>{
            // draw Allblocks
            let canvasContext = this.CanvasStaticElements.getContext('2d');
            // Clear canvas Static
            this.clear.staticElements();

            // draw Blocks in canvas
            Blocks.forEach((mosaic)=>{
                mosaic.forEach((block)=>{
                    let img = new Image();
                    img.src = block.img;
                    img.addEventListener('load',()=>{
                        canvasContext.drawImage(img,block.x,block.y,40,40)
                    })
                })
            })

        },

        images:(Images)=>{
            let ContextCanvas = this.CanvasDinamicElements.getContext('2d');
            // Clear canvas dinamic
            this.clear.dinamicElements();

            // Draw Images
            Images.forEach((item)=>{
                ContextCanvas.drawImage(item.imagen,item.position.x,item.position.y,item.width,item.height);
            })
        }
    }



    renderElements={

        dinamic:async(DinamicElements)=>{

                // Get Dinamic images for render
            let ImagesItems = await Promise.all(    
                DinamicElements.map(async(Item)=>{
                    return {
                        imagen :await Item.Animation.getImgFrame(),
                        width:60,
                        height:80,
                        position :{
                            x:Item.position.x,
                            y:Item.position.y,
                        }
                    };
                })
            );
    
            // draw Images
            this.draw.images(ImagesItems);
            
                // Ejecute gravity in elements
            DinamicElements.filter((item)=>{return item.gravity.isEnabled ? item.gravity.isEnabled:false}).forEach((item)=>{
                item.position.y += item.gravity.speed;
            })  
    
            // Images are loaded and are draw, render new frame
            if(ImagesItems && this.renderIsEnabled){
                window.requestAnimationFrame(()=>{
                    this.renderElements.dinamic(DinamicElements);
                });
            }
    
        },

        static:(staticElements)=>{
            // Render static elements
            this.draw.blocks(staticElements)
        }

    }
    stopRender=()=>{
        window.cancelAnimationFrame(this.renderElements.dinamic);
    }


}