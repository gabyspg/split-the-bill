import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InfoInput = ({ billInfo, handleInfoChange, handleDateChange }) => {
  const { billName, restaurant, date } = billInfo;

  return (
    <>
      <label className="form-group">Receipt Information</label>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-controlled"
          label="Bill Name"
          name="billName"
          value={billName}
          onChange={(event) => {
            handleInfoChange(event);
          }}
          size="small"
          variant="outlined"
        />
        <TextField
          id="outlined-controlled"
          label="Restaurant"
          name="restaurant"
          value={restaurant}
          onChange={(event) => {
            handleInfoChange(event);
          }}
          size="small"
          variant="outlined"
        />
        <DatePicker
          label="Date"
          value={dayjs(date)}
          onChange={(newDate) => {
            handleDateChange(newDate);
          }}
          views={['year', 'month', 'day']}
        />
      </Box>
    </>
  );
};

export default InfoInput;
