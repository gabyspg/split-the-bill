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
  const peopleNames = peopleInputFields.map((person) => {
    return person.name;
  });
  const names = [...new Set(peopleNames)];

  const backgroundColor = '#1d2639';
  const textColor = '#d1d1d1';
  const borderColor = '#313a49';

  return (
    <div style={{ display: 'inline' }}>
      <FormControl
        sx={{
          m: 1,
          //width: '170px',
          backgroundColor: backgroundColor,
          color: textColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '4px',
        }}
      >
        <Select
          id="multiple-checkbox"
          multiple
          size="small"
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
          // SelectDisplayProps={{
          //   style: {
          //     fontSize: '12px',
          //     lineHeight: '19.5px',
          //     padding: '4px',
          //   },
          // }}
          sx={{
            // height: '19.5px',
            backgroundColor: backgroundColor,
            color: textColor,
            '.MuiSelect-icon': {
              color: textColor,
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: backgroundColor,
                color: textColor,
              },
            },
          }}
        >
          {names.map((name) =>
            name ? (
              <MenuItem
                key={name}
                value={name}
                sx={{
                  // fontSize: '12px',
                  // lineHeight: '19.5px',
                  // padding: '4px',
                  // height: '19.5px',
                  backgroundColor: backgroundColor,
                  color: textColor,
                }}
              >
                <Checkbox
                  checked={peopleSelect.includes(name)}
                  sx={{
                    // padding: '0 4px',
                    color: textColor,
                  }}
                />
                <ListItemText
                  primary={name}
                  disableTypography={true}
                  sx={{
                    // fontSize: '12px',
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
