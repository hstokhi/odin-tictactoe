const Gameboard = (() => {
    const board = [];
    

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++){
            board[i].push(null);
        }
    }}

    const getBoard = () => board;

    const addToken = (row, column, player) => {
        board[row][column] = player//.getToken()//
    }
    
    resetBoard()

    return {getBoard, addToken, resetBoard}
})()




const Player = (player, token) => {
    const getPlayer = () => player;

    const getToken = () => token;

    return {getPlayer, getToken}
}




const GameController = ((playerOne, playerTwo) => {
    const board = Gameboard;
    const boardArray = board.getBoard()

    const players = [Player(playerOne, 'X'), Player(playerTwo, 'O')];

    let selectedPlayer = players[0];
    let moveCount = 0;

    const playRound = (location) => {
        const row = location[0];
        const column = location[1];

        if (boardArray[row][column] != null) {
            console.log('Invalid Move. Try Again');
        } else {
            board.addToken(row, column, selectedPlayer);
            moveCount += 1;
            switchPlayers();
        }
        
        if (moveCount >= 5) {checkGame()}
        DisplayController.displayBoard()
        console.log(boardArray)
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
        DisplayController.message.textContent = "Tie"
        DisplayController.removeListener(row, column)
    }

    const checkWinner = (i1, i2, i3) => {
        if (i1 != null && i1 === i2 && i2 === i3) {
            DisplayController.message.textContent = `${i1.getPlayer()} Wins!`;
            DisplayController.removeListener(row, column);
        }//return console.log(`${i1} Wins!`)//
    }

    return {playRound, players}
})('Player 1', 'Player 2')




const DisplayController = (() => {
    const board = Gameboard.getBoard()

    const gameContainer = document.querySelector('.game-container')

    const message = document.querySelector('.message-container')

    const removeListener = (row, column) => {
        document.querySelector(`[data-row="${row}][data-column="${column}"]`).removeEventListener('click', () => {listenerFunction(row, column)})
    }

    const displayBoard = () => {

        clear(gameContainer)

        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                const div = document.createElement('div')
                div.classList.add('game-cell')
                div.dataset.row = row;
                div.dataset.column = column;
                (board[row][column] != null) ? div.textContent = board[row][column].getToken() : div.textContent = '';
                gameContainer.appendChild(div)
                div.addEventListener('click', () => {listenerFunction(row, column)}, {once : true})
            }
        }
    }

    const listenerFunction = (row, column) => {
        GameController.playRound([row, column])
    }

    const clear = (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }

    document.querySelector('#start').addEventListener('click', () => {
        message.textContent = 'Your turn Player 1'
        Gameboard.resetBoard();
        displayBoard();
    })

    document.querySelector('#restart').addEventListener('click', () => {
        
    })

    return {displayBoard, removeListener, message}
})()