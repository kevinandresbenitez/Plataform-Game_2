import { Levels } from "../Game Elements/Levels";
import { SolidBlock } from "../Game Elements/Blocks";

class SystemCollision{
    // System collision blocks items
    static LevelMosaics;
    static LevelMosaicsPosition;
    static LevelMosaicsDistance;


    static getCollisionableBlocksForPosition=(position)=>{
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

    static getCollisionBlocks(level){
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
    }

    static getCollisionBlocksLenght(level,type = false){
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

    static verify = {
        
        collisionBlockTop:(dinamicElement)=>{
            let [firstMosaic,secondMosaic,thirdMosaic] = SystemCollision.getCollisionableBlocksForPosition(dinamicElement.position);
            
            let verificationFirstMosaic = this.LevelMosaics[firstMosaic].some((block)=>{
                return (dinamicElement.position.y + dinamicElement.height == block.y) && (dinamicElement.position.x + dinamicElement.width > block.x) && (dinamicElement.position.x < block.x + block.lenght)
            })

            let verificationSecondMosaic = this.LevelMosaics[secondMosaic].some((block)=>{
                return (dinamicElement.position.y + dinamicElement.height == block.y) && (dinamicElement.position.x + dinamicElement.width > block.x) && (dinamicElement.position.x < block.x + block.lenght)
            })

            let verificationThirdMosaic = this.LevelMosaics[thirdMosaic].some((block)=>{
                return (dinamicElement.position.y + dinamicElement.height == block.y) && (dinamicElement.position.x + dinamicElement.width > block.x) && (dinamicElement.position.x < block.x + block.lenght)
            })

            return (verificationFirstMosaic || verificationSecondMosaic || verificationThirdMosaic)
        },

        collisionBlockBottom:(dinamicElement)=>{
            let [firstMosaic,secondMosaic,thirdMosaic] = SystemCollision.getCollisionableBlocksForPosition(dinamicElement.position);
            
            let verificationFirstMosaic = this.LevelMosaics[firstMosaic].some((block)=>{
                return (dinamicElement.position.y == block.y + block.lenght) && (dinamicElement.position.x + dinamicElement.width > block.x) && (dinamicElement.position.x < block.x + block.lenght)
            })

            let verificationSecondMosaic = this.LevelMosaics[secondMosaic].some((block)=>{
                return (dinamicElement.position.y == block.y + block.lenght) && (dinamicElement.position.x + dinamicElement.width > block.x) && (dinamicElement.position.x < block.x + block.lenght)
            })

            let verificationThirdMosaic = this.LevelMosaics[thirdMosaic].some((block)=>{
                return (dinamicElement.position.y == block.y + block.lenght) && (dinamicElement.position.x + dinamicElement.width > block.x) && (dinamicElement.position.x < block.x + block.lenght)
            })

            return (verificationFirstMosaic || verificationSecondMosaic || verificationThirdMosaic)
        },

        collisionBlockRight:(dinamicElement)=>{
            let [firstMosaic,secondMosaic,thirdMosaic] = SystemCollision.getCollisionableBlocksForPosition(dinamicElement.position);
            
            let verificationFirstMosaic = this.LevelMosaics[firstMosaic].some((block)=>{
                return (dinamicElement.position.x == block.x + block.lenght) && (dinamicElement.position.y < block.y + block.lenght) && ((dinamicElement.position.y > block.y)||(dinamicElement.position.y + dinamicElement.height > block.y))
            })

            let verificationSecondMosaic = this.LevelMosaics[secondMosaic].some((block)=>{
                return (dinamicElement.position.x == block.x + block.lenght) && (dinamicElement.position.y < block.y + block.lenght) && ((dinamicElement.position.y > block.y)||(dinamicElement.position.y + dinamicElement.height > block.y))
            })

            let verificationThirdMosaic = this.LevelMosaics[thirdMosaic].some((block)=>{
                return (dinamicElement.position.x == block.x + block.lenght) && (dinamicElement.position.y < block.y + block.lenght) && ((dinamicElement.position.y > block.y)||(dinamicElement.position.y + dinamicElement.height > block.y))
            })

            return (verificationFirstMosaic || verificationSecondMosaic || verificationThirdMosaic)
        },

        collisionBlockLeft:(dinamicElement)=>{
            let [firstMosaic,secondMosaic,thirdMosaic] = SystemCollision.getCollisionableBlocksForPosition(dinamicElement.position);
            
            let verificationFirstMosaic = this.LevelMosaics[firstMosaic].some((block)=>{
                return (dinamicElement.position.x + dinamicElement.width == block.x) && (dinamicElement.position.y < block.y + block.lenght) && (dinamicElement.position.y > block.y || dinamicElement.position.y + dinamicElement.height > block.y)
            })

            let verificationSecondMosaic = this.LevelMosaics[secondMosaic].some((block)=>{
               return (dinamicElement.position.x + dinamicElement.width == block.x) && (dinamicElement.position.y < block.y + block.lenght) && (dinamicElement.position.y > block.y || dinamicElement.position.y + dinamicElement.height > block.y)
            })

            let verificationThirdMosaic = this.LevelMosaics[thirdMosaic].some((block)=>{
                return (dinamicElement.position.x + dinamicElement.width == block.x) && (dinamicElement.position.y < block.y + block.lenght) && (dinamicElement.position.y > block.y || dinamicElement.position.y + dinamicElement.height > block.y)
            })

            return (verificationFirstMosaic || verificationSecondMosaic || verificationThirdMosaic)
        }

    }


    loadForLevel = (level)=>{
        SystemCollision.LevelMosaics = SystemCollision.getCollisionBlocks(level)
        SystemCollision.LevelMosaicsDistance = SystemCollision.getCollisionBlocksLenght(level,'distance')
    }

    enable = ()=>{console.log('Activando')}

    disable = ()=>{}

}

export {SystemCollision}