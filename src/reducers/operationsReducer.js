const operationReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREASE OPERATION':
      return state + 1;
    case 'DECREASE OPERATION':
      return state - 1;
      default:
        return state;
  }
};

export default operationReducer;