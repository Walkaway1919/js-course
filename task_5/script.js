const arr = ['12345', '2345', '3456', '455', '45556', '788655', '23',];
const newArr = arr.filter(num => num[0] === '2' || num[0] === '4');
console.log(newArr);

//первый вариант
function printNumber(i = 1){
  checkDevisior( i );
  if( i < 100 ) {
    printNumber(++i);
  } else {
    return false;
  }
}
printNumber();

function checkDevisior( i ){
  for( let d = 2; d < i; d++ ){
    if( i % d === 0 ) {
      return false;
    }
  }
  console.log(`${i} Делители этого числа: 1 и ${i}`)
}

//второй вариант
let n = 100;

nextPrime:
for (let i2 = 2; i2 <= n; i2++) {
  for (let d2 = 2; d2 < i2; d2++) {
    if (i2 % d2 == 0) continue nextPrime;
  }
  console.log(`${i2} Делители этого числа: 1 и ${i2}`); 
};