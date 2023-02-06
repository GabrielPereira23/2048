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
    [2, 4, 0, 0],
    [2, 4, 1024, 1024],
    [2, 2, 0, 0],
    [0, 0, 2, 2],
  ],
  getEmptyPositions: function () {
    let emptyPositions = [];
    this.matrix.forEach((line, lineIndex) => {
      line.forEach((value, colIndex) => {
        if (value === 0) {
          emptyPositions.push([lineIndex, colIndex]);
        }
      });
    });
    return emptyPositions;
  },
  setValue: function (lineIndex, colIndex, value) {
    this.matrix[lineIndex][colIndex] = value;
  },
  getValue: function (lineIndex, colIndex) {
    if (lineIndex < 0 || lineIndex > 3 || colIndex < 0 || colIndex > 3) {
      return 0;
    }
    return this.matrix[lineIndex][colIndex];
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
  compress: function (side) {
    this.matrix.forEach((line, lineIndex) => {
      line.forEach((value, colIndex) => {
        if (value === 0) {
          return;
        }
        if (side === "up") {
          if (value === this.getValue(lineIndex - 1, colIndex)) {
            this.setValue(lineIndex - 1, colIndex, value * 2);
            this.setValue(lineIndex, colIndex, 0);
          }
          return;
        }
        if (side === "down") {
          if (value === this.getValue(lineIndex + 1, colIndex)) {
            this.setValue(lineIndex + 1, colIndex, value * 2);
            this.setValue(lineIndex, colIndex, 0);
          }
          return;
        }
        if (side === "left") {
          if (value === this.getValue(lineIndex, colIndex - 1)) {
            this.setValue(lineIndex, colIndex - 1, value * 2);
            this.setValue(lineIndex, colIndex, 0);
          }
          return;
        }
        if (side === "right") {
          if (value === this.getValue(lineIndex, colIndex + 1)) {
            this.setValue(lineIndex, colIndex + 1, value * 2);
            this.setValue(lineIndex, colIndex, 0);
          }
          return;
        }
      });
    });
    DOM.renderGrid(this.matrix);
  },
};

DOM.renderGrid(game.matrix);
