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


class AppData{
  constructor(){
    this.income = {};
    this.addIncome = [];
    this.incomeMont = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  start(){
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
  }
  showResult(){
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
  }
  addExpensesBlock(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelectorAll('input').forEach(function(input){
    input.value = '';
  });
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusButtonsTwo);
  expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
      plusButtonsTwo.style.display = 'none';
    }
  }
  addIncomeBlock(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(function(input){
      input.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusButtonsOne);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
    plusButtonsOne.style.display = 'none';
    }
  }
  getExpenses(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = cashExpenses;
      }
    }.bind(this));
  }
  getIncome(){
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
  }
  getAddExpenses(){
    this.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function( item ){
      item = item.trim();
      if(item !== ''){
      this.addExpenses.push(item);
      }
    }.bind(this));
  }
  getAddIncome(){
    this.addIncome = [];
    additionalIncomeItem.forEach( function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
      this.addIncome.push(itemValue);
      }
    }.bind(this) );
  }
  getDeposit(){
    this.deposit = depositCheck.checked;
  }
  getExpensesMonth(){
    this.expensesMonth = 0;
    for (let expItem in this.expenses) {
      this.expensesMonth += +this.expenses[expItem];
    }  
  }
  getBudget(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth(){
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome(){
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  }
  getInfoDeposit(){
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
  }
  changePeriod(){
    periodAmount.innerHTML = periodSelect.value;
  }
  calcPeriod(){
    return this.budgetMonth * periodSelect.value;
  }
  reset(){
    periodSelect.value = 1;
    this.changePeriod();
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
  eventListener(){
    plusButtonsTwo.addEventListener('click', this.addExpensesBlock);
    plusButtonsOne.addEventListener('click',this.addIncomeBlock);
    periodSelect.addEventListener('input', this.changePeriod);
  
    startButton.addEventListener('click', function(event){
      event.preventDefault();
      if (salaryAmount.value.trim() !== ''){
        this.start();
        startButton.hidden = true;
        cancelButton.style.display = 'block';
        inputTypeText = document.querySelectorAll('[type = "text"]');
        inputTypeText.forEach( function(item) {
          item.disabled = true;
        });
      }else {
        alert('Заполните поле дохода!');
      }
    }.bind(this));
  
    cancelButton.addEventListener('click', function(event){
      this.reset();
      startButton.hidden = false;
      cancelButton.style.display = 'none';
    }.bind(this));
  
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
  
  }
}
  
const appData = new AppData();

appData.eventListener();

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}  

appData.getInfoDeposit();
