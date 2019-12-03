import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
    marginLeft: 200,
  },
}));

const marks = [
  {
    value: 10,
    label: '1 Step Per Second',
  },
  {
    value: 1000,
    label: '100 Steps Per Second',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <div className={classes.margin}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Sorting Speed
      </Typography>
      <Slider
        defaultValue={200}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
    </div>
  );
}