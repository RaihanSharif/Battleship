// DOM manipulation code

// for comparing [x, y] coords
function arrEquals(a, b) {
  return a.toString() === b.toString();
}

// renders opponent board
// red for missed shots
// green for successful hits
function renderOpponentBoard(board, container) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("boardCell");
    cell.id = `${x}${y}`;
    cell.textContent = `(${x}, ${y})`;

    for (let coord of board.missCoords) {
      if (arrEquals(coord, [x, y])) {
        cell.classList.add("missedCell");
      }
    }
    for (let coord of board.hitCoords) {
      if (arrEquals(coord, [x, y])) {
        cell.classList.add("hitCell");
        cell.textContent = "💥";
      }
    }
    x++;
    if (x == 10) {
      x = 0;
      y++;
    }
    container.appendChild(cell);
  }
}

function renderPlayerBoard(board, container) {
  let x = 0;
  let y = 0;
  const occupiedCells = []; // array of coords [x, y]
  for (let shPos of board.shipsAndPositions) {
    occupiedCells.push(board.cellsOccupiedByShip(shPos));
  }

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("boardCell");
    cell.id = `${x}${y}`;
    cell.textContent = `(${x}, ${y})`;

    for (let coord of board.missCoords) {
      if (arrEquals(coord, [x, y])) {
        cell.classList.add("missedCell");
      }
    }
    for (let coord of board.hitCoords) {
      if (arrEquals(coord, [x, y])) {
        cell.classList.add("playerShipHit");
        cell.textContent = "💥";
      }
    }

    //
    for (let ship of occupiedCells) {
      for (let coord of ship) {
        if (arrEquals(coord, [x, y])) {
          cell.classList.add("shipCell");
        }
      }
    }
    x++;
    if (x == 10) {
      x = 0;
      y++;
    }
    container.appendChild(cell);
  }
}

// change a single cell after an attack
function changeCellStatus(cell, hitStatus) {
  if (hitStatus === true) {
    cell.classList.add("hitCell");
    cell.textContent = "💥";
  }
  if (hitStatus === false) {
    cell.classList.add("missedCell");
  }
}

function handleAttack(event, board) {
  const target = event.target;
  if (target.classList.contains("boardCell")) {
    const x = parseInt(target.id[0]);
    const y = parseInt(target.id[1]);
    const attackResult = board.receiveAttack(x, y);
    changeCellStatus(target, attackResult);
    return attackResult;
  }
}

export {
  renderOpponentBoard,
  renderPlayerBoard,
  changeCellStatus,
  handleAttack,
};
