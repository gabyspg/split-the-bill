import React from 'react';

const ItemsRow = (props) => {
  let { name, price, quantity } = props;

  if (isNaN(price) || price === '') {
    price = Number(0);
  }
  price = Number(price).toFixed(2);

  return (
    <div className="item-row">
      <span className="item-quantity">{quantity}</span>
      <span className="item-name">{name}</span>
      <span className="item-price">${price}</span>
    </div>
  );
};

export default ItemsRow;
