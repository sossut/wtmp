console.log('Hello console!');
import FazerMenu from './assets/fazermenu.json';


const menu = [
  {name: 'Lingonberry jam', price: 4.00},
  {name: 'Mushroom and bean casserole', price: 5.50},
  {name: 'Chili-flavoured wheat', price: 3.00},
  {name: 'Vegetarian soup', price: 4.80},
  {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00}
];

const validator = (string) => {
  const pattern = /^[A-ZÅÄÖ]+[\wåöä \(\)\/\,\"\-\']{3,63}$/;
  return pattern.test(string);
};

const parser = (array) => {
  for (const item of array) {
    console.log('validator',validator(item.name));
  }
};
parser(menu);

const priceSorter = (array) => {
  array.sort((a,b) => a.price - b.price);
  console.log('price sorting',array);
};
priceSorter(menu);

const priceFilter = (array) =>{
  const cheapFood = array.filter((food) => {

    return food.price < 5;
  });
  console.log('price filter',cheapFood);
};
priceFilter(menu);

const raisePrices = (array, amount) => {
  const procent = (amount / 100 + 1);
  const newArr = array.map((food) => {
    return {
      name: food.name,
      price: (food.price * procent).toFixed(2),
    };
  });
  console.log('raised prices',newArr);
};
raisePrices(menu, 15);

const totalCost = (array) => {
  const cost = array.reduce((a,b) => ({price: a.price + b.price}));
  console.log('total cost',cost);
};
totalCost(menu);

const veganMenu = [];

const veganOptions = (array) => {

  for (let i=0; i<array.length; i++){
    veganMenu.push(array[i]);


    console.log('123', array[i]);
    console.log('weekday',array[i].DayOfWeek);
    console.log('aaaaaaa',array[i].SetMenus);
    for (let j=0; j< array[i].SetMenus.length;j++) {
      const arr = array[i].SetMenus[j].Meals;
      console.log('arr before', arr);

      const filtered = arr.filter(item => {
        return item.Diets.includes('Veg');
      });

      veganMenu[i].SetMenus[j].Meals = filtered;
      console.log('arr after', filtered);
    }
    const arr2 = array[i].SetMenus;
    console.log('arr2 before', arr2);
  }

  console.log('Vegan',veganMenu);


};

veganOptions(FazerMenu.LunchMenus);
//console.log(veganOptions(FazerMenu.LunchMenus));


import Fack from './assets/alternatefazer.json';

console.log('Not Vegan',Fack.LunchMenus);
