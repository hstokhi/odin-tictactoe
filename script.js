const Gameboard = (() => {
    const board = [];
    

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++){
            board[i].push(null);
            
        }
    }

    const getBoard = () => board;

    const addToken = (row, column, player) => {
        board[row][column] = player.getToken()
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
    const boardArray = board.getBoard()

    const players = [Player(playerOne, 'X'), Player(playerTwo, 'O')];

    let selectedPlayer = players[0];
    let moveCount = 0;

    const playRound = () => {
        console.log(`Your turn ${selectedPlayer.getPlayer()}`)
        const row = parseInt(prompt('Select Row:'))
        const column = parseInt(prompt('Select Column'))

        if (boardArray[row][column] != null) {
            console.log('Invalid Move. Try Again');
        } else {
            board.addToken(row, column, selectedPlayer);
            moveCount += 1;
            switchPlayers();
        }
        
        if (moveCount >= 5) {checkGame()}

        return boardArray
    }

    const switchPlayers = () => {
        if (selectedPlayer === players[0]) {
            selectedPlayer = players[1];
        } else {selectedPlayer = players[0]}
    }

    //Check all 3-index groups to see if all values are same//
    const checkGame = () => {
        return checkWinner(boardArray[0][0], boardArray[0][1], boardArray[0][2])
            || checkWinner(boardArray[1][0], boardArray[1][1], boardArray[1][2])
            || checkWinner(boardArray[2][0], boardArray[2][1], boardArray[2][2])
            || checkWinner(boardArray[0][0], boardArray[1][0], boardArray[2][0])
            || checkWinner(boardArray[0][1], boardArray[1][1], boardArray[2][1])
            || checkWinner(boardArray[0][2], boardArray[1][2], boardArray[2][2])
            || checkWinner(boardArray[0][0], boardArray[1][1], boardArray[2][2])
            || checkWinner(boardArray[0][2], boardArray[1][1], boardArray[2][0])
            || checkTie()
    }

    const checkTie = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardArray[i][j] === null) return
            }
        }
        console.log('Tie')
    }

    const checkWinner = (i1, i2, i3) => {
        if (i1 != null && i1 === i2 && i2 === i3) {return console.log(`${i1} Wins!`)}
    }

    return {playRound}
})()