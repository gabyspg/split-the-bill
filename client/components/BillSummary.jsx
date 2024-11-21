import React from 'react';
import { useSelector } from 'react-redux';
import calculateSummary from '../utils/calculateSummary';
import PersonReceipt from './summaryComponents/PersonReceipt.jsx';
import fetch from 'isomorphic-fetch';
import NavBar from './NavBar.jsx';

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
      .then((data) => {
        console.log(data);
        if (data) {
          alert('Your receipt has been saved as a new split.');
        }
        return;
      })
      .catch((err) => console.log(err));
  };

  const updateSplit = (event) => {
    event.preventDefault();
    const updateSummaryRequest = {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: currentBillSummary._id, update: summary }),
    };

    fetch('/api/updateSummary', updateSummaryRequest)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        if (!data) {
          alert('This is a new split, please save instead of update.');
        } else if (data) {
          alert('Update Applied');
        }
        return;
      })
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
      <NavBar />
      <h2>Receipt Summary</h2>
      <div className="intro">
        <p>
          Click the button below to save this split! Make sure to save if you
          want to access your receipt in the future.
        </p>
        <button className="submit" onClick={(event) => saveSummary(event)}>
          Save as a new Split
        </button>
        <button className="submit" onClick={(event) => updateSplit(event)}>
          Apply updates to Split
        </button>
      </div>
      <div className="divideReceipts">
        <div className="overallReceipt">
          <PersonReceipt
            person={summary.billName}
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
