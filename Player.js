import { Gameboard } from "./Gameboard.js";

class Player {
  constructor() {
    this.board = new Gameboard();
  }
}

class computerPlayer extends Player {
  // should have a play turn method
  // which chooses a cell to play,
  // keeps track of cells played so far
}

export { Player };
