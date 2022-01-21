import FazerFi from '../fazerfi.json';
import FazerEng from '../fazereng.json';


const fazerParse = (array) =>{
  const temp = [];
  array.forEach(item => {

    let abc = '';
    for (let i=0;i<item.Meals.length;i++) {

      let onemeal = item.Meals[i].Name;
      if (i == item.Meals.length -1) {
        abc += onemeal;
      } else {
        abc += onemeal + ', ';
      }


    }

    temp.push(abc);
  });
  return temp;
};


console.log(fazerParse(FazerEng.SetMenus));
const coursesEn = fazerParse(FazerEng.SetMenus);
const coursesFi = fazerParse(FazerFi.SetMenus);

const FazerData = {coursesFi,coursesEn};
export default FazerData;
