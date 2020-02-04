let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];


function trans(h, words){
  if (parseInt(h) % 10 == 1) {
    return h + ' ' + words[0];//..
  } else if ((parseInt(h) > 1 && parseInt(h) < 5) || (parseInt(h) > 19 && parseInt(h) % 10 > 1 && parseInt(h) % 10 < 5)) {
    return h + ' ' + words[1];
  } else {
    return h + ' ' + words[2];
  }
}

let hours = ['час', 'часа', 'часов'];
let minutes = ['минута', 'минуты', 'минут'];
let seconds = ['секунда', 'секунды', 'секунд'];



function formatDate(date) {

  let days = date.getDate();
  if (days < 10) days = '0' + days;
  
  let months = date.getMonth() + 1;
  if (months < 10) months = '0' + months;
  
  return days + '.' + months;
}

let timer = document.getElementById('timer');


setInterval(function() {
  let now = new Date();

  let shortDate = formatDate(now) + '.' + now.getFullYear() + ' - ' +  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  
  let fullDate = 'Сегодня '  + days[now.getDay()] + ', '   + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear() + ', ' + trans( now.getHours(), hours ) + ' ' + trans(now.getMinutes(), minutes) + ' ' + trans(now.getSeconds(), seconds);

  timer.innerHTML = fullDate + ' <br> ' + shortDate;      
    }, 1000);



    
    
