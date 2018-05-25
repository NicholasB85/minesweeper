// game logic

//sets the number of rows 
let columns = 10, rows = 10, mines = 10;

let board = [];
let state = [];
// sets the different flag action actions.
let actionClosed = 0,
    actionFlags = 1,
    actionOpen = 2;
let mineBlock = -1;
//sets value to player so I can allow the player to click later
let player = true;

//inbounds function keeps the board generated 

//timer functionality variables
function inBounds(row, column) {
    return row >= 0 && column >= 0
        && row < columns && column < rows;
}
//logic to determine number around a given mine.
function countMinesAround(row, column) {
    let count = 0;
    for (let differentRow = -1; differentRow <= 1; ++differentRow) {
        for (let differentColumn = -1; differentColumn <= 1; ++differentColumn) {
            if (differentRow == 0 && differentColumn == 0) {
                continue;
            }
            let yy = column + differentColumn,
                xx = row + differentRow;
            if (inBounds(xx, yy)) {
                if (board[yy][xx] == mineBlock) {
                    ++count;
                }
            }
        }
    }
    return count;
}

function init() {
    for (let column = 0; column < rows; ++column) {
        board.push([]);
        state.push([]);
        for (let row = 0; row < columns; ++row) {
            board[column].push(0);
            state[column].push(actionClosed);
        }
    }
// loop to set mines in random locations.
    for (let mine = 0; mine < mines; ++mine) {
        let row, column;
        do {
            row = Math.floor(Math.random() * columns),
            column = Math.floor(Math.random() * rows);
        } while (board[column][row] == mineBlock);

        board[column][row] = mineBlock;
    }

    for (let column = 0; column < rows; ++column) {
        for (let row = 0; row < columns; ++row) {
            if (board[column][row] != mineBlock) {
                board[column][row] = countMinesAround(row, column);
            }
        }
    }

}

function openBlock(row, column) {
    if (!player) {
        return;
    }
    if (state[column][row] == actionFlags) {
        return;
    }

    if (board[column][row] == mineBlock) {
        alert('Game over!');
        player = false;
        revealBoard(false);
        return;
    }

    state[column][row] = actionOpen;
    if (board[column][row] == 0) {
        for (let differentRow = -1; differentRow <= 1; ++differentRow) {
            for (let differentColumn = -1; differentColumn <= 1; ++differentColumn) {
                let xx = row + differentRow,
                    yy = column + differentColumn;
                if (inBounds(xx, yy)) {
                    if (state[yy][xx] != actionOpen) {
                        openBlock(xx, yy);
                    }
                }
            }
        }
    }
// call back to the check victory function.
    if (checkVictory()) {
        alert('You are the winner');
        player = false;
        revealBoard(true);
    }
}
// checks if all mines have been found.
function checkVictory() {
    for (let column = 0; column < rows; ++column) {
        for (let row = 0; row < columns; ++row) {
            if (board[column][row] != mineBlock) {
                if (state[column][row] != actionOpen) {
                    return false;
                }
            }
        }
    }
    return true;
}

function flagBlock(row, column) {
    if (state[column][row] == actionOpen) {
        return;
    }
    state[column][row] = 1 - state[column][row];
}

function revealBoard(victorious) {
    for (let column = 0; column < rows; ++column) {
        for (let row = 0; row < columns; ++row) {
            if (board[column][row] == mineBlock && victorious) {
                state[column][row] = actionFlags;
                continue;
            }
            state[column][row] = actionOpen;
        }
    }
}


let isGameOver= false;
let startTime;
let scores;
//set time
function drawElapsedTime(){
    var elapsed=parseInt((new Date() - startTime)/1000);
    tm.save();
    tm.beginPath();
    tm.fillStyle="red";
    tm.font="14px Verdana"
    // draw the running time at half opacity
    tm.globalAlpha=0.50;
    tm.fillText(elapsed+" secs",canvas.width-75,25);
    tm.restore();
}
// set score
function drawFinalScore(){
    // set the final score just once
    if(score==null){ score=parseInt((new Date() - startTime)/1000); }
    sc.save();
    sc.beginPath();
    sc.fillStyle="red";
    sc.font="30px Verdana"
    sc.fillText("Game Over: "+score+" secs",50,35);
    sc.restore();
}

init();