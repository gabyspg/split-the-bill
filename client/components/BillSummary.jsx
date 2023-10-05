import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import calculateSummary from '../utils/calculateSummary';
import PersonReceipt from './summary components/PersonReceipt.jsx';
import fetch from 'isomorphic-fetch';

const BillSummary = () => {
  const currentBill = useSelector((state) => state.bill);
  const currentBillSummary = useSelector(
    (state) => state.billSummary.billSummary
  );

  const summary = calculateSummary(currentBill);

  const saveSummary = (event) => {
    event.preventDefault();

    const saveSummaryRequest = {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(summary),
    };

    fetch('/api/saveSummary', saveSummaryRequest)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const updateSplit = (event) => {
    event.preventDefault();
    console.log('currentBillSummary._id', currentBillSummary._id);
    console.log('summary update', summary);
    const updateSummaryRequest = {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: currentBillSummary._id, update: summary }),
    };

    fetch('/api/updateSummary', updateSummaryRequest)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const peopleReceipts = [];
  let count = 0;
  for (let person in summary.people) {
    count++;
    peopleReceipts.push(
      <PersonReceipt
        person={person}
        personSummary={summary.people[person]}
        key={`person ${count}`}
      />
    );
  }

  const overallSummary = {
    tax: Number(summary.tax),
    tip: Number(summary.tip),
    subtotal: Number(summary.subtotal),
    total: Number(summary.total),
    items: currentBill.foodItems,
  };

  return (
    <>
      <h2>Receipt Summary</h2>
      <div className="intro">
        <p>
          Click the button below to save this split! Make sure to save if you
          want to access your receipt in the future.
        </p>
        <button className="submit" onClick={(event) => saveSummary(event)}>
          Save this as a new Split
        </button>
        <button className="submit" onClick={(event) => updateSplit(event)}>
          Update Split
        </button>
      </div>
      <div className="divideReceipts">
        <div className="overallReceipt">
          <PersonReceipt
            person={'Overall'}
            personSummary={overallSummary}
            key={`overallReceipt`}
          />
        </div>
        <div className="allReceipts">{peopleReceipts}</div>
      </div>
    </>
  );
};
export default BillSummary;
