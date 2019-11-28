// button handlers
document.getElementById("nextStep").addEventListener("click", nextStep);
document.getElementById("previousStep").addEventListener("click", previousStep);
document.getElementById("autoSort").addEventListener("click", autoSort);
document.getElementById("stopAutoSort").addEventListener("click", stopAutoSort);

// global variables
const box = 25;
let sort;
let arr = [];
let arrLength = 0;
let currentStep = 0;
let savedArray = [];
let changedIndex = [];
const audio = new Audio('./assets/click.mp3');

// handle steps
let stepsOutput = document.getElementById("steps");
stepsOutput.innerHTML = currentStep;

// slider handler
let rangeSlider = document.getElementById("sliderRange");
let output = document.getElementById("value");
output.innerHTML = rangeSlider.value;

rangeSlider.oninput = function() {
  output.innerHTML = this.value;
  arrLength = this.value;
  currentStep = 0;
  changedIndex = 0;
  stepsOutput.innerHTML = currentStep;
  generateArray(arrLength);
};

function generateArray (arrLength) {
  arr = [];
  for (let i = 0; i < arrLength; i++) {
    arr.push(i + 1);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  drawBars(arr);
  bubbleSort();
}

function drawBars (arr, arr2) {
  let c = document.getElementById("bubble");
  let ctx = c.getContext("2d");
  ctx.clearRect(0, 0, 1200, 625);

  audio.play();

  for (let i = 0; i < arr.length; i++) {
    if (!arr) {

    } else {
      ctx.fillRect(box + (box * i * 2), box * 25, box, -box * arr[i]);
    }
  }
}

// Sorter
function bubbleSort() {
  let sorted = false;
  let sorts = 0;
  savedArray = [];
  savedArray.push(arr);

  while(!sorted) {
    sorts = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        let arr2 = arr.slice();
        savedArray.push(arr2);
        changedIndex.push(i);
        sorts ++;
      }
    }
    if (sorts === 0) {
      sorted = true;
    }
  }
  console.log(changedIndex);
}

function nextStep() {
  if (savedArray[currentStep]) {
    currentStep ++;
    stepsOutput.innerHTML = currentStep;
    arr = savedArray[currentStep];
    drawBars(arr);
  } else {

  }
}

function previousStep() {
  if (savedArray[currentStep]) {
    currentStep --;
    stepsOutput.innerHTML = currentStep;
    arr = savedArray[currentStep];
    drawBars(arr);
  }
}

function autoSort() {
  sort = setInterval(nextStep, 200);
}

function stopAutoSort() {
  clearInterval(sort);
}
generateArray(12);


