let color = 'black';

function draw(e) {
    e.target.style.backgroundColor = color;
}

function changeColor(e) {
    color = e.target.value;
}


function eraseGrid(e){
    color = 'white';
}

let outline = true;

function toggleOutline(e){
    let squares = document.querySelectorAll('.square');
    outline = !outline;
    if(outline){
        squares.forEach(square => square.classList.add('outline'));
    }else{
        squares.forEach(square => square.classList.remove('outline'));
    }
    
}



function createGrid(sizeVar) {
    let sketchBoard = document.querySelector('#sketch-board');
    let squares = sketchBoard.querySelectorAll('div');
    squares.forEach(div => div.remove());
    sketchBoard.style.gridTemplateColumns = `repeat(${sizeVar}, 1fr)`;
    sketchBoard.style.gridTemplateRows = `repeat(${sizeVar}, 1fr)`;

    for (let i = 0; i < sizeVar * sizeVar; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.classList.add('outline');
        sketchBoard.insertAdjacentElement('beforeend', square);
        square.addEventListener('mouseover', draw);
        square.addEventListener('touchmove', draw);
        square.addEventListener
    }
}

createGrid(16);

let eraseBtn = document.querySelector('#eraseBtn');
eraseBtn.addEventListener('click', eraseGrid);

let colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', changeColor);

function clearGrid(){
    let sketchBoard = document.querySelector('#sketch-board');
    let squares = sketchBoard.querySelectorAll('div');
    squares.forEach(div=>div.style.backgroundColor = 'white');
}


let slider = document.querySelector('#slider');
let sliderValue = document.querySelector('#sliderValue');
sliderValue.textContent = slider.value;
slider.addEventListener('input',(e) =>{
        sliderValue.textContent = `${e.target.value} x ${e.target.value}`;
    })

let sketchBoard = document.getElementById('sketch-board');
sketchBoard.addEventListener('mousedown', () => isDrawing = true);
sketchBoard.addEventListener('mouseup', () => isDrawing = false);
sketchBoard.addEventListener('touchstart', () => isDrawing = true);
sketchBoard.addEventListener('touchend', () => isDrawing = false);
