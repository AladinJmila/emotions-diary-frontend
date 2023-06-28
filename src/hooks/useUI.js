import { UIContext } from '../context/UIContext';
import { useContext } from 'react';

export function useUI() {
  const context = useContext(UIContext);

  if (context === 'undefined')
    throw new Error('useUI() must be inside a UIProvider');

  return context;
}
