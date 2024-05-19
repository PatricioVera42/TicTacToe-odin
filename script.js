const player = (marker) => {
    this.marker = marker;

    const getMarker = () => {
        return marker;
    }

    return {getMarker };
}


function Gameboard(){
    const board = ["", "", "", "", "", "", "", "", ""];
    
    const getBoard = (cell) => {
        return board[cell];
    }

    const placeMark = (cell, marker) => {
        board[cell] = marker;
    }

    const resetBoard = () => {
        for (i = 0; i < board.length(); i++){
            board[i] = "";
        }    
    }

    return {getBoard, placeMark, resetBoard, board };
}

function cell(){
    let value = "";
    
    const getValue = () => value;
    
    const addMark = (marker) => {
        value = marker;
    }
    
    return {addMark, getValue};
}

function DisplayGame(){
    const board1 = Gameboard();
    const game = Game();
    const board2 = document.querySelectorAll(".box");
    for (i = 0; i < 9; i++){
        board1.placeMark(i, board2.item(i).innerHTML);
    }

    const displayboard = () => {
        for (i = 0; i < 9; i++){
           board2.item(i).innerHTML= board1.getBoard(i).valueOf();
        }
    }

    board2.forEach((box) => 
        box.addEventListener("click", () => {
        })
    );

    return {displayboard};
}

function Game(){
    const playerX = Player("X");
    const playerO = Player("O");
    let round  = 1;
    let isOver = false;

    const playRound = (cell) => {
        Gameboard.placeMark(cell, getCurrentPlayerMark());
    }
    const getIsOver = () => {
        return getIsOver;
    }
    const resetGame = () => {
        round = 1;
        isOver = false;
    }

    const getCurrentPlayerMark = () => {
        return round % 2 == 1 ? playerX.getSign() : playerO.getSign();
      };

    return { playRound, getIsOver, resetGame};
}