const board = document.getElementById('tile-container');
const tile0 = document.getElementById('tile-0');
const tile1 = document.getElementById('tile-1');
const tile2 = document.getElementById('tile-2');
const tile3 = document.getElementById('tile-3');
const tile4 = document.getElementById('tile-4');
const tile5 = document.getElementById('tile-5');
const tile6 = document.getElementById('tile-6');
const tile7 = document.getElementById('tile-7');
const tile8 = document.getElementById('tile-8');
const resetBtn = document.getElementById('reset-btn');

let firstMove = true;
let game = true;
let userTurn = true;
let boardStatus = [0, 1, 2, 3, 4, 5, 6, 7, 8];

board.addEventListener('click', (e) => {
    userTurn ? game ? checkBoard(e.target.id) : null : null;
});

function resetBoard(){
    location.reload();
}

function checkBoard(tileId){
    let currTile = document.getElementById(tileId);
    if(currTile.classList.value !== 'ai' && currTile.classList.value !== 'user'){
        let idValue = parseInt(tileId.split('-')[1]);
        let idIndex = boardStatus.indexOf(idValue);
        currTile.classList.add('user');
        boardStatus.splice(idIndex, 1);
        checkWin('user') ? (game = false, resetBtn.classList.add('reset-active')) : (userTurn = false, setTimeout(() => {
            aiMove(idValue);
            userTurn = true;
            if(checkWin('ai')) {
                game = false;
                resetBtn.classList.add('reset-active');
            }
        }, 500) )
    }
    if(!boardStatus.length && game){
        board.classList.add('draw');
        game = false;
        resetBtn.classList.add('reset-active');
    }

}

function checkWin(turn){
    let win = 'win';
    let winCheck = true;

    if(turn === 'user'){
        win = 'win';
    }
    else{
        win = 'lose';
    }

    if(tile0.classList.value === turn && tile1.classList.value === turn && tile2.classList.value === turn){
        tile0.classList.add(win);
        tile1.classList.add(win);
        tile2.classList.add(win);
    }

    else if(tile3.classList.value === turn && tile4.classList.value === turn && tile5.classList.value === turn){
        tile3.classList.add(win);
        tile4.classList.add(win);
        tile5.classList.add(win);
    }

    else if(tile6.classList.value === turn && tile7.classList.value === turn && tile8.classList.value === turn){
        tile6.classList.add(win);
        tile7.classList.add(win);
        tile8.classList.add(win);
    }

    else if(tile0.classList.value === turn && tile3.classList.value === turn && tile6.classList.value === turn){
        tile0.classList.add(win);
        tile3.classList.add(win);
        tile6.classList.add(win);
    }

    else if(tile1.classList.value === turn && tile4.classList.value === turn && tile7.classList.value === turn){
        tile1.classList.add(win);
        tile4.classList.add(win);
        tile7.classList.add(win);
    }

    else if(tile2.classList.value === turn && tile5.classList.value === turn && tile8.classList.value === turn){
        tile2.classList.add(win);
        tile5.classList.add(win);
        tile8.classList.add(win);
    }

    else if(tile0.classList.value === turn && tile4.classList.value === turn && tile8.classList.value === turn){
        tile0.classList.add(win);
        tile4.classList.add(win);
        tile8.classList.add(win);
    }

    else if(tile2.classList.value === turn && tile4.classList.value === turn && tile6.classList.value === turn){
        tile2.classList.add(win);
        tile4.classList.add(win);
        tile6.classList.add(win);
    }
    else{
        winCheck = false;
    }

    return winCheck;
}

function aiMove(tileId){
    /* Handles the first move after player */
    if(firstMove){
        aiFirstMove(tileId);
    }
    /* Moves to Counter User */
    else{
        if(!aiGeneralMove('ai')){
            aiGeneralMove('user');
        }
    }
}

function aiFirstMove(tileId){

    if(tileId !== 4){
        let idIndex = boardStatus.indexOf(4);
        document.getElementById('tile-4').classList.add('ai');
        boardStatus.splice(idIndex, 1);
    }
    else{
        const choices = [0, 2, 6, 8];
        let aiChoice = Math.floor((Math.random() * choices.length));
        let idValue = choices[aiChoice];
        let idIndex = boardStatus.indexOf(idValue);
        document.getElementById('tile-' + idValue).classList.add('ai');
        boardStatus.splice(idIndex, 1);
    }

    firstMove = false;

}

