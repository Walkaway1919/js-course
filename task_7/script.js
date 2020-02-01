let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let toDay = new Date().getDay();
for (let i = 0; i < week.length; i++) {
  let div = document.createElement('div');
  if (i == toDay) {
    div.style.fontWeight = 'bold';
  }
  if (week[i] == 'Суббота' || week[i] == 'Воскресенье') {
    div.style.fontStyle = 'italic';
  }

  div.innerHTML = week[i];
  document.body.append(div);
}
