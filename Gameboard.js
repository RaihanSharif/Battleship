import { Ship } from "./Ship";
class Gameboard {
  constructor() {
    this.shipsAndPositions = [];
    this.missCoords = []; // missed shots
    this.hitCoords = []; // successful hits
  }

  // check if the coordinate is valid

  // if placing the ship in that position, and orientation will result in the ship being out of bounds
  #isWithinBounds(x, y, length, orientation, boardSize) {
    if (orientation === "horizontal") {
      if (x + (length - 1) > boardSize) {
        return false;
      }
    } else {
      if (y + (length - 1) > boardSize) {
        return false;
      }
    }
    return true;
  }

  #cellsOccupiedByShip(shipAndPos) {
    const orientation = shipAndPos.orientation;
    const len = shipAndPos.ship.length;
    const coords = shipAndPos.coords;
    const cellsOccupiedByShip = [];

    if (orientation === "horizontal") {
      for (let i = 0; i < len; i++) {
        cellsOccupiedByShip.push([coords[0] + i, coords[1]]);
      }
    } else {
      for (let i = 0; i < len; i++) {
        cellsOccupiedByShip.push([coords[0], coords[1] + i]);
      }
    }
    return cellsOccupiedByShip;
  }

  #isValidPosition(position) {
    // the cells occupied by the current ship
    // compared to the cells occupied by the other ships
    // if there is an overlap, return false
    const currShip = this.#cellsOccupiedByShip(position);
    for (let shipPos of this.shipsAndPositions) {
      const existingShip = this.#cellsOccupiedByShip(shipPos);
      for (let cell of currShip) {
        for (let existingCell of existingShip) {
          if (cell[0] === existingCell[0] && cell[1] === existingCell[1]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // creating a new ship seems like a future problem
  placeShip(x, y, orientation, length) {
    let sh = new Ship(length);

    // ship would be out of bounds, board size of 10
    if (!this.#isWithinBounds(x, y, length, orientation, 10)) {
      return false; // TODO: later, return errors instead of false
    }

    let ShpPos = { coords: [x, y], orientation: orientation, ship: sh }; // create the
    if (this.#isValidPosition(ShpPos)) {
      this.shipsAndPositions.push(ShpPos);
      return ShpPos;
    } else {
      return false;
    }
  }

  receiveAttack(x, y) {
    //hasdf
    return null;
  }
}
export { Gameboard };
