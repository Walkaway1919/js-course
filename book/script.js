let listOfBook = document.querySelector('.books'),
    books = document.querySelectorAll('.book'),
    bookOne = books[1],
    bookTwo = books[0],
    bookThree = books[4],
    bookFour = books[3],
    bookFive = books[5],
    bookSix = books[2],
    adv = document.querySelector('.adv');

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

adv.parentNode.removeChild(adv);
listOfBook.insertBefore(bookOne, bookTwo);
listOfBook.insertBefore(bookThree, bookSix);
listOfBook.insertBefore(bookFour, bookSix);
listOfBook.insertBefore(bookFive, bookSix);

let text = bookThree.firstElementChild;
let anc = text.firstElementChild;
anc.textContent = "Книга 3. this и Прототипы Объектов";

let listTwo = bookTwo.getElementsByTagName('ul')[0];
let listLiTwo = listTwo.children;

listTwo.insertBefore(listLiTwo[2], listLiTwo[listLiTwo.length-1]);
listTwo.insertBefore(listLiTwo[5], listLiTwo[3]);
listTwo.insertBefore(listLiTwo[7], listLiTwo[4]);

let listFive = bookFive.getElementsByTagName('ul')[0];
let listLiFive = listFive.children;

listFive.insertBefore(listLiFive[9], listLiFive[2]);
listFive.insertBefore(listLiFive[4], listLiFive[3]);
listFive.insertBefore(listLiFive[5], listLiFive[4]);



let listSix = bookSix.getElementsByTagName('ul')[0];
let listLiSix = listSix.children;

let liLast = document.createElement('li');
liLast.innerHTML = 'Глава 8: За пределами ES6';
listLiSix[8].after(liLast);
