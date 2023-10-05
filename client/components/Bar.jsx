import React from 'react';
import { Link } from 'react-router-dom';

const Bar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newSplit">Create New Bill</Link>
        </li>
        <li>
          <Link to="/pastBills">View Past Bills</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Bar;
