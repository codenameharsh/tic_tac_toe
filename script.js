const gameOverMessageElement = document.createElement('div');
gameOverMessageElement.id = 'game-over-message';
document.body.appendChild(gameOverMessageElement);

const gameBoardElement = document.createElement('div');
gameBoardElement.id = 'game-board';
document.body.appendChild(gameBoardElement);

const player1NameElement = document.createElement('input');
player1NameElement.id = 'player1-name';
player1NameElement.placeholder = 'Player 1 Name';
document.body.appendChild(player1NameElement);

const player2NameElement = document.createElement('input');
player2NameElement.id = 'player2-name';
player2NameElement.placeholder = 'Player 2 Name';
document.body.appendChild(player2NameElement);

const startGameButton = document.createElement('button');
startGameButton.textContent = 'Start Game';
startGameButton.classList.add('game-controls')
startGameButton.addEventListener('click', startGame);
document.body.appendChild(startGameButton);

const resetGameButton = document.createElement('button');
resetGameButton.textContent = 'Reset Game';
resetGameButton.classList.add('game-controls')
resetGameButton.addEventListener('click', resetGame);
document.body.appendChild(resetGameButton);

let player1Name = '';
let player2Name = '';
let currentPlayer = '';
let boardState = new Array(9).fill('');
let winner = null;

function startGame() {
    player1Name = player1NameElement.value;
    player2Name = player2NameElement.value;
    currentPlayer = 'X';
    createGameBoard();
}

function resetGame() {
    player1Name = '';
    player2Name = '';
    currentPlayer = '';
    boardState = new Array(9).fill('');
    winner = null;
    gameBoardElement.innerHTML = '';
    gameOverMessageElement.textContent = '';
    player1NameElement.value = '';
    player2NameElement.value = '';
}

function createGameBoard() {
    gameBoardElement.innerHTML = '';
    for(let i=0; i < 9; i++ ){
        const button = document.createElement('button');
        button.dataset.index = i;
        button.addEventListener('click', handleButtonClick);
        gameBoardElement.appendChild(button);
    }
}

function handleButtonClick(event) {
    const button = event.target;
    const index= parseInt(button.dataset.index);

    //check if button is already occupied
    if (boardState[index] !== ''){
        return;
    }

    //update boardState
    boardState[index] = currentPlayer;

    //update buttontext
    button.textContent = currentPlayer;

    //check for winner
    checkForWinner();

    //check if game over
    checkForGameOver()

    //switch to next player
    currentPlayer = currentPlayer === 'X' ? "O" : "X";
}

function checkForWinner(){

    //check rows
    for(i = 0; i < 3; i++){
        if (boardState[i * 3] === boardState[i * 3 + 1] 
            && boardState[i * 3 + 1] === boardState[i * 3 + 2] 
            && boardState[i * 3] !== '') {
        winner = boardState[i * 3];
        return;
       }
    }

    //check columns
    for(i = 0; i < 3; i++){
        if (boardState[i] === boardState[i + 3] 
            && boardState[i + 3] === boardState[i + 6] 
            && boardState[i] !== '') {
        winner = boardState[i];
        return;
       }
    }

    //check diagonals
    if ((boardState[0] === boardState[4] && boardState[4] === boardState[8] && boardState[0] !== '') ||
    (boardState[2] === boardState[4] && boardState[4] === boardState[6] && boardState[2] !== '')) {
        winner = boardState[4];
        return;
    }
}

function checkForGameOver() {
    if (winner !== null) {
        displayGameOverMessage();
    } else if (!boardState.includes('')) {
        displayGameOverMessage();
    }
}

function displayGameOverMessage() {
    if (winner !== null) {
        gameOverMessageElement.textContent = `Player ${winner} (${winner === 'X' ? player1Name : player2Name}) wins!`;
    } else {
        gameOverMessageElement.textContent = 'It\'s a draw!';
    }
}