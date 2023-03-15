'use strict';

const gameBoard = (() => {
  const gameBoardEl = document.querySelector('.gameboard'); //gameboard
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
    } else {
      console.log(gameBoard.gameBoardArray);
      return;
    }
  }; //gameboard

  const printGameBoard = () => {
    gameBoardArray.flat().forEach((_, i) => {
      const cellSquare = document.createElement('button');
      cellSquare.classList.add('cell');
      cellSquare.setAttribute('index', i);
      cellSquare.addEventListener('click', function (e) {
        console.log(gameBoard.gameBoardArray);
        if (e.target.attributes.index.value === '0') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(0, 0);
        }
        if (e.target.attributes.index.value === '1') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(0, 1);
        }
        if (e.target.attributes.index.value === '2') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(0, 2);
        }
        if (e.target.attributes.index.value === '3') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(1, 0);
        }
        if (e.target.attributes.index.value === '4') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(1, 1);
        }
        if (e.target.attributes.index.value === '5') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(1, 2);
        }
        if (e.target.attributes.index.value === '6') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(2, 0);
        }
        if (e.target.attributes.index.value === '7') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(2, 1);
        }
        if (e.target.attributes.index.value === '8') {
          displayScreen.updateTextContent(e);
          return gameBoard.selectBoardCell(2, 2);
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
  const twoPlayerForm = document.querySelector('.start-two-player'); // display
  const btnStart = document.querySelector('.btn-form'); // display
  // const btnRestart = document.querySelector('.btn-restart'); // display
  const scoreboardPlayerOneEl = document.querySelector(
    '.scoreboard-player-one'
  ); // display
  const scoreboardPlayerTwoEl = document.querySelector(
    '.scoreboard-player-two'
  ); // display
  const scoreboardOneName = document.createElement('p'); //display
  const scoreboardTwoName = document.createElement('p'); //display
  const scoreboardOneScore = document.createElement('p'); //display
  const scoreboardTwoScore = document.createElement('p'); // display

  const updateScores = () => {
    scoreboardOneScore.textContent = `${game.playerScores[0]}`;
    scoreboardTwoScore.textContent = `${game.playerScores[1]}`;
  }; //display

  const clearBoard = () => {
    gameBoard.gameBoardArray = gameBoard.gameBoardArray.map(row =>
      row.map(cell => (cell = '.'))
    );
    gameBoard.gameBoardEl.innerHTML = '';
    updateScores();
    game.activePlayer = 0;
  }; //display

  const populateScoreboards = function () {
    scoreboardOneName.textContent = `${game.playerNames[0]}`;
    scoreboardTwoName.textContent = `${game.playerNames[1]}`;
    updateScores();

    scoreboardPlayerOneEl.appendChild(scoreboardOneName);
    scoreboardPlayerOneEl.appendChild(scoreboardOneScore);
    scoreboardPlayerTwoEl.appendChild(scoreboardTwoName);
    scoreboardPlayerTwoEl.appendChild(scoreboardTwoScore);
  }; // display

  const updateTextContent = e => {
    if (!e.target.textContent) {
      game.activePlayer === 0
        ? (e.target.textContent = 'x')
        : (e.target.textContent = 'o');
    }
  }; //display

  const resetGame = function () {
    // display form
    twoPlayerForm.classList.remove('hidden');

    //hide screen
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
  }; //

  const revertToMainMenu = function () {
    clearBoard();
    resetGame();
  }; //

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
  }; //display

  btnStart.addEventListener('click', function (e) {
    e.preventDefault();
    // hide form
    twoPlayerForm.classList.add('hidden');

    //display screen
    gameBoard.gameBoardEl.classList.remove('hidden');
    game.btnRestart.classList.remove('hidden');
    scoreboardPlayerOneEl.classList.remove('hidden');
    scoreboardPlayerTwoEl.classList.remove('hidden');

    //input names
    game.getPlayerNames();
    displayScreen.populateScoreboards();

    console.log(document.querySelector('#player-one').value);
    console.log(document.querySelector('#player-two').value);
    gameBoard.printGameBoard();
  }); //display
  return {
    populateScoreboards,
    clearBoard,
    updateTextContent,
    toggleModal,
    revertToMainMenu,
  };
})();

const game = (() => {
  const inputPlayerOne = document.getElementById('player-one');
  const inputPlayerTwo = document.getElementById('player-two');
  const btnRestart = document.querySelector('.btn-restart'); // display

  let activePlayer = 0; // game
  let playerScores = [0, 0]; // game

  const playerNames = []; // game

  btnRestart.addEventListener('click', displayScreen.revertToMainMenu); // display

  const playerOneWins = () => playerScores[0]++; //game
  const playerTwoWins = () => playerScores[1]++; //game

  const getPlayerNames = function () {
    game.playerNames.push(
      document.getElementById('player-one').value || 'Player One',
      document.getElementById('player-two').value || 'Player Two'
    );
  }; //game

  const switchActivePlayer = () =>
    game.activePlayer === 0 ? (game.activePlayer = 1) : (game.activePlayer = 0); //game

  const checkDraw = () => {
    if (gameBoard.gameBoardArray.flat().every(el => el !== '.')) {
      displayScreen.toggleModal('Its a Draw!');
    }
  }; //game

  const checkWinnerHorizontal = () =>
    gameBoard.gameBoardArray.forEach(row => {
      if (row.every(el => el === 'x')) {
        playerOneWins();
        displayScreen.toggleModal('You Win');
      } else if (row.every(el => el === 'o')) {
        playerTwoWins();
        displayScreen.toggleModal('you lose');
      }
    }); //game

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
  }; //game

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
  }; //game

  const checkGameOver = () => {
    checkWinnerHorizontal();
    checkWinnerVertical();
    checkWinnerDiagonal();
    checkDraw();
  }; //game
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
