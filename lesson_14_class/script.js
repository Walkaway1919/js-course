
class DomElement {
  constructor(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
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
    this.tempEl.style.cssText = tempCss;

    this.tempEl.innerHTML = 'а';
    document.querySelector('body').append(this.tempEl);
  }
  
}

let test = new DomElement('#best' , 100, 100, 'red', 46);

test.createElement();



