import React from 'react';
import BillForm from '../formComponents/BillForm.jsx';
import { useDispatch } from 'react-redux';
import { resetReceipt } from '../../slices/receiptSlice.js';

const CreateBill = () => {
  const dispatch = useDispatch();
  dispatch(resetReceipt());

  return (
    <>
      <BillForm isNewBill={true} />
    </>
  );
};

export default CreateBill;
