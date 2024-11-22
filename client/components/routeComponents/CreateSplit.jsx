import React from 'react';
import ReceiptInfoForm from '../formComponents/ReceiptInfoForm.jsx';
import { useDispatch } from 'react-redux';
import { resetReceipt } from '../../slices/receiptSlice.js';
import { resetSplitSummary } from '../../slices/splitSlice.js';
import { resetSplitHistory } from '../../slices/historySlice.js';

const CreateSplit = () => {
  const resetStoreData = () => {
    const dispatch = useDispatch();
    dispatch(resetReceipt());
    dispatch(resetSplitSummary());
    dispatch(resetSplitHistory());
  };

  resetStoreData();

  return (
    <>
      <ReceiptInfoForm />
    </>
  );
};

export default CreateSplit;
