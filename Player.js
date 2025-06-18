import { Gameboard } from "./Gameboard.js";

class Player {
  constructor() {
    this.board = new Gameboard();
  }
}

class ComputerPlayer extends Player {
  // should have a play turn method
  // which chooses a cell to play,
  // keeps track of cells played so far
  validCoords = [];
  constructor() {
    super();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.validCoords.push([i, j]);
      }
    }
  }

  generateCoords() {
    const randomIndex = Math.floor(Math.random() * this.validCoords.length);
    const coords = this.validCoords.at(randomIndex);
    this.validCoords.splice(randomIndex, 1);
    return coords;
  }

  playTurn(board) {
    let coords = this.generateCoords();
    let attack = board.receiveAttack(coords[0], coords[1]);
    if (attack === false) {
      return false;
    }

    while (attack) {
      try {
        attack = board.receiveAttack(coords[0], coords[1]);
      } catch (e) {
        console.log(e.message);
      }
      if (attack == false) {
        return attack;
      }
      coords = this.generateCoords();
    }
  }
}

export { Player, ComputerPlayer };
