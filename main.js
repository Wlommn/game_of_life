const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");

const genInfo = document.querySelector("#gen");
const velosityInfo = document.querySelector("#currentVelosity");

let canvasWidth = ctx.canvas.width = width * sqrSize;
let canvasHeight = ctx.canvas.height = height * sqrSize;
ctx.scale(sqrSize, sqrSize);

let grid = emptyBoard();
let nextGrid = emptyBoard();
let gen = 1;
let currentVelosity = 3;

document.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowUp') {
        if (currentVelosity < 5) { currentVelosity++; }
    } else if (e.code == 'ArrowDown') {
        if (currentVelosity > 1) { currentVelosity--; }
    }
});

canvas.addEventListener("click", (e) => {
    grid[Math.floor(e.offsetY / sqrSize)][Math.floor(e.offsetX / sqrSize)] = 1;
});

fillFirstGeneretion();
play();
