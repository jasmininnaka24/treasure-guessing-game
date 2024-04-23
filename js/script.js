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

let score, highscore, isPlaying, index, secretLetter;

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};
const displayScore = scoring => {
  document.querySelector('.score').textContent = scoring;
};

const init = () => {
  score = 10;
  highscore = 0;
  isPlaying = true;

  displayScore(score);
  displayMessage('Make a guess');
  document.querySelector('body').style.background =
    'linear-gradient(to top left, rgba(0, 139, 139, .2), rgba(204, 78, 78,.3)';
  document.querySelector('.guess').value = '';

  document.querySelector('.highscore').textContent = highscore;
  index = Math.trunc(Math.random() * 26);
  secretLetter = letter[index];
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
        document.querySelector('.number').value = secretLetter;
        document.querySelector('body').style.background =
          'linear-gradient(to top left, rgba(133, 198, 198, 0.2), rgba(183, 248, 228, 0.3))';
        if (score > highscore) {
          highscore = score;
          document.querySelector('.highscore').textContent = highscore;
        }
        break;
      case guess !== secretLetter:
        if (score > 1) {
          displayMessage(guess > secretLetter ? 'Too High' : 'Too low');
          score--;
          displayScore(score);
        } else {
          displayMessage('You lost the game!');
          displayScore(0);
        }
        break;
    }
  }
});

btnAgain.addEventListener('click', init);

// game mechanics manipulation
const modal = document.querySelector('.modal');
const btnShow = document.querySelector('.show-modal');
const btnClose = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

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

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
