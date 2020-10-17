document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  randomizeCells();
});

function createBoard() {
  console.log("test");
  const N = 10;
  const tbl = document.createElement("table");
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
/*
function randomizeCells() {
    const cells = document.querySelectorAll('td');
    newCells = cells.map(cell => {
        // 50% chance to fill cell
        const filled = Math.floor(Math.random() * Math.floor(2));
    });
}
*/