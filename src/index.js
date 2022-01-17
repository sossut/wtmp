
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

console.log(Object.keys(LunchMenu.courses).length);
const menu = document.querySelector('#menu');

let isEngOn = true;

const changeLang = document.querySelector('#change-lang');
const sortMenuButton = document.querySelector('#sort');
const randomButton = document.querySelector('#random');
const randomFood = document.getElementById('random-food');

console.log('1',Object.entries(LunchMenu.courses));




const sorting = (array, order) => {
  const sortedList = [];
  Object.keys(array).forEach((item) => {
    if (isEngOn) {
      sortedList.push(array[item].title_en);
    } else {
      sortedList.push(array[item].title_fi);
    }

  });
if (order == 1) {
    return sortedList.sort();
  } else if (order == -1){
    return sortedList.sort().reverse();
  }
};
console.log(1,sorting(LunchMenu.courses, -1));
const showMenu = (array) => {
  menu.innerHTML = '';

  Object.keys(array).forEach((item) => {

    const food = document.createElement('p');

    if (isEngOn) {
      food.innerHTML = array[item].title_en;

    } else {
      food.innerHTML = array[item].title_fi;

    }
    menu.appendChild(food);
  });
};

showMenu(LunchMenu.courses);

changeLang.addEventListener('click', () => {

  if (isEngOn) {
    isEngOn = false;
    showMenu(LunchMenu.courses);
  } else {
    isEngOn = true;
    showMenu(LunchMenu.courses);
  }
});

let isAsc = true;
sortMenuButton.addEventListener('click', () => {
  menu.innerHTML = '';
  if (isAsc) {

    const temp = sorting(LunchMenu.courses, 1);
    temp.forEach((item) => {
      const food = document.createElement('p');
      food.innerHTML = item;
      menu.appendChild(food);
    });
    isAsc = false;
    console.log(isAsc);
  } else if (!isAsc){
    const temp = sorting(LunchMenu.courses, -1);
    temp.forEach((item) => {
      console.log(item);
      const food = document.createElement('p');
      food.innerHTML = item;
      menu.appendChild(food);
    });
    isAsc = true;
  }
});

const getRandom = (array) => {
  randomFood.innerHTML = '';
  randomFood.innerHTML = array[Math.floor(Math.random() * array.length)];
};

randomButton.addEventListener('click', () => {
  if (isEngOn) {
    getRandom(coursesEn);
  } else {
    getRandom(coursesFi);
  }
});
