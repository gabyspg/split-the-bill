import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import calculateSummary from '../utils/calculateSummary';
import PersonReceipt from './PersonReceipt.jsx';

const BillSummary = () => {
  const currentBill = useSelector((state) => state.bill);
  const summary = calculateSummary(currentBill);

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

  return (
    <>
      <h2>Bill Summary</h2>
      <div className="allReceipts">{peopleReceipts}</div>
    </>
  );
};
export default BillSummary;
