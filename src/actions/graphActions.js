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

export const zeroOperation = () => {
  return {
    type: 'ZERO OPERATION'
  }
};

export const changeSortType = (sortType) => {
  return {
    type: 'SORT TYPE',
    payload: sortType,
  }
};

export const sortingYes = () => {
  return {
    type: 'IS SORTING',
  }
};

export const sortingNo = () => {
  return {
    type: 'NOT SORTING',
  }
};