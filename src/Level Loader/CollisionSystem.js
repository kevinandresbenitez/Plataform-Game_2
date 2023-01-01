


module.exports = class SystemCollision{
    // System collision blocks items
    LevelMosaics;
    LevelMosaicsPosition;
    LevelMosaicsDistance;


    getCollisionableBlocksForPosition=(position)=>{
        // Get position mosaic actualy
        let firstMosaic;
        for(let i=0 ;i < SystemCollision.LevelMosaicsDistance.length;i++){
            if(i){
                if((position.x < SystemCollision.LevelMosaicsDistance[i])  && (position.x >= SystemCollision.LevelMosaicsDistance[i - 1])){
                    firstMosaic = i ;
                }
            }else{
                if(position.x < SystemCollision.LevelMosaicsDistance[i]){
                    firstMosaic = i ;
                }
            }    
            
        }
        
        // second 
        let SecondMosiac;
        if(firstMosaic == 0){
            SecondMosiac = 1
        }else if(firstMosaic == (SystemCollision.LevelMosaicsDistance.length - 1)){
            SecondMosiac = SystemCollision.LevelMosaicsDistance.length - 2
        }else{
            SecondMosiac = firstMosaic - 1;
        }


        // third
        let thirddMosiac;
        if(firstMosaic == 0){
            thirddMosiac = 2
        }else if(firstMosaic == (SystemCollision.LevelMosaicsDistance.length - 1)){
            thirddMosiac = SystemCollision.LevelMosaicsDistance.length - 3
        }else{
            thirddMosiac = firstMosaic + 1;
        }
        
        return [firstMosaic,SecondMosiac,thirddMosiac]
    }

    getCollisionBlocks(level){
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

    getCollisionBlocksLenght(level,type = false){
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
    }


    verify = {
        
        collisionBlockTop:(blocks)=>{
            return blocks.some((block)=>{
                return (this.position.y + this.height == block.y) && (this.position.x + this.width > block.x) && (this.position.x < block.x + block.lenght)
            })
        },

        collisionBlockBottom:(blocks)=>{
            return blocks.some((block)=>{
                return (this.position.y == block.y + block.lenght) && (this.position.x + this.width > block.x) && (this.position.x < block.x + block.lenght)
                
            })
        },

        collisionBlockRight:(blocks)=>{
            return blocks.some((block)=>{
                return (this.position.x == block.x + block.lenght) && (this.position.y < block.y + block.lenght) && ((this.position.y > block.y)||(this.position.y + this.height > block.y))
            })
        },

        collisionBlockLeft:(blocks)=>{
            return blocks.some((block)=>{
                return (this.position.x + this.width == block.x) && (this.position.y < block.y + block.lenght) && (this.position.y > block.y || this.position.y + this.height > block.y)
            })

        }

    }


    loadForLevel = (level)=>{
        console.log(Levels)
        this.LevelMosaics = this.getCollisionBlocks(level)
        this.LevelMosaicsDistance = this.getCollisionBlocksLenght(level,'distance')
    }

    enable = ()=>{console.log('Activando')}

    disable = ()=>{}

}