'use strict';
const gameBoard = (() => {
  const gameBoardArray = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const printGameBoard = () => console.log(gameBoardArray);
  const selectBoardCell = (row, column) => (gameBoardArray[row][column] = 'x');
  return { gameBoardArray, printGameBoard, selectBoardCell };
})();

gameBoard.printGameBoard();

const Player = name => {
  console.log(name);
};
