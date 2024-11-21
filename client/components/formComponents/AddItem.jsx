import React from 'react';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks.jsx';

const AddItem = (props) => {
  const {
    peopleInputFields,
    foodInputFields,
    handleFoodChange,
    removeFoodItem,
  } = props;

  return (
    <>
      <label className="form-group">Food Items:</label>
      {foodInputFields.map((foodItem, index) => {
        return (
          <li key={index}>
            <label key={index}>
              Food item {index + 1}:
              <input
                name="itemName"
                placeholder="Item name"
                value={foodItem.itemName}
                onChange={(event) => handleFoodChange(index, event)}
              />
              <input
                name="price"
                type="number"
                placeholder="Price of Item"
                value={foodItem.price}
                onChange={(event) => handleFoodChange(index, event)}
              />
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={foodItem.quantity}
                onChange={(event) => handleFoodChange(index, event)}
              />
              <MultipleSelectCheckmarks
                peopleInputFields={peopleInputFields}
                peopleSelect={foodItem.people}
                handleFoodChange={handleFoodChange}
                index={index}
              />
              <button
                className="removeEntry"
                onClick={() => removeFoodItem(index)}
              >
                Remove
              </button>
            </label>
          </li>
        );
      })}
    </>
  );
};

export default AddItem;
