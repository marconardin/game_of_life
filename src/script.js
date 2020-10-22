let generation = 0;
let genCounter = document.createElement("p");
let random = true;
let animationId;

document.addEventListener("DOMContentLoaded", () => {
  // FIXME: reset will not stop the game if it hasn't been stopped

  // TODO: adjust and slow down game speed
  // TODO: add preset configurations, not just random
  // TODO: step by step button
  // TODO: speed up and slow down steps?
  // TODO: allow changing of the size of the gameboard
  //      either dynamic (i.e. ajax) or static
  // TODO: visual effects (e.g. fading trails)
  // TODO: create buffer to handle movements out of bounds

  createBoard();
  if (random) randomizeCells();
  clickCellOnOff();

  genCounter.innerText = `Generation: ${generation}`;
  document.body.appendChild(genCounter);

  createButtons();

  const startBtn = document.querySelector("#start");
  const stopBtn = document.querySelector("#stop");
  const resetBtn = document.querySelector("#reset");

  startBtn.addEventListener("click", () => {
    animationId = requestAnimationFrame(runGame);
    startBtn.setAttribute("disabled", true)
    stopBtn.removeAttribute("disabled")
  })
  stopBtn.addEventListener("click", () => {
    cancelAnimationFrame(animationId);
    stopBtn.setAttribute("disabled", true)
    startBtn.removeAttribute("disabled")
  })

  resetBtn.addEventListener("click", resetBoard);
});

function createBoard() {
  const N = 50;
  const tbl = document.createElement("table");
  tbl.style.margin = "20px auto 20px auto";
  document.body.appendChild(tbl);
  for (let i = 0; i < N; i++) {
    const tr = document.createElement("tr");
    tbl.appendChild(tr);
    for (let j = 0; j < N; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);
    }
  }
}

function resetBoard() {
  generation = 0;
  genCounter.innerText = `Generation: ${generation}`;
  clearBoard();
  if (random) randomizeCells();
}

function clearBoard() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.classList.remove("alive");
  });
}

function randomizeCells() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    const alive = Math.random() < 0.25;
    if (alive) {
      cell.classList.add("alive");
    }
  });
}

function clickCellOnOff() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      this.classList.toggle("alive");
      this.style.backgroundColor = "";
    });
    cell.addEventListener("mouseover", function () {
      this.style.backgroundColor = "pink";
    });
    cell.addEventListener("mouseout", function () {
      this.style.backgroundColor = "";
    });
  });
}

function createButtons() {
  const btns = ["START", "STOP", "RESET"];
  const btnBox = document.createElement("div");
  btnBox.classList.add("button-box");
  document.body.appendChild(btnBox);
  btnBox.style.margin = "auto";
  btnBox.style.padding = "1rem";
  btnBox.style.display = "flex";
  btnBox.style.justifyContent = "center";
  for (let btnText of btns) {
    const btn = document.createElement("button");
    btn.style.height = "50px";
    btn.style.width = "100px";
    btn.innerText = btnText;
    btn.id = btnText.toLowerCase();
    btnBox.appendChild(btn);
  }
}

function runGame() {
  const table = document.querySelector("table");
  const cells = document.querySelectorAll("td");

  for (let cell of cells) {
    const rowIndex = cell.parentElement.rowIndex;
    const cellIndex = cell.cellIndex;

    // determine number of alive neighbors
    let aliveNeighbors = 0;
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = cellIndex - 1; j <= cellIndex + 1; j++) {
        if (rowIndex == i && cellIndex == j) continue;
        if (
          i >= 0 &&
          i < table.rows.length &&
          j >= 0 &&
          j < table.rows[0].cells.length
        ) {
          if (table.rows[i].cells[j].classList.contains("alive"))
            aliveNeighbors++;
        }
      }
    }

    // update the next state of the cell
    if (cell.classList.contains("alive")) {
      cell.nextAlive =
        aliveNeighbors == 2 || aliveNeighbors == 3 ? true : false;
    } else {
      cell.nextAlive = aliveNeighbors == 3 ? true : false;
    }
  }

  // update the table values
  // for (let cell of cells) {
  cells.forEach((cell) => {
    if (cell.nextAlive) cell.classList.add("alive");
    if (!cell.nextAlive) cell.classList.remove("alive");
  });
  genCounter.innerText = `Generation: ${++generation}`;
  animationId = requestAnimationFrame(runGame);
}
