let Utils = require('../Utils/index.js');
let GetForLevel= require('../Utils/GetForLevel/index.js');
const Player = require('../Game Elements/Items/Player.js');
const levels = require('../Game Elements/Levels/index.js');


class LevelLoader{
    // location : location where the object will be worked , Required
    #location;
    #domElement;
    // Callback what return at level selector
    #exitToLevelSelector 

    // info from level
    #levelNumber
    #levelName

    #CanvasContainer;
    #CanvasStaticElements;
    #CanvasDinamicElements;

    // User-enemiest-blocks are loaded here
    #DinamicElements = [];
    #StaticElements = [];

    // Boleans
    #renderIsEnabled
    #gamePaused

    constructor(location = false , callbackFunction){
        if(!(location && Utils.existsDomElement(location))){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }
        this.#location = location;
        this.#domElement = Utils.createElementDom({className:'game-container keepRadioAspect',element:'div'});
        this.#exitToLevelSelector  = callbackFunction;
    }
    
    create(){
        this.location.appendChild(this.domElement);
    }
    
    delete(){
        this.location.removeChild(this.domElement);
    }

    get exitToLevelSelector(){
        return this.#exitToLevelSelector;
    }

    get levelNumber(){
        return this.#levelNumber;
    }
    set levelNumber(value){
        throw Error(('No cant set Level number , is loaded in loadlevel function') );
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

    set renderIsEnabled(value){
        this.#renderIsEnabled = value;
    }
    get renderIsEnabled(){
        return this.#renderIsEnabled;
    }

    get gamePaused(){
        return this.#gamePaused;
    }

    set gamePaused(value){
        this.#gamePaused  = value;
    }


    loadElements = {
        // Load elements for the lever and push in a globar var
        dinamic:(level)=>{
            // Load personajes - enemies for level
            this.#DinamicElements = GetForLevel.dinamicElements(level);
        },

        static:(level)=>{
            // Load blocks for level
            this.#StaticElements = GetForLevel.staticElements(level);
        },

        all:function(level){
            this.dinamic(level);
            this.static(level);
        }


    }

    loadLevelInfo=(level)=>{
        this.#levelNumber = level;
        this.#levelName = levels[level - 1].name;
    }
    

    loadLevel(level){
        // Set vars for level
        this.loadLevelInfo(level);
        // Load Elements for the level 
        this.loadElements.all(level);
        // create canvas for the game
        this.canvas.createForLevel(level);
        // Enable keys for config ,pase game ...
        this.KeysFromConfigGame.enable();

        // Start Game
        this.startGame();
    }


    startGame=()=>{
        // Set boleans game start
        this.gamePaused = false;
        this.renderIsEnabled =true;

        this.keysInDinamicElements.enable();
        this.colissionSystemInDinamicElements.enable();

        
        this.canvas.renderElements.dinamic();
        this.canvas.renderElements.static();        
    }

    stopGame =()=>{
        // verify of the game is run 
        this.gamePaused = true;
        this.renderIsEnabled = false;
        
        this.keysInDinamicElements.disable();
        this.canvas.stopRender();
     
    }

    // keys from pause game, return level loader
    KeysFromConfigGame={
        enable:()=>{
            document.addEventListener('keydown',this.KeysFromConfigGame.runEvent)
        },

        disable:()=>{
            document.removeEventListener('keydown',this.KeysFromConfigGame.runEvent)
        },

        runEvent:(e)=>{
            // Exit from game key 
            if(e.key == 'Escape'){
                this.stopGame();
                this.delete();
                this.KeysFromConfigGame.disable();
                this.exitToLevelSelector();
            }

            
            // Pasue game key
            if(e.key == 'p'){
                if(this.gamePaused){
                    this.startGame();
                } else{
                    this.stopGame();
                }
            }
        }




    }
    // Keys from the user or other elements dinamics
    keysInDinamicElements ={

        disable:()=>{
            // Enable moviment and keys in dinamic elemnts
            this.#DinamicElements.forEach((element)=>{
                // If is a player enable keys
                if(element instanceof Player){
                    element.DisableKeys();
                }
            })
        },

        enable:()=>{
            // Enable moviment and keys in dinamic elemnts
            this.#DinamicElements.forEach((element)=>{
                // If is a player enable keys
                if(element instanceof Player){
                    element.EnableKeys();
                    
                }
            })
        }
    }

    colissionSystemInDinamicElements={
        disable:()=>{},

        enable:()=>{
                // Enable Collision system
            this.#DinamicElements.forEach((element)=>{
                // If is a player enable keys
                if(element instanceof Player){
                    element.loadColisionSystem(GetForLevel.collisionBlocks(this.levelNumber),GetForLevel.collisionBlocksLenght(this.levelNumber,'distance') );
                }
            })
        }
    }
    
    canvas = {
        createForLevel:(level)=>{
            // add canvas elements
            this.#CanvasContainer =Utils.createElementDom({className:'canvas-container keepRadioAspect',element:'div'});
            this.#CanvasStaticElements =Utils.createElementDom({className:'canvas-StaticElements',element:'canvas'});
            this.#CanvasDinamicElements =Utils.createElementDom({className:'canvas-DinamicElements',element:'canvas'});
            
            
            // add dimentions for the container
            this.#CanvasContainer.style.width =GetForLevel.widthCanvas(level) + "px";
            // add dimentions for the canvas
            this.#CanvasStaticElements.width =GetForLevel.widthCanvas(level);
            this.#CanvasStaticElements.height =900;
            
            this.#CanvasDinamicElements.width =GetForLevel.widthCanvas(level);
            this.#CanvasDinamicElements.height =900;
    
            //Add elements in the dom
            this.#CanvasContainer.appendChild(this.#CanvasStaticElements);
            this.#CanvasContainer.appendChild(this.#CanvasDinamicElements);
            this.#domElement.appendChild(this.#CanvasContainer);
            //Resize window
            Utils.resizeWindow();
        },

        delete:()=>{
            this.#CanvasContainer.removeChild(this.#CanvasDinamicElements);
            this.#CanvasContainer.removeChild(this.#CanvasStaticElements);
        },

        clear:{
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
        },

        draw:{
            blocks:(Blocks)=>{
                // draw Allblocks
                let canvasContext = this.CanvasStaticElements.getContext('2d');
                // Clear canvas Static
                this.canvas.clear.staticElements();

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
                this.canvas.clear.dinamicElements();

                // Draw Images
                Images.forEach((item)=>{
                    ContextCanvas.drawImage(item.imagen,item.position.x,item.position.y,item.width,item.height);
                })
            }
        },

        renderElements:{

            dinamic:async()=>{

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
        
                // draw Images
                this.canvas.draw.images(ImagesItems);
                
                    // Ejecute gravity in elements
                this.#DinamicElements.filter((item)=>{return item.gravity.isEnabled ? item.gravity.isEnabled:false}).forEach((item)=>{
                    item.position.y += item.gravity.speed;
                })  
        
                // Images are loaded and are draw, render new frame
                if(ImagesItems && this.renderIsEnabled){
                    window.requestAnimationFrame(this.canvas.renderElements.dinamic);
                }
        
            },
    
            static:()=>{
                // Render static elements
                this.canvas.draw.blocks(this.#StaticElements)
            }
    
        },

        stopRender:()=>{
            window.cancelAnimationFrame(this.canvas.renderElements.dinamic);
        }
    }

}

module.exports = LevelLoader