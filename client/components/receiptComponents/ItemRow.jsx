import React from 'react';

const ItemRow = (props) => {
  let { name, price, quantity } = props;

  if (isNaN(price) || price === '') {
    price = Number(0);
  }
  price = Number(price).toFixed(2);

  return (
    <div className="item-row">
      <span className="item-quantity">{quantity}</span>
      <span className="item-name">{name}</span>
      <span className="item-price">{price}</span>
      <span className="item-amount">{Number(price * quantity).toFixed(2)}</span>
    </div>
  );
};

export default ItemRow;
