import { createSlice } from '@reduxjs/toolkit';

export type ThemeMode = 'dark' | 'light';

export interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: 'dark', // Por defecto oscuro
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setTheme: (state, action: { payload: ThemeMode }) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
