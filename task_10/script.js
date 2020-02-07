'use strict';
let startButton = document.getElementById('start');
let plusButtons = document.getElementsByTagName('button');
let plusButtonsOne = plusButtons[0];
let plusButtonsTwo = plusButtons[1];
let checkbox = document.querySelector('.deposit-check');

let additionalIncomeInput = document.querySelectorAll('.additional_income-item');
let additionalIncomeInputOne = additionalIncomeInput[0];
let additionalIncomeInputTwo = additionalIncomeInput[1];

// let inputElements = document.querySelectorAll('[class$="-value"]');

let budgetDayValue = document.querySelector('.budget_day-value');
let budgetMonthValue = document.querySelector('.budget_month-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');

let salaryAmountInput = document.querySelector('.salary-amount');
let incomeTitleInput = document.querySelector('.income-title');
let incomeAmountInput = document.querySelector('.income-amount');
let expensesTitleInput = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesInput = document.querySelector('.additional_expenses-item');
let targetAmountInput = document.querySelector('.target-amount');
let periodRangeInput = document.querySelector('.period-select');


let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  period: 3,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
      start: function(){
  
        if (salaryAmountInput.value === ''){
          alert('Заполните поле');
          return;
        }
          appData.budget = salaryAmountInput.value;
          console.log('salaryAmountInput.value: ', salaryAmountInput.value);

          appData.getExpenses();

          appData.getExpensesMonth();
          appData.getBudget();
          appData.getAddExpenses();
          appData.showResult();
          appData.getAddIncome();
           // appData.getStatusIncome();
      },

      showResult: function(){
          budgetMonthValue.value = appData.budgetMonth;
          budgetDayValue.value = appData.budgetDay;
          expensesMonthValue.value = appData.expensesMonth;
          additionalExpensesValue.value = appData.addExpenses.join(', ');
          additionalIncomeValue.value = appData.addIncome.join(', ');
          targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      },


      addExpensesBlock: function(){
          let cloneExpensesItem = expensesItems[0].cloneNode(true);
          expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusButtonsTwo);
          expensesItems = document.querySelectorAll('.expenses-items');

          if(expensesItems.length === 3){
              plusButtonsTwo.style.display = 'none';
          }
      },

      getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
              appData.expenses[itemExpenses] = cashExpenses;
            }
        });

      },

      getAddExpenses: function(){
        let addExpenses = additionalExpensesInput.value.split(',');
        addExpenses.forEach(function(item){
          item = item.trim();
          if(item !== ''){
              appData.addExpenses.push(item);
          }
        })
      },

      getAddIncome: function(){
        additionalIncomeInput.forEach(function(item){
          let itemValue = item.value.trim();
          if(itemValue !== ''){
            appData.addIncome.push(itemValue);
          }
        })
      },

      asking: function(){

        if(confirm('Есть ли у вас дополнительный заработок?')){
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');

            while(itemIncome.trim() === ''){
              alert('Только буквы');
              itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            }  

            let cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', 10000);

            while(isNaN(cashIncome) || cashIncome.trim() === ''){
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
          let ask1 = prompt('Введите обязательную статью расходов?', 'Расход ' + i);
          while(ask1.trim() === ''){
            alert('Только буквы');
            ask1 = prompt('Введите обязательную статью расходов?', 'Расход ' + i);
          }  
          let ask2 = prompt ('Во сколько это обойдется?', 2500);
          while(isNaN(ask2) || ask2.trim() === ''){
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
        return targetAmountInput.value / appData.budgetMonth;
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

          while(isNaN(appData.persentDeposit) || appData.persentDeposit.trim() === ''){
            alert('Введите число!');
            appData.persentDeposit = prompt('Какой годовой процент?', 10);
          }  

          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

          while(isNaN(appData.moneyDeposit) || appData.moneyDeposit.trim() === ''){
            alert('Введите число!');
            appData.moneyDeposit = prompt ('Какая сумма заложена?', 10000);
          }  
        }  
      },  
      calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
      }  
    };  

startButton.addEventListener('click', appData.start);
plusButtonsTwo.addEventListener('click', appData.addExpensesBlock);

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
// console.log(appData.persentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
// console.log(appData);
// console.log("Расходы за месяц " + appData.expensesMonth);
// console.log(appData.getStatusIncome());






