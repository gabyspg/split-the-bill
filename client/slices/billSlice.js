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
  foodItems: [{ itemName: '', price: '', quantity: '', people: '' }],
};

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    updateBill: (state, action) => {
      const { billInfo, people, foodItems } = action.payload;
      state.billInfo = billInfo;
      state.people = people;
      state.foodItems = foodItems;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBill } = billSlice.actions;

export default billSlice.reducer;
