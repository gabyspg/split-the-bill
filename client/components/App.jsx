import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import { useDispatch } from 'react-redux';
import { resetReceipt } from '../slices/receiptSlice.js';
import { resetSplitSummary } from '../slices/splitSlice.js';
import { resetSplitHistory } from '../slices/historySlice.js';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetReceipt());
    dispatch(resetSplitSummary());
    dispatch(resetSplitHistory());
    navigate('/newReceipt');
  };

  return (
    <div id="app">
      <NavBar />
      <h2>Home</h2>
      <div className="intro">
        <p>
          Welcome to Split the Bill! Do you have a receipt that you'd like to
          effortlessly divide among your family and friends? With Split the
          Bill, the process becomes seamless.
        </p>
        <p>Please choose from the following options:</p>
        <button className="submit" onClick={handleClick}>
          New Split
        </button>
        <button className="submit" onClick={() => navigate('/pastSplits')}>
          Past Splits
        </button>
      </div>
    </div>
  );
};
export default App;
