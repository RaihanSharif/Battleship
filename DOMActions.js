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
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    container.appendChild(row);
    row.id = i.toString();
    for (let j = 0; j < 10; j++) {
      // TODO: check to make sure the rows and columns line up right
      const cell = document.createElement("div");
      const iVal = i.toString();
      const jVal = j.toString();
      cell.id = `${iVal}${jVal}`;
      cell.classList.add("boardCell");

      // if the cell is in the miss list
      // display a miss symbol
      for (let cell of board.missCoords) {
        if (arrEquals(cell, [i, j])) {
          cell.classList.add("missedCell");
        }
      }

      // if the cell is in the hit list
      // display a hit symbol
      for (let cell of board.hitCoords) {
        if (arrEquals(cell, [i, j])) {
          cell.classList.add("hitCell");
        }
      }
      row.appendChild(cell);
    }
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
