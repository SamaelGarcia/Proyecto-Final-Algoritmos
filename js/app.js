//Dimensionaes del tablero
const ROWS = 8;
const COLS = 8;
const MINES = 10;

let grid = document.getElementById('grid');
let cells = [];
let mineLocations = [];
let minesRemaining = MINES;
let revealedCells = 0;

//Crea celdas y lo inicializa
function initializeGrid() {
  for (let i = 0; i < ROWS; i++) {
    cells[i] = [];
    for (let j = 0; j < COLS; j++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.dataset.state = 'hidden';
      cell.addEventListener('click', handleCellClick);
      grid.appendChild(cell);
      cells[i][j] = cell;
    }
  }
}


//Colocar las minas aleatoriamente
function placeMines() {
  for (let i = 0; i < MINES; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * ROWS);
      col = Math.floor(Math.random() * COLS);
    } while (cells[row][col].dataset.state === 'mine');
    cells[row][col].dataset.mine = 'true';
    mineLocations.push({ row, col });
  }
}

//Maneja un click
function handleCellClick(event) {
  let cell = event.target;
  let row = parseInt(cell.dataset.row);
  let col = parseInt(cell.dataset.col);
  if (cell.dataset.state === 'hidden') {
    if (cell.dataset.mine === 'true') {
      revealMines();
      showMessage('¡Has perdido!', true);
      disableGrid();
    } else {
      let count = countAdjacentMines(row, col);
      cell.textContent = count || ''; 
      cell.dataset.state = 'revealed';
      cell.classList.add('revealed');
      revealedCells++;
      if (count === 0) {
        revealEmptyCells(row, col);
      }
      if (revealedCells === ROWS * COLS - MINES) {
        showMessage('¡Has ganado!', false);
        disableGrid();
      }
    }
  }
}

//Calculo de las minas adyacentes
function countAdjacentMines(row, col) {
  let count = 0;
  for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, ROWS - 1); i++) {
    for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, COLS - 1); j++) {
      if (cells[i][j].dataset.mine === 'true') {
        count++;
      }
    }
  }
  return count;
}

//Revela las celdas vacías
function revealEmptyCells(row, col) {
  for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, ROWS - 1); i++) {
    for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, COLS - 1); j++) {
      let cell = cells[i][j];
      if (cell.dataset.state === 'hidden') {
        let count = countAdjacentMines(i, j);
        cell.textContent = count || '';
        cell.dataset.state = 'revealed';
        cell.classList.add('revealed');
        revealedCells++;
        if (count === 0) {
          revealEmptyCells(i, j);
        }
      }
    }
  }
}

//Para el final revela las vacias
function revealMines() {
  mineLocations.forEach(location => {
    let { row, col } = location;
    cells[row][col].textContent = '*'; //aqui podemos poner simbolos de mina X, *. ...
    cells[row][col].classList.add('revealed', 'mine');
  });
}

//El mensaje de estado
function showMessage(message, isGameOver) {
  let messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.style.padding = '10px';
  messageElement.style.border = '2px solid #333';
  messageElement.style.borderRadius = '5px';
  if (isGameOver) {
    messageElement.style.color = 'red';
    messageElement.style.backgroundColor = '#f8d7da'; // Light red background
  } else {
    messageElement.style.color = 'green';
    messageElement.style.backgroundColor = '#d4edda'; // Light green background
  }
}

//Desabilitamos los clicks
function disableGrid() {
  grid.style.pointerEvents = 'none';
}

//Para resetear el juego
function resetGame() {
  grid.innerHTML = ''; 
  mineLocations = [];
  minesRemaining = MINES;
  revealedCells = 0;
  showMessage('');
  initializeGrid();
  placeMines();
  grid.style.pointerEvents = 'auto';
}

//Inicializar
initializeGrid();
placeMines();
