import React from 'react';

const ReceiptDisplay = (props) => {
  const { receipt, reviewReceipt, id } = props;
  const { billName, date, restaurant } = receipt;

  const displayDate = new Date(date).toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="receipt">
      <div className="receipt-header">
        <h3>{billName}</h3>
      </div>
      <hr className="line"></hr>
      <p className="billInfo">Restaurant: {restaurant}</p>
      <p className="billInfo">Date: {displayDate}</p>
      <button
        className="review"
        onClick={(event, receipt) => reviewReceipt(event, id)}
      >
        Review
      </button>
    </div>
  );
};

export default ReceiptDisplay;
