'use strict';
const btnStart = document.querySelector('.btn-form');
const btnRestart = document.querySelector('.btn-restart');
const twoPlayerForm = document.querySelector('.start-two-player');
const gameBoardEl = document.querySelector('.gameboard');
const scoreboardPlayerOneEl = document.querySelector('.scoreboard-player-one');
const scoreboardPlayerTwoEl = document.querySelector('.scoreboard-player-two');

const gameBoard = (() => {
  let gameBoardArray = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];

  let activePlayer = 0;

  const switchActivePlayer = () =>
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  const clearBoard = () => {
    gameBoardArray = gameBoardArray.map(row => row.map(cell => (cell = '.')));
    gameBoardEl.innerHTML = '';
    printGameBoard();
    activePlayer = 0;
  };
  const toggleModal = content => {
    const overlay = document.querySelector('.overlay');
    const overlayText = document.querySelector('.overlay-text');
    overlayText.innerHTML = '';

    const displayContent = document.createElement('p');
    overlayText.appendChild(displayContent);
    displayContent.textContent = content;
    overlay.classList.toggle('hidden');
    overlayText.classList.toggle('hidden');
    const clearOverlay = () => {
      overlayText.innerHTML = '';
      overlay.classList.add('hidden');
      overlayText.classList.add('hidden');
      clearBoard();
    };
    overlay.addEventListener('click', clearOverlay);
    overlayText.addEventListener('click', clearOverlay);
  };

  const checkGameOver = () => {
    if (gameBoardArray.flat().every(el => el !== '.')) {
      toggleModal('Its a Draw!');
    }
  };

  const checkWinnerHorizontal = () =>
    gameBoardArray.forEach(row => {
      if (row.every(el => el === 'x')) {
        toggleModal('You Win');
      } else if (row.every(el => el === 'o')) {
        toggleModal('you lose');
      }
    });

  const checkWinnerVertical = () => {
    const updatedBoard = gameBoardArray.flat();
    for (let i = 0; i < updatedBoard.length; i++) {
      if (
        updatedBoard[i] === 'x' &&
        updatedBoard[i + 3] === 'x' &&
        updatedBoard[i + 6] === 'x'
      ) {
        toggleModal('you win');
      } else if (
        updatedBoard[i] === 'o' &&
        updatedBoard[i + 3] === 'o' &&
        updatedBoard[i + 6] === 'o'
      ) {
        toggleModal('you lose');
      }
    }
  };

  const checkWinnerDiagonal = () => {
    const updatedBoard = gameBoardArray.flat();
    if (
      (updatedBoard[0] === 'x' &&
        updatedBoard[4] === 'x' &&
        updatedBoard[8] === 'x') ||
      (updatedBoard[2] === 'x' &&
        updatedBoard[4] === 'x' &&
        updatedBoard[6] === 'x')
    ) {
      toggleModal('you win');
    } else if (
      (updatedBoard[0] === 'o' &&
        updatedBoard[4] === 'o' &&
        updatedBoard[8] === 'o') ||
      (updatedBoard[2] === 'o' &&
        updatedBoard[4] === 'o' &&
        updatedBoard[6] === 'o')
    ) {
      toggleModal('you lose');
    }
  };

  const selectBoardCell = (row, column) => {
    if (gameBoardArray[row][column] === '.') {
      activePlayer === 0
        ? (gameBoardArray[row][column] = 'x')
        : (gameBoardArray[row][column] = 'o');
      switchActivePlayer();
      checkWinnerHorizontal();
      checkWinnerVertical();
      checkWinnerDiagonal();
      checkGameOver();
    } else return 'Error';
  };

  const updateTextContent = e => {
    if (!e.target.textContent) {
      activePlayer === 0
        ? (e.target.textContent = 'x')
        : (e.target.textContent = 'o');
    }
  };

  const printGameBoard = () => {
    gameBoardArray.flat().forEach((_, i) => {
      const cellSquare = document.createElement('button');
      cellSquare.classList.add('cell');
      cellSquare.setAttribute('index', i);
      cellSquare.addEventListener('click', function (e) {
        if (e.target.attributes.index.value === '0') {
          updateTextContent(e);
          return selectBoardCell(0, 0);
        }
        if (e.target.attributes.index.value === '1') {
          updateTextContent(e);
          return selectBoardCell(0, 1);
        }
        if (e.target.attributes.index.value === '2') {
          updateTextContent(e);
          return selectBoardCell(0, 2);
        }
        if (e.target.attributes.index.value === '3') {
          updateTextContent(e);
          return selectBoardCell(1, 0);
        }
        if (e.target.attributes.index.value === '4') {
          updateTextContent(e);
          return selectBoardCell(1, 1);
        }
        if (e.target.attributes.index.value === '5') {
          updateTextContent(e);
          return selectBoardCell(1, 2);
        }
        if (e.target.attributes.index.value === '6') {
          updateTextContent(e);
          return selectBoardCell(2, 0);
        }
        if (e.target.attributes.index.value === '7') {
          updateTextContent(e);
          return selectBoardCell(2, 1);
        }
        if (e.target.attributes.index.value === '8') {
          updateTextContent(e);
          return selectBoardCell(2, 2);
        }
      });
      gameBoardEl.appendChild(cellSquare);
    });
  };

  return { printGameBoard, selectBoardCell, clearBoard, gameBoardArray };
})();

const game = (() => {
  btnRestart.addEventListener('click', gameBoard.clearBoard);
  btnStart.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('hey');
    // hide form
    twoPlayerForm.classList.add('hidden');

    //display screen
    gameBoardEl.classList.remove('hidden');
    btnRestart.classList.remove('hidden');
    scoreboardPlayerOneEl.classList.remove('hidden');
    scoreboardPlayerTwoEl.classList.remove('hidden');

    //input names

    console.log(document.querySelector('#player-one').value);
    console.log(document.querySelector('#player-two').value);
  });
  return {};
})();
gameBoard.printGameBoard();
console.log(gameBoard);

const Player = (name, number) => {
  return { name, number };
};
