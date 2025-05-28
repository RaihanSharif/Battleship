import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
describe("setup of the game board", () => {
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
