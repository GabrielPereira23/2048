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
    [2, 2, 2, 0],
    [2, 2, 2, 2],
    [0, 0, 2, 0],
    [0, 0, 0, 0],
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
      return 1;
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
  compress: function (direction) {
      this.matrix.forEach((line, lineIndex) => {
        line.forEach((value, colIndex) => {
          if (value === 0) {
            return;
          }
          if (direction === "top" && value === this.getValue(lineIndex - 1, colIndex)) {
            this.setValue(lineIndex - 1, colIndex, value * 2);
            this.setValue(lineIndex, colIndex, 0);
            return;
          }
          if (direction === "down" && value === this.getValue(lineIndex + 1, colIndex)) {
            this.setValue(lineIndex + 1, colIndex, value * 2);
            this.setValue(lineIndex, colIndex, 0);
            return;
          }
          if (direction === "left" && value === this.getValue(lineIndex, colIndex - 1)) {
            this.setValue(lineIndex, colIndex - 1, value * 2);
            this.setValue(lineIndex, colIndex, 0);
            return;
          }
          if (direction === "right" && value === this.getValue(lineIndex, colIndex + 1)) {
            this.setValue(lineIndex, colIndex + 1, value * 2);
            this.setValue(lineIndex, colIndex, 0);
            return;
          }
        });
      });
  },
  move: function (direction) {
    for (var i = 0; i < 3; i++) {
      this.matrix.forEach((line, lineIndex) => {
        line.forEach((value, colIndex) => {
          if (value === 0) {
            return;
          }
          if (direction === "top" && this.getValue(lineIndex - 1, colIndex) === 0) {
            this.setValue(lineIndex - 1, colIndex, value);
            this.setValue(lineIndex, colIndex, 0);
            return;
          }
          if (direction === "down" && this.getValue(lineIndex + 1, colIndex) === 0) {
            this.setValue(lineIndex + 1, colIndex, value);
            this.setValue(lineIndex, colIndex, 0);
            return;
          }
          if (direction === "left" && this.getValue(lineIndex, colIndex - 1) === 0) {
            this.setValue(lineIndex, colIndex - 1, value);
            this.setValue(lineIndex, colIndex, 0);
            return;
          }
          if (direction === "right" && this.getValue(lineIndex, colIndex + 1) === 0) {
            this.setValue(lineIndex, colIndex + 1, value);
            this.setValue(lineIndex, colIndex, 0);
            return;
          }
        });
      });
    }
  },
  play: function (direction) {
    this.move(direction);
    this.compress(direction);
    this.move(direction);
    DOM.renderGrid(this.matrix);
  }
};
DOM.renderGrid(game.matrix);
