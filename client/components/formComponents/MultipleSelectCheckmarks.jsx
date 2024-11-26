import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const MultipleSelectCheckmarks = ({
  peopleInputFields,
  handleFoodChange,
  index,
  peopleSelect,
}) => {
  const peopleNames = peopleInputFields.map((person) => {
    return person.name;
  });
  const names = [...new Set(peopleNames)];

  const backgroundColor = '#1d2639';
  const textColor = '#d1d1d1';
  const borderColor = '#313a49';

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        backgroundColor: backgroundColor,
        color: textColor,
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 225,
      },
    },
  };

  return (
    <>
      <FormControl size="small" sx={{ m: 1, width: 225 }}>
        <InputLabel id="multiple-checkbox-label">Select</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          input={<OutlinedInput label="Select" />}
          name="people"
          value={peopleSelect}
          onChange={(event) => handleFoodChange(index, event)}
          renderValue={(selected) => {
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
        >
          {names.map((name) =>
            name ? (
              <MenuItem key={name} value={name}>
                <Checkbox checked={peopleSelect.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ) : null
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default MultipleSelectCheckmarks;
