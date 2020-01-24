let num = 266219;
num = num.toString().split('').reduce((a,b)=>a*b);
num = num ** 3;
console.log(num.toString().slice(0, 2));

