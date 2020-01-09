import {operationReducer, sortTypeReducer, sortingReducer, sortingSpeedReducer} from "./graphReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
  operation: operationReducer,
  sortType: sortTypeReducer,
  sorting: sortingReducer,
  sortingSpeed: sortingSpeedReducer,
});

export default allReducers;