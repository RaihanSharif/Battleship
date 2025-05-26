import { Ship } from "./Ship";

describe("ship tests", () => {
  it("create ship of size 2", () => {
    let sh = new Ship(2);
    expect(sh).toBeInstanceOf(Ship);
  });
});
