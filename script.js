const sketchContainer = document.querySelector("div.sketch-container");
let color = 'black'; // default color

function makeGrids(rows, columns) {
    sketchContainer.style.setProperty('--grid-rows', rows);
    sketchContainer.style.setProperty('--grid-columns', columns);
    
    // check if previously entered grids exist
    if (document.getElementsByClassName('grid-item').length > 0) {
        clearGrid();
    }

    for (let c = 0; c < (rows * columns); c++) {
        let cell = document.createElement("div");
        sketchContainer.appendChild(cell).className = "grid-item";
        
        detectMouseover(cell);
        changeColor(cell);
    }
}

function detectMouseover(cell) {
    cell.addEventListener('mouseover', (event) => {
        event.target.style.backgroundColor = color;
    });
}

function detectMouseoverRGB() {
    let color = '#' + Math.random().toString(16).slice(-3);
    let cells = document.querySelectorAll(".grid-item");

    
}

function changeColor(cell) {
    let colorOptionsContainer = document.querySelector("div.color-options-container");
    let colorButtons = colorOptionsContainer.children;

    for (buttons of colorButtons) {
        buttons.addEventListener('click', (event) => {
            let button = event.target.innerText.toLowerCase();
            console.log(button);
            if (button === 'rgb') {
                // rgb function
                detectMouseoverRGB();
            } else if (button === 'eraser') {
                color = 'white';
            } else if (button ==='reset') {
                cell.style.backgroundColor = 'white';
            } else {
                color = event.target.innerText.toLowerCase();
            }
        });
    }
}

function clearGrid() {
    let cells = document.querySelectorAll(".grid-item");

    cells.forEach(cell => {
        cell.remove();
    });
}

function setGrid() {
    let applyButton = document.querySelector(".apply-button")
    let initialGridSize = 16;
    
    makeGrids(initialGridSize, initialGridSize);
    
    applyButton.addEventListener('click', () => {
        let gridSize = document.querySelector(".grid-input").value;
        gridSize = parseInt(gridSize);
        console.log(gridSize);

        makeGrids(gridSize, gridSize);
    });
}

setGrid();