import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";
import { Player } from "./Player.js";

import {
  renderOpponentBoard,
  renderPlayerBoard,
  changeCellStatus,
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

computerPlayerContainer.addEventListener("click", (event) => {
  // TODO: move this functionality to the DOMActions module
  if (event.target.classList.contains("boardCell")) {
    const x = parseInt(event.target.id[0]);
    const y = parseInt(event.target.id[1]);
    const attackResult = computerPlayer.board.receiveAttack(x, y);
    changeCellStatus(event.target, attackResult);
  }
});

humanPlayer.board.receiveAttack(0, 0);
const humanPlayerContainer = document.getElementById("player-board-container");
renderPlayerBoard(humanPlayer.board, humanPlayerContainer);

humanPlayerContainer.addEventListener("click", (event) => {
  // get ship that was clicked, then roate it, using a rotate function
  // in DOMActions
});
