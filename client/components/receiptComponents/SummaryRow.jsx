import React from 'react';

const SummaryRow = ({ name, price }) => {
  if (isNaN(price) || price === '') {
    price = Number(0);
  }

  return (
    <div className="summary-row">
      <span className="summary-name">{name}</span>
      <span className="summary-price">${Number(price).toFixed(2)}</span>
    </div>
  );
};

export default SummaryRow;
