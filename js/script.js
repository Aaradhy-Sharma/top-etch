let color = 'black';
let rainbowModeOn = false;
let shadingOn = false;
let defaultDrawing = true; 

function draw(e) {
  if (defaultDrawing) { 
    e.target.style.backgroundColor = color;
  }
}

function changeColor(e) {
  color = e.target.value;
}

function eraseGrid() {
    color = 'white';
    defaultDrawing = true; 
    rainbowModeOn = false;
    shadingOn = false;
    let square = document.querySelector('.square');
    square.style.backgroundColor = 'white';
    square.style.opacity = 1;
    let eraseBtn = document.querySelector('#eraseBtn');
    eraseBtn.classList.toggle('activeBtn');
}

  

let outline = true;

function toggleOutline(e) {
  let squares = document.querySelectorAll('.square');
  outline = !outline;
  if (outline) {
    squares.forEach((square) => square.classList.add('outline'));
  } else {
    squares.forEach((square) => square.classList.remove('outline'));
  }
}

function rainbowMode() {
  rainbowModeOn = !rainbowModeOn;
  defaultDrawing = false; 
  if(!rainbowModeOn) {
    color = 'black';
  }
  let rainbowBtn = document.querySelector('#rainbowBtn');
    rainbowBtn.classList.toggle('activeBtn');
}

function toggleShading(e) {
  shadingOn = !shadingOn;
  defaultDrawing = false; 
    if (!shadingOn) {
        defaultDrawing = true; 
    }
    e.target.classList.toggle('activeBtn');
}

function handleMouseover(e) {
  if (rainbowModeOn) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = `#${randomColor}`;
  } else if (shadingOn) {
    let opacity = e.target.style.opacity;
    if (opacity === '') {
      e.target.style.opacity = 0.3;
    } else if (opacity < 1) {
      e.target.style.opacity = parseFloat(opacity) + 0.3;
    }
  } else if (defaultDrawing) { 
    draw(e);
  }
}

function createGrid(sizeVar) {
  let sketchBoard = document.querySelector('#sketch-board');
  let squares = sketchBoard.querySelectorAll('div');
  squares.forEach((div) => div.remove());
  sketchBoard.style.gridTemplateColumns = `repeat(${sizeVar}, 1fr)`;
  sketchBoard.style.gridTemplateRows = `repeat(${sizeVar}, 1fr)`;

  for (let i = 0; i < sizeVar * sizeVar; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.classList.add('outline');
    sketchBoard.insertAdjacentElement('beforeend', square);
    square.addEventListener('mouseover', handleMouseover);
    square.addEventListener('touchmove', handleMouseover);
  }
}

createGrid(16);

let eraseBtn = document.querySelector('#eraseBtn');
eraseBtn.addEventListener('click', eraseGrid);

let colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', changeColor);

function clearGrid() {
  let sketchBoard = document.querySelector('#sketch-board');
  let squares = sketchBoard.querySelectorAll('div');
  squares.forEach((div) => (div.style.backgroundColor = 'white'));
  squares.forEach((div) => (div.style.opacity = 1));
  rainbowModeOn = false;
  shadingOn = false;
  defaultDrawing = true;
  squares.forEach((div) =>div.classList.add('outline'));
}

let slider = document.querySelector('#slider');
let sliderValue = document.querySelector('#sliderValue');
sliderValue.textContent = slider.value;
slider.addEventListener('input', (e) => {
  sliderValue.textContent = `${e.target.value} x ${e.target.value}`;
});

let sketchBoard = document.getElementById('sketch-board');
sketchBoard.addEventListener('mousedown', () => isDrawing = true);
sketchBoard.addEventListener('mouseup', () => isDrawing = false);
sketchBoard.addEventListener('touchstart', () => isDrawing = true);
sketchBoard.addEventListener('touchend', () => isDrawing = false);

