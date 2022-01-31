
const cell = document.querySelectorAll(".cell");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const gameBoardState = Array(cell.length);
gameBoardState.fill(null);

//Elements
const three = document.getElementById("three");
const gameOver = document.getElementById("gameOver");
const gameOverText = document.getElementById("gameOverText");
const playAgain = document.getElementById("playAgain");
playAgain.addEventListener("click", startNewGame);

//Sounds
// const gameOverSound = new Audio("sounds/game_over.wav");
// const clickSound = new Audio("sounds/click.wav");

cell.forEach((cell) => cell.addEventListener("click", cellClick));

function setHoverText() {
  //remove all hover text
  cell.forEach((cell) => {
    cell.classList.remove("x-hover");
    cell.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  cell.forEach((cell) => {
    if (cell.innerText == "") {
      cell.classList.add(hoverClass);
    }
  });
}

setHoverText();

function cellClick(event) {
  if (gameOver.classList.contains("visible")) {
    return;
  }

  const cell = event.target;
  const cellNumber = cell.dataset.index;
  if (cell.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    cell.innerText = PLAYER_X;
    gameBoardState[cellNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    cell.innerText = PLAYER_O;
    gameBoardState[cellNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

//   clickSound.play();
  setHoverText();
  checkWinner();
}

function checkWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, threeClass } = winningCombination;
    const cellValue1 = gameBoardState[combo[0] - 1];
    const cellValue2 = gameBoardState[combo[1] - 1];
    const cellValue3 = gameBoardState[combo[2] - 1];

    if (
      cellValue1 != null &&
      cellValue1 === cellValue2 &&
      cellValue1 === cellValue3
    ) {
      three.classList.add(threeClass);
      gameOverScreen(cellValue1);
      return;
    }
  }

  //Check for a draw
  const allcellFilledIn = gameBoardState.every((cell) => cell !== null);
  if (allcellFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOver.className = "visible";
  gameOverText.innerText = text;
  gameOverSound.play();
}

function startNewGame() {
  three.className = "three";
  gameOver.className = "hidden";
  gameBoardState.fill(null);
  cell.forEach((cell) => (cell.innerText = ""));
  turn = PLAYER_X;
  setHoverText();
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], threeClass: "three-row-1" },
  { combo: [4, 5, 6], threeClass: "three-row-2" },
  { combo: [7, 8, 9], threeClass: "three-row-3" },
  //columns
  { combo: [1, 4, 7], threeClass: "three-column-1" },
  { combo: [2, 5, 8], threeClass: "three-column-2" },
  { combo: [3, 6, 9], threeClass: "three-column-3" },
  //diagonals
  { combo: [1, 5, 9], threeClass: "three-diagonal-1" },
  { combo: [3, 5, 7], threeClass: "three-diagonal-2" },
];


