/* --- Manipula o DOM --- */
const DOM = {
  grid: document.querySelector(".game"),
  createBlock: function (value) {
    let div = document.createElement("div");
    div.innerText = value === 0 ? "" : value;
    div.classList.add(`c${value}`);
    return div;
  },
  renderGrid: function (matrix) {
    this.grid.innerHTML = "";
    matrix.forEach((line) => {
      line.forEach((value) => this.grid.appendChild(this.createBlock(value)));
    });
  },
};

/* --- Jogo --- */
const game = {
  matrix: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  getEmptyPositions: function () {
    let emptyPositions = [];
    this.matrix.forEach((line, posLine) => {
      line.forEach((value, colPos) => {
        if (value === 0) {
          emptyPositions.push([posLine, colPos]);
        }
      });
    });
    return emptyPositions;
  },
  setValue: function (line, col, value) {
    this.matrix[line][col] = value;
    DOM.renderGrid(this.matrix);
  },
  clearMatrix: function () {
    this.matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    DOM.renderGrid(this.matrix);
  },
};