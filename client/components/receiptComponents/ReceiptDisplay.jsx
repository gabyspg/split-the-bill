import React from 'react';
import Button from '@mui/material/Button';

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
      <Button
        onClick={(event) => reviewReceipt(event, id)}
        variant="contained"
        size="small"
        className="review"
      >
        Review
      </Button>
    </div>
  );
};

export default ReceiptDisplay;
