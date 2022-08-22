let Utils = require('../Utils/index.js');
let Levels = require ('../Levels/index.js');
let Blocks = require('../Blocks/index.js');


class LevelLoader{
    // location : location where the object will be worked , Required
    #location;
    #domElement;
    #CanvasContainer;
    #CanvasStaticElements;
    #CanvasDinamicElements;

    constructor(props){
        let {location} = props || false;
        if(!location || !Utils.existsDomElement(location)){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }
        this.#location = props.location;
        this.#domElement = Utils.createElementDom({className:'game-container keepRadioAspect',element:'div'});
    }
    
    create(){
        this.location.appendChild(this.domElement);
    }

    createCanvasForLevel(level){

        // add canvas elements
        this.#CanvasContainer =Utils.createElementDom({className:'canvas-container keepRadioAspect',element:'div'});
        this.#CanvasStaticElements =Utils.createElementDom({className:'canvas-StaticElements',element:'canvas'});
        this.#CanvasDinamicElements =Utils.createElementDom({className:'canvas-DinamicElements',element:'canvas'});
        
        
        // add dimentions for the container
        this.#CanvasContainer.style.width =this.getLenghtForLevel(level) * 40 + "px";
        // add dimentions for the canvas
        this.#CanvasStaticElements.width =this.getLenghtForLevel(level) * 40;
        this.#CanvasStaticElements.height =900;
        
        this.#CanvasDinamicElements.width =this.getLenghtForLevel(level) * 40;
        this.#CanvasDinamicElements.height =900;

        //Add elements in the dom
        this.#CanvasContainer.appendChild(this.#CanvasStaticElements);
        this.#CanvasContainer.appendChild(this.#CanvasDinamicElements);
        this.#domElement.appendChild(this.#CanvasContainer);
        //Resize window
        Utils.resizeWindow();
    }


    get CanvasStaticElements(){
        return this.#CanvasStaticElements;
    }

    get CanvasDinamicElements(){
        return this.#CanvasDinamicElements;
    }

    get location (){
        return this.#location;
    }

    get domElement(){
        return this.#domElement;
    }

    getBlocksForLevel(level){
        // verify level exist
        if(!(Levels[level - 1])){
            throw new Error('Level not exist');
        }


        let allBlocks = [];
        let Mosaic =[];

        // Foreach mosaics
        let MosaicX = 0;
        Levels[level-1].level.forEach((mosaic)=>{
            let y =0;
            
            mosaic.forEach((fila)=>{
                let x = MosaicX;
                fila.forEach((item)=>{
                    // Solid block
                    if(item == 1){
                        Mosaic.push(new Blocks.SolidBlock(x,y,40));
                    }
                    
                    // No solid block
                    if(item == 2){
                        Mosaic.push(new Blocks.NoSolidBlock(x,y,40));
                    }

                    x += 40;
                })        
                x=0;
                y += 40;
            })
            
            allBlocks.push(Mosaic);
            Mosaic =[];
            MosaicX += mosaic[0].length * 40;
        })

        return allBlocks;

    }

    getCollisionBlocksForLevel(level){
        // verify level exist
        if(!(Levels[level - 1])){
            throw new Error('Level not exist');
        }



        let allBlocks = [];
        let Mosaic =[];

        // Foreach mosaics
        let MosaicX = 0;
        Levels[level-1].level.forEach((mosaic)=>{
            let y =0;
            
            mosaic.forEach((fila)=>{
                let x = MosaicX;
                fila.forEach((item)=>{
                    // Solid block
                    if(item == 1){
                        Mosaic.push(new Blocks.SolidBlock(x,y,40));
                    }
                    
                    x += 40;
                })

                x=0;
                y += 40;
            })
            
            allBlocks.push(Mosaic);
            Mosaic =[];
            MosaicX += mosaic[0].length * 40;
        })

        return allBlocks;
    }

    getCollisionMosaicLenghtsForLevel(level){
    // verify level exist
    if(!(Levels[level - 1])){
        throw new Error('Level not exist');
    }

    let Mosaic =[];

    // Foreach mosaics
    let x= 0;
    Levels[level-1].level.forEach((mosaic)=>{
        mosaic.forEach((fila)=>{
            x = fila.length * 40 ;
        })
        Mosaic.push(x);
        x=0;
    })

    return Mosaic;
    }

    getLenghtForLevel(level){
        // verify level exist
        if(!(Levels[level - 1])){
            throw new Error('Level not exist');
        }

        let count=0;
        Levels[level -1 ].level.forEach((mosaic)=>{
            count +=mosaic[0].length;
        })

        return count;
    }

    drawBlocks(Blocks){
        // draw Allblocks
        let canvasContext = this.CanvasStaticElements.getContext('2d');

        Blocks.forEach((mosaic)=>{

            mosaic.forEach((block)=>{
                let img = new Image();
                img.src = block.img;
                img.addEventListener('load',()=>{
                    canvasContext.drawImage(img,block.x,block.y,40,40)
                })
            })
            
            
        })

    }


    loadLevel(level){
        // create Level
        this.createCanvasForLevel(level);
        this.drawBlocks(this.getBlocksForLevel(level));
    }
}

module.exports = LevelLoader