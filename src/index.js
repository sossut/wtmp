

import SodexoData from "./assets/modules/sodexo-data";

import FazerData from './assets/modules/fazer-data';

const sodexoMenu = document.querySelector('#sodexo-menu');
const fazerMenu = document.getElementById('fazer-menu');
let isEngOn = true;

const changeLang = document.querySelector('#change-lang');
const sortMenuButton = document.querySelector('#sort');
const randomButton = document.querySelector('#random');
const randomFood = document.getElementById('random-food');

const sortMenuButton1 = document.querySelector('#sort1');
const randomButton1 = document.querySelector('#random1');
const randomFood1 = document.getElementById('random-food1');

/**
 * Renders arrays on page
 *
 *
 * @param {Array} array
 * @param {Element} menuElem
 */
const showMenu = (array, menuElem) => {
  menuElem.innerHTML = '';

  for (const item of array) {
    const food = document.createElement('li');
    food.innerHTML = item.Name;

    menuElem.appendChild(food);
  }
};

let currentSodexoMenu = SodexoData.coursesEn;
let currentFazerMenu = FazerData.coursesEn;

showMenu(currentSodexoMenu, sodexoMenu);
showMenu(currentFazerMenu, fazerMenu);


/**
 * Sorts array based on Alphabetical order
 *
 * @param {Array} array
 * @param {Integer} order
 * @returns
 */
const sortMenu = (array, order) => {
  array.sort((a, b) => {
      let fa = a.Name.toLowerCase();
      let fb = b.Name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  if (order == 1) {
    return array;
  } else if ( order == -1) {
    return array.reverse();
  }

};

/**
 * Switches language
 */
const switchLang = () => {

  if (isEngOn) {
    isEngOn = false;
    currentSodexoMenu = SodexoData.coursesFi;
    currentFazerMenu = FazerData.coursesFi;

  } else {
    isEngOn = true;
    currentSodexoMenu = SodexoData.coursesEn;
    currentFazerMenu = FazerData.coursesEn;
  }

};

changeLang.addEventListener('click', () => {

  switchLang();
  showMenu(currentSodexoMenu, sodexoMenu);
  showMenu(currentFazerMenu, fazerMenu);

});

let sodexoAsc = true;
sortMenuButton.addEventListener('click', () => {

  sodexoMenu.innerHTML = '';
  if (sodexoAsc) {
    showMenu(sortMenu(currentSodexoMenu, 1), sodexoMenu);

    sodexoAsc = false;
  } else {
    showMenu(sortMenu(currentSodexoMenu, -1), sodexoMenu);
    sodexoAsc = true;
  }
});

let fazerAsc = true;
sortMenuButton1.addEventListener('click', () => {

  fazerMenu.innerHTML = '';
  if (fazerAsc) {
    showMenu(sortMenu(currentFazerMenu, 1), fazerMenu);
    fazerAsc = false;
  } else {
    showMenu(sortMenu(currentFazerMenu, -1), fazerMenu);
    fazerAsc = true;
  }
});

const getRandom = (array, elem) => {
  elem.innerHTML = '';
  elem.innerHTML = array[Math.floor(Math.random() * array.length)].Name;

};

randomButton.addEventListener('click', () => {
  if (isEngOn) {
    getRandom(SodexoData.coursesEn, randomFood);
  } else {
    getRandom(SodexoData.coursesFi, randomFood);
  }

});
randomButton1.addEventListener('click', () => {
  if (isEngOn) {
    getRandom(FazerData.coursesEn, randomFood1);
  } else {
    getRandom(FazerData.coursesFi, randomFood1);
  }

});

