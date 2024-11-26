import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const AddPerson = (props) => {
  const { peopleInputFields, handlePersonChange, removePerson, addPerson } =
    props;

  return (
    <>
      <label className="form-group">People</label>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
      >
        {peopleInputFields.map((person, index) => {
          return (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              key={index}
            >
              <TextField
                id="outlined-controlled"
                label={`Person ${index + 1}`}
                name="name"
                value={person.name}
                onChange={(event) => handlePersonChange(index, event)}
                size="small"
                variant="outlined"
              />
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  removePerson(index);
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
          onClick={addPerson}
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

export default AddPerson;
