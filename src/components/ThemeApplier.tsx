'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setTheme, ThemeMode } from '@/store/themeSlice';

export default function ThemeApplier() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  // Al montar, verificamos si hay un tema guardado en localStorage
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('wisp_theme') as ThemeMode;
      if (storedTheme === 'dark' || storedTheme === 'light') {
        dispatch(setTheme(storedTheme));
      }
    } catch {
    }
  }, [dispatch]);

  // Cada vez que cambia el tema en Redux, actualizamos el DOM y localStorage
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    try {
      localStorage.setItem('wisp_theme', theme);
    } catch {
    }
  }, [theme]);

  return null;
}
