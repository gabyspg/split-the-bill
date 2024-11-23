import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReceiptDisplay from '../receiptComponents/ReceiptDisplay.jsx';
import fetch from 'isomorphic-fetch';
import { updateSplitSummary } from '../../slices/splitSlice.js';
import NavBar from '../NavBar.jsx';
import { resetReceipt } from '../../slices/receiptSlice.js';
import { updateSplitHistory } from '../../slices/historySlice.js';

const PastSplits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [receipts, setReceipts] = useState([]);

  const reviewReceipt = (event, id) => {
    event.preventDefault();
    dispatch(updateSplitSummary({ billSummary: receipts[id] }));
    dispatch(resetReceipt());
    dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
    navigate('/splitSummary');
  };

  const seeReceipts = () => {
    const getReceiptsRequest = {
      method: 'GET',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('/getReceipts', getReceiptsRequest)
      .then((res) => res.json())
      .then((data) => {
        setReceipts(data);
        return;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    seeReceipts();
  }, []);

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
      <div className="allReceipts">{renderReceipt}</div>
    </>
  );
};
export default PastSplits;
