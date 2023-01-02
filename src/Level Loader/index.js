import {existsDomElement,createElementDom} from '../Utils/domElementsHelper/index.js';
import {getForLevel} from '../Utils/getForLevel/index.js';
import { Player } from './Player.js';
import { Levels } from '../Game Elements/Levels/index.js';
import { CanvasGame } from './Canvas.js';
import { Gravity } from './Gravity.js';
import { SystemCollision } from './CollisionSystem.js';



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
        if(!(location && existsDomElement(location))){
            throw new Error("Error in the constructor Menu,'location' not found or does not exist");
        }
        this.#location = location;
        this.#domElement = createElementDom({className:'game-container keepRadioAspect',element:'div'});
        this.#exitToLevelSelector  = callbackFunction;
        this.Gravity = new Gravity();
        this.SystemCollision = new SystemCollision();
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
            this.#DinamicElements = getForLevel.dinamicElements(level);
        },

        static:(level)=>{
            // Load blocks for level
            this.#StaticElements = getForLevel.staticElements(level);
        },

        all:function(level){
            this.dinamic(level);
            this.static(level);
        }


    }

    loadLevelInfo=(level)=>{
        this.#levelNumber = level;
        this.#levelName = Levels[level - 1].name;
    }
    

    loadLevel(level){
        // verify level exist
        if(!(Levels[level - 1])){
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
        this.SystemCollision.loadForLevel(level)
        
        // Start game 
        this.startGame();
    }

    

    startGame=()=>{
        // for pause bottom
        this.gamePaused = false;
        

        this.keysInDinamicElements.enable();
        this.KeysFromConfigGame.enable();
        this.colissionSystemInDinamicElements.enable();
        this.gravitySystemInDinamicElements.enable();
        this.RenderSystemInElements.enable();
        
    }

    stopGame =()=>{
        // for pause bottom
        this.gamePaused = true;
        
        this.keysInDinamicElements.disable();
        this.gravitySystemInDinamicElements.disable();
        this.RenderSystemInElements.disable();
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
        disable:()=>{
            this.SystemCollision.disable();
        },

        enable:()=>{
            this.SystemCollision.enable();
        }
    }
    
    gravitySystemInDinamicElements={
        disable:()=>{
            this.Gravity.disable();
        },

        enable:()=>{
            this.Gravity.enable();
        }
    }
    
    RenderSystemInElements={
        disable:()=>{
            this.#Canvas.renderIsEnabled =false;
            this.#Canvas.stopRender();
        },

        enable:()=>{
            // Load elements in canvas
            this.#Canvas.renderIsEnabled =true;
            this.#Canvas.renderElements.static(this.getStaticElementsFromBlocks(this.#StaticElements));
            this.#Canvas.renderElements.dinamic(this.#DinamicElements);
        }


    }

    


    getStaticElementsFromBlocks(blocs){
        let staticElements =[];

        blocs.forEach((mosaic)=>{
            return mosaic.forEach((item)=>{
                staticElements.push(item);
            })
        });

        return staticElements;
    }



}

export {LevelLoader}