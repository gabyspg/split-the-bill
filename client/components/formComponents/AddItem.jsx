import React from 'react';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks.jsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddItem = (props) => {
  const {
    peopleInputFields,
    foodInputFields,
    handleFoodChange,
    removeFoodItem,
  } = props;

  return (
    <>
      <label className="form-group">Items</label>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        {foodInputFields.map((foodItem, index) => {
          return (
            <div style={{ display: 'inline' }}>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-controlled"
                  label={`Item ${index + 1}`}
                  name="itemName"
                  value={foodItem.itemName}
                  onChange={(event) => handleFoodChange(index, event)}
                  size="small"
                  variant="outlined"
                />
                <TextField
                  id="outlined-controlled"
                  label={'Price'}
                  name="price"
                  type="number"
                  value={foodItem.price}
                  onChange={(event) => handleFoodChange(index, event)}
                  size="small"
                  variant="outlined"
                />
                <TextField
                  id="outlined-controlled"
                  label={'Quantity'}
                  name="quantity"
                  type="number"
                  value={foodItem.quantity}
                  onChange={(event) => handleFoodChange(index, event)}
                  size="small"
                  variant="outlined"
                />
                <MultipleSelectCheckmarks
                  peopleInputFields={peopleInputFields}
                  peopleSelect={foodItem.people}
                  handleFoodChange={handleFoodChange}
                  index={index}
                />
                <button
                  className="removeEntry"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFoodItem(index);
                  }}
                >
                  Remove
                </button>
              </Box>
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default AddItem;
