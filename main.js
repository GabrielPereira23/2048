let matrix = [[2,4,8,16],[32,64,128,256],[512,1024,2048,0],[0,0,0,0]];

const DOM = {
  grid: document.querySelector('.game'),
  createBlock: function(value) {
    let div = document.createElement('div');
    div.innerText = value === 0 ? '' : value;
    div.classList.add(`c${value}`);
    return div;
  },
  render: function(matrix) {
    this.grid.innerHTML = '';
    matrix.forEach(line => {
      line.forEach(value => this.grid.appendChild(this.createBlock(value)));
    });
  }
}

DOM.render(matrix);