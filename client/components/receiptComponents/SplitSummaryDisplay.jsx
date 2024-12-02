import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PersonReceipt from '../receiptComponents/PersonReceipt.jsx';
import convertSummaryToBill from '../../utils/convertFormat.js';
import { updateReceipt, resetReceipt } from '../../slices/receiptSlice.js';
import {
  updateSplitSummary,
  resetSplitSummary,
} from '../../slices/splitSlice.js';
import {
  updateSplitHistory,
  resetSplitHistory,
} from '../../slices/historySlice.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

const SplitSummaryDisplay = ({ isNewSplit, isEdited, summary, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const peopleReceipts = [];
  let count = 0;
  for (let person in summary.people) {
    count++;
    peopleReceipts.push(
      <PersonReceipt
        person={person}
        personSummary={summary.people[person]}
        key={`person ${count}`}
      />
    );
  }

  const overallSummary = {
    tax: Number(summary.tax),
    tip: Number(summary.tip),
    subtotal: Number(summary.subtotal),
    total: Number(summary.total),
    items: summary.foodItems,
  };

  const editSplit = (event) => {
    event.preventDefault();
    const bill = convertSummaryToBill(summary);
    dispatch(updateReceipt(bill));
    navigate('/updateReceipt');
  };

  const deleteSplit = (event) => {
    event.preventDefault();
    const deleteReceiptRequest = {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`/api/deleteReceipt/${id}`, deleteReceiptRequest)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          alert('Your receipt has been deleted.');
        }
        dispatch(resetReceipt());
        dispatch(resetSplitSummary());
        dispatch(resetSplitHistory());
        navigate('/pastSplits');
        return;
      })
      .catch((err) => console.log(err));
  };

  const saveSplit = (event) => {
    event.preventDefault();

    const saveSummaryRequest = {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(summary),
    };

    fetch('/api/saveSummary', saveSummaryRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch(updateSplitSummary({ billSummary: data }));
          dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
          alert('Your receipt has been saved as a new split.');
        }
        return;
      })
      .catch((err) => console.log(err));
  };

  const updateSplit = (event) => {
    event.preventDefault();
    const updateSummaryRequest = {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, update: summary }),
    };

    fetch('/api/updateSummary', updateSummaryRequest)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          alert('This is a new split, please save instead of update.');
        } else if (data) {
          dispatch(updateSplitSummary({ billSummary: data }));
          dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
          alert('Update Applied');
        }
        return;
      })
      .catch((err) => console.log(err));
  };

  const discardChanges = (event) => {
    event.preventDefault();
    dispatch(resetReceipt());
    dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
    navigate('/splitSummary');
  };

  return (
    <>
      <h2>{summary.billName}</h2>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Button
          onClick={(event) => editSplit(event)}
          variant="contained"
          size="small"
          className="submit"
        >
          Edit
        </Button>
        {isNewSplit ? (
          <Button
            onClick={(event) => saveSplit(event)}
            variant="contained"
            size="small"
            className="submit"
          >
            Save
          </Button>
        ) : null}
        {!isNewSplit && isEdited ? (
          <>
            <Button
              onClick={(event) => updateSplit(event)}
              variant="contained"
              size="small"
              className="submit"
            >
              Save Updates
            </Button>
            <Button
              onClick={(event) => discardChanges(event)}
              variant="contained"
              size="small"
              className="submit"
            >
              Cancel
            </Button>
          </>
        ) : null}
      </Box>
      <div className="divideReceipts">
        <div className="overallReceipt">
          <PersonReceipt
            person={summary.restaurant}
            personSummary={overallSummary}
            key={`overallReceipt`}
          />
          {isNewSplit ? null : (
            <Button
              onClick={(event) => {
                if (
                  window.confirm(
                    'Are you sure you wish to delete this item? This action cannot be undone.'
                  )
                ) {
                  deleteSplit(event);
                }
              }}
              variant="outlined"
              startIcon={<DeleteIcon />}
              size="small"
              className="delete"
              color="delete"
            >
              Delete
            </Button>
          )}
        </div>
        <div className="allReceipts">{peopleReceipts}</div>
      </div>
    </>
  );
};

export default SplitSummaryDisplay;
