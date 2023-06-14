const Gameboard = (() => {
    const board = [];
    let k = 1;
    
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++){
            board[i].push({token: null, index: k});
            k++;
        }
    }

    const getBoard = () => board;

    const addToken = (row, column, player) => {
        board[row][column].token = player.getToken()
    }

    return {getBoard, addToken}
})()

const Player = (player, token) => {
    const getPlayer = () => player;

    const getToken = () => token;

    return {getPlayer, getToken}
}

const GameController = ((playerOne = 'Player 1', playerTwo = 'Player 2') => {
    const board = Gameboard;

    const players = [Player(playerOne, 1), Player(playerTwo, 2)];

    let selectedPlayer = players[0];
    let moveCount = 0;

    const playRound = () => {
        console.log(`Your turn ${selectedPlayer.getPlayer()}`)
        const row = parseInt(prompt('Select Row:'))
        const column = parseInt(prompt('Select Column'))

        if (board.getBoard()[row][column].token != null) {
            console.log('Invalid Move. Try Again');
        } else {
            board.addToken(row, column, selectedPlayer);
            moveCount += 1;
            switchPlayers();
            console.log(`You're next ${selectedPlayer.getPlayer()}`);
        }
        
        if (moveCount >= 6) {checkWinner()}

        return board.getBoard()
    }

    const switchPlayers = () => {
        if (selectedPlayer === players[0]) {
            selectedPlayer = players[1];
        } else {selectedPlayer = players[0]}
    }

    const checkWinner = () => {
        
    }

    const checkTie = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) return
            }
        }
        console.log('Tie')
    }

    return {playRound}
})()