import React from 'react';
import { EmotionsProvider } from './emotionsContext';
import { CategoriesProvider } from './categoryContext';
import { EmoStatesProvider } from './emoStatesContext';
import { UIProvider } from './UIContext';

function GlobalState({ children }) {
  return (
    <UIProvider>
      <CategoriesProvider>
        <EmotionsProvider>
          <EmoStatesProvider>{children}</EmoStatesProvider>
        </EmotionsProvider>
      </CategoriesProvider>
    </UIProvider>
  );
}

export default GlobalState;
