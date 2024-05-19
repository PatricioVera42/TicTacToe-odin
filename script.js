const player =  (marker) => {
    this.marker = marker;
    
    const getmarker = () => marker;

    return { getmarker };
}

function displaygame(){
    const player1 = player("X");
    const player2 = player("O");
    const game = logicalGame();
    const boardGame = document.querySelectorAll(".box");
    let winner = "";
    let activePlayer = player1;
    let round = 1;
    let gameIsOver = false;

    boardGame.forEach((box) => {
        box.addEventListener("click", function(){
            if(box.innerHTML == ""){
                const cell = box.id;
                game.playRound(cell, activePlayer.getmarker());
                passGameToDisplay();
                switchPlayer();
                winner = game.isFinished();
                if (winner != ""){
                    window.alert("The winner is: " + winner);
                    resetGame();
                } else {
                    winner = game.isADraw();
                    if (winner != ""){
                        window.alert("It's a " + winner);
                        resetGame();
                    }
                }
            }
            
        })
    })

    const isEmpty = () => {
        let res = true;
        for (i = 0; i < boardGame.length() && res; i++){
            if (boardGame.item(i).innerHTML != ""){
                res = false;
            }
        }
        return res;
    }

    const resetGame = () => {
        game.resetboard();
        passGameToDisplay();
        round = 1;
        winner = "";
        gameIsOver = false;
    };

    const switchPlayer = () => {
        activePlayer = activePlayer == player1 ? player2 : player1;
    }

    passGameToDisplay = () => {
        for (i = 0; i < 9; i++){
            boardGame.item(i).innerHTML = game.getBoardat(i);
        }
    }

    passGameToDisplay();

    return { resetGame };
}

function logicalGame(){
    let board = ["", "", "", "", "", "", "", "", ""];
    let arrayX = [];
    let arrayO = [];
    const winingPosition = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "3", "6"],
        ["2", "5", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"],

    ]
    let over = false;
    const playRound = (cell, marker) => {
        if (!over){
            if (board[cell] == ""){
                board[cell] = marker;
                if (marker == "X"){
                    arrayX.push(cell);
                    arrayX.sort((a,b)=> a-b);
                } else {
                    arrayO.push(cell);
                    arrayO.sort((a,b) => a-b);
                }
            }
        } else {
            resetboard();
        }
    }

    const getBoardat = (cell) => board[cell];

    const getLength = () => board.length;

    const isFinished = () => {
        let res = false;
        let sub = [];
        for (i = 0; i < winingPosition.length && !res; i++){
            sub = [];
            for (j = 0; j < 3; j++){
                if (arrayX.includes(winingPosition[i][j])){
                    sub.push(winingPosition[i][j]);
                }
            }
            if (sub.length == 3){
                arrayX = [];
                arrayO = [];
                resetboard();
                return "player1";
            } 
        }
        for (i = 0; i < winingPosition.length && !res; i++){
            sub = [];
            for (j = 0; j < 3; j++){
                if (arrayO.includes(winingPosition[i][j])){
                    sub.push(winingPosition[i][j]);
                }
            }
            if (sub.length == 3){
                arrayX = [];
                arrayO = [];
                resetboard();
                return "player2";
            } 
        }
        if(!res){
            return "";
        }
        
        
    }
    const isADraw = () => {
        let res = true;
        for (i = 0; i < 9; i++){
            if (board[i] == ""){
                res  = false;
            }
        }
        if(res){
            resetboard();
            arrayX = [];
            arrayO = [];
            return "draw";
        } else{
            return "";
        }
    };    

    const resetboard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return { playRound, getBoardat, isADraw, isFinished, resetboard, getLength};
}

displaygame();