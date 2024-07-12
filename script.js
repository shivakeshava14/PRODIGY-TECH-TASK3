const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayer = X_CLASS;
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

function handleClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  cells[index].classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return board.every(cell => cell !== '');
}

function endGame(draw) {
  if (draw) {
    statusDisplay.textContent = "It's a draw!";
  } else {
    statusDisplay.textContent = `${currentPlayer} wins!`;
  }
  gameActive = false;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = X_CLASS;
  gameActive = true;
  statusDisplay.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
  });
}
