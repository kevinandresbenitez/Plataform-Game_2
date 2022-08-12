let blockImg = require('../../public/images/Blocks/Block.png');

class Block{
    constructor(x,y,lenght){
        this.x =x;
        this.y =y;
    }
}

class SolidBlock extends Block{
    constructor(x,y,lenght){
        super(x,y,lenght);
        this.img = blockImg;
    }
}

class NoSolidBlock extends Block{
    constructor(x,y,lenght){
        super(x,y,lenght);
        this.img = blockImg;
    }
}

module.exports={SolidBlock,NoSolidBlock}