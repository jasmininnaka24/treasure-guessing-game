'use strict';

// game mechanics manipulation
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelector('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// escape keyword
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// the functionality of the game

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
  'Y',
  'Z',
];

// storing elements/classes in a variable
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const current0E1 = document.querySelector('.current-score--0');
const current1E1 = document.querySelector('.current-score--1');
const score0E1 = document.querySelector('.high-score--0');
const score1E1 = document.querySelector('.high-score--1');
const message0E1 = document.querySelector('.message-0');
const message1E1 = document.querySelector('.message-1');
const playerActive = document.querySelector('.player-active');
const playerWinner = document.querySelector('.player-winner');
let guess0E1 = document.querySelector('.guess-0');
let guess1E1 = document.querySelector('.guess-1');
const number = document.querySelector('.number');
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');

// randomnation
let randomNum = Math.trunc(Math.random() * 26);
let secretLetter = letter[randomNum];
number.value = '?';

let activePlayer, currentPlayer, playerScore, score, playing;
let highscore = [0, 0];

// initaialization
const init = () => {
  activePlayer = 0;
  currentPlayer;
  playerScore = [10, 10];
  score = 10;
  playing = true;

  randomNum = Math.trunc(Math.random() * 26);
  secretLetter = letter[randomNum];
  number.value = '?';
  playerScore = [10, 10];
  activePlayer = 0;
  // score label
  current0E1.textContent = '10';
  current1E1.textContent = '10';
  // message
  message0E1.textContent = 'Make a Guess...';
  message1E1.textContent = 'Make a Guess...';
  // guess
  guess0E1.value = '';
  guess1E1.value = '';
  // board background
  player0E1.classList.add('player-active');
  player1E1.classList.remove('player-active');
  player0E1.classList.remove('player-winner');
  player1E1.classList.remove('player-winner');
  guess1E1.value = '-';
};
init();

guess1E1.value = '-';

// global functions
let switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E1.classList.toggle('player-active');
  player1E1.classList.toggle('player-active');
  currentPlayer = document.querySelector(`.guess-${activePlayer}`).value = '';
};

let lastCondition = function () {
  playerScore[activePlayer] = 0;
  document.querySelector(`.current-score--${activePlayer}`).textContent =
    playerScore[activePlayer];
  document.querySelector(`.message-${activePlayer}`).textContent =
    'Sorry! You Lost. Better Luck Next Time🤠';
};

// buttons even handler
btnCheck.addEventListener('click', function () {
  if (playing) {
    currentPlayer = String(
      document.querySelector(`.guess-${activePlayer}`).value
    ).toUpperCase();

    // 1st condition
    if (!currentPlayer) {
      document.querySelector(`.message-${activePlayer}`).textContent =
        'No Number!';
    }

    // 2nd condition
    else if (currentPlayer === secretLetter) {
      playing = false;
      document.querySelector(`.message-${activePlayer}`).textContent =
        'Correct Guessed Letter🎉';

      // displaying Secret Number
      number.value = secretLetter;
      // style
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player-winner');

      // displaying current score
      document.querySelector(`.current-score--${activePlayer}`).textContent =
        playerScore[activePlayer];

      console.log(`Highscsore: ${highscore[activePlayer]}`);
      console.log(`Score: ${playerScore[activePlayer]}`);

      if (playerScore[activePlayer] > highscore[activePlayer]) {
        highscore[activePlayer] = playerScore[activePlayer];
        let high = highscore[activePlayer];
        document.querySelector(`.high-score--${activePlayer}`).textContent =
          high;
      }
      console.log(`Highscsore: ${highscore[activePlayer]}`);
    }

    // last condition
    else if (currentPlayer !== secretLetter) {
      if (playerScore[activePlayer] > 1) {
        playerScore[activePlayer]--;
        document.querySelector(`.current-score--${activePlayer}`).textContent =
          playerScore[activePlayer];
        document.querySelector(`.message-${activePlayer}`).textContent =
          currentPlayer > secretLetter
            ? `Too High From Secret Letter's Index 😐`
            : `Too Low From Secret Letter's Index 😐`;
        switchPlayer();
      } else {
        lastCondition();
        switchPlayer();
        player1E1.classList.add('player-active');
        player0E1.classList.remove('player-active');
        player0E1.classList.remove('player-winner');
        player1E1.classList.remove('player-winner');
      }
    } else {
      playerScore[activePlayer] = 0;
      document.querySelector(`.current-score--${activePlayer}`).textContent =
        playerScore[activePlayer];
      switchPlayer();
    }
  }
});

btnAgain.addEventListener('click', init);
