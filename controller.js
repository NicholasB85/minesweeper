// set mouse activity
let mouseLeft = 1,
    mouseRight = 3;

let flagCount = 0;

canvas.addEventListener('mousedown', function(event) {
    let row = event.clientX - canvas.offsetLeft,
        column = event.clientY - canvas.offsetTop;
    console.log(event)
    // hit test
    let modelCoordinates = viewToModel(row, column);

    switch (event.which) {
        case mouseLeft:
            openBlock(modelCoordinates.row, modelCoordinates.column);
            break;
        case mouseRight:
            if (flagCount < 10) {
                flagBlock(modelCoordinates.row, modelCoordinates.column);
                flagCount++;
                document.getElementById("score").innerHTML = flagCount;
                
            }
            break;
    }

    render();

    return false;
});

canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
})
