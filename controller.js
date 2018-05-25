// set mouse activity
let mouseLeft = 1,
    mouseRight = 3;

canvas.addEventListener('mousedown', function(event) {
    let row = event.clientX - canvas.offsetLeft,
        column = event.clientY - canvas.offsetTop;

    // hit test
    let modelCoordinates = viewToModel(row, column);

    switch (event.which) {
        case mouseLeft:
            openBlock(modelCoordinates.row, modelCoordinates.column);
            break;
        case mouseRight:
            flagBlock(modelCoordinates.row, modelCoordinates.column);
    }

    render();

    return false;
});

canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    return false;
}, false);

// timer.addEventListener('click', function(event) {
//     function myRepeatFunction(event) {
//         timer.style.backgroundColor = "lightblue";
//         timer.innerHTML = "Elapsed time: " + event.elapsedTime + " seconds";
//     }
// }