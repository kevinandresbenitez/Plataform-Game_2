module.exports = class Utils{
    static createElementDom = (props)=>{
      let {className,id,style,img,element} = props;
      let newElement =document.createElement(element);
  
      // Set Classname split string
      className= className ?
      className.split(" ").forEach((obj,key)=>{
        newElement.classList.add(obj)
      }):false;

      // Set id
      if(id){
        newElement.id = id 
      }

      
  
      //If have style object , separate keys and values and set in the new element
      if(style){
        let styleKeys =Object.keys(style);
        let styleValues =Object.values(style);
        for (let sec =0;styleKeys.length > sec ;sec++) {
          newElement.style[styleKeys[sec]]=styleValues[sec];
        }
      }
  
      return newElement
    }

    static existsDomElement=(element)=>{
      return (this.isDomElement(element) && document.contains(element));
    }

    static isDomElement(element){
      return (typeof element === "object");
    }
}


// function from windows default class 'keepRadioAspect'
function resizeWindow(event){
  let heightWindow = window.innerHeight;
  let widthWindow = window.innerWidth;
  let containers = document.querySelectorAll('.keepRadioAspect');

  containers.forEach((container)=>{
    if((widthWindow / heightWindow) > 1.768){
      container.style.width = 'auto';
      container.style.height ='100%';
    }else{
      container.style.width = '100%';
      container.style.height ='auto';
    }
  })
  
}

window.addEventListener('resize',(event)=>{resizeWindow(event)})