function aiGeneralMove(turn){

    let winCondition = true;

    /* First Row */
    if(tile0.classList.value === turn && tile1.classList.value === turn && tile2.classList.value === ''){
        tile2.classList.add('ai');
        let idIndex = boardStatus.indexOf(2);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile0.classList.value === turn && tile1.classList.value === '' && tile2.classList.value === turn){
        tile1.classList.add('ai');
        let idIndex = boardStatus.indexOf(1);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile0.classList.value === '' && tile1.classList.value === turn && tile2.classList.value === turn){
        tile0.classList.add('ai');
        let idIndex = boardStatus.indexOf(0);
        boardStatus.splice(idIndex, 1);
    }

    /* Second Row */
    else if(tile3.classList.value === turn && tile4.classList.value === turn && tile5.classList.value === ''){
        tile5.classList.add('ai');
        let idIndex = boardStatus.indexOf(5);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile3.classList.value === turn && tile4.classList.value === '' && tile5.classList.value === turn){
        tile4.classList.add('ai');
        let idIndex = boardStatus.indexOf(4);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile3.classList.value === '' && tile4.classList.value === turn && tile5.classList.value === turn){
        tile3.classList.add('ai');
        let idIndex = boardStatus.indexOf(3);
        boardStatus.splice(idIndex, 1);
    }

    /* Third Row */
    else if(tile6.classList.value === turn && tile7.classList.value === turn && tile8.classList.value === ''){
        tile8.classList.add('ai');
        let idIndex = boardStatus.indexOf(8);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile6.classList.value === turn && tile7.classList.value === '' && tile8.classList.value === turn){
        tile7.classList.add('ai');
        let idIndex = boardStatus.indexOf(7);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile6.classList.value === '' && tile7.classList.value === turn && tile8.classList.value === turn){
        tile6.classList.add('ai');
        let idIndex = boardStatus.indexOf(6);
        boardStatus.splice(idIndex, 1);
    }

    /* First Column */
    else if(tile0.classList.value === turn && tile3.classList.value === turn && tile6.classList.value === ''){
        tile6.classList.add('ai');
        let idIndex = boardStatus.indexOf(6);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile0.classList.value === turn && tile3.classList.value === '' && tile6.classList.value === turn){
        tile3.classList.add('ai');
        let idIndex = boardStatus.indexOf(3);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile0.classList.value === '' && tile3.classList.value === turn && tile6.classList.value === turn){
        tile0.classList.add('ai');
        let idIndex = boardStatus.indexOf(0);
        boardStatus.splice(idIndex, 1);
    }

    /* Second Column */
    else if(tile1.classList.value === turn && tile4.classList.value === turn && tile7.classList.value === ''){
        tile7.classList.add('ai');
        let idIndex = boardStatus.indexOf(7);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile1.classList.value === turn && tile4.classList.value === '' && tile7.classList.value === turn){
        tile4.classList.add('ai');
        let idIndex = boardStatus.indexOf(4);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile1.classList.value === '' && tile4.classList.value === turn && tile7.classList.value === turn){
        tile1.classList.add('ai');
        let idIndex = boardStatus.indexOf(1);
        boardStatus.splice(idIndex, 1);
    }

    /* Third Column */
    else if(tile2.classList.value === turn && tile5.classList.value === turn && tile8.classList.value === ''){
        tile8.classList.add('ai');
        let idIndex = boardStatus.indexOf(8);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile2.classList.value === turn && tile5.classList.value === '' && tile8.classList.value === turn){
        tile5.classList.add('ai');
        let idIndex = boardStatus.indexOf(5);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile2.classList.value === '' && tile5.classList.value === turn && tile8.classList.value === turn){
        tile2.classList.add('ai');
        let idIndex = boardStatus.indexOf(2);
        boardStatus.splice(idIndex, 1);
    }

    /* Left Diagonal */
    else if(tile0.classList.value === turn && tile4.classList.value === turn && tile8.classList.value === ''){
        tile8.classList.add('ai');
        let idIndex = boardStatus.indexOf(8);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile0.classList.value === turn && tile4.classList.value === '' && tile8.classList.value === turn){
        tile4.classList.add('ai');
        let idIndex = boardStatus.indexOf(4);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile0.classList.value === '' && tile4.classList.value === turn && tile8.classList.value === turn){
        tile0.classList.add('ai');
        let idIndex = boardStatus.indexOf(0);
        boardStatus.splice(idIndex, 1);
    }

    /* Right Diagonal */
    else if(tile2.classList.value === turn && tile4.classList.value === turn && tile6.classList.value === ''){
        tile6.classList.add('ai');
        let idIndex = boardStatus.indexOf(6);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile2.classList.value === turn && tile4.classList.value === '' && tile6.classList.value === turn){
        tile4.classList.add('ai');
        let idIndex = boardStatus.indexOf(4);
        boardStatus.splice(idIndex, 1);
    }
    else if(tile2.classList.value === '' && tile4.classList.value === turn && tile6.classList.value === turn){
        tile2.classList.add('ai');
        let idIndex = boardStatus.indexOf(2);
        boardStatus.splice(idIndex, 1);
    }

    /* Corner Counter */
    else if(tile0.classList.value === 'ai' && tile4.classList.value === 'user' && tile8.classList.value === 'user' && turn !== 'ai'){
        if(tile2.classList.value === '' && tile6.classList.value === ''){
            const choices = [2, 6];
            let aiChoice = Math.floor((Math.random() * choices.length));
            let idValue = choices[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(tile2.classList.value === ''){
            let idValue = 2;
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(tile6.classList.value === ''){
            let idValue = 6;
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(turn === 'user' && boardStatus.length){
            let aiChoice = Math.floor((Math.random() * boardStatus.length));
            let idValue = boardStatus[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
    }
    else if(tile2.classList.value === 'ai' && tile4.classList.value === 'user' && tile6.classList.value === 'user' && turn !== 'ai'){
        if(tile0.classList.value === '' && tile8.classList.value === ''){
            const choices = [0, 8];
            let aiChoice = Math.floor((Math.random() * choices.length));
            let idValue = choices[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(tile0.classList.value === ''){
            let idValue = 0;
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(tile8.classList.value === ''){
            let idValue = 8;
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(turn === 'user' && boardStatus.length){
            let aiChoice = Math.floor((Math.random() * boardStatus.length));
            let idValue = boardStatus[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
    }
    else if(tile2.classList.value === 'user' && tile4.classList.value === 'user' && tile6.classList.value === 'ai' && turn !== 'ai'){
        if(tile0.classList.value === '' && tile8.classList.value === ''){
            const choices = [0, 8];
            let aiChoice = Math.floor((Math.random() * choices.length));
            let idValue = choices[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(tile0.classList.value === ''){
            let idValue = 0;
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(tile8.classList.value === ''){
            let idValue = 8;
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(turn === 'user' && boardStatus.length){
            let aiChoice = Math.floor((Math.random() * boardStatus.length));
            let idValue = boardStatus[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
    }
    else if(tile0.classList.value === 'user' && tile4.classList.value === 'user' && tile8.classList.value === 'ai' && turn !== 'ai'){
        if(tile2.classList.value === '' && tile6.classList.value === ''){
            const choices = [2, 6];
            let aiChoice = Math.floor((Math.random() * choices.length));
            let idValue = choices[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(tile2.classList.value === ''){
            let idValue = 2;
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(tile6.classList.value === ''){
            let idValue = 6;
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
        else if(turn === 'user' && boardStatus.length){
            let aiChoice = Math.floor((Math.random() * boardStatus.length));
            let idValue = boardStatus[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
    }

    else if(turn === 'ai'){
        winCondition = false;
    }
    else if(turn === 'user'){
        if(boardStatus.length){
            let aiChoice = Math.floor((Math.random() * boardStatus.length));
            let idValue = boardStatus[aiChoice];
            let idIndex = boardStatus.indexOf(idValue);
            document.getElementById('tile-' + idValue).classList.add('ai');
            boardStatus.splice(idIndex, 1);
        }
    }

    return winCondition;
}


