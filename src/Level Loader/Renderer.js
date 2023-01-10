class Renderer { 
    #IsEnabled;
    #Canvas;

    constructor(Canvas){
        this.#Canvas = Canvas;
    }

    async getFramesForDinamicElements(DinamicElements){
        return await Promise.all(
            DinamicElements.map((item)=>{return item.getFrame()})
        );   
    }


    async getFramesForStaticElements(StaticElements){
        return await Promise.all(
            StaticElements.map((item)=>{return item.getFrame()})
        );
    }


    renderElements={

        dinamic:async(DinamicElements)=>{

                // Get frames for all dinamic elements
            let FramesDinamicItems = await this.getFramesForDinamicElements(DinamicElements);

            // draw Images on load 
            this.#Canvas.drawFrames.dinamic(FramesDinamicItems);
            
    
            // Images are loaded and are draw, render new frame
            if(FramesDinamicItems && this.IsEnabled){
                window.requestAnimationFrame(()=>{
                    this.renderElements.dinamic(DinamicElements);
                });
            }
    
        },

        static:async (staticElements)=>{
            let framesForStaticElements =await this.getFramesForStaticElements(staticElements);

            // Render static elements
            this.#Canvas.drawFrames.static(framesForStaticElements)
        }

    }

    disable(){
        this.IsEnabled = false ;
        window.cancelAnimationFrame(this.renderElements.dinamic);
    }

    enable(){
        this.IsEnabled = true ;
    }



}

export {Renderer} 