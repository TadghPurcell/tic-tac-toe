'use strict';

const gameBoard = (() => {
  const gameBoardEl = document.querySelector('.gameboard');

  let gameBoardArray = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];

  const selectBoardCell = (row, column) => {
    if (gameBoard.gameBoardArray[row][column] === '.') {
      game.activePlayer === 0
        ? (gameBoard.gameBoardArray[row][column] = 'x')
        : (gameBoard.gameBoardArray[row][column] = 'o');

      game.switchActivePlayer();
      game.checkGameOver();
    } else return;
  };

  const printGameBoard = () => {
    gameBoardArray.flat().forEach((_, i) => {
      const cellSquare = document.createElement('button');

      cellSquare.classList.add('cell');
      cellSquare.setAttribute('index', i);

      cellSquare.addEventListener('click', function (e) {
        if (e.target.attributes.index.value === '0') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(0, 0);
        }
        if (e.target.attributes.index.value === '1') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(0, 1);
        }
        if (e.target.attributes.index.value === '2') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(0, 2);
        }
        if (e.target.attributes.index.value === '3') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(1, 0);
        }
        if (e.target.attributes.index.value === '4') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(1, 1);
        }
        if (e.target.attributes.index.value === '5') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(1, 2);
        }
        if (e.target.attributes.index.value === '6') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(2, 0);
        }
        if (e.target.attributes.index.value === '7') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(2, 1);
        }
        if (e.target.attributes.index.value === '8') {
          displayScreen.updateTextContent(e);
          gameBoard.selectBoardCell(2, 2);
        }
      });
      gameBoard.gameBoardEl.appendChild(cellSquare);
    });
  };

  return {
    gameBoardArray,
    gameBoardEl,
    printGameBoard,
    selectBoardCell,
  };
})();

const displayScreen = (() => {
  const twoPlayerForm = document.querySelector('.start-two-player');

  const scoreboardPlayerOneEl = document.querySelector(
    '.scoreboard-player-one'
  );
  const scoreboardPlayerTwoEl = document.querySelector(
    '.scoreboard-player-two'
  );
  const scoreboardOneName = document.createElement('p');
  const scoreboardTwoName = document.createElement('p');
  const scoreboardOneScore = document.createElement('p');
  const scoreboardTwoScore = document.createElement('p');

  const startGame = e => {
    e.preventDefault();

    twoPlayerForm.classList.add('hidden');

    gameBoard.gameBoardEl.classList.remove('hidden');
    game.btnRestart.classList.remove('hidden');
    scoreboardPlayerOneEl.classList.remove('hidden');
    scoreboardPlayerTwoEl.classList.remove('hidden');

    game.getPlayerNames();
    displayScreen.populateScoreboards();

    gameBoard.printGameBoard();
  };

  const clearBoard = () => {
    gameBoard.gameBoardArray = gameBoard.gameBoardArray.map(row =>
      row.map(cell => (cell = '.'))
    );
    gameBoard.gameBoardEl.innerHTML = '';
    updateScores();
    game.activePlayer = 0;
  };

  const updateScores = () => {
    scoreboardOneScore.textContent = `${game.playerScores[0]}`;
    scoreboardTwoScore.textContent = `${game.playerScores[1]}`;
  };

  const populateScoreboards = function () {
    scoreboardOneName.textContent = `${game.playerNames[0]}`;
    scoreboardTwoName.textContent = `${game.playerNames[1]}`;
    updateScores();

    scoreboardPlayerOneEl.appendChild(scoreboardOneName);
    scoreboardPlayerOneEl.appendChild(scoreboardOneScore);
    scoreboardPlayerTwoEl.appendChild(scoreboardTwoName);
    scoreboardPlayerTwoEl.appendChild(scoreboardTwoScore);
  };

  const updateTextContent = e => {
    if (!e.target.textContent) {
      game.activePlayer === 0
        ? (e.target.textContent = 'x')
        : (e.target.textContent = 'o');
    }
  };

  const resetGame = function () {
    twoPlayerForm.classList.remove('hidden');

    gameBoard.gameBoardEl.classList.add('hidden');
    game.btnRestart.classList.add('hidden');
    scoreboardPlayerOneEl.classList.add('hidden');
    scoreboardPlayerTwoEl.classList.add('hidden');

    game.playerNames.pop();
    game.playerNames.pop();

    game.playerScores = game.playerScores.map(score => (score = 0));

    scoreboardPlayerOneEl.removeChild(scoreboardOneName);
    scoreboardPlayerTwoEl.removeChild(scoreboardTwoName);

    game.inputPlayerOne.value = '';
    game.inputPlayerTwo.value = '';
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
      displayScreen.clearBoard();
      gameBoard.printGameBoard();
    };
    overlay.addEventListener('click', clearOverlay);
    overlayText.addEventListener('click', clearOverlay);
  };

  const revertToMainMenu = function () {
    clearBoard();
    resetGame();
  };

  return {
    populateScoreboards,
    clearBoard,
    updateTextContent,
    toggleModal,
    revertToMainMenu,
    startGame,
  };
})();

