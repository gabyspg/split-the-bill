import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

export default function MultipleSelectCheckmarks(props) {
  const { peopleInputFields, handleFoodChange, index } = props;
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event, index) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    handleFoodChange(index, event);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="people-multiple-checkbox-label">
          Select People
        </InputLabel>
        <Select
          labelId="people-multiple-checkbox-label"
          id="people-multiple-checkbox"
          multiple
          value={personName}
          onChange={(event) => handleChange(event, index)}
          input={<OutlinedInput label="People" />}
          renderValue={(selected) => selected.join(', ')}
          // MenuProps={MenuProps}
        >
          {peopleInputFields.map((person, index) => (
            <MenuItem key={index} value={person.name}>
              <Checkbox checked={personName.indexOf(person.name) > -1} />
              <ListItemText primary={person.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
