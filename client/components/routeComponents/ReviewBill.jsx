import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PersonReceipt from '../receiptComponents/PersonReceipt.jsx';
import NavBar from '../NavBar.jsx';
import convertSummaryToBill from '../../utils/convertFormat.js';
import { updateBill } from '../../slices/billSlice.js';

const ReviewBill = () => {
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
    const deleteReceiptRequest = {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`/api/deleteReceipt/${summary._id}`, deleteReceiptRequest)
      .then((res) => res.json())
      .then((data) => {
        console.log('data after req completed', data);
        if (!data) {
          alert('Your receipt has been deleted.');
        }
        navigate('/pastBills');
        return;
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />
      <h2>Receipt Summary</h2>
      {/* <div className="intro"> */}
      {/* <p>Click the button below to edit this split!</p> */}
      <button className="submit" onClick={(event) => editReceipt(event)}>
        Edit this receipt
      </button>
      {/* </div> */}
      <div className="divideReceipts">
        <div className="overallReceipt">
          <PersonReceipt
            person={summary.billName}
            personSummary={overallSummary}
            key={`overallReceipt`}
          />
          <button
            className="delete"
            onClick={(event) => {
              if (
                window.confirm(
                  'Are you sure you wish to delete this item? This action cannot be undone.'
                )
              ) {
                deleteReceipt(event);
              }
            }}
          >
            Delete this Receipt
          </button>
        </div>
        <div className="allReceipts">{peopleReceipts}</div>
      </div>
    </>
  );
};
export default ReviewBill;
