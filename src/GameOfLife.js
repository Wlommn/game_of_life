function emptyBoard() {
    return Array.from ( {length: height}, () => Array(width).fill(0) );
}

function fillFirstGeneretion() {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            grid[i][j] = Math.floor(Math.random() * 10);
            if (grid[i][j] > 1) { grid[i][j] = 0; }
        }
    }
}

function play() {
    generate();
    draw();
    if (gen < 10000) {
        let timer = setTimeout(play, velosity[currentVelosity]);
    }
    gen++;
}

function nextGeneration(y, x) {
    let neighbors = countNighbors(y, x);
    if (grid[y][x] == 1) {
        if (neighbors < 2) {
            nextGrid[y][x] = 0;
        } else if (neighbors == 2 || neighbors ==  3) {
            nextGrid[y][x] = 1;
        } else if (neighbors > 3) {
            nextGrid[y][x] = 0;
        }
    } else if (grid[y][x] == 0) {
        if (neighbors == 3) { 
            nextGrid[y][x] = 1; 
        }
    }
}

function countNighbors(y, x) {
    let neighbors = 0;
    if (y - 1 >= 0) {
        if (grid[y - 1][x] == 1) { neighbors++; }
    }
    if (y - 1 >= 0 && x - 1 >= 0) {
        if (grid[y - 1][x - 1] == 1) { neighbors++; }
    }
    if (y - 1 >= 0 && x + 1 < width) {
        if (grid[y - 1][x + 1] == 1) { neighbors++; }
    }
    if (x - 1 >= 0) {
        if (grid[y][x - 1] == 1) { neighbors++; }
    }
    if (x + 1 < width) {
        if (grid[y][x + 1] == 1) { neighbors++; }
    }
    if (y + 1 < height) {
        if (grid[y + 1][x] == 1) { neighbors++; }
    }
    if (y + 1 < height && x - 1 >= 0) {
        if (grid[y + 1][x - 1] == 1) { neighbors++; }
    }
    if (y + 1 < height && x + 1 < width) {
        if (grid[y + 1][x + 1] == 1) { neighbors++; }
    }
    return neighbors;
}

function draw() {
    grid.forEach((row, y) => {
        row.forEach((value, x) => {
            ctx.fillStyle = sqrColor[value];
            ctx.fillRect(x, y, 1, 1);
        });
    });
    genInfo.innerText = gen;
    velosityInfo.innerText = currentVelosity;
}

function generate() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            nextGeneration(y, x);
        }
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            grid[y][x] = nextGrid[y][x];
        }
    }
    nextGrid = emptyBoard();
}
