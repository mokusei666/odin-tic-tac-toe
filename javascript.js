const gameboard = (function () {
  let playerXTurn = true;
  let gameboardArray = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];
  const addPlayerMarker = function () {
    const boardCell = document.querySelectorAll('.board-cell');
    boardCell.forEach((cell) => {
      cell.addEventListener('click', () => {
        const gameActive = play.isGameActive();
        const index = cell.dataset.index;
        if (gameActive && playerXTurn && gameboard.gameboardArray[index] === '') {
          gameboard.gameboardArray[index] = 'X';
          console.log(gameboardArray);

          playerXTurn = false;
          play.checkWin();
        } else if (gameActive && !playerXTurn && gameboard.gameboardArray[index] === '') {
          gameboard.gameboardArray[index] = 'O';
          console.log(gameboardArray);
          playerXTurn = true;
          play.checkWin();
        }
        display.renderGameboard();
      })
    })
  }
  return { gameboardArray, addPlayerMarker }
})();

function createPlayer(playerName, marker) {
  return { playerName, marker }
}

const play = (function () {
  const gameboardArray = gameboard.gameboardArray;
  const resultElement = document.querySelector('.result');
  let gameActive;
  const startButton = document.querySelector('.start-button');
  startButton.addEventListener('click', () => {
    gameActive = true;
    startButton.textContent = 'Restart'
    resultElement.textContent = 'Game Start!';
    if (startButton.textContent === 'Restart') {
      startButton.addEventListener('click', () => {
        display.reset();
      })
    }
  });
  if (!gameActive) {
    resultElement.textContent = 'Press Start!'
  }

  const playerX = createPlayer('Cameron', 'X');
  const playerO = createPlayer('Brandon', 'O');
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const checkWin = function () {
    const allExist = gameboardArray.every(cell => cell !== '');
    for (const [a, b, c] of winCondition)
      if (gameboardArray[a] && gameboardArray[a] === gameboardArray[b] && gameboardArray[a] === gameboardArray[c]) {
        if (gameboardArray[a] === 'X') {
          resultElement.textContent = `Player ${playerX.marker}: ${playerX.playerName}  Wins`;
          gameActive = false;
        } else if (gameboardArray[a] === 'O') {
          resultElement.textContent = `Player ${playerO.marker}: ${playerO.playerName}  Wins`;
          gameActive = false;
        }
      }
    if (allExist) {
      return 'Tie'
    }
  }
  const isGameActive = function () {
    if (gameActive) {
      return gameActive;
    }
  }
  return { checkWin, playerX, playerO, isGameActive }
})();

const display = (function () {
  const displayElement = document.getElementById('display');
  const renderGameboard = function () {
    displayElement.innerHTML = '';
    for (let i = 0; i < gameboard.gameboardArray.length; i++) {
      const div = document.createElement('div');
      div.classList.add('board-cell');
      div.innerHTML = gameboard.gameboardArray[i];
      displayElement.appendChild(div);
      div.dataset.index = i;
    }
    gameboard.addPlayerMarker();
  }

  const reset = function () {
    for (i = 0; i < gameboard.gameboardArray.length; i++) {
      gameboard.gameboardArray[i] = '';
    }
    renderGameboard();
  }
  return { renderGameboard, reset }
})();

display.renderGameboard();