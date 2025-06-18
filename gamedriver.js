import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";
import { Player, ComputerPlayer } from "./Player.js";

import {
  renderOpponentBoard,
  renderPlayerBoard,
  handlePlayerAttack,
} from "./DOMActions.js";

let humanPlayer;
let computerPlayer;

const computerBoardContainer = document.getElementById(
  "opponent-board-container"
);
const humanBoardContainer = document.getElementById("player-board-container");

function initBoards() {
  humanPlayer = new Player();
  computerPlayer = new ComputerPlayer();
  humanPlayer.board.placeShip(0, 0, "horizontal", 6);
  humanPlayer.board.placeShip(1, 1, "vertical", 3);
  humanPlayer.board.placeShip(3, 4, "horizontal", 4);
  humanPlayer.board.placeShip(2, 5, "vertical", 1);
  humanPlayer.board.placeShip(6, 6, "horizontal", 1);
  humanPlayer.board.placeShip(6, 6, "horizontal", 1);

  computerPlayer.board.placeShip(0, 0, "horizontal", 2);
  computerPlayer.board.placeShip(3, 4, "vertical", 3);
  computerPlayer.board.placeShip(6, 7, "horizontal", 1);
  renderOpponentBoard(computerPlayer.board, computerBoardContainer);
  renderPlayerBoard(humanPlayer.board, humanBoardContainer);
}

// initBoards();

const newGameBtn = document.getElementById("new-game-btn");

newGameBtn.addEventListener("click", () => {
  initBoards();
});

newGameBtn.click();

let turn = true;
// human player's turn
computerBoardContainer.addEventListener("click", (event) => {
  let humanAttack;
  if (turn) {
    try {
      humanAttack = handlePlayerAttack(event, computerPlayer.board);
      if (humanAttack == false) {
        turn = false;
      }
    } catch (e) {
      console.log(`human attack ` + e.message);
    }

    if (humanAttack === false) {
      turn = !computerPlayer.playTurn(humanPlayer.board);
      if (humanPlayer.board.isAllShipsSunk()) {
        setTimeout(() => alert("you lost"), 100);
      }
    } else if (computerPlayer.board.isAllShipsSunk()) {
      setTimeout(() => alert("You won!!"), 100);
    }
  }
  renderOpponentBoard(computerPlayer.board, computerBoardContainer);
  renderPlayerBoard(humanPlayer.board, humanBoardContainer);
});
