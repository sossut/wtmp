
const coursesEn = ["Hamburger, cream sauce and poiled potates",
                "Goan style fish curry and whole grain rice",
                "Vegan Chili sin carne and whole grain rice",
                "Broccoli puree soup, side salad with two napas",
                "Lunch baguette with BBQ-turkey filling",
                "Cheese / Chicken / Vege / Halloum burger and french fries"];
const coursesFi = ["Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
                "Goalaista kalacurrya ja täysjyväriisiä",
                "vegaani Chili sin carne ja täysjyväriisi",
                "Parsakeittoa,lisäkesalaatti kahdella napaksella",
                "Lunch baguette with BBQ-turkey filling",
                "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset"];

import LunchMenu from './assets/lunchmenu.json';
console.log('menu object', LunchMenu.courses);

const lunchmenu = Object.entries(LunchMenu.courses);
const menu = document.querySelector('#menu');

let isEngOn = true;

const changeLang = document.querySelector('#change-lang');
const sortMenuButton = document.querySelector('#sort');
const randomButton = document.querySelector('#random');
const randomFood = document.getElementById('random-food');




// const sortedList = Object.entries(LunchMenu.courses).sort((a, b) => {
//   if (isEngOn) {
//     let textA = a[1].title_en.toUpperCase();
//     let textB = b[1].title_en.toUpperCase();
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//   } else {
//     let textA = a[1].title_fi.toUpperCase();
//     let textB = b[1].title_fi.toUpperCase();
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//   }
// });
// console.log('aaa',sortedList);
// console.log('bbb',sortedList.reverse());
// console.log('ccc',sortedList[1][1].title_en);
const sorting = (array, order) => {
  const sortedList = Object.entries(array).sort((a,b) => {
    if (isEngOn) {
      let textA = a[1].title_en.toUpperCase();
      let textB = b[1].title_en.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    } else {
      let textA = a[1].title_fi.toUpperCase();
      let textB = b[1].title_fi.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }

  });
if (order == 1) {
    return sortedList;
  } else if (order == -1){
    return sortedList.reverse();
  }
};


const showMenu = (array) => {
  menu.innerHTML = '';
    const temp = array;
    for (let i=0; i<temp.length;i++) {
    const food = document.createElement('p');

    if (isEngOn) {
      food.innerHTML = temp[i][1].title_en;

    } else {
      food.innerHTML = temp[i][1].title_fi;

    }
    menu.appendChild(food);

  }

};

showMenu(lunchmenu);

changeLang.addEventListener('click', () => {

  if (isEngOn) {
    isEngOn = false;
    showMenu(lunchmenu);
  } else {
    isEngOn = true;
    showMenu(lunchmenu);
  }
});

let isAsc = true;
sortMenuButton.addEventListener('click', () => {
  menu.innerHTML = '';
  if (isAsc) {

    const temp = sorting(LunchMenu.courses, 1);

    showMenu(temp);
    isAsc = false;

  } else if (!isAsc){
    const temp = sorting(LunchMenu.courses, -1);

    showMenu(temp);
    isAsc = true;
  }
});

const getRandom = (array) => {
  randomFood.innerHTML = '';
  if (isEngOn) {
    randomFood.innerHTML = array[Math.floor(Math.random() * array.length)][1].title_en;
  }  else {
    randomFood.innerHTML = array[Math.floor(Math.random() * array.length)][1].title_fi;
  }

};

randomButton.addEventListener('click', () => {
  getRandom(lunchmenu);
});

