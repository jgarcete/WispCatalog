'use client'; 

import { useRef, useEffect } from 'react';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import {
  initializeFavorites,
  loadFromStorage,
} from '@/store/favoritesSlice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // Evitar renderizados dobles
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      
      // Cargar favoritos iniciales
      store.dispatch(initializeFavorites(loadFromStorage()));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
