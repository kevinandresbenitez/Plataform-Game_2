module.exports = class Utils{
    static createElementDom = (props)=>{
      // Verifycation if props exist
      if(!(props)){
        return false;
      }

      // Verification typedate
      if(!(typeof props == 'object')){
        return false;
      }

      // If element type is not defined
      if(!(props.element)){
        return false
      }


      let {className,id,style,element,onClick} = props;
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

      // Add function  if exist
      if(onClick){
        newElement.onclick = ()=>{props.onClick()};
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

    // function from windows default class 'keepRadioAspect'
    static resizeWindow(){
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
}