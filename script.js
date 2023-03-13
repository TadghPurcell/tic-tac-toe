'use strict';
const gameBoard = (() => {
  const gameBoardArray = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const printGameBoard = () => console.log(gameBoardArray);
  return { printGameBoard };
})();

gameBoard.printGameBoard();
