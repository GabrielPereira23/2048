/* -------------- Manipula o DOM -------------- */
const DOM = {
  // Container dos blocos
  grid: document.querySelector(".game"),

  // Retorna uma div de bloco 
  createBlock: function (value) {
    let div = document.createElement("div");
    div.innerText = value === 0 ? "" : value;
    div.classList.add(`c${value}`);
    return div;
  },

  // Renderiza os blocos com os valores conforme matriz passada
  renderGrid: function (matrix) {
    this.grid.innerHTML = "";
    matrix.forEach(line => {
      line.forEach(value => this.grid.appendChild(this.createBlock(value)));
    });
  },
};

/* -------------- Jogo -------------- */
const game = {
  // Armazena os números do jogo
  matrix: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],

  // Retorna as posições vazias
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

  // Altera um valor na matriz conforme endereço passado
  setValue: function (lineIndex, colIndex, value) {
    this.matrix[lineIndex][colIndex] = value;
  },

  // Retorna um valor da matriz conforme endereço passado
  getValue: function (lineIndex, colIndex) {
    if (lineIndex < 0 || lineIndex > 3 || colIndex < 0 || colIndex > 3) {
      return 1;
    }
    return this.matrix[lineIndex][colIndex];
  },

  // Limpa a matriz
  clearMatrix: function () {
    this.matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  },

  // Soma os valores iguais que estão colidindo
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

  // Move os valores
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

  // Efetua a jogada
  play: function (direction) {
    this.move(direction);
    this.compress(direction);
    this.move(direction);
    this.createRandomBlock();
    DOM.renderGrid(this.matrix);
  },

  // Cria novos blocos aleatórios
  createRandomBlock: function() {
    let emptyPositions = this.getEmptyPositions();
    if (emptyPositions.length === 0) {
      return;
    }
    let position = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    this.setValue(position[0], position[1], Math.random() >= 0.9 ? 4 : 2);
  },

  // Inicia o jogo
  start: function() {
    this.clearMatrix();
    this.createRandomBlock();
    DOM.renderGrid(this.matrix);
  }
};
game.start();

/* -------------- Eventos de teclas -------------- */
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp') {
    game.play('top');
    return;
  }
  if (event.key === 'ArrowDown') {
    game.play('down');
    return;
  }
  if (event.key === 'ArrowLeft') {
    game.play('left');
    return;
  }
  if (event.key === 'ArrowRight') {
    game.play('right');
    return;
  }
});