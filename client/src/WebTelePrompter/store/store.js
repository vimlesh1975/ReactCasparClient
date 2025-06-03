// store/store.js
import { createSlice } from '@reduxjs/toolkit';

// --- storyLines slice ---
const storyLinesSlice = createSlice({
  name: 'storyLines',
  initialState: { storyLines: [] },
  reducers: {
    changeStoryLines: (state, action) => {
      state.storyLines = action.payload;
    },
  },
});

// --- crossedLines slice ---
const crossedLinesSlice = createSlice({
  name: 'crossedLines',
  initialState: { crossedLines: 0 },
  reducers: {
    changeCrossedLines: (state, action) => {
      state.crossedLines = action.payload;
    },
  },
});

// --- newdatabase slice ---
const newdatabaseSlice = createSlice({
  name: 'newdatabase',
  initialState: { newdatabase: true },
  reducers: {
    changenewdatabase: (state, action) => {
      state.newdatabase = action.payload;
    },
  },
});

// Export actions
export const { changeStoryLines } = storyLinesSlice.actions;
export const { changeCrossedLines } = crossedLinesSlice.actions;
export const { changenewdatabase } = newdatabaseSlice.actions;

// ✅ Export reducers
export const storyLinesReducer = storyLinesSlice.reducer;
export const crossedLinesReducer = crossedLinesSlice.reducer;
export const newdatabaseReducer = newdatabaseSlice.reducer;
