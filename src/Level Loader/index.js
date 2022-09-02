let Utils = require('../Utils/index.js');
let Levels = require ('../Game Elements/Levels/index.js');
let Blocks = require('../Game Elements/Blocks/index.js');


class LevelLoader{
    // location : location where the object will be worked , Required
    #location;
    #domElement;
    #CanvasContainer;
    #CanvasStaticElements;
    #CanvasDinamicElements;

    // User-enemiest-blocks are loaded here
    #DinamicElements = [];
    #StaticElements = [];

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
        // Load Elements for the level
        this.loadDinamcElementsForLevel(level);
        this.loadStaticElementsForLevel(level);

        // Create the canvas static and dinamic ;
        this.createCanvasForLevel(level);

        // create Level
        this.renderStaticElements();
        this.renderDinamicElements();
    }

    getDinamicElementsForLevel=(level)=>{
        // verify level exist
        if(!(Levels[level - 1])){
            throw new Error('Level not exist');
        }
        
        return (Levels[level - 1].elements);
    }

    // Load elements for the lever and push in a globar var
    loadDinamcElementsForLevel=(level)=>{
        // Load personajes - enemies for level
        this.#DinamicElements = Object.values(this.getDinamicElementsForLevel(level));
    }
    loadStaticElementsForLevel=(level)=>{
        // Load blocks for level
        this.#StaticElements = this.getBlocksForLevel(level);
    }

    // Draw elements in canvas static and dinamic
    renderStaticElements=()=>{
        // Render static elements
        this.drawBlocks(this.#StaticElements);
    }
    renderDinamicElements= async ()=>{
        let ContextCanvas = this.CanvasDinamicElements.getContext('2d');
        ContextCanvas.clearRect(0, 0,1600,900);

            // Get Dinamic images for render
        let ImagesItems = await Promise.all(    
            this.#DinamicElements.map(async(Item)=>{
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

            // Draw Images
        ImagesItems.forEach((item)=>{
            ContextCanvas.drawImage(item.imagen,item.position.x,item.position.y,item.width,item.height);
        })
        
            // Ejecute gravity in elements
        this.#DinamicElements.filter((item)=>{return item.gravity ? item.gravity:false}).forEach((item)=>{
            item.position.y += item.getGravity;
        })  


        // Images are loaded and are draw, render new frame
        if(ImagesItems){
            window.requestAnimationFrame(this.renderDinamicElements);
        }

    }
}

module.exports = LevelLoader