



Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
};
const date = new Date().addHours(4).toISOString().slice(0, 10);
console.log(date);

const dataUrlFi = 'https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=' + date;
const dataUrlEn = 'https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=' + date;

/**
 * Parses Fazer json data to array of strings
 *
 * @param {Array} array
 * @param {Integer} dayOfWeek 0-6
 * @returns
 */
const parseFazerMenu = (array, dayOfWeek) =>{
  const temp = [];


  const dayMenu = array[dayOfWeek].SetMenus;

  dayMenu.forEach(item => {

    let meal = {Name: '',Diets: [],  Header: ''};
    let abc = '';
    for (let i=0;i<item.Meals.length;i++) {

      let onemeal = item.Meals[i].Name;
      if (i == item.Meals.length -1) {
        abc += onemeal;
      } else {
        abc += onemeal + ', ';
      }

      meal.Diets = item.Meals[i].Diets;
    }

    meal.Header = item.Name;
    meal.Name = abc;
    temp.push(meal);
  });

  return temp;
};






const FazerData = {parseFazerMenu, dataUrlFi, dataUrlEn};
export default FazerData;
