import React from 'react';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks.jsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const ItemInputs = ({
  people,
  items,
  handleItemChange,
  removeItem,
  addItem,
}) => {
  return (
    <>
      <label className="form-group">Items</label>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        {items.map((foodItem, index) => {
          return (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              key={index}
            >
              <TextField
                id="outlined-controlled"
                label={`Item ${index + 1}`}
                name="itemName"
                value={foodItem.itemName}
                onChange={(event) => handleItemChange(index, event)}
                size="small"
                variant="outlined"
              />
              <TextField
                id="outlined-controlled"
                label={'Price'}
                name="price"
                type="number"
                value={foodItem.price}
                onChange={(event) => handleItemChange(index, event)}
                size="small"
                variant="outlined"
              />
              <TextField
                id="outlined-controlled"
                label={'Quantity'}
                name="quantity"
                type="number"
                value={foodItem.quantity}
                onChange={(event) => handleItemChange(index, event)}
                size="small"
                variant="outlined"
              />
              <MultipleSelectCheckmarks
                people={people}
                peopleSelect={foodItem.people}
                handleItemChange={handleItemChange}
                index={index}
              />
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  removeItem(index);
                }}
                aria-label="delete"
                size="small"
                color="delete"
              >
                <DeleteIcon size="small" />
              </IconButton>
            </Box>
          );
        })}
        <Button
          onClick={addItem}
          variant="contained"
          size="small"
          className="addEntry"
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default ItemInputs;