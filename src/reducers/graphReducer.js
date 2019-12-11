export const operationReducer = (state = 0, action) => {
  console.log(action);
  switch (action.type) {
    case 'INCREASE OPERATION':
      return state + 1;
    case 'DECREASE OPERATION':
      return state - 1;
    case 'ZERO OPERATION':
      return state = 0;
      default:
        return state;
  }
};

export const sortTypeReducer = (state = 'selection', action) => {
  switch (action.type) {
    case 'SORT TYPE':
      return state = action.payload;
    default:
      return state;
  }
};

export const sortingReducer = (state = false, action) => {
  console.log(action);
  switch (action.type) {
    case 'IS SORTING':
      return state = true;
    case 'NOT SORTING':
      return state = false;
    default:
      return state;
  }
};