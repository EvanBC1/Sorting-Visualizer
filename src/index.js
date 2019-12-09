import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore} from 'redux';
import allReducers from "./reducers";
import {Provider} from 'react-redux'
import Test from './components/testRedux'

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <Test />
    <App />
  </Provider>,
  document.getElementById('root'));


