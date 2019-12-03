import React from 'react'
import Button from 'react-bootstrap/Button';
import './main.css'

const box = 25;
let sort;
let arr = [];
let arrLength = 48;
let currentStep = 0;
let savedArray = [];
let changedIndex = [];
let highlightedIndex = 0;
let sortingSpeed = 10;

export default function Canvas() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    generateArray(arrLength);
  });

  // generates array to be sorted
  function generateArray (arrLength) {
    arr = [];
    for (let i = 0; i < arrLength; i++) {
      arr.push(i + 1);
    }
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    bubbleSort();
    handleDrawing();
  }

  function bubbleSort() {
    let sorted = false;
    let sorts = 0;
    savedArray = [];

    while(!sorted) {
      sorts = 0;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;

          // making array immutable
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
    arr = savedArray[0];
  }

  function handleDrawing() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1200, 625);

    let colorGradient = 256 / (arr.length / 3);

    for (let i = 0; i < arr.length; i++) {

      if (arr[i] < (arr.length / 3) + 1) {
        ctx.fillStyle = `rgb(0, ${128 + (colorGradient * arr[i] / 2)}, ${255 - (colorGradient * arr[i])})`;
      } else if (arr[i] < (arr.length * 2 / 3) + 1) {
        ctx.fillStyle = `rgb(${colorGradient * (arr[i] - arr.length / 3)},255 , 0)`;
      } else {
        ctx.fillStyle = `rgb(255, ${255 - (colorGradient * (arr[i] - (arr.length * 2 / 3)))} , 0)`;
      }
      ctx.fillRect(box / 2 + (box * i), box * 25, box / 2, (-box / 2) * arr[i]);
    }
  }

  function nextStep() {
    currentStep++;
    if (savedArray[currentStep]) {
      highlightedIndex++;
      arr = savedArray[currentStep];
      handleDrawing(arr, changedIndex);
    } else {
      currentStep--;
      stopAutoSort()
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      currentStep --;
      arr = savedArray[currentStep];
      handleDrawing(arr, changedIndex);
    }
    stopAutoSort()
  }

  function autoSort() {
    sort = setInterval(nextStep, sortingSpeed);
  }

  function stopAutoSort() {
    clearInterval(sort);
  }

  function resetVariables () {
    currentStep = 0;
    savedArray = [];
    changedIndex = [];
    stopAutoSort();
    generateArray(arrLength);
  }

  return (
<>
  <div id='controlPanel'>
    <Button variant="outline-success" onClick={autoSort}>Auto Sort</Button>
    <Button variant="outline-danger" onClick={stopAutoSort}>Stop Auto Sort</Button>
    <Button variant="outline-warning" onClick={previousStep} >Previous Step</Button>
    <Button variant="outline-info" onClick={nextStep}>Next Step</Button>
    <Button variant="outline-secondary" onClick={resetVariables}>Reset</Button>
  </div>
    <canvas
      ref={canvasRef}
      width={1200}
      height={625}
    />
</>
  )
}




