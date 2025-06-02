// store/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice for storyLines
const storyLinesSlice = createSlice({
  name: 'storyLines',
  initialState: { storyLines: [] },
  reducers: {
    changeStoryLines: (state, action) => {
      state.storyLines = action.payload;
    },
  },
});

// Slice for crossedLines
const crossedLinesSlice = createSlice({
  name: 'crossedLines',
  initialState: { crossedLines: 0 },
  reducers: {
    changeCrossedLines: (state, action) => {
      state.crossedLines = action.payload;
    },
  },
});

// Slice for crossedLines
const newdatabaseSlice = createSlice({
  name: 'newdatabase',
  initialState: { newdatabase: true},
  reducers: {
    changenewdatabase: (state, action) => {
      state.newdatabase = action.payload;
    },
  },
});

// Export the actions from each slice
export const { changeStoryLines } = storyLinesSlice.actions;
export const { changeCrossedLines } = crossedLinesSlice.actions;
export const { changenewdatabase } = newdatabaseSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    storyLinesReducer: storyLinesSlice.reducer,
    crossedLinesReducer: crossedLinesSlice.reducer,
    newdatabaseReducer: newdatabaseSlice.reducer,
  },
});

export default store;
