import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const App = () => {
  const navigate = useNavigate();
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
        <button className="submit" onClick={() => navigate('/newReceipt')}>
          New Split
        </button>
        <button className="submit" onClick={() => navigate('/pastSplits')}>
          Review Past Splits
        </button>
      </div>
    </div>
  );
};
export default App;
