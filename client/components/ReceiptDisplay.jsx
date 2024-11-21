import React from 'react';

const ReceiptDisplay = (props) => {
  const { receipt, reviewReceipt, id } = props;
  const { billName, date, restaurant } = receipt;

  return (
    <div className="receipt">
      <div className="receipt-header">
        <h3>{billName}</h3>
      </div>
      <hr className="line"></hr>
      <p className="billInfo">Restaurant: {restaurant}</p>
      <p className="billInfo">Date: {date}</p>
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
