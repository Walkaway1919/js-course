let button = document.getElementById('change');
let back = document.body;
let heading = document.getElementById('color');


function get_random_color() {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); 
  }
  return "#"+c()+c()+c();
}

clickColor = function() {
    let a = get_random_color();
    back.style.backgroundColor = a;
    heading.innerHTML = a;
  };

  button.addEventListener("click", clickColor); 
 
