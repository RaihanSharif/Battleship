// import { Gameboard } from "./Gameboard.js";
// // import { Ship } from "./Ship.js";
import { Player } from "./Player.js";

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
