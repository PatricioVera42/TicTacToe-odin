const player =  (marker) => {
    this.marker = marker;

    const getmarker = () => marker;

    return { getmarker };
}

function displaygame(){
    let player1 = player("X");
    const player2 = player("O");
    const game = logicalGame();
    const boardGame = document.querySelectorAll(".box");
    const restartButton = document.querySelector("button");
    const resultMessage = document.querySelector("h2");
    let winner = "";
    let activePlayer = player1;
    let round = 1;
    let scores = document.querySelectorAll(".number-message");

    restartButton.addEventListener("click", () => {
        for (i = 0; i < scores.length; i++){
            scores[i].innerHTML = "0";
        }
        resultMessage.innerHTML = "";
        resetGame();
    })

    boardGame.forEach((box) => {
        box.addEventListener("click", function(){
            if(box.innerHTML == ""){
                const cell = box.id;
                game.playRound(cell, activePlayer.getmarker());
                passGameToDisplay();
                switchPlayer();
                winner = game.isFinished();
                passGameToDisplay();
                if (winner != ""){
                    resultMessage.innerHTML = "The winner is: " + winner;
                    if (winner == "player1"){
                        scores[0].innerHTML = parseInt(scores[0].innerHTML) + 1;
                    } else {
                        scores[1].innerHTML = parseInt(scores[1].innerHTML) + 1;
                    }
                    resetGame();
                } else {
                    winner = game.isADraw();
                    if (winner != ""){
                        resultMessage.innerHTML = "It's a Draw";
                        resetGame();
                    }
                }
            }
            
        })
    })

    const resetGame = () => {
        game.resetboard();
        passGameToDisplay();
        round = 1;
        winner = "";
        activePlayer = player1;
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
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"],

    ]
    const playRound = (cell, marker) => {
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
    }

    const getBoardat = (cell) => board[cell];

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
            arrayX = [];
            arrayO = [];
            return "draw";
        } else{
            return "";
        }
    };    

    const resetboard = () => {
        arrayX = [];
        arrayO = [];
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return { playRound, getBoardat, isADraw, isFinished, resetboard};
}

displaygame();