let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'пособие по безработице',
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    mission = 120000,
    period = 5;


let start = function(){
  do {
    money = prompt ('Ваш месячный доход?');
  }while(!isNumber(money));
};

start();

let showTypeOf = function(data){
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1, expenses2;

console.log('Возможные расходы ' + addExpenses.toLowerCase().split(', '));


let getExpensesMonth = function(){
  let sum = 0;
  for (let i = 0; i < 2; i++){
    if(i===0){
      expenses1 = prompt('Введите обязательную статью расходов?');
    } else if (i === 1){
      expenses2 = prompt('Введите обязательную статью расходов?');
    }
    do {
      temp = prompt ('Во сколько это обойдется?');
    }while(!isNumber(temp));
    sum += temp;
  };
  console.log(sum);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц ' + expensesAmount);

let getAccumulatedMonth = function(){
  return parseInt(money) - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(){
  return mission / accumulatedMonth;
};

let budgetDay = (Math.floor(accumulatedMonth / 30));
console.log('Бюджет на день ' + budgetDay);

let getStatusIncome = function(){
  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что-то пошло не так');
  }
};
getStatusIncome();
if (getTargetMonth() >0 ){
  console.log('Цель будет достигнута через ' + Math.ceil(getTargetMonth()) + ' месяцев');
  
} else {
  console.log('Цель не будет достигнута');
}