import { configureStore } from '@reduxjs/toolkit';
import receiptReducer from './slices/receiptSlice';
import splitSummaryReducer from './slices/splitSlice';

export const store = configureStore({
  reducer: {
    receipt: receiptReducer,
    split: splitSummaryReducer,
  },
});
