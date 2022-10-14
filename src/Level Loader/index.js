let Utils = require('../Utils/index.js');
let GetForLevel= require('../Utils/GetForLevel/index.js');
const Player = require('../Game Elements/Items/Player.js');
const levels = require('../Game Elements/Levels/index.js');
const CanvasGame = require('../Utils/class/CanvasGame/index.js');




class LevelLoader{
    // location : location where the object will be worked , Required
    #location;
    #domElement;
    #Canvas
    // Callback what return at level selector
    #exitToLevelSelector 

    // info from level
    #levelNumber
    #levelName

    // User-enemiest-blocks are loaded here
    #DinamicElements = [];
    #StaticElements = [];

    // Boleans
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
        // Create canvas manajer
        this.#Canvas = new CanvasGame(this.domElement);
    }
    
    delete(){
        this.location.removeChild(this.domElement);
        this.#Canvas.delete();
        
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


    get location (){
        return this.#location;
    }

    get domElement(){
        return this.#domElement;
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
        // verify level exist
        if(!(levels[level - 1])){
            throw new Error('Level not exist');
        }

        // Stop Game Previus
        this.stopGame();

        // Delete canvas if exist and create new
        this.#Canvas.deleteCanvas();
        this.#Canvas.createCanvasForLevel(level);
        
        // Load level info
        this.loadLevelInfo(level);
        this.loadElements.all(level);

        
        // Start game 
        this.startGame();
    }

    

    startGame=()=>{
        // Set boleans game start
        this.gamePaused = false;
        

        this.keysInDinamicElements.enable();
        this.KeysFromConfigGame.enable();
        this.colissionSystemInDinamicElements.enable();

        // Load elements in canvas
        this.#Canvas.renderIsEnabled =true;
        this.#Canvas.renderElements.static(this.#StaticElements);
        this.#Canvas.renderElements.dinamic(this.#DinamicElements);
    }

    stopGame =()=>{
        // verify of the game is run 
        this.gamePaused = true;
        this.#Canvas.renderIsEnabled =false;
        
        this.keysInDinamicElements.disable();
        this.#Canvas.stopRender();
     
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

            // Load next level Test
            if(e.key == 'k'){
                this.loadLevel(1);
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
    



}

module.exports = LevelLoader