let money = prompt ('Ваш месячный доход?'),
    income = 'пособие по безработице',
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 5,
    expenses1 = prompt ('Введите обязательную статью расходов?'),
    amount1 = prompt ('Во сколько это обойдется?'),
    expenses2 = prompt ('Введите обязательную статью расходов?'),
    amount2 = prompt ('Во сколько это обойдется?'),
    budgetMonth = (money - amount1 - amount2);
console.log(budgetMonth);
console.log(Math.ceil(mission / budgetMonth));
let budgetDay = (Math.floor(budgetMonth / 30));
console.log(budgetDay);
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('"Период равен ' + period + ' месяцев"');
console.log('"Цель заработать ' + mission + ' рублей"');
console.log(addExpenses.toLowerCase().split(', '));
console.log(money);
console.log(addExpenses);
console.log(deposit);


if (budgetDay >= 1200) {
  alert('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
  alert('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
  alert('К сожалению у вас уровень дохода ниже среднего');
} else {
  alert('Что-то пошло не так');
}




