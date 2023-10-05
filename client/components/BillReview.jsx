import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PersonReceipt from './summary components/PersonReceipt.jsx';
import convertSummaryToBill from '../utils/convertFormat.js';
import { updateBill } from '../slices/billSlice.js';

const BillReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentState = useSelector((state) => state.billSummary);
  const summary = currentState.billSummary;

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
    items: summary.foodItems,
  };

  const editReceipt = (event) => {
    event.preventDefault();
    const bill = convertSummaryToBill(summary);
    dispatch(updateBill(bill));
    navigate('/updateBill');
  };

  const deleteReceipt = (event) => {
    event.preventDefault();
    const bill = convertSummaryToBill(summary);
    dispatch(updateBill(bill));
    navigate('/updateBill');
  };

  return (
    <>
      <h2>Receipt Summary</h2>
      <div className="intro">
        <p>Click the button below to edit this split!</p>
        <button className="submit" onClick={(event) => editReceipt(event)}>
          Edit this receipt
        </button>
      </div>
      <div className="divideReceipts">
        <div className="overallReceipt">
          <PersonReceipt
            person={'Overall'}
            personSummary={overallSummary}
            key={`overallReceipt`}
          />
          <button className="delete" onClick={(event) => deleteReceipt(event)}>
            Delete this Receipt
          </button>
        </div>
        <div className="allReceipts">{peopleReceipts}</div>
      </div>
    </>
  );
};
export default BillReview;
