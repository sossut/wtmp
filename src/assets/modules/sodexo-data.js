Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
};
const date = new Date().addHours(4).toISOString().slice(0, 10);

const dataUrl = 'https://www.sodexo.fi/ruokalistat/output/daily_json/152/' + date;


/**
 * Parses Sodexo json data into an array
 *
 * @param {Array} array
 */
const parseSodexoMenu = (array, lang) => {
  const temp = [];
  array.forEach(item => {
    const mealEng = {Name: '', Diets: [], Header: ''};
    const mealFi = {Name: '', Diets: [], Header: ''};
    const diets = item.properties.split(', ');
    if (item.category == 'Vegaani') {
      diets.push('Veg');
    }
    mealEng.Name = item.title_en;
    mealEng.Diets = diets;
    mealFi.Name = item.title_fi;
    mealFi.Diets = diets;
    mealFi.Header = item.category;
    mealEng.Header = item.category;

    if (lang == true) {
      temp.push(mealEng);
    } else {
      temp.push(mealFi);
    }
  });
  return temp;
};


// const sorting = (array, order) => {
//   const sortedList = Object.values(array).sort((a,b) => {
//     if (isEngOn) {
//       let textA = a.title_en.toUpperCase();
//       let textB = b.title_en.toUpperCase();
//       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//     } else {
//       let textA = a.title_fi.toUpperCase();
//       let textB = b.title_fi.toUpperCase();
//       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//     }

//   });
// if (order == 1) {
//     return sortedList;
//   } else if (order == -1){
//     return sortedList.reverse();
//   }
// };

const SodexoData = {parseSodexoMenu, dataUrl};
export default SodexoData;
