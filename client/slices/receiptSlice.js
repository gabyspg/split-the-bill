import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  billInfo: {
    billName: '',
    restaurant: '',
    date: '',
    tax: '',
    tip: '',
  },
  people: [{ name: '' }],
  items: [{ itemName: '', price: '', quantity: '', people: [] }],
};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    updateReceipt: (state, action) => {
      const { billInfo, people, items } = action.payload;
      state.billInfo = billInfo;
      state.people = people;
      state.items = items;
    },
    resetReceipt: () => {
      return initialState;
    },
  },
});

export const { updateReceipt, resetReceipt } = receiptSlice.actions;

export default receiptSlice.reducer;
