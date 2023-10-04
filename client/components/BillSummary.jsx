import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import calculateSummary from '../utils/calculateSummary';
import PersonReceipt from './summary components/PersonReceipt.jsx';
import fetch from 'isomorphic-fetch';

const BillSummary = () => {
  const currentBill = useSelector((state) => state.bill);
  const summary = calculateSummary(currentBill);
  console.log(summary);

  const saveSummary = (event) => {
    event.preventDefault();

    const saveSummaryRequest = {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(summary),
    };

    console.log('before fetch');
    fetch('/api/saveSummary', saveSummaryRequest)
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
  console.log('overallSummary', overallSummary);

  return (
    <>
      <h2>Receipt Summary</h2>
      <div className="intro">
        <p>
          Click the button below to save this split! Make sure to save if you
          want to access your receipt in the future.
        </p>
        <button className="submit" onClick={(event) => saveSummary(event)}>
          Save this Split!
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
