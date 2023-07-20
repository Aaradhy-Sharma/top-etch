let color = 'black';

function draw(e) {
    e.target.style.backgroundColor = color;
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
        sketchBoard.insertAdjacentElement('beforeend', square);
        square.addEventListener('mouseover', draw);
    }
}

createGrid(16);

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
