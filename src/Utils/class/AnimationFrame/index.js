module.exports = class AnimationFrame{
    count = 0;
    frame = 0;

    arrayImg;
    interval;

    constructor(arrayImg,interval){
        this.arrayImg = arrayImg;
        this.interval = interval;
    }

    getImgFrame=()=>{
         
        // Image
        let img = new Image();
        img.src = this.arrayImg[this.frame];
        
        //Count
        if(this.count == this.interval){
            this.count= 0;
    
            if(this.frame == (this.arrayImg.length - 1)){
                this.frame = 0
            }else{
                this.frame +=1;
            }
        }else{
            this.count+=1;
        }

        // before img is loaded return img
        return new Promise((resolve,reject)=>{
            resolve(img);
        })
    
    }
}