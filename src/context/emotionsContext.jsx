import { createContext } from 'react';
import { useFetch } from '../hooks/useFetch';

export const EmotionsContext = createContext();

export function EmotionsProvider({ children }) {
  const payload = useFetch('http://localhost:3000/emotions');

  return (
    <EmotionsContext.Provider value={payload}>
      {children}
    </EmotionsContext.Provider>
  );
}
