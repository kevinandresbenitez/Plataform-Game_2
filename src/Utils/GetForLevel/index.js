let Levels = require('../../Game Elements/Levels/index.js');
let Blocks = require('../../Game Elements/Blocks/index.js');

module.exports ={
    widthCanvas:function(level){
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
    blocks:function(level){
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

    },
    // from the blocks get collisionables blocks
    collisionBlocks:function(level){
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
    },
    // get width of Mosaic collisionBlocks
    collisionBlocksLenght:function(level,type = false){
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

    dinamicElements:function (level){
        // verify level exist
        if(!(Levels[level - 1])){
            throw new Error('Level not exist');
        }
        
        return (Levels[level - 1].elements);
    },
    staticElements:function (level){
        return this.blocks(level);
    }
}