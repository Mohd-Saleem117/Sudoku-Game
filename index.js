var sudoku = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]

function createGrid() {
    var myContainer = document.getElementById('container');

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var myInput = document.createElement("input");
            myInput.id = `${i}${j}`;
            var num = Math.ceil(Math.random() * 9);
            myInput.row = i;
            myInput.col = j;

            if (isSafe(sudoku, i, j, num)) {
                myInput.value = num;
                myInput.readOnly = true;
            } else {
                num = 0;
                myInput.value = '';
            }
            sudoku[i][j] = num;
            myContainer.appendChild(myInput);
            myInput.oninput = function(e) {
                checkAnswer(sudoku, e);
            }
        }
    }
}
createGrid();

function isSafe(grid, row, col, num) {

    for (var x = 0; x < 9; x++) {
        if (grid[row][x] == num) {
            return false;
        }

    }
    for (var y = 0; y < 9; y++) {
        if (grid[y][col] == num) {
            return false;
        }
    }

    var startRow = row - (row % 3);
    var startCol = col - (col % 3);

    for (var m = 0; m < 3; m++) {
        for (var n = 0; n < 3; n++) {
            if (grid[m + startRow][n + startCol] == num) {
                return false;
            }
        }
    }
    return true;
}

function checkAnswer(grid, e) {

    var row = e.target.row;
    var col = e.target.col;
    var num = Number(e.data);
    var id = e.target.id;

    if (num == '') {
        return false;
    }
    for (var x = 0; x < 9; x++) {
        if (grid[row][x] == num) {
            showColors('red', id)
            return false;
        }

    }

    for (var y = 0; y < 9; y++) {
        if (grid[y][col] == num) {
            showColors('red', id)
            return false;
        }

    }

    var startRow = row - (row % 3);
    var startCol = col - (col % 3);

    for (var m = 0; m < 3; m++) {
        for (var n = 0; n < 3; n++) {
            if (grid[m + startRow][n + startCol] == num) {
                showColors('red', id)
                return false;
            } else {
                showColors('green', id)
                return true;
            }
        }
    }
}


function showColors(color, id) {
    var inp = document.getElementById(id);
    if (color == 'red') {
        inp.style.backgroundColor = 'red';
    } else {
        inp.style.backgroundColor = 'green';
    }
}