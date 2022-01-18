import LunchMenu from './assets/lunchmenu.json';
//console.log('menu object', LunchMenu.courses);

const coursesEn = [];
const coursesFi = [];

const parseSodexo = (menu) => {
  const courses = Object.values(menu);
  courses.forEach(item => {
    coursesEn.push(item.title_en);
    coursesFi.push(item.title_fi);
  });
};
parseSodexo(LunchMenu.courses);
const SodexoData = {coursesEn, coursesFi};
export default SodexoData;
