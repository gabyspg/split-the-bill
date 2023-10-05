import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  billSummary: {
    billName: '',
    restaurant: '',
    date: '',
    subtotal: 0,
    tax: 0,
    taxPercentage: 0,
    tip: 0,
    tipPercentage: 0,
    total: 0,
    people: {
      '': {
        items: [
          {
            itemName: '',
            price: 0,
            quantity: 0,
          },
        ],
        subtotal: 0,
        tax: 0,
        tip: 0,
        total: 0,
      },
    },
    foodItems: [{ itemName: '', price: '', quantity: '', people: '' }],
  },
};

export const billSummarySlice = createSlice({
  name: 'billSummary',
  initialState,
  reducers: {
    updateBillSummary: (state, action) => {
      const { billSummary } = action.payload;
      state.billSummary = billSummary;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBillSummary } = billSummarySlice.actions;

export default billSummarySlice.reducer;
