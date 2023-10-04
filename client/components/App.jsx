import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useNavigate,
} from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  return (
    <div id="app">
      <div className="intro">
        <p>
          Welcome to Split the Bill App! Do you have a receipt that you need to
          split amoungst your family and friends? Split the bill app will make
          this process seemless! Please select from the following options:
        </p>
        <button className="submit" onClick={() => navigate('/newSplit')}>
          Split new Bill!
        </button>
        <button className="submit" onClick={(event) => navigate('/PastBills')}>
          Review Past Receipts!
        </button>
      </div>
    </div>
  );
};
export default App;
