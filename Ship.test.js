import { Ship } from "./Ship";

describe("ship tests", () => {
  let sh = null;

  beforeEach(() => {
    sh = new Ship(2);
  });

  it("create ship of length 2", () => {
    expect(sh).toBeInstanceOf(Ship);
    expect(sh.length).toBe(2);
  });

  it("correctly registers hit", () => {
    sh.hit();
    expect(sh.numOfHits).toBe(1);
    sh.hit();
    expect(sh.numOfHits).toBe(2);
  });

  it("correctly registers if ship is sunk", () => {
    expect(sh.isSunk).toBe(false);
    sh.hit();
    expect(sh.isSunk).toBe(false);
    sh.hit();
    expect(sh.isSunk).toBe(true);
  });
});
