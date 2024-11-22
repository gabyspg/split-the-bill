import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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
    <div style={{ display: 'inline-flex' }}>
      <FormControl
        sx={{
          m: 1,
          width: '170px',
        }}
      >
        <Select
          id="multiple-checkbox"
          multiple
          name="people"
          value={peopleSelect}
          displayEmpty
          onChange={(event) => handleFoodChange(index, event)}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return 'Select People';
            }
            return selected.join(', ');
          }}
          SelectDisplayProps={{
            style: {
              fontSize: '12px',
              lineHeight: '19.5px',
              padding: '4px',
            },
          }}
          sx={{
            height: '19.5px',
            backgroundColor: '#f5f5f5',
          }}
        >
          {names.map((name) =>
            name ? (
              <MenuItem
                key={name}
                value={name}
                sx={{
                  fontSize: '12px',
                  lineHeight: '19.5px',
                  padding: '4px',
                  height: '19.5px',
                }}
              >
                <Checkbox
                  checked={peopleSelect.includes(name)}
                  sx={{
                    padding: '0 4px',
                  }}
                />
                <ListItemText
                  primary={name}
                  disableTypography={true}
                  sx={{
                    fontSize: '12px',
                    textAlign: 'left',
                  }}
                />
              </MenuItem>
            ) : null
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectCheckmarks;
