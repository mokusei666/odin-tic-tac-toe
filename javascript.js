const gameboard = (function () {
  const gameboardArray = [
    'O', 'O', 'O',
    '', '', '',
    '', '', ''
  ];
  return { gameboardArray }
})();

console.log(gameboard);

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
    [0, 4, 5],
    [2, 4, 6]
  ];
  const checkWin = function () {
    const allExist = gameboardArray.every(cell => cell !== '');
    for (const [a, b, c] of winCondition)
      if (gameboardArray[a] && gameboardArray[a] === gameboardArray[b] && gameboardArray[a] === gameboardArray[c]) {
        if (gameboardArray[a] === 'X') {
          return `Player ${playerX.marker}: ${playerX.playerName}  Wins`;
        } else if (gameboardArray[a] === 'O') {
          return `Player ${playerO.marker}: ${playerO.playerName}  Wins`;
        }
      }
    if (allExist) {
      return 'Tie'
    }
  }
  return { checkWin }
})();