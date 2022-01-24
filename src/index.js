console.log('Hello console!');
'use strict';

const touch = document.getElementById('touch-this');
const displayTime = document.getElementById('display-time');
const hello = [];
let word = '';

/**
 * Detect when a key is pressed
 */
document.addEventListener('keydown', evt => {
  //first 5 keystrokes are stored in an array and a string
  if (hello.length < 5) {
    hello.push(evt.key);
    word += evt.key;
  } else {
    //after 5 strokes the array is iterated and then stored in a string
    word = '';
    hello.push(evt.key);
    hello.shift();
    hello.forEach(char => {
      word += char;
    });
  }
  //if the string matches hello an alert is showm
  if (word === 'hello') {
    alert('HELLO!');
  }
});

/**
 * console logs the x and y coordinates
 */
document.addEventListener('dblclick', evt => {
  console.log('x',evt.x, 'y',evt.y);

});

/**
 * detects when mouse enters and logs in console
 */
touch.addEventListener('mouseenter', evt => {
  console.log('TOUCHED');
});

/**
 * timer for 15000 ms
 */
const startTimer = setTimeout(() => {
  displayTime.innerHTML = 'Hurry Up!';

}, 15000);

/**
 * starting the timer
 * @param {*} timer
 */
const start = (timer) => {
  timer = setTimeout(() => {
  displayTime.innerHTML = 'Hurry Up!';

}, 15000);
};


/**
 * stopping the timer
 * @param {*} timer
 */
const stop = (timer) => {
  clearTimeout(timer);
};
document.addEventListener('keydown', () => {
  displayTime.innerHTML = '';

  stop(startTimer);
  start(startTimer);


});

document.addEventListener('mousemove', () => {
  displayTime.innerHTML = '';

  stop(startTimer);
  start(startTimer);

});

document.addEventListener('click', () => {
  displayTime.innerHTML = '';

  stop(startTimer);
  start(startTimer);
});
