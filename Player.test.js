import { Player } from "./Player";

describe("player tests", () => {
  it("should create a player object", () => {
    const player = new Player();
    expect(player).toBeInstanceOf(Player);
  });
});
