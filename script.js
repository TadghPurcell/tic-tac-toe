'use strict';
const gameBoard = (() => {
  const gameBoardArray = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];

  let activePlayer = 0;

  const switchActivePlayer = () =>
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  const printGameBoard = () =>
    gameBoardArray.forEach(row => console.log(row.join(' ').split('\n')));

  const clearBoard = () =>
    gameBoardArray.map(row => row.map(cell => (cell = '.')));

  const checkWinnerHorizontal = () =>
    gameBoardArray.forEach((row, index) => {
      if (row.every(el => el === 'x')) return console.log('you win');
      else if (row.every(el => el === 'o')) return console.log('you lose');
    });

  const checkWinnerVertical = () => {
    const updatedBoard = gameBoardArray.flat();
    for (let i = 0; i < updatedBoard.length; i++) {
      if (
        updatedBoard[i] === 'x' &&
        updatedBoard[i + 3] === 'x' &&
        updatedBoard[i + 6] === 'x'
      )
        return console.log('you win');
      else if (
        updatedBoard[i] === 'o' &&
        updatedBoard[i + 3] === 'o' &&
        updatedBoard[i + 6] === 'o'
      )
        return console.log('you lose');
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
    )
      return console.log('you win');
    else if (
      (updatedBoard[0] === 'o' &&
        updatedBoard[4] === 'o' &&
        updatedBoard[8] === 'o') ||
      (updatedBoard[2] === 'o' &&
        updatedBoard[4] === 'o' &&
        updatedBoard[6] === 'o')
    )
      return console.log('you lose');
  };

  const selectBoardCell = (row, column) => {
    if (gameBoardArray[row][column] === '.') {
      activePlayer === 0
        ? (gameBoardArray[row][column] = 'x')
        : (gameBoardArray[row][column] = 'o');
      checkWinnerHorizontal();
      checkWinnerVertical();
      checkWinnerDiagonal();
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
