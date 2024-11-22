import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNewSplit: true,
  isEdited: false,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    updateSplitHistory: (state, action) => {
      const { isNewSplit, isEdited } = action.payload;
      state.isNewSplit = isNewSplit;
      state.isEdited = isEdited;
    },
    resetSplitHistory: () => {
      return initialState;
    },
  },
});

export const { updateSplitHistory, resetSplitHistory } = historySlice.actions;

export default historySlice.reducer;
