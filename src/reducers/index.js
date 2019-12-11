import {operationReducer, sortTypeReducer, sortingReducer} from "./graphReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
  operation: operationReducer,
  sortType: sortTypeReducer,
  sorting: sortingReducer,
});

export default allReducers;