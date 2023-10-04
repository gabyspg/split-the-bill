import React from 'react';

const PersonReceipt = (props) => {
  const { person, personSummary } = props;

  const itemsList = [];
  for (let i = 0; i < personSummary.items.length; i++) {
    const item = personSummary.items[i];
    itemsList.push(
      <li>
        {item.quantity} {item.itemName} ${item.price}
      </li>
    );
  }

  return (
    <div className="receipt">
      <h3>{person}</h3>
      <label>Food Items:</label>
      {itemsList}
      <label>Subtotal: ${personSummary.subtotal.toFixed(2)}</label>
      <label>Tax: ${personSummary.tax.toFixed(2)}</label>
      <label>Tip: ${personSummary.tip.toFixed(2)}</label>
      <label>Total: ${personSummary.total.toFixed(2)}</label>
    </div>
  );
};

export default PersonReceipt;
