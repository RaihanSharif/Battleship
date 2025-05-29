import { Ship } from "./Ship.js";
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

  #alreadyAttacked(x, y) {
    for (let miss of this.missCoords) {
      if (miss[0] === x && miss[1] === y) {
        return true;
      }
    }
    for (let hit of this.hitCoords) {
      if (hit[0] === x && hit[1] === y) {
        return true;
      }
    }
    return false;
  }

  #isHit(x, y) {
    // go through all ships and coords.
    // get the cells occupied by that ship
    // if any of the cells match x, y -> it's a hit
    // if at the end of the loops, none of the ships'
    // coordinates overlap with the x, y, then it's a miss
    for (let pos of this.shipsAndPositions) {
      const shipCells = this.#cellsOccupiedByShip(pos);
      for (let coord of shipCells) {
        if (coord[0] === x && coord[1] === y) {
          return pos.ship;
        }
      }
    }
    return null;
  }

  isAllShipsSunk() {
    for (let pos of this.shipsAndPositions) {
      if (!pos.ship.isSunk) {
        return false;
      }
    }
    return true;
  }
  receiveAttack(x, y) {
    //make sure coordinates are valid range
    if (x >= 10 || x < 0 || y >= 10 || y < 0) {
      throw new Error("coordinate out of valid range");
    }

    // check if the coordinate is already attacked
    if (this.#alreadyAttacked(x, y)) {
      throw new Error("coordinate already attacked");
    }

    // if it's a hit, push to hitsCoords and call the ship's hit() function
    // else save to missedHit array
    const sh = this.#isHit(x, y);
    if (sh instanceof Ship) {
      this.hitCoords.push([x, y]);
      sh.hit();
      return "successful hit";
    } else {
      this.missCoords.push([x, y]);
      return "missed hit";
    }
  }
}
export { Gameboard };
