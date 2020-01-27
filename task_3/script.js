let lang = 'en';
if (lang == 'en') {
  alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else if (lang == 'ru') {
  alert ('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} //else {
//   alert ('Another language');
// }


switch (lang) {
  case 'en':
    alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
  case 'ru':
    alert('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
    break;
  // default:
  //   alert('Another language');
}


let days = {
  ru: 'Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье',
  en: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
};

lang = 'ru'; // ru || en
console.log( days[lang] );

let namePerson = 'Артем';
namePerson == 'Артем' ? console.log('директор') : namePerson == 'Максим' ? console.log('преподаватель') : console.log('студент');

