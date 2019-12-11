import counterReducer from "./counter";
import operationReducer from "./operationsReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  operation: operationReducer,
});

export default allReducers;