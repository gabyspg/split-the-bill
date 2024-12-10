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
    items: [{ itemName: '', price: '', quantity: '', people: [] }],
  },
};

export const splitSlice = createSlice({
  name: 'split',
  initialState,
  reducers: {
    updateSplitSummary: (state, action) => {
      const { billSummary } = action.payload;
      state.billSummary = billSummary;
    },
    resetSplitSummary: () => {
      return initialState;
    },
  },
});

export const { updateSplitSummary, resetSplitSummary } = splitSlice.actions;

export default splitSlice.reducer;
