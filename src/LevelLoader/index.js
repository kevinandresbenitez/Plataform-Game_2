let Utils = require('../Utils/index.js');
let Levels = require ('../Levels/index.js');
let Blocks = require('../Blocks/index.js');


class LevelLoader{
    // location : location where the object will be worked , Required
    #location;
    #domElement;
    #CanvasContainer;
    #CanvasScene;

    constructor(props){
        let {location} = props || false;
        if(!location || !Utils.existsDomElement(location)){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }
        this.#location = props.location;
        this.#domElement = Utils.createElementDom({className:'game-container keepRadioAspect',element:'div'});


        // add canvas elements
        this.#CanvasContainer =Utils.createElementDom({className:'canvas-container',element:'div'})
        this.#CanvasScene =Utils.createElementDom({className:'canvas-Scene keepRadioAspect',element:'canvas'});
        this.#CanvasContainer.appendChild(this.#CanvasScene);
        
        this.#CanvasScene.width =window.innerWidth;
        this.#CanvasScene.height =window.innerHeight;

        this.#domElement.appendChild(this.#CanvasContainer);
    }
    
    create(){
        this.location.appendChild(this.domElement);
    }

    get CanvasScene(){
        return this.#CanvasScene;
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
                    x += 40;
                })

                x=0;
                y += 40;
            })
            
            allBlocks.push(Mosaic);
            Mosaic =[];
            MosaicX = mosaic[0].length * 40;
        })

        return allBlocks;

    }

    drawBlocks(Blocks){
        // draw Allblocks
        let canvasContext = this.CanvasScene.getContext('2d');
        console.log(Blocks)   

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

}

module.exports = LevelLoader