const game = (() => {
  const inputPlayerOne = document.getElementById('player-one');
  const inputPlayerTwo = document.getElementById('player-two');
  const btnStart = document.querySelector('.btn-form');
  const btnRestart = document.querySelector('.btn-restart');

  let activePlayer = 0;
  let playerScores = [0, 0];

  const playerNames = [];

  const playerOneWins = () => game.playerScores[0]++;
  const playerTwoWins = () => game.playerScores[1]++;

  const getPlayerNames = function () {
    game.playerNames.push(
      document.getElementById('player-one').value || 'Player One',
      document.getElementById('player-two').value || 'Player Two'
    );
  };

  const switchActivePlayer = () =>
    game.activePlayer === 0 ? (game.activePlayer = 1) : (game.activePlayer = 0); //game

  const checkDraw = () => {
    if (gameBoard.gameBoardArray.flat().every(el => el !== '.')) {
      displayScreen.toggleModal('Its a Draw!');
    }
  };

  const checkWinnerHorizontal = () =>
    gameBoard.gameBoardArray.forEach(row => {
      if (row.every(el => el === 'x')) {
        playerOneWins();
        displayScreen.toggleModal('You Win');
      } else if (row.every(el => el === 'o')) {
        playerTwoWins();
        displayScreen.toggleModal('you lose');
      }
    });

  const checkWinnerVertical = () => {
    const updatedBoard = gameBoard.gameBoardArray.flat();
    for (let i = 0; i < updatedBoard.length; i++) {
      if (
        updatedBoard[i] === 'x' &&
        updatedBoard[i + 3] === 'x' &&
        updatedBoard[i + 6] === 'x'
      ) {
        playerOneWins();
        displayScreen.toggleModal('you win');
      } else if (
        updatedBoard[i] === 'o' &&
        updatedBoard[i + 3] === 'o' &&
        updatedBoard[i + 6] === 'o'
      ) {
        playerTwoWins();
        displayScreen.toggleModal('you lose');
      }
    }
  };

  const checkWinnerDiagonal = () => {
    const updatedBoard = gameBoard.gameBoardArray.flat();
    if (
      (updatedBoard[0] === 'x' &&
        updatedBoard[4] === 'x' &&
        updatedBoard[8] === 'x') ||
      (updatedBoard[2] === 'x' &&
        updatedBoard[4] === 'x' &&
        updatedBoard[6] === 'x')
    ) {
      playerOneWins();
      displayScreen.toggleModal('you win');
    } else if (
      (updatedBoard[0] === 'o' &&
        updatedBoard[4] === 'o' &&
        updatedBoard[8] === 'o') ||
      (updatedBoard[2] === 'o' &&
        updatedBoard[4] === 'o' &&
        updatedBoard[6] === 'o')
    ) {
      playerTwoWins();
      displayScreen.toggleModal('you lose');
    }
  };

  const checkGameOver = () => {
    checkWinnerHorizontal();
    checkWinnerVertical();
    checkWinnerDiagonal();
    checkDraw();
  };

  btnStart.addEventListener('click', displayScreen.startGame);
  btnRestart.addEventListener('click', displayScreen.revertToMainMenu);

  return {
    inputPlayerOne,
    inputPlayerTwo,
    btnRestart,
    activePlayer,
    playerNames,
    getPlayerNames,
    playerScores,
    switchActivePlayer,
    checkGameOver,
  };
})();
