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
import Snackbar from '@mui/material/Snackbar';
import { toast } from 'react-toastify';

const SplitSummaryDisplay = ({ isNewSplit, isEdited, summary, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const openConfirmDeleteAlert = () => {
    setDeleteAlertOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteAlertOpen(false);
    toast.info('Split was not deleted');
  };

  const handleApiCall = async (url, method, body = null, onSuccess) => {
    try {
      const response = await fetch(url, {
        method,
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
      });
      const data = await response.json();
      if (data) onSuccess(data);
    } catch (error) {
      console.error(error);
    }
  };

  const editSplit = () => {
    const bill = convertSummaryToBill(summary);
    dispatch(updateReceipt(bill));
    navigate('/updateReceipt');
  };

  const deleteSplit = () => {
    handleApiCall(`/api/deleteReceipt/${id}`, 'DELETE', null, () => {
      dispatch(resetReceipt());
      dispatch(resetSplitSummary());
      dispatch(resetSplitHistory());
      toast.success('Your split has been deleted.');
      navigate('/pastSplits');
    });
  };

  const saveSplit = () => {
    handleApiCall('/api/saveSummary', 'POST', summary, (data) => {
      dispatch(updateSplitSummary({ billSummary: data }));
      dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
      toast.success('Your receipt has been saved as a new split.');
    });
  };

  const updateSplit = () => {
    handleApiCall(
      '/api/updateSummary',
      'PUT',
      { id: id, update: summary },
      (data) => {
        dispatch(updateSplitSummary({ billSummary: data }));
        dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
        toast.success('Update Applied');
      }
    );
  };

  const discardChanges = () => {
    dispatch(resetReceipt());
    dispatch(updateSplitHistory({ isNewSplit: false, isEdited: false }));
    navigate('/splitSummary');
    toast.success('Discarded Edits');
  };

  const renderPeopleReceipts = () =>
    Object.entries(summary.people).map(([person, personSummary], index) => (
      <PersonReceipt
        person={person}
        personSummary={personSummary}
        key={`person-${index}`}
      />
    ));

  const overallSummary = {
    ...summary,
    items: summary.foodItems,
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ height: '27%' }}
          open={deleteAlertOpen}
          onClose={handleCancelDelete}
        >
          <Alert
            variant="filled"
            severity="warning"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="delete"
                  size="small"
                  variant="contained"
                  onClick={deleteSplit}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </Button>
              </Box>
            }
          >
            Are you sure you want to delete this split? This action cannot be
            undone.
          </Alert>
        </Snackbar>
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
        {isNewSplit && (
          <Button
            onClick={saveSplit}
            variant="contained"
            size="small"
            className="submit"
          >
            Save
          </Button>
        )}
        {!isNewSplit && isEdited && (
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
        )}
      </Box>
      <div className="divideReceipts">
        <div className="overallReceipt">
          <PersonReceipt
            person={summary.restaurant}
            personSummary={overallSummary}
          />
          {!isNewSplit && (
            <Button
              onClick={openConfirmDeleteAlert}
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
        <div className="allReceipts">{renderPeopleReceipts()}</div>
      </div>
    </>
  );
};

export default SplitSummaryDisplay;
