document.addEventListener('DOMContentLoaded', () => {
    message = document.getElementById('message');
    const board = new Array(9).fill(null);
    const cells = document.querySelectorAll('.box');
    const player = 'O';
    const computer = 'X';

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]


    function checkWinner(board, player) {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === player);
        });
    }

    function isDraw(board) {
        return board.every(cell => cell !== null);
    }


    function minimax(board, depth, isMaxTurn) {
        if (checkWinner(board, computer)) return +1;
        if (checkWinner(board, player)) return -1;
        if (isDraw(board)) return 0;

        if (isMaxTurn) {
            let maxEVal = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = computer;
                    let eval = minimax(board, depth + 1, false);
                    board[i] = null;
                    maxEVal = Math.max(maxEVal, eval);
                }
            }
            return maxEVal;
        } else {
            let maxEVal = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = player;
                    let eval = minimax(board, depth + 1, true);
                    board[i] = null;
                    maxEVal = Math.min(maxEVal, eval);
                }
            }
            return maxEVal;
        }

    }

    function winMessage(str) {
        let nstr;
        if (str != 'draw') {
            nstr = `The winner is ${str}`;
        } else {
            nstr = "Its a DRAW !";
        }

        message.style.display = "block";
        message.innerText = nstr;
    }




    function bestMove(board) {
        let bestEval = -Infinity;
        console.log(bestEval);
        let move;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = computer;
                let eval = minimax(board, 0, false);
                board[i] = null;
                if (bestEval < eval) {
                    bestEval = eval;
                    move = i;
                }
            }
        }
        console.log(bestEval);
        return move;
    }


    function handleClick(event) {
        const index = event.target.dataset.index;
        if (board[index] !== null) return;
        board[index] = player;
        event.target.textContent = player;

        if (checkWinner(board, player)) {
            winMessage("Player");
            return;
        } else if (isDraw(board)) {
            winMessage("draw");
            return;
        }


        const computerMove = bestMove(board);
        board[computerMove] = computer;
        cells[computerMove].textContent = computer;

        if (checkWinner(board, computer)) {
            winMessage("Computer");
            return;
        } else if (isDraw(board)) {
            winMessage("draw");
            return;
        }

    }


    cells.forEach(cell => cell.addEventListener('click', handleClick));


    // computer plays first

    const computerMove = bestMove(board);
    board[computerMove] = computer;
    cells[computerMove].textContent = computer;



    const reset = document.querySelector('button');
    reset.addEventListener('click', () => {
        cells.forEach(cell => cell.innerText = "");
        for (let i = 0; i < 9; i++) {
            board[i] = null;
            message.style.display = "none";
        }

        const computerMove = bestMove(board);
        board[computerMove] = computer;
        cells[computerMove].textContent = computer;
    });


});


