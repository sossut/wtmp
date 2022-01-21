import LunchMenu from '../lunchmenu.json';
console.log('menu object', LunchMenu.courses);

const coursesEn = [];
const coursesFi = [];

const isEngOn = true;

const lunchmenu = Object.values(LunchMenu.courses);

const parseSodexo = (array) => {
  array.forEach(item => {
    coursesEn.push(item.title_en);
    coursesFi.push(item.title_fi);
  });
};
parseSodexo(lunchmenu);

const sorting = (array, order) => {
  const sortedList = Object.values(array).sort((a,b) => {
    if (isEngOn) {
      let textA = a.title_en.toUpperCase();
      let textB = b.title_en.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    } else {
      let textA = a.title_fi.toUpperCase();
      let textB = b.title_fi.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }

  });
if (order == 1) {
    return sortedList;
  } else if (order == -1){
    return sortedList.reverse();
  }
};

const SodexoData = {coursesFi,coursesEn};
export default SodexoData;
