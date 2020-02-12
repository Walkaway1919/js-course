
  class DomElement {
    constructor(selector, height, width, bg, fontSize, position) {
      this.selector = selector;
      this.height = height;
      this.width = width;
      this.bg = bg;
      this.fontSize = fontSize;
      this.position = position;

      this.posY = 0;
      this.posX = 0;
    }
    createElement() {
      this.tempEl = document.createElement('div');
      if(this.selector[0] === '.'){
        this.tempEl.classList.add(this.selector.slice(1));
      }
      if(this.selector[0] === '#'){
        this.tempEl.id = this.selector.slice(1);
      }
      let tempCss = '';
      if(this.height){
        tempCss = tempCss + 'height: ' + this.height + 'px;'; 
      }
      if(this.width){
        tempCss += 'width: ' + this.width + 'px;';
      }
      if(this.bg){
        tempCss += 'background-color: ' + this.bg + ';';
      }
      if (this.fontSize){
        tempCss += 'font-size: ' + this.fontSize + 'px;';   
      }
      if(this.position){
        tempCss += 'position: ' + this.position + ';';
      }
      this.tempEl.style.cssText = tempCss;
      
      this.tempEl.innerHTML = 'а';
      document.querySelector('body').append(this.tempEl);
    } 

    move(event){
      if(event.key == 'ArrowRight'){
        this.posX += 10;
        this.tempEl.style.left = this.posX;
      }
      if(event.key == 'ArrowLeft'){
        this.posX -= 10;
        if( this.posX < 0 ){
          this.posX = 0;
          console.log( 'Остановитесь!!!!!!' );
        }
        this.tempEl.style.left = this.posX;
      }
      if(event.key == 'ArrowUp'){
        this.posY -= 10;
        if( this.posY < 0 ){
          this.posY = 0;
          console.log( 'Хватит!!!!!' );
        }
        this.tempEl.style.top = this.posY;
      }
      if(event.key == 'ArrowDown'){
        this.posY += 10;
        this.tempEl.style.top = this.posY;
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", function(event) {
    document.body.style.margin = 0;
    let test = new DomElement('#best' , 100, 100, 'red', 46, 'absolute');
    test.createElement();
  
    document.addEventListener('keydown', test.move.bind(test) );
    
});



