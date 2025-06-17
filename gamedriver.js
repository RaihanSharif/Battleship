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

const computerBoardContainer = document.getElementById(
  "opponent-board-container"
);
const humanBoardContainer = document.getElementById("player-board-container");

let humanTurn = true;

function initBoards() {
  humanPlayer.board.placeShip(0, 0, "horizontal", 2);
  humanPlayer.board.placeShip(3, 4, "vertical", 3);
  humanPlayer.board.placeShip(6, 6, "horizontal", 1);

  computerPlayer.board.placeShip(0, 0, "horizontal", 2);
  computerPlayer.board.placeShip(3, 4, "vertical", 3);
  computerPlayer.board.placeShip(6, 7, "horizontal", 1);
  renderOpponentBoard(computerPlayer.board, computerBoardContainer);
  renderPlayerBoard(humanPlayer.board, humanBoardContainer);
}

initBoards();

// human attacks the computer board
computerBoardContainer.addEventListener("click", (event) => {
  if (humanTurn) {
    // if attack fails, other player's turn
    if (!handleAttack(event, computerPlayer.board)) {
      humanTurn = !humanTurn;
    } else if (computerPlayer.board.isAllShipsSunk()) {
      // annouce winner
      // make it wait for the screen rendering to finish
      setTimeout(() => alert("You win!"), 100);
    }
  }
});

humanBoardContainer.addEventListener("click", (event) => {
  // get computer player's input
  // pass that to attack handler
});
