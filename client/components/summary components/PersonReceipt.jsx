import React from 'react';
import SummaryRow from './SummaryRow.jsx';
import ItemsRow from './ItemsRow.jsx';

const PersonReceipt = (props) => {
  const { person, personSummary } = props;

  const { tip, tax, subtotal, total, items } = personSummary;

  const itemsList = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    itemsList.push(
      <ItemsRow
        quantity={item.quantity}
        name={item.itemName}
        price={item.price}
        key={`item ${i}`}
      />
    );
  }

  return (
    <div className="receipt">
      <div className="receipt-header">
        <h3>Receipt: {person}</h3>
      </div>
      <div className="receipt-items">
        <div className="item-row">
          <span className="item-quantity">#</span>
          <span className="item-name">Items</span>
          <span className="item-price">Price</span>
        </div>
        <hr className="line"></hr>
        {itemsList}
      </div>
      <hr className="line"></hr>
      <div className="receipt-summary">
        <SummaryRow name={'Subtotal'} price={subtotal} />
        <SummaryRow name={'Tax'} price={tax} />
        <SummaryRow name={'Tip'} price={tip} />
        <hr className="line"></hr>
        <SummaryRow name={'Total'} price={total} />
      </div>
    </div>
  );
};

export default PersonReceipt;
