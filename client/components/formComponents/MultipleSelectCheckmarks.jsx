import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 15;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 145,
    },
  },
};

const MultipleSelectCheckmarks = ({
  peopleInputFields,
  handleFoodChange,
  index,
  peopleSelect,
}) => {
  const names = peopleInputFields.map((person) => {
    return person.name;
  });

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: '145px',
          height: '19.5px',
          border: '1px solid rgb(160, 160, 181)',
          borderRadius: '4px',
          backgroundColor: '#efeeed',
          overflow: 'hidden',
        }}
      >
        <InputLabel
          id="multiple-checkbox-label"
          sx={{
            fontSize: '10px', // Adjust font size to fit within height
            lineHeight: '19.5px', // Center label vertically
          }}
        >
          Select People
        </InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          name="people"
          value={peopleSelect}
          onChange={(event) => handleFoodChange(index, event)}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{
            fontSize: '10px', // Adjust font size of selected text
            lineHeight: '15px', // Center text vertically
          }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={peopleSelect.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectCheckmarks;
