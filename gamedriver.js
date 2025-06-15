import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";
import { Player } from "./Player.js";

import { renderOpponentBoard, changeCellStatus } from "./DOMActions.js";

const playerOne = new Player();
const playerTwo = new Player();

function initBoards() {
  playerOne.board.placeShip(0, 0, "horizontal", 2);
  playerOne.board.placeShip(3, 4, "vertical", 3);
  playerOne.board.placeShip(6, 6, "horizontal", 1);

  playerTwo.board.placeShip(0, 0, "horizontal", 2);
  playerTwo.board.placeShip(3, 4, "vertical", 3);
  playerTwo.board.placeShip(6, 6, "horizontal", 1);
}

initBoards();
console.log(playerOne.board.shipsAndPositions[0]);

const playerOneContainer = document.getElementById("player-board-container");
renderOpponentBoard(playerOne.board, playerOneContainer);

const playerTwoContainer = document.getElementById("opponent-board-container");
renderOpponentBoard(playerTwo.board, playerTwoContainer);

// add eventlistener to the opponent board
// if a cell is clicked
// call the board.receiveHit(x, y)
//

playerOneContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("boardCell")) {
    const x = parseInt(event.target.id[0]);
    const y = parseInt(event.target.id[1]);
    const attackResult = playerOne.board.receiveAttack(x, y);
    console.log(attackResult);
    changeCellStatus(event.target, attackResult);
  }
});
