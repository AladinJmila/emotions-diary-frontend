import React from 'react';
import { EmotionsProvider } from './emotionsContext';
import { CategoriesProvider } from './categoryContext';
import { UIProvider } from './UIContext';

function GlobalState({ children }) {
  return (
    <UIProvider>
      <CategoriesProvider>
        <EmotionsProvider>{children}</EmotionsProvider>
      </CategoriesProvider>
    </UIProvider>
  );
}

export default GlobalState;
