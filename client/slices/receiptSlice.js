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
  foodItems: [{ itemName: '', price: '', quantity: '', people: [] }],
};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    updateReceipt: (state, action) => {
      const { billInfo, people, foodItems } = action.payload;
      state.billInfo = billInfo;
      state.people = people;
      state.foodItems = foodItems;
    },
    resetReceipt: () => {
      return initialState;
    },
  },
});

export const { updateReceipt, resetReceipt } = receiptSlice.actions;

export default receiptSlice.reducer;
