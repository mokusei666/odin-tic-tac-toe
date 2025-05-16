const gameboard = (function () {
  let playerXTurn = true;
  const gameboardArray = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];
  const addPlayerMarker = function () {
    const boardCell = document.querySelectorAll('.board-cell');
    boardCell.forEach((cell) => {
      cell.addEventListener('click', () => {
        const index = cell.dataset.index;
        if (playerXTurn && gameboard.gameboardArray[index] === '') {
          gameboard.gameboardArray[index] = 'X';
          playerXTurn = false;
          play.checkWin();
        } else if (!playerXTurn && gameboard.gameboardArray[index] === '') {
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
  const playerX = createPlayer('Cameron', 'X');
  const playerO = createPlayer('Brandon', 'O');
  const gameboardArray = gameboard.gameboardArray;
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
    const resultElement = document.querySelector('.result');
    const allExist = gameboardArray.every(cell => cell !== '');
    for (const [a, b, c] of winCondition)
      if (gameboardArray[a] && gameboardArray[a] === gameboardArray[b] && gameboardArray[a] === gameboardArray[c]) {
        if (gameboardArray[a] === 'X') {
          resultElement.textContent = `Player ${playerX.marker}: ${playerX.playerName}  Wins`;
        } else if (gameboardArray[a] === 'O') {
          resultElement.textContent = `Player ${playerO.marker}: ${playerO.playerName}  Wins`;
        }
      }
    if (allExist) {
      return 'Tie'
    }
  }
  return { checkWin, playerX, playerO }
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
    gameboard.gameboardArray = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];
    renderGameboard();
  }
  return { renderGameboard, reset }
})();

display.renderGameboard();
gameboard.addPlayerMarker();