import React from 'react';
import { EmotionsProvider } from './emotionsContext';
import { CategoriesProvider } from './categoryContext';

function GlobalState({ children }) {
  return (
    <CategoriesProvider>
      <EmotionsProvider>{children}</EmotionsProvider>
    </CategoriesProvider>
  );
}

export default GlobalState;
