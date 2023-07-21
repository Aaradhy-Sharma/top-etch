let color = 'black';
let rainbowModeOn = false;
let shadingOn = false;
let defaultDrawing = true; // New variable for default drawing

function draw(e) {
  if (defaultDrawing) { // Check if default drawing mode is active
    e.target.style.backgroundColor = color;
  }
}

function changeColor(e) {
  color = e.target.value;
}

function eraseGrid() {
    color = 'white';
    defaultDrawing = true; // Enable default drawing after erasing
    rainbowModeOn = false;
    shadingOn = false;
    let squares = document.querySelector('.square');
      square.style.backgroundColor = 'white';
      square.style.opacity = 1;
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
  defaultDrawing = false; // Disable default drawing when rainbow mode is active
  if(!rainbowModeOn) {
    color = 'black';
  }
}

function toggleShading() {
  shadingOn = !shadingOn;
  defaultDrawing = false; // Disable default drawing when shading mode is active
    if (!shadingOn) {
        defaultDrawing = true; // Enable default drawing when shading mode is disabled
    }
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
  } else if (defaultDrawing) { // Check if default drawing mode is active
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
  defaultDrawing = true; // Enable default drawing after clearing the grid
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

let rainbowBtn = document.querySelector('#rainbowBtn');
rainbowBtn.addEventListener('click', rainbowMode);

let shadingBtn = document.querySelector('#toggleShading');
shadingBtn.addEventListener('click', toggleShading);

let resetBtn = document.querySelector('#eraseBtn');
resetBtn.addEventListener('click', clearGrid);
