import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TaxTipInput = ({ handleInfoChange, billInfo }) => {
  const { tax, tip } = billInfo;
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="Tax"
        name="tax"
        type="number"
        value={tax}
        onChange={(event) => {
          handleInfoChange(event);
        }}
        size="small"
        variant="outlined"
      />
      <TextField
        id="outlined-controlled"
        label="Tip"
        name="tip"
        type="number"
        value={tip}
        onChange={(event) => {
          handleInfoChange(event);
        }}
        size="small"
        variant="outlined"
      />
    </Box>
  );
};

export default TaxTipInput;
