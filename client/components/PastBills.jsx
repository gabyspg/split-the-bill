import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReceiptDisplay from './ReceiptDisplay.jsx';
import fetch from 'isomorphic-fetch';
import { updateBillSummary } from '../slices/billSummarySlice.js';
import NavBar from './NavBar.jsx';

const PastBills = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [receipts, setReceipts] = useState([]);

  const reviewReceipt = (event, id) => {
    event.preventDefault();
    dispatch(updateBillSummary({ billSummary: receipts[id] }));
    navigate('/reviewBill');
  };

  const seeReceipts = (event) => {
    const getReceiptsRequest = {
      method: 'GET',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('/api/getReceipts', getReceiptsRequest)
      .then((res) => res.json())
      .then((data) => {
        setReceipts(data);
        return;
      })
      .catch((err) => console.log(err));
  };

  const renderReceipt = receipts.map((receipt, index) => (
    <ReceiptDisplay
      reviewReceipt={reviewReceipt}
      receipt={receipt}
      id={index}
      key={`display ${index}`}
    />
  ));

  return (
    <>
      <NavBar />
      <h2>Split: Past Bills</h2>
      <div className="intro">
        <p>Click the button below to see past receipts!</p>
        <button className="submit" onClick={(event) => seeReceipts(event)}>
          See Past Bills
        </button>
      </div>
      <div className="allReceipts">{renderReceipt}</div>
    </>
  );
};
export default PastBills;
