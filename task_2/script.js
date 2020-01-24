let money = 10000000,
    income = 'пособие по безработице',
    addExpenses = 'интернет, связь, ЕДА',
    deposit = true,
    mission = 2000000,
    period = 1;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('"Период равен ' + period + ' месяцев"');
console.log('"Цель заработать ' + mission + ' рублей"');
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay = (money / 30);
console.log(budgetDay);
