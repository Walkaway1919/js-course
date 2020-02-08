'use strict';
let startButton = document.getElementById('start'),
    cancelButton = document.getElementById('cancel'),
    plusButtons = document.getElementsByTagName('button'),
    plusButtonsOne = plusButtons[0],
    plusButtonsTwo = plusButtons[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    // inputElements = document.querySelectorAll('[class$="-value"]');
    budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    inputTypeText = document.querySelectorAll('[type = "text"]');

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

        this.budget = +salaryAmount.value;
        this.getIncome();
        this.getExpenses();
        this.getDeposit();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.changePeriod();
        this.showResult();
           // this.getStatusIncome();
      },
      showResult: function(){
          budgetMonthValue.value = this.budgetMonth;
          budgetDayValue.value = Math.ceil( this.budgetDay );
          expensesMonthValue.value = this.expensesMonth;
          additionalExpensesValue.value = this.addExpenses.join(', ');
          additionalIncomeValue.value = this.addIncome.join(', ');
          targetMonthValue.value = Math.ceil(this.getTargetMonth());
          incomePeriodValue.value = this.calcPeriod();
          periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = this.calcPeriod();
          }.bind(this));
      },

      addExpensesBlock: function(){
          let cloneExpensesItem = expensesItems[0].cloneNode(true);
          cloneExpensesItem.querySelectorAll('input').forEach(function(input){
            input.value = '';
          });
          expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusButtonsTwo);
          expensesItems = document.querySelectorAll('.expenses-items');

          if(expensesItems.length === 3){
              plusButtonsTwo.style.display = 'none';
          }
      },

      addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(function(input){
          input.value = '';
        });
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
            this.expenses[itemExpenses] = cashExpenses;
          }
        }.bind(this));
      },

      getIncome: function(){
        this.incomeMonth = 0;
        incomeItems.forEach(function(item){
          let cashIncome = item.querySelector('.income-amount').value;
          let itemIncome = item.querySelector('.income-title').value;
          if(itemIncome !== '' && cashIncome !== ''){
            this.income[itemIncome] = +cashIncome;
          }
        }.bind(this));

        for( let key in this.income ){
          this.incomeMonth += this.income[key];
        }
      },
      
      getAddExpenses: function(){
        this.addExpenses = [];
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(
          function( item ){
            item = item.trim();
            if(item !== ''){
              this.addExpenses.push(item);
            }
          }.bind(this)
        );
      },
      
      getAddIncome: function(){
        this.addIncome = [];
        additionalIncomeItem.forEach( function(item){
          let itemValue = item.value.trim();
          if(itemValue !== ''){
            this.addIncome.push(itemValue);
          }
        }.bind(this) );
      },
      
      getDeposit: function(){
        this.deposit = depositCheck.checked;
      },
      getExpensesMonth: function(){
        this.expensesMonth = 0;
        for (let expItem in this.expenses) {
          this.expensesMonth += +this.expenses[expItem];
        }  
      },  
      getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
      },  
      
      getTargetMonth: function(){
        return targetAmount.value / this.budgetMonth;
      },  
      
      getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
          return 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600) {
          return 'У вас средний уровень дохода';
        } else if (this.budgetDay >= 0) {
          return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
          return 'Что-то пошло не так';
        }  
      },  
      
      getInfoDeposit: function(){
        if(this.deposit){
          this.persentDeposit = prompt('Какой годовой процент?', 10);
          
          while(isNaN(this.persentDeposit) || this.persentDeposit.trim() === ''){
            alert('Введите число!');
            this.persentDeposit = prompt('Какой годовой процент?', 10);
          }  
          
          this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
          
          while(isNaN(this.moneyDeposit) || this.moneyDeposit.trim() === ''){
            alert('Введите число!');
            this.moneyDeposit = prompt ('Какая сумма заложена?', 10000);
          }  
        }  
      },  
      
      changePeriod: function() {
        periodAmount.innerHTML = periodSelect.value;
        return periodAmount;
      },
      calcPeriod: function(){
        return this.budgetMonth * periodSelect.value;
      },  

      reset: function() {
        inputTypeText.forEach( function(item) {
          item.value = ''; 
          item.disabled = false;
        });
        if(incomeItems.length > 1){
          incomeItems.forEach( function(item, index) {
            if(index > 0){
              item.remove();
            }
          });
        }
  
        if(expensesItems.length > 1){
          expensesItems.forEach( function(item, index) {
            if(index > 0){
              item.remove();
            }
          });
        }
  
        plusButtonsTwo.style.display = 'block';
        plusButtonsOne.style.display = 'block';
      }

    };  //конец объекта

    plusButtonsTwo.addEventListener('click', appData.addExpensesBlock);//добавление блока расходов
    plusButtonsOne.addEventListener('click',appData.addIncomeBlock);//добавление блока отходов
    periodSelect.addEventListener('input', appData.changePeriod);//меняяем цифру периода

    startButton.addEventListener('click', function(event){
      event.preventDefault();
      if (salaryAmount.value.trim() !== ''){
        appData.start();
        startButton.hidden = true;
        cancelButton.style.display = 'block';
        console.log(inputTypeText);
        inputTypeText = document.querySelectorAll('[type = "text"]');
        inputTypeText.forEach( function(item) {
          item.disabled = true;
        });
      }else {
        alert('Заполните поле дохода!');
      }
    });

    cancelButton.addEventListener('click', function(event){
      appData.reset();
      startButton.hidden = false;
      cancelButton.style.display = 'none';
    });

    document.addEventListener("input", function(e){
      
      if( e.target.placeholder === 'Наименование' ){
        let regexp = /[^а-яА-Я\s\,\.]{0,}/g;
        e.target.value = e.target.value.replace( regexp, "" );
      }

      if( e.target.placeholder === 'Сумма'){
        let regexp = /[^\d]{0,}/g;
        e.target.value = e.target.value.replace( regexp, "" );
      }
    });


// if (this.getTargetMonth() > 0){
//   console.log('Цель будет достигнута за ' + Math.ceil(this.getTargetMonth()) + ' месяца');
// } else  {
//   console.log('Цель не будет достигнута');
// }  

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}  

// let message = 'Наша программа включает в себя данные: \n';
// for ( let key in this) {
//   message += key + ": " + this[key] + "\n\n";
// }  
// console.log(message);

appData.getInfoDeposit();
// console.log(this.persentDeposit, this.moneyDeposit, this.calcSavedMoney());
// console.log(this);
// console.log("Расходы за месяц " + this.expensesMonth);
// console.log(this.getStatusIncome());