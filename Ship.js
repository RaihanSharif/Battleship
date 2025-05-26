class Ship {
  constructor(length, numOfHits = 0) {
    this.length = length;
    this.numOfHits = numOfHits;
  }

  get isSunk() {
    return this.numOfHits === this.length;
  }

  hit() {
    if (!this.isSunk) {
      this.numOfHits += 1;
    }
  }
}

export { Ship };
