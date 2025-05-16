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
          playerXTurn = false;
          play.checkWin();
        } else if (gameActive && !playerXTurn && gameboard.gameboardArray[index] === '') {
          gameboard.gameboardArray[index] = 'O';
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
  let playerX;
  let playerO;
  document.querySelector('.submit-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const playerXName = document.getElementById('player-x').value;
    const playerOName = document.getElementById('player-o').value;
    playerX = playerXName ? createPlayer(playerXName, 'X') : undefined;
    playerO = playerXName ? createPlayer(playerOName, 'O') : undefined;
    document.getElementById('player-x').value = '';
    document.getElementById('player-o').value = '';
    display.displayPlayerNames(playerX.playerName, playerO.playerName);
  });


  const gameboardArray = gameboard.gameboardArray;
  const resultElement = document.querySelector('.result');
  const startButton = document.querySelector('.start-button');
  let gameActive;
  startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Restart') {
      display.reset();
    }

    if (playerX && playerO) {
      gameActive = true;
      startButton.textContent = 'Restart';
      resultElement.textContent = 'Game Start!';
    } else {
      resultElement.textContent = 'Please insert player names';
    }
  });
  if (!gameActive) {
    resultElement.textContent = 'Press Start!'
  }

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
        } else if (gameboardArray[a] === 'O') {
          resultElement.textContent = `Player ${playerO.marker}: ${playerO.playerName}  Wins`;
        }
        gameActive = false;
        return;
      }
    if (allExist) {
      resultElement.textContent = `Tie`;
    }
  }
  const isGameActive = function () {
    if (gameActive) {
      return gameActive;
    }
  }
  return { checkWin, isGameActive }
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
    playerXTurn = true;
    renderGameboard();
  }

  const displayPlayerNames = function (playerX, playerO) {
    const playerNamesDisplay = document.querySelector('.player-names-display');
    playerNamesDisplay.innerHTML = '';
    playerNamesDisplay.innerHTML += `
    <p>Player X: ${playerX}</p>
    <p>Player O: ${playerO}</p>
    `
  }
  return { renderGameboard, reset, displayPlayerNames }
})();

display.renderGameboard();