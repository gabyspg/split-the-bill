import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const App = () => {
  return (
    <div id="app">
      Please select from the following options:
      <li>
        <Link to="/newSplit">Split new Bill</Link>
      </li>
      <li>
        <Link to="/PastBills">Look at Past Receipts</Link>
      </li>
    </div>
  );
};
export default App;
