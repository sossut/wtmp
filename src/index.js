/**
 * teht 2
 */

const highValue = 100;
const lowValue = 1;
const maxGuesses = 10;

let randomNumber = Math.floor(Math.random() * highValue) + lowValue;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

const lowNumber = document.querySelector('#low');
const highNumber = document.querySelector('#high');
const guessCountField = document.querySelector('#guess-count');
const startButton = document.getElementById('start');
const guessList = document.getElementById('guesses');
const correctNumber = document.getElementById('correct-number');
const numberOfGuesses = document.getElementById('number-of-guesses');
lowNumber.innerHTML = lowValue;
highNumber.innerHTML = highValue;
guessCountField.innerHTML = maxGuesses;

let guessCount = 1;
let resetButton;

let startTime = '';
let counter = 0;

let array = [];
const averageGuesses = [];

/*
Aloitaan arvaaminen aina puolestavälistä annettuja lukuja. eli jos alempi on 1 ja ylempi 100 niin ensimmäinen arvaus on 50.
Jos arvaus on liina pieni niin seuraavalla kierroksella arvataan 75 jne. Jos arvaus on liian iso arvataan 25 jne.
*/

//otetaan parametreinä kaksi arvoa, korkea ja matala

/**
 * Algorith for number guessing.
 * @param {int} highValue1 - high value
 * @param {int} lowValue1 - low value
 *
 * @returns
 *
 */

const autoCheck = (highValue1, lowValue1) => {
  const guess = Math.floor((highValue1 + lowValue1) / 2);
  let highTemp, lowTemp;
  //arvaus on parametreinä annettujen arvojen keskiarvo


  array.push(guess);
  console.log('guess',guess);
  //kun arvaus on oikea lopetaan suoritus
  if (guess === randomNumber) {
      console.log('Correct');
      counter++;
      console.log('counter',counter);
      const endTime = Date.now() - startTime;
      console.log((endTime / 1000).toFixed(3));
      console.log(array);
      averageGuesses.push(array.length);
      console.log(averageGuesses);
      return;

  } else if (guess > randomNumber) {
    // kun arvaus on liian suuri asetaan välimuuttujat sopiviksi. High on arvattu luku ja Low on parametrinä annettu alempi arvo
      console.log('Go lower');

      highTemp = guess - 1;
      lowTemp = lowValue1;
      console.log('high', highTemp);
      console.log('low', lowTemp);
      counter++;
  } else {
    //kun arvaus on liian pieni asetaan Low on arvattu luku ja High on parametrinä annettu ylempi arvo.
      console.log('Go higher');

      highTemp = highValue1;
      lowTemp = guess + 1;
      console.log('high', highTemp);
      console.log('low', lowTemp);
      counter++;
  }
  //suoritetaan funktion uudestaan kunnes tulee osuma.
  try {
    autoCheck(highTemp,lowTemp);
  } catch (e){

  }
};

startButton.addEventListener('click', () => {

  startTime = Date.now();
  const bleh = document.createElement('button');
  counter =0;
  bleh.addEventListener('click', autoCheck(highValue, lowValue));

  guessList.innerHTML = '';
  array.forEach(guess => {
    const li = document.createElement('li');
    li.innerHTML = guess;
    guessList.appendChild(li);
  });
  correctNumber.innerHTML = 'Correct number: ' + array[array.length -1];
  numberOfGuesses.innerHTML = 'Number of guesses : ' + array.length ;
  array = [];
  randomNumber = Math.floor(Math.random() * highValue) + lowValue;
});
const loopStart = Date.now();
for(let i=0; i<1000;i++) {
  startTime = Date.now();
  randomNumber = Math.floor(Math.random() * highValue) + lowValue;


  autoCheck(highValue,lowValue);
  array = [];
  counter =0;
}
const loopTime = Date.now() -loopStart;
console.log((loopTime / 1000).toFixed(3));

const average = array => array.reduce((a,b) => a +b, 0) / array.length;
console.log('average',average(averageGuesses));

//tuhannen kierroksen jälkeen keskiarvo-arvaus määrä pyörii 5.8 molemmin puolin.
//maximi arvausmäärä log2(100 -1 +1)= log2(100) = 7
//minimi tietekin 1 arvaus, jos sattuu hyvä tuuri.
// kestää noin sekunnin loopata 1000 kertaa
const checkGuess = () => {
    const userGuess = Number(guessField.value);

  if (guessCount === 1) {
    startTime = Date.now();
    console.log(startTime);
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    const endTime = Date.now() - startTime;
    console.log(endTime);
    lastResult.textContent = 'Congratulations! You got it right! It took you '+ guessCount + ' guesses and ' + (endTime / 1000).toFixed(3) + ' seconds!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === maxGuesses) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
};
guessSubmit.addEventListener('click', checkGuess);

const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
};

const resetGame = () => {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * highValue) + lowValue;
};


