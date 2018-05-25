//sets the width and height
let width = 600, height = 600;
let blockWidth = width / columns,
    blockHeight = height / rows;
let canvas = document.getElementById('canvas');
let score = document.getElementById('score')
let timer = document.getElementById('timer')
// using 2d because I do not understand how to use webgl yet.
    ctx = canvas.getContext('2d');
    // sc = score.getContext('2d');
    // tm = timer.getContext('2d');
let colors = [
    'blue', 'darkgreen', 'red', 'navyblue', 'darkred', 'cyan', 'purple', 'black'
];

//images used in array
let bombIcon = new Image();
bombIcon.src = "boom.png";
let flagIcon = new Image();
flagIcon.src = "flag2.png";

function modelToView(row, column) {
    return {
        row: row * blockWidth,
        column: column * blockHeight
    };
}

function viewToModel(row, column) {
    return {
        row: Math.floor(row / blockWidth),
        column: Math.floor(column / blockHeight)
    };
}
//draw mines after loss and victory
function renderMine(row, column) {
    let viewCoordinates = modelToView(row, column);

    ctx.drawImage(bombIcon, viewCoordinates.row, viewCoordinates.column, blockWidth, blockHeight);
}
// generate flag image 
function renderFlag(row, column) {
    let viewCoordinates = modelToView(row, column);

    ctx.drawImage(flagIcon, viewCoordinates.row, viewCoordinates.column, blockWidth, blockHeight);
}

function renderNumber(row, column) {
    let viewCoordinates = modelToView(row, column);
//generate number to be displayed
    ctx.fillStyle = colors[board[column][row] - 1];
    ctx.font = '20pt Verdana';
    let textSizeM = ctx.measureText('M'),
        textSizeNumber = ctx.measureText(board[column][row]);
    ctx.fillText(
        board[column][row],
        viewCoordinates.row + Math.floor(blockWidth / 2) - textSizeNumber.width / 2,
        viewCoordinates.column + Math.floor(blockHeight / 2) + textSizeM.width / 2
    );
}
// fill the colors when clicked
function renderBlock(row, column) {
    let viewCoordinates = modelToView(row, column);

    if (state[column][row] == actionOpen) {
        // fillstyle is used to fill the color in a square
        ctx.fillStyle = 'orange';
    }
    else {
        ctx.fillStyle = '#4d88ff';
    }
//strokestyle is used to make the lines and their color
    ctx.strokeStyle = 'black';
    ctx.fillRect(viewCoordinates.row, viewCoordinates.column, blockWidth, blockHeight);
    ctx.strokeRect(viewCoordinates.row, viewCoordinates.column, blockWidth, blockHeight);

    if (state[column][row] == actionFlags) {
        renderFlag(row, column);
    }

    if (state[column][row] == actionOpen) {
        switch (board[column][row]) {
            case 0:
                break;
            case mineBlock:
                renderMine(row, column);
                break;
            default:
                renderNumber(row, column);
        }
    }
}

// function to display the board to the page
function render() {
    for (let column = 0; column < rows; ++column) {
        for (let row = 0; row < columns; ++row) {
            renderBlock(row, column);
        }
    }
}
// setting a function to display a timer when you click the start button.
function startTimer() {

let sec = -1;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000)
}
// function flagCounter() {
//     let flags = 0;
//     function num ( val ) { return val > 10 ? val : "0" + val}
//     flags++;
    
// }

render();
