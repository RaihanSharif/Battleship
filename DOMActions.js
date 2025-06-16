// DOM manipulation code

// render a board onto a DOM container element

// simple arrays with numbers
function arrEquals(a, b) {
  return a.toString() === b.toString();
}

// renders opponent board
// black for missed shots
// green for successful hits
function renderOpponentBoard(board, container) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("boardCell");
    cell.id = `${x}${y}`;
    x++;
    if (x == 10) {
      x = 0;
      y++;
    }
    for (let coord of board.missCoords) {
      if (arrEquals(coord, [x, y])) {
        cell.classList.add("missedCell");
      }
    }
    for (let coord of board.hitCoords) {
      if (arrEquals(coord, [x, y])) {
        cell.classList.add("hitCell");
      }
    }
    container.appendChild(cell);
  }
}

function renderPlayerBoard(board, container) {
  // render empty cells,
  // render ships based on the ship cells occupied
}

// change a single cell after a
function changeCellStatus(cell, hitStatus) {
  if (hitStatus === true) {
    cell.classList.add("hitCell");
  }
  if (hitStatus === false) {
    cell.classList.add("missedCell");
  }
}

export { renderOpponentBoard, changeCellStatus };
