import FazerFi from '../fazerfi.json';
import FazerEng from '../fazereng.json';


// const fazerParse = (array) =>{
//   const temp = [];
//   array.forEach(item => {

//     let abc = '';
//     for (let i=0;i<item.Meals.length;i++) {

//       let onemeal = item.Meals[i].Name;
//       if (i == item.Meals.length -1) {
//         abc += onemeal;
//       } else {
//         abc += onemeal + ', ';
//       }


//     }

//     temp.push(abc);
//   });
//   return temp;
// };

/**
 * Parses Fazer json data to array of strings
 *
 * @param {Array} array
 * @returns
 */
const fazerParseWithDiets = (array) =>{
  const temp = [];
  array.forEach(item => {
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
console.log(fazerParseWithDiets(FazerEng.SetMenus));


const coursesEn = fazerParseWithDiets(FazerEng.SetMenus);
const coursesFi = fazerParseWithDiets(FazerFi.SetMenus);

const FazerData = {coursesFi,coursesEn};
export default FazerData;
