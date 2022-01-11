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

lowNumber.innerHTML = lowValue;
highNumber.innerHTML = highValue;
guessCountField.innerHTML = maxGuesses;

let guessCount = 1;
let resetButton;

let startTime = '';
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
