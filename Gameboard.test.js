import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
describe("place function tests", () => {
  // functions to place the player ships in the right place
  // placeShip()
  it("place ship on board", () => {
    const board = new Gameboard();
    const sh = new Ship(2);
    expect(board.placeShip(1, 3, "horizontal", 2)).toEqual({
      coords: [1, 3],
      orientation: "horizontal",
      ship: sh,
    });
  });

  it("do no place ship if ship would be out of bounds vertically", () => {
    const board = new Gameboard();
    const sh = new Ship(4);
    const place = board.placeShip(1, 8, "vertical", 4);
    expect(place).toBe(false);
  });

  it("do no place ship if ship would conflict with another ship", () => {
    const board = new Gameboard();
    const sh = new Ship(4);
    const place = board.placeShip(1, 8, "vertical", 4);
    expect(place).toBe(false);
  });
});

describe("receiveAttack function tests", () => {
  it("records a missed attack on a new coordinate", () => {
    const board = new Gameboard();
    board.receiveAttack(1, 3);
    let arr = [1, 3];
    const result = board.missCoords[board.missCoords.length - 1];
    expect(result).toEqual(arr);
  });

  it("record a new successful hit", () => {
    const board = new Gameboard();
    board.placeShip(0, 0, "horizontal", 4);
    expect(board.receiveAttack(0, 0)).toEqual("successful hit");
    expect(board.receiveAttack(1, 0)).toEqual("successful hit");
    expect(board.receiveAttack(2, 0)).toEqual("successful hit");
    expect(board.receiveAttack(3, 0)).toEqual("successful hit");

    // not the place for this, but seems to work. ship was sunk
    // expect(board.shipsAndPositions[0].ship.isSunk).toBe(true);
  });

  it("prevents shot on a preivous successfully hit coordinate", () => {});

  it("prevents shot on previous missed coordinate", () => {});
});

describe("test isAllShipsSunk", () => {
  it("should  all ships sunk", () => {
    const board = new Gameboard();
    board.placeShip(0, 0, "horizontal", 3);
    board.placeShip(0, 1, "vertical", 2);

    // attacking first ship
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    board.receiveAttack(2, 0);

    // attacking second ship
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);
    expect(board.isAllShipsSunk()).toBe(true);
  });

  it("does not report all ships are sunk when only some ships are sunk", () => {
    const board = new Gameboard();
    board.placeShip(0, 0, "horizontal", 3);
    board.placeShip(0, 1, "vertical", 2);

    // not attacking the first ship, at least one ship should be intact
    // board.receiveAttack(0, 0);
    // board.receiveAttack(1, 0);
    // board.receiveAttack(2, 0);

    // attacking second ship
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);
    expect(board.isAllShipsSunk()).toBe(false);
  });
});
// better way to test if array contains something
// it("test array", () => {
//   const arr = [
//     [1, 2],
//     [3, 4],
//     [5, 6],
//   ];

//   const arr1 = [3, 4];
//   const arr2 = [3, 3];
//   expect(arr).toContainEqual(arr1);
// });
