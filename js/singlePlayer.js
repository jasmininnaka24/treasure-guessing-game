'use strict';

const letter = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'y',
  'Z',
];
// functions
const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};
const displayScore = score => {
  document.querySelector('.score').textContent = score;
};
const displayHighscore = highscore => {
  document.querySelector('.highscore').textContent = highscore;
};

// initialization scoping
let isPlaying, index, secretLetter, score, highscore;
const init = () => {
  // variables
  isPlaying = true;
  index = Math.trunc(Math.random() * 26);
  secretLetter = letter[index];
  score = 10;
  highscore = 0;

  displayScore(score);
  document.querySelector('.guess').value = '';
  document.querySelector('.number').value = '?';
  document.querySelector('body').style.backgroundImage =
    'linear-gradient(to top left, rgba(0, 139, 139, .2), rgba(204, 78, 78,.3))';
};
init();

const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');

btnCheck.addEventListener('click', function () {
  if (isPlaying) {
    const guess = document.querySelector('.guess').value.toUpperCase();

    switch (true) {
      case !guess:
        displayMessage('No number!');
        break;
      case guess === secretLetter:
        isPlaying = false;
        displayMessage('Correct Guessed Letter');
        if (score > highscore) {
          highscore = score;
          displayHighscore(highscore);
        }
        document.querySelector('.number').value = secretLetter;
        document.querySelector('body').style.backgroundImage =
          'linear-gradient(to bottom left, rgb(223, 249, 246), rgb(199, 234, 252))';
        break;
      case guess !== secretLetter:
        if (score > 1) {
          displayMessage(guess > secretLetter ? 'Too High!' : 'Too Low!');
          score--;
          displayScore(score);
          document.querySelector('.guess').value = '';
        } else {
          displayMessage('You lost the game!');
          score = 0;
          displayScore(score);
        }
        break;
    }
  }
});

btnAgain.addEventListener('click', init);

// modal

const btnShow = document.querySelector('.show-modal');
const btnClose = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

// functionality
const showModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnShow.addEventListener('click', showModal);
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// escape

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
