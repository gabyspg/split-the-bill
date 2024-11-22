import { configureStore } from '@reduxjs/toolkit';
import receiptReducer from './slices/receiptSlice';
import splitReducer from './slices/splitSlice';
import historyReducer from './slices/historySlice'

export const store = configureStore({
  reducer: {
    receipt: receiptReducer,
    split: splitReducer,
    history: historyReducer,
  },
});
