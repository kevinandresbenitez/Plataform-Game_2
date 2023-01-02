import {Levels} from '../../Game Elements/Levels/index.js';
import {NoSolidBlock,SolidBlock} from '../../Game Elements/Blocks/index.js';
import { Player } from '../../Level Loader/Player.js';

const getForLevel = {
    widthCanvas:(level)=>{
        // verify level exist
        if(!(Levels[level - 1])){
            throw new Error('Level not exist');
        }
    
        // Get blocks count for width level
        let count=0;
        Levels[level -1 ].level.forEach((mosaic)=>{
            count +=mosaic[0].length;
        })
    
        return count * 40;
    },
    // from the matriz of level return blocks
    blocks:(level)=>{
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
                        Mosaic.push(new SolidBlock(x,y,40));
                    }
                    
                    // No solid block
                    if(item == 2){
                        Mosaic.push(new noSolidBlock(x,y,40));
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
    
    },

    // from the blocks get collisionables blocks
    collisionBlocks:(level)=>{
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
                        Mosaic.push(new SolidBlock(x,y,40));
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
    },

    // get width of Mosaic collisionBlocks
    collisionBlocksLenght:(level,type = false)=>{
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
    
    
    let sumaAnterior = [];
    if(type == 'distance'){
        for(let i = 1 ; i <= Mosaic.length;i++){
                sumaAnterior.push(Mosaic.filter((object,index)=>{
                    if(index < i){
                        return true
                    }
                }).reduce((a,b)=>{return a+b}))
        }
    
        return sumaAnterior
    }
    
    
    
    return Mosaic;
    },
    
    dinamicElements :(level,UserDirection = 'startPosition')=>{
        // verify level exist
        if(!(Levels[level - 1])){
            throw new Error('Level not exist');
        }
        // verify level exist have elements
        if(!(Levels[level - 1].elements)){
            throw new Error('Level not have elements');
        }
    
        let ObjectKeys = Object.keys(Levels[level - 1]);
        let ObjectValues = Object.values(Levels[level - 1]);
    
        let ElementsInGame = ObjectValues[ObjectKeys.indexOf('elements')];
        let PositionFromTheUser =ObjectValues[ObjectKeys.indexOf('userPositions')][UserDirection];
        let User = new Player(JSON.parse(JSON.stringify(PositionFromTheUser)));
    
    
    
        return [User,...ElementsInGame];
    },    
    
    staticElements:function (level){
        return this.blocks(level);
    }

}




export {getForLevel}