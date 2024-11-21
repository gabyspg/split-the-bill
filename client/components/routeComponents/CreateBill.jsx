import React from 'react';
import BillForm from '../formComponents/BillForm.jsx';
import { useDispatch } from 'react-redux';
import { resetBill } from '../../slices/billSlice.js';

const CreateBill = () => {
  const dispatch = useDispatch();
  dispatch(resetBill());

  return (
    <>
      <BillForm isNewBill={true} />
    </>
  );
};

export default CreateBill;
