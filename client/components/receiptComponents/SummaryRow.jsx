import React from 'react';

const SummaryRow = (props) => {
  let { name, price } = props;
  
  if (isNaN(price) || price === '') {
    price = Number(0);
  }

  return (
    <div className="summary-row">
      <span className="summary-name">{name}</span>
      <span className="summary-price">${price.toFixed(2)}</span>
    </div>
  );
};

export default SummaryRow;
