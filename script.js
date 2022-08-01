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
        
        toggleGridlines(cell);
        changeColor(cell);
        detectMouseover(cell);
    }
}

function detectMouseover(cell) {
    cell.addEventListener('mouseover', () => {
        
        if (color === 'rgb') {
            cell.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
        cell.style.backgroundColor = color;
        }
    });
}

function toggleGridlines(cell) {
    let toggleGridlinesDiv = document.querySelector('.toggle-gridlines');
    
    toggleGridlinesDiv.addEventListener('click', () => {
        cell.classList.toggle('grid-item-toggled');
    });
}

function changeColor(cell) {
    let colorOptionsContainer = document.querySelector("div.color-options-container");
    let colorButtons = colorOptionsContainer.children;

    for (buttons of colorButtons) {
        buttons.addEventListener('click', (event) => {
            let button = event.target.innerText.toLowerCase();
            console.log(button);
            if (button === 'rgb') {
                color = 'rgb';
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

function isValid(gridSize) {
    let errorDiv = document.querySelector('.error-message');
    let minGridSize = 2;
    let maxGridSize = 100;
    
    if (gridSize < minGridSize || gridSize > maxGridSize) {
        errorDiv.textContent = 'Please enter a value from 2 to 100';
        return false;
    } else {
        errorDiv.textContent = '';
        return true;
    }
}

function displayCurrentGrid(gridSize) {
    let currentGridDiv = document.querySelector('.current-grid');
    currentGridDiv.textContent = `Current Grid: ${gridSize} x ${gridSize}`;
}

function clearGrid() {
    let cells = document.querySelectorAll(".grid-item");

    cells.forEach(cell => {
        cell.remove();
    });
}

function setGrid() {
    let applyButton = document.querySelector(".apply-button")
    let gridInput = document.querySelector(".grid-input");
    let initialGridSize = 16;
    
    makeGrids(initialGridSize, initialGridSize);
    displayCurrentGrid(initialGridSize);
    
    applyButton.addEventListener('click', () => {
        gridSize = gridInput.value;
        gridSize = parseInt(gridSize);
        
        // check input validity
        if (isValid(gridSize)) {
            makeGrids(gridSize, gridSize);
            displayCurrentGrid(gridSize);
        }
       
        // clear input field
        gridInput.value = '';       
    });
}

setGrid();