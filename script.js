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

  const checkWinner = () =>
    gameBoardArray.forEach((row, index) => {
      if (row.every(el => el === 'x')) return console.log('you win');
      else if (row.every(el => el === 'o')) return console.log('you lose');
    });

  const selectBoardCell = (row, column) => {
    if (gameBoardArray[row][column] === '.') {
      activePlayer === 0
        ? (gameBoardArray[row][column] = 'x')
        : (gameBoardArray[row][column] = 'o');
      checkWinner();
      printGameBoard();
      switchActivePlayer();
    } else return 'Error';
  };

  return { printGameBoard, selectBoardCell, checkWinner };
})();

gameBoard.printGameBoard();

const Player = (name, number) => {
  return { name, number };
};

const tadgh = Player('Tadgh', 0);
const playerTwo = Player(undefined, 1);

console.log(tadgh.number);
console.log(playerTwo.number);
