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
  const selectBoardCell = (row, column) => {
    activePlayer === 0
      ? (gameBoardArray[row][column] = 'x')
      : (gameBoardArray[row][column] = 'o');
    printGameBoard();
    switchActivePlayer();
    console.log(activePlayer);
  };
  return { gameBoardArray, printGameBoard, selectBoardCell };
})();

gameBoard.printGameBoard();

const Player = (name, number) => {
  return { name, number };
};

const tadgh = Player('Tadgh', 0);
const playerTwo = Player(undefined, 1);

console.log(tadgh.number);
console.log(playerTwo.number);
