import { Ship } from "./Ship";

describe("ship tests", () => {
  it("create ship of length 2", () => {
    let sh = new Ship(2);
    expect(sh).toBeInstanceOf(Ship);
    expect(sh.length).toBe(2);
  });

  it("correctly registers hit", () => {
    let sh = new Ship(2);
    expect(sh.isSunk).toBe(false);
    sh.hit();
    expect(sh.numOfHits).toBe(1);
    expect(sh.isSunk).toBe(false);
    sh.hit();
    expect(sh.numOfHits).toBe(2);
    expect(sh.isSunk).toBe(true);
  });

  it("correctly registers if ship is sunk", () => {
    let sh = new Ship(2);
    expect(sh.isSunk).toBe(false);
    sh.hit();
    expect(sh.isSunk).toBe(false);
    sh.hit();
    expect(sh.isSunk).toBe(true);
  });
});
