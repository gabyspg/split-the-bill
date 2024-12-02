import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import Alert from '@mui/material/Alert';

const SplitSummaryDisplay = ({ isNewSplit, isEdited, summary, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [alert, setAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [content, setContent] = useState('');

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

  const editSplit = () => {
    const bill = convertSummaryToBill(summary);
    dispatch(updateReceipt(bill));
    navigate('/updateReceipt');
  };

  const confirmDelete = (event) => {
    setSeverity('warning');
    setContent(
      'Are you sure you want to delete this split? This action cannot be undone.'
    );
    setAlert(false);
    setDeleteAlert(true);
  };

  const deleteSplit = () => {
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

  const saveSplit = () => {
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

          setSeverity('success');
          setContent('Your receipt has been saved as a new split.');
          setAlert(true);
        }
        return;
      })
      .catch((err) => console.log(err));
  };

  const updateSplit = () => {
    const updateSummaryRequest = {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, update: summary }),
    };

    fetch('/api/updateSummary', updateSummaryRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch(updateSplitSummary({ billSummary: data }));
          dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));

          setSeverity('success');
          setContent('Update Applied');
          setAlert(true);
        }
        return;
      })
      .catch((err) => console.log(err));
  };

  const discardChanges = () => {
    dispatch(resetReceipt());
    dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
    navigate('/splitSummary');

    setSeverity('success');
    setContent('Discarded edits');
    setAlert(true);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        {alert ? (
          <Alert
            variant="filled"
            severity={severity}
            onClose={() => setAlert(false)}
            sx={{ width: '30%' }}
          >
            {content}
          </Alert>
        ) : null}
        {deleteAlert ? (
          <Alert
            variant="filled"
            severity={severity}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '30%',
            }}
            action={
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Button
                  color="delete"
                  size="small"
                  variant="contained"
                  onClick={deleteSplit}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setDeleteAlert(false)}
                >
                  Cancel
                </Button>
              </Box>
            }
          >
            {content}
          </Alert>
        ) : null}
      </Box>
      <h2>{summary.billName}</h2>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Button
          onClick={editSplit}
          variant="contained"
          size="small"
          className="submit"
        >
          Edit
        </Button>
        {isNewSplit ? (
          <Button
            onClick={saveSplit}
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
              onClick={updateSplit}
              variant="contained"
              size="small"
              className="submit"
            >
              Save Updates
            </Button>
            <Button
              onClick={discardChanges}
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
              onClick={confirmDelete}
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
