function resizeWindow(){
    let heightWindow = window.innerHeight;
    let widthWindow = window.innerWidth;
    let containers = document.querySelectorAll('.keepRadioAspect');
  
    containers.forEach((container)=>{
      if((widthWindow / heightWindow) > 1.768){
        container.style.width = 'auto';
        container.style.height =window.innerHeight + 'px';
      }else{
        container.style.width = '100%';
        container.style.height ='auto';
      }
    })
    
}

export {resizeWindow}