const gameboard = (function() {
  const gameboardArray = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];
  return { gameboardArray }
})();

console.log(gameboard);

function createPlayer(playerName, marker) {
  return { playerName, marker}
}

console.log(createPlayer('Cameron', 'X'));
console.log(createPlayer('Brandon', 'O'));