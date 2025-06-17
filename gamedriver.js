import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";
import { Player } from "./Player.js";

import {
  renderOpponentBoard,
  renderPlayerBoard,
  handleAttack,
} from "./DOMActions.js";

const humanPlayer = new Player();
const computerPlayer = new Player();

function initBoards() {
  humanPlayer.board.placeShip(0, 0, "horizontal", 2);
  humanPlayer.board.placeShip(3, 4, "vertical", 3);
  humanPlayer.board.placeShip(6, 6, "horizontal", 1);

  computerPlayer.board.placeShip(0, 0, "horizontal", 2);
  computerPlayer.board.placeShip(3, 4, "vertical", 3);
  computerPlayer.board.placeShip(6, 7, "horizontal", 1);
}

initBoards();

const computerPlayerContainer = document.getElementById(
  "opponent-board-container"
);
renderOpponentBoard(computerPlayer.board, computerPlayerContainer);

const humanPlayerContainer = document.getElementById("player-board-container");
renderPlayerBoard(humanPlayer.board, humanPlayerContainer);

computerPlayerContainer.addEventListener("click", (event) => {
  handleAttack(event, computerPlayer.board);
});

humanPlayerContainer.addEventListener("click", (event) => {});
