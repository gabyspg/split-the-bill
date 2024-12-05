import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetReceipt } from '../../slices/receiptSlice.js';
import { resetSplitSummary } from '../../slices/splitSlice.js';
import { resetSplitHistory } from '../../slices/historySlice.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetReceipt());
    dispatch(resetSplitSummary());
    dispatch(resetSplitHistory());
    navigate('/newReceipt');
  };

  return (
    <>
      <h2>Home</h2>
      <div className="intro">
        <p>
          Welcome to Split the Bill! Do you have a receipt that you'd like to
          effortlessly divide among your family and friends? With Split the
          Bill, the process becomes seamless.
        </p>
        <p>Please choose from the following options:</p>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <Button
            onClick={handleClick}
            variant="contained"
            size="small"
            className="submit"
          >
            New Split
          </Button>
          <Button
            onClick={() => navigate('/pastSplits')}
            variant="contained"
            size="small"
            className="submit"
          >
            Past Splits
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Home;
