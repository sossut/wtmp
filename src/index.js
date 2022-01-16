
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


const menu = document.querySelector('#menu');

let isEngOn = true;

const changeLang = document.querySelector('#change-lang');
const sortMenuButton = document.querySelector('#sort');
const randomButton = document.querySelector('#random');
const randomFood = document.getElementById('random-food');

const showMenu = (array) => {
  menu.innerHTML = '';
  array.forEach((item) => {

    const food = document.createElement('p');
    food.innerHTML = item;
    menu.appendChild(food);
  });
};
showMenu(coursesEn);

changeLang.addEventListener('click', () => {

  if (isEngOn) {
    showMenu(coursesFi);
    isEngOn = false;

  } else {
    showMenu(coursesEn);
    isEngOn = true;

  }
});
let isAsc = true;
const sortMenu = (array) => {
  if (isAsc) {
    const temp = array.sort();
    showMenu(temp);
    isAsc = false;

  } else {
    const temp = array.reverse();
    showMenu(temp);
    isAsc = true;
  }

};

sortMenuButton.addEventListener('click', () => {
  if (isEngOn) {
    sortMenu(coursesEn);
  } else {
    sortMenu(coursesFi);
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
