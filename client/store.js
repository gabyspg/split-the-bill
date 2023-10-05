import { configureStore } from '@reduxjs/toolkit';
import billReducer from './slices/billSlice';
import billSummaryReducer from './slices/billSummarySlice';

export const store = configureStore({
  reducer: {
    bill: billReducer,
    billSummary: billSummaryReducer,
  },
});
