import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    marginLeft: 50,
    marginTop: 40,
  },
}));

function valuetext(value) {
  return value;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        min={1}
        max={100}
        valueLabelDisplay="on"
      />
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Steps Per Second
      </Typography>
    </div>
  );
}
