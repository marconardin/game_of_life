document.addEventListener("DOMContentLoaded", () => {
  let random = true;

  createBoard();
  if (random) randomizeCells();
  clickCellOnOff();
  createButtons();
});

function createBoard() {
  const N = 10;
  const tbl = document.createElement("table");
  tbl.style.margin = "20px auto 20px auto";
  document.body.appendChild(tbl);
  document.body.appendChild(document.createElement("p"));
  for (let i = 0; i < N; i++) {
    const tr = document.createElement("tr");
    tbl.appendChild(tr);
    for (let j = 0; j < N; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);
    }
  }
}

function randomizeCells() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    // 25% chance to fill cell
    const filled = Math.random() < 0.25;
    if (filled) {
      cell.classList.add("filled");
    }
  });
}

function clickCellOnOff() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      this.classList.toggle("filled");
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
  const btns = ['START', 'STOP', 'RESET'];
  const btnBox = document.createElement('div');
  document.body.appendChild(btnBox);
  btnBox.style.margin = "auto";
  btnBox.style.padding = "1rem";
  btnBox.style.display = "flex";
  btnBox.style.justifyContent = "center";
  for (let btnText of btns) {
    const startBtn = document.createElement("button");
    startBtn.style.height = "50px";
    startBtn.style.width = "100px";
    startBtn.innerText = btnText;
    btnBox.appendChild(startBtn);
  }
}
