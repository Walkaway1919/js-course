let money = prompt ('Ваш месячный доход?', 50000),
    income = 'пособие по безработице',
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    mission = 120000,
    period = 5;

let showTypeOf = function(data){
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1 = prompt ('Введите обязательную статью расходов?', 'бензин'),
    amount1 = prompt ('Во сколько это обойдется?', 5000),
    expenses2 = prompt ('Введите обязательную статью расходов?', 'телефон'),
    amount2 = prompt ('Во сколько это обойдется?', 200);

console.log('Возможные расходы ' + addExpenses.toLowerCase().split(', '));


let getExpensesMonth = function(){
  return parseInt(amount1) + parseInt(amount2);
}

console.log('Расходы за месяц ' + getExpensesMonth());

let getAccumulatedMonth = function(){
  return parseInt(money) - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(){
  return mission / accumulatedMonth;
}

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
console.log('Цель будет достигнута через ' + Math.ceil(getTargetMonth()) + ' месяцев');
