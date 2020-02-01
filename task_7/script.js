let money,
    start = function(){
        do {
           money = prompt ('Ваш месячный доход?');
        }while(!isNumber(money));
    };

start();

let appData = {
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      mission: 100000,
      period: 3,
      asking: function(){
        let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую');

        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm ('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++){
          ask1 = prompt('Введите обязательную статью расходов?');
          do {
            ask2 = prompt ('Во сколько это обойдется?');
          }while(!isNumber(ask2));

          appData.expenses[ask1] = ask2;
        }
      },
      budget: money,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
    };
appData.getExpensesMonth = function(){
  for (let expItem in appData.expenses) {
    appData.expensesMonth += +appData.expenses[expItem];
  }
};

appData.getBudget = function(){
  appData.budgetMonth = appData.budget - appData.expensesMonth;
  appData.budgetDay = appData.budgetMonth / 30;
};

appData.getTargetMonth = function(){
  return appData.mission / appData.budgetMonth;
};

appData.getStatusIncome = function(){
  if (appData.budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (appData.budgetDay >= 600) {
    return 'У вас средний уровень дохода';
  } else if (bappData.budgetDay >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что-то пошло не так';
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();

console.log(appData);

console.log("Расходы за месяц " + appData.expensesMonth);
console.log("За какой период будет достигнута цель (в месяцах) " + Math.ceil(appData.getTargetMonth()));
console.log(appData.getStatusIncome());


function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let message = 'Наша программа включает в себя данные: \n';
for ( let key in appData) {
  message += key + ": " + appData[key] + "\n\n";
}
console.log(message);
