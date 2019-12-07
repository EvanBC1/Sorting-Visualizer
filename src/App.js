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

let autoSortInterval;
let arr = [];
let arrLength = 24;
let savedArray = [];
let sortingSpeed;
let sorting = false;
let operation = 0;


export default function Canvas() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    sortArray(arrLength);
  },[]);

  // generates array to be sorted
  function sortArray (arrLength) {
    arr = generateArray(arrLength);
    // passes generated array to bubble sorter and draws it on the canvas
    if(sort === 'bubble') {
      savedArray = bubbleSort(arr, savedArray);
    } else {
      savedArray = selectionSort(arr, savedArray);
    }
    arr = savedArray[0];
    handleDrawing();
  }

  function handleDrawing() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!arr) {
      arr = [2, 1, 3]
    }

    let colorGradient = 256 / (arr.length / 3);

    if (savedArray[operation].length > 2) {
      arr = savedArray[operation];
      ctx.clearRect(0, 0, 800, 425);
      for (let i = 0; i < arr.length; i++) {

        if (arr[i] < (arr.length / 3) + 1) {
          ctx.fillStyle = `rgb(0, ${128 + (colorGradient * arr[i] / 2)}, ${255 - (colorGradient * arr[i])})`;
        } else if (arr[i] < (arr.length * 2 / 3) + 1) {
          ctx.fillStyle = `rgb(${colorGradient * (arr[i] - arr.length / 3)},255 , 0)`;
        } else {
          ctx.fillStyle = `rgb(255, ${255 - (colorGradient * (arr[i] - (arr.length * 2 / 3)))} , 0)`;
        }
        ctx.fillRect(5 + (16.5 * i), 425, 12.5, (-25 / 3) * arr[i]);
      }

    }
    if ((savedArray[operation + 1] !== undefined)) {
      // drawing current arrow
      ctx.clearRect(0, 425, 800, 25);
      ctx.fillStyle = `rgb(0, 128, 255)`;
      ctx.beginPath();
      ctx.moveTo(11.25 + (16.5 * savedArray[operation + 1][0]), 426);
      ctx.lineTo(17.5 + (16.5 * savedArray[operation + 1][0]), 445);
      ctx.lineTo(5 + (16.5 * savedArray[operation + 1][0]), 445);
      ctx.fill();
      // drawing minimum arrow
      ctx.fillStyle = `rgb(255, 0, 0)`;
      ctx.beginPath();
      ctx.moveTo(11.25 + (16.5 * savedArray[operation + 1][1]), 426);
      ctx.lineTo(17.5 + (16.5 * savedArray[operation + 1][1]), 445);
      ctx.lineTo(5 + (16.5 * savedArray[operation + 1][1]), 445);
      ctx.fill();
    }
  }

  function nextStep() {
    operation++;
    if (savedArray[operation] !== undefined) {
      handleDrawing(arr);
    } else {
      operation--;
      stopAutoSort()
    }
    setOperations(operation);
  }

  function previousStep() {
    if (operation > 0) {
      operation --;
      handleDrawing(arr);
    }
    setOperations(operation);
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
    operation = 0;
    savedArray = [];
    stopAutoSort();
    sortArray(arrLength);
    sorting = false;
    setOperations(0);
  }

  function speedHandler(value) {
    if (sorting === true) {
      stopAutoSort();
      autoSort();
    }
    if (value < 51) {
      sortingSpeed = 1000 - value * 18;
    } else {
      sortingSpeed = 100 - (value - 50) * 1.85;
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

  // dropdown Menu
  const [sort, setSort] = React.useState('');
  const [operations, setOperations] = React.useState(0);
  const inputLabel = React.useRef(null);

  const handleDropDown = event => {
    setSort(event.target.value);
    resetVariables();
  };

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
          onChange={handleDropDown}
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
  <p id='operations'> Number of Operations: {operations} </p>
    <canvas
      ref={canvasRef}
      width={800}
      height={450}
    />
</>
  )
}
