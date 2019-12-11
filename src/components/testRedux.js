import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, increaseOperation, decreaseOperation} from '../actions/index';

export default function Test() {
  const operation = useSelector(state => state.operation);
  const dispatch = useDispatch();

  return (
    <div className='test'>
      <h1>Counter: {operation}</h1>
      <button onClick={() => dispatch(increaseOperation())}>+</button>
      <button onClick={() => dispatch(decreaseOperation())}>-</button>
    </div>
  )
}
