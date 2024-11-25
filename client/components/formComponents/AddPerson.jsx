import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddPerson = (props) => {
  const { peopleInputFields, handlePersonChange, removePerson } = props;

  return (
    <>
      <label className="form-group">People</label>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        {peopleInputFields.map((person, index) => {
          return (
            <div style={{ display: 'inline' }}>
              <TextField
                id="outlined-controlled"
                label={`Person ${index + 1}`}
                name="name"
                value={person.name}
                onChange={(event) => handlePersonChange(index, event)}
                size="small"
                variant="outlined"
              />
              <button
                className="removeEntry"
                onClick={(e) => {
                  e.preventDefault();
                  removePerson(index);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default AddPerson;
