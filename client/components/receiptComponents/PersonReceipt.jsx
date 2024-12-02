import React from 'react';
import SummaryRow from './SummaryRow.jsx';
import ItemRow from './ItemRow.jsx';

const PersonReceipt = ({ person, personSummary }) => {
  const { tip, tax, subtotal, total, items } = personSummary;

  const itemsList = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    itemsList.push(
      <ItemRow
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
      {total ? (
        <>
          <div className="receipt-items">
            <div className="item-row">
              <span className="item-quantity">#</span>
              <span className="item-name">Items</span>
              <span className="item-price">Price</span>
              <span className="item-amount">Amount</span>
            </div>
            <hr className="line" />
            {itemsList}
          </div>
          <hr className="line" />
          <div className="receipt-summary">
            <SummaryRow name={'Subtotal'} price={subtotal} />
            <SummaryRow name={'Tax'} price={tax} />
            <SummaryRow name={'Tip'} price={tip} />
            <hr className="line" />
            <SummaryRow name={'Total'} price={total} />
          </div>
        </>
      ) : (
        'Lucky you! Nothing to pay this time.'
      )}
    </div>
  );
};

export default PersonReceipt;
