import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReviewReceiptCard from '../receiptComponents/ReviewReceiptCard.jsx';
import fetch from 'isomorphic-fetch';
import { updateSplitSummary } from '../../slices/splitSlice.js';
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

    fetch('/api/getReceipts', getReceiptsRequest)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.toSorted((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        setReceipts(sortedData);
        return;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    seeReceipts();
  }, []);

  const renderReceipt = receipts.map((receipt, index) => (
    <ReviewReceiptCard
      reviewReceipt={reviewReceipt}
      receipt={receipt}
      id={index}
      key={`display ${index}`}
    />
  ));

  return (
    <>
      <h2>Past Splits</h2>
      <div className="allPastReceipts">{renderReceipt}</div>
    </>
  );
};
export default PastSplits;
