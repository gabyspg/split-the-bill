import React from 'react';

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
          <li>
            <label className="form-group" key={index}>
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
                placeholder="Price"
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
              <select
                name="people"
                onChange={(event) => handleFoodChange(index, event)}
                value={foodItem.people}
              >
                <option value="">Select people</option>
                {peopleInputFields.map((person, personIndex) => (
                  <option key={personIndex} value={person.name}>
                    {person.name}
                  </option>
                ))}
              </select>
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
