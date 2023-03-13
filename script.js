'use strict';
const gameBoard = (() => {
  let gameBoardArray = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];

  let activePlayer = 0;

  const switchActivePlayer = () =>
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  const printGameBoard = () =>
    gameBoardArray.forEach(row => console.log(row.join(' ').split('\n')));

  const clearBoard = () => {
    gameBoardArray = gameBoardArray.map(row => row.map(cell => (cell = '.')));
  };

  const checkGameOver = () => {
    if (gameBoardArray.flat().every(el => el !== '.')) {
      console.log('Its a Draw!');
      clearBoard();
    }
  };

  const checkWinnerHorizontal = () =>
    gameBoardArray.forEach(row => {
      if (row.every(el => el === 'x')) {
        console.log('you win');
        clearBoard();
      } else if (row.every(el => el === 'o')) {
        console.log('you lose');
        clearBoard();
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
        clearBoard();
        console.log('you win');
      } else if (
        updatedBoard[i] === 'o' &&
        updatedBoard[i + 3] === 'o' &&
        updatedBoard[i + 6] === 'o'
      ) {
        clearBoard();
        console.log('you lose');
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
      clearBoard();
      console.log('you win');
    } else if (
      (updatedBoard[0] === 'o' &&
        updatedBoard[4] === 'o' &&
        updatedBoard[8] === 'o') ||
      (updatedBoard[2] === 'o' &&
        updatedBoard[4] === 'o' &&
        updatedBoard[6] === 'o')
    ) {
      clearBoard();
      console.log('you lose');
    }
  };

  const selectBoardCell = (row, column) => {
    if (gameBoardArray[row][column] === '.') {
      activePlayer === 0
        ? (gameBoardArray[row][column] = 'x')
        : (gameBoardArray[row][column] = 'o');
      checkWinnerHorizontal();
      checkWinnerVertical();
      checkWinnerDiagonal();
      checkGameOver();
      printGameBoard();
      switchActivePlayer();
    } else return 'Error';
  };

  return { printGameBoard, selectBoardCell, clearBoard };
})();

gameBoard.printGameBoard();

const Player = (name, number) => {
  return { name, number };
};

const tadgh = Player('Tadgh', 0);
const playerTwo = Player(undefined, 1);

console.log(tadgh.number);
console.log(playerTwo.number);
