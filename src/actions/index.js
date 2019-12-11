export const increment = (num) => {
  return {
    type: 'INCREMENT',
    payload: num,
  }
};

export const decrement = (num) => {
  return {
    type: 'DECREMENT',
    payload: num,
  }
};

export const increaseOperation = () => {
  return {
    type: 'INCREASE OPERATION'
  }
};

export const decreaseOperation = () => {
  return {
    type: 'DECREASE OPERATION'
  }
};