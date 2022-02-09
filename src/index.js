

import SodexoData from "./assets/modules/sodexo-data";

import FazerData from './assets/modules/fazer-data';

import {fetchData} from './assets/modules/network';

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

const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('#nav-ul');
const changeTheme = document.querySelector('#change-theme');

let hamburerOpen;
const width = window.innerWidth;
if (width < 815) {
  hamburerOpen = false;
}
console.log(width);

hamburger.addEventListener('click', () => {
  if (!hamburerOpen) {
    navUl.style.display = 'flex';

    hamburerOpen = true;
  } else {
    navUl.style.display = 'none';
    hamburerOpen = false;
  }

});


/**
 * Gets week day index
 *
 * @returns {Integer} - weekday index 0-6
 */
const getWeekDay = () => {

  const weekday = new Date().getDay();
  if (weekday === 0) {
    return 6;
  }
  return weekday - 1;
};

/**
 * Renders arrays on page
 *
 *
 * @param {Array} array
 * @param {Element} menuElem
 */
const renderMenu = (array, menuElem) => {
  menuElem.innerHTML = '';

  for (const item of array) {
    const food = document.createElement('li');
    food.innerHTML = item.Name;

    menuElem.appendChild(food);
  }
};


/**
 * Sorts array based on Alphabetical order
 *
 * @param {Array} array - menu
 * @param {Integer} order - asc or desc
 * @returns {Array} - sorted array
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


  } else {
    isEngOn = true;

  }

};

changeLang.addEventListener('click', () => {

  switchLang();
  sodexoFetcher();
  fazerFetcher();

});

/**
 * Saves the theme to localStorage
 *
 * @param {String} themeName - document theme name
 */
const setTheme = (themeName) => {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
};


const toggleTheme = () => {
  if (localStorage.getItem('theme') === 'dark-theme') {
    setTheme('light-theme');
  } else {
    setTheme('dark-theme');
  }
};

changeTheme.addEventListener('click', () => {
  toggleTheme();
});


let sodexoAsc = true;
sortMenuButton.addEventListener('click', () => {

  sodexoMenu.innerHTML = '';
  if (sodexoAsc) {
    fetchData(SodexoData.dataUrl).then(data => {
      console.log(Object.values(data.courses));
      const courses = SodexoData.parseSodexoMenu(Object.values(data.courses), isEngOn);
      renderMenu(sortMenu(courses, 1), sodexoMenu);
  });

    sodexoAsc = false;
  } else {
    fetchData(SodexoData.dataUrl).then(data => {

        const courses = SodexoData.parseSodexoMenu(Object.values(data.courses), isEngOn);
        renderMenu(sortMenu(courses, -1), sodexoMenu);
    });
    sodexoAsc = true;
  }
});

let fazerAsc = true;
sortMenuButton1.addEventListener('click', () => {

  fazerMenu.innerHTML = '';
  if (fazerAsc) {
    if (isEngOn) {
      fetchData(FazerData.dataUrlEn, 'fazer-php').then(data => {

        const courses = FazerData.parseFazerMenu(data.LunchMenus, getWeekDay());

        renderMenu(sortMenu(courses, 1), fazerMenu);
      });
    } else {
      fetchData(FazerData.dataUrlFi, 'fazer-php').then(data => {

        const courses = FazerData.parseFazerMenu(data.LunchMenus, getWeekDay());

        renderMenu(sortMenu(courses, 1), fazerMenu);
      });
    }

    fazerAsc = false;
  } else {
    fetchData(FazerData.dataUrlEn, 'fazer-php').then(data => {

      const courses = FazerData.parseFazerMenu(data.LunchMenus, getWeekDay());

      renderMenu(sortMenu(courses, -1), fazerMenu);
    });
    fazerAsc = true;
  }
});

const getRandom = (array, elem) => {
  elem.innerHTML = '';
  elem.innerHTML = array[Math.floor(Math.random() * array.length)].Name;

};
/**
 * fetches fazer data and renders it
 *
 * @param {Boolean} lang
 */
const ffetcher = (lang) => {
  fetchData(lang, 'fazer-php').then(data => {

      const courses = FazerData.parseFazerMenu(data.LunchMenus, getWeekDay());

      renderMenu(courses, fazerMenu);
    });
};

const fazerFetcher = () => {
  if (isEngOn) {
     ffetcher(FazerData.dataUrlEn);
  } else {
      ffetcher(FazerData.dataUrlFi);
  }
};


/**
 * fetches sodexo data and renders it
 */
const sodexoFetcher = () => {
  fetchData(SodexoData.dataUrl).then(data => {

    const courses = SodexoData.parseSodexoMenu(Object.values(data.courses), isEngOn);

    renderMenu(courses, sodexoMenu);
  });
};

const init = () => {
  sodexoFetcher();
  fazerFetcher();
  if (localStorage.getItem('theme') === 'dark-theme') {
    setTheme('dark-theme');
  } else {
    setTheme('light-theme');
  }
};

randomButton.addEventListener('click', () => {
  fetchData(SodexoData.dataUrl).then(data => {

    const courses = SodexoData.parseSodexoMenu(Object.values(data.courses), isEngOn);

    getRandom(courses, randomFood);
  });


});
randomButton1.addEventListener('click', () => {
  if (isEngOn) {
    fetchData(FazerData.dataUrlEn, 'fazer-php').then(data => {

      const courses = FazerData.parseFazerMenu(data.LunchMenus, getWeekDay());
      getRandom(courses, randomFood1);

    });

  } else {
    fetchData(FazerData.dataUrlFi, 'fazer-php').then(data => {

      const courses = FazerData.parseFazerMenu(data.LunchMenus, getWeekDay());
      getRandom(courses, randomFood1);

    });

  }

});
const searchResults = document.getElementById('search-results');

/**
 * searches through arrays to find matches based on menu item names and renders them into an element.
 *
 * @param {Url} url
 * @param {Boolean} parse
 * @param {String} query
 */
const search = (url, parse, query) => {
  fetchData(url, parse).then(data => {
    const temp = [];
    let courses = [];
    if (parse === 'fazer-php') {

      courses = FazerData.parseFazerMenu(data.LunchMenus, getWeekDay());

    } else {
      courses = SodexoData.parseSodexoMenu(Object.values(data.courses), isEngOn);
    }
    courses.forEach(item => {
      if (item.Name.toLowerCase().includes(query.toLowerCase())) {
        temp.push(item);
      }
    });
    console.log(temp);
    for(const item of temp) {
      const result = document.createElement('li');
      result.innerHTML = item.Name;
      searchResults.appendChild(result);
    }
  });
};

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async(evt) => {
  searchResults.innerHTML = '';
  evt.preventDefault();
  const searchInput = document.getElementById('search-input').value;

  search(SodexoData.dataUrl, false, searchInput);
  if (isEngOn) {
    search(FazerData.dataUrlEn, 'fazer-php', searchInput);
  } else {
    search(FazerData.dataUrlFi, 'fazer-php', searchInput);
  }
});


init();

