'use strict';
let startButton = document.getElementById('start');
let plusButtons = document.getElementsByTagName('button');
let plusButtonsOne = plusButtons[0];
let plusButtonsTwo = plusButtons[1];
let depositCheck = document.querySelector('#deposit-check');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

// let inputElements = document.querySelectorAll('[class$="-value"]');

let budgetDayValue = document.querySelector('.budget_day-value');
let budgetMonthValue = document.querySelector('.budget_month-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');

let salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');



let appData = {
  income: {},
  addIncome: [],
  incomeMonth: 0,
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
      start: function(){

          appData.budget = +salaryAmount.value;

          appData.getIncome();
          appData.getExpenses();

          appData.getDeposit();

          appData.getExpensesMonth();
          appData.getBudget();
          appData.getAddExpenses();
          appData.getAddIncome();
          appData.changePeriod();

          appData.showResult();
           // appData.getStatusIncome();
      },

      showResult: function(){
          budgetMonthValue.value = appData.budgetMonth;
          budgetDayValue.value = Math.ceil( appData.budgetDay );
          expensesMonthValue.value = appData.expensesMonth;
          additionalExpensesValue.value = appData.addExpenses.join(', ');
          additionalIncomeValue.value = appData.addIncome.join(', ');
          targetMonthValue.value = Math.ceil(appData.getTargetMonth());
          incomePeriodValue.value = appData.calcPeriod();
          periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcPeriod();
          });

      },

      addExpensesBlock: function(){
          let cloneExpensesItem = expensesItems[0].cloneNode(true);
          expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusButtonsTwo);
          expensesItems = document.querySelectorAll('.expenses-items');

          if(expensesItems.length === 3){
              plusButtonsTwo.style.display = 'none';
          }
      },

      addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusButtonsOne);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3){
            plusButtonsOne.style.display = 'none';
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

      getIncome: function(){
        appData.incomeMonth = 0;
        incomeItems.forEach(function(item){
          let cashIncome = item.querySelector('.income-amount').value;
          let itemIncome = item.querySelector('.income-title').value;
          if(itemIncome !== '' && cashIncome !== ''){
            appData.income[itemIncome] = +cashIncome;
          }
        });

        for( let key in appData.income ){
          appData.incomeMonth += appData.income[key];
        }
      },
      
      getAddExpenses: function(){
        appData.addExpenses = [];
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
          item = item.trim();
          if(item !== ''){
            appData.addExpenses.push(item);
          }
        });
      },
      
      getAddIncome: function(){
        appData.addIncome = [];
        additionalIncomeItem.forEach(function(item){
          let itemValue = item.value.trim();
          if(itemValue !== ''){
            appData.addIncome.push(itemValue);
          }
        });
      },
      
      getDeposit: function(){
        appData.deposit = depositCheck.checked;
      },
      getExpensesMonth: function(){
        appData.expensesMonth = 0;
        for (let expItem in appData.expenses) {
          appData.expensesMonth += +appData.expenses[expItem];
        }  
      },  
      getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
      },  
      
      getTargetMonth: function(){
        return targetAmount.value / appData.budgetMonth;
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
      
      changePeriod: function() {
        periodAmount.innerHTML = periodSelect.value;
        return periodAmount;
      },
      calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
      }  
    };  
    
    plusButtonsTwo.addEventListener('click', appData.addExpensesBlock);
    plusButtonsOne.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', appData.changePeriod);
    startButton.addEventListener('click', function(event){
      event.preventDefault();
      if (salaryAmount.value.trim() !== ''){
        appData.start();
      }else {
        alert('Заполните поле дохода!');
      }
    });

// if (appData.getTargetMonth() > 0){
//   console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
// } else  {
//   console.log('Цель не будет достигнута');
// }  


function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}  

// let message = 'Наша программа включает в себя данные: \n';
// for ( let key in appData) {
//   message += key + ": " + appData[key] + "\n\n";
// }  
// console.log(message);

appData.getInfoDeposit();
// console.log(appData.persentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
// console.log(appData);
// console.log("Расходы за месяц " + appData.expensesMonth);
// console.log(appData.getStatusIncome());

