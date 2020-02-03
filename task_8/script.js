let money,
    start = function(){
        do {
           money = prompt ('Ваш месячный доход?', 50000);
        }while(!isNumber(money));
    };

start();

let appData = {
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      persentDeposit: 0,
      moneyDeposit: 0,
      mission: 100000,
      period: 3,
      budget: money,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      asking: function(){

        if(confirm('Есть ли у вас дополнительный заработок?')){
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');

            while(itemIncome.trim() == ''){
              alert('Только буквы');
              itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            }

            let cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', 10000);

            while(isNaN(cashIncome) || cashIncome.trim() == ''){
              alert('Введите число!');
              cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', 10000);
            }

            appData.income[itemIncome] = cashIncome;
        }    
        
        let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, бензин' );
        
        appData.addExpenses = addExpenses.toLowerCase().split(', ');


        console.log(
          appData.addExpenses
            .map(function(it){ return it[0].toUpperCase() + it.slice(1); })
            .join(', ')
        ); 


        appData.deposit = confirm ('Есть ли у вас депозит в банке?');
        
        for (let i = 0; i < 2; i++){
          ask1 = prompt('Введите обязательную статью расходов?', 'Расход ' + i);
          while(ask1.trim() == ''){
            alert('Только буквы');
            ask1 = prompt('Введите обязательную статью расходов?', 'Расход ' + i);
          }
          ask2 = prompt ('Во сколько это обойдется?', 2500);
          while(isNaN(ask2) || ask2.trim() == ''){
            alert('Введите число!');
            ask2 = prompt ('Во сколько это обойдется?', 2500);
          }
        
          appData.expenses[ask1] = ask2;
        }
      },
      getExpensesMonth: function(){
        for (let expItem in appData.expenses) {
          appData.expensesMonth += +appData.expenses[expItem];
        }
      },
      getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
      },

      getTargetMonth: function(){
        return appData.mission / appData.budgetMonth;
      },

      getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
          return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
          return 'У вас средний уровень дохода';
        } else if (appData.budgetDay >= 0) {
          return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
          return 'Что-то пошло не так';
        }
      },

      getInfoDeposit: function(){
        if(appData.deposit){
          appData.persentDeposit = prompt('Какой годовой процент?', 10);

          while(isNaN(appData.persentDeposit) || appData.persentDeposit.trim() == ''){
            alert('Введите число!');
            appData.persentDeposit = prompt('Какой годовой процент?', 10);
          }

          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

          while(isNaN(appData.moneyDeposit) || appData.moneyDeposit.trim() == ''){
            alert('Введите число!');
            appData.moneyDeposit = prompt ('Какая сумма заложена?', 10000);
          }
        }
      },
      calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
      }
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();

console.log(appData);
console.log("Расходы за месяц " + appData.expensesMonth);
console.log(appData.getStatusIncome());

if (appData.getTargetMonth() > 0){
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else  {
  console.log('Цель не будет достигнута');
}


function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let message = 'Наша программа включает в себя данные: \n';
for ( let key in appData) {
  message += key + ": " + appData[key] + "\n\n";
}
console.log(message);

appData.getInfoDeposit();
console.log(appData.persentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

