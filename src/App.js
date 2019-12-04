import React from 'react'
import Button from 'react-bootstrap/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './main.css'

import bubbleSort from "./util/bubbleSort";
import selectionSort from "./util/selectionSort";
import generateArray from "./util/generateArray";

const box = 25;
let autoSortInterval;
let arr = [];
let arrLength = 24;
let currentStep = 0;
let savedArray = [];
let sortingSpeed;
let sorting = false;


export default function Canvas() {

  // dropdown Menu
  const [sort, setSort] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setSort(event.target.value);
    resetVariables();
  };
  // *********

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    sortArray(arrLength);
  });

  // generates array to be sorted
  function sortArray (arrLength) {
    arr = generateArray(arrLength);
    // passes generated array to bubble sorter and draws it on the canvas
    if(sort === 'selection') {
      savedArray = selectionSort(arr, savedArray);
    } else {
      savedArray = bubbleSort(arr, savedArray);
    }
    arr = savedArray[0];
    handleDrawing();
  }

  function handleDrawing() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1200, 625);

    if (!arr) {
      arr = [2,1,3]
    }

    let colorGradient = 256 / (arr.length / 3);

    for (let i = 0; i < arr.length; i++) {

      if (arr[i] < (arr.length / 3) + 1) {
        ctx.fillStyle = `rgb(0, ${128 + (colorGradient * arr[i] / 2)}, ${255 - (colorGradient * arr[i])})`;
      } else if (arr[i] < (arr.length * 2 / 3) + 1) {
        ctx.fillStyle = `rgb(${colorGradient * (arr[i] - arr.length / 3)},255 , 0)`;
      } else {
        ctx.fillStyle = `rgb(255, ${255 - (colorGradient * (arr[i] - (arr.length * 2 / 3)))} , 0)`;
      }
      ctx.fillRect(box / 4 + (box * i / 1.5), box * 17, box / 2, (-box / 3) * arr[i]);
    }
  }

  function nextStep() {
    currentStep++;
    if (savedArray[currentStep]) {
      arr = savedArray[currentStep];
      handleDrawing(arr);
    } else {
      currentStep--;
      stopAutoSort()
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      currentStep --;
      arr = savedArray[currentStep];
      handleDrawing(arr);
    }
    stopAutoSort()
  }

  function autoSort() {
    autoSortInterval = setInterval(nextStep, sortingSpeed);
    sorting = true;
  }

  function stopAutoSort() {
    clearInterval(autoSortInterval);
    sorting = false;
  }

  function resetVariables () {
    currentStep = 0;
    savedArray = [];
    stopAutoSort();
    sortArray(arrLength);
    sorting = false;
  }

  function speedHandler(value) {
    if (sorting === true) {
      stopAutoSort();
      autoSort();
    }
    if (value < 51) {
      sortingSpeed = 1000 - value * 18;
    } else {
      sortingSpeed = 100 - (value - 50) * 1.8;
    }
    return value;
  }

  function arrayHandler(value) {
    let newValue = false;
    if (arrLength !== value) {
      newValue = true;
    }
    arrLength = value;

    if (newValue === true) {
      sortArray(arrLength);
    }
    return value;
  }

  return (
<>
  <div id='controlPanel'>
    <div id='buttons'>
    <Button variant="outline-success" onClick={autoSort}>Auto Sort</Button>
    <Button variant="outline-danger" onClick={stopAutoSort}>Stop Auto Sort</Button>
    <Button variant="outline-warning" onClick={previousStep} >Previous Step</Button>
    <Button variant="outline-info" onClick={nextStep}>Next Step</Button>
    <Button variant="outline-secondary" onClick={resetVariables}>Reset</Button>
      <FormControl variant="outlined" id='dropDown'>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Sort Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sort}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value={'bubble'}>Bubble</MenuItem>
          <MenuItem value={'selection'}>Selection</MenuItem>
        </Select>
      </FormControl>
    </div>



    <div id='speedSlider'>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Sorting Speed
      </Typography>

      <Slider
      defaultValue={50}
      getAriaValueText={speedHandler}
      aria-labelledby="discrete-slider-small-steps"
      step={1}
      min={0}
      max={100}
      valueLabelDisplay="auto"
    />
    </div>
    <div id='arraySlider'>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Array Size
      </Typography>
      <Slider
        defaultValue={24}
        getAriaValueText={arrayHandler}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        min={3}
        max={48}
        valueLabelDisplay="auto"
      />
    </div>

  </div>
    <canvas
      ref={canvasRef}
      width={810}
      height={425}
    />
</>
  )
}




